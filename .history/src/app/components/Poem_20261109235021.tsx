import Image from "next/image";

const LINES = [
  "In the rush of the world, a steady light,",
  "A heart so warm it turns day from night.",
  "Where others speak, you choose to see,",
  "The grace of laughter and loyalty.",
  "To Rachael, whose kindness is her own,",
  "The finest seeds of joy are sown.",
];

export default function Poem() {
  return (
    <section id="poem" className="relative overflow-hidden px-6 py-24 sm:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/assets/photo-3.png"
          alt=""
          fill
          sizes="10vw"
          className="object-cover object-top opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg from-40% via-bg/80 to-bg/10" />
      </div>

      <div className="mx-auto max-w-3xl">
        <span className="inline-flex items-center rounded-pill border border-blue/30 bg-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-soft">
          A Birthday Poem
        </span>

        <h2 className="mt-5 text-5xl font-extrabold tracking-tight text-text sm:text-6xl">
          For You <span className="text-blue-soft">Rachael</span>
        </h2>

        <blockquote className="mt-8 space-y-2 border-l-2 border-blue/40 pl-6 text-lg leading-8 text-text/90">
          {LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </blockquote>

        <p className="mt-6 text-sm italic text-muted">
          — With love, from your Biggie 💙
        </p>
      </div>
    </section>
  );
}
