import { useEffect, useState } from 'react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { DribbbleIcon, InstagramIcon, LinkedinIcon, XIcon } from './SocialIcons'
import Logo from './Logo'
import Marquee from './Marquee'
import Reveal from './Reveal'
import { scrollToSection, scrollToTop } from '../lib/scroll'

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
]

const serviceLinks = [
  'Business sites',
  'E-commerce',
  'Booking systems',
  'Portfolio sites',
  'Custom apps',
]

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: LinkedinIcon },
  { label: 'Dribbble', href: 'https://dribbble.com', icon: DribbbleIcon },
  { label: 'X / Twitter', href: 'https://x.com', icon: XIcon },
]

export default function Footer() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Africa/Nairobi',
        }).format(new Date()),
      )
    }

    update()
    const interval = setInterval(update, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="pointer-events-none absolute inset-0 dark-grid opacity-30" aria-hidden="true" />
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <Marquee
        dark
        items={['Let’s build something remarkable', 'Say hello', 'Open for enquiries']}
        duration={34}
      />

      <div className="section-frame relative pt-16 sm:pt-20">
        <Reveal>
          <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Logo variant="full" height="h-12 sm:h-14" />
              <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-bone/70">
                An independent digital studio designing and building the internet&apos;s more memorable
                corners. Strategy, design and engineering — under one roof.
              </p>
              <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/60">
                <span className="h-1.5 w-1.5 rounded-full bg-royal" />
                Open for enquiries
              </div>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/38">
                Nairobi · Working worldwide
              </p>
            </div>

            <div className="lg:col-span-2 lg:col-start-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/48">Navigate</p>
              <ul className="mt-5 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className="link-line text-sm text-bone/66 transition-colors hover:text-bone"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 lg:col-start-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/48">Services</p>
              <ul className="mt-5 space-y-2.5">
                {serviceLinks.map((service) => (
                  <li key={service}>
                    <button
                      type="button"
                      onClick={() => scrollToSection('services')}
                      className="text-left text-sm text-bone/66 transition-colors hover:text-bone"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 lg:col-start-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/48">Get in touch</p>
              <a
                href="mailto:webnovat3ch@gmail.com"
                className="link-line mt-5 inline-flex items-center gap-1.5 text-sm text-bone/78 transition-colors hover:text-royal"
              >
                webnovat3ch@gmail.com
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
              <a
                href="tel:+254718885175"
                className="link-line mt-2 flex w-fit items-center gap-1.5 text-sm text-bone/78 transition-colors hover:text-royal"
              >
                +254 718 885 175
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
              <p className="mt-2 text-sm text-bone/55">Nairobi time — {time || '00:00'}</p>

              <div className="mt-7 flex gap-2">
                {socials.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-bone/70 transition-colors hover:border-royal hover:text-royal"
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 sm:mt-16">
          <button
            type="button"
            onClick={scrollToTop}
            className="group block w-full text-left"
            aria-label="Webnova — back to top"
          >
            <span className="chrome-text block font-display text-[min(11.2vw,12.5rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.065em] transition-opacity duration-700 group-hover:opacity-55">
              Webnova
            </span>
          </button>
        </div>

        <div className="mt-7 flex flex-col gap-4 border-t border-white/10 py-6 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/48 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Webnova Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Design &amp; build in-house</span>
            <span className="hidden h-px w-6 bg-white/15 sm:block" />
            <span>Est. 2026</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-bone/75 transition-colors hover:text-royal"
            >
              Back to top
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/15 transition-colors group-hover:border-royal">
                <ArrowUp className="h-3 w-3" strokeWidth={1.5} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
