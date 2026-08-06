import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { NAZMS, QUOTES, SHAYARI } from "@/data/content";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function GlobalSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (s: string) => !q || s.toLowerCase().includes(q);
    return {
      shayari: SHAYARI.filter((s) => match(s.text.join(" ") + s.category)).slice(0, 6),
      nazm: NAZMS.filter((n) => match(n.title + n.subtitle + n.stanzas.flat().join(" "))),
      quotes: QUOTES.filter((qt) => match(qt.text)).slice(0, 6),
    };
  }, [query]);

  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search shayari, nazm, quotes…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>कुछ नहीं मिला।</CommandEmpty>
        {results.shayari.length > 0 && (
          <CommandGroup heading="Shayari">
            {results.shayari.map((s) => (
              <CommandItem key={s.id} value={s.text.join(" ")} onSelect={() => go("/shayari")}>
                <span className="hindi truncate">{s.text[0]}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {results.nazm.length > 0 && (
          <CommandGroup heading="Nazm">
            {results.nazm.map((n) => (
              <CommandItem
                key={n.slug}
                value={n.title}
                onSelect={() => go(`/nazm/${n.slug}`)}
              >
                <span className="hindi truncate">{n.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {results.quotes.length > 0 && (
          <CommandGroup heading="Quotes">
            {results.quotes.map((q) => (
              <CommandItem key={q.id} value={q.text} onSelect={() => go("/quotes")}>
                <span className="hindi truncate">{q.text}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
