"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = root.querySelectorAll<HTMLElement>("[data-word]");
    const rest = root.querySelectorAll<HTMLElement>("[data-fade]");

    if (reduceMotion) {
      gsap.set([words, rest], { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

      tl.from(words, {
        opacity: 0,
        y: 48,
        stagger: 0.08,
        duration: 0.9,
      }).from(
        rest,
        {
          opacity: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col items-center px-6 pt-8 pb-8 text-center">
      <span
        data-fade
        className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-card px-4 py-1.5 text-sm font-medium text-blue-soft"
      >
        from the girl who called you Biggie 😭💙
      </span>

      <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-6xl md:text-7xl">
        {"Still My Smallie,".split(" ").map((word, i) => (
          <span key={i} data-word className="mr-[0.25em] inline-block last:mr-0">
            {word}
          </span>
        ))}
        <br />
        {"Always My Person".split(" ").map((word, i) => (
          <span key={i} data-word className="mr-[0.25em] inline-block text-blue-soft last:mr-0">
            {word}
          </span>
        ))}
      </h1>

      <p data-fade className="mt-4 max-w-xl text-base leading-7 text-muted">
        PHS gave me a lot of memories. But yours was so special it had to go down the story books. Love you, and that love choke? I can never forget.
      </p>

      <a
        data-fade
        href="#strip"
        className="group mt-8 inline-flex items-center gap-2 rounded-pill bg-blue px-8 py-4 text-base font-semibold text-on-blue shadow-btn transition-transform hover:scale-105"
      >
        See the Memories
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
      </a>

      {/* Handwritten note pointing at the strip below */}
      <div data-fade className="mt-6 flex flex-col items-center gap-1">
        <span className="font-letter text-lg text-muted">proof that you make everything better 📸</span>
        <svg aria-hidden="true" viewBox="0 0 40 32" className="h-8 w-10 text-muted" fill="none">
          <path d="M20 2 C20 2 8 10 4 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M2 20 L4 25 L8 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
