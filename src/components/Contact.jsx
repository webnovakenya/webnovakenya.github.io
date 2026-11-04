import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  Code2,
  LayoutTemplate,
  Loader2,
  ShoppingBag,
  Wrench,
} from 'lucide-react'
import { DribbbleIcon, InstagramIcon, LinkedinIcon, XIcon } from './SocialIcons'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import { EASE } from '../lib/motion'
import { scrollToSection } from '../lib/scroll'
import { CONTACT_INTENT_EVENT } from '../lib/contactIntent'

const FORM_ENDPOINT = ''
const CONTACT_EMAIL = 'webnovat3ch@gmail.com'

const services = [
  {
    value: 'Business Website',
    icon: Briefcase,
    description: 'A credible digital home for your company, practice or consultancy.',
  },
  {
    value: 'Online Store',
    icon: ShoppingBag,
    description: 'A considered storefront built around products people want to buy.',
  },
  {
    value: 'Custom Web App',
    icon: Code2,
    description: 'A tailored tool, dashboard or platform built around how you work.',
  },
  {
    value: 'Portfolio / Landing Page',
    icon: LayoutTemplate,
    description: 'A focused place to show your work, launch an idea or tell one story well.',
  },
  {
    value: 'Website Management / Maintenance',
    icon: Wrench,
    description: 'Ongoing care, content updates and technical support for an existing site.',
    wide: true,
  },
]

const budgets = ['Ksh 20k — 50k', 'Ksh 50k — 100k', 'Ksh 100k — 250k', 'Ksh 250k — 500k', 'Ksh 500k+']
const timelines = ['As soon as possible', '2 — 4 weeks', '1 — 2 months', 'Flexible / exploring']

const steps = ['Brief', 'Scope', 'Details']

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: LinkedinIcon },
  { label: 'Dribbble', href: 'https://dribbble.com', icon: DribbbleIcon },
  { label: 'X / Twitter', href: 'https://x.com', icon: XIcon },
]

const emptyForm = {
  service: '',
  budget: 'Ksh 100k — 250k',
  timeline: '',
  name: '',
  email: '',
  message: '',
  website: '',
}

