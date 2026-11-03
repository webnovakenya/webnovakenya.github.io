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
    <section id="process" className="relative overflow-hidden bg-ink py-24 text-bone sm:py-32">
      <div
        className="animate-drift pointer-events-none absolute -inset-[8%]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 85% 20%, rgba(108,92,255,0.07), transparent 60%), radial-gradient(ellipse 40% 40% at 10% 80%, rgba(255,91,53,0.045), transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow index="04">The process</Eyebrow>
                <SplitHeading
                  lines={['Clarity at', 'every step.']}
                  className="mt-6 font-heading text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.05em]"
                />
                <p className="mt-6 max-w-md text-base leading-relaxed text-bone/70 sm:text-base">
                  No black boxes. No disappearing acts. A senior team, a transparent process and
                  decisions you can follow from first conversation to final launch.
                </p>

                <div className="mt-10 flex items-center gap-5">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-white/15">
                    <Asterisk className="animate-spin-slow h-5 w-5 text-royal" strokeWidth={1.5} />
                  </span>
                  <div className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-bone/75 sm:text-[11px]">
                    <p>Average timeline</p>
                    <p className="mt-1 text-bone/70">6 — 12 weeks</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="group mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/80 transition-colors hover:text-bone"
                >
                  Book an intro call
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </button>

                <p className="mt-10 hidden font-mono text-[11px] uppercase tracking-[0.22em] text-bone/20 lg:block">
                  04 / A process built on trust
                </p>
              </Reveal>
            </div>
          </div>

          <div ref={trackRef} className="relative lg:col-span-6 lg:col-start-7">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-white/10 sm:left-5" aria-hidden="true">
              <motion.div className="h-full w-px origin-top bg-royal" style={{ scaleY }} />
            </div>

            <div className="space-y-12 sm:space-y-16">
              {steps.map((step, index) => (
                <Reveal key={step.index} delay={index * 0.04}>
                  <div className="group relative pl-12 sm:pl-16">
                    <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-ink font-mono text-[11px] text-bone/72 transition-colors duration-500 group-hover:border-royal group-hover:text-royal sm:h-10 sm:w-10 sm:text-[11px]">
                      {step.index}
                    </span>

                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70">
                      <span>{step.label}</span>
                      <span className="h-px w-6 bg-white/15" />
                    </div>

                    <h3 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-bone/70 sm:text-base">
                      {step.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {step.deliverables.map((item) => (
                        <span
                          key={item}
                          className="border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/72"
                        >
                          {item}
                        </span>
                      ))}
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
