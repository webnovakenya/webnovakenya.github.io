import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Asterisk } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import { scrollToSection } from '../lib/scroll'

const steps = [
  {
    index: '01',
    title: 'Discover & define',
    label: 'Phase one',
    description:
      'We start with the business, not the brief. Immersion, interviews and a hard look at what is and isn’t working — until we know exactly what success looks like.',
    deliverables: ['Stakeholder workshop', 'Audit', 'Strategy', 'Roadmap'],
  },
  {
    index: '02',
    title: 'Design the experience',
    label: 'Phase two',
    description:
      'Art direction, interface design and interaction design move together. We prototype the moments that matter and refine in the browser, not in a vacuum.',
    deliverables: ['Art direction', 'UI system', 'Prototype', 'Motion'],
  },
  {
    index: '03',
    title: 'Build with precision',
    label: 'Phase three',
    description:
      'Clean, component-driven code. A CMS your team will actually enjoy using. Integrations that quietly do their job. Every build ships against a performance budget.',
    deliverables: ['Development', 'CMS', 'Integrations', 'QA'],
  },
  {
    index: '04',
    title: 'Launch & evolve',
    label: 'Phase four',
    description:
      'Launch is a beginning. We hand over with care, watch how real people use the product, then keep sharpening what the data tells us to sharpen.',
    deliverables: ['Launch', 'Training', 'Analytics', 'Support'],
  },
]

export default function Process() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 65%', 'end 80%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 })

  return (
    <section id="process" className="relative overflow-hidden bg-paper py-24 text-ink sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 paper-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-24 select-none font-display text-[24rem] font-bold leading-none text-ink/[0.025]" aria-hidden="true">
        04
      </div>

      <div className="section-frame relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-5">
          <Eyebrow index="04" onLight>
            The process
          </Eyebrow>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
            Transparent from first call to launch
          </span>
        </div>

        <div className="mt-14 grid gap-16 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <SplitHeading
                  lines={['Clarity at', 'every step.']}
                  className="font-display text-[clamp(2.8rem,5.5vw,5.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.05em]"
                />
                <p className="mt-7 max-w-md text-[15px] leading-[1.8] text-ink/70 sm:text-base">
                  No black boxes. No disappearing acts. A senior team, a transparent process and
                  decisions you can follow from first conversation to final launch.
                </p>

                <div className="mt-10 flex items-center gap-5">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-ink/20 bg-ink/[0.025]">
                    <Asterisk className="animate-spin-slow h-5 w-5 text-rust" strokeWidth={1.5} />
                  </span>
                  <div className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ink/60">
                    <p>Average timeline</p>
                    <p className="mt-1 font-medium text-ink/85">6 — 12 weeks</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="group mt-10 inline-flex items-center gap-2 border-b border-ink/25 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/75 transition-colors hover:border-rust hover:text-rust"
                >
                  Book an intro call
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </button>

                <p className="mt-10 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink/28 lg:block">
                  04 / A process built on trust
                </p>
              </Reveal>
            </div>
          </div>

          <div ref={trackRef} className="relative lg:col-span-6 lg:col-start-7">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-ink/15 sm:left-5" aria-hidden="true">
              <motion.div className="h-full w-px origin-top bg-royal" style={{ scaleY }} />
            </div>

            <div className="space-y-8 sm:space-y-10">
              {steps.map((step, index) => (
                <Reveal key={step.index} delay={index * 0.04}>
                  <div className="group relative pl-12 sm:pl-16">
                    <span className="absolute left-0 top-0 z-10 grid h-8 w-8 place-items-center rounded-full border border-ink/20 bg-paper font-mono text-[10px] text-ink/65 transition-colors duration-500 group-hover:border-royal group-hover:text-royal sm:h-10 sm:w-10">
                      {step.index}
                    </span>

                    <div className="rounded-2xl border border-ink/12 bg-white/40 p-5 transition-all duration-500 group-hover:border-ink/20 group-hover:bg-white/62 sm:p-7">
                      <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/50">
                        <span>{step.label}</span>
                        <span className="h-px w-6 bg-ink/20" />
                      </div>

                      <h3 className="mt-3 font-display text-[clamp(1.55rem,2.7vw,2.4rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
                        {step.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-[14.5px] leading-[1.75] text-ink/68 sm:text-[15px]">
                        {step.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {step.deliverables.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-ink/15 bg-paper/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/58"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
