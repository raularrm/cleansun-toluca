import { PageHeader } from '../components/PageHeader';
import { TerminosNotice } from '../components/TerminosNotice';

export function TerminosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Términos"
        title="Términos y condiciones"
        description="Cómo operan nuestros servicios de instalación, explicado en claro."
      />
      <TerminosNotice />
    </>
  );
}
