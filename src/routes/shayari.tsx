import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { Search, X } from "lucide-react";
import { SHAYARI, SHAYARI_CATEGORIES } from "@/data/content";
import { PoemActions } from "@/components/PoemActions";
import { SectionTitle } from "@/components/Divider";
import { useFavorites } from "@/hooks/use-preferences";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  cat: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/shayari")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "शायरी — Intezaar-e-Dastaan" },
      {
        name: "description",
        content:
          "मोहब्बत, इंतज़ार, दर्द, ख़ामोशी, उम्मीद, रिश्ते और तन्हाई पर चुनिंदा हिंदी-उर्दू शायरी।",
      },
      { property: "og:title", content: "शायरी — Intezaar-e-Dastaan" },
      { property: "og:description", content: "Curated Hindi & Urdu shayari by theme." },
      { property: "og:url", content: "/shayari" },
    ],
    links: [{ rel: "canonical", href: "/shayari" }],
  }),
  component: ShayariPage,
});

function ShayariPage() {
  const { q, cat } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { favs, toggleFav } = useFavorites();

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return SHAYARI.filter(
      (s) =>
        (!cat || s.category === cat) &&
        (!query || (s.text.join(" ") + s.category).toLowerCase().includes(query)),
    );
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle hindi="शायरी" english="Shayari" />

      <div className="mx-auto mb-8 max-w-xl">
        <div className="glass flex items-center gap-3 rounded-full px-5 py-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) =>
              navigate({ search: (prev) => ({ ...prev, q: e.target.value }) })
            }
            placeholder="शायरी खोजें…"
            aria-label="Search shayari"
            className="hindi min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {q ? (
            <button
              onClick={() => navigate({ search: (prev) => ({ ...prev, q: "" }) })}
              aria-label="Clear search"
              className="shrink-0 text-muted-foreground hover:text-gold"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => navigate({ search: (prev) => ({ ...prev, cat: "" }) })}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            !cat ? "border-gold bg-accent text-accent-foreground" : "border-border/60 text-muted-foreground hover:border-gold/60"
          }`}
        >
          सभी
        </button>
        {SHAYARI_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, cat: prev.cat === c ? "" : c }) })
            }
            className={`hindi rounded-full border px-4 py-2 text-sm transition-colors ${
              cat === c
                ? "border-gold bg-accent text-accent-foreground"
                : "border-border/60 text-muted-foreground hover:border-gold/60"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="hindi py-20 text-center text-muted-foreground">
          इस मौज़ू पर अभी कुछ नहीं मिला।
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => (
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
      )}
    </div>
  );
}
