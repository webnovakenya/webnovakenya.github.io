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
    <section id="why" className="relative overflow-hidden bg-ink py-24 text-bone sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 dark-grid opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-plum/[0.08] blur-[130px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute right-0 top-16 select-none font-display text-[20rem] font-bold leading-none text-white/[0.018]" aria-hidden="true">
        WHY
      </div>
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="section-frame relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-5">
          <Eyebrow index="✳">Why Webnova</Eyebrow>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/50">
            Principles over promises
          </span>
        </div>

        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SplitHeading
              lines={['More than', 'a website.']}
              className="font-display text-[clamp(2.8rem,6vw,6rem)] font-bold uppercase leading-[0.88] tracking-[-0.05em]"
            />
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.8] text-bone/68 sm:text-base">
              A website is the most hardworking member of your team. Ours are built to carry the
              brand, earn the click and keep paying attention back.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-3 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <Reveal key={reason.index} delay={Number(reason.index) * 0.025}>
              <div className="group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.045] sm:min-h-[260px] sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/40 transition-colors duration-500 group-hover:text-royal">
                    {reason.index}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 -translate-x-1 translate-y-1 text-bone/20 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-royal group-hover:opacity-100"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="mt-10">
                  <h3 className="font-display text-[clamp(1.35rem,2vw,1.8rem)] font-bold uppercase leading-[1.02] tracking-[-0.035em]">
                    {reason.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-[13.5px] leading-[1.75] text-bone/58 transition-colors duration-500 group-hover:text-bone/70">
                    {reason.copy}
                  </p>
                </div>

                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-royal transition-transform duration-700 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 sm:mt-24">
          <div className="relative grid overflow-hidden rounded-[1.8rem] border border-white/12 bg-gradient-to-br from-ink-3 to-ink-2 text-bone lg:grid-cols-12">
            <div className="relative flex flex-col justify-between p-6 sm:p-10 lg:col-span-8 lg:p-14">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(140,123,255,0.16),transparent_55%)]" />
              <div className="relative flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50">
                  The founding principle
                </p>
                <Asterisk className="animate-spin-slow h-6 w-6 text-rust" strokeWidth={1.25} />
              </div>
              <blockquote className="relative mt-12 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.04em]">
                “The people you meet are the people doing the work — and your project gets our full
                attention from day one.”
              </blockquote>
              <footer className="relative mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/55">
                <span className="text-bone/75">Webnova Studio</span>
                <span className="h-px w-6 bg-bone/20" />
                <span>Still building it that way</span>
              </footer>
            </div>

            <div className="relative flex flex-col justify-between border-t border-white/10 p-6 sm:p-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50">
                  The difference
                </p>
                <p className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold uppercase leading-[0.98] tracking-[-0.035em]">
                  A partner, not
                  <br />a pair of hands.
                </p>
              </div>

              <div className="mt-12">
                <p className="font-display text-5xl font-bold tracking-[-0.055em] text-royal sm:text-6xl">
                  0
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-bone/55">
                  Projects delivered so far
                  <br />
                  Your project could be the first
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="group mt-8 inline-flex items-center gap-2 border-b border-bone/25 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/72 transition-colors hover:border-royal hover:text-royal"
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
