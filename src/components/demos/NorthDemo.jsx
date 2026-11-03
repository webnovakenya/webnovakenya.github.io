import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Flame,
  Moon,
  Snowflake,
  Trees,
  Users,
  WifiOff,
} from 'lucide-react'

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" }

const cabins = [
  {
    id: 'aurora',
    name: 'Aurora',
    guests: 2,
    size: '38 m²',
    price: 420,
    description: 'A glass-fronted cabin for two, angled toward the northern sky.',
    features: ['Panoramic glass', 'Wood stove', 'Private sauna'],
    variant: 'glass',
  },
  {
    id: 'fjell',
    name: 'Fjell',
    guests: 4,
    size: '54 m²',
    price: 520,
    description: 'A two-bedroom cabin with a deep sauna and space to gather.',
    features: ['Two bedrooms', 'Private sauna', 'Fireplace'],
    variant: 'fjell',
  },
  {
    id: 'skog',
    name: 'Skog',
    guests: 2,
    size: '32 m²',
    price: 390,
    description: 'A quiet forest hideaway with a deck made for slow mornings.',
    features: ['Forest deck', 'Outdoor bath', 'Full kitchen'],
    variant: 'skog',
  },
]

const times = ['15:00', '16:00', '17:00', '18:00']

const experiences = [
  {
    icon: Moon,
    title: 'Aurora nights',
    body: 'No light pollution, no schedule. In season, the sky puts on a show directly above your bed.',
  },
  {
    icon: Flame,
    title: 'Sauna & cold',
    body: 'A private wood-fired sauna, followed by a plunge in the fjord. The old Norwegian way.',
  },
  {
    icon: Trees,
    title: 'Into the quiet',
    body: 'Marked trails leave from every cabin. In winter, snowshoes wait by the door.',
  },
  {
    icon: WifiOff,
    title: 'Off-grid by design',
    body: 'Solar power, collected water, no television. The signal is yours to lose.',
  },
]

function scrollInto(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  })
}

