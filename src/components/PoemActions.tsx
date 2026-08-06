import { Check, Copy, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function PoemActions({
  text,
  id,
  isFav,
  onFav,
  title,
}: {
  text: string;
  id?: string;
  isFav?: boolean;
  onFav?: (id: string) => void;
  title?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("कॉपी हो गया");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("कॉपी नहीं हो सका");
    }
  };

  const share = async () => {
    const data = { title: title ?? "Intezaar-e-Dastaan", text };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        /* dismissed */
      }
    } else {
      await copy();
    }
  };

  const base =
    "grid size-11 place-items-center rounded-full border border-border/60 text-muted-foreground transition-all hover:border-gold/60 hover:text-gold";

  return (
    <div className="flex items-center gap-2">
      <button onClick={copy} aria-label="Copy text" className={base}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <button onClick={share} aria-label="Share" className={base}>
        <Share2 className="size-4" />
      </button>
      {id && onFav ? (
        <button
          onClick={() => onFav(id)}
          aria-label={isFav ? "Remove bookmark" : "Bookmark"}
          aria-pressed={isFav}
          className={base}
        >
          <Heart className={`size-4 ${isFav ? "fill-gold text-gold" : ""}`} />
        </button>
      ) : null}
    </div>
  );
}
