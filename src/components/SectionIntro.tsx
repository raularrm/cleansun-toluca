export function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl mb-8 sm:mb-10">
      <span className="inline-flex items-center text-xs font-medium tracking-wide uppercase text-accent bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.25)] rounded-full px-3 py-1.5 mb-4">
        {eyebrow}
      </span>
      <h2 className="font-heading font-black text-3xl sm:text-4xl text-ink">{title}</h2>
      {description && <p className="text-muted text-base sm:text-lg mt-3">{description}</p>}
    </div>
  );
}
