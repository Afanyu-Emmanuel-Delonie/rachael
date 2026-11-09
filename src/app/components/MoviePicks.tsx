const MOVIES = [
  {
    title: "Three Hearts, One Love",
    year: "2026",
    tag: "Latest",
    youtubeId: "Dmn8ux2i7K0",
  },
  {
    title: "Money Yab Man",
    year: "Classic",
    tag: "Sam Loco Era",
    youtubeId: "qEJ7cQEQy6w",
  },
  {
    title: "To Freedom",
    year: "2026",
    tag: "Latest",
    youtubeId: "uS99ejqipBo",
  },
  {
    title: "Eat & Run Friends",
    year: "Classic",
    tag: "Osuofia & Sam Loco",
    youtubeId: "mGGLGtM1wtA",
  },
  {
    title: "A Place to Breathe",
    year: "2026",
    tag: "Latest",
    youtubeId: "rPVcAVc9tHQ",
  },
];

// Duplicated for a seamless scrolling loop.
const STRIP = [...MOVIES, ...MOVIES];

export default function MoviePicks() {
  return (
    <section id="movies" className="relative overflow-hidden py-20">
      <div className="mb-10 px-6 text-center sm:px-10">
        <p className="font-letter text-lg text-blue-soft">grab your popcorn 🍿</p>
        <h2 className="mt-1 text-4xl font-extrabold tracking-tight text-text">
          Rachael&apos;s Movie Picks
        </h2>
        <p className="mt-2 text-sm text-muted">
          Old school, new school, Sam Loco era — all Naija, all vibes.
        </p>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-32" />

        <div className="flex animate-scroll gap-6 will-change-transform">
          {STRIP.map((movie, i) => {
            const isDuplicate = i >= MOVIES.length;
            return (
              <a
                key={`${movie.title}-${i}`}
                href={`https://www.youtube.com/watch?v=${movie.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={isDuplicate || undefined}
                tabIndex={isDuplicate ? -1 : undefined}
                className="group relative h-56 w-80 flex-none overflow-hidden rounded-card border border-white/[0.06] bg-surface transition-all duration-200 hover:border-blue/40 sm:h-64 sm:w-96"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${movie.youtubeId}/mqdefault.jpg`}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Legibility gradient, concentrated at the bottom */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 from-0% via-black/30 via-50% to-transparent to-80%" />

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue shadow-btn">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Info overlay */}
                <div className="absolute inset-x-0 bottom-0 px-5 py-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-soft">
                    {movie.tag}
                  </span>
                  <p className="mt-1 text-base font-semibold text-white">{movie.title}</p>
                  <p className="text-xs text-white/70">{movie.year}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
