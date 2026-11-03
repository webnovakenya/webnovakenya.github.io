import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronRight,
  CircleAlert,
  Download,
  LayoutDashboard,
  Package,
  RefreshCw,
  Search,
  TrendingUp,
  X,
} from 'lucide-react'
import { EASE } from '../../lib/motion'

const initialOrders = [
  {
    id: 'ORD-2841',
    customer: 'Meridian Supply',
    destination: 'Rotterdam, NL',
    items: 12,
    total: 2840,
    status: 'Pending',
    time: '09:42',
    carrier: 'DHL Freight',
    eta: '05 Nov',
    products: ['Aero crate × 8', 'Pallet sensor × 4'],
  },
  {
    id: 'ORD-2840',
    customer: 'Northline Co.',
    destination: 'Hamburg, DE',
    items: 6,
    total: 1740,
    status: 'Packed',
    time: '09:18',
    carrier: 'DB Schenker',
    eta: '04 Nov',
    products: ['Cold-chain liner × 4', 'Thermal labels × 2'],
  },
  {
    id: 'ORD-2839',
    customer: 'Kite & Co.',
    destination: 'Antwerp, BE',
    items: 24,
    total: 6120,
    status: 'Pending',
    time: '08:51',
    carrier: 'Kuehne+Nagel',
    eta: '06 Nov',
    products: ['Aero crate × 18', 'Void fill × 6'],
  },
  {
    id: 'ORD-2838',
    customer: 'Onda Studio',
    destination: 'Copenhagen, DK',
    items: 3,
    total: 860,
    status: 'Shipped',
    time: '08:36',
    carrier: 'DSV',
    eta: '03 Nov',
    products: ['Pallet sensor × 3'],
  },
  {
    id: 'ORD-2837',
    customer: 'Fieldwork',
    destination: 'Oslo, NO',
    items: 9,
    total: 2980,
    status: 'Packed',
    time: '08:02',
    carrier: 'PostNord',
    eta: '05 Nov',
    products: ['Aero crate × 6', 'Thermal labels × 3'],
  },
  {
    id: 'ORD-2836',
    customer: 'Atlas Foods',
    destination: 'Lyon, FR',
    items: 18,
    total: 4220,
    status: 'Shipped',
    time: '07:48',
    carrier: 'Geodis',
    eta: '04 Nov',
    products: ['Cold-chain liner × 12', 'Pallet sensor × 6'],
  },
  {
    id: 'ORD-2835',
    customer: 'Mono Goods',
    destination: 'Berlin, DE',
    items: 4,
    total: 1120,
    status: 'Pending',
    time: '07:21',
    carrier: 'DHL Freight',
    eta: '06 Nov',
    products: ['Aero crate × 2', 'Void fill × 2'],
  },
]

const initialInventory = [
  { sku: 'CRT-48', name: 'Aero crate / 48×32', stock: 186, capacity: 240, location: 'Dock A', unit: 'units' },
  { sku: 'LIN-02', name: 'Cold-chain liner', stock: 42, capacity: 180, location: 'Cold store', unit: 'rolls' },
  { sku: 'SEN-11', name: 'Pallet sensor', stock: 310, capacity: 360, location: 'Dock B', unit: 'units' },
  { sku: 'FIL-08', name: 'Recycled void fill', stock: 68, capacity: 240, location: 'Mezzanine', unit: 'bags' },
  { sku: 'LBL-04', name: 'Thermal label roll', stock: 124, capacity: 300, location: 'Packing', unit: 'rolls' },
]

const chart = [
  { day: 'Mon', value: 820 },
  { day: 'Tue', value: 940 },
  { day: 'Wed', value: 760 },
  { day: 'Thu', value: 1180 },
  { day: 'Fri', value: 1020 },
  { day: 'Sat', value: 1248 },
  { day: 'Sun', value: 1110 },
]

const statuses = ['All', 'Pending', 'Packed', 'Shipped']

const statusStyles = {
  Pending: 'border-[#f4b860]/25 bg-[#f4b860]/10 text-[#f4b860]',
  Packed: 'border-[#7f9cff]/25 bg-[#7f9cff]/10 text-[#9fb4ff]',
  Shipped: 'border-[#5ed6a0]/25 bg-[#5ed6a0]/10 text-[#7de7b6]',
}

