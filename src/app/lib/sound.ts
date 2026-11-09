// Tiny Web Audio helpers for the intro loader — no audio files, everything synthesized.
// Lazily creates a single AudioContext on first use (browsers block audio before a user gesture).

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  getCtx();
}

export function playBlip(freq = 880, duration = 0.08) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.15, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration);
}

export function playBuzz() {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "square";
  osc.frequency.value = 140;
  gain.gain.setValueAtTime(0.08, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.15);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + 0.15);
}

export function playWhoosh() {
  const c = getCtx();
  if (!c) return;
  const bufferSize = c.sampleRate * 0.3;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = c.createBufferSource();
  noise.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1200, c.currentTime);
  filter.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.3);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.25, c.currentTime);
  gain.gain.linearRampToValueAtTime(0, c.currentTime + 0.3);
  noise.connect(filter).connect(gain).connect(c.destination);
  noise.start();
}

export function playFanfare() {
  const c = getCtx();
  if (!c) return;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    const start = c.currentTime + i * 0.12;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(0.2, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.4);
    osc.connect(gain).connect(c.destination);
    osc.start(start);
    osc.stop(start + 0.4);
  });
}

/** Starts a looping ring-ring tone. Returns a stop function. */
export function playRingtone(): () => void {
  const c = getCtx();
  if (!c) return () => {};
  let stopped = false;
  let timeoutId: ReturnType<typeof setTimeout>;

  function ringBurst() {
    if (stopped || !c) return;
    [0, 0.35].forEach((offset) => {
      const start = c.currentTime + offset;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "sine";
      osc.frequency.value = 480;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.18, start + 0.05);
      gain.gain.linearRampToValueAtTime(0.18, start + 0.28);
      gain.gain.linearRampToValueAtTime(0.0001, start + 0.33);
      osc.connect(gain).connect(c.destination);
      osc.start(start);
      osc.stop(start + 0.35);
    });
    timeoutId = setTimeout(ringBurst, 2000);
  }

  ringBurst();
  return () => {
    stopped = true;
    clearTimeout(timeoutId);
  };
}

export function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // ignore — vibration isn't supported/allowed
    }
  }
}
