"use client";

import { useEffect, useRef, useState } from "react";
import { playBlip, playBuzz, playFanfare, playRingtone, unlockAudio, vibrate } from "../lib/sound";
import { burstConfetti } from "../lib/confetti";

// ── Config — edit names/lines here ─────────────────────────────────────────

interface Caller {
  name: string;
  lines: string[];
}

const FEATURED_CALLERS: Caller[] = [
  { name: "Hafsatou", lines: ["Mommyyy 😭😭", "Mommy, my hair...", "Mommy please... for garri 🙏🏾"] },
  { name: "Kili", lines: ["Vanessa Rachael!!", "A don carry your water o 💧"] },
];

const FLOOD_CALLERS: { name: string; line: string }[] = [
  { name: "Else", line: "Rachael, my sleepers don cut 😩" },
  { name: "Akayi", line: "Rachaele, can you explain to me this econs thing? 📚" },
  { name: "Maureen", line: "Rachaele, have you taken my plate to the reff? 🍽️" },
  { name: "Wadefe", line: "Courage waah... dom cap 😮‍💨" },
  { name: "Senior Emma", line: "Bakanja is looking for my trouble 😤" },
  { name: "Favour", line: "Rachaele, I have giss!! 👀" },
  { name: "Flora", line: "Rachaele, you don boil that kanda?? 🍲" },
];

const GROUP_MEMBERS = ["Hafsatou", "Kili", "Else", "Akayi", "Maureen", "Wadefe", "Senior Emma", "Favour", "Flora"];

const GROUP_MESSAGES: { sender: string; text: string }[] = [
  { sender: "Hafsatou", text: "Mommy... 🥺" },
  { sender: "Flora", text: "Boarding or uni, we still need you 😭" },
  { sender: "Favour", text: "Okay okay, the real giss is this 👀" },
  { sender: "Kili", text: "We actually called to say..." },
];

const DECLINE_TOASTS = [
  "Mommy no dey decline call 😂",
  "You think say they go stop? 😂",
  "Answer am abeg 🙏🏾",
  "Mommy, it's an emergency 😭",
];

// Avatar colors, picked from the site's own palette.
const AVATAR_COLORS = [
  "var(--color-blue)",
  "var(--color-blue-soft)",
  "var(--color-blue-deep)",
  "var(--color-accept)",
  "#5B7CFA",
  "#4A6EE0",
  "#8AA3FF",
  "#3550C9",
  "#6B89F7",
];

const CALLER_COLORS: Record<string, string> = Object.fromEntries(
  GROUP_MEMBERS.map((name, i) => [name, AVATAR_COLORS[i % AVATAR_COLORS.length]])
);

function colorFor(name: string) {
  return CALLER_COLORS[name] ?? "var(--color-blue)";
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ── Small shared bits ───────────────────────────────────────────────────────

function Avatar({ name, size = 56 }: { name: string; size?: number }) {
  return (
    <div
      className="flex flex-none items-center justify-center rounded-full font-extrabold text-on-blue"
      style={{ width: size, height: size, background: colorFor(name), fontSize: size * 0.36 }}
    >
      {initials(name)}
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted"
          style={{ animation: `loaderBounce 1s ${i * 0.15}s infinite` }}
        />
      ))}
    </span>
  );
}

function SoundToggle({ soundOn, onToggleSound }: { soundOn: boolean; onToggleSound: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggleSound}
      aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
      className="absolute left-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-card text-sm text-text transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-soft"
    >
      {soundOn ? "🔊" : "🔇"}
    </button>
  );
}

// ── Call scene (ringing → on call → ended) ──────────────────────────────────

