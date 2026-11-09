"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BirthdayMessage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -14 },
        {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="message"
      className="relative overflow-hidden py-32 px-6 sm:px-10"
    >
      {/* Background, parallaxed */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={imgRef} className="absolute inset-[-10%]">
          <Image src="/assets/story.png" alt="" fill className="object-cover object-center" priority />
        </div>
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="rounded-card border border-white/10 bg-black/30 px-8 py-12 backdrop-blur-sm sm:px-14">

          <p className="font-letter text-lg text-blue-soft">a message from your Biggie 💙</p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Happy Birthday, my Smallie, my sister Rachael! ❤️🥹
          </h2>

          <div className="mt-8 space-y-5 text-sm leading-8 text-text/80">
            <p>
              Rachael, where do I even begin? Sometimes I wish I could take a moment and show you just how much your presence in my life means to me. From our PHS days to everything life has thrown at us since then, we&apos;ve shared a journey that I wouldn&apos;t trade for anything. When I think about the people God has placed in my corner, I&apos;m reminded that having you is one of those blessings I should never take for granted.
            </p>
            <p>
              I will never forget the night my grandmother passed away. You were there. And that might seem like just one moment to you, but to me, it means more than words can ever explain. You&apos;ve stood by me through some of the lowest moments of my life. You&apos;ve fought alongside Akayi, Moureen and me when it felt like the whole world was against us. You didn&apos;t just show up when things were good; you showed up when life was difficult, and that is something I will never take for granted.
            </p>
            <p>
              We&apos;ve had our moments, we&apos;ve fought, we&apos;ve laughed, and we&apos;ve grown, but through it all, I&apos;m grateful that life gave me a sister like you.
            </p>
            <p>
              I pray that this new chapter brings you the kind of happiness you&apos;ve given to the people around you. May God protect you, open doors for you, grant you the desires of your heart, and give you countless reasons to smile. May you never have to question how loved, valued and appreciated you are.
            </p>
            <p>
              Thank you for being you. Thank you for being my smallie, my sister, and one of the people I can proudly say life has blessed me with.
            </p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8 space-y-2">
            <p className="text-sm font-semibold text-text">Happy Birthday, Rachael! ❤️</p>
            <p className="text-sm leading-8 text-text/80">
              Here&apos;s to many more years of friendship, sisterhood, crazy memories and growing together.
            </p>
            <p className="font-letter text-xl text-blue-soft mt-2">Love you, Smallie! 🥂❤️</p>
          </div>

        </div>
      </div>
    </section>
  );
}
