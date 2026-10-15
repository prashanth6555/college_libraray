export default function SectionHeading({ eyebrow, title, text, light = false, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${light ? "text-gold" : "text-gold-deep"}`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl ${light ? "text-cream" : "text-ink"}`}
        >
          {title}
        </h2>
        {text && (
          <p className={`mt-3 text-base leading-relaxed ${light ? "text-cream/75" : "text-mist"}`}>
            {text}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
