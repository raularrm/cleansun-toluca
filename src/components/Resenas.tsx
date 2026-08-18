import { useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { MAPS_LINK, SECTION_IDS } from '../lib/constants';
import { SectionIntro } from './SectionIntro';
import { Lightbox } from './Lightbox';
import fotovoltaicoSrc from '../assets/img/cleansun-fotovoltaico-real.jpg';
import cargadorSrc from '../assets/img/cleansun-cargador-mercedes-real.jpg';
import fotovoltaico2ThumbSrc from '../assets/img/cleansun-fotovoltaico-real-2-thumb.jpg';
import fotovoltaico2FullSrc from '../assets/img/cleansun-fotovoltaico-real-2.jpg';

/**
 * Verbatim text, copied exactly as published on CleanSun's Google Business
 * profile — not paraphrased. Reviewer names are the display names Google
 * already shows publicly on the listing.
 */
const REVIEWS = [
  {
    text: 'Al inicio tenia muchas dudas sobre el resultado y la funcionalidad de mi instalación, sin embargo fue una de mis mejores decisiones ya que el Ingeniero Medina es una persona muy profesional y la instalación además de limpia y óptima, se realizo en los tiempos prometidos. Sin duda la energía solar es la mejor alternativa hoy en día.',
    who: 'Ismael Aleman',
    tag: 'Reseña de Google',
  },
  {
    text: 'Excelente atención y amabilidad por parte de Maurilio. Siempre pendiente y respondiendo al instante. Me instaló cargador eléctrico para mi auto y ahora puedo ahorrar mucho!!',
    who: 'A. Salas',
    tag: 'Reseña de Google',
  },
  {
    text: 'Tener paneles solares es una gran ventaja, ahorras, reduces tu huella de carbono y dan un excelente servicio, muy atentos siempre',
    who: 'Pilar Escalona',
    tag: 'Reseña de Google',
  },
  {
    text: 'Su servicio y atención es de inmejorable calidad, Altamente recomendable.',
    who: 'Cliente de Google',
    tag: 'Reseña de Google',
  },
  {
    text: 'Todo en el mismo paquete 📦 gracias ingeniero trabajo super recomendable',
    who: 'Cliente de Google',
    tag: 'Reseña de Google',
  },
  {
    text: 'Estoy muy contenta es una gran inversión.',
    who: 'Cliente de Google',
    tag: 'Reseña de Google',
  },
];

const GALLERY = [
  {
    thumb: fotovoltaicoSrc,
    full: fotovoltaicoSrc,
    alt: 'Sistema fotovoltaico instalado en un techo, foto real de la ficha de Google Negocios de CleanSun',
    caption: 'Instalación fotovoltaica sobre techo industrial',
    source: 'Foto de la ficha de Google de CleanSun',
  },
  {
    thumb: fotovoltaico2ThumbSrc,
    full: fotovoltaico2FullSrc,
    alt: 'Otro ángulo del mismo sistema fotovoltaico sobre techo industrial, mostrando la fachada del edificio, foto real de la ficha de Google Negocios de CleanSun',
    caption: 'Mismo techo, vista desde otro ángulo',
    source: 'Foto de la ficha de Google de CleanSun',
  },
  {
    thumb: cargadorSrc,
    full: cargadorSrc,
    alt: 'Cargador para auto eléctrico Mercedes-Benz instalado en pared exterior residencial, foto real tomada de una reseña de cliente',
    caption: 'Cargador eléctrico instalado en casa (Mercedes-Benz)',
    source: 'Foto de una reseña de cliente en Google',
  },
];

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className="fill-accent" />
      ))}
    </div>
  );
}

