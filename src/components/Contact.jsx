import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { DribbbleIcon, InstagramIcon, LinkedinIcon, XIcon } from './SocialIcons'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import Magnetic from './Magnetic'
import { EASE } from '../lib/motion'
import { scrollToSection } from '../lib/scroll'

const projectTypes = ['Business site', 'E-commerce', 'Booking system', 'Portfolio', 'Custom app', 'Not sure yet']
const budgets = ['Ksh 20k — 50k', 'Ksh 50k — 100k', 'Ksh 100k — 250k', 'Ksh 250k — 500k', 'Ksh 500k+']

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: LinkedinIcon },
  { label: 'Dribbble', href: 'https://dribbble.com', icon: DribbbleIcon },
  { label: 'X / Twitter', href: 'https://x.com', icon: XIcon },
]

function Field({ label, name, type = 'text', value, onChange, placeholder, error, required, textarea = false }) {
  const id = `field-${name}`
  const inputClasses = `form-field mt-2 ${error ? 'border-rust/70' : ''}`

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/75">
          {label}
          {required && <span className="ml-1 text-royal">*</span>}
        </label>
        {error && <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-rust">{error}</span>}
      </div>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={3}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClasses}
          autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : 'organization'}
        />
      )}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    type: 'Business site',
    budget: 'Ksh 100k — 250k',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const timeoutRef = useRef(null)

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [],
  )

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Valid email required'
    if (form.message.trim().length < 10) nextErrors.message = 'A little more detail'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('sending')
    timeoutRef.current = setTimeout(() => setStatus('sent'), 900)
  }

  const reset = () => {
    setForm({
      name: '',
      email: '',
      company: '',
      type: 'Business site',
      budget: 'Ksh 100k — 250k',
      message: '',
    })
    setErrors({})
    setStatus('idle')
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-bone sm:py-32">
      <span
        className="pointer-events-none absolute -bottom-8 left-0 hidden select-none font-display text-[21vw] font-extrabold leading-none tracking-[-0.07em] text-white/[0.013] lg:block"
        aria-hidden="true"
      >
        LET&apos;S TALK
      </span>
      <div
        className="animate-drift pointer-events-none absolute -inset-[8%]"
        style={{
          background:
            'radial-gradient(ellipse 50% 55% at 20% 20%, rgba(79,111,255,0.1), transparent 60%), radial-gradient(ellipse 45% 45% at 90% 80%, rgba(108,92,255,0.08), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index="06">Contact</Eyebrow>
              <SplitHeading
                lines={["Let's make", 'something', 'remarkable.']}
                lineClassNames={['', '', 'text-rust']}
                className="mt-6 font-heading text-[clamp(2.8rem,5.5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.055em]"
              />
              <p className="mt-6 max-w-sm text-base leading-relaxed text-bone/70 sm:text-base">
                Tell us what you&apos;re building, where you want to take it and what&apos;s getting in
                the way. We&apos;ll come back with a considered response — not a sales pitch.
              </p>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/72">
                  Prefer email?
                </p>
                <a
                  href="mailto:webnovat3ch@gmail.com"
                  className="link-line mt-3 flex w-fit items-center gap-2 font-heading text-xl font-semibold tracking-[-0.02em] text-bone transition-colors hover:text-royal sm:text-2xl"
                >
                  webnovat3ch@gmail.com
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <a
                  href="tel:+254718885175"
                  className="link-line mt-4 flex w-fit items-center gap-2 font-mono text-sm uppercase tracking-[0.12em] text-bone/72 transition-colors hover:text-royal"
                >
                  +254 718885175
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/72">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-royal" />
                  Open for enquiries
                </span>
                <span>Worldwide services</span>
                <span>Replies within 24h</span>
              </div>

              <div className="mt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70">Elsewhere</p>
                <div className="mt-4 flex gap-2">
                  {socials.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-bone/72 transition-colors hover:border-royal hover:text-royal"
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </a>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <div className="relative border border-white/10 bg-white/[0.02] p-5 sm:p-8">
                <AnimatePresence mode="wait">
                  {status === 'sent' ? (
                    <motion.div
                      key="success"
                      className="flex min-h-[520px] flex-col justify-between"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/72">
                            Enquiry received
                          </span>
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-royal text-ink">
                            <Check className="h-4 w-4" strokeWidth={2.25} />
                          </span>
                        </div>

                        <h3 className="mt-16 font-heading text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                          Thank you,
                          <br />
                          {form.name.split(' ')[0] || 'friend'}.
                        </h3>
                        <p className="mt-5 max-w-sm text-base leading-relaxed text-bone/72">
                          Your message is in. We&apos;ll read it properly and get back to you within one
                          business day — usually sooner.
                        </p>

                        <div className="mt-8 border-t border-white/10 pt-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-bone/72">
                          <p>{form.type}</p>
                          <p className="mt-1">{form.budget}</p>
                        </div>
                      </div>

                      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <button
                          type="button"
                          onClick={reset}
                          className="text-[12px] font-semibold uppercase tracking-[0.14em] text-bone/75 transition-colors hover:text-royal"
                        >
                          Send another enquiry
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollToSection('work')}
                          className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-bone/75 transition-colors hover:text-royal"
                        >
                          Explore our work
                          <ArrowUpRight
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            strokeWidth={1.5}
                          />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/72">
                          Start a project
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/20">
                          * Required
                        </span>
                      </div>

                      <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        <Field
                          label="Your name"
                          name="name"
                          value={form.name}
                          onChange={update}
                          placeholder="Jane Smith"
                          error={errors.name}
                          required
                        />
                        <Field
                          label="Email address"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={update}
                          placeholder="jane@company.com"
                          error={errors.email}
                          required
                        />
                      </div>

                      <div className="mt-6">
                        <Field
                          label="Company / organisation"
                          name="company"
                          value={form.company}
                          onChange={update}
                          placeholder="Optional"
                        />
                      </div>

                      <fieldset className="mt-7">
                        <legend className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/75">
                          Project type
                        </legend>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {projectTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setForm((current) => ({ ...current, type }))}
                              aria-pressed={form.type === type}
                              className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                                form.type === type
                                  ? 'border-royal bg-royal text-ink'
                                  : 'border-white/15 text-bone/80 hover:border-white/35 hover:text-bone'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <fieldset className="mt-6">
                        <legend className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/75">
                          Budget range
                        </legend>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {budgets.map((budget) => (
                            <button
                              key={budget}
                              type="button"
                              onClick={() => setForm((current) => ({ ...current, budget }))}
                              aria-pressed={form.budget === budget}
                              className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                                form.budget === budget
                                  ? 'border-royal bg-royal text-ink'
                                  : 'border-white/15 text-bone/80 hover:border-white/35 hover:text-bone'
                              }`}
                            >
                              {budget}
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <div className="mt-7">
                        <Field
                          label="Tell us about the project"
                          name="message"
                          value={form.message}
                          onChange={update}
                          placeholder="A few lines about what you're building..."
                          error={errors.message}
                          required
                          textarea
                        />
                      </div>

                      <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-[190px] font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-bone/70">
                          No spam. No newsletters. Just a reply from a human.
                        </p>
                        <Magnetic strength={0.2}>
                          <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="group inline-flex items-center gap-3 rounded-full bg-royal px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone disabled:cursor-wait disabled:opacity-60"
                          >
                            {status === 'sending' ? 'Sending...' : 'Send enquiry'}
                            <ArrowUpRight
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              strokeWidth={2}
                            />
                          </button>
                        </Magnetic>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
