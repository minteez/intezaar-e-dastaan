import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { NAZMS } from "@/data/content";
import { SectionTitle } from "@/components/Divider";
import { readingTime } from "@/lib/reading";

export const Route = createFileRoute("/nazm/")({
  head: () => ({
    meta: [
      { title: "नज़्म — Intezaar-e-Dastaan" },
      {
        name: "description",
        content:
          "लम्बी नज़्मों का संग्रह — इंतज़ार से आगे, राज़-ए-दिल और उम्मीद, और ज़िंदगी के नाम एक तहरीर।",
      },
      { property: "og:title", content: "नज़्म — Intezaar-e-Dastaan" },
      { property: "og:description", content: "Long-form Hindi & Urdu nazms, made for slow reading." },
      { property: "og:url", content: "/nazm" },
    ],
    links: [{ rel: "canonical", href: "/nazm" }],
  }),
  component: NazmIndex,
});

function NazmIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionTitle hindi="नज़्म" english="Long-form Poetry" />
      <div className="grid gap-6">
        {NAZMS.map((n, i) => (
          <Link
            key={n.slug}
            to="/nazm/$slug"
            params={{ slug: n.slug }}
            className="lift glass animate-rise group block rounded-3xl p-8 sm:p-10"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" /> {readingTime(n.stanzas.flat().join(" "))} min read
              </span>
            </div>
            <h2 className="hindi mt-4 text-2xl text-foreground sm:text-3xl">{n.title}</h2>
            <p className="hindi mt-2 text-muted-foreground">{n.subtitle}</p>
            <p className="hindi mt-5 line-clamp-2 text-foreground/70">
              {n.stanzas[0]?.join(" ")}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold">
              पढ़िए <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
