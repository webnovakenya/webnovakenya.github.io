import { Asterisk } from 'lucide-react'

export default function Marquee({ items, dark = false, className = '', duration = 30, size = 'text-3xl sm:text-5xl' }) {
  const groups = [0, 1]

  return (
    <div
      className={`marquee border-y ${
        dark ? 'border-white/10 bg-ink text-bone' : 'border-ink/15 bg-bone text-ink'
      } ${className}`}
      aria-label={items.join(' ')}
    >
      <div className="marquee-track" style={{ animationDuration: `${duration}s` }}>
        {groups.map((group) => (
          <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
            {items.map((item) => (
              <span
                key={`${group}-${item}`}
                className={`flex items-center gap-8 whitespace-nowrap px-8 py-5 font-heading font-semibold uppercase leading-none tracking-[-0.02em] ${size}`}
              >
                {item}
                <Asterisk className="h-4 w-4 shrink-0 text-rust sm:h-6 sm:w-6" strokeWidth={1.5} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
