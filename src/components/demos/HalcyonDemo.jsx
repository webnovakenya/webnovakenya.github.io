import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  Minus,
  Plus,
  X,
} from 'lucide-react'
import { EASE } from '../../lib/motion'

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" }

const projects = [
  {
    id: 'casa-mira',
    index: '01',
    name: 'Casa Mira',
    location: 'Mallorca, Spain',
    year: '2025',
    type: 'Residential',
    area: '340 m²',
    brief:
      'A house cut into a hillside, arranged around a shaded courtyard and a long view of the Mediterranean. Lime plaster, local stone and a single olive tree set the tone.',
    details: ['Architecture', 'Interiors', 'Landscape'],
    palette: {
      sky: '#d9cdb9',
      sun: '#f4e5c8',
      ground: '#b6a58e',
      wall: '#d2c4ae',
      wallDark: '#a18f77',
      glass: '#5f685f',
      accent: '#a85b35',
      plant: '#65705a',
    },
    variant: 'villa',
  },
  {
    id: 'atelier-nord',
    index: '02',
    name: 'Atelier Nord',
    location: 'Copenhagen, Denmark',
    year: '2024',
    type: 'Cultural',
    area: '780 m²',
    brief:
      'A former printworks reimagined as a working atelier and public gallery. The existing concrete frame is left exposed, with new oak insertions that warm the volume without softening it.',
    details: ['Adaptive reuse', 'Public space', 'Wayfinding'],
    palette: {
      sky: '#d8d5cc',
      sun: '#efe9d8',
      ground: '#a7a399',
      wall: '#c7c1b4',
      wallDark: '#7d7a70',
      glass: '#4f5a5b',
      accent: '#ab5830',
      plant: '#5b6654',
    },
    variant: 'atelier',
  },
  {
    id: 'pavilion-o',
    index: '03',
    name: 'Pavilion O',
    location: 'Oslo, Norway',
    year: '2023',
    type: 'Hospitality',
    area: '460 m²',
    brief:
      'A lakeside pavilion for slow meals and long conversations. A deep timber roof floats above a low glass wall, framing the water and the changing northern light.',
    details: ['Hospitality', 'Interiors', 'Furniture'],
    palette: {
      sky: '#e0d8c8',
      sun: '#f4e7cc',
      ground: '#b1a68f',
      wall: '#c9bca5',
      wallDark: '#8b7e68',
      glass: '#58645f',
      accent: '#9e5d37',
      plant: '#65715f',
    },
    variant: 'pavilion',
  },
]

const services = [
  {
    title: 'Architecture',
    body: 'From first sketch to site, we shape buildings around light, material and the way a place wants to be lived in. Residential, cultural and hospitality work, considered at every scale.',
    items: ['Feasibility & concept', 'Planning & permits', 'Technical design', 'Site supervision'],
  },
  {
    title: 'Interiors',
    body: 'Rooms with a quiet point of view. We design interiors as part of the architecture, selecting materials and furniture that age with grace rather than announce themselves.',
    items: ['Spatial planning', 'Material palettes', 'Bespoke joinery', 'Furniture curation'],
  },
  {
    title: 'Landscape',
    body: 'The space between building and horizon matters. Our landscape work is restrained, native and designed to become more beautiful as it matures.',
    items: ['Planting strategy', 'Courtyards & gardens', 'Outdoor rooms', 'Long-term care'],
  },
]

