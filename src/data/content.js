/* ============================================================
   LEEMA TECH FARM SOLUTIONS — CONTENT SOURCE OF TRUTH
   ------------------------------------------------------------
   Every fact below comes from the Leema Tech Farm Solutions
   company profile. Nothing is invented: no awards, no client
   counts, no revenue, no employee numbers, no testimonials and
   no partner logos.
   ============================================================ */

import {
  crops,
  irrigation,
  farmer,
  infrastructure,
  soil,
  poultry,
  training,
  solar,
  borehole,
  greenhouse,
  apples,
  mangoes,
  citrus,
  avocado,
  orchard,
  tanks,
  fruitFarm,
  climate,
  harvest,
  field,
  community,
  seedlings,
  sunset,
  contact,
  farmWebp,
  hero,
} from '../assets'

/* ---------------------------------------------------------------
   Company facts
   --------------------------------------------------------------- */
export const company = {
  name: 'Leema Tech Farm Solutions',
  shortName: 'Leema Tech',
  established: '2012',
  registered: '2017',
  location: 'Nairobi, Kenya',
  address: 'Nairobi, Fedha / Embakasi, Kenya',
  phone: '+254 757 676 006',
  phoneHref: 'tel:+254757676006',
  whatsappNumber: '254757676006',
  coreBusiness: 'Agribusiness consultancy, farm infrastructure, training and farm management',
  overview:
    'Leema Tech Farm Solutions is an agribusiness consultancy based in Nairobi, Kenya. We support farmers, investors and institutions with practical consultancy, farm infrastructure, training and farm management solutions. Our work connects good ideas to thoughtful planning, sound systems and the everyday realities of agriculture.',
  tagline: 'Transforming agricultural ideas into profitable, sustainable enterprises.',
}

/* A prefilled, professional WhatsApp message used across the site. */
export const WHATSAPP_MESSAGE =
  'Hello Leema Tech Farm Solutions, I would like to discuss an agricultural project.'

/* ---------------------------------------------------------------
   Services — documented service lines (all five)
   --------------------------------------------------------------- */
export const services = [
  {
    number: '01',
    id: 'agribusiness-consultancy',
    title: 'Agribusiness Consultancy',
    short: 'Clear, investable plans for agricultural ideas.',
    description:
      'From feasibility studies to funding proposals, we turn agricultural ideas into clear, investable plans.',
    image: crops,
    alt: 'Horticultural crops growing in a managed field',
    icon: 'Leaf',
    items: [
      'Farm feasibility studies and business plans',
      'Agribusiness investment advisory',
      'Farm audits and performance assessments',
      'Enterprise selection and profitability analysis',
      'Grant and funding proposal support',
    ],
  },
  {
    number: '02',
    id: 'farm-infrastructure-engineering',
    title: 'Farm Infrastructure & Engineering Solutions',
    short: 'Water, energy and structures built for production.',
    description:
      'Practical infrastructure that gives a farm the foundations, water and energy it needs to operate well.',
    image: irrigation,
    alt: 'Irrigation infrastructure on a working farm',
    icon: 'Droplets',
    items: [
      'Farm structures',
      'Tank towers and steel water tanks',
      'Borehole drilling and water systems',
      'Irrigation system design and installation',
      'Solar power and alternative energy solutions',
    ],
  },
  {
    number: '03',
    id: 'farm-management-operations',
    title: 'Farm Management & Operations',
    short: 'Hands-on operational planning and control.',
    description:
      'Structured operational planning for healthy production, capable people and well-managed resources.',
    image: soil,
    alt: 'Soil and crop management on a farm',
    icon: 'Sprout',
    items: [
      'Farm setup and operational planning',
      'Production scheduling and labour management',
      'Soil management and fertility programs',
      'Crop health and pest management',
      'Livestock production planning',
    ],
  },
  {
    number: '04',
    id: 'training-capacity-building',
    title: 'Training, Capacity Building & Agri-Tours',
    short: 'Practical learning that stays with your team.',
    description:
      'Build capability through practical learning, demonstration and shared field experience.',
    image: training,
    alt: 'Agricultural training session with farmers',
    icon: 'GraduationCap',
    items: [
      'Farmer training workshops',
      'Practical agribusiness courses',
      'School and institutional agriculture programs',
      'Agri-tours',
      'Demonstration farm visits',
    ],
  },
  {
    number: '05',
    id: 'digital-agriculture-knowledge',
    title: 'Digital Agriculture & Knowledge Products',
    short: 'Knowledge products that make planning easier.',
    description:
      'Useful knowledge products that make farm planning and learning more accessible to more people.',
    image: greenhouse,
    alt: 'Modern greenhouse with agricultural technology',
    icon: 'BookOpen',
    items: [
      'eBooks',
      'Farm management manuals',
      'Online tutorials',
      'Video training',
      'Digital farm planning tools',
      'Customized learning materials',
    ],
  },
]

/* ---------------------------------------------------------------
   Focus areas — where we work
   --------------------------------------------------------------- */
