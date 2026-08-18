import { PageHeader } from '../components/PageHeader';
import { PrivacyNotice } from '../components/PrivacyNotice';

export function PrivacidadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacidad"
        title="Aviso de privacidad y cookies"
        description="Cómo tratamos tus datos en este sitio, explicado sin letras chiquitas."
      />
      <PrivacyNotice />
    </>
  );
}
