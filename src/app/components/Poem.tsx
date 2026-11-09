const LINES = [
  "You came into my life like a plot twist nobody saw,",
  "A junior with the audacity, breaking every unwritten law.",
  "Called me Biggie like it was nothing, chest out, no fear,",
  "And somehow that became the best thing I heard all year.",
  "",
  "We vibed on the things that don't need explaining,",
  "Laughed at the jokes still funny without the framing.",
  "Senior, junior titles we wore but never really meant,",
  "Because real ones don't count the years, just the moments spent.",
  "",
  "So here's to you, Rachael, my smallie, my person,",
  "The one who made the boring days somehow worth it.",
  "Grow loud, grow soft, grow exactly as you are ",
  "You were always, always going to be a star. 💙",
];

export default function Poem() {
  return (
    <section id="poem" className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-2xl">
        {/* Card */}
        <div className="relative overflow-hidden rounded-card border border-white/10 bg-surface px-8 py-12 sm:px-14 sm:py-16">

          {/* Decorative corner blobs */}
          <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-blue/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-blue-soft/10 blur-3xl" />

          {/* Decorative dots top-right */}
          <div className="pointer-events-none absolute right-8 top-8 grid grid-cols-3 gap-1.5 opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-blue-soft" />
            ))}
          </div>

          {/* Decorative line bottom-left */}
          <div className="pointer-events-none absolute bottom-8 left-8 flex flex-col gap-1.5 opacity-20">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-px bg-blue-soft" style={{ width: `${(i + 1) * 16}px` }} />
            ))}
          </div>

          {/* Label */}
          <span className="inline-flex items-center rounded-pill border border-blue/30 bg-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-soft">
            A Birthday Poem
          </span>

          {/* Title */}
          <h2 className="mt-5 font-letter text-4xl text-text sm:text-5xl">
            For You, <span className="text-blue-soft">Rachael</span> 💙
          </h2>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-xs text-muted">✦</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          {/* Poem lines */}
          <blockquote className="mt-8 space-y-3 font-letter text-xl leading-9 text-text/90">
            {LINES.map((line, i) =>
              line === "" ? <div key={i} className="h-3" /> : <p key={i}>{line}</p>
            )}
          </blockquote>

          {/* Signature */}
          <div className="mt-10 flex items-end justify-between">
            <p className="font-letter text-base italic text-muted">— With love, from your Biggie 💙</p>
            <span className="text-2xl">✉️</span>
          </div>
        </div>
      </div>
    </section>
  );
}
