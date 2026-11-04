export function StatusBar({ dark = false }) {
  return (
    <div
      className={`flex items-center justify-between px-[1.5em] pb-[0.45em] pt-[0.85em] font-mono text-[0.56em] font-medium tracking-[0.02em] ${
        dark ? 'text-white/80' : 'text-[#211b35]/75'
      }`}
    >
      <span>9:41</span>
      <span className="flex items-center gap-[0.35em]">
        <span className="flex items-end gap-[0.12em]">
          {[0.28, 0.38, 0.48, 0.58].map((height, index) => (
            <span
              key={index}
              className={`block w-[0.12em] rounded-[0.1em] ${dark ? 'bg-white/75' : 'bg-[#211b35]/70'}`}
              style={{ height: `${height}em` }}
            />
          ))}
        </span>
        <span className={`h-[0.55em] w-[1.1em] rounded-[0.14em] border ${dark ? 'border-white/55' : 'border-[#211b35]/45'}`}>
          <span className={`block h-full w-[72%] rounded-[0.08em] ${dark ? 'bg-white/70' : 'bg-[#211b35]/60'}`} />
        </span>
      </span>
    </div>
  )
}

function BottomNav({ items, accent, dark = false, active = 0 }) {
  return (
    <div
      className={`mt-auto flex items-center justify-around border-t px-[1em] pb-[0.85em] pt-[0.7em] ${
        dark ? 'border-white/10 bg-[#080e19]/95' : 'border-[#211b35]/10 bg-white/80'
      }`}
    >
      {items.map((item, index) => (
        <span key={item} className="flex flex-col items-center gap-[0.3em]">
          <span
            className={`block h-[0.78em] w-[0.78em] rounded-[0.24em] border ${
              index === active
                ? 'border-transparent'
                : dark
                  ? 'border-white/25'
                  : 'border-[#211b35]/20'
            }`}
            style={index === active ? { backgroundColor: accent } : undefined}
          />
          <span
            className={`font-mono text-[0.46em] uppercase tracking-[0.1em] ${
              index === active ? (dark ? 'text-white/80' : 'text-[#211b35]/75') : dark ? 'text-white/25' : 'text-[#211b35]/35'
            }`}
          >
            {item}
          </span>
        </span>
      ))}
    </div>
  )
}

