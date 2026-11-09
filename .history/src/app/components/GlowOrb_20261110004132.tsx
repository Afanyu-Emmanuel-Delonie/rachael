export default function GlowOrb() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 -top-42 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full blur-3xl"
      style={{ background: "var(--color-glow)" }}
    />
  );
}
