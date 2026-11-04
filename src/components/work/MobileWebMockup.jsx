import { StatusBar } from './AppPhoneMockup'

function BrowserBar({ project }) {
  return (
    <div className="flex shrink-0 items-center gap-[0.4em] border-b border-black/8 bg-[#f6f3ed]/95 px-[1.1em] py-[0.5em] text-[#211b35]/45">
      <span className="flex min-w-0 flex-1 items-center justify-center gap-[0.35em] rounded-full bg-black/[0.055] px-[0.8em] py-[0.34em] font-mono text-[0.4em] uppercase tracking-[0.08em]">
        <span className="h-[0.55em] w-[0.55em] rounded-full border border-current" />
        <span className="truncate">{project.id}.webnova.studio</span>
      </span>
      <span className="grid h-[1.2em] w-[1.2em] place-items-center rounded-full border border-black/10 font-mono text-[0.44em]">
        +
      </span>
    </div>
  )
}

function MenuGlyph({ light = false }) {
  return (
    <span className="flex flex-col gap-[0.22em]">
      <span className={`block h-[0.12em] w-[1.15em] rounded-full ${light ? 'bg-white/70' : 'bg-current opacity-60'}`} />
      <span className={`block h-[0.12em] w-[0.8em] rounded-full ${light ? 'bg-white/70' : 'bg-current opacity-60'}`} />
    </span>
  )
}

function ConsultingMobile({ project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#e9e4da] text-[#11141a]">
      <header className="flex items-center justify-between border-b border-black/10 px-[1.3em] py-[1.05em]">
        <span className="font-heading text-[1.05em] font-bold tracking-[-0.05em]">N.</span>
        <span className="flex items-center gap-[1em]">
          <span className="font-mono text-[0.46em] uppercase tracking-[0.15em] text-black/40">Enquire</span>
          <MenuGlyph />
        </span>
      </header>

      <div className="px-[1.3em] pb-[1em] pt-[1.5em]">
        <p className="font-mono text-[0.48em] uppercase tracking-[0.2em] text-black/40">Independent thinking</p>
        <h3 className="mt-[0.55em] font-heading text-[2.55em] font-semibold leading-[0.86] tracking-[-0.07em]">
          Clarity
          <br />
          at scale.
        </h3>
        <p className="mt-[0.85em] max-w-[16em] text-[0.68em] leading-[1.5] text-black/55">
          A calm, considered digital home for teams navigating their next chapter.
        </p>
        <div className="mt-[1.1em] flex items-center gap-[0.7em]">
          <span className="rounded-full bg-[#11141a] px-[1.2em] py-[0.7em] font-mono text-[0.46em] uppercase tracking-[0.13em] text-[#e9e4da]">
            Start a conversation
          </span>
          <span className="grid h-[1.9em] w-[1.9em] place-items-center rounded-full border border-black/20 font-mono text-[0.55em]">
            ↗
          </span>
        </div>
      </div>

      <div className="relative mx-[1.3em] min-h-0 flex-1 overflow-hidden border border-black/10 bg-[#d6cec0]">
        <div className="absolute -right-[18%] -top-[20%] h-[80%] w-[92%] rounded-full border border-black/15" />
        <div className="absolute -right-[2%] top-[12%] h-[62%] w-[72%] rounded-full border border-black/10" />
        <div className="absolute left-[8%] top-[12%] font-mono text-[0.44em] uppercase tracking-[0.16em] text-black/40">
          Selected work / 2026
        </div>
        <div className="absolute bottom-[1em] left-[1em] right-[1em] border border-black/10 bg-[#f3eee5]/90 p-[0.9em] backdrop-blur-sm">
          <div className="flex items-center justify-between font-mono text-[0.44em] uppercase tracking-[0.13em] text-black/45">
            <span>Northline / Advisory</span>
            <span>01 / 04</span>
          </div>
          <div className="mt-[0.7em] flex items-end gap-[0.5em]">
            <span className="h-[3.2em] flex-1 bg-[#11141a]" />
            <span className="h-[2.1em] flex-1 bg-black/25" />
            <span className="h-[4em] flex-1" style={{ backgroundColor: project.accent }} />
          </div>
        </div>
      </div>

      <div className="mt-[0.8em] flex items-center justify-between border-t border-black/10 px-[1.3em] py-[0.75em] font-mono text-[0.42em] uppercase tracking-[0.15em] text-black/35">
        <span>Advisory</span>
        <span>Transformation</span>
        <span>Leadership</span>
      </div>
    </div>
  )
}

