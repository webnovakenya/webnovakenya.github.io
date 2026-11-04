import { useEffect, useState } from 'react'
import { scrollToSection } from '../lib/scroll'

const sections = [
  { id: 'home', label: 'Home', index: '00' },
  { id: 'about', label: 'About', index: '01' },
  { id: 'services', label: 'Services', index: '02' },
  { id: 'work', label: 'Work', index: '03' },
  { id: 'process', label: 'Process', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
]

export default function SectionRail() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const ids = [...sections.map((section) => section.id), 'why', 'approach']
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 lg:flex xl:right-5"
      aria-label="Section navigation"
    >
      {sections.map((section) => {
        const isActive = active === section.id
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            aria-current={isActive ? 'true' : undefined}
            aria-label={`Go to ${section.label}`}
            className="group relative flex h-7 items-center justify-end pr-1"
          >
            <span className="pointer-events-none absolute right-6 whitespace-nowrap border border-white/10 bg-ink/95 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/70 opacity-0 transition-all duration-300 group-hover:opacity-100">
              {section.index} — {section.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-500 ${
                isActive ? 'h-5 w-[3px] bg-royal' : 'h-[3px] w-[3px] bg-bone/30 group-hover:bg-bone/70'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
