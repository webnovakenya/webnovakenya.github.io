function TabletChrome({ project }) {
  if (project.kind === 'app') {
    return (
      <div className="flex h-[1.55em] shrink-0 items-center justify-between bg-[#080d18] px-[1.2em] font-mono text-[0.42em] uppercase tracking-[0.12em] text-white/35">
        <span>9:41 / Tuesday</span>
        <span className="flex items-center gap-[0.45em]">
          <span>Live</span>
          <span className="h-[0.55em] w-[0.55em] rounded-full" style={{ backgroundColor: project.accent }} />
        </span>
      </div>
    )
  }

  return (
    <div className="flex h-[1.7em] shrink-0 items-center gap-[0.55em] border-b border-white/8 bg-[#0b101b] px-[0.85em] font-mono text-[0.42em] uppercase tracking-[0.12em]">
      <span className="flex gap-[0.28em]">
        <span className="h-[0.5em] w-[0.5em] rounded-full bg-white/25" />
        <span className="h-[0.5em] w-[0.5em] rounded-full bg-white/15" />
        <span className="h-[0.5em] w-[0.5em] rounded-full bg-white/10" />
      </span>
      <span className="flex min-w-0 flex-1 items-center justify-center gap-[0.4em] rounded-full border border-white/8 bg-white/[0.035] px-[0.7em] py-[0.25em] text-white/30">
        <span className="h-[0.4em] w-[0.4em] rounded-full" style={{ backgroundColor: project.accent }} />
        <span className="truncate">{project.id}.webnova.studio</span>
      </span>
      <span className="text-white/18">Tablet / 1024</span>
    </div>
  )
}

function ConsultingTablet({ project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#e9e4da] text-[#11141a]">
      <header className="flex items-center justify-between border-b border-black/10 px-[1.7em] py-[1.1em]">
        <span className="font-heading text-[1em] font-bold tracking-[-0.05em]">N.</span>
        <span className="flex items-center gap-[1.7em] font-mono text-[0.47em] uppercase tracking-[0.15em] text-black/42">
          <span className="text-black">Practice</span>
          <span>Work</span>
          <span>Perspective</span>
          <span className="rounded-full bg-[#11141a] px-[0.9em] py-[0.45em] text-[#e9e4da]">Enquire</span>
        </span>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[1.08fr_.92fr]">
        <div className="flex flex-col justify-center px-[1.8em] py-[1.4em]">
          <p className="font-mono text-[0.5em] uppercase tracking-[0.2em] text-black/40">Independent thinking</p>
          <h3 className="mt-[0.5em] font-heading text-[3.4em] font-semibold leading-[0.84] tracking-[-0.075em]">
            Clarity
            <br />
            at scale.
          </h3>
          <p className="mt-[0.85em] max-w-[21em] text-[0.7em] leading-[1.5] text-black/55">
            A calm, considered digital home for teams navigating their next chapter.
          </p>
          <div className="mt-[1.15em] flex items-center gap-[0.75em]">
            <span className="rounded-full bg-[#11141a] px-[1.1em] py-[0.65em] font-mono text-[0.46em] uppercase tracking-[0.13em] text-[#e9e4da]">
              Start a conversation
            </span>
            <span className="font-mono text-[0.44em] uppercase tracking-[0.13em] text-black/40">Our approach</span>
          </div>
        </div>

        <div className="relative overflow-hidden border-l border-black/10 bg-[#d6cec0]">
          <div className="absolute -right-[20%] -top-[20%] h-[82%] w-[94%] rounded-full border border-black/15" />
          <div className="absolute -right-[4%] top-[12%] h-[62%] w-[70%] rounded-full border border-black/10" />
          <div className="absolute bottom-[1.2em] left-[1.2em] right-[1.2em] border border-black/10 bg-[#f3eee5]/88 p-[0.9em] backdrop-blur-sm">
            <div className="flex items-center justify-between font-mono text-[0.44em] uppercase tracking-[0.14em] text-black/45">
              <span>Selected work</span>
              <span>2026</span>
            </div>
            <div className="mt-[0.75em] flex items-end gap-[0.55em]">
              <span className="h-[4.2em] flex-1 bg-[#11141a]" />
              <span className="h-[2.8em] flex-1 bg-black/25" />
              <span className="h-[5.3em] flex-1" style={{ backgroundColor: project.accent }} />
            </div>
          </div>
          <span className="absolute left-[1.2em] top-[1.2em] font-mono text-[0.43em] uppercase tracking-[0.16em] text-black/35">
            Nairobi / London
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-black/10 px-[1.7em] py-[0.7em] font-mono text-[0.42em] uppercase tracking-[0.15em] text-black/35">
        <span>Advisory</span>
        <span>Transformation</span>
        <span>Leadership</span>
        <span>Worldwide</span>
      </div>
    </div>
  )
}

