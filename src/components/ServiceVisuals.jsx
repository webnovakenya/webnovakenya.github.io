import { ArrowUpRight, Check, ShoppingBag } from 'lucide-react'

function BusinessVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-5 p-4 sm:p-6">
      <div className="border border-white/10 bg-white/[0.025]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-bone/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-bone/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-bone/20" />
          <span className="ml-3 font-mono text-[9px] tracking-[0.14em] text-bone/70">webnova.studio</span>
        </div>
        <div className="p-3">
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-plum/40 via-ink-3 to-rust/30">
            <div className="absolute left-[8%] top-[18%] h-2 w-[22%] bg-bone/90" />
            <div className="absolute left-[8%] top-[31%] h-1 w-[34%] bg-bone/30" />
            <div className="absolute left-[8%] top-[39%] h-1 w-[27%] bg-bone/20" />
            <div className="absolute bottom-[16%] left-[8%] h-5 w-14 bg-royal" />
            <div className="absolute right-[7%] top-[13%] h-[72%] w-[38%] rounded-full border border-bone/15 bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.28),rgba(8,8,10,0.45))]" />
            <div className="absolute bottom-[16%] right-[12%] font-mono text-[8px] uppercase tracking-[0.22em] text-bone/75">
              Launched 2026
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[58, 74, 46].map((width, index) => (
              <div key={width} className="space-y-2">
                <div className="h-8 bg-white/[0.04]" />
                <div className="h-0.5 bg-bone/25" style={{ width: `${width}%` }} />
                <div className="h-0.5 w-[40%] bg-bone/10" />
                {index === 0 && <div className="h-0.5 w-[22%] bg-royal/70" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-bone/72">
        <span>Corporate website</span>
        <span className="flex items-center gap-1.5 text-royal">
          +128% qualified leads <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
        </span>
      </div>
    </div>
  )
}

const products = [
  { name: 'Aurora serum', price: '$64', gradient: 'linear-gradient(145deg,#2f4b43,#0f1c19)', accent: '#cfd8c8' },
  { name: 'Night ritual', price: '$92', gradient: 'linear-gradient(145deg,#4a3831,#1b1310)', accent: '#ebcbb7' },
  { name: 'Everyday balm', price: '$38', gradient: 'linear-gradient(145deg,#3a3a4d,#141420)', accent: '#d0d0e8' },
]

function CommerceVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-4 sm:p-6">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-bone/72">
        <span>Storefront / 24</span>
        <span className="flex items-center gap-1.5 text-bone/75">
          <ShoppingBag className="h-3 w-3" strokeWidth={1.5} /> Cart 02
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {products.map((product, index) => (
          <div
            key={product.name}
            className={`group/product relative border border-white/10 bg-white/[0.02] p-2 ${
              index === 2 ? 'col-span-2 flex items-center gap-4' : ''
            }`}
          >
            <div
              className={`relative overflow-hidden ${index === 2 ? 'aspect-square w-16 shrink-0' : 'aspect-[4/5] w-full'}`}
              style={{ background: product.gradient }}
            >
              <div
                className="absolute inset-[22%] rounded-[45%] opacity-80"
                style={{ background: `radial-gradient(circle at 35% 25%, #fff5, ${product.accent}66 40%, #0000 72%)` }}
              />
              <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-bone/50" />
            </div>
            <div className={index === 2 ? 'flex flex-1 items-center justify-between' : 'mt-2 flex items-center justify-between'}>
              <div>
                <p className="text-[11px] font-medium text-bone/75">{product.name}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-bone/70">Skincare</p>
              </div>
              <span className="font-mono text-[11px] text-royal">{product.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/70">Cart subtotal</p>
          <p className="text-sm text-bone">$194.00</p>
        </div>
        <span className="inline-flex items-center gap-2 bg-royal px-3 py-2 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-ink">
          Checkout <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
        </span>
      </div>
    </div>
  )
}

const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1)
const highlightedDays = [12, 13, 19]
const timeSlots = ['09:30', '11:00', '14:30']

function BookingVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/70">Reserve a table</p>
          <p className="mt-1 font-heading text-lg font-semibold">August 2026</p>
        </div>
        <div className="flex gap-1.5">
          <span className="grid h-6 w-6 place-items-center border border-white/10 text-[11px] text-bone/75">←</span>
          <span className="grid h-6 w-6 place-items-center border border-white/10 text-[11px] text-bone/70">→</span>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-7 gap-1 font-mono text-[8px] uppercase tracking-[0.12em] text-bone/25">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <span key={`${day}-${index}`} className="py-1 text-center">
              {day}
            </span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {calendarDays.map((day) => {
            const highlighted = highlightedDays.includes(day)
            return (
              <span
                key={day}
                className={`grid aspect-square place-items-center border font-mono text-[9px] ${
                  highlighted
                    ? 'border-royal bg-royal text-ink'
                    : 'border-transparent text-bone/75'
                }`}
              >
                {day}
              </span>
            )
          })}
        </div>
      </div>

      <div>
        <div className="flex gap-2">
          {timeSlots.map((slot, index) => (
            <span
              key={slot}
              className={`flex-1 border py-2 text-center font-mono text-[9px] tracking-[0.08em] ${
                index === 1 ? 'border-royal/60 text-royal' : 'border-white/10 text-bone/75'
              }`}
            >
              {slot}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 border border-royal/25 bg-royal/10 px-3 py-2.5">
          <Check className="h-3.5 w-3.5 text-royal" strokeWidth={2} />
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-royal/90">
            Confirmed — Thu 13, 11:00
          </span>
        </div>
      </div>
    </div>
  )
}

const portfolioCards = [
  { image: '/projects/halcyon.svg', label: 'Halcyon', rotation: '-rotate-6', offset: '-translate-x-[18%] -translate-y-[6%]' },
  { image: '/projects/forge.svg', label: 'Forge', rotation: 'rotate-6', offset: 'translate-x-[18%] translate-y-[5%]' },
  { image: '/projects/aurora.svg', label: 'Aurora', rotation: 'rotate-0', offset: '' },
]

function PortfolioVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-4 sm:p-6">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-bone/72">
        <span>Selected frames</span>
        <span className="text-bone/72">03 / 06</span>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        {portfolioCards.map((card, index) => (
          <div
            key={card.label}
            className={`absolute w-[62%] overflow-hidden border border-white/15 bg-ink-3 shadow-[0_30px_60px_rgba(0,0,0,0.4)] ${card.rotation} ${card.offset}`}
            style={{ zIndex: index === 2 ? 3 : index + 1 }}
          >
            <img src={card.image} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
            <div className="flex items-center justify-between border-t border-white/10 px-2.5 py-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-bone/72">{card.label}</span>
              <span className="h-1 w-1 rounded-full bg-royal" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/72">
        <span>Editorial layouts</span>
        <span className="text-royal">View all work</span>
      </div>
    </div>
  )
}

function AppVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-4 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/70">Operations OS</p>
          <p className="mt-1 font-heading text-lg font-semibold">Revenue overview</p>
        </div>
        <span className="flex items-center gap-1.5 border border-royal/25 bg-royal/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-royal">
          <span className="h-1 w-1 rounded-full bg-royal" /> Live
        </span>
      </div>

      <div className="border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-end justify-between">
          <p className="font-heading text-2xl font-semibold tracking-tight">$84.2k</p>
          <span className="font-mono text-[9px] text-royal">+18.4%</span>
        </div>
        <svg viewBox="0 0 300 120" className="mt-3 h-28 w-full" role="presentation">
          <defs>
            <linearGradient id="serviceChartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f6fff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4f6fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 50, 80, 110].map((y) => (
            <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#f1ede4" strokeOpacity="0.06" strokeWidth="1" />
          ))}
          <path
            d="M0 100 C20 95 30 78 48 80 C70 82 82 58 102 62 C124 66 136 40 156 44 C176 48 188 68 208 58 C230 47 244 24 264 30 C282 35 290 18 300 12 L300 120 L0 120 Z"
            fill="url(#serviceChartFill)"
          />
          <path
            d="M0 100 C20 95 30 78 48 80 C70 82 82 58 102 62 C124 66 136 40 156 44 C176 48 188 68 208 58 C230 47 244 24 264 30 C282 35 290 18 300 12"
            fill="none"
            stroke="#4f6fff"
            strokeWidth="1.8"
            className="chart-line"
            strokeLinecap="round"
          />
        </svg>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            { label: 'Users', value: '12.4k' },
            { label: 'Orders', value: '1,082' },
            { label: 'Uptime', value: '99.99%' },
          ].map((item) => (
            <div key={item.label} className="border-t border-white/10 pt-2">
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-bone/70">{item.label}</p>
              <p className="mt-0.5 text-[11px] text-bone/80">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-bone/72">
        <span>Custom platform</span>
        <span className="text-bone/72">Built to scale</span>
      </div>
    </div>
  )
}

export default function ServiceVisual({ type }) {
  if (type === 'commerce') return <CommerceVisual />
  if (type === 'booking') return <BookingVisual />
  if (type === 'portfolio') return <PortfolioVisual />
  if (type === 'app') return <AppVisual />
  return <BusinessVisual />
}
