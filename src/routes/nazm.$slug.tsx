import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { NAZMS } from "@/data/content";
import { PoemActions } from "@/components/PoemActions";
import { readingTime } from "@/lib/reading";

export const Route = createFileRoute("/nazm/$slug")({
  loader: ({ params }) => {
    const nazm = NAZMS.find((n) => n.slug === params.slug);
    if (!nazm) throw notFound();
    return { nazm };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "नज़्म नहीं मिली — Intezaar-e-Dastaan" }, { name: "robots", content: "noindex" }],
      };
    }
    const { nazm } = loaderData;
    return {
      meta: [
        { title: `${nazm.title} — Intezaar-e-Dastaan` },
        { name: "description", content: `${nazm.subtitle} — ${nazm.stanzas[0]?.join(" ").slice(0, 120)}` },
        { property: "og:title", content: `${nazm.title} — Intezaar-e-Dastaan` },
        { property: "og:description", content: nazm.subtitle },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/nazm/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/nazm/${params.slug}` }],
    };
  },
  component: NazmDetail,
});

function NazmDetail() {
  const { nazm } = Route.useLoaderData();
  const full = nazm.stanzas.map((s) => s.join("\n")).join("\n\n");

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link
        to="/nazm"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"
      >
        <ArrowLeft className="size-4" /> सारी नज़्में
      </Link>

      <header className="mt-8 text-center">
        <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <Clock className="size-3.5" /> {readingTime(full)} min read
        </p>
        <h1 className="hindi mt-4 text-3xl gold-text sm:text-5xl">{nazm.title}</h1>
        <p className="hindi mt-3 text-muted-foreground">{nazm.subtitle}</p>
      </header>

      <div className="glass paper mt-12 rounded-[2rem] px-6 py-14 sm:px-14">
        {nazm.stanzas.map((stanza, i) => (
          <div
            key={i}
            className="hindi animate-rise mb-10 space-y-2 text-center text-xl leading-loose text-foreground/90 last:mb-0 sm:text-2xl"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            {stanza.map((line, j) => (
              <p key={j}>{line}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <PoemActions text={`${nazm.title}\n\n${full}`} title={nazm.title} />
      </div>
    </article>
  );
}