function ClinicTablet({ project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#edf6f1] text-[#10231c]">
      <header className="flex items-center justify-between border-b border-[#10231c]/10 px-[1.7em] py-[1em]">
        <span className="flex items-center gap-[0.5em] font-heading text-[0.92em] font-semibold tracking-[-0.03em]">
          <span className="grid h-[1.45em] w-[1.45em] place-items-center rounded-full bg-[#10231c] text-[0.48em] text-white">
            M
          </span>
          Meridian
        </span>
        <span className="flex items-center gap-[1.4em] font-mono text-[0.45em] uppercase tracking-[0.13em] text-[#10231c]/48">
          <span>Treatments</span>
          <span>Team</span>
          <span className="rounded-full px-[0.9em] py-[0.45em] font-semibold text-[#06130e]" style={{ backgroundColor: project.accent }}>
            Book a visit
          </span>
        </span>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[1.04fr_.96fr] gap-[1.1em] p-[1.5em]">
        <div className="flex flex-col justify-center">
          <p className="font-mono text-[0.48em] uppercase tracking-[0.18em] text-[#10231c]/45">Modern dental care</p>
          <h3 className="mt-[0.5em] font-heading text-[2.9em] font-semibold leading-[0.88] tracking-[-0.065em]">
            Care that
            <br />
            feels human.
          </h3>
          <p className="mt-[0.8em] max-w-[20em] text-[0.68em] leading-[1.5] text-[#10231c]/55">
            Thoughtful dentistry in a space designed to put you at ease.
          </p>
          <div className="mt-[1.1em] flex items-center gap-[0.8em]">
            <span className="rounded-full bg-[#10231c] px-[1.1em] py-[0.6em] font-mono text-[0.44em] uppercase tracking-[0.12em] text-white">
              Find an appointment
            </span>
            <span className="font-mono text-[0.42em] uppercase tracking-[0.12em] text-[#10231c]/42">Meet the team</span>
          </div>
          <div className="mt-[1.5em] grid grid-cols-3 gap-[0.45em]">
            {['Preventive', 'Restorative', 'Cosmetic'].map((item) => (
              <div key={item} className="border-t border-[#10231c]/12 pt-[0.55em]">
                <span className="font-mono text-[0.4em] uppercase tracking-[0.1em] text-[#10231c]/38">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[0.35em] bg-[#d7ebe1] p-[1.1em]">
          <div
            className="absolute left-1/2 top-[15%] h-[38%] w-[75%] -translate-x-1/2 rounded-full opacity-80 blur-sm"
            style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.accent} 0%, transparent 68%)` }}
          />
          <div className="absolute left-[1.1em] right-[1.1em] top-[1.1em] flex items-center justify-between font-mono text-[0.42em] uppercase tracking-[0.13em] text-[#10231c]/42">
            <span>Next available</span>
            <span>March 2026</span>
          </div>
          <div className="absolute bottom-[1.1em] left-[1.1em] right-[1.1em] bg-[#fbfffc] p-[1em] shadow-[0_1.2em_3em_rgba(16,35,28,0.1)]">
            <div className="grid grid-cols-4 gap-[0.4em]">
              {['Mon', 'Tue', 'Wed', 'Thu'].map((day, index) => (
                <span
                  key={day}
                  className={`rounded-[0.3em] py-[0.55em] text-center font-mono text-[0.42em] uppercase tracking-[0.08em] ${
                    index === 1 ? 'text-[#06130e]' : 'border border-[#10231c]/10 text-[#10231c]/42'
                  }`}
                  style={index === 1 ? { backgroundColor: project.accent } : undefined}
                >
                  {day}
                </span>
              ))}
            </div>
            <div className="mt-[0.45em] flex gap-[0.4em]">
              {['09:30', '11:00', '14:30'].map((time, index) => (
                <span
                  key={time}
                  className={`flex-1 rounded-[0.3em] py-[0.48em] text-center font-mono text-[0.42em] ${
                    index === 2 ? 'bg-[#10231c] text-white' : 'border border-[#10231c]/10 text-[#10231c]/48'
                  }`}
                >
                  {time}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StoreTablet({ project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#f3eadc] text-[#2a2119]">
      <header className="flex items-center justify-between border-b border-[#2a2119]/10 px-[1.7em] py-[1em]">
        <span className="font-heading text-[0.92em] font-semibold uppercase tracking-[0.17em]">Aurora</span>
        <span className="flex items-center gap-[1.4em] font-mono text-[0.45em] uppercase tracking-[0.13em] text-[#2a2119]/48">
          <span>Shop</span>
          <span>Rituals</span>
          <span>Journal</span>
          <span className="border border-[#2a2119]/20 px-[0.8em] py-[0.4em] text-[#2a2119]/65">Bag / 02</span>
        </span>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[.95fr_1.05fr]">
        <div className="flex flex-col justify-between px-[1.7em] py-[1.4em]">
          <div>
            <p className="font-mono text-[0.48em] uppercase tracking-[0.18em] text-[#2a2119]/42">The daily ritual</p>
            <h3 className="mt-[0.55em] font-heading text-[3em] font-medium leading-[0.9] tracking-[-0.06em]">
              Botanical
              <br />
              skincare,
              <br />
              distilled.
            </h3>
            <p className="mt-[0.85em] max-w-[18em] text-[0.68em] leading-[1.5] text-[#2a2119]/55">
              Considered formulas for skin that wants less, but better.
            </p>
          </div>
          <div className="flex items-center gap-[0.8em]">
            <span className="border border-[#2a2119]/20 px-[1em] py-[0.6em] font-mono text-[0.44em] uppercase tracking-[0.12em]">
              Shop the collection
            </span>
            <span className="font-mono text-[0.42em] uppercase tracking-[0.12em] text-[#2a2119]/38">01 / 05</span>
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#e3d4bf]">
          <div
            className="absolute inset-x-0 bottom-0 h-[82%]"
            style={{ background: `radial-gradient(ellipse at 50% 100%, ${project.accent} 0%, transparent 68%)` }}
          />
          <div className="absolute left-1/2 top-1/2 h-[54%] w-[24%] -translate-x-1/2 -translate-y-[54%] rounded-[45%_45%_12%_12%] border border-[#2a2119]/12 bg-[#fbf7ef] shadow-[0_1.8em_3.4em_rgba(42,33,25,0.17)]">
            <div className="mx-auto mt-[18%] h-[18%] w-[38%] bg-[#2a2119]/65" />
            <div className="mx-auto mt-[10%] h-[26%] w-[58%] border-y border-[#2a2119]/10" />
            <div className="mx-auto mt-[8%] h-[0.16em] w-[35%] bg-[#2a2119]/20" />
          </div>
          <div className="absolute bottom-[1.2em] left-[1.2em] right-[1.2em] flex items-end justify-between">
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
      </div>

      <div className="grid grid-cols-3 gap-[0.5em] border-t border-[#2a2119]/10 px-[1.7em] py-[0.8em]">
        {['Cleanse / 01', 'Treat / 02', 'Protect / 03'].map((item) => (
          <div key={item} className="flex items-center gap-[0.55em] border border-[#2a2119]/10 bg-[#fbf7ef]/55 p-[0.55em]">
            <span className="h-[1.8em] w-[2.7em] bg-[#2a2119]/10" />
            <span className="font-mono text-[0.4em] uppercase tracking-[0.1em] text-[#2a2119]/50">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MarketplaceTablet({ project }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#0b0d12] text-[#f6f1e8]">
      <div className="pointer-events-none absolute -right-[8%] top-[6%] h-[78%] w-[58%] rounded-full opacity-20 blur-3xl" style={{ backgroundColor: project.accent }} />
      <header className="relative flex items-center justify-between border-b border-white/10 px-[1.7em] py-[1em]">
        <span className="font-heading text-[0.92em] font-bold uppercase tracking-[-0.03em]">
          Kicks <span style={{ color: project.accent }}>&</span> Co.
        </span>
        <span className="flex items-center gap-[1.4em] font-mono text-[0.45em] uppercase tracking-[0.12em] text-white/48">
          <span>New drops</span>
          <span>Shop</span>
          <span className="border border-white/15 px-[0.8em] py-[0.4em] text-white/70">Bag / 02</span>
        </span>
      </header>

      <div className="relative grid min-h-0 flex-1 grid-cols-[1.05fr_.95fr] gap-[1em] px-[1.7em] py-[1.2em]">
        <div className="flex flex-col justify-center">
          <p className="font-mono text-[0.48em] uppercase tracking-[0.2em]" style={{ color: project.accent }}>
            Drop 04 / Live now
          </p>
          <h3 className="mt-[0.5em] font-heading text-[3.5em] font-extrabold uppercase leading-[0.78] tracking-[-0.08em]">
            Built
            <br />
            to move.
          </h3>
          <p className="mt-[0.85em] max-w-[19em] text-[0.67em] leading-[1.5] text-white/45">
            A limited run designed for the city after dark.
          </p>
          <div className="mt-[1.1em] flex items-center gap-[0.8em]">
            <span className="bg-[#f6f1e8] px-[1em] py-[0.6em] font-mono text-[0.44em] font-bold uppercase tracking-[0.12em] text-[#0b0d12]">
              Shop the drop
            </span>
            <span className="font-mono text-[0.42em] uppercase tracking-[0.12em] text-white/38">42 pairs only</span>
          </div>
        </div>

        <div className="relative min-h-0">
          <svg viewBox="0 0 220 130" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id={`tablet-shoe-${project.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={project.accent} />
                <stop offset="100%" stopColor="#ffb89f" />
              </linearGradient>
            </defs>
            <circle cx="112" cy="65" r="52" fill="none" stroke="rgba(255,255,255,.08)" />
            <circle cx="112" cy="65" r="66" fill="none" stroke="rgba(255,255,255,.045)" />
            <path
              d="M34 91c15-2 25-9 35-23 7-10 16-15 27-12 7 2 12 7 19 11 13 7 33 8 50 14 13 5 19 13 16 20-3 8-16 11-32 10-29-2-54 2-79 0-18-2-28-6-36-12-3-2-3-6 0-8Z"
              fill={`url(#tablet-shoe-${project.id})`}
              stroke="rgba(255,255,255,.24)"
              strokeWidth="1"
            />
            <path d="M67 76c9 5 17 10 30 13 14 3 30 3 44 7" fill="none" stroke="rgba(11,13,18,.4)" strokeWidth="2" />
            <path d="M45 93c22 4 56 2 90 5" fill="none" stroke="rgba(11,13,18,.45)" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-[0.55em] border-t border-white/10 px-[1.7em] py-[0.8em]">
        {['Runner / 01', 'Runner / 02', 'Runner / 03'].map((item, index) => (
          <div key={item} className="flex items-center gap-[0.65em] border border-white/8 bg-white/[0.025] p-[0.55em]">
            <span className="h-[1.8em] w-[2.5em]" style={{ backgroundColor: index === 0 ? `${project.accent}66` : 'rgba(255,255,255,.08)' }} />
            <span className="font-mono text-[0.4em] uppercase tracking-[0.1em] text-white/42">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DashboardTablet({ project }) {
  return (
    <div className="flex h-full overflow-hidden bg-[#080d18] text-[#e8edf7]">
      <aside className="flex w-[19%] shrink-0 flex-col border-r border-white/8 bg-[#0b111e] p-[0.9em]">
        <div className="flex items-center gap-[0.45em]">
          <span className="grid h-[1.4em] w-[1.4em] place-items-center rounded-[0.2em] text-[0.42em] font-bold text-[#07101e]" style={{ backgroundColor: project.accent }}>
            F
          </span>
          <span className="font-heading text-[0.6em] font-semibold tracking-[-0.02em]">Forge Ops</span>
        </div>
        <div className="mt-[1.7em] space-y-[0.8em] font-mono text-[0.42em] uppercase tracking-[0.1em] text-white/32">
          <span className="flex items-center gap-[0.45em] text-white/85">
            <span className="h-[0.35em] w-[0.35em] rounded-full" style={{ backgroundColor: project.accent }} />
            Overview
          </span>
          <span className="block">Orders</span>
          <span className="block">Inventory</span>
          <span className="block">Partners</span>
          <span className="block">Reports</span>
        </div>
        <div className="mt-auto border-t border-white/8 pt-[0.7em] font-mono text-[0.38em] uppercase leading-[1.6] tracking-[0.1em] text-white/28">
          Systems healthy
          <br />
          <span className="text-emerald-400/70">All services live</span>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/8 px-[1.2em] py-[0.9em]">
          <div>
            <p className="font-mono text-[0.4em] uppercase tracking-[0.14em] text-white/35">Operations / 2026</p>
            <p className="mt-[0.2em] font-heading text-[0.9em] font-semibold tracking-[-0.03em]">Command centre</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <span className="border border-white/10 px-[0.7em] py-[0.35em] font-mono text-[0.38em] uppercase tracking-[0.1em] text-white/40">Live</span>
            <span className="h-[1.5em] w-[1.5em] rounded-full border border-white/15 bg-white/5" />
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-[0.65em] p-[0.9em]">
          {[
            { label: 'Open orders', value: '128', delta: '+12' },
            { label: 'In transit', value: '34', delta: 'On time' },
            { label: 'Exceptions', value: '03', delta: '2 new' },
          ].map((item, index) => (
            <div key={item.label} className="border border-white/8 bg-white/[0.025] p-[0.7em]">
              <p className="font-mono text-[0.38em] uppercase tracking-[0.1em] text-white/32">{item.label}</p>
              <div className="mt-[0.35em] flex items-end justify-between gap-1">
                <p className="font-heading text-[1.25em] font-semibold leading-none tracking-[-0.04em]">{item.value}</p>
                <span className="font-mono text-[0.36em] uppercase tracking-[0.08em]" style={{ color: index === 2 ? '#fda4af' : project.accent }}>
                  {item.delta}
                </span>
              </div>
            </div>
          ))}

          <div className="col-span-2 row-span-2 flex flex-col border border-white/8 bg-white/[0.02] p-[0.8em]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.38em] uppercase tracking-[0.12em] text-white/32">Throughput / 7 days</span>
              <span className="font-mono text-[0.36em] uppercase tracking-[0.1em]" style={{ color: project.accent }}>+18.4%</span>
            </div>
            <svg viewBox="0 0 200 60" className="mt-[0.5em] min-h-0 w-full flex-1" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id={`tablet-chart-${project.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={project.accent} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={project.accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 48 C18 48 26 36 42 38 S70 46 88 32 S118 24 136 30 S166 12 200 16 L200 60 L0 60Z" fill={`url(#tablet-chart-${project.id})`} />
              <path d="M0 48 C18 48 26 36 42 38 S70 46 88 32 S118 24 136 30 S166 12 200 16" fill="none" stroke={project.accent} strokeWidth="1.5" />
            </svg>
            <div className="mt-[0.6em] grid grid-cols-4 gap-[0.4em] font-mono text-[0.36em] uppercase tracking-[0.08em] text-white/28">
              {['Mon', 'Tue', 'Wed', 'Thu'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col border border-white/8 bg-white/[0.025] p-[0.75em]">
            <p className="font-mono text-[0.38em] uppercase tracking-[0.12em] text-white/32">Recent activity</p>
            <div className="mt-[0.6em] space-y-[0.55em]">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-[0.4em]">
                  <span className="h-[0.35em] w-[0.35em] rounded-full bg-white/30" />
                  <span className="h-[0.2em] flex-1 rounded-full bg-white/12" />
                  <span className="h-[0.35em] w-[1em] bg-white/8" />
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/8 bg-white/[0.02] p-[0.75em]">
            <div className="flex items-center justify-between font-mono text-[0.36em] uppercase tracking-[0.1em] text-white/32">
              <span>Network</span>
              <span>Status</span>
            </div>
            <div className="mt-[0.55em] space-y-[0.4em]">
              {[0, 1, 2, 3].map((item) => (
                <span key={item} className="flex items-center justify-between border border-white/8 px-[0.4em] py-[0.35em]">
                  <span className="h-[0.18em] w-1/2 bg-white/15" />
                  <span className="h-[0.32em] w-[0.32em] rounded-full bg-emerald-400/60" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BookingTablet({ project }) {
  const week = [
    {
      day: 'Mon',
      date: '23',
      events: [
        { slot: 0, time: '09:00', name: 'Amina K.', tone: 'light' },
        { slot: 2, time: '14:00', name: 'Zuri M.', tone: 'accent' },
      ],
    },
    {
      day: 'Tue',
      date: '24',
      events: [
        { slot: 1, time: '10:30', name: 'Noah W.', tone: 'dark' },
        { slot: 3, time: '16:00', name: 'Maya K.', tone: 'soft' },
      ],
    },
    {
      day: 'Wed',
      date: '25',
      events: [
        { slot: 0, time: '09:00', name: 'Leila A.', tone: 'light' },
        { slot: 1, time: '10:30', name: 'Amara K.', tone: 'accent' },
        { slot: 2, time: '13:30', name: 'Priya S.', tone: 'soft' },
      ],
    },
    {
      day: 'Thu',
      date: '26',
      events: [
        { slot: 1, time: '11:30', name: 'Tobi A.', tone: 'light' },
        { slot: 3, time: '15:30', name: 'Joel N.', tone: 'dark' },
      ],
    },
    {
      day: 'Fri',
      date: '27',
      events: [
        { slot: 0, time: '09:30', name: 'Wanjiru M.', tone: 'soft' },
        { slot: 2, time: '14:30', name: 'Sam O.', tone: 'accent' },
      ],
    },
  ]

  const stats = [
    { label: 'Clients', value: '24', note: '4 active today', bars: [38, 52, 46, 68, 60, 82] },
    { label: 'Revenue', value: 'Ksh 84k', note: '+12% vs Feb', bars: [30, 44, 40, 58, 66, 76] },
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#f1edff] text-[#211b35]">
      <header className="flex items-center justify-between border-b border-[#211b35]/10 px-[1.6em] py-[1em]">
        <span className="flex items-center gap-[0.5em] font-heading text-[0.92em] font-semibold tracking-[-0.03em]">
          <span className="h-[1.2em] w-[1.2em] rounded-full" style={{ backgroundColor: project.accent }} />
          Tempo Rooms
        </span>
        <span className="flex items-center gap-[1.3em] font-mono text-[0.44em] uppercase tracking-[0.12em] text-[#211b35]/45">
          <span>Calendar</span>
          <span>Clients</span>
          <span className="rounded-full bg-[#211b35] px-[0.9em] py-[0.45em] text-white">New booking</span>
        </span>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_.85fr] gap-[0.8em] p-[1.1em]">
        <div className="flex flex-col border border-[#211b35]/10 bg-white/65 p-[0.9em]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[0.4em] uppercase tracking-[0.12em] text-[#211b35]/35">This week</p>
              <p className="mt-[0.2em] font-heading text-[0.9em] font-semibold tracking-[-0.03em]">March 2026</p>
            </div>
            <div className="flex gap-[0.3em]">
              <span className="grid h-[1.5em] w-[1.5em] place-items-center border border-[#211b35]/10 font-mono text-[0.45em]">&lt;</span>
              <span className="grid h-[1.5em] w-[1.5em] place-items-center border border-[#211b35]/10 font-mono text-[0.45em]">&gt;</span>
            </div>
          </div>
          <div className="mt-[0.8em] grid min-h-0 flex-1 grid-cols-5 gap-[0.35em]">
            {week.map(({ day, date, events }, dayIndex) => (
              <div key={day} className="flex min-h-0 flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.36em] uppercase tracking-[0.1em] text-[#211b35]/35">{day}</span>
                  <span
                    className={`grid h-[1.15em] w-[1.15em] place-items-center rounded-full font-mono text-[0.34em] ${
                      dayIndex === 2 ? 'text-[#211b35]' : 'text-[#211b35]/45'
                    }`}
                    style={dayIndex === 2 ? { backgroundColor: `${project.accent}55` } : undefined}
                  >
                    {date}
                  </span>
                </div>
                <div className="mt-[0.4em] flex min-h-0 flex-1 flex-col gap-[0.3em]">
                  {[0, 1, 2, 3].map((slot) => {
                    const event = events.find((item) => item.slot === slot)

                    if (!event) {
                      return (
                        <span
                          key={slot}
                          className="flex min-h-0 flex-1 items-center justify-center rounded-[0.3em] border border-dashed border-[#211b35]/8 bg-white/30 font-mono text-[0.42em] text-[#211b35]/18"
                        >
                          +
                        </span>
                      )
                    }

                    const toneClass =
                      event.tone === 'dark'
                        ? 'border-transparent bg-[#211b35] text-white'
                        : event.tone === 'accent'
                          ? 'border-transparent text-[#211b35]'
                          : event.tone === 'soft'
                            ? 'border-[#211b35]/8 bg-[#211b35]/[0.055] text-[#211b35]'
                            : 'border-[#211b35]/8 bg-white/85 text-[#211b35]'

                    return (
                      <div
                        key={slot}
                        className={`flex min-h-0 flex-1 flex-col justify-between rounded-[0.3em] border p-[0.4em] ${toneClass}`}
                        style={event.tone === 'accent' ? { backgroundColor: project.accent } : undefined}
                      >
                        <span className={`font-mono text-[0.34em] uppercase tracking-[0.06em] ${event.tone === 'dark' ? 'text-white/45' : 'text-[#211b35]/40'}`}>
                          {event.time}
                        </span>
                        <span className="truncate font-heading text-[0.42em] font-semibold leading-tight tracking-[-0.02em]">{event.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[0.7em]">
          <div className="border border-[#211b35]/10 bg-white/72 p-[0.8em]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.4em] uppercase tracking-[0.12em] text-[#211b35]/35">Next up</span>
              <span className="font-mono text-[0.38em] uppercase tracking-[0.1em] text-[#211b35]/28">10:30</span>
            </div>
            <p className="mt-[0.35em] font-heading text-[0.82em] font-semibold leading-tight tracking-[-0.02em]">Studio session</p>
            <p className="mt-[0.2em] font-mono text-[0.38em] uppercase tracking-[0.1em] text-[#211b35]/35">Amara K. / Room 02 / 60 min</p>
            <div className="mt-[0.6em] flex items-center gap-[0.4em]">
              <span className="flex-1 rounded-full py-[0.45em] text-center font-mono text-[0.4em] uppercase tracking-[0.1em] text-[#211b35]" style={{ backgroundColor: project.accent }}>
                Start session
              </span>
              <span className="grid h-[1.5em] w-[1.5em] place-items-center rounded-full border border-[#211b35]/12 font-mono text-[0.4em] text-[#211b35]/45">...</span>
            </div>
          </div>

          <div className="border border-[#211b35]/10 bg-white/50 p-[0.8em]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.4em] uppercase tracking-[0.12em] text-[#211b35]/35">Open times</span>
              <span className="font-mono text-[0.38em] uppercase tracking-[0.1em]" style={{ color: project.accent }}>Add</span>
            </div>
            <div className="mt-[0.5em] grid grid-cols-3 gap-[0.35em]">
              {['13:00', '15:30', '17:00'].map((time, index) => (
                <span
                  key={time}
                  className={`rounded-[0.35em] py-[0.5em] text-center font-mono text-[0.38em] ${
                    index === 0 ? 'text-[#211b35]' : 'border border-[#211b35]/8 text-[#211b35]/42'
                  }`}
                  style={index === 0 ? { backgroundColor: `${project.accent}44` } : undefined}
                >
                  {time}
                </span>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-[0.5em]">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex min-h-0 flex-col justify-between rounded-[0.5em] bg-[#211b35] p-[0.8em] text-white">
                <div className="flex items-center justify-between font-mono text-[0.46em] uppercase tracking-[0.12em] text-white/45">
                  <span>{stat.label}</span>
                  <span
                    className={`h-[0.42em] w-[0.42em] rounded-full ${index === 0 ? 'bg-emerald-400/70' : ''}`}
                    style={index === 0 ? undefined : { backgroundColor: project.accent }}
                  />
                </div>
                <div>
                  <p className="font-heading text-[1.25em] font-semibold leading-none tracking-[-0.04em]">{stat.value}</p>
                  <p className="mt-[0.25em] font-mono text-[0.37em] uppercase tracking-[0.08em] text-white/45">{stat.note}</p>
                </div>
                <div className="mt-[0.55em] flex h-[2.2em] items-end gap-[0.24em]">
                  {stat.bars.map((height, barIndex) => (
                    <span
                      key={barIndex}
                      className="flex-1 rounded-t-[0.08em]"
                      style={{ height: `${height}%`, backgroundColor: barIndex > 3 ? project.accent : 'rgba(255,255,255,.14)' }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PortfolioTablet({ project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#d8d1c5] text-[#181713]">
      <header className="flex items-center justify-between border-b border-[#181713]/15 px-[1.7em] py-[1em]">
        <span className="font-heading text-[0.9em] font-semibold uppercase tracking-[0.2em]">Halcyon</span>
        <span className="flex items-center gap-[1.4em] font-mono text-[0.44em] uppercase tracking-[0.13em] text-[#181713]/45">
          <span>Projects</span>
          <span>Studio</span>
          <span>Index</span>
        </span>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[#c8bfb0]">
          <div className="absolute left-[7%] top-[8%] h-[66%] w-[42%] bg-[#efeae2] shadow-[0_1.8em_4em_rgba(24,23,19,.12)]">
            <div className="absolute left-[12%] top-[12%] h-[52%] w-[30%] bg-[#9e9688]" />
            <div className="absolute bottom-[12%] right-[12%] h-[34%] w-[38%] border border-[#181713]/10" />
            <div className="absolute bottom-[12%] left-[12%] h-[0.18em] w-[42%] bg-[#181713]/20" />
          </div>
          <div className="absolute right-[6%] top-[16%] h-[48%] w-[32%] bg-[#7f786c]">
            <div className="absolute inset-x-[12%] bottom-[12%] h-[0.22em] bg-[#d8d1c5]/40" />
            <div className="absolute inset-x-[12%] top-[18%] h-[38%] border border-[#d8d1c5]/20" />
          </div>
          <div
            className="absolute bottom-[8%] right-[12%] h-[13%] w-[18%] opacity-80"
            style={{ background: `linear-gradient(135deg, ${project.accent}, transparent)` }}
          />
        </div>

        <div className="relative flex h-full flex-col justify-between p-[1.5em]">
          <div className="flex justify-between font-mono text-[0.42em] uppercase tracking-[0.16em] text-[#181713]/45">
            <span>Selected work / 2019—2026</span>
            <span>Architecture / Interiors</span>
          </div>
          <div>
            <p className="font-heading text-[3.4em] font-medium leading-[0.82] tracking-[-0.075em]">
              House
              <br />
              of light.
            </p>
            <div className="mt-[0.7em] flex items-center gap-[0.7em] font-mono text-[0.42em] uppercase tracking-[0.12em] text-[#181713]/45">
              <span>Private residence</span>
              <span className="h-px w-[3em] bg-[#181713]/25" />
              <span>Concept</span>
            </div>
          </div>
          <div className="flex items-end justify-between border-t border-[#181713]/15 pt-[0.65em] font-mono text-[0.42em] uppercase tracking-[0.13em] text-[#181713]/40">
            <span>Scroll to explore</span>
            <span>01 / 06</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-[#181713]/15">
        {['Casa Lumen', 'The Long Room', 'Atrium House'].map((item, index) => (
          <span key={item} className="flex items-center justify-between border-r border-[#181713]/12 px-[1em] py-[0.65em] last:border-r-0">
            <span className="font-heading text-[0.54em] font-medium tracking-[-0.02em]">{item}</span>
            <span className="font-mono text-[0.36em] uppercase tracking-[0.1em] text-[#181713]/35">0{index + 2}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function LaunchTablet({ project }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#07110f] text-[#e8f6f0]">
      <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: `radial-gradient(ellipse at 54% 112%, ${project.accent}55, transparent 62%)` }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '1.7em 1.7em',
        }}
      />

      <header className="relative flex items-center justify-between px-[1.7em] py-[1em]">
        <span className="flex items-center gap-[0.5em] font-heading text-[0.9em] font-semibold tracking-[-0.03em]">
          <span className="grid h-[1.3em] w-[1.3em] place-items-center rounded-full" style={{ backgroundColor: project.accent }}>
            <span className="h-[0.4em] w-[0.4em] rounded-full bg-[#07110f]" />
          </span>
          Signal
        </span>
        <span className="flex items-center gap-[1.3em] font-mono text-[0.44em] uppercase tracking-[0.12em] text-white/45">
          <span>Product</span>
          <span>Company</span>
          <span className="border border-white/15 px-[0.8em] py-[0.4em] text-white/70">Get early access</span>
        </span>
      </header>

      <div className="relative grid min-h-0 flex-1 grid-cols-[1fr_.92fr] items-center gap-[1.3em] px-[1.7em] pb-[1.1em]">
        <div>
          <p className="font-mono text-[0.47em] uppercase tracking-[0.18em]" style={{ color: project.accent }}>
            The clearer way to move money
          </p>
          <h3 className="mt-[0.55em] font-heading text-[3.25em] font-semibold leading-[0.85] tracking-[-0.07em]">
            Money,
            <br />
            in focus.
          </h3>
          <p className="mt-[0.85em] max-w-[19em] text-[0.68em] leading-[1.5] text-white/48">
            One calm view of every account, payment and decision that matters.
          </p>
          <div className="mt-[1.1em] flex items-center gap-[0.8em]">
            <span className="rounded-full px-[1.1em] py-[0.6em] font-mono text-[0.44em] font-semibold uppercase tracking-[0.12em] text-[#07110f]" style={{ backgroundColor: project.accent }}>
              Join the waitlist
            </span>
            <span className="font-mono text-[0.42em] uppercase tracking-[0.12em] text-white/35">See how it works</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-[0.8em] rounded-full opacity-30 blur-2xl" style={{ backgroundColor: project.accent }} />
          <div className="relative border border-white/12 bg-[#0d1a17]/88 p-[1em] shadow-[0_1.8em_4em_rgba(0,0,0,.3)] backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/8 pb-[0.55em]">
              <span className="font-mono text-[0.4em] uppercase tracking-[0.12em] text-white/35">Total balance</span>
              <span className="h-[0.8em] w-[0.8em] rounded-full border border-white/15" />
            </div>
            <p className="mt-[0.55em] font-heading text-[1.4em] font-semibold tracking-[-0.04em]">Ksh 482,600</p>
            <div className="mt-[0.25em] flex items-center gap-[0.4em] font-mono text-[0.38em] uppercase tracking-[0.1em]" style={{ color: project.accent }}>
              <span>+ 8.4%</span>
              <span className="text-white/25">this month</span>
            </div>
            <div className="mt-[0.8em] flex h-[4.6em] items-end gap-[0.3em]">
              {[35, 52, 44, 68, 57, 76, 88, 72, 94, 82].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t-[0.1em]"
                  style={{ height: `${height}%`, backgroundColor: index > 5 ? project.accent : 'rgba(255,255,255,.12)' }}
                />
              ))}
            </div>
            <div className="mt-[0.7em] grid grid-cols-2 gap-[0.4em]">
              <span className="border border-white/8 p-[0.5em] font-mono text-[0.38em] uppercase tracking-[0.1em] text-white/40">Send</span>
              <span className="border border-white/8 p-[0.5em] font-mono text-[0.38em] uppercase tracking-[0.1em] text-white/40">Request</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-between border-t border-white/8 px-[1.7em] py-[0.6em] font-mono text-[0.39em] uppercase tracking-[0.13em] text-white/28">
        <span>Built for operators</span>
        <span>Private beta / 2026</span>
      </div>
    </div>
  )
}

const layouts = {
  consulting: ConsultingTablet,
  clinic: ClinicTablet,
  store: StoreTablet,
  marketplace: MarketplaceTablet,
  dashboard: DashboardTablet,
  booking: BookingTablet,
  portfolio: PortfolioTablet,
  launch: LaunchTablet,
}

export default function TabletMockup({ project }) {
  const Layout = layouts[project.layout] || ConsultingTablet
  return (
    <div className="h-full w-full" style={{ containerType: 'inline-size' }}>
      <div
        className="flex h-full w-full flex-col overflow-hidden bg-[#080c15]"
        style={{ fontSize: 'clamp(7px, 2.05cqw, 14.5px)' }}
      >
        <TabletChrome project={project} />
        <div className="min-h-0 flex-1">
          <Layout project={project} />
        </div>
      </div>
    </div>
  )
}
