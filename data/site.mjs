export const projects = [
  {
    id: "fomo-fast",
    title: "Fomo Fast",
    description: "Intermittent fasting, but for your apps.",
    detailDescription:
      "Fomo Fast gives distracting apps defined feed windows, a daily allowance, and a streak that rewards the time you get back.",
    category: "iOS · Focus & digital wellbeing",
    url: "https://www.fomo.fast",
    destinationLabel: "Visit Fomo Fast",
    icon: "/images/projects/fomo-fast-icon.jpg",
    iconAlt: "Fomo Fast app icon",
    preview: "/images/projects/fomo-fast-preview.png",
    previewAlt: "Fomo Fast In Fast dashboard showing focus progress",
    featured: true,
  },
  {
    id: "rostershift",
    title: "RosterShift",
    description: "Shift planning without the spreadsheet chaos.",
    detailDescription:
      "RosterShift helps teams generate fair rota plans, handle requests, and publish one schedule everyone can trust.",
    category: "iOS · Team scheduling",
    url: "https://www.rostershift.app/en",
    destinationLabel: "Visit RosterShift",
    icon: "/images/projects/rostershift-icon.jpg",
    iconAlt: "RosterShift app icon",
    preview: "/images/projects/rostershift-preview.png",
    previewAlt: "RosterShift admin dashboard showing the next duty and recent activity",
    featured: true,
  },
  {
    id: "flickmark",
    title: "FlickMark",
    description: "Find the movie. Keep the moment.",
    detailDescription:
      "FlickMark identifies films from screenshots and shared posts, then keeps watchlists and streaming availability together.",
    category: "iOS · Movies & discovery",
    url: "https://apps.apple.com/us/app/movie-finder-flickmark/id6747580843",
    destinationLabel: "View FlickMark on the App Store",
    icon: "/images/projects/flickmark-icon.jpg",
    iconAlt: "FlickMark app icon",
    preview: "/images/projects/flickmark-preview.png",
    previewAlt: "FlickMark home screen showing streaming movie recommendations",
    featured: true,
  },
  {
    id: "egmn-dev",
    title: "egmn.dev",
    description: "My personal portfolio, built with Nuxt and Vue.",
    detailDescription:
      "A small, responsive portfolio for sharing my independent products, frontend work, and contact details.",
    category: "Web · Portfolio",
    url: "https://github.com/egemenkar/egmn.dev",
    destinationLabel: "View egmn.dev on GitHub",
    icon: null,
    iconAlt: "",
    preview: null,
    previewAlt: "",
    featured: false,
  },
];

export const featuredProjects = projects.filter(({ featured }) => featured);

export const experience = [
  {
    company: "Despatch Cloud",
    role: "Head of Frontend",
    period: "Feb 2025 to present",
    location: "Remote, United Kingdom",
    responsibilities: [
      "Lead the development of user-facing web applications with Vue and React.",
      "Work with design to turn concepts into scalable, high-quality interfaces.",
      "Set frontend standards, mentor developers, and contribute directly to key products.",
    ],
  },
  {
    company: "Despatch Cloud",
    role: "Senior Frontend Developer",
    period: "Apr 2023 to Feb 2025",
    location: "Remote, United Kingdom",
    responsibilities: [
      "Built Nuxt and Vue applications from product designs.",
      "Integrated APIs for ecommerce order processing and shipping workflows.",
      "Created reusable components and improved frontend performance.",
    ],
  },
  {
    company: "Rightyon",
    role: "Frontend Developer",
    period: "Jan 2022 to Apr 2023",
    location: "Istanbul, Türkiye",
    responsibilities: [
      "Developed vehicle-tracking and CRM applications with Vue.",
      "Built SEO-focused Nuxt and Tailwind marketing pages.",
      "Worked with React Native, GraphQL, and Google Maps APIs.",
    ],
  },
  {
    company: "Freelance",
    role: "Full Stack Web Developer",
    period: "Apr 2018 to Jan 2022",
    location: "Istanbul, Türkiye",
    responsibilities: [
      "Delivered full-stack web applications for a range of clients.",
      "Managed concurrent projects from problem-solving through deployment.",
      "Designed and developed custom WordPress websites.",
    ],
  },
  {
    company: "Turkish Navy",
    role: "Supply Officer",
    period: "Sep 2010 to Apr 2021",
    location: "Türkiye, On-site",
    responsibilities: [
      "Served in the Turkish Navy across logistics, operations, and team coordination.",
      "After more than a decade in uniform, I voluntarily left to pursue a career in software.",
    ],
  },
];

export const education = [
  {
    institution: "Anadolu University",
    degree: "Bachelor of Science, Management Information Systems",
    year: "2025",
    location: "Eskisehir, Türkiye",
  },
  {
    institution: "Ataturk University",
    degree: "Associate of Science, Computer Programming",
    year: "2023",
    location: "Erzurum, Türkiye",
  },
  {
    institution: "Turkish National Defense University",
    degree: "Bachelor of Science, Naval Architecture and Marine Engineering",
    year: "2010",
    location: "Istanbul, Türkiye",
  },
];

export const contact = {
  email: "egemenkar@gmail.com",
  location: "Istanbul, Türkiye",
};

export const socialLinks = [
  { label: "GitHub", url: "https://github.com/egemenkar" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/egemen-kar/" },
  { label: "Email", url: `mailto:${contact.email}` },
  { label: "X", url: "https://x.com/egmndev" },
];
