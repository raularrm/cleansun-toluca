import { useRef, useState } from 'react';
import { AlertTriangle, Calculator, CheckCircle2, Info, Loader2, TrendingDown, Upload } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { SECTION_IDS, WHATSAPP_LINK_VISIT } from '../lib/constants';
import { SectionIntro } from './SectionIntro';
import { extractAmountFromText, recognizeReceiptText } from '../lib/ocr';

const SECTOR_LOW = 0.7;
const SECTOR_HIGH = 0.95;
const PRESETS = [1500, 3200, 6000];

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

  function calculateFor(value: number) {
    if (!value || value <= 0) {
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

  function handleCalculate() {
    calculateFor(parseFloat(bill.replace(/,/g, '')));
  }

  function handlePreset(value: number) {
    setBill(String(value));
    calculateFor(value);
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
    <section id={SECTION_IDS.Calculadora} ref={sectionRef} className="accent-on-dark section-anchor relative bg-[#14110e] text-[#faf7f3]">
      <div ref={ref} className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <SectionIntro
          eyebrow="Calculadora"
          title="¿Cuánto podrías ahorrar en tu recibo de CFE?"
          description="El cálculo usa el rango que reporta el sector solar residencial para sistemas bien dimensionados — no es una cotización, es un punto de partida."
          dark
        />
        <div data-reveal className="rounded-[30px] border border-[#faf7f3]/16 grid md:grid-cols-2 overflow-hidden">
          <div className="p-8 sm:p-11 flex flex-col gap-4">
            <label htmlFor="billInput" className="font-heading font-bold text-[15px]">
              Importe de tu recibo bimestral de CFE
            </label>
            <div className="relative">
              <span className="absolute left-[22px] top-1/2 -translate-y-1/2 font-heading font-bold text-2xl text-[#faf7f3]/40">
                $
              </span>
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
                placeholder="3200"
                className="w-full min-h-[68px] rounded-2xl bg-[#faf7f3]/[0.06] border border-[#faf7f3]/20 pl-12 pr-5 py-3.5 font-heading font-bold text-2xl text-[#faf7f3] placeholder:text-[#faf7f3]/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(var(--accent-rgb),0.25)]"
                aria-describedby="billHelp"
                aria-invalid={error}
              />
            </div>
            <p id="billHelp" className="text-[13.5px] text-[#faf7f3]/45 -mt-1">
              MXN, antes de instalar tu sistema fotovoltaico.
            </p>
            {error && (
              <p role="alert" className="text-xs text-red-400 -mt-1">
                Ingresa un importe válido mayor a $0.
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {PRESETS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handlePreset(amount)}
                  className="border border-[#faf7f3]/22 hover:border-accent hover:text-accent text-[#faf7f3] text-sm font-medium px-[18px] py-2.5 rounded-full min-h-[44px] transition-colors"
                >
                  {money(amount)}
                </button>
              ))}
            </div>

            <div>
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
                className="flex items-center gap-3 rounded-2xl border border-dashed border-[#faf7f3]/25 hover:border-accent/60 bg-[#faf7f3]/[0.03] px-4 py-3.5 cursor-pointer transition-colors min-h-[44px]"
              >
                {ocr.status === 'processing' ? (
                  <Loader2 size={18} className="text-accent shrink-0 animate-spin" />
                ) : ocr.status === 'done' ? (
                  <CheckCircle2 size={18} className="text-accent shrink-0" />
                ) : ocr.status === 'not-found' || ocr.status === 'error' ? (
                  <AlertTriangle size={18} className="text-accent shrink-0" />
                ) : (
                  <Upload size={18} className="text-accent shrink-0" />
                )}
                <span className="text-sm text-[#faf7f3]/60 flex-1">
                  {ocr.status === 'processing' && `Leyendo tu recibo… ${ocr.progress}%`}
                  {ocr.status === 'done' && `Leído: “${ocr.fileName}” — cambiar archivo`}
                  {(ocr.status === 'not-found' || ocr.status === 'error') && `“${ocr.fileName}” — intentar con otra foto`}
                  {ocr.status === 'idle' && 'O adjunta una foto de tu recibo y lo leemos por ti'}
                </span>
              </label>

              {ocr.status === 'done' && (
                <p className="flex items-center gap-1.5 text-xs text-accent mt-2">
                  <CheckCircle2 size={13} className="shrink-0" />
                  Detectamos {money(ocr.amount)} en “{ocr.fileName}”. Verifica que sea correcto.
                </p>
              )}
              {ocr.status === 'not-found' && (
                <p className="flex items-center gap-1.5 text-xs text-[#faf7f3]/60 mt-2">
                  <AlertTriangle size={13} className="shrink-0" />
                  No pudimos leer el importe automáticamente. Escríbelo manualmente arriba.
                </p>
              )}
              {ocr.status === 'error' && (
                <p className="flex items-center gap-1.5 text-xs text-red-400 mt-2">
                  <AlertTriangle size={13} className="shrink-0" />
                  No pudimos procesar esa imagen. Intenta con otra foto o escribe el importe manualmente.
                </p>
              )}
              <p className="text-[11px] mt-2 text-[#faf7f3]/35">
                La imagen se procesa en tu navegador (Tesseract.js); nunca se sube a un servidor.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              className="mt-1 inline-flex items-center justify-center gap-2 border border-[#faf7f3]/22 hover:border-accent hover:text-accent text-[#faf7f3] font-medium text-sm px-5 py-3 rounded-full min-h-[48px] transition-colors"
            >
              <Calculator size={16} />
              Calcular con este importe
            </button>

            <a
              href={WHATSAPP_LINK_VISIT}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow mt-1 inline-flex items-center justify-center bg-accent text-accentOn font-medium text-[15px] py-4 rounded-full min-h-[54px]"
            >
              Agendar visita técnica sin costo
            </a>
          </div>

          <div className="p-8 sm:p-11 bg-[rgba(var(--accent-rgb),0.07)] border-t md:border-t-0 md:border-l border-[#faf7f3]/16 flex flex-col justify-center gap-3.5 min-h-[300px]">
            {result ? (
              <>
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  <TrendingDown size={14} />
                  Tu estimación de referencia
                </span>
                <p className="text-[15.5px] text-[#faf7f3]/70 m-0">
                  Hoy pagas <strong className="text-[#faf7f3]">{money(result.entered)}</strong> por bimestre.
                  Con un sistema bien dimensionado, pagarías:
                </p>
                <p className="font-heading font-black text-4xl sm:text-5xl leading-tight tracking-tight text-accent2 m-0">
                  {money(result.payLow)} – {money(result.payHigh)}
                </p>
                <p className="text-[15.5px] text-[#faf7f3]/70 m-0">
                  Eso es un ahorro de {money(result.savingsLow)} a {money(result.savingsHigh)} por bimestre
                  ({Math.round(SECTOR_LOW * 100)}%–{Math.round(SECTOR_HIGH * 100)}% de tu recibo actual, ~{midPct}%
                  en promedio).
                </p>
                <p className="text-[15.5px] text-[#faf7f3]/70 m-0">
                  Con el ritmo de ahorro típico del sector, el sistema suele pagarse solo en 3 a 5 años.
                </p>
              </>
            ) : (
              <div className="text-center text-[#faf7f3]/50 text-sm">
                <Calculator size={28} className="mx-auto mb-3 opacity-50" />
                Ingresa tu recibo (o elige un monto) para ver tu ahorro estimado.
              </div>
            )}
          </div>
        </div>

        <div data-reveal className="flex items-start gap-3 mt-8 rounded-2xl bg-[rgba(var(--accent-rgb),0.06)] border border-[rgba(var(--accent-rgb),0.25)] px-5 py-4">
          <Info size={18} className="text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-[#faf7f3]/70 m-0">
            <strong className="text-[#faf7f3]">Esto es una estimación de referencia, no una cotización.</strong> El
            ahorro real depende de tu consumo, tu tarifa de CFE, la orientación de tu techo y otros factores que
            solo se confirman con una visita técnica en sitio. La cifra de 85% en verano / 60% promedio anual que
            reporta el programa federal Techos Solares para el Bienestar corresponde a instalaciones gratuitas en
            Mexicali, San Felipe y Hermosillo — no es una cifra de instalaciones privadas como las de CleanSun en
            Toluca.
          </p>
        </div>
      </div>
    </section>
  );
}
