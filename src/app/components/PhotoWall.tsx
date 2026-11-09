"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const OFFSETS = [0, 20, 40, 520, 560, 520, 40, 20, 0];

const COLUMN_VISIBILITY = [
  "hidden lg:flex",
  "hidden lg:flex",
  "hidden sm:flex",
  "flex",
  "flex",
  "flex",
  "flex",
  "hidden sm:flex",
  "hidden lg:flex",
];

// null = no real photo (column sits behind hero text at some breakpoint)
const PHOTO_MAP: (number | null)[] = [1, 2, 3, null, null, null, 7, 8, 9];

type TiltStyle = CSSProperties & { "--col-offset"?: string };

function TiltCard({ photoNumber }: { photoNumber: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const disabledRef = useRef(true);
  const [tilt, setTilt] = useState<CSSProperties>({});

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    disabledRef.current = reduceMotion || coarsePointer;
  }, []);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (disabledRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      transform: `perspective(800px) rotateX(${(0.5 - py) * 16}deg) rotateY(${(px - 0.5) * 16}deg) scale(1.05)`,
      boxShadow: "0 24px 48px -16px rgba(0,0,0,0.55)",
      zIndex: 20,
    });
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({})}
      style={tilt}
      className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface transition-[transform,box-shadow] duration-150 ease-out"
    >
      <Image
        src={`/assets/photo-${photoNumber}.png`}
        alt="Candid photo of Rachael"
        fill
        sizes="(min-width: 1024px) 11vw, (min-width: 640px) 16vw, 24vw"
        className="object-cover"
        priority={photoNumber <= 4}
      />
    </div>
  );
}

function LoaderCard() {
  return (
    <div
      aria-hidden="true"
      className="aspect-[3/4] animate-pulse rounded-2xl bg-white/[0.04]"
    />
  );
}

export default function PhotoWall() {
  return (
    <section
      id="gallery"
      aria-label="Rachael's photo wall"
      className="relative px-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl gap-2 sm:gap-3">
        {PHOTO_MAP.map((photoNum, colIdx) => (
          <div
            key={colIdx}
            style={{ marginTop: OFFSETS[colIdx] } as TiltStyle}
            className={`${COLUMN_VISIBILITY[colIdx]} w-full flex-1 flex-col gap-2 sm:gap-3`}
          >
            {photoNum !== null && <TiltCard photoNumber={photoNum} />}
            <LoaderCard />
          </div>
        ))}
      </div>

      {/* Hero text */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-8">
        <div className="pointer-events-auto flex flex-col items-center px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-bg/80 px-4 py-1.5 text-sm font-medium text-blue-soft backdrop-blur-sm">
            🎉 Another amazing year of Rachael
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-5xl md:text-6xl">
            Happy Birthday,
            <br />
            <span className="text-blue-soft">Rachael!</span>
          </h1>
          <p className="mt-4 max-w-sm text-base leading-7 text-muted">
            Today we celebrate the laughter, the light, and the person who makes every room brighter.
          </p>
          <a
            href="#gallery"
            className="group mt-6 inline-flex items-center gap-2 rounded-pill bg-blue px-7 py-3.5 text-sm font-semibold text-on-blue shadow-btn transition-transform hover:scale-105"
          >
            See the Memories
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg))" }}
      />
    </section>
  );
}
