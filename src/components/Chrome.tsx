import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full glass text-gold transition-transform hover:scale-110"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1900);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-700"
      aria-hidden
    >
      <div className="text-center">
        <svg viewBox="0 0 400 90" className="mx-auto h-24 w-[min(80vw,26rem)]">
          <text
            x="50%"
            y="60"
            textAnchor="middle"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 46,
              strokeDasharray: 900,
              animation: "ink 1.7s ease-out forwards",
            }}
          >
            Intezaar-e-Dastaan
          </text>
        </svg>
        <p className="hindi mt-2 text-sm text-muted-foreground">इंतज़ार-ए-दास्तान</p>
      </div>
    </div>
  );
}