export const focusAreas = [
  {
    number: '01',
    id: 'horticultural-crop-production',
    title: 'Horticultural Crop Production',
    sub: 'Field and protected growing systems',
    image: crops,
    alt: 'Rows of horticultural crops under production',
    icon: 'Leaf',
    copy: 'Planning and managing horticultural production for consistent quality and dependable market supply.',
  },
  {
    number: '02',
    id: 'fruit-tree-farming',
    title: 'Fruit Tree Farming',
    sub: 'Avocado / Citrus / Mangoes / Apples',
    image: orchard,
    alt: 'Fruit tree orchard at golden hour',
    icon: 'TreePine',
    copy: 'Orchard establishment and long-term care for high-value fruit enterprises.',
    varieties: ['Avocado', 'Citrus', 'Mangoes', 'Apples'],
  },
  {
    number: '03',
    id: 'poultry-livestock-systems',
    title: 'Poultry & Livestock Systems',
    sub: 'Production planning and housing',
    image: poultry,
    alt: 'Poultry and livestock production unit',
    icon: 'Egg',
    copy: 'Production planning, housing and management systems for poultry and livestock units.',
  },
  {
    number: '04',
    id: 'mixed-farming-models',
    title: 'Mixed Farming Models',
    sub: 'Integrated, resilient farm design',
    image: seedlings,
    alt: 'Seedlings prepared for a mixed farming system',
    icon: 'Wheat',
    copy: 'Integrated models that spread risk and make better use of land, water, labour and nutrients.',
  },
  {
    number: '05',
    id: 'commercial-community-agribusiness',
    title: 'Commercial & Community-Based Agribusiness Projects',
    sub: 'Projects that create shared value',
    image: community,
    alt: 'Community agricultural project',
    icon: 'Users',
    copy: 'Commercial ventures and community-based projects designed to be productive and sustainable.',
  },
]

/* Fruit varieties documented under fruit tree farming. */
export const fruitVarieties = [
  { id: 'avocado', title: 'Avocado', image: avocado, alt: 'Avocado fruit on the tree' },
  { id: 'citrus', title: 'Citrus', image: citrus, alt: 'Citrus fruit in an orchard' },
  { id: 'mangoes', title: 'Mangoes', image: mangoes, alt: 'Mangoes ripening on the tree' },
  { id: 'apples', title: 'Apples', image: apples, alt: 'Apples in a high-altitude orchard' },
]

/* ---------------------------------------------------------------
   Vision / Mission / Core values
   --------------------------------------------------------------- */
export const vision = {
  title: 'Vision',
  text: 'To be a leading agribusiness consultancy in Kenya, driving sustainable agricultural development.',
  icon: 'Telescope',
}

export const mission = {
  title: 'Mission',
  text: 'To empower farmers, investors and institutions with practical solutions that create lasting value.',
  icon: 'Target',
}

export const coreValues = [
  { title: 'Professionalism', icon: 'Award', text: 'Care, clarity and discipline in every engagement.' },
  { title: 'Innovation', icon: 'Lightbulb', text: 'Useful ideas, tested in real field conditions.' },
  { title: 'Sustainability', icon: 'Leaf', text: 'Systems designed to keep regenerating.' },
  { title: 'Client Focus', icon: 'HeartHandshake', text: 'Your outcomes shape how we work.' },
  { title: 'Excellence', icon: 'Sparkles', text: 'Standards that hold up long after handover.' },
]

/* ---------------------------------------------------------------
   Farm infrastructure & engineering portfolio
   --------------------------------------------------------------- */
export const infrastructureItems = [
  {
    id: 'borehole',
    label: 'Borehole & Water Systems',
    title: 'Borehole drilling and water systems',
    image: borehole,
    alt: 'Borehole drilling and water system on a farm',
    icon: 'Droplets',
    size: 'wide',
  },
  {
    id: 'irrigation',
    label: 'Irrigation',
    title: 'Irrigation system design and installation',
    image: irrigation,
    alt: 'Irrigation lines watering a crop field',
    icon: 'Droplets',
    size: 'tall',
  },
  {
    id: 'tanks',
    label: 'Tank Towers & Steel Tanks',
    title: 'Tank towers and steel water tanks',
    image: tanks,
    alt: 'Steel water storage tanks on a farm',
    icon: 'Warehouse',
    size: 'regular',
  },
  {
    id: 'solar',
    label: 'Solar Power',
    title: 'Solar power and alternative energy solutions',
    image: solar,
    alt: 'Solar panel installation powering a farm',
    icon: 'Sun',
    size: 'regular',
  },
  {
    id: 'structures',
    label: 'Farm Structures',
    title: 'Farm structures and animal housing',
    image: infrastructure,
    alt: 'Farm buildings and structures',
    icon: 'Warehouse',
    size: 'wide',
  },
  {
    id: 'protected',
    label: 'Protected Growing',
    title: 'Greenhouses and protected growing systems',
    image: greenhouse,
    alt: 'Greenhouse and protected growing system',
    icon: 'Sprout',
    size: 'tall',
  },
]

