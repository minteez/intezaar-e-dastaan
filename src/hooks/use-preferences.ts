import { useCallback, useEffect, useState } from "react";

const THEME_KEY = "ied-theme";
const FONT_KEY = "ied-font";
const FAV_KEY = "ied-favs";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as "dark" | "light" | null;
    const next = stored ?? "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  return { theme, toggle };
}

export function useFontScale() {
  const [scale, setScale] = useState(100);

  useEffect(() => {
    const stored = Number(localStorage.getItem(FONT_KEY));
    if (stored >= 85 && stored <= 140) {
      setScale(stored);
      document.documentElement.style.fontSize = `${stored}%`;
    }
  }, []);

  const change = useCallback((delta: number) => {
    setScale((prev) => {
      const next = Math.min(140, Math.max(85, prev + delta));
      localStorage.setItem(FONT_KEY, String(next));
      document.documentElement.style.fontSize = `${next}%`;
      return next;
    });
  }, []);

  return { scale, change };
}

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    try {
      setFavs(JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]"));
    } catch {
      setFavs([]);
    }
  }, []);

  const toggleFav = useCallback((id: string) => {
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { favs, toggleFav };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}
