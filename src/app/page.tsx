"use client";

import { useEffect, useState } from "react";
import GlowOrb from "./components/GlowOrb";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PhotoStrip from "./components/PhotoStrip";
import MenuSection from "./components/MenuSection";
import Playlist from "./components/Playlist";
import Poem from "./components/Poem";
import MoviePicks from "./components/MoviePicks";
import BirthdayMessage from "./components/BirthdayMessage";
import YearVerses from "./components/YearVerses";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import dynamic from "next/dynamic";
const Loader = dynamic(() => import("./components/Loader"), { ssr: false });
import { burstConfetti } from "./lib/confetti";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [loaderKey, setLoaderKey] = useState(0);

  useEffect(() => {
    document.body.style.overflow = showLoader ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  function handleLoaderDone() {
    setShowLoader(false);
    burstConfetti();
  }

  function replayIntro() {
    setLoaderKey((k) => k + 1);
    setShowLoader(true);
  }

  return (
    <div className="relative isolate">
      {showLoader && <Loader key={loaderKey} onDone={handleLoaderDone} />}

      <GlowOrb />
      <Navbar />
      <main id="top" className="relative z-10">
        <Hero />

        <Reveal direction="scale">
          <PhotoStrip />
        </Reveal>

        <Reveal>
          <MenuSection />
        </Reveal>

        <Reveal>
          <Playlist />
        </Reveal>

        <Reveal direction="scale">
          <Poem />
        </Reveal>

        <Reveal>
          <MoviePicks />
        </Reveal>

        <YearVerses />

        <Reveal>
          <BirthdayMessage />
        </Reveal>

        <Reveal duration={1}>
          <Footer />
        </Reveal>

        <div className="pb-10 text-center">
          <button
            type="button"
            onClick={replayIntro}
            className="rounded-pill border border-white/10 bg-card px-4 py-2 text-xs font-medium text-muted transition-colors hover:text-text"
          >
            ↺ Replay the calls
          </button>
        </div>
      </main>
    </div>
  );
}
