import { useRef, useState } from 'react';
import { AlertTriangle, Calculator, CheckCircle2, Info, Loader2, TrendingDown, Upload } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { SECTION_IDS } from '../lib/constants';
import { SectionIntro } from './SectionIntro';
import { extractAmountFromText, recognizeReceiptText } from '../lib/ocr';

const SECTOR_LOW = 0.7;
const SECTOR_HIGH = 0.95;

function money(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
}

type OcrState =
  | { status: 'idle' }
  | { status: 'processing'; progress: number; fileName: string }
  | { status: 'done'; fileName: string; amount: number }
  | { status: 'not-found'; fileName: string }
  | { status: 'error'; fileName: string };

export function Calculadora() {
  const ref = useReveal<HTMLDivElement>();
  const sectionRef = useSectionReveal<HTMLElement>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bill, setBill] = useState('');
  const [result, setResult] = useState<{
    entered: number;
    payLow: number;
    payHigh: number;
    savingsLow: number;
    savingsHigh: number;
  } | null>(null);
  const [error, setError] = useState(false);
  const [ocr, setOcr] = useState<OcrState>({ status: 'idle' });

  function handleCalculate() {
    const value = parseFloat(bill.replace(/,/g, ''));
    if (!bill || isNaN(value) || value <= 0) {
      setError(true);
      setResult(null);
      return;
    }
    setError(false);
    const savingsLow = value * SECTOR_LOW;
    const savingsHigh = value * SECTOR_HIGH;
    setResult({
      entered: value,
      payLow: value - savingsHigh, // best case: highest % saved, smallest bill paid
      payHigh: value - savingsLow, // worst case: lowest % saved, largest bill paid
      savingsLow,
      savingsHigh,
    });
  }

  async function handleFile(file: File) {
    setOcr({ status: 'processing', progress: 0, fileName: file.name });
    setResult(null);
    try {
      const text = await recognizeReceiptText(file, (progress) =>
        setOcr({ status: 'processing', progress, fileName: file.name })
      );
      const amount = extractAmountFromText(text);
      if (amount === null) {
        setOcr({ status: 'not-found', fileName: file.name });
        return;
      }
      setBill(String(amount));
      setError(false);
      setOcr({ status: 'done', fileName: file.name, amount });
    } catch {
      setOcr({ status: 'error', fileName: file.name });
    }
  }

  function onFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  const midPct = Math.round(((SECTOR_LOW + SECTOR_HIGH) / 2) * 100);

  return (
    <section id={SECTION_IDS.Calculadora} ref={sectionRef} className="section-anchor relative bg-bg">
      <div ref={ref} className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <SectionIntro
          eyebrow="Calculadora"
          title="¿Cuánto podrías ahorrar en tu recibo de CFE?"
          description="Ingresa tu recibo bimestral actual (o adjunta una foto y lo leemos por ti). El cálculo usa el rango que reporta el sector solar residencial para sistemas bien dimensionados — no es una cotización, es un punto de partida."
        />
        <div data-reveal className="rounded-3xl bg-surface border border-line p-6 sm:p-10 grid gap-8 md:grid-cols-2 md:gap-10">
          <div>
            <label htmlFor="billInput" className="block font-heading text-sm text-ink mb-2">
              Importe de tu recibo bimestral de CFE
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-medium">$</span>
              <input
                id="billInput"
                type="number"
                inputMode="decimal"
                min={0}
                step={50}
                value={bill}
                onChange={(e) => {
                  setBill(e.target.value);
                  if (error) setError(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                placeholder="Ej. 3200"
                className="w-full min-h-[56px] rounded-2xl bg-bg border border-[rgba(var(--text-primary-rgb),0.15)] pl-8 pr-4 py-3 text-xl font-heading text-ink placeholder:text-[rgba(var(--text-primary-rgb),0.3)] focus:border-[rgba(var(--accent-rgb),0.6)] focus:outline-none focus:ring-2 focus:ring-[rgba(var(--accent-rgb),0.2)]"
                aria-describedby="billHelp"
                aria-invalid={error}
              />
            </div>
            <p id="billHelp" className="text-xs text-muted mt-2">
              MXN, antes de instalar tu sistema fotovoltaico.
            </p>
            {error && (
              <p role="alert" className="text-xs text-red-500 mt-2">
                Ingresa un importe válido mayor a $0.
              </p>
            )}

            <div className="mt-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                id="receiptUpload"
                onChange={onFileInputChange}
              />
              <label
                htmlFor="receiptUpload"
                className="flex items-center gap-3 rounded-2xl border border-dashed border-[rgba(var(--text-primary-rgb),0.2)] hover:border-[rgba(var(--accent-rgb),0.5)] bg-[rgba(var(--text-primary-rgb),0.02)] px-4 py-3.5 cursor-pointer transition-colors min-h-[44px]"
              >
                {ocr.status === 'processing' ? (
                  <Loader2 size={18} className="text-accent shrink-0 animate-spin" />
                ) : ocr.status === 'done' ? (
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                ) : ocr.status === 'not-found' || ocr.status === 'error' ? (
                  <AlertTriangle size={18} className="text-accent shrink-0" />
                ) : (
                  <Upload size={18} className="text-accent shrink-0" />
                )}
                <span className="text-sm text-muted flex-1">
                  {ocr.status === 'processing' && `Leyendo tu recibo… ${ocr.progress}%`}
                  {ocr.status === 'done' && `Leído: “${ocr.fileName}” — cambiar archivo`}
                  {(ocr.status === 'not-found' || ocr.status === 'error') && `“${ocr.fileName}” — intentar con otra foto`}
                  {ocr.status === 'idle' && 'Adjunta una foto de tu recibo y lo leemos por ti'}
                </span>
              </label>

              {ocr.status === 'done' && (
                <p className="flex items-center gap-1.5 text-xs text-emerald-500 mt-2">
                  <CheckCircle2 size={13} className="shrink-0" />
                  Detectamos {money(ocr.amount)} en “{ocr.fileName}”. Verifica que sea correcto y presiona
                  calcular.
                </p>
              )}
              {ocr.status === 'not-found' && (
                <p className="flex items-center gap-1.5 text-xs text-accent mt-2">
                  <AlertTriangle size={13} className="shrink-0" />
                  No pudimos leer el importe de “{ocr.fileName}” automáticamente. Escríbelo manualmente
                  arriba.
                </p>
              )}
              {ocr.status === 'error' && (
                <p className="flex items-center gap-1.5 text-xs text-red-500 mt-2">
                  <AlertTriangle size={13} className="shrink-0" />
                  No pudimos procesar esa imagen. Intenta con otra foto o escribe el importe manualmente.
                </p>
              )}
              <p className="text-[11px] mt-2 text-[rgba(var(--text-primary-rgb),0.35)]">
                La imagen se procesa en tu navegador (Tesseract.js); nunca se sube a un servidor.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              className="btn-glow mt-5 w-full rounded-full bg-ink text-bg font-medium text-sm px-6 py-3.5 min-h-[48px] active:scale-95"
            >
              Calcular mi ahorro estimado
            </button>
          </div>

          <div className="rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/20 p-6 flex flex-col justify-center gap-3 min-h-[220px]">
            {result ? (
              <>
                <span className="text-xs font-medium uppercase tracking-wide text-emerald-500 flex items-center gap-1.5">
                  <TrendingDown size={14} />
                  Tu estimación de referencia
                </span>
                <p className="text-sm text-muted">
                  Hoy pagas <strong className="text-ink">{money(result.entered)}</strong> por bimestre. Con un
                  sistema bien dimensionado, pagarías:
                </p>
                <p className="font-heading text-3xl text-ink leading-snug">
                  <strong className="text-emerald-500">
                    {money(result.payLow)} – {money(result.payHigh)}
                  </strong>
                </p>
                <p className="text-sm text-muted">
                  Eso es un ahorro de {money(result.savingsLow)} a {money(result.savingsHigh)} por bimestre
                  ({Math.round(SECTOR_LOW * 100)}%–{Math.round(SECTOR_HIGH * 100)}% de tu recibo actual, ~{midPct}% en
                  promedio).
                </p>
                <p className="text-sm text-muted">
                  Con el ritmo de ahorro típico del sector, el sistema suele pagarse solo en 3 a 5 años.
                </p>
              </>
            ) : (
              <div className="text-center text-muted text-sm">
                <Calculator size={28} className="mx-auto mb-3 opacity-50" />
                Ingresa tu recibo (o adjunta una foto) y presiona calcular para ver tu ahorro estimado.
              </div>
            )}
          </div>
        </div>

        <div data-reveal className="grid gap-4 sm:grid-cols-3 mt-10 sm:items-center">
          <div className="rounded-2xl bg-surface border border-line p-5">
            <div className="font-heading text-2xl text-accent text-glow">70%–95%</div>
            <p className="text-sm text-muted mt-2">
              reducción típica en sistemas residenciales bien dimensionados — es la base de este cálculo.
            </p>
            <p className="text-xs mt-3 text-[rgba(var(--text-primary-rgb),0.4)]">Fuente: estimación del sector solar residencial.</p>
          </div>
          <div className="card-glass rounded-[28px] p-6 sm:scale-105 sm:-translate-y-1 relative">
            <div className="font-heading text-3xl text-accent text-glow">3–5 años</div>
            <p className="text-sm text-muted mt-2">retorno de inversión típico de un sistema residencial.</p>
            <p className="text-xs mt-3 text-[rgba(var(--text-primary-rgb),0.4)]">Fuente: promedio del sector solar residencial.</p>
          </div>
          <div className="rounded-2xl bg-surface border border-line p-5">
            <div className="font-heading text-2xl text-accent text-glow">85% / 60%</div>
            <p className="text-sm text-muted mt-2">
              ahorro en verano / promedio anual reportado por el programa federal Techos Solares para el
              Bienestar.
            </p>
            <p className="text-xs mt-3 text-[rgba(var(--text-primary-rgb),0.4)]">
              Ese programa instala gratis en hogares vulnerables de Mexicali, San Felipe y Hermosillo — no
              es una cifra de instalaciones privadas como las de CleanSun en Toluca.
            </p>
          </div>
        </div>

        <div data-reveal className="flex items-start gap-3 mt-6 rounded-2xl bg-[rgba(var(--accent-rgb),0.06)] border border-[rgba(var(--accent-rgb),0.25)] px-5 py-4">
          <Info size={18} className="text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-muted">
            <strong className="text-ink">Esto es una estimación de referencia, no una cotización.</strong> El
            ahorro real depende de tu consumo, tu tarifa de CFE, la orientación de tu techo y otros factores
            que solo se confirman con una visita técnica en sitio.
          </p>
        </div>
      </div>
    </section>
  );
}
