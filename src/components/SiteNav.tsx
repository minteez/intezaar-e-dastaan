import { Link } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, X, AArrowDown, AArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useFontScale, useScrollProgress, useTheme } from "@/hooks/use-preferences";
import { GlobalSearch } from "./GlobalSearch";
import { SITE } from "@/data/content";

const LINKS = [
  { to: "/", label: "Home", hi: "घर" },
  { to: "/shayari", label: "Shayari", hi: "शायरी" },
  { to: "/nazm", label: "Nazm", hi: "नज़्म" },
  { to: "/quotes", label: "Quotes", hi: "कोट्स" },
  { to: "/about", label: "About Me", hi: "मेरे बारे में" },
  { to: "/contact", label: "Contact", hi: "संपर्क" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { change } = useFontScale();
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-2" : "bg-transparent py-4"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:flex lg:justify-between"
        >
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/50 text-gold">
              ☾
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-lg tracking-wide gold-text sm:text-xl">
                {SITE.name}
              </span>
              <span className="hidden text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground sm:block">
                poetry &amp; prose
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-gold" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="relative rounded-full px-3 py-2 text-sm transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-gold"
            >
              <Search className="size-4" />
            </button>
            <button
              onClick={() => change(-5)}
              aria-label="Decrease font size"
              className="hidden size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-gold sm:grid"
            >
              <AArrowDown className="size-4" />
            </button>
            <button
              onClick={() => change(5)}
              aria-label="Increase font size"
              className="hidden size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-gold sm:grid"
            >
              <AArrowUp className="size-4" />
            </button>
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-gold"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-gold lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <ul className="mx-4 mt-3 grid gap-1 rounded-2xl glass p-3 lg:hidden">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-gold" }}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors hover:bg-secondary/50"
                >
                  <span>{l.label}</span>
                  <span className="hindi text-xs text-muted-foreground">{l.hi}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-gold via-gold-soft to-transparent"
          style={{ transform: `scaleX(${progress / 100})` }}
          aria-hidden
        />
      </header>

      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
