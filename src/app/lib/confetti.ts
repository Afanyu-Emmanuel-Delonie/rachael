// Lightweight canvas confetti burst — no external deps. Cleans up after itself.

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vr: number;
}

const COLORS = ["#3B63F5", "#7D98FF", "#2A45C4", "#22C55E", "#F5F6F8"];

export function burstConfetti(options?: { pieces?: number; durationMs?: number }) {
  if (typeof window === "undefined") return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pieces = options?.pieces ?? (reduceMotion ? 14 : 60);
  const duration = options?.durationMs ?? (reduceMotion ? 900 : 1800);

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.zIndex = "10000";
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  const particles: Particle[] = Array.from({ length: pieces }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 140,
    y: canvas.height * 0.3 + (Math.random() - 0.5) * 60,
    vx: (Math.random() - 0.5) * 8,
    vy: Math.random() * -8 - 4,
    size: Math.random() * 6 + 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * 360,
    vr: (Math.random() - 0.5) * 12,
  }));

  const start = performance.now();
  let rafId: number;

  function frame(now: number) {
    const elapsed = now - start;
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.vy += 0.25;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vr;
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate((p.rotation * Math.PI) / 180);
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx!.restore();
    });
    if (elapsed < duration) {
      rafId = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(rafId);
      canvas.remove();
    }
  }

  rafId = requestAnimationFrame(frame);
}
