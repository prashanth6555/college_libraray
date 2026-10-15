const themes = {
  "Computer Science": ["#10243a", "#1d6a86", "#f2d7a2"],
  Literature: ["#4e2230", "#b86a45", "#f8e6cc"],
  Science: ["#0e3334", "#1f8a78", "#d7f3ec"],
  History: ["#3a2a1c", "#a56b3c", "#f3e1c4"],
  Business: ["#1a2744", "#3e5f86", "#e0b15a"],
  Engineering: ["#1c2430", "#4c6578", "#f0d7a4"],
  Psychology: ["#3a2144", "#8d4d6a", "#f6d7e4"],
  Arts: ["#3f2a14", "#c4843a", "#fff1d6"],
};

function motif(id) {
  let hash = 0;
  for (const char of id) hash = (hash * 33 + char.charCodeAt(0)) % 997;
  return hash % 4;
}

export default function BookCover({ book, className = "" }) {
  const [from, to, foil] = themes[book.category] ?? themes.Literature;
  const pattern = motif(book.id);
  const compact = book.title.length > 32;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(155deg, ${from}, ${to})` }}
      role="img"
      aria-label={`Cover of ${book.title} by ${book.author}`}
    >
      <div className="absolute inset-y-0 left-0 w-[7%] bg-black/30" />
      <div className="absolute inset-[7%] border border-white/25" />
      {pattern === 0 && (
        <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full border border-white/20" />
      )}
      {pattern === 1 && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
      )}
      {pattern === 2 && (
        <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(135deg,transparent,transparent_10px,rgba(255,255,255,0.35)_10px,rgba(255,255,255,0.35)_11px)]" />
      )}
      {pattern === 3 && (
        <div className="absolute bottom-16 right-4 flex gap-1">
          <span className="h-10 w-1.5 bg-white/30" />
          <span className="h-16 w-1.5 bg-white/45" />
          <span className="h-7 w-1.5 bg-white/25" />
        </div>
      )}
      <div className="absolute inset-x-[12%] top-[12%] bottom-[22%] flex flex-col">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/70">
          {book.category}
        </p>
        <h3
          className="mt-3 font-display font-semibold leading-tight text-white"
          style={{ fontSize: compact ? "1.05rem" : "1.35rem" }}
        >
          {book.title}
        </h3>
      </div>
      <div className="absolute inset-x-[12%] bottom-[8%] flex items-end justify-between gap-3">
        <p className="text-[0.72rem] font-medium leading-snug" style={{ color: foil }}>
          {book.author}
        </p>
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[0.6rem] font-semibold"
          style={{ borderColor: foil, color: foil }}
        >
          MC
        </span>
      </div>
    </div>
  );
}
