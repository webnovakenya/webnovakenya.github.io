const fallbackAccent = '#4A6CF7'

function BrowserBar({ project, compact }) {
  return (
    <div
      className={`flex items-center gap-1.5 border-b border-white/10 bg-[#0b101b] ${
        compact ? 'px-2 py-1.5' : 'px-2.5 py-2'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
      <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 border border-white/10 bg-white/[0.035] px-2 py-0.5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: project.accent }} />
        <span className="truncate font-mono text-[7px] uppercase tracking-[0.14em] text-white/35">
          concept / {project.id}
        </span>
      </div>
      <span className="hidden font-mono text-[7px] uppercase tracking-[0.14em] text-white/22 sm:block">
        Preview
      </span>
    </div>
  )
}

function TinyLine({ className = '' }) {
  return <span className={`block h-[3px] ${className}`} />
}

function ConsultingMockup({ project }) {
  return (
    <div className="flex h-full bg-[#e9e4da] text-[#11141a]">
      <aside className="hidden w-[17%] shrink-0 border-r border-black/10 p-2.5 sm:flex sm:flex-col">
        <span className="font-heading text-[9px] font-bold tracking-[-0.04em]">N.</span>
        <div className="mt-8 space-y-2.5 font-mono text-[5px] uppercase tracking-[0.16em] text-black/45">
          <span className="block text-black">Practice</span>
          <span className="block">Work</span>
          <span className="block">Perspective</span>
          <span className="block">Contact</span>
        </div>
        <div className="mt-auto border-t border-black/10 pt-2 font-mono text-[4.5px] uppercase tracking-[0.16em] text-black/40">
          Independent advisory
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-black/10 px-3 py-2">
          <span className="font-heading text-[8px] font-semibold tracking-[-0.03em] sm:text-[10px]">
            {project.title}
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[5px] uppercase tracking-[0.14em] text-black/45 md:block">
              Strategy / Advisory
            </span>
            <span className="rounded-full bg-[#11141a] px-2 py-1 font-mono text-[4.5px] uppercase tracking-[0.13em] text-[#e9e4da]">
              Enquire
            </span>
          </div>
        </header>
        <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_.85fr] gap-3 p-3 sm:p-4">
          <div className="flex min-w-0 flex-col justify-center">
            <span className="font-mono text-[5px] uppercase tracking-[0.2em] text-black/40">
              Independent thinking
            </span>
            <p className="mt-1.5 font-heading text-[clamp(1.05rem,2.6vw,2.8rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
              Clarity
              <br />
              at scale.
            </p>
            <p className="mt-2 max-w-[16rem] text-[5.5px] leading-relaxed text-black/55 sm:text-[7px]">
              A calm, considered digital home for teams navigating their next chapter.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-[#11141a] px-2.5 py-1 font-mono text-[4.5px] uppercase tracking-[0.13em] text-[#e9e4da]">
                Start a conversation
              </span>
              <span className="h-4 w-4 rounded-full border border-black/20" />
            </div>
          </div>
          <div className="relative hidden overflow-hidden bg-[#d6cec0] sm:block">
            <div className="absolute -right-[18%] -top-[22%] h-[78%] w-[92%] rounded-full border border-black/15" />
            <div className="absolute -right-[4%] top-[8%] h-[62%] w-[70%] rounded-full border border-black/10" />
            <div className="absolute bottom-2 left-2 right-2 border border-black/10 bg-[#f3eee5]/80 p-2 backdrop-blur-sm">
              <div className="flex items-center justify-between font-mono text-[4.5px] uppercase tracking-[0.14em] text-black/45">
                <span>Selected work</span>
                <span>2026</span>
              </div>
              <div className="mt-2 flex items-end gap-1.5">
                <span className="h-7 flex-1 bg-[#11141a]" />
                <span className="h-5 flex-1 bg-black/25" />
                <span className="h-9 flex-1" style={{ backgroundColor: project.accent }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-black/10 px-3 py-1.5 font-mono text-[4.5px] uppercase tracking-[0.16em] text-black/35">
          <span>Advisory</span>
          <span>Transformation</span>
          <span>Leadership</span>
          <span className="hidden sm:block">Worldwide</span>
        </div>
      </div>
    </div>
  )
}

function ClinicMockup({ project }) {
  return (
    <div className="flex h-full flex-col bg-[#edf6f1] text-[#10231c]">
      <header className="flex items-center justify-between border-b border-[#10231c]/10 px-3 py-2">
        <span className="flex items-center gap-1.5 font-heading text-[8px] font-semibold tracking-[-0.03em] sm:text-[10px]">
          <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#10231c] text-[4px] text-white">
            M
          </span>
          Meridian
        </span>
        <div className="flex items-center gap-2.5 font-mono text-[5px] uppercase tracking-[0.13em] text-[#10231c]/55">
          <span className="hidden sm:block">Treatments</span>
          <span className="hidden sm:block">Team</span>
          <span className="rounded-full px-2 py-1 font-semibold text-[#06130e]" style={{ backgroundColor: project.accent }}>
            Book a visit
          </span>
        </div>
      </header>
      <div className="grid min-h-0 flex-1 grid-cols-[1.1fr_.9fr] gap-3 p-3 sm:p-4">
        <div className="flex flex-col justify-center">
          <span className="font-mono text-[5px] uppercase tracking-[0.18em] text-[#10231c]/45">
            Modern dental care
          </span>
          <p className="mt-1.5 font-heading text-[clamp(1rem,2.4vw,2.6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
            Care that
            <br />
            feels human.
          </p>
          <p className="mt-2 max-w-[15rem] text-[5.5px] leading-relaxed text-[#10231c]/55 sm:text-[7px]">
            Thoughtful dentistry in a space designed to put you at ease.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full bg-[#10231c] px-2.5 py-1 font-mono text-[4.5px] uppercase tracking-[0.13em] text-white">
              Find an appointment
            </span>
            <span className="font-mono text-[4.5px] uppercase tracking-[0.13em] text-[#10231c]/45">
              Meet the team
            </span>
          </div>
        </div>
        <div className="relative hidden overflow-hidden rounded-[2px] bg-[#d7ebe1] sm:block">
          <div
            className="absolute inset-x-3 top-3 h-[42%] rounded-full opacity-80 blur-[2px]"
            style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.accent} 0%, transparent 68%)` }}
          />
          <div className="absolute bottom-2 left-2 right-2 bg-[#fbfffc] p-2 shadow-[0_10px_30px_rgba(16,35,28,0.08)]">
            <div className="flex items-center justify-between font-mono text-[4.5px] uppercase tracking-[0.13em] text-[#10231c]/45">
              <span>Next available</span>
              <span>Book</span>
            </div>
            <div className="mt-1.5 grid grid-cols-4 gap-1">
              {['Mon', 'Tue', 'Wed', 'Thu'].map((day, index) => (
                <span
                  key={day}
                  className={`border px-1 py-1 text-center font-mono text-[4px] uppercase tracking-[0.08em] ${
                    index === 1 ? 'border-transparent text-[#06130e]' : 'border-[#10231c]/10 text-[#10231c]/45'
                  }`}
                  style={index === 1 ? { backgroundColor: project.accent } : undefined}
                >
                  {day}
                </span>
              ))}
            </div>
            <div className="mt-1.5 flex gap-1">
              <span className="rounded-sm border border-[#10231c]/10 px-1.5 py-0.5 font-mono text-[4px] text-[#10231c]/50">
                09:30
              </span>
              <span className="rounded-sm border border-[#10231c]/10 px-1.5 py-0.5 font-mono text-[4px] text-[#10231c]/50">
                11:00
              </span>
              <span className="rounded-sm bg-[#10231c] px-1.5 py-0.5 font-mono text-[4px] text-white">14:30</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-[#10231c]/10">
        {['Preventive', 'Restorative', 'Cosmetic'].map((item) => (
          <span
            key={item}
            className="border-r border-[#10231c]/10 px-2 py-1.5 font-mono text-[4.5px] uppercase tracking-[0.13em] text-[#10231c]/45 last:border-r-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function StoreMockup({ project }) {
  return (
    <div className="flex h-full flex-col bg-[#f3eadc] text-[#2a2119]">
      <header className="flex items-center justify-between border-b border-[#2a2119]/10 px-3 py-2">
        <span className="font-heading text-[8px] font-semibold uppercase tracking-[0.16em] sm:text-[10px]">Aurora</span>
        <div className="flex items-center gap-2.5 font-mono text-[5px] uppercase tracking-[0.14em] text-[#2a2119]/50">
          <span className="hidden sm:block">Shop</span>
          <span className="hidden sm:block">Rituals</span>
          <span className="hidden sm:block">Journal</span>
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#2a2119]/20">
            <span className="h-1 w-1 rounded-full bg-[#2a2119]/50" />
          </span>
        </div>
      </header>
      <div className="grid min-h-0 flex-1 grid-cols-[.9fr_1.1fr] gap-2 p-2 sm:gap-3 sm:p-3">
        <div className="flex flex-col justify-between">
          <div>
            <span className="font-mono text-[5px] uppercase tracking-[0.18em] text-[#2a2119]/45">The daily ritual</span>
            <p className="mt-1.5 font-heading text-[clamp(1rem,2.4vw,2.4rem)] font-medium leading-[0.92] tracking-[-0.055em]">
              Botanical
              <br />
              skincare,
              <br />
              distilled.
            </p>
            <p className="mt-2 max-w-[12rem] text-[5.5px] leading-relaxed text-[#2a2119]/55 sm:text-[7px]">
              Considered formulas for skin that wants less, but better.
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="border border-[#2a2119]/20 px-2 py-1 font-mono text-[4.5px] uppercase tracking-[0.13em]">
              Shop the collection
            </span>
            <span className="font-mono text-[4.5px] uppercase tracking-[0.13em] text-[#2a2119]/40">01 / 05</span>
          </div>
        </div>
        <div className="relative min-h-0 overflow-hidden bg-[#e3d4bf]">
          <div
            className="absolute inset-x-0 bottom-0 h-[78%]"
            style={{ background: `radial-gradient(ellipse at 50% 100%, ${project.accent} 0%, transparent 66%)` }}
          />
          <div className="absolute left-1/2 top-1/2 h-[48%] w-[22%] -translate-x-1/2 -translate-y-[54%] rounded-[45%_45%_12%_12%] border border-[#2a2119]/15 bg-[#fbf7ef] shadow-[0_16px_30px_rgba(42,33,25,0.16)]">
            <div className="mx-auto mt-[18%] h-[18%] w-[38%] bg-[#2a2119]/65" />
            <div className="mx-auto mt-[10%] h-[26%] w-[58%] border-y border-[#2a2119]/10" />
            <div className="mx-auto mt-[8%] h-[2px] w-[35%] bg-[#2a2119]/20" />
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
            <span className="font-mono text-[4.5px] uppercase leading-relaxed tracking-[0.13em] text-[#2a2119]/50">
              Renewal serum
              <br />
              <span className="text-[#2a2119]">Ksh 4,800</span>
            </span>
            <span
              className="grid h-5 w-5 place-items-center rounded-full text-[7px] text-[#2a2119]"
              style={{ backgroundColor: project.accent }}
            >
              +
            </span>
          </div>
        </div>
      </div>
      <div className="hidden grid-cols-3 gap-1.5 px-2 pb-2 sm:grid">
        {['Cleanse', 'Treat', 'Protect'].map((item, index) => (
          <div key={item} className="border border-[#2a2119]/10 bg-[#fbf7ef]/60 p-1.5">
            <span className={`mb-1 block h-5 ${index === 1 ? 'bg-[#2a2119]/15' : 'bg-[#2a2119]/8'}`} />
            <span className="font-mono text-[4px] uppercase tracking-[0.12em] text-[#2a2119]/55">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MarketplaceMockup({ project }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#0b0d12] text-[#f6f1e8]">
      <div className="pointer-events-none absolute -right-[10%] top-[8%] h-[70%] w-[58%] rounded-full opacity-20 blur-2xl" style={{ backgroundColor: project.accent }} />
      <header className="relative flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-heading text-[8px] font-bold uppercase tracking-[-0.02em] sm:text-[10px]">
          Kicks <span style={{ color: project.accent }}>&</span> Co.
        </span>
        <div className="flex items-center gap-2.5 font-mono text-[5px] uppercase tracking-[0.13em] text-white/45">
          <span className="hidden sm:block">New drops</span>
          <span className="hidden sm:block">Shop</span>
          <span className="border border-white/15 px-1.5 py-1 text-white/75">Bag (2)</span>
        </div>
      </header>
      <div className="relative grid min-h-0 flex-1 grid-cols-[1.1fr_.9fr] gap-2 px-3 py-2">
        <div className="flex flex-col justify-center">
          <span className="font-mono text-[5px] uppercase tracking-[0.2em]" style={{ color: project.accent }}>
            Drop 04 / Live now
          </span>
          <p className="mt-1 font-heading text-[clamp(1.2rem,3.2vw,3.4rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.075em]">
            Built
            <br />
            to move.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="bg-[#f6f1e8] px-2.5 py-1 font-mono text-[4.5px] font-bold uppercase tracking-[0.12em] text-[#0b0d12]">
              Shop the drop
            </span>
            <span className="font-mono text-[4.5px] uppercase tracking-[0.12em] text-white/40">Limited run</span>
          </div>
        </div>
        <div className="relative min-h-0 overflow-hidden">
          <svg viewBox="0 0 220 130" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id={`shoe-${project.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={project.accent} />
                <stop offset="100%" stopColor="#ffb89f" />
              </linearGradient>
            </defs>
            <path
              d="M34 91c15-2 25-9 35-23 7-10 16-15 27-12 7 2 12 7 19 11 13 7 33 8 50 14 13 5 19 13 16 20-3 8-16 11-32 10-29-2-54 2-79 0-18-2-28-6-36-12-3-2-3-6 0-8Z"
              fill={`url(#shoe-${project.id})`}
              stroke="rgba(255,255,255,.25)"
              strokeWidth="1"
            />
            <path d="M67 76c9 5 17 10 30 13 14 3 30 3 44 7" fill="none" stroke="rgba(11,13,18,.4)" strokeWidth="2" />
            <path d="M45 93c22 4 56 2 90 5" fill="none" stroke="rgba(11,13,18,.45)" strokeWidth="3" />
            <circle cx="152" cy="65" r="24" fill="none" stroke="rgba(255,255,255,.12)" />
            <circle cx="152" cy="65" r="36" fill="none" stroke="rgba(255,255,255,.07)" />
          </svg>
        </div>
      </div>
      <div className="relative grid grid-cols-3 gap-1.5 border-t border-white/10 px-2 py-1.5">
        {['Runner / 01', 'Runner / 02', 'Runner / 03'].map((item) => (
          <div key={item} className="flex items-center gap-1.5 border border-white/8 bg-white/[0.025] p-1">
            <span className="h-4 w-5 bg-white/10" />
            <span className="font-mono text-[4px] uppercase tracking-[0.1em] text-white/40">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DashboardMockup({ project }) {
  return (
    <div className="flex h-full bg-[#080d18] text-[#e8edf7]">
      <aside className="hidden w-[18%] shrink-0 border-r border-white/8 bg-[#0b111e] p-2 sm:flex sm:flex-col">
        <div className="flex items-center gap-1.5">
          <span className="grid h-3.5 w-3.5 place-items-center rounded-[2px] text-[4px] font-bold text-[#07101e]" style={{ backgroundColor: project.accent }}>
            F
          </span>
          <span className="font-heading text-[6px] font-semibold tracking-[-0.02em]">Forge Ops</span>
        </div>
        <div className="mt-5 space-y-2 font-mono text-[4.5px] uppercase tracking-[0.1em] text-white/32">
          <span className="flex items-center gap-1.5 text-white/85">
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: project.accent }} />
            Overview
          </span>
          <span className="block">Orders</span>
          <span className="block">Inventory</span>
          <span className="block">Partners</span>
          <span className="block">Reports</span>
        </div>
        <div className="mt-auto border-t border-white/8 pt-2">
          <span className="font-mono text-[4px] uppercase leading-relaxed tracking-[0.1em] text-white/28">
            Systems healthy
            <br />
            <span className="text-emerald-400/70">All services live</span>
          </span>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/8 px-3 py-2">
          <div>
            <p className="font-mono text-[4.5px] uppercase tracking-[0.14em] text-white/35">Operations / 2026</p>
            <p className="mt-0.5 font-heading text-[9px] font-semibold tracking-[-0.03em] sm:text-[11px]">Command centre</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="border border-white/10 px-1.5 py-0.5 font-mono text-[4px] uppercase tracking-[0.1em] text-white/40">
              Live
            </span>
            <span className="h-4 w-4 rounded-full border border-white/15 bg-white/5" />
          </div>
        </header>
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5 p-2 sm:gap-2 sm:p-3">
          {[
            { label: 'Open orders', value: '128' },
            { label: 'In transit', value: '34' },
            { label: 'Exceptions', value: '03' },
          ].map((item) => (
            <div key={item.label} className="border border-white/8 bg-white/[0.025] p-1.5 sm:p-2">
              <p className="font-mono text-[4px] uppercase tracking-[0.1em] text-white/32">{item.label}</p>
              <p className="mt-1 font-heading text-[clamp(.7rem,1.5vw,1.45rem)] font-semibold leading-none">{item.value}</p>
              <div className="mt-1.5 h-[2px] w-full bg-white/8">
                <div className="h-full w-2/3" style={{ backgroundColor: project.accent }} />
              </div>
            </div>
          ))}
          <div className="col-span-2 row-span-1 border border-white/8 bg-white/[0.02] p-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[4px] uppercase tracking-[0.12em] text-white/32">Throughput</span>
              <span className="font-mono text-[4px] uppercase tracking-[0.12em] text-white/22">7 days</span>
            </div>
            <svg viewBox="0 0 200 60" className="mt-1 h-[70%] w-full" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id={`fill-${project.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={project.accent} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={project.accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 48 C18 48 26 36 42 38 S70 46 88 32 S118 24 136 30 S166 12 200 16 L200 60 L0 60Z" fill={`url(#fill-${project.id})`} />
              <path d="M0 48 C18 48 26 36 42 38 S70 46 88 32 S118 24 136 30 S166 12 200 16" fill="none" stroke={project.accent} strokeWidth="1.5" />
            </svg>
          </div>
          <div className="border border-white/8 bg-white/[0.025] p-2">
            <p className="font-mono text-[4px] uppercase tracking-[0.12em] text-white/32">Recent activity</p>
            <div className="mt-2 space-y-1.5">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <TinyLine className="w-full bg-white/12" />
                  <span className="h-1 w-3 bg-white/8" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3 hidden border border-white/8 bg-white/[0.02] p-2 sm:block">
            <div className="flex items-center justify-between font-mono text-[4px] uppercase tracking-[0.12em] text-white/32">
              <span>Partner network</span>
              <span>Status</span>
            </div>
            <div className="mt-1.5 grid grid-cols-4 gap-1">
              {[0, 1, 2, 3].map((item) => (
                <span key={item} className="flex items-center justify-between border border-white/8 px-1 py-1">
                  <span className="h-[2px] w-1/2 bg-white/15" />
                  <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BookingMockup({ project }) {
  return (
    <div className="flex h-full flex-col bg-[#f1edff] text-[#211b35]">
      <header className="flex items-center justify-between border-b border-[#211b35]/10 px-3 py-2">
        <span className="flex items-center gap-1.5 font-heading text-[8px] font-semibold tracking-[-0.03em] sm:text-[10px]">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: project.accent }} />
          Tempo Rooms
        </span>
        <div className="flex items-center gap-2.5 font-mono text-[5px] uppercase tracking-[0.13em] text-[#211b35]/45">
          <span className="hidden sm:block">Calendar</span>
          <span className="hidden sm:block">Clients</span>
          <span className="rounded-full bg-[#211b35] px-2 py-1 text-white">New booking</span>
        </div>
      </header>
      <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_.85fr] gap-2 p-2 sm:gap-3 sm:p-3">
        <div className="border border-[#211b35]/10 bg-white/60 p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[4.5px] uppercase tracking-[0.12em] text-[#211b35]/35">This week</p>
              <p className="mt-0.5 font-heading text-[9px] font-semibold tracking-[-0.03em] sm:text-[11px]">March 2026</p>
            </div>
            <div className="flex gap-1">
              <span className="grid h-4 w-4 place-items-center border border-[#211b35]/10 font-mono text-[5px]">&lt;</span>
              <span className="grid h-4 w-4 place-items-center border border-[#211b35]/10 font-mono text-[5px]">&gt;</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-5 gap-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
              <div key={day} className="text-center">
                <span className="font-mono text-[4px] uppercase tracking-[0.1em] text-[#211b35]/35">{day}</span>
                <div className="mt-1 space-y-1">
                  {[0, 1, 2].map((slot) => (
                    <span
                      key={slot}
                      className={`block h-3 border ${
                        index === 2 && slot === 1
                          ? 'border-transparent text-[#211b35]'
                          : 'border-[#211b35]/8 bg-white/70'
                      }`}
                      style={index === 2 && slot === 1 ? { backgroundColor: project.accent } : undefined}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="border border-[#211b35]/10 bg-white/70 p-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[4.5px] uppercase tracking-[0.12em] text-[#211b35]/35">Next up</span>
              <span className="font-mono text-[4px] uppercase tracking-[0.1em] text-[#211b35]/25">10:30</span>
            </div>
            <p className="mt-1 font-heading text-[8px] font-semibold leading-tight tracking-[-0.02em]">
              Studio session
            </p>
            <p className="mt-0.5 font-mono text-[4px] uppercase tracking-[0.1em] text-[#211b35]/35">
              Room 02 / 60 min
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-1">
            {['09:00', '10:30', '13:00', '15:30'].map((time, index) => (
              <span
                key={time}
                className={`grid place-items-center border font-mono text-[4px] tracking-[0.1em] ${
                  index === 1 ? 'border-transparent text-[#211b35]' : 'border-[#211b35]/10 text-[#211b35]/40'
                }`}
                style={index === 1 ? { backgroundColor: `${project.accent}99` } : undefined}
              >
                {time}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[#211b35]/10 px-3 py-1.5 font-mono text-[4.5px] uppercase tracking-[0.13em] text-[#211b35]/35">
        <span>Availability</span>
        <span>Payments connected</span>
        <span className="hidden sm:block">Client notes</span>
      </div>
    </div>
  )
}

function PortfolioMockup({ project }) {
  return (
    <div className="flex h-full flex-col bg-[#d8d1c5] text-[#181713]">
      <header className="flex items-center justify-between border-b border-[#181713]/15 px-3 py-2">
        <span className="font-heading text-[8px] font-semibold uppercase tracking-[0.18em] sm:text-[10px]">Halcyon</span>
        <div className="flex items-center gap-2.5 font-mono text-[5px] uppercase tracking-[0.13em] text-[#181713]/45">
          <span className="hidden sm:block">Projects</span>
          <span className="hidden sm:block">Studio</span>
          <span>Index</span>
        </div>
      </header>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-full bg-[#c8bfb0]">
          <div className="absolute left-[8%] top-[10%] h-[74%] w-[46%] bg-[#efeae2] shadow-[0_18px_40px_rgba(24,23,19,.12)]">
            <div className="absolute left-[12%] top-[12%] h-[54%] w-[30%] bg-[#9e9688]" />
            <div className="absolute bottom-[12%] right-[12%] h-[38%] w-[38%] border border-[#181713]/10" />
            <div className="absolute bottom-[12%] left-[12%] h-[2px] w-[42%] bg-[#181713]/20" />
          </div>
          <div className="absolute right-[6%] top-[19%] h-[52%] w-[30%] bg-[#7f786c]">
            <div className="absolute inset-x-[12%] bottom-[12%] h-[3px] bg-[#d8d1c5]/40" />
            <div className="absolute inset-x-[12%] top-[18%] h-[40%] border border-[#d8d1c5]/20" />
          </div>
          <div
            className="absolute right-[12%] bottom-[7%] h-[14%] w-[18%] opacity-80"
            style={{ background: `linear-gradient(135deg, ${project.accent}, transparent)` }}
          />
        </div>
        <div className="relative flex h-full flex-col justify-between p-3 sm:p-4">
          <div className="flex justify-between font-mono text-[4.5px] uppercase tracking-[0.16em] text-[#181713]/45">
            <span>Selected work / 2019—2026</span>
            <span className="hidden sm:block">Architecture / Interiors</span>
          </div>
          <div>
            <p className="font-heading text-[clamp(1.3rem,3vw,3.2rem)] font-medium leading-[0.82] tracking-[-0.07em]">
              House
              <br />
              of light.
            </p>
            <div className="mt-2 flex items-center gap-2 font-mono text-[4.5px] uppercase tracking-[0.13em] text-[#181713]/45">
              <span>Private residence</span>
              <span className="h-px w-5 bg-[#181713]/25" />
              <span>Concept</span>
            </div>
          </div>
          <div className="flex items-end justify-between border-t border-[#181713]/15 pt-1.5 font-mono text-[4.5px] uppercase tracking-[0.13em] text-[#181713]/40">
            <span>Scroll to explore</span>
            <span>01 / 06</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function LaunchMockup({ project }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#07110f] text-[#e8f6f0]">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: `radial-gradient(ellipse at 50% 110%, ${project.accent}55, transparent 62%)` }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
      <header className="relative flex items-center justify-between px-3 py-2">
        <span className="flex items-center gap-1.5 font-heading text-[8px] font-semibold tracking-[-0.02em] sm:text-[10px]">
          <span className="grid h-3 w-3 place-items-center rounded-full" style={{ backgroundColor: project.accent }}>
            <span className="h-1 w-1 rounded-full bg-[#07110f]" />
          </span>
          Signal
        </span>
        <div className="flex items-center gap-2.5 font-mono text-[4.5px] uppercase tracking-[0.13em] text-white/45">
          <span className="hidden sm:block">Product</span>
          <span className="hidden sm:block">Company</span>
          <span className="border border-white/15 px-2 py-1 text-white/70">Get early access</span>
        </div>
      </header>
      <div className="relative grid min-h-0 flex-1 grid-cols-[1fr_.95fr] items-center gap-3 px-3 pb-3 sm:px-5">
        <div>
          <span className="font-mono text-[4.5px] uppercase tracking-[0.18em]" style={{ color: project.accent }}>
            The clearer way to move money
          </span>
          <p className="mt-1.5 font-heading text-[clamp(1.2rem,3vw,3.2rem)] font-semibold leading-[0.86] tracking-[-0.065em]">
            Money,
            <br />
            in focus.
          </p>
          <p className="mt-2 max-w-[14rem] text-[5.5px] leading-relaxed text-white/48 sm:text-[7px]">
            One calm view of every account, payment and decision that matters.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full px-2.5 py-1 font-mono text-[4.5px] font-semibold uppercase tracking-[0.12em] text-[#07110f]" style={{ backgroundColor: project.accent }}>
              Join the waitlist
            </span>
            <span className="font-mono text-[4.5px] uppercase tracking-[0.12em] text-white/35">See how it works</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rounded-full opacity-30 blur-2xl" style={{ backgroundColor: project.accent }} />
          <div className="relative border border-white/12 bg-[#0d1a17]/85 p-2 shadow-[0_20px_50px_rgba(0,0,0,.3)] backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/8 pb-1.5">
              <span className="font-mono text-[4px] uppercase tracking-[0.12em] text-white/35">Total balance</span>
              <span className="h-2.5 w-2.5 rounded-full border border-white/15" />
            </div>
            <p className="mt-1.5 font-heading text-[clamp(.85rem,1.8vw,1.7rem)] font-semibold tracking-[-0.04em]">
              Ksh 482,600
            </p>
            <div className="mt-1 flex items-center gap-1 font-mono text-[4px] uppercase tracking-[0.1em]" style={{ color: project.accent }}>
              <span>+ 8.4%</span>
              <span className="text-white/25">this month</span>
            </div>
            <div className="mt-2 flex items-end gap-1">
              {[35, 52, 44, 68, 57, 76, 88, 72, 94].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t-[1px]"
                  style={{
                    height: `${height * 0.4}px`,
                    backgroundColor: index > 5 ? project.accent : 'rgba(255,255,255,.12)',
                  }}
                />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1">
              <span className="border border-white/8 p-1 font-mono text-[4px] uppercase tracking-[0.1em] text-white/40">
                Send
              </span>
              <span className="border border-white/8 p-1 font-mono text-[4px] uppercase tracking-[0.1em] text-white/40">
                Request
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-between border-t border-white/8 px-3 py-1.5 font-mono text-[4px] uppercase tracking-[0.14em] text-white/30">
        <span>Built for operators</span>
        <span>Private beta / 2026</span>
      </div>
    </div>
  )
}

const layouts = {
  consulting: ConsultingMockup,
  clinic: ClinicMockup,
  store: StoreMockup,
  marketplace: MarketplaceMockup,
  dashboard: DashboardMockup,
  booking: BookingMockup,
  portfolio: PortfolioMockup,
  launch: LaunchMockup,
}

export default function ProjectMockup({ project, className = '', compact = false }) {
  const accent = project.accent || fallbackAccent
  const projectWithAccent = { ...project, accent }

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} concept preview`}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
        decoding="async"
      />
    )
  }

  const Layout = layouts[project.layout] || ConsultingMockup

  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden bg-[#080c15] ${className}`}
      style={{ '--project-accent': accent }}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 82% 5%, ${accent}22, transparent 58%)` }}
      />
      <BrowserBar project={projectWithAccent} compact={compact} />
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Layout project={projectWithAccent} />
      </div>
    </div>
  )
}