function ClinicMobile({ project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#edf6f1] text-[#10231c]">
      <header className="flex items-center justify-between border-b border-[#10231c]/10 px-[1.3em] py-[1em]">
        <span className="flex items-center gap-[0.5em] font-heading text-[0.9em] font-semibold tracking-[-0.03em]">
          <span className="grid h-[1.55em] w-[1.55em] place-items-center rounded-full bg-[#10231c] text-[0.52em] text-white">
            M
          </span>
          Meridian
        </span>
        <span className="rounded-full px-[1em] py-[0.55em] font-mono text-[0.43em] font-semibold uppercase tracking-[0.12em] text-[#06130e]" style={{ backgroundColor: project.accent }}>
          Book
        </span>
      </header>

      <div className="px-[1.3em] pt-[1.55em]">
        <p className="font-mono text-[0.47em] uppercase tracking-[0.18em] text-[#10231c]/45">Modern dental care</p>
        <h3 className="mt-[0.55em] font-heading text-[2.35em] font-semibold leading-[0.9] tracking-[-0.065em]">
          Care that
          <br />
          feels human.
        </h3>
        <p className="mt-[0.8em] max-w-[16em] text-[0.66em] leading-[1.5] text-[#10231c]/55">
          Thoughtful dentistry in a space designed to put you at ease.
        </p>
      </div>

      <div className="mx-[1.3em] mt-[1.15em] rounded-[1.1em] bg-white p-[1em] shadow-[0_1.2em_3em_rgba(16,35,28,0.08)]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.46em] uppercase tracking-[0.13em] text-[#10231c]/40">Next available</span>
          <span className="font-mono text-[0.42em] uppercase tracking-[0.1em]" style={{ color: project.accent }}>
            March
          </span>
        </div>
        <div className="mt-[0.7em] grid grid-cols-4 gap-[0.35em]">
          {['Mon', 'Tue', 'Wed', 'Thu'].map((day, index) => (
            <span
              key={day}
              className={`rounded-[0.4em] py-[0.55em] text-center font-mono text-[0.42em] uppercase tracking-[0.08em] ${
                index === 1 ? 'text-[#06130e]' : 'border border-[#10231c]/10 text-[#10231c]/42'
              }`}
              style={index === 1 ? { backgroundColor: project.accent } : undefined}
            >
              {day}
            </span>
          ))}
        </div>
        <div className="mt-[0.5em] flex gap-[0.35em]">
          {['09:30', '11:00', '14:30'].map((time, index) => (
            <span
              key={time}
              className={`flex-1 rounded-[0.4em] py-[0.48em] text-center font-mono text-[0.42em] ${
                index === 2 ? 'bg-[#10231c] text-white' : 'border border-[#10231c]/10 text-[#10231c]/50'
              }`}
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-[0.9em] flex flex-1 flex-col px-[1.3em]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.45em] uppercase tracking-[0.15em] text-[#10231c]/40">Care menu</span>
          <span className="font-mono text-[0.42em] uppercase tracking-[0.1em] text-[#10231c]/35">All treatments</span>
        </div>
        <div className="mt-[0.65em] divide-y divide-[#10231c]/10 border-y border-[#10231c]/10">
          {['Preventive care', 'Restorative', 'Cosmetic dentistry'].map((item, index) => (
            <div key={item} className="flex items-center justify-between py-[0.65em]">
              <span className="flex items-center gap-[0.65em]">
                <span className="font-mono text-[0.43em] text-[#10231c]/30">0{index + 1}</span>
                <span className="font-heading text-[0.75em] font-semibold tracking-[-0.02em]">{item}</span>
              </span>
              <span className="text-[0.7em]" style={{ color: project.accent }}>
                +
              </span>
            </div>
          ))}
        </div>

        <div className="mb-[0.8em] mt-[0.8em] flex flex-1 flex-col justify-between rounded-[1em] bg-[#10231c] p-[1em] text-[#edf6f1]">
          <div className="flex items-center justify-between font-mono text-[0.42em] uppercase tracking-[0.12em] text-[#edf6f1]/45">
            <span>First visit</span>
            <span>15 min intro</span>
          </div>
          <div className="mt-[0.5em]">
            <p className="font-heading text-[1.05em] font-semibold leading-[1.02] tracking-[-0.035em]">A calmer first appointment.</p>
            <p className="mt-[0.35em] max-w-[17em] text-[0.55em] leading-[1.4] text-[#edf6f1]/55">
              Meet your dentist, ask questions and leave with a clear plan.
            </p>
          </div>
          <div className="mt-[0.65em] flex items-center justify-between border-t border-white/10 pt-[0.65em] font-mono text-[0.38em] uppercase tracking-[0.1em] text-[#edf6f1]/38">
            <span>Meet</span>
            <span>Scan</span>
            <span>Plan</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#10231c]/10 px-[1.3em] py-[0.75em] font-mono text-[0.42em] uppercase tracking-[0.12em] text-[#10231c]/35">
        <span>Westlands, Nairobi</span>
        <span>Mon—Sat</span>
      </div>
    </div>
  )
}

function StoreMobile({ project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#f3eadc] text-[#2a2119]">
      <header className="flex items-center justify-between border-b border-[#2a2119]/10 px-[1.3em] py-[1.05em]">
        <span className="font-heading text-[0.92em] font-semibold uppercase tracking-[0.17em]">Aurora</span>
        <span className="flex items-center gap-[0.8em]">
          <span className="font-mono text-[0.44em] uppercase tracking-[0.12em] text-[#2a2119]/45">Bag / 02</span>
          <MenuGlyph />
        </span>
      </header>

      <div className="px-[1.3em] pt-[1.4em]">
        <p className="font-mono text-[0.46em] uppercase tracking-[0.18em] text-[#2a2119]/42">The daily ritual</p>
        <h3 className="mt-[0.5em] font-heading text-[2.45em] font-medium leading-[0.88] tracking-[-0.06em]">
          Botanical
          <br />
          skincare.
        </h3>
      </div>

      <div className="relative mx-[1.3em] mt-[1em] min-h-0 flex-1 overflow-hidden bg-[#e3d4bf]">
        <div
          className="absolute inset-x-0 bottom-0 h-[85%]"
          style={{ background: `radial-gradient(ellipse at 50% 100%, ${project.accent} 0%, transparent 68%)` }}
        />
        <div className="absolute left-1/2 top-1/2 h-[58%] w-[30%] -translate-x-1/2 -translate-y-[54%] rounded-[45%_45%_12%_12%] border border-[#2a2119]/12 bg-[#fbf7ef] shadow-[0_1.6em_3em_rgba(42,33,25,0.17)]">
          <div className="mx-auto mt-[18%] h-[18%] w-[38%] bg-[#2a2119]/65" />
          <div className="mx-auto mt-[10%] h-[26%] w-[58%] border-y border-[#2a2119]/10" />
          <div className="mx-auto mt-[8%] h-[0.16em] w-[35%] bg-[#2a2119]/20" />
        </div>
        <div className="absolute bottom-[0.9em] left-[0.9em] right-[0.9em] flex items-end justify-between">
          <span className="font-mono text-[0.44em] uppercase leading-[1.6] tracking-[0.12em] text-[#2a2119]/48">
            Renewal serum
            <br />
            <span className="text-[#2a2119]">Ksh 4,800</span>
          </span>
          <span className="grid h-[2em] w-[2em] place-items-center rounded-full text-[0.9em]" style={{ backgroundColor: project.accent }}>
            +
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[0.45em] px-[1.3em] py-[0.9em]">
        {['Cleanse', 'Treat', 'Protect'].map((item) => (
          <div key={item} className="border border-[#2a2119]/10 bg-[#fbf7ef]/60 p-[0.55em]">
            <span className="mb-[0.45em] block h-[2.2em] bg-[#2a2119]/10" />
            <span className="font-mono text-[0.4em] uppercase tracking-[0.1em] text-[#2a2119]/55">{item}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[#2a2119]/10 px-[1.3em] py-[0.75em] font-mono text-[0.42em] uppercase tracking-[0.12em] text-[#2a2119]/35">
        <span>Small-batch / Nairobi</span>
        <span>01 / 05</span>
      </div>
    </div>
  )
}

function MarketplaceMobile({ project }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#0b0d12] text-[#f6f1e8]">
      <div className="pointer-events-none absolute -right-[20%] top-[14%] h-[52%] w-[86%] rounded-full opacity-25 blur-3xl" style={{ backgroundColor: project.accent }} />
      <header className="relative flex items-center justify-between border-b border-white/10 px-[1.3em] py-[1em]">
        <span className="font-heading text-[0.92em] font-bold uppercase tracking-[-0.03em]">
          Kicks <span style={{ color: project.accent }}>&</span> Co.
        </span>
        <span className="flex items-center gap-[0.8em] font-mono text-[0.44em] uppercase tracking-[0.11em] text-white/50">
          <span>Bag / 2</span>
          <MenuGlyph light />
        </span>
      </header>

      <div className="relative px-[1.3em] pt-[1.4em]">
        <p className="font-mono text-[0.47em] uppercase tracking-[0.18em]" style={{ color: project.accent }}>
          Drop 04 / Live now
        </p>
        <h3 className="mt-[0.5em] font-heading text-[2.7em] font-extrabold uppercase leading-[0.78] tracking-[-0.08em]">
          Built
          <br />
          to move.
        </h3>
        <div className="mt-[0.8em] flex items-center justify-between">
          <p className="max-w-[14em] text-[0.62em] leading-[1.5] text-white/45">
            A limited run designed for the city after dark.
          </p>
          <span className="rounded-full border border-white/12 px-[0.8em] py-[0.4em] font-mono text-[0.4em] uppercase tracking-[0.1em] text-white/45">
            42 pairs
          </span>
        </div>
      </div>

      <div className="relative mx-[1.3em] mt-[0.7em] min-h-0 flex-1">
        <svg viewBox="0 0 220 130" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`mobile-shoe-${project.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={project.accent} />
              <stop offset="100%" stopColor="#ffb89f" />
            </linearGradient>
          </defs>
          <circle cx="112" cy="66" r="50" fill="none" stroke="rgba(255,255,255,.08)" />
          <circle cx="112" cy="66" r="65" fill="none" stroke="rgba(255,255,255,.045)" />
          <path
            d="M32 92c15-2 27-10 37-25 7-10 16-15 27-12 7 2 12 7 19 11 13 7 33 8 50 14 13 5 19 13 16 20-3 8-16 11-32 10-29-2-54 2-79 0-18-2-28-6-36-12-3-2-3-6 0-8Z"
            fill={`url(#mobile-shoe-${project.id})`}
            stroke="rgba(255,255,255,.24)"
            strokeWidth="1"
          />
          <path d="M68 76c9 5 17 10 30 13 14 3 30 3 44 7" fill="none" stroke="rgba(11,13,18,.4)" strokeWidth="2" />
          <path d="M46 93c22 4 56 2 90 5" fill="none" stroke="rgba(11,13,18,.45)" strokeWidth="3" />
        </svg>
        <div className="absolute bottom-[0.2em] left-0 right-0">
          <p className="font-mono text-[0.44em] uppercase tracking-[0.13em] text-white/35">Runner / Ember</p>
          <div className="mt-[0.55em] flex gap-[0.4em]">
            {['39', '40', '41', '42', '43'].map((size, index) => (
              <span
                key={size}
                className={`grid h-[2em] flex-1 place-items-center rounded-[0.25em] border font-mono text-[0.44em] ${
                  index === 2 ? 'border-transparent text-[#0b0d12]' : 'border-white/12 text-white/45'
                }`}
                style={index === 2 ? { backgroundColor: project.accent } : undefined}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-[0.8em] flex items-center justify-between border-t border-white/10 px-[1.3em] py-[0.9em]">
        <span>
          <span className="block font-mono text-[0.43em] uppercase tracking-[0.12em] text-white/35">Ksh 12,500</span>
          <span className="mt-[0.2em] block font-heading text-[0.8em] font-semibold">Ember Runner</span>
        </span>
        <span className="rounded-full px-[1.4em] py-[0.75em] font-mono text-[0.46em] font-bold uppercase tracking-[0.1em] text-[#0b0d12]" style={{ backgroundColor: project.accent }}>
          Add to bag
        </span>
      </div>
    </div>
  )
}

function PortfolioMobile({ project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#d8d1c5] text-[#181713]">
      <header className="flex items-center justify-between border-b border-[#181713]/15 px-[1.3em] py-[1.05em]">
        <span className="font-heading text-[0.9em] font-semibold uppercase tracking-[0.2em]">Halcyon</span>
        <MenuGlyph />
      </header>

      <div className="px-[1.3em] pt-[1.5em]">
        <p className="font-mono text-[0.45em] uppercase tracking-[0.18em] text-[#181713]/42">Selected work / 2019—2026</p>
        <h3 className="mt-[0.6em] font-heading text-[2.55em] font-medium leading-[0.84] tracking-[-0.075em]">
          House
          <br />
          of light.
        </h3>
        <div className="mt-[0.75em] flex items-center gap-[0.65em] font-mono text-[0.42em] uppercase tracking-[0.12em] text-[#181713]/42">
          <span>Private residence</span>
          <span className="h-px w-[2.4em] bg-[#181713]/25" />
          <span>Concept</span>
        </div>
      </div>

      <div className="relative mx-[1.3em] mt-[1em] min-h-0 flex-1 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[58%] bg-[#efeae2] shadow-[0_1.5em_3em_rgba(24,23,19,.12)]">
          <div className="absolute left-[12%] top-[12%] h-[54%] w-[32%] bg-[#9e9688]" />
          <div className="absolute bottom-[12%] right-[12%] h-[38%] w-[40%] border border-[#181713]/10" />
          <div className="absolute bottom-[12%] left-[12%] h-[0.18em] w-[42%] bg-[#181713]/20" />
        </div>
        <div className="absolute right-0 top-[42%] h-[34%] w-[38%] bg-[#7f786c]">
          <div className="absolute inset-x-[12%] bottom-[12%] h-[0.2em] bg-[#d8d1c5]/40" />
        </div>
        <div className="absolute bottom-0 left-[12%] h-[18%] w-[26%]" style={{ background: `linear-gradient(135deg, ${project.accent}, transparent)` }} />
        <div className="absolute bottom-[0.8em] right-[0.6em] text-right">
          <p className="font-mono text-[0.42em] uppercase tracking-[0.13em] text-[#181713]/42">01 / 06</p>
          <p className="mt-[0.25em] font-mono text-[0.4em] uppercase tracking-[0.1em] text-[#181713]/30">Scroll to explore</p>
        </div>
      </div>

      <div className="mt-[0.8em] divide-y divide-[#181713]/12 border-t border-[#181713]/15 px-[1.3em]">
        {['Casa Lumen', 'The Long Room'].map((item, index) => (
          <div key={item} className="flex items-center justify-between py-[0.65em]">
            <span className="font-heading text-[0.74em] font-medium tracking-[-0.02em]">{item}</span>
            <span className="font-mono text-[0.4em] uppercase tracking-[0.12em] text-[#181713]/35">0{index + 2} / Residence</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LaunchMobile({ project }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#07110f] text-[#e8f6f0]">
      <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: `radial-gradient(ellipse at 50% 108%, ${project.accent}55, transparent 64%)` }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '1.8em 1.8em',
        }}
      />
      <header className="relative flex items-center justify-between px-[1.3em] py-[1.05em]">
        <span className="flex items-center gap-[0.5em] font-heading text-[0.9em] font-semibold tracking-[-0.03em]">
          <span className="grid h-[1.4em] w-[1.4em] place-items-center rounded-full" style={{ backgroundColor: project.accent }}>
            <span className="h-[0.42em] w-[0.42em] rounded-full bg-[#07110f]" />
          </span>
          Signal
        </span>
        <MenuGlyph light />
      </header>

      <div className="relative px-[1.3em] pt-[1.3em]">
        <p className="font-mono text-[0.46em] uppercase tracking-[0.18em]" style={{ color: project.accent }}>
          The clearer way to move money
        </p>
        <h3 className="mt-[0.55em] font-heading text-[2.65em] font-semibold leading-[0.84] tracking-[-0.07em]">
          Money,
          <br />
          in focus.
        </h3>
        <p className="mt-[0.8em] max-w-[15em] text-[0.64em] leading-[1.5] text-white/48">
          One calm view of every account, payment and decision that matters.
        </p>
      </div>

      <div className="relative mx-[1.3em] mt-[1em] rounded-[1em] border border-white/12 bg-[#0d1a17]/90 p-[0.9em] shadow-[0_1.5em_3em_rgba(0,0,0,.3)]">
        <div className="flex items-center justify-between border-b border-white/8 pb-[0.6em]">
          <span className="font-mono text-[0.42em] uppercase tracking-[0.12em] text-white/35">Total balance</span>
          <span className="h-[0.8em] w-[0.8em] rounded-full border border-white/15" />
        </div>
        <p className="mt-[0.55em] font-heading text-[1.45em] font-semibold tracking-[-0.045em]">Ksh 482,600</p>
        <div className="mt-[0.25em] flex items-center gap-[0.4em] font-mono text-[0.4em] uppercase tracking-[0.1em]" style={{ color: project.accent }}>
          <span>+ 8.4%</span>
          <span className="text-white/25">this month</span>
        </div>
        <div className="mt-[0.8em] flex h-[4em] items-end gap-[0.28em]">
          {[35, 52, 44, 68, 57, 76, 88, 72, 94, 82].map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-t-[0.1em]"
              style={{ height: `${height}%`, backgroundColor: index > 5 ? project.accent : 'rgba(255,255,255,.12)' }}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-[0.8em] flex flex-1 flex-col justify-end px-[1.3em] pb-[0.9em]">
        <div className="grid grid-cols-2 gap-[0.45em]">
          <span className="rounded-[0.45em] border border-white/10 p-[0.65em] font-mono text-[0.42em] uppercase tracking-[0.1em] text-white/45">
            Send
          </span>
          <span className="rounded-[0.45em] border border-white/10 p-[0.65em] font-mono text-[0.42em] uppercase tracking-[0.1em] text-white/45">
            Request
          </span>
        </div>
        <span className="mt-[0.6em] block rounded-full py-[0.75em] text-center font-mono text-[0.46em] font-semibold uppercase tracking-[0.12em] text-[#07110f]" style={{ backgroundColor: project.accent }}>
          Join the waitlist
        </span>
        <div className="mt-[0.7em] flex items-center justify-between border-t border-white/8 pt-[0.65em] font-mono text-[0.4em] uppercase tracking-[0.12em] text-white/28">
          <span>Built for operators</span>
          <span>Private beta / 2026</span>
        </div>
      </div>
    </div>
  )
}

const layouts = {
  consulting: ConsultingMobile,
  clinic: ClinicMobile,
  store: StoreMobile,
  marketplace: MarketplaceMobile,
  portfolio: PortfolioMobile,
  launch: LaunchMobile,
}

export default function MobileWebMockup({ project }) {
  const Layout = layouts[project.layout] || ConsultingMobile
  return (
    <div className="h-full w-full" style={{ containerType: 'inline-size' }}>
      <div className="flex h-full w-full flex-col overflow-hidden bg-[#f6f3ed]" style={{ fontSize: '4.2cqw' }}>
        <StatusBar />
        <BrowserBar project={project} />
        <div className="min-h-0 flex-1">
          <Layout project={project} />
        </div>
      </div>
    </div>
  )
}
