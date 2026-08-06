export function Divider({ label }: { label?: string }) {
  return (
    <div className="my-14 flex items-center justify-center gap-4" aria-hidden={!label}>
      <span className="h-px w-16 bg-linear-to-r from-transparent to-gold/50 sm:w-32" />
      <span className="text-gold/80">❖</span>
      {label ? (
        <span className="hindi text-sm tracking-wide text-muted-foreground">{label}</span>
      ) : null}
      <span className="text-gold/80">❖</span>
      <span className="h-px w-16 bg-linear-to-l from-transparent to-gold/50 sm:w-32" />
    </div>
  );
}

export function SectionTitle({
  hindi,
  english,
}: {
  hindi: string;
  english: string;
}) {
  return (
    <div className="mb-10 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{english}</p>
      <h2 className="hindi mt-3 text-3xl gold-text sm:text-4xl">{hindi}</h2>
    </div>
  );
}
