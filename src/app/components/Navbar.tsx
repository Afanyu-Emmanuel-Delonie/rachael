"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Games", href: "#games" },
  { label: "Playlist", href: "#playlist" },
  { label: "Movies", href: "#movies" },
  { label: "Stats", href: "#stats" },
  { label: "Wishes", href: "#wishes" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-bg/80 border-b border-white/[0.04]" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <a href="#top" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-text">
          Kili Rachael
        </a>

        <nav className="hidden items-center gap-1 sm:flex">
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="rounded-pill px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-text">
              {label}
            </a>
          ))}
        </nav>

        <a href="#message" className="rounded-pill bg-blue px-5 py-2.5 text-sm font-semibold text-on-blue shadow-btn transition-transform hover:scale-105">
          My Message 💙
        </a>
      </div>
    </header>
  );
}