/* ---------------------------------------------------------------
   Our approach — five stages
   --------------------------------------------------------------- */
export const approachStages = [
  {
    number: '01',
    title: 'Assessment & Planning',
    text: 'We start with the land, the water, the market and the numbers so the plan is grounded in reality.',
    image: field,
    alt: 'Assessing a farm field',
    icon: 'ClipboardList',
  },
  {
    number: '02',
    title: 'Design & Budgeting',
    text: 'Systems, structures and phasing are designed together with an honest budget attached to each stage.',
    image: infrastructure,
    alt: 'Designing farm infrastructure',
    icon: 'Ruler',
  },
  {
    number: '03',
    title: 'Implementation & Supervision',
    text: 'Work on the ground is supervised so what was designed is what actually gets built.',
    image: borehole,
    alt: 'Supervising farm works',
    icon: 'HardHat',
  },
  {
    number: '04',
    title: 'Training & Capacity Building',
    text: 'The people who run the farm are trained and supported so the system keeps working without us.',
    image: training,
    alt: 'Training the farm team',
    icon: 'GraduationCap',
  },
  {
    number: '05',
    title: 'Monitoring, Evaluation & Growth Support',
    text: 'We track performance, adjust with the seasons and stay available as the enterprise grows.',
    image: harvest,
    icon: 'LineChart',
  },
]

/* ---------------------------------------------------------------
   Target clients
   --------------------------------------------------------------- */
export const clients = [
  {
    id: 'farmers',
    title: 'Small, Medium & Large-Scale Farmers',
    image: farmer,
    alt: 'Farmer standing in a crop field',
    icon: 'Leaf',
  },
  {
    id: 'investors',
    title: 'Agribusiness Investors',
    image: fruitFarm,
    alt: 'Agricultural investment project',
    icon: 'TrendingUp',
  },
  {
    id: 'schools',
    title: 'Schools & Learning Institutions',
    image: training,
    alt: 'School agriculture programme',
    icon: 'GraduationCap',
  },
  {
    id: 'churches',
    title: 'Churches & Community Organizations',
    image: community,
    alt: 'Community farming activity',
    icon: 'Users',
  },
  {
    id: 'ngos',
    title: 'NGOs & Development Partners',
    image: climate,
    alt: 'Development partner agricultural programme',
    icon: 'HandHeart',
  },
  {
    id: 'corporate',
    title: 'Corporate & Private Landowners',
    image: tanks,
    alt: 'Private landowner farm infrastructure',
    icon: 'Briefcase',
  },
]

/* ---------------------------------------------------------------
   Why choose Leema Tech
   --------------------------------------------------------------- */
export const whyPoints = [
  { icon: 'Sprout', text: 'Over a decade of hands-on agribusiness experience' },
  { icon: 'MapPin', text: 'Practical, locally adapted solutions' },
  { icon: 'Hammer', text: 'Strong expertise in farming and infrastructure' },
  { icon: 'FileText', text: 'Professional documentation and planning support' },
  { icon: 'Handshake', text: 'Commitment to client success and long-term partnerships' },
]

/* ---------------------------------------------------------------
   Hero — documented company facts only
   --------------------------------------------------------------- */
export const heroStats = [
  { value: company.established, label: 'Established' },
  { value: company.registered, label: 'Registered' },
  { value: 'Nairobi', label: 'Based in Kenya' },
]

export const heroFeatureCard = {
  number: '01',
  title: 'Growing Together',
  subtitle: 'Sustainable Solutions',
}

export const heroCapabilities = [
  { icon: 'Leaf', title: 'Agribusiness Consultancy', desc: 'Feasibility, planning and investment advisory' },
  { icon: 'HardHat', title: 'Farm Infrastructure', desc: 'Water, energy, structures and irrigation' },
  { icon: 'ClipboardCheck', title: 'Farm Management', desc: 'Operations, soil, crops and livestock' },
  { icon: 'GraduationCap', title: 'Training & Agri-Tours', desc: 'Workshops, courses and demonstrations' },
]

/* ---------------------------------------------------------------
   Section imagery
   --------------------------------------------------------------- */
export const imagery = {
  hero: hero,
  world: farmWebp,
  heroWorld: sunset,
  about: farmer,
  aboutSecondary: greenhouse,
  aboutTertiary: soil,
  vision: field,
  services: crops,
  focus: orchard,
  infrastructure: borehole,
  approach: harvest,
  clients: community,
  why: farmWebp,
  whyAlt: solar,
  company: harvest,
  contact: contact,
  fruit: fruitFarm,
  seedling: seedlings,
}

export const whatsappLink = (message = WHATSAPP_MESSAGE) =>
  `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`

/* ---------------------------------------------------------------
   Navigation — real routes only, no dead links
   --------------------------------------------------------------- */
export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Focus Areas', to: '/focus-areas' },
  { label: 'Why Us', to: '/why-us' },
  { label: 'Contact', to: '/contact' },
]