"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SONGS = [
  { n: "01", title: "The First Secret", artist: "— — —", id: "0U5gQgUCGYZsC99xAbGA4v" },
  { n: "02", title: "Unnamed Feeling", artist: "— — —", id: "44G2gUVQvNNZ6w3i05tR4n" },
  { n: "03", title: "What She Knows", artist: "— — —", id: "5s33nLb8BCeeKep2rfG7To" },
  { n: "04", title: "Quiet Hours", artist: "— — —", id: "0AoBY2Y3qs6dtGgOD6c91N" },
  { n: "05", title: "Before You Wake", artist: "— — —", id: "1136eJrkWsDvReASbjLTaU" },
  { n: "06", title: "The Soft Confession", artist: "— — —", id: "6Z7X86HZWODk0KPVmOsCKR" },
  { n: "07", title: "Letters Never Sent", artist: "— — —", id: "7vKXc90NT5WBm3UTT4iTVG" },
  { n: "08", title: "Something Like This", artist: "— — —", id: "7u0z6FcJDqkZwdpqAqUzmO" },
  { n: "09", title: "Only You Would Know", artist: "— — —", id: "0YeUYYOh25Cn57DKTC8uS4" },
  { n: "10", title: "The Last One Playing", artist: "— — —", id: "5ZtK8XAVnoaGdBXZWCEVCY" },
];

const PER_PAGE = 5;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function SpotifyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
      <rect x="5" y="4" width="4" height="16" />
      <rect x="15" y="4" width="4" height="16" />
    </svg>
  );
}

type Song = (typeof SONGS)[number];

function SongRow({ song, open, onToggle, onNext }: { song: Song; open: boolean; onToggle: () => void; onNext: () => void }) {
  return (
    <li className="list-none">
      <div
        className={`flex items-center gap-4 rounded-card border px-4 py-3 transition-colors ${
          open ? "border-blue/40 bg-blue/10" : "border-white/[0.06] bg-white/[0.04] hover:bg-white/[0.09]"
        }`}
      >
        <span className="w-6 flex-none font-mono text-xs tracking-widest text-blue-soft">{song.n}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text">{song.title}</p>
          <p className="truncate text-xs text-muted">{song.artist}</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-label={open ? `Pause preview of ${song.title}` : `Play preview of ${song.title}`}
          aria-pressed={open}
          className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border text-text transition-colors ${
            open ? "border-blue bg-blue text-on-blue" : "border-white/10 bg-white/[0.06] hover:bg-white/[0.12]"
          }`}
        >
          {open ? <PauseIcon /> : <PlayIcon />}
        </button>
        <a
          href={`https://open.spotify.com/track/${song.id}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${song.title} in Spotify`}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#1ed760]/20 bg-[#1ed760]/10 text-[#1ed760] transition-colors hover:bg-[#1ed760]/20"
        >
          <SpotifyIcon />
        </a>
      </div>

      {open && (
        <div className="px-1 pt-2 pb-1">
          <iframe
            title={`Spotify preview — ${song.title}`}
            src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator&theme=0`}
            width="100%"
            height="80"
            style={{ borderRadius: "12px", display: "block", border: 0 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <div className="mt-2 flex justify-end">
            <button type="button" onClick={onNext} className="text-xs font-medium tracking-wide text-muted transition-colors hover:text-blue-soft">
              Next →
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default function Playlist() {
  const isMobile = useIsMobile();
  const [page, setPage] = useState(0);
  const [openSong, setOpenSong] = useState<string | null>(null);

  const totalPages = Math.ceil(SONGS.length / PER_PAGE);
  const visible = isMobile ? SONGS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE) : SONGS;

  function goToNext(currentId: string) {
    const idx = SONGS.findIndex((s) => s.n === currentId);
    const next = SONGS[(idx + 1) % SONGS.length];
    setOpenSong(next.n);
    if (isMobile) setPage(Math.floor(SONGS.indexOf(next) / PER_PAGE));
  }

  function toggle(id: string) {
    setOpenSong((current) => (current === id ? null : id));
  }

  return (
    <section id="playlist" className="relative overflow-hidden my-4">
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image src="/assets/photo-10.png" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-20 sm:px-10">
        <div className="mb-10 text-center">
          <p className="font-letter text-lg text-blue-soft">— For You, Birthday Girl</p>
          <h2 className="mt-1 text-4xl font-extrabold tracking-tight text-text">
            Rachael&apos;s Birthday Playlist
          </h2>
          <p className="mt-2 text-sm text-muted">
            10 songs, picked just for you. You won&apos;t know which is which until you press play.
          </p>
        </div>

        {!isMobile && (
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3">
            {visible.map((song) => (
              <SongRow key={song.n} song={song} open={openSong === song.n} onToggle={() => toggle(song.n)} onNext={() => goToNext(song.n)} />
            ))}
          </ul>
        )}

        {isMobile && (
          <div>
            <ul className="space-y-3">
              {visible.map((song) => (
                <SongRow key={song.n} song={song} open={openSong === song.n} onToggle={() => toggle(song.n)} onNext={() => goToNext(song.n)} />
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-center gap-5">
              <button type="button" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} aria-label="Previous songs" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-text transition-opacity disabled:opacity-25">←</button>
              <span className="text-xs tracking-wide text-muted">{page + 1} / {totalPages}</span>
              <button type="button" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} aria-label="More songs" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-text transition-opacity disabled:opacity-25">→</button>
            </div>
          </div>
        )}

        <div className="mt-10 rounded-card border border-white/[0.06] bg-black/30 px-6 py-5 text-center">
          <p className="font-letter text-lg text-blue-soft">No Lyrics, No Context</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            Just ten songs that made us think of you. Press play and find out which is which. 🎧
          </p>
        </div>
      </div>
    </section>
  );
}
