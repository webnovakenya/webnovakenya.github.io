import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Leaf,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react'
import { EASE } from '../../lib/motion'

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" }

const products = [
  {
    id: 'quiet-cleanse',
    name: 'Quiet Cleanse',
    subtitle: 'Gel-to-milk cleanser',
    price: 38,
    category: 'Skin',
    notes: 'Chamomile · Oat',
    size: '120 ml',
    badge: 'Bestseller',
    description:
      'A low-foam gel that melts into a soft milk, lifting the day without stripping the skin. Formulated with cold-pressed chamomile and colloidal oat.',
    ingredients: ['Chamomile extract', 'Colloidal oat', 'Glycerin', 'Aloe leaf'],
    tone: {
      bg: '#dfe6d8',
      glow: '#f4f7ee',
      line: '#b7c6aa',
      bottle: '#7e9475',
      cap: '#4c6047',
      labelLine: '#3d523a',
      labelText: '#f7f3e8',
      leaf: '#adc09e',
    },
    shape: 'bottle',
  },
  {
    id: 'dew-balm',
    name: 'Dew Balm',
    subtitle: 'Barrier recovery balm',
    price: 46,
    category: 'Skin',
    notes: 'Calendula · Shea',
    size: '60 ml',
    badge: 'New',
    description:
      'A cushioning balm for thirsty, reactive skin. Calendula and shea soften on contact while a breathable barrier seals in water without heaviness.',
    ingredients: ['Calendula', 'Shea butter', 'Squalane', 'Jojoba'],
    tone: {
      bg: '#eadbd0',
      glow: '#fbf1e8',
      line: '#d8beae',
      bottle: '#c28e6f',
      cap: '#885540',
      labelLine: '#6d4433',
      labelText: '#fff8ef',
      leaf: '#d7b39d',
    },
    shape: 'jar',
  },
  {
    id: 'night-bloom',
    name: 'Night Bloom',
    subtitle: 'Restoring facial oil',
    price: 58,
    category: 'Ritual',
    notes: 'Rosehip · Neroli',
    size: '30 ml',
    badge: '',
    description:
      'A slow, weightless oil that works overnight. Rosehip supports renewal, neroli calms the senses and sea buckthorn leaves skin with a soft, lit-from-within finish.',
    ingredients: ['Rosehip seed', 'Neroli', 'Sea buckthorn', 'Vitamin E'],
    tone: {
      bg: '#d8dfd3',
      glow: '#eef2e8',
      line: '#b4c0ad',
      bottle: '#2f4a3d',
      cap: '#1a2b23',
      labelLine: '#d7cbb5',
      labelText: '#f6f0e2',
      leaf: '#9cb09a',
    },
    shape: 'dropper',
  },
  {
    id: 'soft-clay',
    name: 'Soft Clay',
    subtitle: 'Mineral renewal mask',
    price: 42,
    category: 'Skin',
    notes: 'Kaolin · Aloe',
    size: '75 ml',
    badge: '',
    description:
      'A gentle mineral mask that clears without drying. Fine kaolin lifts congestion while aloe and oat keep the skin comfortable and calm.',
    ingredients: ['White kaolin', 'Aloe leaf', 'Oat milk', 'Green tea'],
    tone: {
      bg: '#eddcd5',
      glow: '#fbefea',
      line: '#ddc3b9',
      bottle: '#b77c65',
      cap: '#7d4f40',
      labelLine: '#f0e5dc',
      labelText: '#4d352c',
      leaf: '#d7ab98',
    },
    shape: 'jar',
  },
  {
    id: 'body-veil',
    name: 'Body Veil',
    subtitle: 'Silken body lotion',
    price: 34,
    category: 'Body',
    notes: 'Vetiver · Oat',
    size: '250 ml',
    badge: '',
    description:
      'A fast-absorbing body lotion with a quiet, grounding scent. Oat and squalane leave a soft veil that lasts without a trace of grease.',
    ingredients: ['Colloidal oat', 'Squalane', 'Vetiver', 'Bisabolol'],
    tone: {
      bg: '#e7e0cf',
      glow: '#f7f2e5',
      line: '#d0c5aa',
      bottle: '#b9a37d',
      cap: '#76654b',
      labelLine: '#5f513c',
      labelText: '#fff9ec',
      leaf: '#cdbb95',
    },
    shape: 'tube',
  },
  {
    id: 'bath-ritual',
    name: 'Bath Ritual',
    subtitle: 'Mineral soak',
    price: 28,
    category: 'Body',
    notes: 'Eucalyptus · Sea salt',
    size: '300 g',
    badge: '',
    description:
      'A mineral-rich soak for the end of the day. Eucalyptus opens the breath, while magnesium and sea salt ease tired limbs.',
    ingredients: ['Magnesium salt', 'Eucalyptus', 'Kelp', 'Lavender'],
    tone: {
      bg: '#dbe2df',
      glow: '#eef4f1',
      line: '#b9c7c2',
      bottle: '#6f8b83',
      cap: '#3e5751',
      labelLine: '#eef4ef',
      labelText: '#334d47',
      leaf: '#a5bdb5',
    },
    shape: 'jar',
  },
]

