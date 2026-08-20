export function SectionIntro({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-2xl mb-10 sm:mb-14">
      <div className="text-[13px] font-semibold tracking-[0.16em] uppercase text-accent">{eyebrow}</div>
      <h2
        className={`font-heading font-black text-[clamp(24px,2.8vw,38px)] leading-[1.05] tracking-tight mt-3 ${
          dark ? 'text-[#faf7f3]' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base sm:text-lg mt-4 ${dark ? 'text-[#faf7f3]/70' : 'text-muted'}`}>{description}</p>
      )}
    </div>
  );
}
