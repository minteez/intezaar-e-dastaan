import { createFileRoute } from "@tanstack/react-router";
import { NAZMS, QUOTES, SHAYARI } from "@/data/content";
import { Divider, SectionTitle } from "@/components/Divider";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "मेरे बारे में — Intezaar-e-Dastaan" },
      {
        name: "description",
        content:
          "Intezaar-e-Dastaan के पीछे की कहानी — लिखने की प्रेरणा, सफ़र और वो अनकहे जज़्बात जो अल्फ़ाज़ बने।",
      },
      { property: "og:title", content: "मेरे बारे में — Intezaar-e-Dastaan" },
      { property: "og:description", content: "The story and vision behind Intezaar-e-Dastaan." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { year: "2019", hi: "पहला शेर", text: "एक डायरी के आख़िरी सफ़े पर लिखा पहला शेर।" },
  { year: "2021", hi: "पहली नज़्म", text: "इंतज़ार को अल्फ़ाज़ मिले — पहली लम्बी नज़्म।" },
  { year: "2023", hi: "महफ़िल", text: "पहली बार अपनी तहरीरें लोगों के सामने पढ़ीं।" },
  { year: "2026", hi: "Intezaar-e-Dastaan", text: "सारे बिखरे अल्फ़ाज़ एक जगह इकट्ठे हुए।" },
];

function AboutPage() {
  const stats = [
    { label: "Shayaris", value: SHAYARI.length, hi: "शायरी" },
    { label: "Nazms", value: NAZMS.length, hi: "नज़्में" },
    { label: "Quotes", value: QUOTES.length, hi: "कोट्स" },
    { label: "Years Writing", value: 7, hi: "साल" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionTitle hindi="मेरे बारे में" english="About Me" />

      <div className="grid gap-10 md:grid-cols-[280px_minmax(0,1fr)] md:items-start">
        <div className="glass mx-auto grid aspect-square w-full max-w-[280px] place-items-center overflow-hidden rounded-[2rem]">
          <div className="paper grid size-full place-items-center">
            <span className="hindi text-6xl gold-text">इ</span>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 sm:p-10">
          <p className="hindi text-lg leading-loose text-foreground/90">
            शब्द हमेशा मेरे लिए सिर्फ़ लिखने का माध्यम नहीं रहे, बल्कि दिल के उन एहसासों की
            आवाज़ हैं जिन्हें अक्सर लोग कह नहीं पाते। &ldquo;Intezaar-e-Dastaan&rdquo; उन सभी
            अनकहे जज़्बातों का संग्रह है जो इंतज़ार, मोहब्बत, तन्हाई, उम्मीद और ज़िंदगी के
            सफ़र से जन्म लेते हैं। मेरी कोशिश बस इतनी है कि जो अल्फ़ाज़ मेरे दिल से निकले
            हैं, वे किसी और के दिल तक पहुँच जाएँ।
          </p>
        </div>
      </div>

      <Divider label="सफ़र" />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { t: "प्रेरणा", e: "Inspiration", d: "रातें, चाँद, अधूरी बातें और वो लोग जो चले गए मगर ठहर गए।" },
          { t: "सफ़र", e: "Journey", d: "एक डायरी से शुरू हुआ सिलसिला, आज एक पूरी दास्तान है।" },
          { t: "मक़सद", e: "Vision", d: "हर पढ़ने वाले को उसका अपना एहसास लौटा देना।" },
        ].map((c) => (
          <div key={c.t} className="lift glass rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{c.e}</p>
            <h3 className="hindi mt-3 text-xl text-gold">{c.t}</h3>
            <p className="hindi mt-3 text-foreground/80">{c.d}</p>
          </div>
        ))}
      </div>

      <Divider label="मील के पत्थर" />

      <ol className="relative mx-auto max-w-2xl border-l border-gold/30 pl-8">
        {TIMELINE.map((t) => (
          <li key={t.year} className="mb-10 last:mb-0">
            <span className="absolute -left-[7px] mt-2 size-3 rounded-full bg-gold shadow-[0_0_18px_6px_var(--glow)]" />
            <p className="font-display text-xl text-gold">{t.year}</p>
            <h3 className="hindi mt-1 text-lg text-foreground">{t.hi}</h3>
            <p className="hindi mt-1 text-sm text-muted-foreground">{t.text}</p>
          </li>
        ))}
      </ol>

      <Divider label="आँकड़े" />

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="lift glass rounded-3xl p-8 text-center">
            <p className="font-display text-4xl gold-text">{s.value}</p>
            <p className="hindi mt-2 text-sm text-foreground/80">{s.hi}</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
