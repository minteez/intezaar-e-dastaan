import { useEffect, useMemo, useState } from "react";

function seededRandoms(count: number, seed: number) {
  const out: number[] = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 9301 + 49297) % 233280;
    out.push(s / 233280);
  }
  return out;
}

export function NightSky() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stars = useMemo(() => {
    const r = seededRandoms(320, 7) as number[];
    return Array.from({ length: 80 }, (_, i) => ({
      left: (r[i * 4] ?? 0) * 100,
      top: (r[i * 4 + 1] ?? 0) * 100,
      size: 1 + (r[i * 4 + 2] ?? 0) * 2.2,
      delay: (r[i * 4 + 3] ?? 0) * 5,
    }));
  }, []);

  const particles = useMemo(() => {
    const r = seededRandoms(96, 19);
    return Array.from({ length: 24 }, (_, i) => ({
      left: (r[i * 4] ?? 0) * 100,
      size: 2 + (r[i * 4 + 1] ?? 0) * 4,
      delay: (r[i * 4 + 2] ?? 0) * 18,
      duration: 16 + (r[i * 4 + 3] ?? 0) * 20,
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Moon */}
      <div className="absolute right-[8%] top-[6%] size-28 rounded-full bg-gold-soft/80 blur-[1px] animate-moon sm:size-36" />
      <div className="absolute right-[8%] top-[6%] size-28 rounded-full bg-linear-to-br from-ivory/90 to-silver/40 sm:size-36" />

      {/* Stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-ivory animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Clouds */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute h-24 w-[38rem] rounded-full bg-silver/10 blur-3xl animate-drift"
          style={{
            top: `${12 + i * 22}%`,
            animationDuration: `${90 + i * 45}s`,
            animationDelay: `${i * -30}s`,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-gold/60 animate-float-up"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Lanterns */}
      {[
        { left: "6%", top: "18%", delay: "0s" },
        { left: "88%", top: "44%", delay: "-2s" },
        { left: "22%", top: "68%", delay: "-4s" },
      ].map((l, i) => (
        <div
          key={i}
          className="absolute animate-sway"
          style={{ left: l.left, top: l.top, animationDelay: l.delay }}
        >
          <div className="mx-auto h-10 w-px bg-gold/30" />
          <div className="size-5 rounded-[40%] bg-gold/70 shadow-[0_0_28px_10px_var(--glow)]" />
        </div>
      ))}

      {/* Paper texture */}
      <div className="absolute inset-0 paper opacity-40" />
    </div>
  );
}