const nextStatus = { Pending: 'Packed', Packed: 'Shipped' }
const nextLabel = { Pending: 'Mark packed', Packed: 'Mark shipped' }

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'inventory', label: 'Inventory', icon: Boxes },
]

const titleMap = {
  overview: 'Operations overview',
  orders: 'Orders',
  inventory: 'Inventory',
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center border border-[#7f9cff]/35 bg-[#7f9cff]/10 text-[10px] font-bold text-[#aebfff]">
        F
      </span>
      <div>
        <p className="font-display text-[13px] tracking-[0.25em] text-[#e6edfa]">FORGE</p>
        <p className="font-mono text-[6px] uppercase tracking-[0.2em] text-[#596a82]">Operations</p>
      </div>
    </div>
  )
}

function Status({ value }) {
  return (
    <span className={`inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[7px] uppercase tracking-[0.11em] ${statusStyles[value]}`}>
      <span className="h-1 w-1 rounded-full bg-current" />
      {value}
    </span>
  )
}

function csvEscape(value) {
  return `"${String(value).replaceAll('"', '""')}"`
}

export default function ForgeDemo() {
  const [activeTab, setActiveTab] = useState('overview')
  const [orders, setOrders] = useState(initialOrders)
  const [inventory, setInventory] = useState(initialInventory)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [chartIndex, setChartIndex] = useState(5)
  const [autoSync, setAutoSync] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!syncing) return undefined
    const timer = window.setTimeout(() => {
      setSyncing(false)
      setToast('Inventory synced across 3 locations.')
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [syncing])

  const notify = (message) => setToast(message)

  const pendingCount = orders.filter((order) => order.status === 'Pending').length
  const lowStock = inventory.filter((item) => item.stock / item.capacity < 0.35)
  const selectedOrder = orders.find((order) => order.id === selectedOrderId)

  const filteredOrders = useMemo(() => {
    const term = query.trim().toLowerCase()
    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter
      const matchesQuery =
        !term ||
        `${order.id} ${order.customer} ${order.destination} ${order.carrier}`.toLowerCase().includes(term)
      return matchesStatus && matchesQuery
    })
  }, [orders, query, statusFilter])

  const filteredInventory = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return inventory
    return inventory.filter((item) => `${item.name} ${item.sku} ${item.location}`.toLowerCase().includes(term))
  }, [inventory, query])

  const changeTab = (tab) => {
    setActiveTab(tab)
    setQuery('')
    setStatusFilter('All')
    setSelectedOrderId(null)
  }

  const advanceStatus = (id) => {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order
        const next = nextStatus[order.status]
        return next ? { ...order, status: next } : order
      }),
    )
    const order = orders.find((item) => item.id === id)
    const next = order ? nextStatus[order.status] : null
    if (next) notify(`${id} marked ${next.toLowerCase()}.`)
  }

  const restock = (sku) => {
    setInventory((current) =>
      current.map((item) =>
        item.sku === sku ? { ...item, stock: Math.min(item.capacity, item.stock + 60) } : item,
      ),
    )
    const item = inventory.find((entry) => entry.sku === sku)
    notify(`${item?.name ?? sku} restocked by 60 ${item?.unit ?? 'units'}.`)
  }

  const restockLow = () => {
    if (!lowStock.length) return
    setInventory((current) =>
      current.map((item) =>
        item.stock / item.capacity < 0.35 ? { ...item, stock: Math.min(item.capacity, item.stock + 60) } : item,
      ),
    )
    notify(`${lowStock.length} low-stock lines restocked.`)
  }

  const syncNow = () => {
    if (syncing) return
    setSyncing(true)
  }

  const exportOrders = () => {
    const rows = [
      ['Order', 'Customer', 'Destination', 'Status', 'Items', 'Total', 'Carrier', 'ETA'],
      ...orders.map((order) => [
        order.id,
        order.customer,
        order.destination,
        order.status,
        order.items,
        order.total,
        order.carrier,
        order.eta,
      ]),
    ]
    const csv = rows.map((row) => row.map(csvEscape).join(',')).join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'forge-orders-demo.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    notify('Orders exported as demo CSV.')
  }

  const handleSearch = (value) => {
    setQuery(value)
    if (value && activeTab === 'overview') setActiveTab('orders')
  }

  const openOrder = (id) => setSelectedOrderId(id)

  const attentionItems = [
    ...orders
      .filter((order) => order.status === 'Pending')
      .slice(0, 2)
      .map((order) => ({
        key: order.id,
        title: order.id,
        detail: `${order.customer} · ${order.destination}`,
        action: 'Open order',
        onClick: () => openOrder(order.id),
      })),
    ...lowStock.slice(0, 2).map((item) => ({
      key: item.sku,
      title: item.name,
      detail: `${item.stock} ${item.unit} left · ${item.location}`,
      action: 'View stock',
      onClick: () => {
        changeTab('inventory')
        setQuery(item.sku)
      },
    })),
  ].slice(0, 3)

  return (
    <div className="min-h-full bg-[#070a11] text-[#dbe3f0]" style={{ colorScheme: 'dark' }}>
      <div className="flex min-h-full">
        <aside className="hidden w-56 shrink-0 flex-col border-r border-[#182131] bg-[#080d15] px-4 py-5 lg:flex">
          <Logo />

          <p className="mt-8 font-mono text-[7px] uppercase tracking-[0.18em] text-[#4d5c72]">Workspace</p>
          <nav className="mt-2 space-y-1" aria-label="Forge">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => changeTab(item.id)}
                  className={`flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left text-[12px] transition-colors ${
                    active
                      ? 'border-[#7f9cff] bg-[#7f9cff]/10 text-[#e6edfa]'
                      : 'border-transparent text-[#74849a] hover:bg-white/4 hover:text-[#c3cfdf]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                  {item.label}
                  {item.id === 'orders' && pendingCount > 0 && (
                    <span className="ml-auto grid h-4 min-w-4 place-items-center rounded-full bg-[#f4b860] px-1 font-mono text-[7px] text-[#251a08]">
                      {pendingCount}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          <p className="mt-7 font-mono text-[7px] uppercase tracking-[0.18em] text-[#4d5c72]">System</p>
          <div className="mt-2 border border-[#182131] p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] text-[#b8c4d6]">Auto-sync</p>
                <p className="mt-0.5 font-mono text-[6.5px] uppercase tracking-[0.1em] text-[#4d5c72]">
                  {autoSync ? 'Every 5 min' : 'Paused'}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={autoSync}
                onClick={() => {
                  setAutoSync((current) => !current)
                  notify(autoSync ? 'Auto-sync paused.' : 'Auto-sync resumed.')
                }}
                className={`relative h-5 w-9 rounded-full border transition-colors ${
                  autoSync ? 'border-[#7f9cff]/50 bg-[#7f9cff]/30' : 'border-[#263348] bg-[#0d1420]'
                }`}
                aria-label="Toggle auto-sync"
              >
                <span
                  className={`absolute top-0.5 h-3.5 w-3.5 rounded-full transition-all ${
                    autoSync ? 'left-[18px] bg-[#b9c8ff]' : 'left-0.5 bg-[#5d6c82]'
                  }`}
                />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-[#182131] pt-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5ed6a0]" />
              <span className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-[#5c6d84]">
                All systems operational
              </span>
            </div>
          </div>

          <div className="mt-auto border-t border-[#182131] pt-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#7f9cff]/15 font-mono text-[9px] text-[#aebfff]">
                AM
              </span>
              <div>
                <p className="text-[11px] text-[#c3cfdf]">Alex Morgan</p>
                <p className="font-mono text-[6px] uppercase tracking-[0.1em] text-[#4d5c72]">Operations lead</p>
              </div>
            </div>
            <p className="mt-3 font-mono text-[6px] uppercase tracking-[0.1em] text-[#344154]">
              Demo workspace · local data
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 border-b border-[#182131] bg-[#080d15] px-4 py-3 lg:hidden">
            <Logo />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={syncNow}
                className="grid h-8 w-8 place-items-center border border-[#223047] text-[#8292a8]"
                aria-label="Sync inventory"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={exportOrders}
                className="grid h-8 w-8 place-items-center border border-[#223047] text-[#8292a8]"
                aria-label="Export orders"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
            </div>
          </div>

          <div className="flex gap-1 overflow-x-auto border-b border-[#182131] px-3 lg:hidden" role="tablist" aria-label="Dashboard sections">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => changeTab(item.id)}
                className={`whitespace-nowrap border-b-2 px-3 py-2.5 font-mono text-[8px] uppercase tracking-[0.11em] transition-colors ${
                  activeTab === item.id
                    ? 'border-[#7f9cff] text-[#dbe3f0]'
                    : 'border-transparent text-[#5d6d83]'
                }`}
                role="tab"
                aria-selected={activeTab === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>

          <header className="sticky top-0 z-20 border-b border-[#182131] bg-[#070a11]/92 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#4d5c72]">
                  Workspace / {activeTab}
                </p>
                <h1 className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-[#e6edfa] sm:text-[25px]">
                  {titleMap[activeTab]}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="relative flex min-w-0 flex-1 items-center sm:min-w-[230px] xl:w-64 xl:flex-none">
                  <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#4d5c72]" strokeWidth={1.7} />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => handleSearch(event.target.value)}
                    placeholder={activeTab === 'inventory' ? 'Search inventory' : 'Search orders'}
                    className="w-full border border-[#223047] bg-[#0b121d] py-2 pl-9 pr-3 text-[11px] text-[#dbe3f0] outline-none transition-colors placeholder:text-[#465569] focus:border-[#7f9cff]/55"
                    aria-label={activeTab === 'inventory' ? 'Search inventory' : 'Search orders'}
                  />
                </label>
                <button
                  type="button"
                  onClick={syncNow}
                  className="inline-flex items-center gap-2 border border-[#223047] px-3 py-2 text-[10px] text-[#8292a8] transition-colors hover:border-[#3a4b66] hover:text-[#dbe3f0]"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} strokeWidth={1.6} />
                  <span className="hidden sm:inline">{syncing ? 'Syncing' : 'Sync now'}</span>
                </button>
                <button
                  type="button"
                  onClick={exportOrders}
                  className="inline-flex items-center gap-2 border border-[#223047] px-3 py-2 text-[10px] text-[#8292a8] transition-colors hover:border-[#3a4b66] hover:text-[#dbe3f0]"
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={1.6} />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <span className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-[#7f9cff]/15 font-mono text-[9px] text-[#aebfff]">
                  AM
                </span>
              </div>
            </div>
          </header>

          <main className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
            {activeTab === 'overview' && (
              <div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: 'Revenue / 30d', value: '$284.6k', delta: '+12.8%', icon: TrendingUp },
                    { label: 'Open orders', value: String(pendingCount).padStart(2, '0'), delta: 'Needs packing', icon: Package },
                    { label: 'Fulfilment rate', value: '96.4%', delta: '+2.1 pts', icon: Check },
                    { label: 'System uptime', value: '99.99%', delta: 'Last 30 days', icon: CircleAlert },
                  ].map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="border border-[#182131] bg-[#0b121d] p-4">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-[#596a82]">{stat.label}</p>
                          <Icon className="h-3.5 w-3.5 text-[#43536a]" strokeWidth={1.5} />
                        </div>
                        <p className="mt-3 text-[26px] font-semibold tracking-[-0.04em] text-[#e6edfa]">{stat.value}</p>
                        <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.1em] text-[#5c6d84]">{stat.delta}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-12">
                  <section className="border border-[#182131] bg-[#0b121d] p-4 sm:p-5 xl:col-span-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#596a82]">Throughput</p>
                        <p className="mt-1 text-[15px] text-[#c3cfdf]">Orders scanned</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[24px] font-semibold tracking-[-0.03em] text-[#e6edfa]">
                          {chart[chartIndex].value.toLocaleString()}
                        </p>
                        <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-[#5c6d84]">
                          {chart[chartIndex].day} · this week
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex h-40 items-end gap-2 sm:gap-3">
                      {chart.map((item, index) => {
                        const max = Math.max(...chart.map((entry) => entry.value))
                        const height = Math.round((item.value / max) * 100)
                        const active = index === chartIndex
                        return (
                          <button
                            key={item.day}
                            type="button"
                            onClick={() => setChartIndex(index)}
                            className="group flex h-full flex-1 flex-col justify-end gap-2"
                            aria-label={`${item.day}: ${item.value} orders`}
                            aria-pressed={active}
                          >
                            <span
                              className={`w-full transition-colors ${active ? 'bg-[#7f9cff]' : 'bg-[#24344d] group-hover:bg-[#354b6d]'}`}
                              style={{ height: `${height}%` }}
                            />
                            <span className={`font-mono text-[6.5px] uppercase tracking-[0.08em] ${active ? 'text-[#b9c8ff]' : 'text-[#4d5c72]'}`}>
                              {item.day}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#182131] pt-3">
                      <p className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-[#465569]">
                        Click a bar to inspect the day
                      </p>
                      <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-[#5ed6a0]">+18.2% week over week</p>
                    </div>
                  </section>

                  <section className="border border-[#182131] bg-[#0b121d] p-4 sm:p-5 xl:col-span-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#596a82]">Needs attention</p>
                        <p className="mt-1 text-[15px] text-[#c3cfdf]">Today</p>
                      </div>
                      <span className="border border-[#f4b860]/25 bg-[#f4b860]/10 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em] text-[#f4b860]">
                        {attentionItems.length} items
                      </span>
                    </div>

                    <div className="mt-4 divide-y divide-[#182131]">
                      {attentionItems.length ? (
                        attentionItems.map((item) => (
                          <div key={item.key} className="py-3">
                            <p className="text-[11px] text-[#c3cfdf]">{item.title}</p>
                            <p className="mt-0.5 font-mono text-[6.5px] uppercase tracking-[0.08em] text-[#4d5c72]">
                              {item.detail}
                            </p>
                            <button
                              type="button"
                              onClick={item.onClick}
                              className="mt-2 inline-flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.1em] text-[#8292ff] transition-colors hover:text-[#b9c8ff]"
                            >
                              {item.action}
                              <ArrowUpRight className="h-3 w-3" strokeWidth={1.7} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="py-6 text-center font-mono text-[7px] uppercase tracking-[0.1em] text-[#465569]">
                          All clear
                        </p>
                      )}
                    </div>
                  </section>
                </div>

                <section className="mt-5 border border-[#182131] bg-[#0b121d]">
                  <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
                    <div>
                      <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#596a82]">Recent orders</p>
                      <p className="mt-0.5 text-[13px] text-[#c3cfdf]">Latest movement across the network</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => changeTab('orders')}
                      className="inline-flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.1em] text-[#8292ff] transition-colors hover:text-[#b9c8ff]"
                    >
                      View all
                      <ArrowRight className="h-3 w-3" strokeWidth={1.7} />
                    </button>
                  </div>

                  <div className="divide-y divide-[#182131]">
                    {orders.slice(0, 4).map((order) => (
                      <div key={order.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                        <span className="grid h-7 w-7 shrink-0 place-items-center border border-[#223047] font-mono text-[7px] text-[#5d6d83]">
                          {order.customer.slice(0, 2).toUpperCase()}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[11px] text-[#c3cfdf]">{order.customer}</p>
                          <p className="mt-0.5 font-mono text-[6.5px] uppercase tracking-[0.08em] text-[#4d5c72]">
                            {order.id} · {order.destination}
                          </p>
                        </div>
                        <Status value={order.status} />
                        <p className="hidden w-20 text-right font-mono text-[10px] text-[#9dabbd] sm:block">
                          ${order.total.toLocaleString()}
                        </p>
                        <button
                          type="button"
                          onClick={() => openOrder(order.id)}
                          className="grid h-7 w-7 shrink-0 place-items-center border border-[#223047] text-[#65758d] transition-colors hover:border-[#3a4b66] hover:text-[#dbe3f0]"
                          aria-label={`Open ${order.id}`}
                        >
                          <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {statuses.map((status) => {
                      const count = status === 'All' ? orders.length : orders.filter((order) => order.status === status).length
                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setStatusFilter(status)}
                          className={`border px-3 py-1.5 font-mono text-[7px] uppercase tracking-[0.1em] transition-colors ${
                            statusFilter === status
                              ? 'border-[#7f9cff]/45 bg-[#7f9cff]/10 text-[#b9c8ff]'
                              : 'border-[#223047] text-[#65758d] hover:border-[#3a4b66] hover:text-[#b8c4d6]'
                          }`}
                          aria-pressed={statusFilter === status}
                        >
                          {status} <span className="ml-1 opacity-50">{count}</span>
                        </button>
                      )
                    })}
                  </div>
                  <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-[#465569]">
                    {filteredOrders.length} orders · sorted by time
                  </p>
                </div>

                <div className="mt-4 hidden overflow-x-auto border border-[#182131] bg-[#0b121d] md:block">
                  <table className="w-full min-w-[760px] text-left">
                    <thead>
                      <tr className="border-b border-[#182131] font-mono text-[6.5px] uppercase tracking-[0.1em] text-[#4d5c72]">
                        <th className="px-4 py-3 font-normal">Order</th>
                        <th className="px-4 py-3 font-normal">Customer</th>
                        <th className="px-4 py-3 font-normal">Destination</th>
                        <th className="px-4 py-3 font-normal">Items</th>
                        <th className="px-4 py-3 font-normal">Total</th>
                        <th className="px-4 py-3 font-normal">Status</th>
                        <th className="px-4 py-3 text-right font-normal">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#182131]">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="transition-colors hover:bg-white/2">
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => openOrder(order.id)}
                              className="font-mono text-[9px] text-[#9dabbd] transition-colors hover:text-[#b9c8ff]"
                            >
                              {order.id}
                            </button>
                            <p className="mt-0.5 font-mono text-[6px] text-[#465569]">{order.time}</p>
                          </td>
                          <td className="px-4 py-3 text-[11px] text-[#c3cfdf]">{order.customer}</td>
                          <td className="px-4 py-3 font-mono text-[8px] text-[#65758d]">{order.destination}</td>
                          <td className="px-4 py-3 font-mono text-[8px] text-[#65758d]">{order.items}</td>
                          <td className="px-4 py-3 font-mono text-[9px] text-[#9dabbd]">${order.total.toLocaleString()}</td>
                          <td className="px-4 py-3"><Status value={order.status} /></td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {nextStatus[order.status] && (
                                <button
                                  type="button"
                                  onClick={() => advanceStatus(order.id)}
                                  className="border border-[#223047] px-2.5 py-1.5 font-mono text-[6.5px] uppercase tracking-[0.07em] text-[#8292a8] transition-colors hover:border-[#7f9cff]/45 hover:text-[#b9c8ff]"
                                >
                                  {nextLabel[order.status]}
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => openOrder(order.id)}
                                className="grid h-7 w-7 place-items-center border border-[#223047] text-[#65758d] transition-colors hover:border-[#3a4b66] hover:text-[#dbe3f0]"
                                aria-label={`View ${order.id}`}
                              >
                                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!filteredOrders.length && (
                    <div className="px-5 py-12 text-center font-mono text-[8px] uppercase tracking-[0.1em] text-[#465569]">
                      No orders match this view.
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2 md:hidden">
                  {filteredOrders.map((order) => (
                    <article key={order.id} className="border border-[#182131] bg-[#0b121d] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-[8px] text-[#65758d]">{order.id}</p>
                          <p className="mt-1 text-[13px] text-[#c3cfdf]">{order.customer}</p>
                          <p className="mt-0.5 font-mono text-[6.5px] uppercase tracking-[0.08em] text-[#4d5c72]">
                            {order.destination} · {order.items} items
                          </p>
                        </div>
                        <Status value={order.status} />
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-[#182131] pt-3">
                        <p className="text-[14px] text-[#dbe3f0]">${order.total.toLocaleString()}</p>
                        <div className="flex items-center gap-2">
                          {nextStatus[order.status] && (
                            <button
                              type="button"
                              onClick={() => advanceStatus(order.id)}
                              className="border border-[#223047] px-2.5 py-1.5 font-mono text-[6.5px] uppercase tracking-[0.07em] text-[#8292a8]"
                            >
                              {nextLabel[order.status]}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => openOrder(order.id)}
                            className="grid h-7 w-7 place-items-center border border-[#223047] text-[#65758d]"
                            aria-label={`View ${order.id}`}
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                  {!filteredOrders.length && (
                    <div className="border border-[#182131] px-5 py-10 text-center font-mono text-[7px] uppercase tracking-[0.1em] text-[#465569]">
                      No orders match this view.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#596a82]">
                      {filteredInventory.length} SKUs · 3 locations
                    </p>
                    <p className="mt-1 text-[12px] text-[#65758d]">
                      {lowStock.length ? `${lowStock.length} lines below threshold` : 'All stock above threshold'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={restockLow}
                    disabled={!lowStock.length}
                    className="inline-flex items-center gap-2 border border-[#7f9cff]/30 bg-[#7f9cff]/10 px-3 py-2 font-mono text-[7px] uppercase tracking-[0.1em] text-[#b9c8ff] transition-colors hover:bg-[#7f9cff]/20 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <RefreshCw className="h-3 w-3" strokeWidth={1.7} />
                    Restock low stock
                  </button>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {filteredInventory.map((item) => {
                    const ratio = item.stock / item.capacity
                    const state = ratio < 0.18 ? 'Critical' : ratio < 0.35 ? 'Low' : 'Healthy'
                    const stateClass =
                      state === 'Critical'
                        ? 'text-[#ff8b7c] border-[#ff8b7c]/25 bg-[#ff8b7c]/10'
                        : state === 'Low'
                          ? 'text-[#f4b860] border-[#f4b860]/25 bg-[#f4b860]/10'
                          : 'text-[#7de7b6] border-[#5ed6a0]/25 bg-[#5ed6a0]/10'
                    return (
                      <article key={item.sku} className="flex flex-col border border-[#182131] bg-[#0b121d] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[12px] text-[#c3cfdf]">{item.name}</p>
                            <p className="mt-1 font-mono text-[6.5px] uppercase tracking-[0.1em] text-[#4d5c72]">
                              {item.sku} · {item.location}
                            </p>
                          </div>
                          <span className={`shrink-0 border px-2 py-1 font-mono text-[6.5px] uppercase tracking-[0.09em] ${stateClass}`}>
                            {state}
                          </span>
                        </div>
                        <div className="mt-5 flex items-end justify-between">
                          <p className="text-[26px] font-semibold tracking-[-0.04em] text-[#e6edfa]">
                            {item.stock}
                            <span className="ml-1 font-mono text-[8px] font-normal uppercase tracking-[0.1em] text-[#4d5c72]">
                              {item.unit}
                            </span>
                          </p>
                          <p className="font-mono text-[7px] text-[#596a82]">of {item.capacity}</p>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden bg-[#182131]">
                          <div
                            className={`h-full transition-[width] duration-500 ${
                              state === 'Critical' ? 'bg-[#ff8b7c]' : state === 'Low' ? 'bg-[#f4b860]' : 'bg-[#5ed6a0]'
                            }`}
                            style={{ width: `${Math.min(100, Math.round(ratio * 100))}%` }}
                          />
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-[#182131] pt-3">
                          <p className="font-mono text-[6.5px] uppercase tracking-[0.09em] text-[#465569]">
                            Reorder at 35%
                          </p>
                          <button
                            type="button"
                            onClick={() => restock(item.sku)}
                            className="inline-flex items-center gap-1.5 border border-[#223047] px-2.5 py-1.5 font-mono text-[6.5px] uppercase tracking-[0.07em] text-[#8292a8] transition-colors hover:border-[#7f9cff]/45 hover:text-[#b9c8ff]"
                          >
                            Restock +60
                            <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
                          </button>
                        </div>
                      </article>
                    )
                  })}
                </div>

                {!filteredInventory.length && (
                  <div className="mt-4 border border-[#182131] px-5 py-12 text-center font-mono text-[8px] uppercase tracking-[0.1em] text-[#465569]">
                    No inventory matches “{query}”.
                  </div>
                )}
              </div>
            )}

            <p className="mt-8 border-t border-[#182131] pt-4 font-mono text-[6px] uppercase tracking-[0.1em] text-[#344154]">
              Forge demo · data resets on reload · no external systems connected
            </p>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-14 z-40 sm:top-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={() => setSelectedOrderId(null)}
              className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-[2px]"
              aria-label="Close order details"
            />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col overflow-y-auto border-l border-[#223047] bg-[#0b121d]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: EASE }}
              aria-label={`Order ${selectedOrder.id} details`}
              data-lenis-prevent
            >
              <div className="flex items-center justify-between border-b border-[#182131] px-5 py-4">
                <div>
                  <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#596a82]">Order detail</p>
                  <p className="mt-0.5 font-mono text-[12px] text-[#c3cfdf]">{selectedOrder.id}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrderId(null)}
                  className="grid h-9 w-9 place-items-center border border-[#223047] text-[#8292a8] transition-colors hover:border-[#3a4b66] hover:text-[#dbe3f0]"
                  aria-label="Close order details"
                >
                  <X className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </div>

              <div className="flex-1 px-5 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[16px] text-[#e6edfa]">{selectedOrder.customer}</p>
                    <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.09em] text-[#4d5c72]">
                      {selectedOrder.destination} · placed {selectedOrder.time}
                    </p>
                  </div>
                  <Status value={selectedOrder.status} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {[
                    ['Items', selectedOrder.items],
                    ['Total', `$${selectedOrder.total.toLocaleString()}`],
                    ['Carrier', selectedOrder.carrier],
                    ['ETA', selectedOrder.eta],
                  ].map(([label, value]) => (
                    <div key={label} className="border border-[#182131] p-3">
                      <p className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-[#4d5c72]">{label}</p>
                      <p className="mt-1 text-[11px] text-[#c3cfdf]">{value}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 font-mono text-[7px] uppercase tracking-[0.15em] text-[#596a82]">Contents</p>
                <ul className="mt-2 divide-y divide-[#182131] border-y border-[#182131]">
                  {selectedOrder.products.map((product) => (
                    <li key={product} className="flex items-center justify-between gap-4 py-2.5 text-[11px]">
                      <span className="text-[#9dabbd]">{product}</span>
                      <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-[#465569]">Ready</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 font-mono text-[7px] uppercase tracking-[0.15em] text-[#596a82]">Fulfilment</p>
                <div className="mt-3 space-y-0">
                  {['Pending', 'Packed', 'Shipped'].map((stage, index) => {
                    const orderStage = ['Pending', 'Packed', 'Shipped'].indexOf(selectedOrder.status)
                    const complete = index <= orderStage
                    return (
                      <div key={stage} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <span
                            className={`grid h-5 w-5 place-items-center rounded-full border ${
                              complete
                                ? 'border-[#7f9cff]/50 bg-[#7f9cff]/15 text-[#b9c8ff]'
                                : 'border-[#223047] text-[#465569]'
                            }`}
                          >
                            {complete ? <Check className="h-2.5 w-2.5" strokeWidth={2.2} /> : <span className="h-1 w-1 rounded-full bg-current" />}
                          </span>
                          {index < 2 && <span className={`h-7 w-px ${complete ? 'bg-[#7f9cff]/30' : 'bg-[#182131]'}`} />}
                        </div>
                        <div className="pb-2">
                          <p className={`text-[11px] ${complete ? 'text-[#c3cfdf]' : 'text-[#465569]'}`}>{stage}</p>
                          <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.08em] text-[#465569]">
                            {index === 0 ? `${selectedOrder.time} · order received` : index === 1 ? 'Warehouse scan' : `ETA ${selectedOrder.eta}`}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {nextStatus[selectedOrder.status] ? (
                  <button
                    type="button"
                    onClick={() => advanceStatus(selectedOrder.id)}
                    className="mt-6 flex w-full items-center justify-between bg-[#7f9cff] px-4 py-3 font-mono text-[8px] uppercase tracking-[0.11em] text-[#0a0f18] transition-colors hover:bg-[#a6b9ff]"
                  >
                    {nextLabel[selectedOrder.status]}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </button>
                ) : (
                  <div className="mt-6 flex items-center gap-2 border border-[#5ed6a0]/25 bg-[#5ed6a0]/10 px-4 py-3">
                    <Check className="h-3.5 w-3.5 text-[#7de7b6]" strokeWidth={2} />
                    <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-[#7de7b6]">
                      Order shipped and complete
                    </p>
                  </div>
                )}

                <p className="mt-4 text-center font-mono text-[6px] uppercase tracking-[0.1em] text-[#344154]">
                  Demo data · status changes stay in this preview
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 border border-[#2b3a52] bg-[#101827] px-4 py-2.5 font-mono text-[7px] uppercase tracking-[0.1em] text-[#c3cfdf] shadow-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
