import { MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK_QUOTE } from '../lib/constants';

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK_QUOTE}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-40 flex items-center justify-center rounded-full w-14 h-14 min-w-[44px] min-h-[44px] text-white"
      aria-label="Cotizar por WhatsApp"
      title="Cotizar por WhatsApp"
    >
      <MessageCircle size={26} fill="currentColor" className="text-white" strokeWidth={0} />
    </a>
  );
}
