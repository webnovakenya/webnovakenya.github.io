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
        }).format(new Date()),
      )
    }

    update()
    const interval = setInterval(update, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <Marquee
        dark
        items={['Let’s build something remarkable', 'Say hello', 'Open for enquiries']}
        duration={36}
      />

      <div className="mx-auto w-full max-w-[1680px] px-4 pt-16 sm:px-8 sm:pt-20">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Logo variant="full" height="h-12 sm:h-14" />
              <p className="mt-6 max-w-sm text-base leading-relaxed text-bone/80">
                An independent digital studio designing and building the internet&apos;s more memorable
                corners. Strategy, design and engineering — under one roof.
              </p>
              <div className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/72">
                <span className="h-1.5 w-1.5 rounded-full bg-royal" />
                Open for enquiries
              </div>
            </div>

            <div className="lg:col-span-2 lg:col-start-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70">Navigate</p>
              <ul className="mt-5 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className="link-line text-sm text-bone/72 transition-colors hover:text-bone"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 lg:col-start-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70">Services</p>
              <ul className="mt-5 space-y-2.5">
                {serviceLinks.map((service) => (
                  <li key={service}>
                    <button
                      type="button"
                      onClick={() => scrollToSection('services')}
                      className="text-left text-sm text-bone/72 transition-colors hover:text-bone"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 lg:col-start-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70">Get in touch</p>
              <a
                href="mailto:webnovat3ch@gmail.com"
                className="link-line mt-5 inline-flex items-center gap-1.5 text-sm text-bone/70 transition-colors hover:text-royal"
              >
                webnovat3ch@gmail.com
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
              <a
                href="tel:+254718885175"
                className="link-line mt-2 flex w-fit items-center gap-1.5 text-sm text-bone/70 transition-colors hover:text-royal"
              >
                +254 718885175
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
              <p className="mt-2 text-sm text-bone/75">Worldwide services</p>

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
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-bone/80 transition-colors hover:border-royal hover:text-royal"
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 border-t border-white/10 pt-6 sm:mt-20">
          <button
            type="button"
            onClick={scrollToTop}
            className="group block w-full text-left"
            aria-label="Webnova — back to top"
          >
            <span className="block font-display text-[min(10.4vw,11.5rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.065em] text-bone transition-colors duration-700 group-hover:text-royal">
              Webnova
            </span>
          </button>
        </div>

        <div className="mt-7 flex flex-col gap-4 border-t border-white/10 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Webnova Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Your local time — {time || '00:00'}</span>
            <span className="hidden h-px w-6 bg-white/15 sm:block" />
            <span>Design &amp; build in-house</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-bone/80 transition-colors hover:text-royal"
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
