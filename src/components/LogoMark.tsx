import logoSrc from '../assets/img/cleansun-logo.png';

export function LogoMark({ className }: { className?: string }) {
  return <img src={logoSrc} alt="" aria-hidden="true" className={`${className ?? ''} object-contain`} />;
}
