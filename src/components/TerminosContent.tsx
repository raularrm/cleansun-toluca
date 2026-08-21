import { PHONE_DISPLAY, WHATSAPP_LINK } from '../lib/constants';

export function TerminosContent() {
  return (
    <div className="space-y-5 text-sm text-muted leading-relaxed">
      <p>
        Estos términos y condiciones aplican a los servicios de instalación fotovoltaica y de cargadores
        para autos eléctricos que ofrece CleanSun en Toluca, Estado de México, y a la información
        presentada en este sitio.
      </p>

      <div>
        <p className="font-heading text-ink text-base mb-1.5">Alcance del servicio</p>
        <p>
          El servicio incluye el dimensionamiento del sistema según tu consumo, la instalación por parte
          de nuestro equipo técnico, y el trámite de interconexión y medición neta ante CFE. El alcance
          exacto de cada proyecto (equipo instalado, plazos, entregables) se confirma por escrito antes de
          iniciar la instalación.
        </p>
      </div>

      <div>
        <p className="font-heading text-ink text-base mb-1.5">Cotizaciones</p>
        <p>
          Las cifras que muestra la calculadora de este sitio son una estimación de referencia, no una
          cotización — el monto real depende de la visita técnica. Este sitio no procesa pagos ni muestra
          precios; cualquier cotización formal se entrega directamente por nuestro equipo.
        </p>
      </div>

      <div>
        <p className="font-heading text-ink text-base mb-1.5">Garantías</p>
        <p>
          Consulta la sección de garantías de nuestro sitio para el resumen de cobertura de equipo y de
          mano de obra.{' '}
          <span className="text-[rgba(var(--text-primary-rgb),0.45)]">
            [PENDIENTE: incorporar aquí los términos exactos de garantía una vez confirmados con CleanSun.]
          </span>
        </p>
      </div>

      <div>
        <p className="font-heading text-ink text-base mb-1.5">Cancelaciones y reembolsos</p>
        <p className="text-[rgba(var(--text-primary-rgb),0.45)]">
          [PENDIENTE: definir con CleanSun la política de cancelación de un proyecto ya contratado y, en su
          caso, de reembolso de anticipos.]
        </p>
      </div>

      <div>
        <p className="font-heading text-ink text-base mb-1.5">Responsabilidad</p>
        <p className="text-[rgba(var(--text-primary-rgb),0.45)]">
          [PENDIENTE: definir con un asesor legal el alcance de responsabilidad de CleanSun ante daños,
          retrasos de CFE u otras causas fuera de su control.]
        </p>
      </div>

      <div>
        <p className="font-heading text-ink text-base mb-1.5">Contacto</p>
        <p>
          Para dudas sobre estos términos, escríbenos directamente al {PHONE_DISPLAY} por{' '}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>

      <p className="text-xs pt-4 border-t border-line text-[rgba(var(--text-primary-rgb),0.35)]">
        Este es un borrador estructural de términos y condiciones, pensado para que CleanSun y un asesor
        legal lo completen con el detalle contractual real antes de considerarlo vigente.
      </p>
    </div>
  );
}