function ForgePhone({ project }) {
  const accent = project.accent
  return (
    <div className="flex h-full flex-col bg-[#070d18] text-[#edf3ff]">
      <StatusBar dark />
      <div className="px-[1.35em] pb-[1.1em]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-[0.55em]">
            <span
              className="grid h-[1.65em] w-[1.65em] place-items-center rounded-[0.48em] font-heading text-[0.72em] font-bold text-[#07101e]"
              style={{ backgroundColor: accent }}
            >
              F
            </span>
            <span>
              <span className="block font-heading text-[0.9em] font-semibold leading-none tracking-[-0.03em]">Forge Ops</span>
              <span className="mt-[0.3em] block font-mono text-[0.46em] uppercase tracking-[0.14em] text-white/32">Nairobi hub / live</span>
            </span>
          </span>
          <span className="relative grid h-[1.8em] w-[1.8em] place-items-center rounded-full border border-white/12 bg-white/[0.04]">
            <span className="h-[0.32em] w-[0.32em] rounded-full" style={{ backgroundColor: accent }} />
            <span className="absolute right-[0.18em] top-[0.18em] h-[0.3em] w-[0.3em] rounded-full bg-emerald-400" />
          </span>
        </div>

        <div className="mt-[1.5em] flex items-end justify-between">
          <div>
            <p className="font-mono text-[0.46em] uppercase tracking-[0.18em] text-white/30">Tuesday / 14:32</p>
            <p className="mt-[0.38em] max-w-[7.5em] font-heading text-[1.5em] font-semibold leading-[0.92] tracking-[-0.055em]">
              Command centre.
            </p>
          </div>
          <span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[0.42em] uppercase tracking-[0.12em] text-white/45">
            Live
          </span>
        </div>

        <div className="mt-[1.1em] grid grid-cols-2 gap-[0.55em]">
          {[
            { label: 'Open orders', value: '128', delta: '+12' },
            { label: 'In transit', value: '34', delta: 'On time' },
          ].map((item) => (
            <div key={item.label} className="rounded-[0.7em] border border-white/8 bg-white/[0.035] p-[0.75em]">
              <p className="font-mono text-[0.44em] uppercase tracking-[0.1em] text-white/32">{item.label}</p>
              <div className="mt-[0.3em] flex items-end justify-between gap-1">
                <p className="font-heading text-[1.45em] font-semibold leading-none tracking-[-0.04em]">{item.value}</p>
                <span className="font-mono text-[0.4em] uppercase tracking-[0.08em]" style={{ color: accent }}>
                  {item.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[0.6em] rounded-[0.7em] border border-white/8 bg-white/[0.025] p-[0.8em]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.44em] uppercase tracking-[0.12em] text-white/35">Throughput</span>
            <span className="font-mono text-[0.4em] uppercase tracking-[0.1em]" style={{ color: accent }}>
              +18.4%
            </span>
          </div>
          <div className="mt-[0.7em] flex h-[3.3em] items-end gap-[0.32em]">
            {[38, 52, 44, 68, 56, 84, 72, 94, 68, 88, 76, 100].map((height, index) => (
              <span
                key={index}
                data-live-bar
                className="flex-1 rounded-t-[0.12em]"
                style={{
                  height: `${height}%`,
                  backgroundColor: index > 7 ? accent : 'rgba(255,255,255,0.1)',
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-[0.6em] rounded-[0.7em] border border-white/8 bg-white/[0.025] p-[0.75em]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.44em] uppercase tracking-[0.12em] text-white/35">Needs attention</span>
            <span className="rounded-full bg-rose-400/15 px-1.5 py-0.5 font-mono text-[0.38em] uppercase tracking-[0.1em] text-rose-300/85">
              2 exceptions
            </span>
          </div>
          <div className="mt-[0.55em] space-y-[0.45em]">
            {[
              ['#NL-4821', 'Customs hold', '4m'],
              ['#NL-4788', 'Carrier delay', '12m'],
            ].map(([id, note, time], index) => (
              <div key={id} className="flex items-center gap-[0.55em]">
                <span
                  className="grid h-[1.45em] w-[1.45em] place-items-center rounded-full font-mono text-[0.4em]"
                  style={{ backgroundColor: index === 0 ? `${accent}28` : 'rgba(255,255,255,0.05)', color: index === 0 ? accent : 'rgba(255,255,255,.45)' }}
                >
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[0.62em] font-semibold tracking-[-0.01em]">{id}</span>
                  <span className="block font-mono text-[0.4em] uppercase tracking-[0.08em] text-white/30">{note}</span>
                </span>
                <span className="font-mono text-[0.4em] text-white/28">{time}</span>
                <span
                  data-live-tap
                  className="rounded-full px-1.5 py-0.5 font-mono text-[0.38em] uppercase tracking-[0.08em] text-[#07101e]"
                  style={{ backgroundColor: index === 0 ? accent : 'rgba(255,255,255,.14)' }}
                >
                  Open
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav dark accent={accent} items={['Home', 'Orders', 'Stock', 'More']} />
    </div>
  )
}

function TempoPhone({ project }) {
  const accent = project.accent
  return (
    <div className="flex h-full flex-col bg-[#f4f0ff] text-[#211b35]">
      <StatusBar />
      <div className="flex min-h-0 flex-1 flex-col px-[1.35em] pb-[0.8em]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-[0.55em]">
            <span
              className="grid h-[1.65em] w-[1.65em] place-items-center rounded-full font-heading text-[0.72em] font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              T
            </span>
            <span>
              <span className="block font-heading text-[0.9em] font-semibold leading-none tracking-[-0.03em]">Tempo</span>
              <span className="mt-[0.3em] block font-mono text-[0.46em] uppercase tracking-[0.12em] text-[#211b35]/35">Studio workspace</span>
            </span>
          </span>
          <span className="grid h-[1.8em] w-[1.8em] place-items-center rounded-full bg-[#211b35] font-heading text-[0.58em] font-semibold text-white">
            AM
          </span>
        </div>

        <div className="mt-[1.5em] flex items-end justify-between">
          <div>
            <p className="font-mono text-[0.46em] uppercase tracking-[0.16em] text-[#211b35]/35">Tuesday, 24 March</p>
            <p className="mt-[0.38em] max-w-[8em] font-heading text-[1.42em] font-semibold leading-[0.94] tracking-[-0.055em]">
              Three sessions.
              <br />
              One calm day.
            </p>
          </div>
          <span
            data-live-tap
            className="grid h-[2.15em] w-[2.15em] place-items-center rounded-full text-[1em] font-light text-white shadow-lg"
            style={{ backgroundColor: accent, boxShadow: `0 0.5em 1.5em ${accent}55` }}
          >
            +
          </span>
        </div>

        <div className="mt-[1.1em] grid grid-cols-5 gap-[0.4em]">
          {[
            ['M', '23'],
            ['T', '24'],
            ['W', '25'],
            ['T', '26'],
            ['F', '27'],
          ].map(([day, date], index) => (
            <div
              key={`${day}-${date}`}
              className={`flex flex-col items-center gap-[0.25em] rounded-[0.55em] py-[0.48em] ${
                index === 1 ? 'text-white' : 'border border-[#211b35]/8 bg-white/65 text-[#211b35]/55'
              }`}
              style={index === 1 ? { backgroundColor: accent } : undefined}
            >
              <span className="font-mono text-[0.42em] uppercase tracking-[0.12em]">{day}</span>
              <span className="font-heading text-[0.7em] font-semibold">{date}</span>
              {index === 1 && <span className="h-[0.18em] w-[0.18em] rounded-full bg-white/85" />}
            </div>
          ))}
        </div>

        <div className="mt-[0.7em] overflow-hidden rounded-[0.8em] bg-[#211b35] p-[0.8em] text-white shadow-[0_1em_2em_rgba(33,27,53,.22)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[0.42em] uppercase tracking-[0.14em] text-white/38">Next up / 10:30</p>
              <p className="mt-[0.35em] font-heading text-[0.92em] font-semibold tracking-[-0.02em]">Studio session</p>
              <p className="mt-[0.2em] font-mono text-[0.4em] uppercase tracking-[0.1em] text-white/35">Amara K. / Room 02 / 60 min</p>
            </div>
            <span className="rounded-full bg-white/10 px-1.5 py-1 font-mono text-[0.38em] uppercase tracking-[0.08em] text-white/65">
              Paid
            </span>
          </div>
          <div className="mt-[0.7em] flex items-center gap-[0.45em]">
            <span data-live-tap className="flex-1 rounded-full py-[0.48em] text-center font-mono text-[0.42em] uppercase tracking-[0.1em] text-[#211b35]" style={{ backgroundColor: accent }}>
              Start session
            </span>
            <span className="grid h-[1.65em] w-[1.65em] place-items-center rounded-full border border-white/12 font-mono text-[0.42em] text-white/55">
              ...
            </span>
          </div>
        </div>

        <div className="mt-[0.65em] rounded-[0.8em] border border-[#211b35]/8 bg-white/70 p-[0.75em]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.44em] uppercase tracking-[0.12em] text-[#211b35]/35">Open times</span>
            <span className="font-mono text-[0.4em] uppercase tracking-[0.1em]" style={{ color: accent }}>
              Add booking
            </span>
          </div>
          <div className="mt-[0.55em] grid grid-cols-3 gap-[0.35em]">
            {['13:00', '15:30', '17:00'].map((time, index) => (
              <span
                key={time}
                className={`grid place-items-center rounded-[0.45em] py-[0.5em] font-mono text-[0.42em] tracking-[0.08em] ${
                  index === 0 ? 'text-[#211b35]' : 'text-[#211b35]/42'
                }`}
                style={index === 0 ? { backgroundColor: `${accent}44` } : { border: '1px solid rgba(33,27,53,.08)' }}
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-[0.65em] flex min-h-0 flex-1 flex-col overflow-hidden rounded-[0.8em] border border-[#211b35]/8 bg-white/45 p-[0.75em]">
          <div className="flex items-center justify-between font-mono text-[0.42em] uppercase tracking-[0.12em] text-[#211b35]/35">
            <span>Today's flow</span>
            <span>3 sessions</span>
          </div>
          <div className="mt-[0.2em] flex min-h-0 flex-1 flex-col">
            {[
              ['11:30', 'Noah W.', 'Room 01', 'Check-in'],
              ['13:00', 'Zuri M.', 'Room 03', 'Confirmed'],
              ['15:30', 'Leila A.', 'Room 02', 'Balance'],
            ].map(([time, name, room, status], index) => (
              <div
                key={`${time}-${name}`}
                className={`flex flex-1 items-center justify-between border-t border-[#211b35]/8 py-[0.3em] ${index === 0 ? 'border-t-0' : ''}`}
              >
                <span className="flex items-center gap-[0.6em]">
                  <span className="font-mono text-[0.38em] tracking-[0.04em] text-[#211b35]/38">{time}</span>
                  <span>
                    <span className="block font-heading text-[0.48em] font-semibold leading-tight tracking-[-0.02em]">{name}</span>
                    <span className="mt-[0.15em] block font-mono text-[0.32em] uppercase tracking-[0.08em] text-[#211b35]/30">{room}</span>
                  </span>
                </span>
                <span className="rounded-full border border-[#211b35]/8 px-[0.7em] py-[0.3em] font-mono text-[0.31em] uppercase tracking-[0.07em] text-[#211b35]/40">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav accent={accent} items={['Today', 'Calendar', 'Clients', 'Money']} />
    </div>
  )
}

export default function AppPhoneMockup({ project }) {
  const Body = project.layout === 'booking' ? TempoPhone : ForgePhone
  return (
    <div className="h-full w-full" style={{ containerType: 'inline-size' }}>
      <div className="h-full w-full overflow-hidden" style={{ fontSize: '4.2cqw' }}>
        <Body project={project} />
      </div>
    </div>
  )
}
