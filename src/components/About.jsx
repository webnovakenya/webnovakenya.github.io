import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Asterisk, Plus } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import Logo from './Logo'
import { gsap } from '../lib/gsap'
import { scrollToSection } from '../lib/scroll'

const statement =
  'Webnova is an independent creative studio turning ambitious ideas into *digital experiences* people feel, remember and return to.'

const capabilities = [
  'Brand strategy & art direction',
  'UI/UX & interaction design',
  'Front-end & back-end engineering',
  'E-commerce & booking systems',
  '3D, motion & real-time visuals',
  'SEO, analytics & performance',
]

const stats = [
  { value: 0, suffix: '', label: 'Projects delivered' },
  { value: 2026, suffix: '', label: 'Year launched' },
  { value: 4, suffix: '', label: 'Core disciplines' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(value)
      return undefined
    }

    let frame
    const start = performance.now()
    const duration = 1400
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export default function About() {
  const statementRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !statementRef.current) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(
        '.about-word',
        { opacity: 0.16, y: 6 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.045,
          ease: 'none',
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top 82%',
            end: 'bottom 58%',
            scrub: 0.6,
          },
        },
      )
    }, statementRef)

    return () => context.revert()
  }, [])

  return (
    <section id="about" className="relative overflow-hidden bg-bone py-24 text-ink sm:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow index="01" onLight>
            The studio
          </Eyebrow>
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/62">
            Independent by design — launched 2026
          </span>
        </div>

        <div ref={statementRef} className="mt-12 sm:mt-16">
          <p className="max-w-6xl font-heading text-[clamp(2rem,4.6vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.045em]">
            {statement.split(' ').map((token, index) => {
              const highlighted = token.startsWith('*') || token.endsWith('*')
              return (
                <span
                  key={`${token}-${index}`}
                  className={`about-word inline-block ${highlighted ? 'text-rust' : ''}`}
                >
                  {token.replaceAll('*', '')}
                  {'\u00A0'}
                </span>
              )
            })}
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-ink/10 bg-ink text-bone sm:aspect-[16/11] lg:aspect-[4/5]">
              <div className="animate-drift absolute -inset-[8%] bg-[radial-gradient(ellipse_at_24%_18%,rgba(79,111,255,0.34),transparent_56%),radial-gradient(ellipse_at_82%_82%,rgba(255,91,53,0.16),transparent_52%),linear-gradient(155deg,#0a0e19,#06080f)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.16),transparent_42%)]" />
              <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(241,237,228,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(241,237,228,0.5)_1px,transparent_1px)] [background-size:56px_56px]" />
              <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-bone/80">
                    Studio / 01
                  </span>
                  <Asterisk className="animate-spin-slow h-5 w-5 text-rust" strokeWidth={1.5} />
                </div>

                <div className="flex items-center justify-center py-8">
                  <div className="relative flex aspect-square w-[58%] items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-bone/15" />
                    <span className="absolute inset-[12%] rounded-full border border-dashed border-bone/15" />
                    <span className="absolute inset-[26%] rounded-full border border-royal/25" />
                    <Logo
                      variant="full"
                      height="h-9 sm:h-11 lg:h-10"
                      className="relative max-w-full"
                    />
                  </div>
                </div>

                <div>
                  <p className="max-w-xs font-heading text-2xl font-semibold leading-tight sm:text-3xl">
                    Design-led.
                    <br />
                    Engineering-obsessed.
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-bone/15 pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/75">
                    <span>Worldwide services</span>
                    <span>Launched 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col lg:justify-between">
            <Reveal>
              <p className="max-w-xl text-base leading-relaxed text-ink/78 sm:text-lg">
                We sit at the intersection of design and engineering. Small enough to care about every
                pixel, senior enough to ship complex products without compromise. No account managers,
                no hand-offs — just the people doing the work.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {capabilities.map((capability) => (
                  <div
                    key={capability}
                    className="group flex items-center justify-between gap-3 border-t border-ink/15 py-4"
                  >
                    <span className="text-sm text-ink/70 transition-colors group-hover:text-ink">
                      {capability}
                    </span>
                    <Plus
                      className="h-3.5 w-3.5 shrink-0 text-ink/66 transition-transform duration-300 group-hover:rotate-90 group-hover:text-rust"
                      strokeWidth={1.5}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('process')}
                className="group mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/70 transition-colors hover:text-ink"
              >
                How we work
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </button>
            </Reveal>

            <Reveal className="mt-14" delay={0.1}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/15 pt-8 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-ink/64">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <motion.div
        className="mx-auto mt-20 flex w-full max-w-[1680px] items-center justify-between gap-4 border-t border-ink/15 px-4 pt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-ink/62 sm:mt-28 sm:px-8 sm:text-[11px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span>Strategy / Design / Development</span>
        <span className="hidden sm:block">Built for ambitious teams worldwide</span>
        <span>01 — 02</span>
      </motion.div>
    </section>
  )
}