function CallScene({
  caller,
  soundOn,
  reduceMotion,
  onEnded,
}: {
  caller: Caller;
  soundOn: boolean;
  reduceMotion: boolean;
  onEnded: () => void;
}) {
  const [phase, setPhase] = useState<"ringing" | "oncall" | "ended">("ringing");
  const [declineIdx, setDeclineIdx] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const scale = reduceMotion ? 0.5 : 1;

  // Ringtone + vibration while ringing
  useEffect(() => {
    if (phase !== "ringing") return;
    let stop: (() => void) | null = null;
    if (soundOn) stop = playRingtone();
    vibrate([400, 200, 400, 200, 400]);
    return () => stop?.();
  }, [phase, soundOn]);

  // Call timer while on call
  useEffect(() => {
    if (phase !== "oncall") return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Caption sequence
  useEffect(() => {
    if (phase !== "oncall") return;
    if (lineIndex >= caller.lines.length) {
      const t = setTimeout(() => setPhase("ended"), 400 * scale);
      return () => clearTimeout(t);
    }
    let t2: ReturnType<typeof setTimeout>;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- staged reveal animation, intentional
    setTyping(true);
    const t1 = setTimeout(() => {
      setTyping(false);
      if (soundOn) playBlip(700);
      t2 = setTimeout(() => setLineIndex((i) => i + 1), 1600 * scale);
    }, 900 * scale);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase, lineIndex, caller.lines.length, soundOn, scale]);

  // Advance after "ended"
  useEffect(() => {
    if (phase !== "ended") return;
    const t = setTimeout(onEnded, 1200 * scale);
    return () => clearTimeout(t);
  }, [phase, onEnded, scale]);

  // Decline toast auto-hide
  useEffect(() => {
    if (!toastVisible) return;
    const t = setTimeout(() => setToastVisible(false), 2200);
    return () => clearTimeout(t);
  }, [toastVisible]);

  function handleDecline() {
    setDeclineIdx((i) => (i + 1) % DECLINE_TOASTS.length);
    setToastVisible(true);
    vibrate(80);
  }

  const time = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="relative flex items-center justify-center">
        {phase === "ringing" && !reduceMotion && (
          <>
            <span className="absolute h-28 w-28 rounded-full border border-blue-soft/40" style={{ animation: "loaderPulseRing 1.6s ease-out infinite" }} />
            <span className="absolute h-28 w-28 rounded-full border border-blue-soft/40" style={{ animation: "loaderPulseRing 1.6s ease-out 0.5s infinite" }} />
          </>
        )}
        <Avatar name={caller.name} size={96} />
      </div>

      <div>
        <p className="text-2xl font-extrabold text-text">{caller.name}</p>
        <p className="mt-1 text-sm text-muted">
          {phase === "ringing" && "is calling you..."}
          {phase === "oncall" && time}
          {phase === "ended" && `${caller.name} ended the call`}
        </p>
      </div>

      {phase === "oncall" && (
        <div className="flex min-h-16 w-full max-w-xs flex-col items-center justify-end gap-2">
          {typing ? (
            <div className="rounded-card bg-card px-4 py-2.5">
              <TypingDots />
            </div>
          ) : (
            lineIndex < caller.lines.length && (
              <div className="rounded-card border border-blue/30 bg-blue/10 px-4 py-2.5 text-sm text-text">
                {caller.lines[lineIndex]}
              </div>
            )
          )}
        </div>
      )}

      {phase === "ringing" && (
        <div className="relative flex items-center gap-10">
          <button
            type="button"
            onClick={handleDecline}
            aria-label="Decline call"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-decline shadow-btn transition-transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 rotate-[135deg] text-white">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setPhase("oncall")}
            aria-label="Accept call"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-accept shadow-btn transition-transform hover:scale-105"
            style={{ animation: reduceMotion ? undefined : "loaderWiggle 0.6s ease-in-out infinite" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
            </svg>
          </button>

          {toastVisible && (
            <div className="absolute -top-16 left-1/2 w-56 -translate-x-1/2 rounded-pill border border-white/10 bg-card px-4 py-2 text-xs text-text shadow-btn">
              {DECLINE_TOASTS[declineIdx]}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Flood scene ──────────────────────────────────────────────────────────────

interface FloodCard {
  key: number;
  name: string;
  line: string;
}

function FloodScene({
  soundOn,
  reduceMotion,
  onAdvance,
}: {
  soundOn: boolean;
  reduceMotion: boolean;
  onAdvance: () => void;
}) {
  const [cards, setCards] = useState<FloodCard[]>([]);
  const [pileRows, setPileRows] = useState<{ key: number; name: string }[]>([]);
  const [missedCount, setMissedCount] = useState(0);
  const [shake, setShake] = useState(false);
  const keyRef = useRef(0);
  const pileKeyRef = useRef(0);

  useEffect(() => {
    const scale = reduceMotion ? 0.5 : 1;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sched = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    let cumulative = 400;
    const intervals = [1900, 1700, 1500, 1300, 1150, 1100, 1100];
    FLOOD_CALLERS.forEach((caller, i) => {
      cumulative += intervals[i] * scale;
      sched(() => {
        setCards((prev) => [...prev, { key: keyRef.current++, name: caller.name, line: caller.line }]);
        setMissedCount((c) => c + 1);
        if (soundOn) playBuzz();
        vibrate(60);
        if (!reduceMotion) {
          setShake(true);
          sched(() => setShake(false), 150);
        }
      }, cumulative);
    });

    const pileNames = [...GROUP_MEMBERS, ...GROUP_MEMBERS].slice(0, 14);
    pileNames.forEach((name) => {
      cumulative += 160 * scale;
      sched(() => {
        setPileRows((prev) => [...prev, { key: pileKeyRef.current++, name }]);
        setMissedCount((c) => c + 1);
      }, cumulative);
    });

    cumulative += 500;
    sched(() => setMissedCount(49), cumulative);

    cumulative += 1800;
    sched(onAdvance, cumulative);

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`flex h-full flex-col items-center px-6 pt-10 text-center ${shake ? "loader-shake" : ""}`}>
      <p className="text-lg font-extrabold text-text">Your phone has not rested since you left boarding 📵</p>
      <p className="mt-2 text-sm font-semibold text-blue-soft">
        {missedCount} missed call{missedCount === 1 ? "" : "s"}
        {missedCount >= 49 ? " 🔥" : ""}
      </p>

      <div className="mt-6 flex w-full max-w-sm flex-1 flex-col gap-2 overflow-hidden">
        {cards.slice(-3).map((c) => (
          <div
            key={c.key}
            className="flex items-center gap-3 rounded-card border border-white/10 bg-card px-4 py-3 text-left"
            style={{ animation: "loaderDropIn 0.35s ease-out both" }}
          >
            <Avatar name={c.name} size={36} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-text">{c.name} · 📞 calling</p>
              <p className="truncate text-xs text-muted">{c.line}</p>
            </div>
          </div>
        ))}
        {pileRows.slice(-6).map((r) => (
          <div
            key={r.key}
            className="flex items-center gap-2 rounded-pill bg-white/[0.05] px-3 py-1.5 text-left text-xs text-muted"
            style={{ animation: "loaderDropIn 0.2s ease-out both" }}
          >
            <Avatar name={r.name} size={18} />
            Missed call · {r.name}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Group chat twist ─────────────────────────────────────────────────────────

function GroupScene({
  soundOn,
  reduceMotion,
  onClose,
}: {
  soundOn: boolean;
  reduceMotion: boolean;
  onClose: () => void;
}) {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const firedConfetti = useRef(false);
  const scale = reduceMotion ? 0.5 : 1;

  useEffect(() => {
    if (shown >= GROUP_MESSAGES.length) {
      const t = setTimeout(() => setRevealed(true), 700 * scale);
      return () => clearTimeout(t);
    }
    let t2: ReturnType<typeof setTimeout>;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- staged reveal animation, intentional
    setTyping(true);
    const t1 = setTimeout(() => {
      setTyping(false);
      t2 = setTimeout(() => setShown((s) => s + 1), 1300 * scale);
    }, 700 * scale);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [shown, scale]);

  useEffect(() => {
    if (!revealed || firedConfetti.current) return;
    firedConfetti.current = true;
    if (soundOn) playFanfare();
    burstConfetti();
  }, [revealed, soundOn]);

  return (
    <div className="flex h-full flex-col px-5 pt-8">
      {!revealed && (
        <>
          <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
            <Avatar name="The Smallies" size={44} />
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-text">The Smallies 💕</p>
              <p className="truncate text-xs text-muted">{GROUP_MEMBERS.join(", ")}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden pb-6">
            {GROUP_MESSAGES.slice(0, shown).map((m, i) => (
              <div key={i} className="max-w-[80%] rounded-card border border-white/10 bg-card px-4 py-2.5 text-left">
                <p className="text-xs font-semibold" style={{ color: colorFor(m.sender) }}>
                  {m.sender}
                </p>
                <p className="mt-0.5 text-sm text-text">{m.text}</p>
              </div>
            ))}
            {typing && (
              <div className="max-w-[60%] rounded-card bg-card px-4 py-2.5">
                <TypingDots />
              </div>
            )}
          </div>
        </>
      )}

      {revealed && (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
          <h2 className="text-4xl font-extrabold leading-tight text-text">
            HAPPY BIRTHDAY
            <br />
            <span className="text-blue-soft">MOMMY!!! 🎂</span>
          </h2>
          <p className="max-w-xs text-sm text-muted">From all your smallies, boarding to uni 💕</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-pill bg-blue px-8 py-3.5 text-sm font-semibold text-on-blue shadow-btn transition-transform hover:scale-105"
          >
            Open your gift 🎁
          </button>
        </div>
      )}
    </div>
  );
}

// ── Lock screen ──────────────────────────────────────────────────────────────

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only initial value (SSR has no clock)
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <button
      type="button"
      onClick={onUnlock}
      aria-label="Tap to unlock"
      className="flex h-full w-full flex-col items-center justify-center gap-10 px-6 text-center"
    >
      <div>
        <p className="text-6xl font-extrabold tracking-tight text-text">
          {now ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "--:--"}
        </p>
        <p className="mt-2 text-sm text-muted">
          {now ? now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) : ""}
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-2">
        <div
          className="flex items-center gap-3 rounded-card border border-white/10 bg-card px-4 py-3 text-left"
          style={{ animation: "loaderSlideIn 0.4s ease-out 0.6s both" }}
        >
          <Avatar name="Hafsatou" size={36} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-text">Hafsatou 💕</p>
            <p className="truncate text-xs text-muted">Missed call · just now</p>
          </div>
        </div>
        <div
          className="flex items-center gap-3 rounded-card border border-white/10 bg-card px-4 py-3 text-left"
          style={{ animation: "loaderSlideIn 0.4s ease-out 1.4s both" }}
        >
          <Avatar name="The Smallies" size={36} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-text">The Smallies 💕</p>
            <p className="truncate text-xs text-muted">Mommy pick up!! 😭😭😭</p>
          </div>
        </div>
      </div>

      <p className="text-xs tracking-widest text-muted" style={{ animation: "loaderPulseText 1.8s ease-in-out infinite" }}>
        Tap anywhere to unlock
      </p>
    </button>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────

type Scene = "lock" | "hafsatou" | "kili" | "flood" | "group";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [scene, setScene] = useState<Scene>("lock");
  const [soundOn, setSoundOn] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only initial value (SSR has no matchMedia)
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  function close() {
    setExiting(true);
    setTimeout(onDone, 500);
  }

  function unlock() {
    unlockAudio();
    setScene("hafsatou");
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-bg"
      style={{ opacity: exiting ? 0 : 1, transition: "opacity 0.5s ease" }}
    >
      <div className="relative mx-auto flex h-full w-full max-w-[420px] flex-col overflow-hidden sm:my-6 sm:h-[calc(100%-48px)] sm:rounded-card sm:border sm:border-white/10">
        {scene === "lock" && <LockScreen onUnlock={unlock} />}

        {scene === "hafsatou" && (
          <CallScene
            caller={FEATURED_CALLERS[0]}
            soundOn={soundOn}
            reduceMotion={reduceMotion}
            onEnded={() => setScene("kili")}
          />
        )}

        {scene === "kili" && (
          <CallScene
            caller={FEATURED_CALLERS[1]}
            soundOn={soundOn}
            reduceMotion={reduceMotion}
            onEnded={() => setScene("flood")}
          />
        )}

        {scene === "flood" && <FloodScene soundOn={soundOn} reduceMotion={reduceMotion} onAdvance={() => setScene("group")} />}

        {scene === "group" && <GroupScene soundOn={soundOn} reduceMotion={reduceMotion} onClose={close} />}

        <SoundToggle soundOn={soundOn} onToggleSound={() => setSoundOn((s) => !s)} />
      </div>

      <style>{`
        @keyframes loaderSlideIn {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderDropIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderPulseText {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes loaderPulseRing {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes loaderWiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        @keyframes loaderBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .loader-shake {
          animation: loaderShake 0.15s ease-in-out;
        }
        @keyframes loaderShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
