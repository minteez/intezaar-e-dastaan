import { Link } from "@tanstack/react-router";
import { Globe, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { NAZMS, SHAYARI_CATEGORIES, SITE } from "@/data/content";

export function SiteFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-2xl gold-text">{SITE.name}</h2>
          <p className="hindi mt-3 text-sm text-muted-foreground">
            हर एहसास की एक दास्तान, हर दास्तान में एक इंतज़ार।
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-gold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/shayari" className="hover:text-gold">Shayari</Link></li>
            <li><Link to="/nazm" className="hover:text-gold">Nazm</Link></li>
            <li><Link to="/quotes" className="hover:text-gold">Quotes</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Me</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-gold">Categories</h3>
          <ul className="hindi mt-4 space-y-1 text-sm text-muted-foreground">
            {SHAYARI_CATEGORIES.map((c) => (
              <li key={c}>
                <Link to="/shayari" search={{ q: "", cat: c }} className="hover:text-gold">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-gold">Latest Writings</h3>
          <ul className="hindi mt-4 space-y-2 text-sm text-muted-foreground">
            {NAZMS.map((n) => (
              <li key={n.slug}>
                <Link to="/nazm/$slug" params={{ slug: n.slug }} className="hover:text-gold">
                  {n.title}
                </Link>
              </li>
            ))}
          </ul>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              setEmail("");
              toast.success("शुक्रिया! आप हमारी महफ़िल का हिस्सा हैं।");
            }}
            className="mt-6"
          >
            <label htmlFor="newsletter" className="text-xs uppercase tracking-[0.3em] text-gold">
              Newsletter
            </label>
            <div className="mt-3 flex gap-2">
              <input
                id="newsletter"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="min-w-0 flex-1 rounded-full border border-border/60 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform hover:scale-105"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Creators & their social accounts */}
      <div className="border-t border-border/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
          {/* Minteez */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <p className="font-display text-lg text-foreground">Minteez</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Idea & Co-creator</p>
            <div className="mt-3 flex gap-2">
              <a
                href="https://www.instagram.com/sudo.minteez"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Minteez on Instagram"
                className="grid size-10 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://www.youtube.com/@thecubermint"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Minteez on YouTube"
                className="grid size-10 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
              >
                <Youtube className="size-4" />
              </a>
              <a
                href="https://minteez.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Minteez portfolio website"
                className="grid size-10 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
              >
                <Globe className="size-4" />
              </a>
            </div>
          </div>

          {/* Mrs. Shagufta Kulsoom */}
          <div className="flex flex-col items-center text-center md:items-end md:text-right">
            <p className="font-display text-lg text-foreground">Mrs. Shagufta Kulsoom</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Idea & Co-creator</p>
            <div className="mt-3 flex gap-2">
              <a
                href="https://www.instagram.com/kul.nas/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mrs. Shagufta Kulsoom on Instagram"
                className="grid size-10 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://www.youtube.com/@shaguftakulsoomteacher4554"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mrs. Shagufta Kulsoom on YouTube"
                className="grid size-10 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
              >
                <Youtube className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 px-4 py-8 text-center text-xs text-muted-foreground sm:px-6">
        <p>Developed by ChatGPT and Lovable</p>
        <p className="mt-3">Version {SITE.version}</p>
        <p className="mt-1">© 2026 {SITE.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
