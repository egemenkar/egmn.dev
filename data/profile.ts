// Single source of site content. Career facts mirror the CV in public/egemen-kar-cv.pdf;
// update this file (and the PDF) and every section, meta tag and the JSON-LD follow.

export interface Link {
  label: string
  href: string
}

export interface Role {
  title: string
  start: string // YYYY-MM
  end: string | null // null = present
  highlights: string[]
}

export interface Position {
  company: string
  description?: string
  location: string
  roles: Role[]
}

export interface Education {
  institution: string
  degree: string
  date: string // YYYY-MM or YYYY
  expected?: boolean
}

export interface Post {
  title: string
  date: string // YYYY-MM-DD
  summary: string
  href: string
}

export const site = {
  url: 'https://egmn.dev',
  title: 'Egemen Kar — Head of Frontend',
  description:
    'Egemen Kar is Head of Frontend at The Despatch Company, an engineering leader focused on frontend architecture, performance, quality and AI-native product delivery. Based in Istanbul.',
  ogImage: '/og-image.png',
  cv: '/egemen-kar-cv.pdf',
}

export const person = {
  name: 'Egemen Kar',
  headline: 'Head of Frontend | AI-Native Engineering & Product Delivery',
  subline: 'Frontend Architecture, Performance & Quality',
  jobTitle: 'Head of Frontend',
  employer: 'The Despatch Company',
  location: 'Istanbul, Türkiye',
  email: 'egemenkar@gmail.com',
  intro: [
    'I lead frontend at The Despatch Company, a UK company building e-commerce and logistics software, working remotely from Istanbul.',
    'I use AI-assisted and agentic workflows across the whole delivery lifecycle, and I stay accountable for the quality of what ships.',
  ],
  about: [
    'I’m an engineering leader with a frontend foundation and more than eight years of experience building and shipping reliable, user-focused software. As Head of Frontend at The Despatch Company, I drive frontend architecture, performance, product quality and delivery for e-commerce and logistics products, working closely with product, design and backend teams.',
    'I use AI-assisted development, LLM-powered tools and agentic coding workflows from clarifying requirements to building, testing, reviewing and improving production software, while staying accountable for technical decisions. I hold a degree in Management Information Systems and am completing a Law degree, which adds business and legal perspective to my engineering.',
  ],
}

export const links = {
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/egemen-kar/' },
  github: { label: 'GitHub', href: 'https://github.com/egemenkar' },
  email: { label: 'Email', href: `mailto:${person.email}` },
} satisfies Record<string, Link>

export const focusAreas = [
  {
    title: 'Frontend Architecture',
    body: 'Component architecture, design systems and coding standards for Vue.js, Nuxt and React applications that have to grow with the product.',
  },
  {
    title: 'Performance & Quality',
    body: 'Web performance optimization, reusable components and testing with Vitest, Jest and Cypress, so production software stays fast, scalable and reliable.',
  },
  {
    title: 'AI-Native Engineering',
    body: 'AI-assisted development, LLM-powered tools and agentic coding workflows across implementation, testing and code review, with a person accountable for every decision.',
  },
  {
    title: 'Leading Teams & Delivery',
    body: 'Setting technical direction, mentoring and managing frontend developers, and working with product, design and backend to turn operational needs into reliable software.',
  },
]

export const experience: Position[] = [
  {
    company: 'The Despatch Company',
    description: 'E-commerce and logistics software',
    location: 'Driffield, England, UK (Remote)',
    roles: [
      {
        title: 'Head of Frontend',
        start: '2025-02',
        end: null,
        highlights: [
          'Drive frontend technical direction, architecture, performance and delivery practices across Vue.js, Nuxt and React applications.',
          'Build and use AI-assisted workflows across implementation, testing, code review and product delivery.',
          'Establish coding standards, mentor and manage frontend developers, and stay hands-on in key projects.',
        ],
      },
      {
        title: 'Senior Frontend Developer',
        start: '2023-04',
        end: '2025-02',
        highlights: [
          'Built Nuxt.js and Vue.js applications from Figma designs that improve order processing and shipping workflows for e-commerce companies and warehouses.',
          'Integrated APIs and backend services to improve order management.',
          'Built reusable components and optimized application performance for speed and responsiveness.',
        ],
      },
    ],
  },
  {
    company: 'RIGHTYON',
    location: 'Istanbul, Türkiye',
    roles: [
      {
        title: 'Frontend Developer',
        start: '2022-01',
        end: '2023-04',
        highlights: [
          'Developed and maintained a complex vehicle tracking web application with Vue.js, and contributed to its React Native mobile app.',
          'Built SEO-optimized landing pages with Nuxt.js and Tailwind CSS, and a CRM web application for another of the company’s SaaS products.',
          'Worked with GraphQL (Apollo) and the Google Maps JavaScript API: Geolocation, Places and Directions.',
        ],
      },
    ],
  },
  {
    company: 'Freelance',
    location: 'Istanbul, Türkiye',
    roles: [
      {
        title: 'Full Stack Web Developer',
        start: '2018-04',
        end: '2022-01',
        highlights: [
          'Developed and deployed full-stack MERN applications, focusing on performance, scalability and usability.',
          'Managed multiple client projects at once, delivering on time and to high quality standards.',
          'Designed and developed custom WordPress websites.',
        ],
      },
    ],
  },
]

export const education: Education[] = [
  { institution: 'Selçuk University', degree: 'Bachelor’s Degree, Law', date: '2027', expected: true },
  { institution: 'Anadolu University', degree: 'Bachelor of Science, Management Information Systems', date: '2026-05' },
  { institution: 'Atatürk University', degree: 'Associate of Science, Computer Programming', date: '2023-06' },
  { institution: 'Turkish National Defense University', degree: 'Bachelor of Science, Naval Architecture and Marine Engineering', date: '2010-08' },
]

// Newest first. The Writing section and /writing stay hidden while this is empty.
export const posts: Post[] = []

// Home page menu, in order. `writing` only shows once there are posts.
export const sections = [
  { key: 'about', label: 'About', hint: 'who I am' },
  { key: 'focus', label: 'Focus', hint: 'what I work on' },
  { key: 'experience', label: 'Experience', hint: '8+ years, since 2018' },
  { key: 'education', label: 'Education', hint: 'MIS, Law (2027)' },
  { key: 'writing', label: 'Writing', hint: 'notes on AI-native frontend' },
  { key: 'cv', label: 'CV', hint: 'download the PDF' },
  { key: 'contact', label: 'Contact', hint: 'email, LinkedIn, GitHub' },
].filter(({ key }) => key !== 'writing' || posts.length > 0)