function formatDate(value) {
  if (!value) return 'Select a date'
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const starPositions = [
  [88, 74],
  [126, 126],
  [196, 62],
  [254, 108],
  [318, 54],
  [376, 132],
  [438, 88],
  [502, 42],
  [566, 118],
  [628, 72],
  [702, 136],
  [766, 58],
  [824, 112],
  [892, 48],
  [958, 128],
  [1024, 84],
  [1088, 142],
  [1148, 62],
  [1218, 118],
  [1290, 76],
  [1352, 132],
]

function NorthScene({ variant = 'hero', className = '', cabin = false }) {
  const palettes = {
    hero: {
      skyTop: '#06111c',
      skyBottom: '#193849',
      mountainFar: '#18313f',
      mountainMid: '#0f2633',
      mountainNear: '#081a25',
      water: '#0a202b',
      glow: '#7fb4b6',
    },
    glass: {
      skyTop: '#081725',
      skyBottom: '#2a4a55',
      mountainFar: '#203f4a',
      mountainMid: '#132f3b',
      mountainNear: '#0a1c26',
      water: '#0c2530',
      glow: '#9bc9c4',
    },
    fjell: {
      skyTop: '#0a1420',
      skyBottom: '#334a50',
      mountainFar: '#2b3f45',
      mountainMid: '#1b3038',
      mountainNear: '#101f27',
      water: '#0e2029',
      glow: '#b7c9b2',
    },
    skog: {
      skyTop: '#07141a',
      skyBottom: '#233f42',
      mountainFar: '#233d3a',
      mountainMid: '#152e2d',
      mountainNear: '#0a1c1b',
      water: '#0c2223',
      glow: '#8fb9a0',
    },
  }
  const p = palettes[variant] || palettes.hero
  const uid = `${variant}-${cabin ? 'cabin' : 'scene'}`

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`north-sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.skyTop} />
            <stop offset="100%" stopColor={p.skyBottom} />
          </linearGradient>
          <linearGradient id={`north-water-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.water} />
            <stop offset="100%" stopColor={p.skyTop} />
          </linearGradient>
          <radialGradient id={`north-glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={p.glow} stopOpacity="0.38" />
            <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1440" height="760" fill={`url(#north-sky-${uid})`} />
        {starPositions.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={x % 3 === 0 ? 1.6 : 1} fill="#eaf2f3" opacity={0.2 + (y % 5) / 14} />
        ))}

        <path
          d="M-100 260 C180 140 330 280 560 170 C760 74 930 210 1120 138 C1260 84 1390 170 1540 112"
          stroke={p.glow}
          strokeWidth="60"
          fill="none"
          opacity="0.08"
          strokeLinecap="round"
        />
        <path
          d="M-120 360 C150 220 380 340 610 226 C840 112 1030 272 1210 198 C1320 152 1440 184 1560 148"
          stroke={p.glow}
          strokeWidth="90"
          fill="none"
          opacity="0.05"
          strokeLinecap="round"
        />

        <circle cx="1164" cy="126" r="128" fill={`url(#north-glow-${uid})`} />
        <circle cx="1164" cy="126" r="34" fill="#e9f1ee" opacity="0.88" />
        <circle cx="1177" cy="116" r="31" fill={p.skyTop} opacity="0.55" />

        <path
          d="M0 540 L136 390 L246 476 L392 318 L544 500 L702 352 L866 512 L1024 372 L1186 512 L1330 410 L1440 498 L1440 760 L0 760 Z"
          fill={p.mountainFar}
        />
        <path
          d="M0 610 L172 476 L304 562 L492 424 L654 580 L842 456 L1018 596 L1210 470 L1372 570 L1440 526 L1440 760 L0 760 Z"
          fill={p.mountainMid}
        />
        <path
          d="M0 672 L210 560 L388 650 L574 540 L758 660 L962 548 L1166 650 L1352 566 L1440 620 L1440 760 L0 760 Z"
          fill={p.mountainNear}
        />

        <rect y="640" width="1440" height="120" fill={`url(#north-water-${uid})`} />
        <path d="M0 670 L1440 652" stroke="#d9e7e4" strokeWidth="1" opacity="0.1" />
        <path d="M0 704 L1440 680" stroke="#d9e7e4" strokeWidth="1" opacity="0.08" />
        <path d="M0 732 L1440 712" stroke="#d9e7e4" strokeWidth="1" opacity="0.06" />

        {cabin && (
          <g>
            <path d="M470 636 L560 502 L650 636 Z" fill="#14252b" />
            <path d="M484 636 L560 520 L636 636 Z" fill="#231f1b" />
            <rect x="520" y="580" width="48" height="42" fill="#efb76a" opacity="0.85" />
            <path d="M528 622 L528 590 L560 590 L560 622" fill="none" stroke="#1b2b2e" strokeWidth="3" />
            <path d="M470 636 L560 502 L650 636" fill="none" stroke="#c9d8d4" strokeWidth="2" opacity="0.2" />
            <ellipse cx="560" cy="650" rx="132" ry="12" fill="#eab970" opacity="0.08" />
            <g opacity="0.55">
              <path d="M742 632 L760 558 L778 632 Z" fill="#0b1d1c" />
              <path d="M784 632 L798 574 L812 632 Z" fill="#0b1d1c" />
              <path d="M704 632 L716 580 L728 632 Z" fill="#0b1d1c" />
            </g>
          </g>
        )}
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07131f]/55 via-transparent to-[#07131f]/20" />
    </div>
  )
}

function StepDots({ step }) {
  return (
    <div className="flex items-center gap-3">
      {['Stay', 'Details', 'Confirm'].map((label, index) => {
        const number = index + 1
        const active = step === number
        const done = step > number
        return (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`grid h-6 w-6 place-items-center rounded-full border font-mono text-[8px] transition-colors ${
                active
                  ? 'border-[#0d2a38] bg-[#0d2a38] text-[#f4f0e7]'
                  : done
                    ? 'border-[#0d2a38]/25 bg-[#0d2a38]/10 text-[#0d2a38]'
                    : 'border-[#0d2a38]/20 text-[#0d2a38]/35'
              }`}
            >
              {done ? <Check className="h-3 w-3" strokeWidth={2} /> : number}
            </span>
            <span
              className={`hidden font-mono text-[7px] uppercase tracking-[0.13em] sm:block ${
                active ? 'text-[#0d2a38]' : 'text-[#0d2a38]/35'
              }`}
            >
              {label}
            </span>
            {number < 3 && <span className="ml-1 h-px w-4 bg-[#0d2a38]/15 sm:w-6" />}
          </div>
        )
      })}
    </div>
  )
}

