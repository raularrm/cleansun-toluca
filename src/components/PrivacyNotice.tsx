import { useReveal } from '../lib/useReveal';
import { PrivacyContent } from './PrivacyContent';

export function PrivacyNotice() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-surface2">
      <div ref={ref} className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <div data-reveal className="rounded-3xl bg-surface border border-line p-6 sm:p-10">
          <PrivacyContent />
        </div>
      </div>
    </section>
  );
}
