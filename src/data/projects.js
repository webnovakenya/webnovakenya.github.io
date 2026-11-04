export const WORK_CATEGORIES = [
  'Business Websites',
  'Online Stores',
  'Custom Web Apps',
  'Portfolios & Landing Pages',
]

export const projects = [
  {
    id: 'northline',
    title: 'Northline Advisory',
    category: 'Business Websites',
    kind: 'web',
    description:
      'A clear, quietly confident home for a strategy advisory firm, built around sharp typography, selected case studies and one simple route to a conversation.',
    overview:
      'Northline needed a digital home that felt as considered as the conversations it hosts. The concept pairs editorial restraint with a precise content system, giving senior advisors room to sound human while keeping every route pointed toward a first meeting.',
    problem:
      'Independent advisory firms often bury sharp thinking beneath corporate language. The challenge was to make expertise feel immediate, human and easy to interrogate without turning the site into a personality-led consultancy brochure.',
    role: 'Strategy, identity direction & web',
    duration: '6-week concept sprint',
    year: '2026',
    tags: ['React', 'Tailwind CSS', 'CMS'],
    accent: '#4A6CF7',
    layout: 'consulting',
    isConcept: true,
    image: null,
    features: [
      {
        icon: 'compass',
        title: 'A point of view',
        description: 'A positioning-led opening that states the practice clearly before asking for attention.',
      },
      {
        icon: 'file-text',
        title: 'Proof over noise',
        description: 'Case studies built around the decision, the work and the change that followed.',
      },
      {
        icon: 'layers',
        title: 'An editorial system',
        description: 'Flexible type, grid and image rules that keep every new insight feeling composed.',
      },
      {
        icon: 'message-square',
        title: 'One clear next step',
        description: 'A single conversation path that stays visible without pressing the visitor.',
      },
    ],
    stats: [
      { value: 98, suffix: '/100', label: 'Performance target', note: 'Illustrative Lighthouse goal' },
      { value: 1.2, decimals: 1, suffix: 's', label: 'Largest paint', note: 'Illustrative load target' },
      { value: 34, prefix: '+', suffix: '%', label: 'Enquiry intent', note: 'Illustrative concept metric' },
    ],
    process: [
      { title: 'Position', description: 'Interrogate the offer, the audience and the one idea the site must leave behind.' },
      { title: 'Structure', description: 'Build the narrative and content model before a single visual decision is made.' },
      { title: 'Design', description: 'Shape an editorial system that can hold conviction without raising its voice.' },
      { title: 'Build', description: 'Engineer the experience for speed, clarity and effortless publishing.' },
    ],
    gallery: [
      { title: 'Homepage', caption: 'Positioning, proof and a calm route to the first conversation.' },
      { title: 'Selected work', caption: 'Case studies organised around decisions rather than deliverable lists.' },
      { title: 'Perspective', caption: 'A flexible editorial template for ideas, notes and publications.' },
    ],
    testimonial: {
      quote:
        'The concept finally makes the practice feel as sharp as the thinking inside it. It sounds like us, only clearer.',
      name: 'Nadia M.',
      role: 'Founder, illustrative advisory persona',
    },
  },
  {
    id: 'meridian',
    title: 'Meridian Dental',
    category: 'Business Websites',
    kind: 'web',
    description:
      'A warm, modern practice site that makes booking feel effortless, with treatment guides and practitioner profiles that build trust before the first visit.',
    overview:
      'Meridian is designed around the moment before care begins: the first search, the nervous click, the decision to book. Soft colour, plain-spoken treatment guides and a patient-first booking flow turn a clinical errand into a reassuring experience.',
    problem:
      'People judge a practice long before they meet it. Most dental sites lead with equipment and credentials, leaving patients to decode whether the experience will feel calm, clear and human. Meridian puts that emotional answer first.',
    role: 'Experience strategy, design & build',
    duration: '5-week concept sprint',
    year: '2026',
    tags: ['Next.js', 'Framer Motion', 'Booking'],
    accent: '#5BC8B7',
    layout: 'clinic',
    isConcept: true,
    image: null,
    features: [
      {
        icon: 'calendar-check',
        title: 'Frictionless booking',
        description: 'Availability, practitioner choice and confirmation brought into one short flow.',
      },
      {
        icon: 'heart-pulse',
        title: 'Care-first guides',
        description: 'Treatments explained in plain language, with next steps and realistic expectations.',
      },
      {
        icon: 'shield-check',
        title: 'Trust at every step',
        description: 'Proof points, safety details and practitioner context placed where anxiety peaks.',
      },
      {
        icon: 'users',
        title: 'Faces not stock photos',
        description: 'Warm practitioner profiles that let patients choose the person, not just the practice.',
      },
    ],
    stats: [
      { value: 96, suffix: '/100', label: 'Accessibility target', note: 'Illustrative audit score' },
      { value: 2.1, decimals: 1, suffix: 'x', label: 'Booking starts', note: 'Illustrative concept metric' },
      { value: 42, suffix: '%', label: 'Mobile completion', note: 'Illustrative booking target' },
    ],
    process: [
      { title: 'Listen', description: 'Map the worries, questions and hesitations behind a first appointment.' },
      { title: 'Map', description: 'Simplify treatment discovery and create a booking flow with fewer unknowns.' },
      { title: 'Design', description: 'Use warmth, pace and plain language to lower the emotional temperature.' },
      { title: 'Refine', description: 'Test the flow with accessibility and real-world attention spans in mind.' },
    ],
    gallery: [
      { title: 'Homepage', caption: 'A calm welcome with the next available appointment in reach.' },
      { title: 'Treatment guide', caption: 'Plain-language answers with the detail patients actually need.' },
      { title: 'Booking', caption: 'A short, reassuring path from intention to confirmed visit.' },
    ],
    testimonial: {
      quote:
        'For the first time, booking a dentist feels like something I could do without bracing myself. That is the win.',
      name: 'Dr. Lorna W.',
      role: 'Practice lead, illustrative clinic persona',
    },
  },
  {
    id: 'aurora',
    title: 'Aurora Botanics',
    category: 'Online Stores',
    kind: 'web',
    description:
      'An editorial skincare storefront where ritual, ingredients and texture lead the story, pairing a considered product grid with a journal made for slow reading.',
    overview:
      'Aurora treats skincare as a ritual rather than a catalogue. The storefront moves between campaign imagery, ingredient stories and a deliberately reduced product grid, giving each formula room to be understood before it is added to a bag.',
    problem:
      'In a crowded skincare market, product claims blur together. Aurora needed to sell without shouting, make ingredient stories legible and turn a boutique range into a world customers wanted to return to.',
    role: 'Art direction, storefront design & build',
    duration: '7-week concept sprint',
    year: '2026',
    tags: ['Shopify', 'Art Direction', 'Motion'],
    accent: '#D8A46C',
    layout: 'store',
    isConcept: true,
    image: null,
    features: [
      {
        icon: 'leaf',
        title: 'Ingredient-led stories',
        description: 'Every formula begins with what is inside it and why the blend matters.',
      },
      {
        icon: 'sparkles',
        title: 'Ritual, not routine',
        description: 'Collections organised by mornings, evenings and the skin moments between.',
      },
      {
        icon: 'shopping-bag',
        title: 'Quiet commerce',
        description: 'A restrained product grid and a bag that never interrupts the atmosphere.',
      },
      {
        icon: 'book-open',
        title: 'A journal with pace',
        description: 'Readable, image-rich editorial that rewards slow attention and repeat visits.',
      },
    ],
    stats: [
      { value: 1.4, decimals: 1, suffix: 's', label: 'Product page LCP', note: 'Illustrative load target' },
      { value: 28, prefix: '+', suffix: '%', label: 'Repeat intent', note: 'Illustrative concept metric' },
      { value: 97, suffix: '/100', label: 'Accessibility target', note: 'Illustrative audit score' },
    ],
    process: [
      { title: 'Art direction', description: 'Build a tactile visual world from texture, plant forms and natural light.' },
      { title: 'Content model', description: 'Connect ingredients, rituals and products so stories travel with the formula.' },
      { title: 'Storefront', description: 'Design a product experience that feels editorial without hiding the buy path.' },
      { title: 'Motion', description: 'Add enough movement to feel alive, never enough to break the calm.' },
    ],
    gallery: [
      { title: 'Campaign', caption: 'A seasonal world built from texture, shadow and botanical detail.' },
      { title: 'Product ritual', caption: 'Formula, ingredients and routine brought into one readable page.' },
      { title: 'Journal', caption: 'Long-form stories with the pace and space of a print magazine.' },
    ],
    testimonial: {
      quote:
        'It feels like walking into the studio rather than scrolling a shop. You understand the product before you are asked to buy it.',
      name: 'Achieng O.',
      role: 'Founder, illustrative skincare persona',
    },
  },
  {
    id: 'kicks',
    title: 'Kicks & Co.',
    category: 'Online Stores',
    kind: 'web',
    description:
      'A high-energy sneaker marketplace concept with editorial drops, fast size filters and a one-screen checkout designed for limited releases.',
    overview:
      'Kicks & Co. is built for the adrenaline of a drop day. Bold type, editorial product stories and a filtering system that keeps pace with limited runs turn browsing into part of the culture, while a compact checkout removes everything that could slow a buyer down.',
    problem:
      'Sneaker buyers move fast and forgive very little. Slow filters, unclear stock and repetitive checkout steps kill the momentum of a release. The concept had to preserve streetwear energy while making the practical path to purchase almost invisible.',
    role: 'Culture strategy, commerce UX & build',
    duration: '6-week concept sprint',
    year: '2026',
    tags: ['React', 'Commerce UI', 'Motion'],
    accent: '#FF6B4A',
    layout: 'marketplace',
    isConcept: true,
    image: null,
    features: [
      {
        icon: 'zap',
        title: 'Drop-day energy',
        description: 'Release countdowns, editorial drops and product stories that feel part of the culture.',
      },
      {
        icon: 'sliders',
        title: 'Filters that keep up',
        description: 'Size, colour and availability narrowed instantly, without losing browsing momentum.',
      },
      {
        icon: 'shopping-bag',
        title: 'One-screen bag',
        description: 'A compact checkout that keeps stock, sizing and payment in a single confident view.',
      },
      {
        icon: 'timer',
        title: 'Limited-run clarity',
        description: 'Stock and timing presented honestly, so urgency never becomes confusion.',
      },
    ],
    stats: [
      { value: 64, suffix: 'ms', label: 'Filter response', note: 'Illustrative interaction target' },
      { value: 41, prefix: '+', suffix: '%', label: 'Checkout completion', note: 'Illustrative concept metric' },
      { value: 12.4, decimals: 1, suffix: 'k', label: 'Drop waitlist', note: 'Illustrative audience scenario' },
    ],
    process: [
      { title: 'Culture', description: 'Study the language, rituals and pace of drop-day communities.' },
      { title: 'System', description: 'Build product, release and editorial templates that can move at speed.' },
      { title: 'Commerce', description: 'Strip the path from size selection to payment down to the essentials.' },
      { title: 'Launch', description: 'Pressure-test the experience against limited stock and high demand.' },
    ],
    gallery: [
      { title: 'Drop landing', caption: 'Campaign energy with the release details kept unmistakable.' },
      { title: 'Browse', caption: 'Fast filters and product cards built for quick, confident comparison.' },
      { title: 'Checkout', caption: 'A compact bag that keeps momentum from size to payment.' },
    ],
    testimonial: {
      quote:
        'The concept understands that buying a release is part of the culture. It moves quickly without making the product feel cheap.',
      name: 'Tariq B.',
      role: 'Community lead, illustrative retail persona',
    },
  },
  {
    id: 'forge',
    title: 'Forge Ops',
    category: 'Custom Web Apps',
    kind: 'app',
    description:
      'A logistics operations dashboard that turns live orders, inventory and partner updates into one readable command centre, surfacing exceptions before they become problems.',
    overview:
      'Forge Ops is a mobile command centre for teams who cannot afford to be at a desk. Live orders, inventory and partner health are reduced to a small set of decisions, with exceptions pulled to the surface and routine detail kept one layer beneath.',
    problem:
      'Operations teams often work across spreadsheets, carrier portals and chat threads. By the time an exception is visible, it has already become a customer problem. Forge had to make the whole network legible in seconds, even on a phone.',
    role: 'Product strategy, UI system & prototyping',
    duration: '8-week concept sprint',
    year: '2026',
    tags: ['React', 'Data Viz', 'Dashboard'],
    accent: '#4A6CF7',
    layout: 'dashboard',
    isConcept: true,
    image: null,
    features: [
      {
        icon: 'activity',
        title: 'Exception-first overview',
        description: 'The few things that need action rise above the routine noise of the network.',
      },
      {
        icon: 'boxes',
        title: 'Live inventory',
        description: 'Stock, movement and fulfilment state kept in one readable operating picture.',
      },
      {
        icon: 'alert-triangle',
        title: 'Partner alerts',
        description: 'Carrier and supplier health surfaced before a delay reaches the customer.',
      },
      {
        icon: 'bar-chart',
        title: 'Decision-ready reporting',
        description: 'Charts that answer a question quickly, not dashboards that simply display data.',
      },
    ],
    stats: [
      { value: 38, suffix: '%', label: 'Fewer exceptions', note: 'Illustrative concept metric' },
      { value: 1.8, decimals: 1, suffix: 's', label: 'Dashboard load', note: 'Illustrative data target' },
      { value: 99.9, decimals: 1, suffix: '%', label: 'Uptime target', note: 'Illustrative service goal' },
    ],
    process: [
      { title: 'Audit', description: 'Shadow the daily decisions that currently live across disconnected tools.' },
      { title: 'Architecture', description: 'Model orders, inventory and partners around exceptions rather than tables.' },
      { title: 'Interface', description: 'Compress the command centre into a legible, thumb-friendly hierarchy.' },
      { title: 'Systems', description: 'Design states, alerts and data density for the messy reality of operations.' },
    ],
    gallery: [
      { title: 'Mobile command centre', caption: 'The operating picture reduced to what needs attention now.' },
      { title: 'Order flow', caption: 'A single order journey with exceptions surfaced along the way.' },
      { title: 'Partner health', caption: 'Carrier and supplier status read at a glance, not in a table.' },
    ],
    testimonial: {
      quote:
        'It gives you the feeling of walking onto the floor and instantly knowing where to look next.',
      name: 'Wanjiku N.',
      role: 'Operations lead, illustrative logistics persona',
    },
  },
  {
    id: 'tempo',
    title: 'Tempo Rooms',
    category: 'Custom Web Apps',
    kind: 'app',
    description:
      'A booking and scheduling workspace for small studios, bringing availability, payments and client notes into one calm calendar instead of five disconnected tools.',
    overview:
      'Tempo Rooms is a mobile-first workspace for independent studio owners. It brings the day’s schedule, payments and client context into one calm surface, so the admin happens between sessions rather than taking over the evening.',
    problem:
      'Small studios stitch together calendars, payment links, notes and reminders. Every extra tool adds another place to check and another chance for a booking to fall through. Tempo needed to make the admin feel like part of the work, not a second job.',
    role: 'Product design, scheduling UX & prototype',
    duration: '7-week concept sprint',
    year: '2026',
    tags: ['Next.js', 'Scheduling', 'Stripe'],
    accent: '#8B7CFF',
    layout: 'booking',
    isConcept: true,
    image: null,
    features: [
      {
        icon: 'calendar-days',
        title: 'One calm calendar',
        description: 'Availability, bookings and gaps held in a single view that fits the working day.',
      },
      {
        icon: 'credit-card',
        title: 'Payments in flow',
        description: 'Deposits and balances connected to the booking, without leaving the workspace.',
      },
      {
        icon: 'users',
        title: 'Client context',
        description: 'Notes and preferences travel with each person, ready before the session begins.',
      },
      {
        icon: 'message-square',
        title: 'Notes that travel',
        description: 'A light client record that stays useful without becoming a CRM project.',
      },
    ],
    stats: [
      { value: 9, suffix: 'h', label: 'Time saved weekly', note: 'Illustrative concept metric' },
      { value: 26, prefix: '+', suffix: '%', label: 'Repeat bookings', note: 'Illustrative concept metric' },
      { value: 99.9, decimals: 1, suffix: '%', label: 'Uptime target', note: 'Illustrative service goal' },
    ],
    process: [
      { title: 'Workflow map', description: 'Trace a real studio week from enquiry to rebooking and payment.' },
      { title: 'Data model', description: 'Connect people, sessions, availability and money without overbuilding.' },
      { title: 'Prototype', description: 'Test a thumb-first calendar against the interruptions of a working day.' },
      { title: 'Polish', description: 'Reduce visual noise until the next decision is obvious at a glance.' },
    ],
    gallery: [
      { title: 'Today', caption: 'The working day, next session and available gaps in one view.' },
      { title: 'Booking', caption: 'A short self-serve flow that keeps the studio’s rules intact.' },
      { title: 'Client notes', caption: 'Useful context attached to the person, not hidden in another app.' },
    ],
    testimonial: {
      quote:
        'It feels like the studio admin finally fits into the pockets of time around the actual work.',
      name: 'Maya R.',
      role: 'Studio owner, illustrative client persona',
    },
  },
  {
    id: 'halcyon',
    title: 'Halcyon Studio',
    category: 'Portfolios & Landing Pages',
    kind: 'web',
    description:
      'A portfolio for an architecture practice where light, material and silence do the talking, with a restrained archive and deliberately paced full-bleed imagery.',
    overview:
      'Halcyon is built like a printed monograph: generous space, deliberate pacing and images that are allowed to hold the frame. The archive stays out of the way, letting material and light carry the practice’s point of view.',
    problem:
      'Architecture portfolios often mistake volume for proof. Halcyon needed an online home that could hold a lifetime of work without becoming an undifferentiated grid, while still making the studio easy to contact and commission.',
    role: 'Editorial direction, portfolio system & build',
    duration: '5-week concept sprint',
    year: '2026',
    tags: ['Editorial', 'Portfolio', 'CMS'],
    accent: '#C9B99A',
    layout: 'portfolio',
    isConcept: true,
    image: null,
    features: [
      {
        icon: 'aperture',
        title: 'Image-led pacing',
        description: 'A rhythm of full-bleed moments and quiet detail rather than a dense grid.',
      },
      {
        icon: 'layout-grid',
        title: 'A living archive',
        description: 'Projects organised by place, material and year without flattening their identity.',
      },
      {
        icon: 'move-right',
        title: 'Deliberate motion',
        description: 'Transitions that preserve the stillness of the photography instead of competing.',
      },
      {
        icon: 'sun',
        title: 'Light and material',
        description: 'A restrained palette that lets texture, shadow and surface do the talking.',
      },
    ],
    stats: [
      { value: 0.9, decimals: 1, suffix: 's', label: 'LCP target', note: 'Illustrative load goal' },
      { value: 52, prefix: '+', suffix: '%', label: 'Time on site', note: 'Illustrative concept metric' },
      { value: 100, suffix: '/100', label: 'Accessibility target', note: 'Illustrative audit goal' },
    ],
    process: [
      { title: 'Edit', description: 'Choose the work that earns its place and define the order of attention.' },
      { title: 'Compose', description: 'Build page rhythm around image scale, negative space and material detail.' },
      { title: 'Build', description: 'Create a fast, flexible archive that stays quiet as the practice grows.' },
      { title: 'Sequence', description: 'Tune motion and transitions so the work never feels like a template.' },
    ],
    gallery: [
      { title: 'Index', caption: 'A restrained archive where each project has room to breathe.' },
      { title: 'Project', caption: 'Full-bleed light, texture and detail paced like a printed spread.' },
      { title: 'Studio', caption: 'Practice, people and process without the usual corporate furniture.' },
    ],
    testimonial: {
      quote:
        'It gives the work silence. That is rare online, and exactly what an architecture practice needs.',
      name: 'Jonas K.',
      role: 'Principal, illustrative architecture persona',
    },
  },
  {
    id: 'signal',
    title: 'Signal Launch',
    category: 'Portfolios & Landing Pages',
    kind: 'web',
    description:
      'A product launch page that explains a complex fintech idea in one scroll, with a live interface preview, clear proof points and an unmistakable call to action.',
    overview:
      'Signal takes a complicated money-management product and turns it into one clear story. A live interface preview carries the proof, a small set of proof points answers the obvious objections and a single waitlist action closes the loop without noise.',
    problem:
      'Fintech launches usually slide between abstraction and feature soup. Signal needed to make a complex product feel simple in the first screen, credible in the second and worth joining by the third, all without overpromising.',
    role: 'Product narrative, landing page & motion',
    duration: '4-week concept sprint',
    year: '2026',
    tags: ['Landing Page', 'Product Story', 'Motion'],
    accent: '#33D6A6',
    layout: 'launch',
    isConcept: true,
    image: null,
    features: [
      {
        icon: 'gauge',
        title: 'One-scroll story',
        description: 'A narrative sequence that earns attention before asking for the click.',
      },
      {
        icon: 'sparkles',
        title: 'Live product proof',
        description: 'A responsive interface preview that makes the promise feel tangible.',
      },
      {
        icon: 'mouse-pointer',
        title: 'One conversion path',
        description: 'A clear waitlist action that stays visible without crowding the story.',
      },
      {
        icon: 'line-chart',
        title: 'Proof-point architecture',
        description: 'A small set of claims and context points placed exactly where doubt appears.',
      },
    ],
    stats: [
      { value: 38, prefix: '+', suffix: '%', label: 'Waitlist conversion', note: 'Illustrative concept metric' },
      { value: 1.1, decimals: 1, suffix: 's', label: 'LCP target', note: 'Illustrative load goal' },
      { value: 4.8, decimals: 1, suffix: '/5', label: 'Clarity score', note: 'Illustrative user-test score' },
    ],
    process: [
      { title: 'Narrative', description: 'Find the one-sentence promise and the objections that follow it.' },
      { title: 'Interface', description: 'Design the product preview around the exact proof the story needs.' },
      { title: 'Motion', description: 'Use pacing and reveals to make a short page feel considered, not rushed.' },
      { title: 'Test', description: 'Check the story against first-time comprehension and mobile attention.' },
    ],
    gallery: [
      { title: 'Hero', caption: 'The product promise and interface preview in the first screen.' },
      { title: 'Product proof', caption: 'A closer look at the interface, movement and decision points.' },
      { title: 'Waitlist', caption: 'The conversion moment kept simple, warm and unmistakable.' },
    ],
    testimonial: {
      quote:
        'The page makes a complicated product feel like one clear decision. That is much harder than it looks.',
      name: 'Sana P.',
      role: 'Product lead, illustrative fintech persona',
    },
  },
]
