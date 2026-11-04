import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Asterisk, Plus } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import Tilt from './Tilt'
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
        { opacity: 0.2, y: 8 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top 82%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      )
    }, statementRef)

    return () => context.revert()
  }, [])

  return (
    <section id="about" className="relative overflow-hidden bg-paper py-24 text-ink sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 paper-grid" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-rust/[0.055] blur-[120px]"
        aria-hidden="true"
      />

      <div className="section-frame relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-5">
          <Eyebrow index="01" onLight>
            The studio
          </Eyebrow>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
            Independent by design — launched 2026
          </span>
        </div>

        <div ref={statementRef} className="mt-14 sm:mt-20">
          <p className="max-w-[77rem] font-display text-[clamp(2.15rem,5.5vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.045em]">
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

        <div className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-12 lg:items-start lg:gap-8">
          <Reveal className="lg:col-span-5">
            <Tilt className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-ink/15 bg-ink text-bone sm:aspect-[16/11] lg:aspect-[4/5]" max={2.5} scale={1.002}>
              <div className="animate-drift absolute -inset-[8%] bg-[radial-gradient(ellipse_at_24%_18%,rgba(91,120,255,0.42),transparent_56%),radial-gradient(ellipse_at_82%_82%,rgba(255,107,70,0.2),transparent_52%),linear-gradient(155deg,#0c1222,#07090e)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.18),transparent_42%)]" />
              <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(244,240,231,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(244,240,231,0.5)_1px,transparent_1px)] [background-size:56px_56px]" />
              <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 lg:p-9">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/70">
                    Studio / 01
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/50">
                    Nairobi
                    <Asterisk className="animate-spin-slow h-4 w-4 text-rust" strokeWidth={1.5} />
                  </span>
                </div>

                <div className="flex items-center justify-center py-8">
                  <div className="relative flex aspect-square w-[66%] items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-bone/16" />
                    <span className="absolute inset-[9%] rounded-full border border-dashed border-bone/14 [animation:spin-slow_38s_linear_infinite]" />
                    <span className="absolute inset-[22%] rounded-full border border-royal/30" />
                    <span className="absolute inset-[31%] rounded-full bg-[radial-gradient(circle_at_35%_25%,#f7f2e8_0%,#b8b6b3_18%,#3d4568_52%,#10162a_80%)] shadow-[inset_-18px_-18px_40px_rgba(0,0,0,0.65),inset_10px_10px_30px_rgba(255,255,255,0.18)]" />
                    <div className="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-ink/65 backdrop-blur-md sm:h-20 sm:w-20">
                      <Logo variant="mark" height="h-7 sm:h-8" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="max-w-xs font-display text-[clamp(1.65rem,2.7vw,2.4rem)] font-bold leading-[0.98] tracking-[-0.04em]">
                    Design-led. Engineering-obsessed.
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-bone/15 pt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/55">
                    <span>Global services</span>
                    <span>Launched 2026</span>
                  </div>
                </div>
              </div>
            </Tilt>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:flex lg:min-h-[36rem] lg:flex-col lg:justify-between">
            <Reveal>
              <p className="max-w-xl text-base leading-[1.8] text-ink/78 sm:text-lg">
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
                    <span className="text-[13.5px] leading-snug text-ink/72 transition-colors group-hover:text-ink sm:text-sm">
                      {capability}
                    </span>
                    <Plus
                      className="h-3.5 w-3.5 shrink-0 text-ink/50 transition-transform duration-300 group-hover:rotate-90 group-hover:text-rust"
                      strokeWidth={1.5}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('process')}
                className="group mt-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/68 transition-colors hover:text-ink"
              >
                How we work
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </button>
            </Reveal>

            <Reveal className="mt-14" delay={0.1}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/15 pt-8 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-ink/58">
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
        className="section-frame mt-20 flex w-full items-center justify-between gap-4 border-t border-ink/15 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 sm:mt-28"
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
