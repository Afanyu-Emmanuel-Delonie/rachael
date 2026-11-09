"use client";

import Image from "next/image";

const PHOTOS = Array.from({ length: 16 }, (_, i) => i + 1);
// Duplicate for seamless loop
const STRIP = [...PHOTOS, ...PHOTOS];

export default function PhotoStrip() {
  return (
    <section id="strip" aria-label="Photo strip" className="relative overflow-hidden py-4">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

      <div className="flex animate-scroll gap-4 will-change-transform">
        {STRIP.map((n, i) => (
          <div
            key={i}
            className="relative h-80 w-64 flex-none overflow-hidden rounded-card"
          >
            <Image
              src={`/assets/photo-${n}.png`}
              alt={`Photo of Rachael ${n}`}
              fill
              sizes="192px"
              className="object-cover"
              priority={n <= 4 && i < 16}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
