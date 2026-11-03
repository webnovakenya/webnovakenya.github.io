import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Logo from './Logo'
import Magnetic from './Magnetic'
import { scrollToSection, scrollToTop } from '../lib/scroll'
import { EASE } from '../lib/motion'

const links = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'services', label: 'Services', index: '02' },
  { id: 'work', label: 'Work', index: '03' },
  { id: 'process', label: 'Process', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
]

export default function Navbar({ ready }) {
  const [scrolled, setScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    let last = window.scrollY
    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        const delta = y - last
        setScrolled(y > 30)

        if (y < 120) setNavHidden(false)
        else if (delta > 5) setNavHidden(true)
        else if (delta < -5) setNavHidden(false)

        last = y
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const ids = ['home', 'about', 'services', 'work', 'process', 'contact']
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const lenis = window.__lenis
    lenis?.stop()
    document.body.classList.add('is-locked')

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKey)

    return () => {
      lenis?.start()
      document.body.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    setTimeout(() => scrollToSection(id), open ? 300 : 0)
  }

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[60] transition-[padding] duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        initial={{ y: -30, opacity: 0 }}
        animate={ready ? { y: navHidden && !open ? -120 : 0, opacity: 1 } : { y: -30, opacity: 0 }}
        transition={{ duration: navHidden ? 0.55 : 0.9, ease: EASE, delay: navHidden ? 0 : 0.15 }}
      >
        <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-8">
          <div
            className={`flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
              scrolled
                ? 'border-white/10 bg-ink/90 shadow-[0_10px_40px_rgba(0,0,0,0.25)]'
                : 'border-transparent bg-transparent'
            }`}
          >
            <button
              type="button"
              onClick={scrollToTop}
              className="text-bone transition-opacity hover:opacity-70"
              aria-label="Webnova home"
            >
              <Logo height="h-5 sm:h-6" />
            </button>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  aria-current={active === link.id ? 'page' : undefined}
                  className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === link.id ? 'text-bone' : 'text-bone/72 hover:text-bone'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-4 bottom-1.5 h-px origin-left bg-royal transition-transform duration-500 ${
                      active === link.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <Magnetic strength={0.22}>
                  <button
                    type="button"
                    onClick={() => go('contact')}
                    className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-royal px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-bone"
                  >
                    Start a project
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                  </button>
                </Magnetic>
              </div>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-bone transition-colors hover:border-royal hover:text-royal lg:hidden"
                aria-label="Open menu"
                aria-expanded={open}
              >
                <Menu className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] flex flex-col bg-ink p-5 sm:p-8 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <Logo height="h-6" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-bone transition-colors hover:border-royal hover:text-royal"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mt-14 flex flex-1 flex-col justify-center gap-1" aria-label="Mobile navigation">
              {links.map((link, index) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className="group flex items-baseline gap-4 border-b border-white/10 py-4 text-left"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 + index * 0.06 }}
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-bone/72">{link.index}</span>
                  <span className="font-heading text-4xl font-semibold uppercase tracking-[-0.03em] text-bone transition-colors group-hover:text-royal sm:text-5xl">
                    {link.label}
                  </span>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-bone/70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-royal" strokeWidth={1.5} />
                </motion.button>
              ))}
            </nav>

            <motion.div
              className="mt-8 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/80">
                <span className="h-1.5 w-1.5 rounded-full bg-royal" />
                Open for enquiries
              </div>
              <a href="mailto:webnovat3ch@gmail.com" className="block font-heading text-xl text-bone">
                webnovat3ch@gmail.com
              </a>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/70">
                <a href="tel:+254718885175" className="transition-colors hover:text-royal">
                  +254 718885175
                </a>
                <span>Worldwide services</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