export function Resenas() {
  const ref = useReveal<HTMLDivElement>();
  const sectionRef = useSectionReveal<HTMLElement>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id={SECTION_IDS['Reseñas']} ref={sectionRef} className="section-anchor relative bg-surface2">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <SectionIntro
          eyebrow="Reseñas"
          title="5.0 estrellas en Google, con nombre y apellido"
          description="10 reseñas, las 10 con la calificación máxima. Aquí están, tal cual como fueron escritas — sin parafrasear."
        />
        <div className="grid gap-6 lg:grid-cols-[280px_1fr] mb-6">
          <div data-reveal className="card-glass rounded-[32px] p-8 text-center flex flex-col items-center justify-center gap-3">
            <div className="font-heading text-6xl text-accent text-glow">5.0</div>
            <Stars size={18} />
            <p className="text-sm text-muted">10 reseñas en Google</p>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maps mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-ink bg-[rgba(var(--text-primary-rgb),0.08)] border border-[rgba(var(--text-primary-rgb),0.2)] rounded-full px-3.5 py-2 min-h-[36px]"
            >
              <ExternalLink size={12} />
              Verificar en Google Maps
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {REVIEWS.slice(0, 3).map((r, i) => (
              <div
                key={r.who + r.text.slice(0, 10)}
                data-reveal
                className={`bg-surface border border-line p-5 flex flex-col gap-3 ${
                  i === 0 ? 'sm:col-span-2 rounded-[28px] sm:p-6' : 'rounded-2xl'
                }`}
              >
                <Stars />
                <p className={`text-muted flex-1 ${i === 0 ? 'text-base' : 'text-sm'}`}>“{r.text}”</p>
                <div className="flex items-center gap-2 pt-2 border-t border-line">
                  <div className="w-8 h-8 rounded-full bg-[rgba(var(--accent-rgb),0.15)] text-accent flex items-center justify-center font-heading text-xs shrink-0">
                    {r.who[0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ink">{r.who}</p>
                    <p className="text-[11px] text-[rgba(var(--text-primary-rgb),0.45)]">{r.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {REVIEWS.slice(3).map((r, i) => (
            <div
              key={r.who + r.text.slice(0, 10)}
              data-reveal
              className={`bg-surface border border-line p-5 flex flex-col gap-3 ${i % 2 === 0 ? 'rounded-2xl' : 'rounded-[28px]'}`}
            >
              <Stars />
              <p className="text-sm text-muted flex-1">“{r.text}”</p>
              <div className="flex items-center gap-2 pt-2 border-t border-line">
                <div className="w-8 h-8 rounded-full bg-[rgba(var(--accent-rgb),0.15)] text-accent flex items-center justify-center font-heading text-xs shrink-0">
                  G
                </div>
                <div>
                  <p className="text-xs font-medium text-ink">{r.who}</p>
                  <p className="text-[11px] text-[rgba(var(--text-primary-rgb),0.45)]">{r.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-8 rounded-2xl border-2 border-dashed border-line bg-[rgba(var(--text-primary-rgb),0.02)] p-6 flex items-start gap-4 text-muted text-sm">
          <span className="shrink-0 font-heading text-ink">Nota</span>
          <p>
            Estas 6 reseñas son las que pudimos extraer con texto completo de la ficha pública de Google de
            CleanSun (de un total de 10, todas a 5 estrellas). Las 4 restantes están en Google Maps pero su
            texto no quedó accesible al construir este sitio; puedes leerlas todas directamente en la ficha
            de Google.
          </p>
        </div>

        {/* Trabajos realizados — real photos sourced from Google Maps */}
        <div className="mt-16">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
            <div>
              <h2 className="font-heading text-2xl text-ink">Trabajos realizados</h2>
              <p className="text-muted text-sm mt-1">Fotos reales, tomadas de la ficha pública de Google de CleanSun.</p>
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maps shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-ink bg-[rgba(var(--text-primary-rgb),0.08)] border border-[rgba(var(--text-primary-rgb),0.2)] rounded-full px-3.5 py-2 min-h-[36px]"
            >
              <ExternalLink size={12} />
              Ver más fotos en Google Maps
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {GALLERY.map((g, i) => (
              <figure
                key={g.thumb}
                data-reveal
                className="overflow-hidden rounded-3xl bg-surface border border-line"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="relative block w-full aspect-[4/3] group"
                  aria-label={`Ampliar foto: ${g.caption}`}
                >
                  <img
                    src={g.thumb}
                    alt={g.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-medium bg-black/60 backdrop-blur-sm text-white rounded-full px-3 py-1 border border-white/15">
                    Foto real
                  </span>
                </button>
                <figcaption className="p-4">
                  <p className="text-sm text-ink font-medium">{g.caption}</p>
                  <p className="text-xs mt-0.5 text-[rgba(var(--text-primary-rgb),0.4)]">{g.source}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="text-xs mt-4 text-[rgba(var(--text-primary-rgb),0.4)]">
            Son las {GALLERY.length} fotografías de trabajos reales que pudimos extraer de la ficha de
            Google al construir este sitio (de un total de 15 en su perfil) — sin repetir tomas
            duplicadas o casi idénticas. No las completamos con imágenes generadas por IA porque esta
            sección debe mostrar trabajo real — el resto puedes verlo directamente en Google Maps con el
            botón de arriba.
          </p>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          src={GALLERY[lightboxIndex].full}
          alt={GALLERY[lightboxIndex].alt}
          caption={`${GALLERY[lightboxIndex].caption} — ${GALLERY[lightboxIndex].source}`}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
