import { createFileRoute } from "@tanstack/react-router";
import { Shuffle } from "lucide-react";
import { useState } from "react";
import { QUOTES } from "@/data/content";
import { PoemActions } from "@/components/PoemActions";
import { SectionTitle } from "@/components/Divider";

export const Route = createFileRoute("/quotes")({
  head: () => ({
    meta: [
      { title: "कोट्स — Intezaar-e-Dastaan" },
      {
        name: "description",
        content: "छोटे मगर गहरे जज़्बाती अल्फ़ाज़ — इंतज़ार, याद, तन्हाई और उम्मीद पर हिंदी कोट्स।",
      },
      { property: "og:title", content: "कोट्स — Intezaar-e-Dastaan" },
      { property: "og:description", content: "Short emotional Hindi & Urdu quotes." },
      { property: "og:url", content: "/quotes" },
    ],
    links: [{ rel: "canonical", href: "/quotes" }],
  }),
  component: QuotesPage,
});

function QuotesPage() {
  const [random, setRandom] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle hindi="कोट्स" english="Quotes" />

      <div className="mb-12 text-center">
        <button
          onClick={() => setRandom(QUOTES[Math.floor(Math.random() * QUOTES.length)]!.text)}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-105"
        >
          <Shuffle className="size-4" /> कोई एक कोट दिखाओ
        </button>
        {random ? (
          <div className="glass mx-auto mt-8 max-w-2xl rounded-3xl p-8">
            <p className="hindi text-xl text-foreground/90">{random}</p>
            <div className="mt-6 flex justify-center">
              <PoemActions text={random} />
            </div>
          </div>
        ) : null}
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {QUOTES.map((q, i) => (
          <figure
            key={q.id}
            className="lift glass animate-rise break-inside-avoid rounded-3xl p-7"
            style={{ animationDelay: `${(i % 6) * 0.06}s` }}
          >
            <blockquote className="hindi text-lg text-foreground/90">{q.text}</blockquote>
            <figcaption className="mt-6 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Intezaar-e-Dastaan
              </span>
              <PoemActions text={q.text} />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
