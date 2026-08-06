import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Github, Instagram, Mail, Send, Twitter } from "lucide-react";
import { SectionTitle } from "@/components/Divider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "संपर्क — Intezaar-e-Dastaan" },
      {
        name: "description",
        content: "अपनी बात, अपना एहसास या कोई तहरीर हम तक पहुँचाइए — Intezaar-e-Dastaan से जुड़िए।",
      },
      { property: "og:title", content: "संपर्क — Intezaar-e-Dastaan" },
      { property: "og:description", content: "Get in touch with Intezaar-e-Dastaan." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const field =
    "w-full rounded-2xl border border-border/60 bg-transparent px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <SectionTitle hindi="संपर्क करें" english="Contact" />

      <div className="glass rounded-[2rem] p-8 sm:p-12">
        {sent ? (
          <div className="animate-rise py-14 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full border border-gold/50 text-gold animate-moon">
              <Check className="size-7" />
            </span>
            <h2 className="hindi mt-6 text-2xl gold-text">शुक्रिया!</h2>
            <p className="hindi mt-3 text-muted-foreground">
              आपका पैग़ाम हम तक पहुँच गया है। जल्द ही जवाब मिलेगा।
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-8 rounded-full border border-border/60 px-6 py-3 text-sm text-foreground transition-colors hover:border-gold/60"
            >
              एक और पैग़ाम भेजें
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="grid gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Name
                </label>
                <input id="name" name="name" required placeholder="आपका नाम" className={field} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Email
                </label>
                <input id="email" name="email" type="email" required placeholder="you@email.com" className={field} />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Subject
              </label>
              <input id="subject" name="subject" required placeholder="विषय" className={field} />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="अपनी बात लिखिए…"
                className={`${field} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02]"
            >
              <Send className="size-4" /> भेजिए
            </button>
          </form>
        )}
      </div>

      <div className="mt-10 flex justify-center gap-3">
        {[Instagram, Twitter, Github, Mail].map((Icon, i) => (
          <a
            key={i}
            href="#"
            aria-label={["Instagram", "Twitter", "GitHub", "Email"][i]}
            className="grid size-12 place-items-center rounded-full glass text-muted-foreground transition-colors hover:text-gold"
          >
            <Icon className="size-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
