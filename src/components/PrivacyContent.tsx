import { PHONE_DISPLAY, WHATSAPP_LINK } from '../lib/constants';

export function PrivacyContent() {
  return (
    <div className="space-y-5 text-sm text-muted leading-relaxed">
      <p>
        CleanSun, con domicilio en Blvd. José María Pino Suárez Sur 2114-B, Toluca de Lerdo, Estado de
        México, es responsable del tratamiento de los datos personales que nos compartas por este medio,
        conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
      </p>

      <div>
        <p className="font-heading text-ink text-base mb-1.5">¿Qué datos recabamos en este sitio?</p>
        <p>
          Este sitio, por sí mismo, no tiene servidor propio de formularios ni base de datos: no
          almacenamos tu nombre, teléfono o correo al navegarlo. La calculadora de ahorro corre por
          completo en tu navegador — el importe que ingresas, y la foto de tu recibo si la adjuntas, se
          procesan en tu propio dispositivo y no se envían ni se guardan en ningún servidor. Para leer el
          importe de la foto usamos Tesseract.js, una librería de reconocimiento de texto que descarga un
          modelo de idioma la primera vez que la usas; esa descarga no incluye ni transmite tu imagen.
        </p>
      </div>

      <div>
        <p className="font-heading text-ink text-base mb-1.5">Cuando escribes por WhatsApp</p>
        <p>
          Si usas los botones de WhatsApp, se abre una conversación directa al {PHONE_DISPLAY} a través de{' '}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            WhatsApp
          </a>
          . Esos mensajes y los datos que decidas compartir ahí (nombre, dirección, consumo eléctrico) se
          manejan bajo la política de privacidad de WhatsApp/Meta, no la de este sitio. Los usamos
          únicamente para cotizar y agendar tu visita técnica.
        </p>
      </div>

      <div>
        <p className="font-heading text-ink text-base mb-1.5">Cookies y almacenamiento local</p>
        <p>
          Usamos una cookie estrictamente necesaria para recordar que ya aceptaste este aviso, y así no
          mostrártelo en cada visita. El mapa incrustado de la sección de contacto carga contenido de
          Google Maps, que puede establecer sus propias cookies conforme a la política de privacidad de
          Google. Este sitio no usa cookies de publicidad ni de rastreo propio, y no vendemos datos a
          terceros.
        </p>
      </div>

      <div>
        <p className="font-heading text-ink text-base mb-1.5">Tus derechos ARCO</p>
        <p>
          Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de los datos que
          nos compartas por WhatsApp escribiendo directamente al {PHONE_DISPLAY}.
        </p>
      </div>

      <p className="text-xs pt-4 border-t border-line text-[rgba(var(--text-primary-rgb),0.35)]">
        Este aviso describe el funcionamiento técnico real del sitio. No sustituye una revisión legal
        formal; si CleanSun requiere un aviso de privacidad con validez plena conforme a la LFPDPPP, se
        recomienda que un abogado especializado lo revise y complete con el detalle corporativo
        correspondiente.
      </p>
    </div>
  );
}