export default function NorthDemo() {
  const [step, setStep] = useState(1)
  const [cabinId, setCabinId] = useState('')
  const [date, setDate] = useState('')
  const [nights, setNights] = useState('2')
  const [guests, setGuests] = useState('2')
  const [arrival, setArrival] = useState('')
  const [details, setDetails] = useState({ firstName: '', lastName: '', email: '', phone: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [bookingRef, setBookingRef] = useState('')

  const cabin = cabins.find((item) => item.id === cabinId)
  const minDate = new Date().toISOString().slice(0, 10)
  const total = cabin ? cabin.price * Number(nights) + 120 : 0

  const summaryRows = useMemo(
    () => [
      ['Cabin', cabin ? cabin.name : 'Not selected'],
      ['Arrival', formatDate(date)],
      ['Nights', `${nights} night${Number(nights) === 1 ? '' : 's'}`],
      ['Guests', `${guests} guest${Number(guests) === 1 ? '' : 's'}`],
      ['Check-in', arrival || 'Not selected'],
    ],
    [cabin, date, nights, guests, arrival],
  )

  const chooseCabin = (id) => {
    setCabinId(id)
    setErrors((current) => ({ ...current, cabin: '' }))
    const found = cabins.find((item) => item.id === id)
    if (found) setGuests(String(Math.min(Number(guests), found.guests)))
  }

  const selectFromCard = (id) => {
    chooseCabin(id)
    window.setTimeout(() => scrollInto('north-booking'), 80)
  }

  const continueToDetails = () => {
    const nextErrors = {}
    if (!cabin) nextErrors.cabin = 'Choose a cabin to continue.'
    if (!date) nextErrors.date = 'Choose an arrival date.'
    if (!arrival) nextErrors.arrival = 'Choose an arrival time.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setStep(2)
    window.setTimeout(() => scrollInto('north-booking'), 40)
  }

  const confirm = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!details.firstName.trim()) nextErrors.firstName = 'Add your first name.'
    if (!details.lastName.trim()) nextErrors.lastName = 'Add your last name.'
    if (!details.email.includes('@')) nextErrors.email = 'Add a valid email address.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setBookingRef(`NC-26-${Math.floor(1000 + Math.random() * 9000)}`)
    setStep(3)
    window.setTimeout(() => scrollInto('north-booking'), 40)
  }

  const reset = () => {
    setStep(1)
    setCabinId('')
    setDate('')
    setNights('2')
    setGuests('2')
    setArrival('')
    setDetails({ firstName: '', lastName: '', email: '', phone: '', notes: '' })
    setErrors({})
    setBookingRef('')
  }

  return (
    <div className="min-h-full bg-[#07131f] text-[#e9eef2]" style={{ colorScheme: 'dark' }}>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07131f]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <button type="button" onClick={() => scrollInto('north-top')} className="text-left" aria-label="North home">
            <span className="block font-display text-[18px] tracking-[0.3em] sm:text-[20px]">NORTH</span>
            <span className="mt-0.5 block font-mono text-[6px] uppercase tracking-[0.24em] text-white/35">
              Cabins above the Arctic Circle
            </span>
          </button>

          <nav className="hidden items-center gap-7 text-[11px] text-white/65 md:flex" aria-label="North">
            <button type="button" onClick={() => scrollInto('north-stays')} className="transition-colors hover:text-white">
              Stays
            </button>
            <button type="button" onClick={() => scrollInto('north-experience')} className="transition-colors hover:text-white">
              Experience
            </button>
            <button type="button" onClick={() => scrollInto('north-booking')} className="transition-colors hover:text-white">
              Reserve
            </button>
          </nav>

          <button
            type="button"
            onClick={() => scrollInto('north-booking')}
            className="inline-flex items-center gap-2 border border-white/18 px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.15em] text-white/85 transition-colors hover:bg-white hover:text-[#07131f]"
          >
            Book a stay
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.7} />
          </button>
        </div>
      </header>

      <section id="north-top" className="relative scroll-mt-24">
        <div className="absolute inset-0">
          <NorthScene className="h-full w-full" />
        </div>
        <div className="relative mx-auto flex min-h-[540px] max-w-[1280px] flex-col justify-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:min-h-[620px] lg:pb-20">
          <div className="max-w-3xl">
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#c6d9d8]/55">
              Tromsø, Norway · 69° North
            </p>
            <h1 className="mt-5 text-[clamp(3.4rem,7.5vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
              Stay where
              <br />
              the quiet is.
            </h1>
            <p className="mt-6 max-w-lg text-[14px] leading-relaxed text-white/58">
              Three off-grid cabins above the Arctic Circle. Designed for the aurora, the cold and the rare luxury of
              doing nothing at all.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollInto('north-booking')}
                className="group inline-flex items-center gap-3 bg-[#e7ebe6] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#0b1d28] transition-colors hover:bg-[#bcd8d2]"
              >
                Reserve a cabin
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={() => scrollInto('north-stays')}
                className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65 transition-colors hover:text-white"
              >
                Explore the stays
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
              </button>
            </div>
          </div>

          <div className="mt-14 grid gap-4 border-t border-white/14 pt-5 sm:grid-cols-3 sm:gap-8">
            {[
              ['69°N', 'Arctic Circle'],
              ['03', 'Off-grid cabins'],
              ['4.9/5', 'Guest rating'],
            ].map(([value, label]) => (
              <div key={label} className="flex items-baseline gap-3">
                <span className="text-[20px] font-semibold tracking-[-0.03em]">{value}</span>
                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/35">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="north-stays" className="scroll-mt-24 border-t border-white/10 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">The cabins</p>
              <h2 className="mt-3 text-[clamp(2.5rem,4.8vw,4.6rem)] font-semibold leading-none tracking-[-0.05em]">
                Three ways to disappear.
              </h2>
            </div>
            <p className="max-w-xs text-[12px] leading-relaxed text-white/45">
              Each cabin is private, off-grid and positioned for a different kind of quiet.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {cabins.map((item) => {
              const selected = cabinId === item.id
              return (
                <article
                  key={item.id}
                  className={`border transition-colors ${selected ? 'border-[#a8c9c4]' : 'border-white/12'}`}
                >
                  <div className="relative">
                    <NorthScene variant={item.variant} cabin className="aspect-[4/3]" />
                    <span className="absolute left-3 top-3 border border-white/20 bg-[#07131f]/55 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.13em] text-white/65 backdrop-blur-sm">
                      {item.size} · {item.guests} guests
                    </span>
                    {selected && (
                      <span className="absolute right-3 top-3 flex items-center gap-1.5 bg-[#e7ebe6] px-2 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-[#0b1d28]">
                        <Check className="h-2.5 w-2.5" strokeWidth={2.2} />
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[28px] font-medium leading-none tracking-[-0.04em]" style={serif}>
                          {item.name}
                        </h3>
                        <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.12em] text-white/35">
                          From ${item.price} / night
                        </p>
                      </div>
                      <Users className="h-4 w-4 text-white/25" strokeWidth={1.4} />
                    </div>
                    <p className="mt-3 min-h-[42px] text-[12px] leading-relaxed text-white/48">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-white/10 pt-3">
                      {item.features.map((feature) => (
                        <span key={feature} className="font-mono text-[7px] uppercase tracking-[0.1em] text-white/35">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => selectFromCard(item.id)}
                      className={`mt-5 flex w-full items-center justify-between px-4 py-3 font-mono text-[8px] uppercase tracking-[0.13em] transition-colors ${
                        selected
                          ? 'bg-[#a8c9c4] text-[#07131f] hover:bg-[#c4dbd5]'
                          : 'border border-white/16 text-white/65 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {selected ? 'Cabin selected' : 'Select this cabin'}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="north-experience" className="scroll-mt-24 border-y border-white/10 bg-[#0a1a26] py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">The experience</p>
              <h2 className="mt-3 text-[clamp(2.4rem,4.4vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
                Nothing to do.
                <br />
                Everything to feel.
              </h2>
            </div>
            <p className="max-w-md text-[12px] leading-relaxed text-white/45 lg:col-span-4 lg:col-start-9">
              We do not schedule your stay. The sauna is warm, the trail is marked, and the sky does the rest. What you
              do with the quiet is yours.
            </p>
          </div>

          <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((experience) => {
              const Icon = experience.icon
              return (
                <article key={experience.title} className="bg-[#0a1a26] p-5 sm:p-6">
                  <Icon className="h-5 w-5 text-[#a8c9c4]" strokeWidth={1.35} />
                  <h3 className="mt-7 text-[20px] font-medium tracking-[-0.03em]">{experience.title}</h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/42">{experience.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="north-booking" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 border-b border-white/12 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">Reserve</p>
              <h2 className="mt-3 text-[clamp(2.5rem,4.8vw,4.4rem)] font-semibold leading-none tracking-[-0.05em]">
                Make room for quiet.
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[7px] uppercase leading-relaxed tracking-[0.13em] text-white/35">
              Demo booking · no payment is taken
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="bg-[#f3efe6] p-5 text-[#0d2836] sm:p-8 lg:col-span-7" style={{ colorScheme: 'light' }}>
              <StepDots step={step} />

              <AnimatePresence mode="wait" initial={false}>
                {step === 1 && (
                  <motion.div
                    key="stay"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="mt-7 text-[30px] font-medium leading-none tracking-[-0.035em]" style={serif}>
                      Choose your stay.
                    </h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-[#0d2836]/50">
                      Pick a cabin, then tell us when you would like to arrive.
                    </p>

                    <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
                      {cabins.map((item) => {
                        const selected = cabinId === item.id
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => chooseCabin(item.id)}
                            className={`border p-3 text-left transition-colors ${
                              selected
                                ? 'border-[#0d2836] bg-[#0d2836] text-[#f3efe6]'
                                : 'border-[#0d2836]/18 hover:border-[#0d2836]/45'
                            }`}
                            aria-pressed={selected}
                          >
                            <span className="flex items-center justify-between gap-2">
                              <span className="text-[18px]" style={serif}>
                                {item.name}
                              </span>
                              {selected ? (
                                <Check className="h-3.5 w-3.5" strokeWidth={2} />
                              ) : (
                                <span className="h-3 w-3 rounded-full border border-[#0d2836]/25" />
                              )}
                            </span>
                            <span className={`mt-1 block font-mono text-[6.5px] uppercase tracking-[0.1em] ${selected ? 'text-[#f3efe6]/50' : 'text-[#0d2836]/40'}`}>
                              {item.guests} guests · ${item.price}/night
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    {errors.cabin && <p className="mt-2 text-[10px] text-[#b34b2b]">{errors.cabin}</p>}

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <label className="block">
                        <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-[#0d2836]/45">Arrival date</span>
                        <input
                          type="date"
                          min={minDate}
                          value={date}
                          onChange={(event) => {
                            setDate(event.target.value)
                            setErrors((current) => ({ ...current, date: '' }))
                          }}
                          className="mt-2 w-full border border-[#0d2836]/18 bg-transparent px-3 py-2.5 text-[11px] text-[#0d2836] outline-none transition-colors focus:border-[#0d2836]"
                        />
                        {errors.date && <span className="mt-1 block text-[9px] text-[#b34b2b]">{errors.date}</span>}
                      </label>
                      <label className="block">
                        <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-[#0d2836]/45">Nights</span>
                        <select
                          value={nights}
                          onChange={(event) => setNights(event.target.value)}
                          className="mt-2 w-full border border-[#0d2836]/18 bg-[#f3efe6] px-3 py-2.5 text-[11px] text-[#0d2836] outline-none transition-colors focus:border-[#0d2836]"
                        >
                          <option value="2">2 nights</option>
                          <option value="3">3 nights</option>
                          <option value="4">4 nights</option>
                          <option value="5">5 nights</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-[#0d2836]/45">Guests</span>
                        <select
                          value={guests}
                          onChange={(event) => setGuests(event.target.value)}
                          className="mt-2 w-full border border-[#0d2836]/18 bg-[#f3efe6] px-3 py-2.5 text-[11px] text-[#0d2836] outline-none transition-colors focus:border-[#0d2836]"
                        >
                          {[1, 2, 3, 4].map((count) => (
                            <option key={count} value={count}>
                              {count} {count === 1 ? 'guest' : 'guests'}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="mt-5">
                      <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-[#0d2836]/45">Arrival window</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {times.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => {
                              setArrival(time)
                              setErrors((current) => ({ ...current, arrival: '' }))
                            }}
                            className={`border px-4 py-2 font-mono text-[9px] transition-colors ${
                              arrival === time
                                ? 'border-[#0d2836] bg-[#0d2836] text-[#f3efe6]'
                                : 'border-[#0d2836]/18 text-[#0d2836]/60 hover:border-[#0d2836]/45'
                            }`}
                            aria-pressed={arrival === time}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {errors.arrival && <p className="mt-2 text-[9px] text-[#b34b2b]">{errors.arrival}</p>}
                    </div>

                    <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#0d2836]/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#0d2836]/35">
                        Best available rate · free cancellation
                      </p>
                      <button
                        type="button"
                        onClick={continueToDetails}
                        className="group flex items-center justify-between gap-8 bg-[#0d2836] px-5 py-3.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#f3efe6] transition-colors hover:bg-[#1b4b5c] sm:justify-center"
                      >
                        Continue to details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.form
                    key="details"
                    onSubmit={confirm}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    noValidate
                  >
                    <h3 className="mt-7 text-[30px] font-medium leading-none tracking-[-0.035em]" style={serif}>
                      Who is coming?
                    </h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-[#0d2836]/50">
                      We will send arrival notes and a weather guide after your demo booking.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-[#0d2836]/45">First name</span>
                        <input
                          type="text"
                          value={details.firstName}
                          onChange={(event) => setDetails((current) => ({ ...current, firstName: event.target.value }))}
                          placeholder="First name"
                          className="mt-2 w-full border border-[#0d2836]/18 bg-transparent px-3 py-2.5 text-[11px] outline-none transition-colors placeholder:text-[#0d2836]/25 focus:border-[#0d2836]"
                        />
                        {errors.firstName && <span className="mt-1 block text-[9px] text-[#b34b2b]">{errors.firstName}</span>}
                      </label>
                      <label className="block">
                        <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-[#0d2836]/45">Last name</span>
                        <input
                          type="text"
                          value={details.lastName}
                          onChange={(event) => setDetails((current) => ({ ...current, lastName: event.target.value }))}
                          placeholder="Last name"
                          className="mt-2 w-full border border-[#0d2836]/18 bg-transparent px-3 py-2.5 text-[11px] outline-none transition-colors placeholder:text-[#0d2836]/25 focus:border-[#0d2836]"
                        />
                        {errors.lastName && <span className="mt-1 block text-[9px] text-[#b34b2b]">{errors.lastName}</span>}
                      </label>
                    </div>

                    <label className="mt-4 block">
                      <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-[#0d2836]/45">Email</span>
                      <input
                        type="email"
                        value={details.email}
                        onChange={(event) => setDetails((current) => ({ ...current, email: event.target.value }))}
                        placeholder="you@example.com"
                        className="mt-2 w-full border border-[#0d2836]/18 bg-transparent px-3 py-2.5 text-[11px] outline-none transition-colors placeholder:text-[#0d2836]/25 focus:border-[#0d2836]"
                      />
                      {errors.email && <span className="mt-1 block text-[9px] text-[#b34b2b]">{errors.email}</span>}
                    </label>

                    <label className="mt-4 block">
                      <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-[#0d2836]/45">
                        Anything we should know? <span className="text-[#0d2836]/25">(optional)</span>
                      </span>
                      <textarea
                        rows={3}
                        value={details.notes}
                        onChange={(event) => setDetails((current) => ({ ...current, notes: event.target.value }))}
                        placeholder="Dietary needs, occasion, special requests…"
                        className="mt-2 w-full resize-none border border-[#0d2836]/18 bg-transparent px-3 py-2.5 text-[11px] leading-relaxed outline-none transition-colors placeholder:text-[#0d2836]/25 focus:border-[#0d2836]"
                      />
                    </label>

                    <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#0d2836]/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1)
                          setErrors({})
                        }}
                        className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.13em] text-[#0d2836]/50 transition-colors hover:text-[#0d2836]"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
                        Back to stay
                      </button>
                      <button
                        type="submit"
                        className="group flex items-center justify-between gap-8 bg-[#0d2836] px-5 py-3.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#f3efe6] transition-colors hover:bg-[#1b4b5c] sm:justify-center"
                      >
                        Confirm reservation
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
                      </button>
                    </div>
                  </motion.form>
                )}

                {step === 3 && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="mt-8 flex flex-col items-center text-center">
                      <div className="grid h-14 w-14 place-items-center rounded-full bg-[#0d2836] text-[#f3efe6]">
                        <Check className="h-6 w-6" strokeWidth={1.7} />
                      </div>
                      <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.18em] text-[#0d2836]/40">
                        Booking reference {bookingRef}
                      </p>
                      <h3 className="mt-2 text-[38px] font-medium leading-none tracking-[-0.04em]" style={serif}>
                        You are booked.
                      </h3>
                      <p className="mt-3 max-w-sm text-[12px] leading-relaxed text-[#0d2836]/50">
                        {details.firstName}, your {cabin?.name} cabin is held for {formatDate(date)}. This is a demo
                        reservation — no payment was taken.
                      </p>
                      <div className="mt-7 grid w-full max-w-sm grid-cols-2 gap-px border border-[#0d2836]/15 bg-[#0d2836]/15 text-left">
                        {[
                          ['Cabin', cabin?.name],
                          ['Check-in', arrival],
                          ['Nights', nights],
                          ['Guests', guests],
                        ].map(([label, value]) => (
                          <div key={label} className="bg-[#f3efe6] p-3">
                            <p className="font-mono text-[6.5px] uppercase tracking-[0.12em] text-[#0d2836]/35">{label}</p>
                            <p className="mt-1 text-[11px]">{value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-7 flex flex-wrap justify-center gap-3">
                        <button
                          type="button"
                          onClick={reset}
                          className="bg-[#0d2836] px-5 py-3 font-mono text-[8px] uppercase tracking-[0.13em] text-[#f3efe6] transition-colors hover:bg-[#1b4b5c]"
                        >
                          Book another escape
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollInto('north-stays')}
                          className="border border-[#0d2836]/20 px-5 py-3 font-mono text-[8px] uppercase tracking-[0.13em] text-[#0d2836]/65 transition-colors hover:border-[#0d2836]/50 hover:text-[#0d2836]"
                        >
                          Explore the cabins
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <aside className="self-start border border-white/12 bg-[#0b1c29] p-5 sm:p-6 lg:sticky lg:top-24 lg:col-span-4 lg:col-start-9">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-white/40">Your stay</p>
                <Compass className="h-4 w-4 text-white/25" strokeWidth={1.3} />
              </div>

              <div className="mt-5">
                <p className="text-[30px] font-medium leading-none tracking-[-0.04em]" style={serif}>
                  {cabin ? cabin.name : 'Choose a cabin'}
                </p>
                <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.12em] text-white/35">
                  {cabin ? `${cabin.size} · ${cabin.guests} guests` : 'Three off-grid stays'}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10">
                {summaryRows.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 border-b border-white/8 py-2.5">
                    <span className="font-mono text-[7px] uppercase tracking-[0.11em] text-white/30">{label}</span>
                    <span className="text-right text-[11px] text-white/70">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2 text-[11px]">
                <div className="flex justify-between text-white/45">
                  <span>
                    ${cabin?.price ?? 0} × {nights} nights
                  </span>
                  <span>${cabin ? cabin.price * Number(nights) : 0}</span>
                </div>
                <div className="flex justify-between text-white/45">
                  <span>Cleaning & linen</span>
                  <span>${cabin ? 120 : 0}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 text-[14px] text-white/85">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2.5 border border-white/10 p-3">
                <Snowflake className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#a8c9c4]" strokeWidth={1.4} />
                <p className="font-mono text-[6.5px] uppercase leading-relaxed tracking-[0.1em] text-white/35">
                  Includes sauna, firewood, snowshoes and a very good chance of aurora.
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 border border-white/10 px-4 py-3">
                <span className={`h-1.5 w-1.5 rounded-full ${step === 3 ? 'bg-[#7de7b6]' : 'bg-[#a8c9c4]'}`} />
                <p className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-white/35">
                  {step === 3 ? 'Demo reservation confirmed' : 'Complete the form to reserve'}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 pb-8 pt-8">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-5 px-5 sm:flex-row sm:items-center sm:px-8">
          <button type="button" onClick={() => scrollInto('north-top')} className="text-left" aria-label="North home">
            <span className="block font-display text-[16px] tracking-[0.3em]">NORTH</span>
          </button>
          <nav className="flex flex-wrap gap-5 font-mono text-[7px] uppercase tracking-[0.13em] text-white/35" aria-label="Footer">
            <button type="button" onClick={() => scrollInto('north-stays')} className="transition-colors hover:text-white">
              Stays
            </button>
            <button type="button" onClick={() => scrollInto('north-experience')} className="transition-colors hover:text-white">
              Experience
            </button>
            <button type="button" onClick={() => scrollInto('north-booking')} className="transition-colors hover:text-white">
              Reserve
            </button>
          </nav>
          <p className="font-mono text-[6.5px] uppercase tracking-[0.12em] text-white/22">
            © 2026 North Cabins — Webnova demo
          </p>
        </div>
      </footer>
    </div>
  )
}