function Field({ label, name, type = 'text', value, onChange, placeholder, error, required, textarea = false, autoComplete }) {
  const id = `field-${name}`
  const errorId = `${id}-error`
  const inputClasses = `form-field mt-2 ${error ? 'border-rust/70' : ''}`

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/78">
          {label}
          {required && <span className="ml-1 text-royal">*</span>}
        </label>
        {error && (
          <span id={errorId} role="alert" className="font-mono text-[10px] uppercase tracking-[0.1em] text-rust">
            {error}
          </span>
        )}
      </div>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputClasses} resize-none`}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
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
          autoComplete={autoComplete}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      )}
    </div>
  )
}

export default function Contact() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [delivery, setDelivery] = useState(null)
  const [submitError, setSubmitError] = useState('')
  const reduceMotion = useReducedMotion() ?? false
  const stepHeadingRef = useRef(null)
  const successHeadingRef = useRef(null)
  const shouldFocusStep = useRef(false)
  const intentFocusTimeout = useRef(null)

  useEffect(() => {
    const onContactIntent = (event) => {
      const service = event.detail?.service
      if (!services.some((item) => item.value === service)) return

      setForm((current) => ({ ...current, service }))
      setErrors((current) => ({ ...current, service: undefined }))
      setStatus('idle')
      setDelivery(null)
      setSubmitError('')
      setStep(0)
      window.clearTimeout(intentFocusTimeout.current)
      intentFocusTimeout.current = window.setTimeout(
        () => stepHeadingRef.current?.focus({ preventScroll: true }),
        520,
      )
    }

    window.addEventListener(CONTACT_INTENT_EVENT, onContactIntent)
    return () => {
      window.removeEventListener(CONTACT_INTENT_EVENT, onContactIntent)
      window.clearTimeout(intentFocusTimeout.current)
    }
  }, [])

  useEffect(() => {
    if (!shouldFocusStep.current) return undefined
    shouldFocusStep.current = false
    const timeout = window.setTimeout(
      () => stepHeadingRef.current?.focus(),
      reduceMotion ? 60 : 320,
    )
    return () => window.clearTimeout(timeout)
  }, [step, reduceMotion])

  const getStepErrors = (targetStep) => {
    const nextErrors = {}

    if (targetStep === 0 && !form.service) {
      nextErrors.service = 'Choose the closest fit'
    }

    if (targetStep === 1) {
      if (!form.budget) nextErrors.budget = 'Choose a range'
      if (!form.timeline) nextErrors.timeline = 'Choose a timeline'
    }

    if (targetStep === 2) {
      if (!form.name.trim()) nextErrors.name = 'Required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Valid email required'
      if (form.message.trim().length < 10) nextErrors.message = 'A little more detail'
    }

    return nextErrors
  }

  const validateStep = (targetStep) => {
    const nextErrors = getStepErrors(targetStep)
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setSubmitError('')
  }

  const choose = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setSubmitError('')
  }

  const goNext = () => {
    if (!validateStep(step)) return
    shouldFocusStep.current = true
    setStep((current) => Math.min(current + 1, 2))
  }

  const goBack = () => {
    shouldFocusStep.current = true
    setErrors({})
    setSubmitError('')
    setStep((current) => Math.max(current - 1, 0))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return

    if (!validateStep(2)) return

    if (form.website.trim()) {
      setDelivery('api')
      setStatus('sent')
      return
    }

    setStatus('sending')
    setSubmitError('')

    const payload = {
      name: form.name,
      email: form.email,
      service: form.service,
      budget: form.budget,
      timeline: form.timeline,
      message: form.message,
      _subject: `New project enquiry — ${form.service}`,
      source: 'webnovakenya.github.io',
    }

    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) throw new Error('Enquiry failed')
        setDelivery('api')
        setStatus('sent')
        return
      }

      const subject = encodeURIComponent(`New project enquiry — ${form.service}`)
      const body = encodeURIComponent(
        [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Service: ${form.service}`,
          `Budget: ${form.budget}`,
          `Timeline: ${form.timeline}`,
          '',
          form.message,
        ].join('\n'),
      )
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
      setDelivery('email')
      setStatus('sent')
    } catch {
      setStatus('error')
      setSubmitError(`The form could not send just now. Please email ${CONTACT_EMAIL} directly.`)
    }
  }

  const reset = () => {
    shouldFocusStep.current = true
    setForm(emptyForm)
    setErrors({})
    setStatus('idle')
    setDelivery(null)
    setSubmitError('')
    setStep(0)
  }

  const progress = status === 'sent' ? 3 : step + 1

  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-24 text-ink sm:py-32 lg:py-40">
      <span
        className="pointer-events-none absolute -bottom-10 left-0 hidden select-none font-display text-[19vw] font-bold uppercase leading-none tracking-[-0.07em] text-ink/[0.028] lg:block"
        aria-hidden="true"
      >
        Let&apos;s talk
      </span>
      <div className="pointer-events-none absolute inset-0 paper-grid" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-royal/[0.07] blur-[130px]"
        aria-hidden="true"
      />

      <div className="section-frame relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-5">
          <Eyebrow index="05" onLight>
            Contact
          </Eyebrow>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
            <span className="h-1.5 w-1.5 rounded-full bg-royal" />
            Open for select projects
          </span>
        </div>

        <div className="mt-14 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <SplitHeading
                lines={["Let's make", 'something', 'remarkable.']}
                lineClassNames={['', '', 'text-rust']}
                className="font-display text-[clamp(2.45rem,4.4vw,4.6rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em]"
              />
              <p className="mt-7 max-w-sm text-[15px] leading-[1.8] text-ink/70 sm:text-base">
                Tell us what you&apos;re building, where you want to take it and what&apos;s getting in
                the way. We&apos;ll come back with a considered response — not a sales pitch.
              </p>

              <div className="mt-10 border-t border-ink/15 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  Prefer email?
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="link-line mt-3 flex w-fit items-center gap-2 font-heading text-xl font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-royal sm:text-2xl"
                >
                  {CONTACT_EMAIL}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <a
                  href="tel:+254718885175"
                  className="link-line mt-4 flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-ink/60 transition-colors hover:text-royal"
                >
                  +254 718 885 175
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[9px] uppercase tracking-[0.15em] text-ink/55">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-royal" />
                  Open for enquiries
                </span>
                <span>Nairobi / Worldwide</span>
                <span>Reply within 24h</span>
              </div>

              <div className="mt-10">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55">Elsewhere</p>
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
                        className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 text-ink/62 transition-colors hover:border-royal hover:text-royal"
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </a>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          <div id="project-enquiry" className="min-w-0 scroll-mt-28 lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[1.6rem] border border-ink/20 bg-ink p-5 text-bone shadow-[0_35px_90px_rgba(8,10,15,0.24)] sm:p-8">
                <div
                  className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-royal/16 blur-[90px]"
                  aria-hidden="true"
                />
                <AnimatePresence mode="wait" initial={false}>
                  {status === 'sent' ? (
                    <motion.div
                      key="success"
                      className="flex min-h-[610px] flex-col justify-between"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                      onAnimationComplete={() => successHeadingRef.current?.focus()}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/72">
                            {delivery === 'email' ? 'Brief prepared' : 'Enquiry received'}
                          </span>
                          <motion.span
                            className="grid h-10 w-10 place-items-center rounded-full bg-royal text-ink"
                            initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                          >
                            <Check className="h-4 w-4" strokeWidth={2.25} />
                          </motion.span>
                        </div>

                        <h3
                          ref={successHeadingRef}
                          tabIndex={-1}
                          className="mt-16 font-display text-4xl font-bold uppercase leading-[0.92] tracking-[-0.04em] outline-none sm:text-5xl"
                        >
                          Thank you,
                          <br />
                          {form.name.split(' ')[0] || 'friend'}.
                        </h3>
                        <p className="mt-5 max-w-sm text-base leading-relaxed text-bone/72">
                          {delivery === 'email' ? (
                            <>
                              Your email app is opening with the brief ready to send. If it doesn&apos;t
                              open, email{' '}
                              <a href={`mailto:${CONTACT_EMAIL}`} className="link-line text-bone">
                                {CONTACT_EMAIL}
                              </a>{' '}
                              directly.
                            </>
                          ) : (
                            <>
                              Your message is in. We&apos;ll read it properly and get back to you within
                              one business day — usually sooner.
                            </>
                          )}
                        </p>

                        <div className="mt-8 border-t border-white/10 pt-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-bone/72">
                          <p>{form.service}</p>
                          <p className="mt-1">{form.budget}</p>
                          <p className="mt-1">{form.timeline}</p>
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
                      className="flex min-h-[610px] flex-col"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: reduceMotion ? 0 : 0.35 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/72">
                          Project enquiry
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/42">
                          Step {step + 1} of 3
                        </span>
                      </div>

                      <div
                        className="mt-4 h-[2px] overflow-hidden bg-white/10"
                        role="progressbar"
                        aria-label="Project enquiry progress"
                        aria-valuemin={1}
                        aria-valuemax={3}
                        aria-valuenow={step + 1}
                      >
                        <motion.div
                          className="h-full origin-left bg-royal"
                          animate={{ scaleX: progress / 3 }}
                          transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                        />
                      </div>

                      <div className="mt-2.5 flex justify-between font-mono text-[9px] uppercase tracking-[0.13em] text-bone/32">
                        {steps.map((label, index) => (
                          <span key={label} className={index <= step ? 'text-bone/72' : ''}>
                            {label}
                          </span>
                        ))}
                      </div>

                      <div className="relative mt-7 flex-1">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={step}
                            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
                            transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
                            role="group"
                            aria-labelledby="contact-step-heading"
                            className="min-h-[420px]"
                          >
                            {step === 0 && (
                              <>
                                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-royal">
                                  The brief
                                </p>
                                <h3
                                  ref={stepHeadingRef}
                                  id="contact-step-heading"
                                  tabIndex={-1}
                                  className="mt-2 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] font-bold uppercase leading-[0.94] tracking-[-0.04em] outline-none"
                                >
                                  What do you need?
                                </h3>
                                <p className="mt-3 max-w-md text-[13.5px] leading-[1.7] text-bone/64">
                                  Pick the closest fit. We can shape the exact scope together later.
                                </p>

                                <fieldset
                                  className="mt-6"
                                  aria-describedby={errors.service ? 'service-error' : undefined}
                                >
                                  <legend className="sr-only">Project type</legend>
                                  <div className="grid gap-2 sm:grid-cols-2">
                                    {services.map((service) => {
                                      const Icon = service.icon
                                      const selected = form.service === service.value
                                      return (
                                        <button
                                          key={service.value}
                                          type="button"
                                          onClick={() => choose('service', service.value)}
                                          aria-pressed={selected}
                                          className={`group flex min-h-[124px] flex-col justify-between rounded-xl border p-4 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal ${
                                            selected
                                              ? 'border-royal bg-royal/12'
                                              : 'border-white/12 bg-white/[0.02] hover:border-white/30'
                                          } ${service.wide ? 'sm:col-span-2' : ''}`}
                                        >
                                          <span className="flex w-full items-start justify-between">
                                            <span
                                              className={`grid h-8 w-8 place-items-center rounded-lg border transition-colors ${
                                                selected
                                                  ? 'border-royal/50 text-royal'
                                                  : 'border-white/12 text-bone/48 group-hover:text-bone/70'
                                              }`}
                                            >
                                              <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                                            </span>
                                            <span
                                              className={`grid h-4 w-4 place-items-center rounded-full border ${
                                                selected ? 'border-royal bg-royal text-ink' : 'border-white/15'
                                              }`}
                                            >
                                              {selected && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                                            </span>
                                          </span>
                                          <span className="mt-3 block">
                                            <span className="block text-[13.5px] font-medium leading-snug text-bone">
                                              {service.value}
                                            </span>
                                            <span className="mt-1 block text-[11.5px] leading-[1.55] text-bone/55">
                                              {service.description}
                                            </span>
                                          </span>
                                        </button>
                                      )
                                    })}
                                  </div>
                                </fieldset>
                                {errors.service && (
                                  <p
                                    id="service-error"
                                    role="alert"
                                    className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-rust"
                                  >
                                    {errors.service}
                                  </p>
                                )}
                              </>
                            )}

                            {step === 1 && (
                              <>
                                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-royal">
                                  The shape
                                </p>
                                <h3
                                  ref={stepHeadingRef}
                                  id="contact-step-heading"
                                  tabIndex={-1}
                                  className="mt-2 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] font-bold uppercase leading-[0.94] tracking-[-0.04em] outline-none"
                                >
                                  Scope &amp; timing.
                                </h3>
                                <p className="mt-3 max-w-md text-[13.5px] leading-[1.7] text-bone/64">
                                  A rough range helps us suggest the right approach. Nothing is locked in.
                                </p>

                                <fieldset
                                  className="mt-7"
                                  aria-describedby={errors.budget ? 'budget-error' : undefined}
                                >
                                  <legend className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/55">
                                    Budget range <span className="text-royal">*</span>
                                  </legend>
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {budgets.map((budget) => (
                                      <button
                                        key={budget}
                                        type="button"
                                        onClick={() => choose('budget', budget)}
                                        aria-pressed={form.budget === budget}
                                        className={`rounded-full border px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal ${
                                          form.budget === budget
                                            ? 'border-royal bg-royal text-ink'
                                            : 'border-white/15 text-bone/72 hover:border-white/35 hover:text-bone'
                                        }`}
                                      >
                                        {budget}
                                      </button>
                                    ))}
                                  </div>
                                </fieldset>
                                {errors.budget && (
                                  <p
                                    id="budget-error"
                                    role="alert"
                                    className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-rust"
                                  >
                                    {errors.budget}
                                  </p>
                                )}

                                <fieldset
                                  className="mt-7"
                                  aria-describedby={errors.timeline ? 'timeline-error' : undefined}
                                >
                                  <legend className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/55">
                                    Ideal timeline <span className="text-royal">*</span>
                                  </legend>
                                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                    {timelines.map((timeline) => (
                                      <button
                                        key={timeline}
                                        type="button"
                                        onClick={() => choose('timeline', timeline)}
                                        aria-pressed={form.timeline === timeline}
                                        className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left font-mono text-[10px] uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal ${
                                          form.timeline === timeline
                                            ? 'border-royal bg-royal/10 text-bone'
                                            : 'border-white/12 text-bone/62 hover:border-white/30 hover:text-bone'
                                        }`}
                                      >
                                        {timeline}
                                        <span
                                          className={`h-2 w-2 rounded-full ${
                                            form.timeline === timeline ? 'bg-royal' : 'bg-white/10'
                                          }`}
                                        />
                                      </button>
                                    ))}
                                  </div>
                                </fieldset>
                                {errors.timeline && (
                                  <p
                                    id="timeline-error"
                                    role="alert"
                                    className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-rust"
                                  >
                                    {errors.timeline}
                                  </p>
                                )}
                              </>
                            )}

                            {step === 2 && (
                              <>
                                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-royal">
                                  The details
                                </p>
                                <h3
                                  ref={stepHeadingRef}
                                  id="contact-step-heading"
                                  tabIndex={-1}
                                  className="mt-2 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] font-bold uppercase leading-[0.94] tracking-[-0.04em] outline-none"
                                >
                                  Bring us into the picture.
                                </h3>
                                <p className="mt-3 max-w-md text-[13.5px] leading-[1.7] text-bone/64">
                                  A few lines is enough. We&apos;ll ask anything else we need by email.
                                </p>

                                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                  <Field
                                    label="Your name"
                                    name="name"
                                    value={form.name}
                                    onChange={update}
                                    placeholder="Jane Smith"
                                    error={errors.name}
                                    required
                                    autoComplete="name"
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
                                    autoComplete="email"
                                  />
                                </div>

                                <div className="mt-5">
                                  <Field
                                    label="Tell us about the project"
                                    name="message"
                                    value={form.message}
                                    onChange={update}
                                    placeholder="What are you building, and what should it achieve?"
                                    error={errors.message}
                                    required
                                    textarea
                                  />
                                </div>

                                <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                                  <label htmlFor="field-website">Website</label>
                                  <input
                                    id="field-website"
                                    name="website"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={form.website}
                                    onChange={update}
                                  />
                                </div>

                                {submitError && (
                                  <p
                                    role="alert"
                                    className="mt-5 border border-rust/30 bg-rust/10 p-3 text-sm leading-relaxed text-bone/80"
                                  >
                                    {submitError}
                                  </p>
                                )}
                              </>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        {step > 0 ? (
                          <button
                            type="button"
                            onClick={goBack}
                            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/55 transition-colors hover:text-bone"
                          >
                            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                            Back
                          </button>
                        ) : (
                          <p className="max-w-[190px] font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-bone/55">
                             No spam. No newsletters. Just a considered reply from a human.
                          </p>
                        )}

                        <button
                          type={step === 2 ? 'submit' : 'button'}
                          onClick={step === 2 ? undefined : goNext}
                          disabled={status === 'sending'}
                          className="group inline-flex items-center justify-center gap-3 rounded-full bg-royal px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone disabled:cursor-wait disabled:opacity-60"
                        >
                          {status === 'sending' ? (
                            <>
                              Sending
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              {step === 2 ? 'Send enquiry' : 'Continue'}
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </>
                          )}
                        </button>
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
