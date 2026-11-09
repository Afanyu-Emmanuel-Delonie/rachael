export default function Hero() {
  return (
    <div className="flex flex-col items-center px-6 pt-8 pb-8 text-center">
      <span className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-card px-4 py-1.5 text-sm font-medium text-blue-soft">
        from the girl who called you Biggie 😭💙
      </span>
      <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-6xl md:text-7xl">
        Still My Smallie,
        <br />
        <span className="text-blue-soft">Always My Person</span>
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">
        PHS gave us a lot of things. But Smallie? That was the best one. Happy birthday Rachael we love you die. 💙
      </p>
      <a
        href="#strip"
        className="group mt-8 inline-flex items-center gap-2 rounded-pill bg-blue px-8 py-4 text-base font-semibold text-on-blue shadow-btn transition-transform hover:scale-105"
      >
        See the Memories
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
      </a>

      {/* Handwritten note pointing at the strip below */}
      <div className="mt-6 flex flex-col items-center gap-1">
        <span className="font-letter text-lg text-muted">proof that you make everything better 📸</span>
        <svg aria-hidden="true" viewBox="0 0 40 32" className="h-8 w-10 text-muted" fill="none">
          <path d="M20 2 C20 2 8 10 4 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M2 20 L4 25 L8 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
