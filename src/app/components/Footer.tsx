export default function Footer() {
  return (
    <footer className="relative px-6 py-24 sm:px-10 text-center">
      {/* Top divider */}
      <div className="mx-auto mb-16 flex max-w-xs items-center gap-3">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-muted text-sm">✦</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>

      <div className="mx-auto max-w-xl">
        <p className="font-letter text-2xl text-blue-soft">To my Smallie,</p>

        <p className="mt-6 text-sm leading-8 text-muted">
          You soaked the garri. You called your people. You read the poem, watched the movies,
          heard the playlist, and made it all the way here. That&apos;s very you — showing up fully,
          even for yourself.
        </p>

        <p className="mt-4 text-sm leading-8 text-muted">
          From 2021 to now, every year has only made me more sure — having you in my corner
          is one of the best things life has given me. You are loved more than you know,
          by more people than you can count.
        </p>

        <p className="mt-4 text-sm leading-8 text-muted">
          Go into this new year with your chest out, your laugh loud, and your heart open.
          God&apos;s got you. We&apos;ve got you. And I&apos;ll always be your Biggie. 💙
        </p>

        <p className="mt-10 font-letter text-3xl text-text">
          Happy Birthday, Rachael. 🥂❤️
        </p>

        <p className="mt-4 font-letter text-lg text-blue-soft">— your Biggie, always.</p>
      </div>

      {/* Bottom */}
      <div className="mx-auto mt-16 flex max-w-xs items-center gap-3">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-muted text-xs">made with 💙 for Rachael</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>
    </footer>
  );
}
