export default function Eyebrow({ index, children, onLight = false, className = '' }) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] ${
        onLight ? 'text-ink/64' : 'text-bone/75'
      } ${className}`}
    >
      {index && <span className="tabular-nums">{index}</span>}
      <span className="h-px w-7 bg-current opacity-50" />
      <span>{children}</span>
    </div>
  )
}