const categories = ['All', 'Skin', 'Body', 'Ritual']

const trust = ['Cold-pressed botanicals', 'Vegan & cruelty-free', 'Dermatologist tested']

function scrollInto(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  })
}

function ProductArt({ product, large = false, className = '' }) {
  const tone = product.tone
  const isJar = product.shape === 'jar'
  const isTube = product.shape === 'tube'
  const isDropper = product.shape === 'dropper'
  const width = isJar ? '48%' : isTube ? '23%' : isDropper ? '27%' : '31%'
  const height = isJar ? '35%' : isTube ? '58%' : isDropper ? '44%' : '55%'
  const bodyRadius = isJar
    ? '0.6rem 0.6rem 1.1rem 1.1rem'
    : isTube
      ? '46% 46% 0.5rem 0.5rem'
      : isDropper
        ? '0.5rem 0.5rem 0.8rem 0.8rem'
        : '42% 42% 0.8rem 0.8rem'

  return (
    <div className={`relative overflow-hidden ${className || 'aspect-[4/5]'}`} style={{ backgroundColor: tone.bg }}>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 34%, ${tone.glow} 0%, transparent 66%)` }}
      />
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: tone.line }}
      />
      <div
        className="absolute -left-8 top-[18%] h-[38%] w-[32%] rotate-[-24deg] opacity-70"
        style={{ background: tone.leaf, borderRadius: '100% 0 100% 0' }}
      />
      <div
        className="absolute -right-6 bottom-[22%] h-[26%] w-[24%] rotate-[36deg] opacity-60"
        style={{ background: tone.leaf, borderRadius: '0 100% 0 100%' }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: '16%', width, height }}
      >
        <div
          className="relative h-full w-full shadow-[0_24px_40px_-22px_rgba(23,59,49,0.5)]"
          style={{ background: tone.bottle, borderRadius: bodyRadius }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: isJar ? '-11%' : isDropper ? '-20%' : '-15%',
              width: isJar ? '108%' : isDropper ? '36%' : '42%',
              height: isJar ? '14%' : isDropper ? '22%' : '17%',
              background: tone.cap,
              borderRadius: isJar ? '0.35rem' : '0.15rem',
            }}
          />
          {isDropper && (
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: '-38%', width: '18%', height: '20%', background: '#1b211d', borderRadius: '0.1rem' }}
            />
          )}
          <div
            className="absolute inset-x-[15%] top-[35%] border-y px-1 py-2 text-center"
            style={{ borderColor: `${tone.labelLine}66`, color: tone.labelText }}
          >
            <p className="font-mono text-[5px] uppercase tracking-[0.24em]">Aurora</p>
            <p
              className={`mt-1 leading-[1.1] ${large ? 'text-[13px]' : 'text-[9px] sm:text-[10px]'}`}
              style={serif}
            >
              {product.name}
            </p>
            <p className="mt-1 font-mono text-[4px] uppercase tracking-[0.16em] opacity-70">Botanical skincare</p>
          </div>
        </div>
      </div>
      <span className="absolute left-3 top-3 font-mono text-[7px] uppercase tracking-[0.18em] text-[#173b31]/55">
        {product.notes}
      </span>
    </div>
  )
}

function IconButton({ children, label, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${className}`}
    >
      {children}
    </button>
  )
}

