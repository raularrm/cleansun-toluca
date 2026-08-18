import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 bg-bg">
      <span className="font-heading italic text-6xl text-ink">404</span>
      <p className="text-muted mt-3 max-w-sm">Esta página no existe. Puede que el enlace esté roto o incompleto.</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-ink text-bg font-medium text-sm px-6 py-3 min-h-[44px] inline-flex items-center"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