const testimonials = [
  {
    quote:
      'Halcyon understood that we did not want a statement house. We wanted a place that felt inevitable — as if it had always been part of the hill.',
    name: 'Ines Vidal',
    role: 'Casa Mira, Mallorca',
  },
  {
    quote:
      'They worked with the building rather than against it. The atelier feels both completely new and as though it has been here for a hundred years.',
    name: 'Mikkel Sørensen',
    role: 'Atelier Nord, Copenhagen',
  },
  {
    quote:
      'Every detail was considered, but nothing feels precious. The pavilion is the calmest room we have ever eaten in.',
    name: 'Astrid Lund',
    role: 'Pavilion O, Oslo',
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

function ArchitectureArt({ project, className = 'aspect-[4/5]' }) {
  const p = project.palette
  const reactId = useId()
  const uid = `${project.id}-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`

  return (
    <div className={`relative overflow-hidden bg-[#d9d3c8] ${className}`}>
      <svg viewBox="0 0 800 620" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.sky} />
            <stop offset="100%" stopColor={p.sun} />
          </linearGradient>
          <linearGradient id={`wall-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={p.wall} />
            <stop offset="100%" stopColor={p.wallDark} />
          </linearGradient>
          <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={p.glass} />
            <stop offset="100%" stopColor="#2f3834" />
          </linearGradient>
        </defs>

        <rect width="800" height="620" fill={`url(#sky-${uid})`} />
        <circle cx="660" cy="112" r="70" fill={p.sun} opacity="0.8" />
        <rect y="480" width="800" height="140" fill={p.ground} />

        {project.variant === 'villa' && (
          <>
            <polygon points="0,470 185,350 340,412 520,300 800,390 800,620 0,620" fill={p.wallDark} opacity="0.3" />
            <rect x="126" y="252" width="430" height="238" fill={`url(#wall-${uid})`} />
            <rect x="398" y="212" width="222" height="278" fill={p.wall} />
            <rect x="86" y="226" width="500" height="26" fill={p.wallDark} />
            <rect x="426" y="246" width="160" height="112" fill={`url(#glass-${uid})`} />
            <rect x="426" y="246" width="78" height="112" fill="none" stroke={p.wallDark} strokeWidth="4" opacity="0.6" />
            <rect x="170" y="302" width="92" height="188" fill={p.glass} opacity="0.9" />
            <rect x="278" y="302" width="82" height="188" fill={`url(#glass-${uid})`} />
            <rect x="174" y="306" width="80" height="180" fill={p.sun} opacity="0.12" />
            <rect x="100" y="490" width="550" height="8" fill={p.wallDark} opacity="0.5" />
            <ellipse cx="292" cy="512" rx="108" ry="18" fill={p.glass} opacity="0.35" />
            <path d="M620 470 C648 416 654 365 644 318" stroke={p.plant} strokeWidth="7" fill="none" />
            <ellipse cx="643" cy="300" rx="43" ry="28" fill={p.plant} opacity="0.85" />
            <ellipse cx="617" cy="330" rx="30" ry="19" fill={p.plant} opacity="0.7" />
            <ellipse cx="669" cy="334" rx="27" ry="17" fill={p.plant} opacity="0.65" />
            <rect x="104" y="256" width="14" height="238" fill={p.accent} opacity="0.8" />
          </>
        )}

        {project.variant === 'atelier' && (
          <>
            <rect x="118" y="188" width="554" height="300" fill={`url(#wall-${uid})`} />
            <rect x="94" y="174" width="602" height="22" fill={p.wallDark} />
            <rect x="150" y="236" width="208" height="202" fill={p.wall} />
            <rect x="186" y="274" width="138" height="164" fill={`url(#glass-${uid})`} />
            <rect x="290" y="274" width="68" height="164" fill="none" stroke={p.wallDark} strokeWidth="4" opacity="0.55" />
            <rect x="396" y="258" width="242" height="180" fill={`url(#glass-${uid})`} />
            <rect x="396" y="258" width="242" height="30" fill={p.wallDark} opacity="0.55" />
            <rect x="512" y="258" width="7" height="180" fill={p.wallDark} opacity="0.5" />
            <rect x="98" y="488" width="610" height="7" fill={p.wallDark} opacity="0.45" />
            <rect x="76" y="156" width="18" height="388" fill={p.accent} opacity="0.75" />
            <path d="M120 488 C104 438 106 392 128 350" stroke={p.plant} strokeWidth="6" fill="none" />
            <ellipse cx="128" cy="340" rx="34" ry="22" fill={p.plant} opacity="0.6" />
            <rect x="664" y="212" width="62" height="290" fill={p.wallDark} opacity="0.18" />
          </>
        )}

        {project.variant === 'pavilion' && (
          <>
            <polygon points="0,450 210,410 460,470 800,398 800,620 0,620" fill={p.wallDark} opacity="0.26" />
            <rect x="120" y="294" width="558" height="150" fill={`url(#glass-${uid})`} />
            <rect x="120" y="444" width="558" height="54" fill={p.wall} />
            <polygon points="82,304 720,250 760,286 118,342" fill={p.wallDark} />
            <rect x="82" y="304" width="678" height="20" fill={p.wall} />
            <rect x="248" y="294" width="8" height="150" fill={p.wallDark} opacity="0.7" />
            <rect x="404" y="294" width="8" height="150" fill={p.wallDark} opacity="0.7" />
            <rect x="560" y="294" width="8" height="150" fill={p.wallDark} opacity="0.7" />
            <rect x="156" y="322" width="72" height="108" fill={p.sun} opacity="0.16" />
            <ellipse cx="254" cy="516" rx="184" ry="22" fill={p.glass} opacity="0.38" />
            <ellipse cx="580" cy="504" rx="150" ry="18" fill={p.glass} opacity="0.25" />
            <rect x="696" y="284" width="12" height="208" fill={p.accent} opacity="0.8" />
            <path d="M74 492 C56 446 64 398 92 362" stroke={p.plant} strokeWidth="6" fill="none" />
            <ellipse cx="94" cy="350" rx="38" ry="22" fill={p.plant} opacity="0.6" />
          </>
        )}

        <rect width="800" height="620" fill="none" stroke="#1d1c19" strokeOpacity="0.05" strokeWidth="2" />
      </svg>
      <span className="absolute bottom-3 left-3 font-mono text-[7px] uppercase tracking-[0.16em] text-[#1d1c19]/45">
        {project.location} · {project.year}
      </span>
    </div>
  )
}

function ProjectDetail({ project, onClose, onNext, onPrevious, onEnquire }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [project.id])

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 top-14 z-30 bg-[#f1ede5] text-[#1d1c19] sm:top-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} project details`}
    >
      <div className="flex items-center justify-between border-b border-[#1d1c19]/15 px-5 py-3 sm:px-8">
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#1d1c19]/45">
          Project {project.index} / 03
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevious}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#1d1c19]/15 transition-colors hover:bg-[#1d1c19] hover:text-[#f1ede5]"
            aria-label="Previous project"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#1d1c19]/15 transition-colors hover:bg-[#1d1c19] hover:text-[#f1ede5]"
            aria-label="Next project"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-[#1d1c19] text-[#f1ede5] transition-colors hover:bg-[#b7542c]"
            aria-label="Close project"
          >
            <X className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="h-[calc(100%-57px)] overflow-y-auto" data-lenis-prevent>
        <ArchitectureArt project={project} className="aspect-[4/3] w-full sm:aspect-[16/7]" />
        <div className="mx-auto max-w-[1100px] px-5 py-9 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#1d1c19]/45">
                {project.type} · {project.location}
              </p>
              <h2
                className="mt-2 text-[clamp(3rem,6vw,5.2rem)] font-normal leading-none tracking-[-0.045em]"
                style={serif}
              >
                {project.name}
              </h2>
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-[#1d1c19]/62">{project.brief}</p>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-px border-y border-[#1d1c19]/15 bg-[#1d1c19]/15 sm:grid-cols-4">
            {[
              ['Year', project.year],
              ['Location', project.location],
              ['Area', project.area],
              ['Type', project.type],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#f1ede5] py-4 pr-4">
                <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#1d1c19]/38">{label}</p>
                <p className="mt-1.5 text-[13px]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#1d1c19]/40">Approach</p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#1d1c19]/68">
                The project began with a long walk across the site and a decision to keep almost everything that was
                already there. New volumes were kept low, materials were drawn from within a short distance, and the
                architecture was given room to be quiet.
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#1d1c19]/40">Scope</p>
              <ul className="mt-3 border-t border-[#1d1c19]/15">
                {project.details.map((detail) => (
                  <li key={detail} className="flex items-center justify-between border-b border-[#1d1c19]/10 py-2.5 text-[12px] text-[#1d1c19]/65">
                    {detail}
                    <span className="h-1 w-1 rounded-full bg-[#b7542c]" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-[#1d1c19]/15 pt-6 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onNext}
              className="group flex items-center gap-4 text-left"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#1d1c19]/40">Next project</span>
              <span className="text-[24px] transition-colors group-hover:text-[#b7542c]" style={serif}>
                {projects[(projects.findIndex((item) => item.id === project.id) + 1) % projects.length].name}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={onEnquire}
              className="inline-flex items-center gap-3 bg-[#1d1c19] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#f1ede5] transition-colors hover:bg-[#b7542c]"
            >
              Enquire about this project
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HalcyonDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [openService, setOpenService] = useState(0)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', type: 'Residential', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const activeQuote = testimonials[quoteIndex]

  const goTo = (id) => {
    setMenuOpen(false)
    window.setTimeout(() => scrollInto(id), 60)
  }

  const openProject = (project) => {
    setActiveProject(project)
    setMenuOpen(false)
  }

  const nextProject = () => {
    const currentIndex = projects.findIndex((item) => item.id === activeProject.id)
    setActiveProject(projects[(currentIndex + 1) % projects.length])
  }

  const previousProject = () => {
    const currentIndex = projects.findIndex((item) => item.id === activeProject.id)
    setActiveProject(projects[(currentIndex - 1 + projects.length) % projects.length])
  }

  const enquireAboutProject = () => {
    setActiveProject(null)
    window.setTimeout(() => scrollInto('halcyon-contact'), 120)
  }

  const submitEnquiry = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please add your name.'
    if (!form.email.includes('@')) nextErrors.email = 'Please add a valid email.'
    if (form.message.trim().length < 10) nextErrors.message = 'Tell us a little more (10+ characters).'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setSent(true)
  }

  return (
    <div className="min-h-full bg-[#f1ede5] text-[#1d1c19]" style={{ colorScheme: 'light' }}>
      <header className="sticky top-0 z-30 border-b border-[#1d1c19]/12 bg-[#f1ede5]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8">
          <button type="button" onClick={() => scrollInto('halcyon-top')} className="text-left" aria-label="Halcyon home">
            <span className="block font-display text-[17px] tracking-[0.25em] sm:text-[19px]">HALCYON</span>
            <span className="mt-0.5 block font-mono text-[6px] uppercase tracking-[0.22em] text-[#1d1c19]/42">
              Architecture & interiors
            </span>
          </button>

          <nav className="hidden items-center gap-7 text-[11px] font-medium md:flex" aria-label="Halcyon">
            <button type="button" onClick={() => goTo('halcyon-studio')} className="transition-opacity hover:opacity-45">
              Studio
            </button>
            <button type="button" onClick={() => goTo('halcyon-projects')} className="transition-opacity hover:opacity-45">
              Projects
            </button>
            <button type="button" onClick={() => goTo('halcyon-services')} className="transition-opacity hover:opacity-45">
              Services
            </button>
            <button type="button" onClick={() => goTo('halcyon-contact')} className="transition-opacity hover:opacity-45">
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo('halcyon-contact')}
              className="hidden items-center gap-2 border border-[#1d1c19]/22 px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.15em] transition-colors hover:bg-[#1d1c19] hover:text-[#f1ede5] sm:inline-flex"
            >
              Enquire
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-[#1d1c19]/18 md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col bg-[#f1ede5] px-5 py-8 sm:top-16"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between border-b border-[#1d1c19]/15 pb-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#1d1c19]/40">Menu</p>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#1d1c19]/18"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
            <div className="mt-4 flex flex-col">
              {[
                ['Studio', 'halcyon-studio'],
                ['Projects', 'halcyon-projects'],
                ['Services', 'halcyon-services'],
                ['Contact', 'halcyon-contact'],
              ].map(([label, id], index) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => goTo(id)}
                  className="flex items-center justify-between border-b border-[#1d1c19]/12 py-4 text-left"
                >
                  <span className="text-[38px] leading-none" style={serif}>
                    {label}
                  </span>
                  <span className="font-mono text-[8px] text-[#1d1c19]/35">0{index + 1}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo('halcyon-contact')}
              className="mt-8 inline-flex items-center justify-between bg-[#1d1c19] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#f1ede5]"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="halcyon-top" className="scroll-mt-24">
        <div className="mx-auto grid max-w-[1280px] gap-9 px-5 pb-14 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-20 lg:pt-20">
          <div className="lg:col-span-5">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#1d1c19]/45">
              Copenhagen · Architecture since 2011
            </p>
            <h1
              className="mt-7 text-[clamp(3.8rem,7.4vw,7.2rem)] font-normal leading-[0.84] tracking-[-0.055em]"
              style={serif}
            >
              Space,
              <br />
              held
              <br />
              <em className="text-[#b7542c]">quietly.</em>
            </h1>
            <p className="mt-7 max-w-md text-[14px] leading-relaxed text-[#1d1c19]/62">
              An architecture and interiors studio working with light, material and the quiet rituals of daily life.
              Residential, cultural and hospitality projects across northern Europe.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => goTo('halcyon-projects')}
                className="group inline-flex items-center gap-3 bg-[#1d1c19] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#f1ede5] transition-colors hover:bg-[#b7542c]"
              >
                View projects
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={() => goTo('halcyon-studio')}
                className="group inline-flex items-center gap-2 border-b border-[#1d1c19]/25 pb-1 text-[10px] font-semibold uppercase tracking-[0.11em] text-[#1d1c19]/65 transition-colors hover:text-[#1d1c19]"
              >
                Inside the studio
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <ArchitectureArt project={projects[0]} className="aspect-[4/3.15] w-full" />
              <div className="absolute -bottom-5 left-4 hidden items-center gap-3 border border-[#1d1c19]/15 bg-[#f1ede5] px-4 py-3 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b7542c]" />
                <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#1d1c19]/55">
                  Casa Mira · Mallorca · 2025
                </span>
              </div>
              <button
                type="button"
                onClick={() => openProject(projects[0])}
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-[#f1ede5]/90 text-[#1d1c19] backdrop-blur-sm transition-colors hover:bg-[#1d1c19] hover:text-[#f1ede5]"
                aria-label="Open Casa Mira project"
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-[#1d1c19]/15">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4 sm:px-8">
          {['Residential', 'Cultural', 'Hospitality', 'Interiors', 'Landscape'].map((item, index) => (
            <span key={item} className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.18em] text-[#1d1c19]/45">
              {item}
              {index < 4 && <span className="hidden h-1 w-1 rounded-full bg-[#b7542c] sm:block" />}
            </span>
          ))}
        </div>
      </div>

      <section id="halcyon-studio" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#1d1c19]/40">The studio</p>
            <h2
              className="mt-4 text-[clamp(2.6rem,4.8vw,4.4rem)] font-normal leading-[0.98] tracking-[-0.04em]"
              style={serif}
            >
              Buildings that
              <br />
              hold their breath.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[15px] leading-relaxed text-[#1d1c19]/68">
              Halcyon is a small studio of architects, interior designers and makers. We believe the best buildings are
              not the loudest ones. They are the ones that make room for life to unfold slowly.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-[#1d1c19]/55">
              We work from a courtyard studio in Copenhagen, with projects across Denmark, Norway, Spain and the UK.
              Every commission begins with listening, walking the site and asking what the place already knows.
            </p>
            <div className="mt-9 grid grid-cols-3 gap-px border-y border-[#1d1c19]/15 bg-[#1d1c19]/15">
              {[
                ['14', 'Years of practice'],
                ['48', 'Projects completed'],
                ['6', 'Countries'],
              ].map(([value, label]) => (
                <div key={label} className="bg-[#f1ede5] py-5 pr-3">
                  <p className="text-[30px] leading-none" style={serif}>
                    {value}
                  </p>
                  <p className="mt-1.5 font-mono text-[7px] uppercase leading-relaxed tracking-[0.12em] text-[#1d1c19]/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="halcyon-projects" className="scroll-mt-24 border-t border-[#1d1c19]/15 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#1d1c19]/40">Selected work</p>
              <h2
                className="mt-3 text-[clamp(2.7rem,5vw,4.8rem)] font-normal leading-none tracking-[-0.045em]"
                style={serif}
              >
                Three places.
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[8px] uppercase leading-relaxed tracking-[0.13em] text-[#1d1c19]/40">
              Explore the archive · click any project to enter
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article key={project.id} className={index === 1 ? 'lg:mt-16' : ''}>
                <button
                  type="button"
                  onClick={() => openProject(project)}
                  className="group block w-full text-left"
                  aria-label={`Open ${project.name} project details`}
                >
                  <div className="overflow-hidden">
                    <ArchitectureArt
                      project={project}
                      className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4 border-t border-[#1d1c19]/18 pt-3">
                    <div>
                      <h3 className="text-[25px] leading-none transition-colors group-hover:text-[#b7542c]" style={serif}>
                        {project.name}
                      </h3>
                      <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.14em] text-[#1d1c19]/42">
                        {project.type} · {project.location}
                      </p>
                    </div>
                    <span className="font-mono text-[8px] text-[#1d1c19]/35">{project.year}</span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="halcyon-services" className="scroll-mt-24 bg-[#e8e3d9] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#1d1c19]/40">What we do</p>
            <h2
              className="mt-4 text-[clamp(2.6rem,4.6vw,4.2rem)] font-normal leading-[0.98] tracking-[-0.045em]"
              style={serif}
            >
              From the
              <br />
              ground up.
            </h2>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-[#1d1c19]/55">
              Architecture, interiors and landscape under one roof. One conversation, from first idea to final detail.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-[#1d1c19]/18">
              {services.map((service, index) => {
                const isOpen = openService === index
                return (
                  <div key={service.title} className="border-b border-[#1d1c19]/18">
                    <button
                      type="button"
                      onClick={() => setOpenService(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[8px] text-[#1d1c19]/30">0{index + 1}</span>
                        <span className="text-[clamp(1.8rem,3vw,2.5rem)] leading-none" style={serif}>
                          {service.title}
                        </span>
                      </span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#1d1c19]/20">
                        {isOpen ? <Minus className="h-3.5 w-3.5" strokeWidth={1.6} /> : <Plus className="h-3.5 w-3.5" strokeWidth={1.6} />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-5 pb-6 pl-8 lg:grid-cols-2">
                            <p className="max-w-sm text-[13px] leading-relaxed text-[#1d1c19]/60">{service.body}</p>
                            <ul className="space-y-1.5">
                              {service.items.map((item) => (
                                <li key={item} className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.11em] text-[#1d1c19]/50">
                                  <span className="h-1 w-1 rounded-full bg-[#b7542c]" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="flex items-center justify-between border-t border-[#1d1c19]/18 pt-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#1d1c19]/40">In their words</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuoteIndex((current) => (current - 1 + testimonials.length) % testimonials.length)}
                className="grid h-8 w-8 place-items-center rounded-full border border-[#1d1c19]/16 transition-colors hover:bg-[#1d1c19] hover:text-[#f1ede5]"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={() => setQuoteIndex((current) => (current + 1) % testimonials.length)}
                className="grid h-8 w-8 place-items-center rounded-full border border-[#1d1c19]/16 transition-colors hover:bg-[#1d1c19] hover:text-[#f1ede5]"
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
            </div>
          </div>

          <div className="mt-8 min-h-[230px] sm:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quoteIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <p
                  className="max-w-4xl text-[clamp(1.8rem,4vw,3.6rem)] font-normal leading-[1.08] tracking-[-0.035em]"
                  style={serif}
                >
                  “{activeQuote.quote}”
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#b7542c]" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#1d1c19]/50">
                    {activeQuote.name} · {activeQuote.role}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-2 flex gap-1.5">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => setQuoteIndex(index)}
                className={`h-1 w-8 transition-colors ${index === quoteIndex ? 'bg-[#1d1c19]' : 'bg-[#1d1c19]/18'}`}
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-pressed={index === quoteIndex}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="halcyon-contact" className="scroll-mt-24 bg-[#1d1c19] py-16 text-[#f1ede5] sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#f1ede5]/40">Start a conversation</p>
            <h2
              className="mt-4 text-[clamp(2.8rem,5vw,4.8rem)] font-normal leading-[0.94] tracking-[-0.045em]"
              style={serif}
            >
              Tell us about
              <br />
              the place.
            </h2>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-[#f1ede5]/55">
              A site, a feeling, a half-formed idea. We would love to hear it.
            </p>
            <div className="mt-8 space-y-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[#f1ede5]/40">
              <p>studio@halcyon.studio</p>
              <p>+45 32 14 88 20</p>
              <p>Refshalevej 163A, Copenhagen</p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[340px] flex-col items-center justify-center border border-[#f1ede5]/15 px-6 text-center"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full border border-[#f1ede5]/25">
                  <Check className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-[30px]" style={serif}>
                  Thank you.
                </h3>
                <p className="mt-3 max-w-xs text-[12px] leading-relaxed text-[#f1ede5]/50">
                  Your enquiry has been captured in this demo. No message was sent.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false)
                    setForm({ name: '', email: '', type: 'Residential', message: '' })
                  }}
                  className="mt-6 border border-[#f1ede5]/25 px-5 py-2.5 font-mono text-[8px] uppercase tracking-[0.14em] transition-colors hover:bg-[#f1ede5] hover:text-[#1d1c19]"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submitEnquiry} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#f1ede5]/40">Name</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Your name"
                      className="mt-2 w-full border-b border-[#f1ede5]/22 bg-transparent py-2.5 text-[12px] text-[#f1ede5] outline-none transition-colors placeholder:text-[#f1ede5]/20 focus:border-[#f1ede5]/60"
                    />
                    {errors.name && <span className="mt-1 block text-[10px] text-[#e49a7a]">{errors.name}</span>}
                  </label>
                  <label className="block">
                    <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#f1ede5]/40">Email</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                      placeholder="you@example.com"
                      className="mt-2 w-full border-b border-[#f1ede5]/22 bg-transparent py-2.5 text-[12px] text-[#f1ede5] outline-none transition-colors placeholder:text-[#f1ede5]/20 focus:border-[#f1ede5]/60"
                    />
                    {errors.email && <span className="mt-1 block text-[10px] text-[#e49a7a]">{errors.email}</span>}
                  </label>
                </div>

                <label className="block">
                  <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#f1ede5]/40">Project type</span>
                  <select
                    value={form.type}
                    onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
                    className="mt-2 w-full appearance-none border-b border-[#f1ede5]/22 bg-[#1d1c19] py-2.5 text-[12px] text-[#f1ede5] outline-none transition-colors focus:border-[#f1ede5]/60"
                  >
                    <option>Residential</option>
                    <option>Cultural</option>
                    <option>Hospitality</option>
                    <option>Interiors</option>
                  </select>
                </label>

                <label className="block">
                  <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#f1ede5]/40">A little about it</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    placeholder="The site, the brief, the feeling…"
                    className="mt-2 w-full resize-none border-b border-[#f1ede5]/22 bg-transparent py-2.5 text-[12px] leading-relaxed text-[#f1ede5] outline-none transition-colors placeholder:text-[#f1ede5]/20 focus:border-[#f1ede5]/60"
                  />
                  {errors.message && <span className="mt-1 block text-[10px] text-[#e49a7a]">{errors.message}</span>}
                </label>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-between bg-[#f1ede5] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1d1c19] transition-colors hover:bg-[#b7542c] hover:text-[#f1ede5]"
                >
                  Send enquiry
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
                </button>
                <p className="text-center font-mono text-[7px] uppercase tracking-[0.13em] text-[#f1ede5]/25">
                  Demo form · no message is sent
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#1d1c19] pb-8 text-[#f1ede5]">
        <div className="mx-auto max-w-[1280px] border-t border-[#f1ede5]/12 px-5 pt-6 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <button type="button" onClick={() => scrollInto('halcyon-top')} className="text-left" aria-label="Halcyon home">
              <span className="block font-display text-[16px] tracking-[0.25em]">HALCYON</span>
            </button>
            <nav className="flex flex-wrap gap-5 font-mono text-[8px] uppercase tracking-[0.14em] text-[#f1ede5]/40" aria-label="Footer">
              <button type="button" onClick={() => goTo('halcyon-studio')} className="transition-colors hover:text-[#f1ede5]">
                Studio
              </button>
              <button type="button" onClick={() => goTo('halcyon-projects')} className="transition-colors hover:text-[#f1ede5]">
                Projects
              </button>
              <button type="button" onClick={() => goTo('halcyon-services')} className="transition-colors hover:text-[#f1ede5]">
                Services
              </button>
              <button type="button" onClick={() => goTo('halcyon-contact')} className="transition-colors hover:text-[#f1ede5]">
                Contact
              </button>
            </nav>
            <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#f1ede5]/25">
              © 2026 Halcyon — Webnova demo
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeProject && (
          <ProjectDetail
            project={activeProject}
            onClose={() => setActiveProject(null)}
            onNext={nextProject}
            onPrevious={previousProject}
            onEnquire={enquireAboutProject}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