function CartLine({ item, onPlus, onMinus }) {
  return (
    <div className="flex gap-4 border-b border-[#173b31]/12 py-4">
      <ProductArt product={item.product} className="h-24 w-20 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold" style={serif}>
              {item.product.name}
            </p>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-[#173b31]/50">
              {item.product.size}
            </p>
          </div>
          <p className="text-[13px]">${item.product.price * item.qty}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-[#173b31]/20">
            <button
              type="button"
              onClick={() => onMinus(item.product.id)}
              className="grid h-7 w-7 place-items-center transition-colors hover:bg-[#173b31] hover:text-[#f4efe5]"
              aria-label={`Remove one ${item.product.name}`}
            >
              <Minus className="h-3 w-3" strokeWidth={1.7} />
            </button>
            <span className="w-7 text-center font-mono text-[10px]">{item.qty}</span>
            <button
              type="button"
              onClick={() => onPlus(item.product.id)}
              className="grid h-7 w-7 place-items-center transition-colors hover:bg-[#173b31] hover:text-[#f4efe5]"
              aria-label={`Add one ${item.product.name}`}
            >
              <Plus className="h-3 w-3" strokeWidth={1.7} />
            </button>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#173b31]/45">
            {item.product.category}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function AuroraDemo() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [detailQty, setDetailQty] = useState(1)
  const [checkedOut, setCheckedOut] = useState(false)
  const [toast, setToast] = useState('')
  const [email, setEmail] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const notify = (message) => setToast(message)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return products.filter((product) => {
      const inCategory = category === 'All' || product.category === category
      const inSearch =
        !term ||
        `${product.name} ${product.subtitle} ${product.notes} ${product.category}`.toLowerCase().includes(term)
      return inCategory && inSearch
    })
  }, [query, category])

  const cartItems = cart
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.id) }))
    .filter((item) => item.product)
  const cartCount = cart.reduce((total, item) => total + item.qty, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.qty, 0)

  const addToCart = (id, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === id)
      if (existing) {
        return current.map((item) => (item.id === id ? { ...item, qty: item.qty + quantity } : item))
      }
      return [...current, { id, qty: quantity }]
    })
    setCheckedOut(false)
    const product = products.find((item) => item.id === id)
    notify(`${product?.name ?? 'Product'} added to your bag.`)
  }

  const removeOne = (id) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    )
  }

  const addOne = (id) => {
    setCart((current) => current.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)))
  }

  const openProduct = (product) => {
    setSelectedProduct(product)
    setDetailQty(1)
    setCartOpen(false)
  }

  const openCart = () => {
    setCartOpen(true)
    setSelectedProduct(null)
  }

  const checkout = () => {
    if (!cart.length) return
    setCart([])
    setCheckedOut(true)
    notify('Demo order placed — no payment was taken.')
  }

  const focusSearch = () => {
    scrollInto('aurora-shop')
    window.setTimeout(() => searchRef.current?.focus(), 500)
  }

  const submitNewsletter = (event) => {
    event.preventDefault()
    if (!email.includes('@')) {
      notify('Please enter a valid email address.')
      return
    }
    setEmail('')
    notify('You are on the list. (Demo signup.)')
  }

  const ritualProducts = ['quiet-cleanse', 'soft-clay', 'night-bloom']
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean)

  return (
    <div className="min-h-full bg-[#f4efe5] text-[#173b31]" style={{ colorScheme: 'light' }}>
      <div className="bg-[#173b31] px-4 py-2 text-center font-mono text-[8px] uppercase tracking-[0.2em] text-[#f4efe5]/70 sm:text-[9px]">
        Complimentary shipping over $80 · 30-day returns · Made in small batches
      </div>

      <header className="sticky top-0 z-30 border-b border-[#173b31]/12 bg-[#f4efe5]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => scrollInto('aurora-top')}
            className="text-left"
            aria-label="Aurora home"
          >
            <span className="block font-display text-[17px] tracking-[0.34em] sm:text-[19px]">AURORA</span>
            <span className="mt-0.5 block font-mono text-[6px] uppercase tracking-[0.24em] text-[#173b31]/45">
              Botanical skincare
            </span>
          </button>

          <nav className="hidden items-center gap-7 text-[11px] font-medium tracking-[0.04em] md:flex" aria-label="Aurora">
            <button type="button" onClick={() => scrollInto('aurora-shop')} className="transition-opacity hover:opacity-50">
              Shop
            </button>
            <button type="button" onClick={() => scrollInto('aurora-ritual')} className="transition-opacity hover:opacity-50">
              Ritual
            </button>
            <button type="button" onClick={() => scrollInto('aurora-ingredients')} className="transition-opacity hover:opacity-50">
              Ingredients
            </button>
            <button type="button" onClick={() => scrollInto('aurora-about')} className="transition-opacity hover:opacity-50">
              About
            </button>
          </nav>

          <div className="flex items-center gap-1">
            <IconButton label="Search products" onClick={focusSearch} className="text-[#173b31] hover:bg-[#173b31]/8">
              <Search className="h-4 w-4" strokeWidth={1.6} />
            </IconButton>
            <button
              type="button"
              onClick={openCart}
              className="relative grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-[#173b31]/8"
              aria-label={`Open bag, ${cartCount} items`}
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#173b31] px-1 font-mono text-[7px] text-[#f4efe5]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <section id="aurora-top" className="scroll-mt-24">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 pb-14 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-20 lg:pt-20">
          <div className="lg:col-span-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#173b31]/55">
              Botanical skincare · Est. 2019
            </p>
            <h1
              className="mt-6 text-[clamp(3.6rem,7vw,6.4rem)] font-normal leading-[0.88] tracking-[-0.045em]"
              style={serif}
            >
              Quiet rituals
              <br />
              for <em className="text-[#4d725d]">awake</em> skin.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#173b31]/68">
              Considered formulas for skin that wants less, not more. Cold-pressed botanicals, clinical restraint and
              the quiet pleasure of a daily ritual.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => scrollInto('aurora-shop')}
                className="group inline-flex items-center gap-3 rounded-full bg-[#173b31] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f4efe5] transition-colors hover:bg-[#315d48]"
              >
                Shop the collection
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.7} />
              </button>
              <button
                type="button"
                onClick={() => scrollInto('aurora-ritual')}
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#173b31]/65 transition-colors hover:text-[#173b31]"
              >
                Our philosophy
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.7} />
              </button>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-1">
                {[0, 1, 2, 3, 4].map((star) => (
                  <span key={star} className="text-[11px] text-[#b27654]">
                    ★
                  </span>
                ))}
              </div>
              <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-[#173b31]/50">
                4.9 from 2,400+ rituals
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative mx-auto max-w-[560px]">
              <div
                className="relative overflow-hidden bg-[#dfe6d8]"
                style={{ borderRadius: '240px 240px 18px 18px' }}
              >
                <ProductArt product={products[0]} large className="aspect-[4/4.7]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#173b31]/12 to-transparent" />
              </div>
              <div className="absolute -right-2 top-[16%] border border-[#173b31]/15 bg-[#f4efe5]/92 px-4 py-3 shadow-sm backdrop-blur-sm sm:right-0 sm:px-5">
                <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-[#173b31]/45">Hero ingredient</p>
                <p className="mt-1 text-[15px]" style={serif}>
                  Calendula + Oat
                </p>
              </div>
              <div className="absolute -left-2 bottom-[14%] flex items-center gap-2 border border-[#173b31]/15 bg-[#f4efe5]/92 px-4 py-2.5 shadow-sm backdrop-blur-sm sm:-left-5">
                <Leaf className="h-3.5 w-3.5 text-[#4d725d]" strokeWidth={1.6} />
                <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-[#173b31]/60">pH balanced · vegan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-[#173b31]/12">
        <div className="mx-auto grid max-w-[1240px] gap-3 px-5 py-5 sm:grid-cols-3 sm:px-8">
          {trust.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <Check className="h-3.5 w-3.5 text-[#4d725d]" strokeWidth={1.8} />
              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#173b31]/58">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="aurora-shop" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#173b31]/50">The collection</p>
              <h2
                className="mt-3 text-[clamp(2.4rem,4.4vw,3.8rem)] font-normal leading-none tracking-[-0.04em]"
                style={serif}
              >
                Six quiet essentials.
              </h2>
            </div>
            <p className="max-w-sm text-[13px] leading-relaxed text-[#173b31]/60">
              Everything you need, nothing you do not. Each formula is made in small batches and designed to work
              together.
            </p>
          </div>

          <div className="mt-9 flex flex-col justify-between gap-5 border-y border-[#173b31]/12 py-4 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full border px-4 py-2 font-mono text-[8px] uppercase tracking-[0.15em] transition-colors ${
                    category === item
                      ? 'border-[#173b31] bg-[#173b31] text-[#f4efe5]'
                      : 'border-[#173b31]/20 text-[#173b31]/60 hover:border-[#173b31]/50'
                  }`}
                  aria-pressed={category === item}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="relative flex w-full items-center md:w-64">
              <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#173b31]/40" strokeWidth={1.7} />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products or notes"
                className="w-full border border-[#173b31]/20 bg-transparent py-2.5 pl-9 pr-3 text-[11px] text-[#173b31] outline-none transition-colors placeholder:text-[#173b31]/35 focus:border-[#173b31]"
                aria-label="Search products"
              />
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <article key={product.id} className="group">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => openProduct(product)}
                      className="block w-full overflow-hidden text-left"
                      aria-label={`View ${product.name}`}
                    >
                      <ProductArt product={product} className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.015]" />
                      {product.badge && (
                        <span className="absolute left-3 top-3 bg-[#f4efe5] px-2 py-1 font-mono text-[7px] uppercase tracking-[0.13em] text-[#173b31]/65">
                          {product.badge}
                        </span>
                      )}
                      <span className="absolute bottom-3 left-3 bg-[#f4efe5]/92 px-3 py-1.5 font-mono text-[7px] uppercase tracking-[0.13em] text-[#173b31]/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View details
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addToCart(product.id)}
                      className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-[#173b31] text-[#f4efe5] opacity-100 transition-all duration-300 hover:bg-[#315d48] sm:opacity-0 sm:group-hover:opacity-100"
                      aria-label={`Quick add ${product.name} to bag`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={1.7} />
                    </button>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <button type="button" onClick={() => openProduct(product)} className="text-left">
                        <h3 className="text-[19px] leading-tight" style={serif}>
                          {product.name}
                        </h3>
                      </button>
                      <p className="mt-1 text-[11px] text-[#173b31]/55">{product.subtitle}</p>
                      <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-[#173b31]/40">
                        {product.notes}
                      </p>
                    </div>
                    <p className="shrink-0 text-[13px]">${product.price}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 border border-[#173b31]/15 px-6 py-14 text-center">
              <p className="text-[20px]" style={serif}>
                No formulas match that search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                }}
                className="mt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-[#173b31]/60 underline underline-offset-4 hover:text-[#173b31]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="aurora-ritual" className="scroll-mt-24 bg-[#e7e2d6] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#173b31]/50">The ritual</p>
            <h2
              className="mt-4 text-[clamp(2.6rem,4.8vw,4.4rem)] font-normal leading-[0.98] tracking-[-0.04em]"
              style={serif}
            >
              Three steps.
              <br />
              One quiet moment.
            </h2>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-[#173b31]/65">
              A simple framework, not a rulebook. Cleanse gently, treat intentionally, seal slowly. The rest is yours.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('Ritual')
                scrollInto('aurora-shop')
              }}
              className="group mt-7 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#173b31]/70 underline decoration-[#173b31]/25 underline-offset-4 transition-colors hover:text-[#173b31]"
            >
              Shop the ritual
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.7} />
            </button>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-t border-[#173b31]/18">
              {ritualProducts.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => openProduct(product)}
                  className="group flex w-full items-center gap-5 border-b border-[#173b31]/18 py-5 text-left transition-colors hover:bg-[#f4efe5]/60"
                >
                  <span className="font-mono text-[9px] text-[#173b31]/35">0{index + 1}</span>
                  <ProductArt product={product} className="h-20 w-16 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[21px] leading-tight" style={serif}>
                      {product.name}
                    </p>
                    <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.13em] text-[#173b31]/45">
                      {index === 0 ? 'Cleanse' : index === 1 ? 'Treat' : 'Seal'} · {product.notes}
                    </p>
                  </div>
                  <span className="text-[12px] text-[#173b31]/65">${product.price}</span>
                  <ArrowUpRight
                    className="h-4 w-4 text-[#173b31]/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#173b31]"
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
            <p className="mt-4 font-mono text-[7px] uppercase tracking-[0.13em] text-[#173b31]/38">
              Select a step to explore the formula
            </p>
          </div>
        </div>
      </section>

      <section id="aurora-ingredients" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#173b31]/50">From the garden</p>
            <h2
              className="mt-4 text-[clamp(2.4rem,4.3vw,3.8rem)] font-normal leading-none tracking-[-0.04em]"
              style={serif}
            >
              Fewer ingredients.
              <br />
              Better reasons.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              {
                name: 'Calendula',
                note: 'Grown in the Loire Valley and cold-pressed within 24 hours of harvest to keep its calming compounds intact.',
                color: '#d8a85f',
              },
              {
                name: 'Colloidal Oat',
                note: 'A quiet workhorse that supports the skin barrier and softens the feel of reactive, thirsty skin.',
                color: '#b8c39c',
              },
              {
                name: 'Rosehip',
                note: 'Wild-harvested and unrefined, rich in fatty acids that help skin look rested by morning.',
                color: '#c47b59',
              },
            ].map((ingredient) => (
              <article key={ingredient.name} className="border border-[#173b31]/14 p-6">
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: `${ingredient.color}30` }}
                  >
                    <span
                      className="h-7 w-7"
                      style={{
                        backgroundColor: ingredient.color,
                        borderRadius: '100% 0 100% 0',
                        transform: 'rotate(-18deg)',
                      }}
                    />
                  </div>
                  <h3 className="text-[22px]" style={serif}>
                    {ingredient.name}
                  </h3>
                </div>
                <p className="mt-4 text-[12px] leading-relaxed text-[#173b31]/60">{ingredient.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="aurora-about" className="scroll-mt-24 bg-[#173b31] py-16 text-[#f4efe5] sm:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#f4efe5]/45">Our point of view</p>
            <h2
              className="mt-4 text-[clamp(2.6rem,4.8vw,4.4rem)] font-normal leading-[0.98] tracking-[-0.04em]"
              style={serif}
            >
              Skincare should
              <br />
              feel like a pause.
            </h2>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-[#f4efe5]/60">
              Aurora began with a simple question: what if the products on our shelf asked less of us? We make
              considered formulas in small batches, with transparent ingredients and a deep respect for the quiet
              moments in between.
            </p>
            <button
              type="button"
              onClick={() => scrollInto('aurora-shop')}
              className="group mt-8 inline-flex items-center gap-3 border border-[#f4efe5]/30 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-[#f4efe5] hover:text-[#173b31]"
            >
              Explore the collection
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
            </button>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="grid grid-cols-2 gap-px bg-[#f4efe5]/15">
              {[
                { value: '2019', label: 'First batch' },
                { value: '11', label: 'Raw botanicals' },
                { value: '100%', label: 'Vegan formulas' },
                { value: '0', label: 'Unnecessary fillers' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#173b31] p-6 sm:p-8">
                  <p className="text-[32px] leading-none sm:text-[40px]" style={serif}>
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.15em] text-[#f4efe5]/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#102e25] pb-10 pt-14 text-[#f4efe5]">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="grid gap-10 border-b border-[#f4efe5]/12 pb-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <button type="button" onClick={() => scrollInto('aurora-top')} className="text-left" aria-label="Back to top">
                <span className="block font-display text-[20px] tracking-[0.34em]">AURORA</span>
                <span className="mt-1 block font-mono text-[6px] uppercase tracking-[0.24em] text-[#f4efe5]/40">
                  Botanical skincare
                </span>
              </button>
              <p className="mt-5 max-w-xs text-[12px] leading-relaxed text-[#f4efe5]/45">
                Quiet formulas for awake skin, made in small batches in Portland, Oregon.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#f4efe5]/35">Explore</p>
              <div className="mt-4 flex flex-col items-start gap-2.5 text-[12px] text-[#f4efe5]/60">
                <button type="button" onClick={() => scrollInto('aurora-shop')} className="transition-colors hover:text-[#f4efe5]">
                  Shop all
                </button>
                <button type="button" onClick={() => scrollInto('aurora-ritual')} className="transition-colors hover:text-[#f4efe5]">
                  The ritual
                </button>
                <button type="button" onClick={() => scrollInto('aurora-ingredients')} className="transition-colors hover:text-[#f4efe5]">
                  Ingredients
                </button>
                <button type="button" onClick={() => scrollInto('aurora-about')} className="transition-colors hover:text-[#f4efe5]">
                  Our story
                </button>
              </div>
            </div>

            <div className="md:col-span-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#f4efe5]/35">Notes from the garden</p>
              <p className="mt-3 text-[12px] leading-relaxed text-[#f4efe5]/50">
                Occasional letters on ritual, ingredients and the quiet side of beauty.
              </p>
              <form onSubmit={submitNewsletter} className="mt-4 flex border-b border-[#f4efe5]/25">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-[11px] text-[#f4efe5] outline-none placeholder:text-[#f4efe5]/30"
                  aria-label="Email address for newsletter demo"
                />
                <button
                  type="submit"
                  className="grid w-10 place-items-center text-[#f4efe5]/60 transition-colors hover:text-[#f4efe5]"
                  aria-label="Join the newsletter demo"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 pt-5 font-mono text-[7px] uppercase tracking-[0.14em] text-[#f4efe5]/30 sm:flex-row">
            <p>© 2026 Aurora Botanical — a Webnova demo</p>
            <p>Demo storefront · no real transactions</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-14 z-40 sm:top-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 cursor-default bg-[#102e25]/45 backdrop-blur-[2px]"
              aria-label="Close product details"
            />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col overflow-y-auto bg-[#f4efe5] shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: EASE }}
              aria-label={`${selectedProduct.name} details`}
              data-lenis-prevent
            >
              <div className="flex items-center justify-between border-b border-[#173b31]/12 px-5 py-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-[#173b31]/45">
                  {selectedProduct.category} · {selectedProduct.size}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#173b31]/15 transition-colors hover:bg-[#173b31] hover:text-[#f4efe5]"
                  aria-label="Close product details"
                >
                  <X className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </div>

              <ProductArt product={selectedProduct} large className="aspect-[16/11]" />

              <div className="flex-1 px-5 py-6 sm:px-7">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#173b31]/40">
                  {selectedProduct.notes}
                </p>
                <div className="mt-2 flex items-start justify-between gap-5">
                  <h2
                    className="text-[clamp(2.3rem,4vw,3.2rem)] font-normal leading-none tracking-[-0.04em]"
                    style={serif}
                  >
                    {selectedProduct.name}
                  </h2>
                  <p className="mt-1 shrink-0 text-[18px]">${selectedProduct.price}</p>
                </div>
                <p className="mt-2 text-[12px] text-[#173b31]/55">{selectedProduct.subtitle}</p>
                <p className="mt-5 text-[13px] leading-relaxed text-[#173b31]/68">{selectedProduct.description}</p>

                <div className="mt-6 border-t border-[#173b31]/12 pt-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#173b31]/40">Key ingredients</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProduct.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="border border-[#173b31]/15 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.1em] text-[#173b31]/55"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex items-stretch gap-3">
                  <div className="flex items-center border border-[#173b31]/20">
                    <button
                      type="button"
                      onClick={() => setDetailQty((value) => Math.max(1, value - 1))}
                      className="grid h-11 w-9 place-items-center transition-colors hover:bg-[#173b31] hover:text-[#f4efe5]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </button>
                    <span className="w-8 text-center font-mono text-[11px]">{detailQty}</span>
                    <button
                      type="button"
                      onClick={() => setDetailQty((value) => value + 1)}
                      className="grid h-11 w-9 place-items-center transition-colors hover:bg-[#173b31] hover:text-[#f4efe5]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedProduct.id, detailQty)
                      setSelectedProduct(null)
                    }}
                    className="flex flex-1 items-center justify-center gap-3 bg-[#173b31] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#f4efe5] transition-colors hover:bg-[#315d48]"
                  >
                    Add to bag · ${selectedProduct.price * detailQty}
                    <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.6} />
                  </button>
                </div>
                <p className="mt-3 text-center font-mono text-[7px] uppercase tracking-[0.13em] text-[#173b31]/35">
                  Complimentary shipping over $80 · 30-day returns
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-14 z-40 sm:top-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 cursor-default bg-[#102e25]/45 backdrop-blur-[2px]"
              aria-label="Close shopping bag"
            />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-[#f4efe5] shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: EASE }}
              aria-label="Shopping bag"
              data-lenis-prevent
            >
              <div className="flex items-center justify-between border-b border-[#173b31]/12 px-5 py-4">
                <p className="text-[15px]" style={serif}>
                  Your bag {cartCount > 0 && <span className="font-mono text-[9px] text-[#173b31]/45">({cartCount})</span>}
                </p>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#173b31]/15 transition-colors hover:bg-[#173b31] hover:text-[#f4efe5]"
                  aria-label="Close shopping bag"
                >
                  <X className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5" data-lenis-prevent>
                {checkedOut && cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center py-14 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-[#173b31] text-[#f4efe5]">
                      <Check className="h-6 w-6" strokeWidth={1.6} />
                    </div>
                    <h3 className="mt-5 text-[28px]" style={serif}>
                      Order confirmed.
                    </h3>
                    <p className="mt-3 max-w-[260px] text-[12px] leading-relaxed text-[#173b31]/55">
                      This is a demo checkout — no payment was taken and no order was placed.
                    </p>
                    <button
                      type="button"
                      onClick={() => setCartOpen(false)}
                      className="mt-6 border border-[#173b31]/25 px-5 py-2.5 font-mono text-[8px] uppercase tracking-[0.14em] transition-colors hover:bg-[#173b31] hover:text-[#f4efe5]"
                    >
                      Keep browsing
                    </button>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center py-14 text-center">
                    <ShoppingBag className="h-8 w-8 text-[#173b31]/25" strokeWidth={1.2} />
                    <h3 className="mt-4 text-[26px]" style={serif}>
                      Your bag is empty.
                    </h3>
                    <p className="mt-2 text-[12px] text-[#173b31]/50">A quiet ritual is waiting.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setCartOpen(false)
                        scrollInto('aurora-shop')
                      }}
                      className="mt-6 bg-[#173b31] px-5 py-3 font-mono text-[8px] uppercase tracking-[0.14em] text-[#f4efe5] transition-colors hover:bg-[#315d48]"
                    >
                      Explore the collection
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#173b31]/12">
                    {cartItems.map((item) => (
                      <CartLine key={item.id} item={item} onPlus={addOne} onMinus={removeOne} />
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-[#173b31]/12 bg-[#eae3d6] px-5 py-5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.13em] text-[#173b31]/40">
                    Shipping calculated at checkout
                  </p>
                  <button
                    type="button"
                    onClick={checkout}
                    className="mt-4 flex w-full items-center justify-between bg-[#173b31] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#f4efe5] transition-colors hover:bg-[#315d48]"
                  >
                    Checkout demo
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                  </button>
                  <p className="mt-3 text-center font-mono text-[7px] uppercase tracking-[0.12em] text-[#173b31]/35">
                    Demo only · no payment or order is processed
                  </p>
                </div>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 bg-[#173b31] px-5 py-3 text-center font-mono text-[8px] uppercase tracking-[0.13em] text-[#f4efe5] shadow-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
