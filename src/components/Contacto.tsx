import { Clock, ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { SectionIntro } from './SectionIntro';
import {
  ADDRESS_CITY,
  ADDRESS_LINE,
  MAPS_LINK,
  PHONE_DISPLAY,
  PHONE_TEL,
  SECTION_IDS,
} from '../lib/constants';

const HOURS = [
  { day: 'Lunes a viernes', value: '9:00 – 18:00' },
  { day: 'Sábado', value: '9:00 – 12:00' },
  { day: 'Domingo', value: 'Cerrado', closed: true },
];

export function Contacto() {
  const ref = useReveal<HTMLDivElement>();
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section id={SECTION_IDS.Cobertura} ref={sectionRef} className="section-anchor relative bg-bg">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <SectionIntro
          eyebrow="Cobertura"
          title="Estamos en Toluca, con dirección verificable"
          description="Sin intermediarios ni call center: escribes por WhatsApp y contesta el mismo equipo que va a subir al techo."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div data-reveal className="rounded-3xl bg-surface border border-line p-6 sm:p-8 flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[rgba(var(--accent-rgb),0.1)] text-accent flex items-center justify-center shrink-0">
                <MessageCircle size={19} />
              </div>
              <div>
                <p className="font-heading text-sm text-ink">WhatsApp / Teléfono</p>
                <a href={PHONE_TEL} className="text-muted text-sm hover:text-ink transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-5 border-t border-line">
              <div className="w-11 h-11 rounded-full bg-[rgba(var(--accent-rgb),0.1)] text-accent flex items-center justify-center shrink-0">
                <Clock size={19} />
              </div>
              <div className="flex-1">
                <p className="font-heading text-sm text-ink mb-2">Horario de atención</p>
                <table className="w-full text-sm">
                  <tbody>
                    {HOURS.map((h) => (
                      <tr key={h.day} className="border-t border-line first:border-t-0">
                        <td className="py-1.5 text-muted">{h.day}</td>
                        <td className={`py-1.5 text-right ${h.closed ? 'text-red-500' : 'text-ink'}`}>
                          {h.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-5 border-t border-line">
              <p className="font-heading text-sm text-ink mb-3">Ubicación</p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maps group flex items-center justify-between gap-3 rounded-2xl border border-line bg-bg p-4"
                aria-label="Abrir la dirección de CleanSun en Google Maps para verificarla (se abre en una pestaña nueva)"
              >
                <span className="flex items-start gap-2.5">
                  <MapPin size={17} className="text-accent shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-sm font-medium text-ink transition-colors">
                      {ADDRESS_LINE}
                    </span>
                    <span className="block text-xs text-[rgba(var(--text-primary-rgb),0.4)]">{ADDRESS_CITY}</span>
                  </span>
                </span>
                <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-ink bg-[rgba(var(--text-primary-rgb),0.1)] border border-[rgba(var(--text-primary-rgb),0.25)] rounded-full px-3 py-1.5 whitespace-nowrap">
                  <ExternalLink size={12} />
                  Ver en Maps
                </span>
              </a>
              <p className="text-xs mt-2.5 text-[rgba(var(--text-primary-rgb),0.35)]">
                Este enlace abre la ficha pública de CleanSun en Google Maps, donde también puedes leer las
                10 reseñas originales.
              </p>
            </div>
          </div>

          <div data-reveal className="rounded-3xl overflow-hidden border border-line min-h-[320px] relative">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maps absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 text-xs font-medium bg-black/70 backdrop-blur-sm text-white rounded-full px-4 py-2.5 min-h-[44px] border border-white/15"
            >
              <ExternalLink size={12} />
              Verificar en Google Maps
            </a>
            <iframe
              title="Mapa de ubicación de CleanSun en Toluca"
              src="https://www.google.com/maps?q=CleanSun+Paneles+Solares+Toluca,+Blvd+Jose+Maria+Pino+Suarez+Sur+2114-B,+Toluca+de+Lerdo&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[320px] border-0 grayscale-[15%] contrast-[1.05]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
