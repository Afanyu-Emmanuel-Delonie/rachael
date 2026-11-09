const YEARS = [
  {
    year: "2021",
    label: "The Beginning",
    verse: "Two are better than one, because they have a good return for their labor.",
    ref: "Ecclesiastes 4:9",
  },
  {
    year: "2022",
    label: "Growing Together",
    verse: "A friend loves at all times, and a brother is born for a time of adversity.",
    ref: "Proverbs 17:17",
  },
  {
    year: "2023",
    label: "Through the Hard Days",
    verse: "The Lord himself goes before you and will be with you; he will never leave you nor forsake you.",
    ref: "Deuteronomy 31:8",
  },
  {
    year: "2024",
    label: "Still Standing",
    verse: "And we know that in all things God works for the good of those who love him.",
    ref: "Romans 8:28",
  },
  {
    year: "2025",
    label: "A New Chapter",
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    ref: "Jeremiah 29:11",
  },
];

export default function YearVerses() {
  return (
    <section id="years" className="py-20">
      <div className="mb-10 px-6 text-center sm:px-10">
        <p className="font-letter text-lg text-blue-soft">since day one 🕊️</p>
        <h2 className="mt-1 text-4xl font-extrabold tracking-tight text-text">Every Year, A Word</h2>
        <p className="mt-2 text-sm text-muted">
          From 2021 to now — a verse for every year we&apos;ve known each other.
        </p>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent" />

        <div className="flex gap-5 overflow-x-auto no-scrollbar px-10 pb-4" style={{ scrollSnapType: "x mandatory" }}>
          {YEARS.map((item) => (
            <div
              key={item.year}
              style={{ scrollSnapAlign: "start" }}
              className="flex-none w-72 rounded-card border border-white/[0.06] bg-card px-6 py-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-blue-soft">{item.year}</span>
                <span className="rounded-pill border border-blue/20 bg-blue/10 px-3 py-1 text-xs font-semibold text-blue-soft">
                  {item.label}
                </span>
              </div>
              <div className="h-px bg-white/[0.06]" />
              <blockquote className="font-letter text-lg leading-8 text-text/90 flex-1">
                &ldquo;{item.verse}&rdquo;
              </blockquote>
              <p className="text-xs font-semibold text-blue-soft">{item.ref}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
