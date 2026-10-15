export default function PageHero({ eyebrow, title, text, image }) {
  return (
    <section className="relative -mt-20 overflow-hidden bg-ink text-cream">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="shell relative pb-12 pt-32 md:pb-16 md:pt-36">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h1>
        {text && <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">{text}</p>}
      </div>
    </section>
  );
}
