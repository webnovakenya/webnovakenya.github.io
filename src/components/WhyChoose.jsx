import { ArrowUpRight, Asterisk } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import { scrollToSection } from '../lib/scroll'

const reasons = [
  {
    index: '01',
    title: 'Strategy before pixels',
    copy: 'Every design decision is tied to a business outcome. Beautiful is the baseline — effective is the brief.',
  },
  {
    index: '02',
    title: 'One senior team',
    copy: 'The people you meet are the people who do the work. No hand-offs, no telephone game, no diluted vision.',
  },
  {
    index: '03',
    title: 'Performance is design',
    copy: 'Fast is a feeling. We ship against strict performance budgets so the experience stays effortless on every device.',
  },
  {
    index: '04',
    title: 'Motion with purpose',
    copy: 'Interactions that guide attention and create memory — never animation for animation’s sake.',
  },
  {
    index: '05',
    title: 'Built to scale',
    copy: 'Clean architecture and considered systems, so your platform grows with the business instead of against it.',
  },
  {
    index: '06',
    title: 'Here after launch',
    copy: 'Support, iteration and a long-term view. The best work rarely ends at go-live — it compounds.',
  },
]

export default function WhyChoose() {
  return (
    <section id="why" className="relative overflow-hidden bg-bone py-24 text-ink sm:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="05" onLight>
              Why Webnova
            </Eyebrow>
            <SplitHeading
              lines={['More than', 'a website.']}
              className="mt-6 max-w-3xl font-heading text-[clamp(2.6rem,5.5vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.05em]"
            />
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-ink/75 sm:text-base">
              A website is the most hardworking member of your team. Ours are built to carry the
              brand, earn the click and keep paying attention back.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid border-l border-t border-ink/15 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.index}
              className="group relative flex min-h-[250px] flex-col justify-between border-b border-r border-ink/15 p-6 transition-colors duration-500 hover:bg-ink hover:text-bone sm:min-h-[280px] sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70 transition-colors duration-500 group-hover:text-royal">
                  {reason.index}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 -translate-x-1 translate-y-1 text-ink/20 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-royal group-hover:opacity-100"
                  strokeWidth={1.5}
                />
              </div>

              <div className="mt-12">
                <h3 className="font-heading text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-[1.7rem]">
                  {reason.title}
                </h3>
                <p className="mt-3 max-w-xs text-base leading-relaxed text-ink/70 transition-colors duration-500 group-hover:text-bone/72">
                  {reason.copy}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-20 sm:mt-28">
          <div className="relative grid overflow-hidden bg-ink text-bone lg:grid-cols-12">
            <div className="relative flex flex-col justify-between p-6 sm:p-10 lg:col-span-8 lg:p-14">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(108,92,255,0.14),transparent_55%)]" />
              <Asterisk className="animate-spin-slow relative h-7 w-7 text-rust" strokeWidth={1.25} />
              <blockquote className="relative mt-10 max-w-3xl font-heading text-2xl font-medium leading-[1.2] tracking-[-0.03em] sm:text-4xl lg:text-[2.6rem]">
                “We’re a new studio, which means something simple: the people you meet are the people
                doing the work — and your project gets our full attention from day one.”
              </blockquote>
              <footer className="relative mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/75">
                <span className="text-bone/70">Webnova Studio</span>
                <span className="h-px w-6 bg-bone/20" />
                <span>Founding principle</span>
              </footer>
            </div>

            <div className="relative flex flex-col justify-between border-t border-white/10 p-6 sm:p-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-10">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/72">
                  The difference
                </p>
                <p className="mt-4 font-heading text-xl font-semibold leading-tight sm:text-2xl">
                  A partner, not
                  <br />a pair of hands.
                </p>
              </div>

              <div className="mt-10">
                <p className="font-heading text-5xl font-semibold tracking-[-0.05em] text-royal sm:text-6xl">
                  0
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-bone/72">
                  Projects delivered so far
                  <br />
                  Your project could be the first
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="group mt-8 inline-flex items-center gap-2 border-b border-bone/25 pb-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-bone/70 transition-colors hover:border-royal hover:text-royal"
                >
                  Become our first case study
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
