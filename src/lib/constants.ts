export const NAV_LINKS = ['Inicio', 'Servicios', 'Calculadora', 'Reseñas', 'Contacto'] as const;

export const SECTION_IDS: Record<(typeof NAV_LINKS)[number], string> = {
  Inicio: 'inicio',
  Servicios: 'servicios',
  Calculadora: 'calculadora',
  'Reseñas': 'resenas',
  Contacto: 'contacto',
};

// Single-page scroll site: "/" is the only content route, all sections
// live on it as anchors (SECTION_IDS above). Privacy stays a separate
// route, linked only from the footer.
export const PRIVACY_ROUTE = '/privacidad';

// sessionStorage key used to hand off a target section id when the nav is
// clicked from a route other than "/" (e.g. from /privacidad): Nav stores
// the id and navigates home, Home reads it once mounted and finishes the
// scroll.
export const PENDING_SECTION_KEY = 'cleansun-pending-section';

export const WHATSAPP_NUMBER = '527224758931';
export const WHATSAPP_LINK = 'https://wa.me/527224758931';
export const WHATSAPP_LINK_QUOTE = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola, quiero cotizar un sistema fotovoltaico con CleanSun.'
)}`;
export const PHONE_DISPLAY = '722 475 8931';
export const PHONE_TEL = 'tel:+527224758931';

export const MAPS_LINK = 'https://www.google.com/maps/place/?q=place_id:ChIJiz0kx3eJzYUR86YUWiiY9Vc';

export const ADDRESS_LINE = 'Blvd. José María Pino Suárez Sur 2114-B';
export const ADDRESS_CITY = 'Toluca de Lerdo, Estado de México';
