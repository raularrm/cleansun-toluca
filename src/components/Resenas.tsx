import { useState } from 'react';
import { Star } from 'lucide-react';
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
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 sm:mb-14">
          <SectionIntro
            eyebrow="Reseñas"
            title="5.0 estrellas en Google, con nombre y apellido"
            description="10 reseñas, las 10 con la calificación máxima. Aquí están, tal cual como fueron escritas — sin parafrasear."
          />
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 border border-line hover:border-ink text-ink font-medium text-sm px-[22px] py-3 rounded-full min-h-[44px] transition-colors -mt-10 sm:-mt-14"
          >
            Verificar en Google Maps
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <blockquote
              key={r.who + r.text.slice(0, 10)}
              data-reveal
              className={
                i === 0
                  ? 'sm:col-span-2 m-0 bg-[#14110e] text-[#faf7f3] rounded-[26px] p-8 flex flex-col gap-5'
                  : 'm-0 bg-surface border border-line rounded-[26px] p-7 flex flex-col gap-4'
              }
            >
              <Stars size={i === 0 ? 15 : 14} />
              <p
                className={
                  i === 0
                    ? 'font-heading font-semibold text-[clamp(19px,1.9vw,27px)] leading-[1.3] tracking-tight m-0'
                    : 'text-[16.5px] leading-relaxed text-ink m-0'
                }
              >
                “{r.text}”
              </p>
              <footer
                className={`text-sm mt-auto ${i === 0 ? 'text-[#faf7f3]/55' : 'text-[13.5px] text-[rgba(var(--text-primary-rgb),0.45)]'}`}
              >
                {r.who} · {r.tag}
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="text-[13.5px] leading-relaxed text-[rgba(var(--text-primary-rgb),0.45)] mt-7 max-w-[86ch]">
          Estas 6 reseñas son las que pudimos extraer con texto completo de la ficha pública de Google de
          CleanSun (de un total de 10, todas a 5 estrellas). Las 4 restantes están en Google Maps pero su
          texto no quedó accesible al construir este sitio; puedes leerlas todas directamente en la ficha
          de Google.
        </p>

        {/* Trabajos realizados — real photos sourced from Google Maps */}
        <div className="mt-20">
          <h3 className="font-heading font-black text-[clamp(26px,3vw,40px)] tracking-tight text-ink">
            Trabajos realizados
          </h3>
          <p className="text-[15.5px] text-muted mt-2.5">
            Fotos reales, tomadas de la ficha pública de Google de CleanSun.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-7">
            {GALLERY.map((g, i) => (
              <figure key={g.thumb} data-reveal className="m-0 overflow-hidden rounded-[22px] bg-surface border border-line">
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
                </button>
                <figcaption className="px-[18px] py-4 text-[14.5px] text-ink">{g.caption}</figcaption>
              </figure>
            ))}
          </div>

          <p className="text-xs mt-4 text-[rgba(var(--text-primary-rgb),0.4)]">
            Son las {GALLERY.length} fotografías de trabajos reales que pudimos extraer de la ficha de
            Google al construir este sitio (de un total de 15 en su perfil) — sin repetir tomas
            duplicadas o casi idénticas. No las completamos con imágenes generadas por IA porque esta
            sección debe mostrar trabajo real.
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
