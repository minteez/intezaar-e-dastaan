import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CloudMoon,
  Feather,
  Heart,
  Hourglass,
  Moon,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { CATEGORIES, NAZMS, QUOTES, SHAYARI, TAGLINES } from "@/data/content";
import { Divider, SectionTitle } from "@/components/Divider";
import { PoemActions } from "@/components/PoemActions";
import { useFavorites } from "@/hooks/use-preferences";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Intezaar-e-Dastaan — हर एहसास की एक दास्तान" },
      {
        name: "description",
        content:
          "हिंदी और उर्दू शायरी, नज़्म और कोट्स का एक ख़ूबसूरत संग्रह — इंतज़ार, मोहब्बत, तन्हाई और उम्मीद के अल्फ़ाज़।",
      },
      { property: "og:title", content: "Intezaar-e-Dastaan — हर एहसास की एक दास्तान" },
      {
        property: "og:description",
        content: "Hindi & Urdu shayari, nazm and quotes — a moonlit literary journal.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const ICONS = { hourglass: Hourglass, moon: Moon, feather: Feather, heart: Heart, cloud: CloudMoon, sparkles: Sparkles };

function Home() {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [quote, setQuote] = useState(QUOTES[0]!);
  const { favs, toggleFav } = useFavorites();

  useEffect(() => {
    const t = setInterval(() => setTaglineIdx((i) => (i + 1) % TAGLINES.length), 5200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]!);
  }, []);

  const featured = SHAYARI[0]!;
  const latest = SHAYARI.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Hero */}
      <section className="flex min-h-[78vh] flex-col items-center justify-center text-center">
        <p className="animate-rise text-xs uppercase tracking-[0.5em] text-muted-foreground">
          a moonlit literary journal
        </p>
        <h1
          className="animate-rise mt-6 font-display text-5xl leading-tight gold-text sm:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          Intezaar-e-Dastaan
        </h1>
        <p
          key={taglineIdx}
          className="hindi animate-rise mx-auto mt-8 max-w-2xl text-lg text-foreground/90 sm:text-2xl"
        >
          {TAGLINES[taglineIdx]}
        </p>
        <Link
          to="/nazm/$slug"
          params={{ slug: NAZMS[0]!.slug }}
          className="animate-rise mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-transform hover:scale-105"
          style={{ animationDelay: "0.3s" }}
        >
          Read Latest <ArrowRight className="size-4" />
        </Link>
      </section>

      <Divider label="मौज़ू" />

      {/* Categories */}
      <section aria-labelledby="cats">
        <SectionTitle hindi="चुनिंदा मौज़ू" english="Featured Categories" />
        <h2 id="cats" className="sr-only">Featured Categories</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const Icon = ICONS[c.icon];
            return (
              <Link
                key={c.name}
                to="/shayari"
                search={{ q: "", cat: c.name }}
                className="lift glass group rounded-3xl p-8 text-center"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-full border border-gold/40 text-gold transition-transform duration-500 group-hover:rotate-12">
                  <Icon className="size-6" />
                </span>
                <h3 className="hindi mt-5 text-xl text-foreground">{c.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {c.en}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <Divider label="ताज़ा शायरी" />

      {/* Latest shayari */}
      <section aria-labelledby="latest">
        <SectionTitle hindi="ताज़ा शायरी" english="Latest Shayari" />
        <h2 id="latest" className="sr-only">Latest Shayari</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((s) => (
            <article key={s.id} className="lift glass flex flex-col justify-between rounded-3xl p-7">
              <div>
                <span className="hindi rounded-full border border-gold/30 px-3 py-1 text-xs text-gold">
                  {s.category}
                </span>
                <div className="hindi mt-5 space-y-1 text-lg text-foreground/90">
                  {s.text.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <PoemActions
                  text={s.text.join("\n")}
                  id={s.id}
                  isFav={favs.includes(s.id)}
                  onFav={toggleFav}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <Divider label="आज की तहरीर" />

      {/* Today's featured */}
      <section aria-labelledby="featured">
        <SectionTitle hindi="आज की ख़ास तहरीर" english="Today's Featured Writing" />
        <h2 id="featured" className="sr-only">Today's Featured Writing</h2>
        <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-16">
          <div className="paper absolute inset-0 opacity-60" aria-hidden />
          <div className="relative">
            <span className="text-3xl text-gold/70">❝</span>
            <div className="hindi mx-auto mt-6 max-w-3xl space-y-3 text-2xl leading-relaxed text-foreground sm:text-3xl">
              {featured.text.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <PoemActions text={featured.text.join("\n")} />
            </div>
          </div>
        </div>
      </section>

      <Divider label="आज का कोट" />

      {/* Quote of the day */}
      <section aria-labelledby="qotd" className="pb-8">
        <SectionTitle hindi="आज का कोट" english="Quote of the Day" />
        <h2 id="qotd" className="sr-only">Quote of the Day</h2>
        <div className="glass mx-auto max-w-3xl rounded-3xl p-10 text-center">
          <p className="hindi text-xl text-foreground/90 sm:text-2xl">{quote.text}</p>
          <div className="mt-8 flex justify-center">
            <PoemActions text={quote.text} />
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/quotes"
            className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
          >
            सारे कोट्स देखें <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
