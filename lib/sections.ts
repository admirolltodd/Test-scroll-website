export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Founder = {
  name: string;
  role: string;
  bio: string;
  image: GalleryImage;
};

export type Service = {
  index: string;
  title: string;
  description: string;
  stack: string[];
  image: GalleryImage;
};

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export type Mascot = {
  name: string;
  role: string;
  bio: string;
  image: GalleryImage;
};

export const founders: Founder[] = [
  {
    name: "Robert Slavens",
    role: "Co-Founder — Engineering & Architecture",
    bio: "Fifteen years shipping resilient systems for companies that outgrew their own infrastructure. Robert leads technical strategy and full-stack architecture, translating tangled requirements into systems that hold up under real load.",
    image: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80",
      alt: "Robert Slavens, Co-Founder of Actonaughts",
      caption: "Robert Slavens — Engineering & Architecture",
    },
  },
  {
    name: "Chello May Harrison",
    role: "Co-Founder — Strategy & Delivery",
    bio: "Chello has run consulting engagements from first workshop to production launch across a dozen industries. She leads client strategy and delivery, keeping ambitious builds honest, scoped, and on schedule.",
    image: {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80",
      alt: "Chello May Harrison, Co-Founder of Actonaughts",
      caption: "Chello May Harrison — Strategy & Delivery",
    },
  },
];

export const mascot: Mascot = {
  name: "Morris",
  role: "Ship's Cat — Chief Morale Officer",
  bio: "Technically not on payroll. Sets the standup schedule anyway, mostly by sitting on the keyboard until one is called. Zero lines of code shipped, infinite morale shipped.",
  image: {
    src: "/mascot/morris-crew.jpg",
    alt: "Morris, the Actonaughts ship's cat, dressed as a pirate captain",
    caption: "Morris — Ship's Cat",
  },
};

export const services: Service[] = [
  {
    index: "01",
    title: "Full-Stack Product Builds",
    description:
      "End-to-end design and engineering for web and mobile products — from data model to deploy pipeline — built by one accountable team instead of three disconnected vendors.",
    stack: ["React / Next.js", "Node & Go services", "PostgreSQL", "Infrastructure as code"],
    image: {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
      alt: "Close-up of code on a monitor",
      caption: "Product Builds",
    },
  },
  {
    index: "02",
    title: "Systems & Cloud Architecture",
    description:
      "Architecture reviews and rebuilds for teams hitting the ceiling of what their current stack can carry — scalability, reliability, and cost brought back under control.",
    stack: ["AWS / GCP", "Kubernetes", "Event-driven systems", "Observability"],
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      alt: "Server room with rows of infrastructure",
      caption: "Systems & Cloud",
    },
  },
  {
    index: "03",
    title: "Technical Strategy & Advisory",
    description:
      "Fractional CTO-level guidance for founders and leadership teams navigating build-vs-buy decisions, technical due diligence, and roadmap planning.",
    stack: ["Technical due diligence", "Roadmapping", "Vendor evaluation", "Team structure"],
    image: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
      alt: "Analytics dashboard displayed on a laptop screen",
      caption: "Strategy & Advisory",
    },
  },
  {
    index: "04",
    title: "Embedded Product Teams",
    description:
      "Senior engineers and designers embedded directly inside your team for the duration of a build — shipping alongside you, not reporting in from a distance.",
    stack: ["Staff augmentation", "Design systems", "Code review & mentorship", "Delivery ops"],
    image: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      alt: "Team collaborating around laptops",
      caption: "Embedded Teams",
    },
  },
];

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    description:
      "A focused working session to map the real problem, current systems, and constraints — no boilerplate questionnaires.",
  },
  {
    index: "02",
    title: "Architect",
    description:
      "We scope the technical approach and delivery plan together, with tradeoffs and costs laid out before a line of code is written.",
  },
  {
    index: "03",
    title: "Build",
    description:
      "Short, visible iterations. You see working software every week, not a status deck.",
  },
  {
    index: "04",
    title: "Ship & Support",
    description:
      "We deploy, document, and stay attached through stabilization — then hand off a system your team can actually own.",
  },
];

export type CaseStudy = {
  index: string;
  client: string;
  title: string;
  summary: string;
  tags: string[];
  image: GalleryImage;
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    client: "Northbound Logistics",
    title: "Replacing a decade of spreadsheets with a live ops platform",
    summary:
      "A full-stack rebuild of dispatch, routing, and billing into one system — cutting manual reconciliation from days to minutes.",
    tags: ["Full-Stack Build", "Systems Architecture"],
    image: {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
      alt: "Team reviewing operations dashboards in a meeting",
      caption: "Northbound Logistics",
    },
  },
  {
    index: "02",
    client: "Fernbank Health",
    title: "A HIPAA-ready patient portal, from architecture to launch",
    summary:
      "Embedded alongside an internal team to design and ship a compliant patient-facing portal in fourteen weeks.",
    tags: ["Embedded Team", "Cloud Architecture"],
    image: {
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
      alt: "Team collaborating around a table with laptops",
      caption: "Fernbank Health",
    },
  },
  {
    index: "03",
    client: "Cedar & Vine",
    title: "Technical due diligence ahead of a Series B raise",
    summary:
      "An architecture and codebase audit that gave leadership a clear-eyed roadmap — and gave investors confidence.",
    tags: ["Advisory", "Due Diligence"],
    image: {
      src: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80",
      alt: "Close-up of code displayed on a screen",
      caption: "Cedar & Vine",
    },
  },
  {
    index: "04",
    client: "Almanac Studio",
    title: "Rebuilding a creative tools platform for scale",
    summary:
      "A ground-up rebuild of a real-time collaborative editor, moving from a single-server bottleneck to an event-driven architecture.",
    tags: ["Product Build", "Systems Architecture"],
    image: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
      alt: "Macro shot of a circuit board",
      caption: "Almanac Studio",
    },
  },
];
