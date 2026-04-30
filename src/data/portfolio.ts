export const personalInfo = {
  name: "Naveed Ahmed",
  title: "Full-Stack Developer & Creative Engineer",
  tagline: "Building the future, one pixel at a time",
  email: "naveed6028@gmail.com",
  github: "https://github.com/naveedahmad302",
  linkedin: "#",
  bio: "I craft immersive digital experiences that push the boundaries of what's possible on the web. Specializing in full-stack development with a passion for 3D graphics, AI, and cutting-edge technologies.",
};

export const projects = [
  {
    id: 1,
    title: "ASD Screening Platform",
    subtitle: "AI-Powered Health Tech",
    description:
      "Cross-platform mobile application for Autism Spectrum Disorder screening using eye tracking, speech analysis, and questionnaire-based assessments with ML-powered risk evaluation.",
    tech: ["React Native", "TypeScript", "FastAPI", "Firebase", "MediaPipe", "TensorFlow"],
    color: "#00f5ff",
    image: "/projects/asd.jpg",
    github: "https://github.com/naveedahmad302/fypApp",
    demo: "#",
    features: [
      "Real-time eye tracking with gaze analysis",
      "Speech biomarker detection using acoustic metrics",
      "ML-based behavioral pattern recognition",
      "Comprehensive clinical risk reporting",
    ],
    architecture: "React Native → FastAPI → Firebase/PostgreSQL → ML Pipeline",
  },
  {
    id: 2,
    title: "Neural Code Engine",
    subtitle: "AI Development Assistant",
    description:
      "An intelligent code generation and analysis platform that leverages large language models to accelerate development workflows with context-aware suggestions.",
    tech: ["Next.js", "Python", "OpenAI", "PostgreSQL", "Redis", "Docker"],
    color: "#ff00ff",
    image: "/projects/neural.jpg",
    github: "#",
    demo: "#",
    features: [
      "Context-aware code generation",
      "Multi-language support",
      "Real-time collaboration",
      "Intelligent debugging assistance",
    ],
    architecture: "Next.js → FastAPI → LLM Pipeline → PostgreSQL",
  },
  {
    id: 3,
    title: "Quantum Dashboard",
    subtitle: "Real-time Analytics Platform",
    description:
      "A high-performance analytics dashboard with real-time data visualization, interactive charts, and predictive analytics powered by machine learning models.",
    tech: ["React", "D3.js", "Node.js", "MongoDB", "WebSocket", "TensorFlow.js"],
    color: "#00ff88",
    image: "/projects/quantum.jpg",
    github: "#",
    demo: "#",
    features: [
      "Real-time data streaming",
      "Interactive 3D visualizations",
      "Predictive analytics engine",
      "Custom dashboard builder",
    ],
    architecture: "React → Node.js → MongoDB → ML Pipeline",
  },
  {
    id: 4,
    title: "CyberVault",
    subtitle: "Blockchain Security Suite",
    description:
      "A comprehensive blockchain security platform featuring smart contract auditing, vulnerability scanning, and decentralized identity management.",
    tech: ["Solidity", "Rust", "React", "GraphQL", "IPFS", "Zero-Knowledge Proofs"],
    color: "#ffaa00",
    image: "/projects/cyber.jpg",
    github: "#",
    demo: "#",
    features: [
      "Smart contract vulnerability scanner",
      "Decentralized identity management",
      "Zero-knowledge proof integration",
      "Real-time threat monitoring",
    ],
    architecture: "React → GraphQL → Blockchain → IPFS",
  },
];

export const skills = [
  { name: "TypeScript", level: 95, category: "language", color: "#3178c6" },
  { name: "Python", level: 92, category: "language", color: "#3776ab" },
  { name: "React", level: 96, category: "frontend", color: "#61dafb" },
  { name: "Next.js", level: 94, category: "frontend", color: "#ffffff" },
  { name: "Three.js", level: 85, category: "frontend", color: "#049ef4" },
  { name: "Node.js", level: 90, category: "backend", color: "#339933" },
  { name: "FastAPI", level: 88, category: "backend", color: "#009688" },
  { name: "PostgreSQL", level: 87, category: "database", color: "#336791" },
  { name: "MongoDB", level: 85, category: "database", color: "#47a248" },
  { name: "Docker", level: 86, category: "devops", color: "#2496ed" },
  { name: "AWS", level: 82, category: "devops", color: "#ff9900" },
  { name: "GraphQL", level: 84, category: "backend", color: "#e10098" },
  { name: "Redis", level: 83, category: "database", color: "#dc382d" },
  { name: "TensorFlow", level: 78, category: "ai", color: "#ff6f00" },
  { name: "React Native", level: 91, category: "mobile", color: "#61dafb" },
  { name: "Rust", level: 75, category: "language", color: "#dea584" },
  { name: "Firebase", level: 88, category: "backend", color: "#ffca28" },
  { name: "Tailwind", level: 95, category: "frontend", color: "#06b6d4" },
  { name: "GSAP", level: 86, category: "frontend", color: "#88ce02" },
  { name: "WebGL", level: 80, category: "frontend", color: "#990000" },
];

export const experiences = [
  {
    id: 1,
    role: "Senior Full-Stack Developer",
    company: "Tech Innovators Inc.",
    period: "2023 — Present",
    description:
      "Leading development of cutting-edge web applications with focus on performance, scalability, and immersive user experiences.",
    highlights: [
      "Architected microservices infrastructure serving 1M+ users",
      "Reduced page load times by 60% through optimization",
      "Led team of 8 developers on critical projects",
    ],
    tech: ["Next.js", "FastAPI", "PostgreSQL", "AWS", "Docker"],
  },
  {
    id: 2,
    role: "Creative Developer",
    company: "Digital Frontiers Studio",
    period: "2021 — 2023",
    description:
      "Specialized in building award-winning interactive web experiences with 3D graphics and advanced animations.",
    highlights: [
      "Developed 15+ Awwwards-nominated websites",
      "Pioneered WebGL-based product configurators",
      "Built real-time collaborative design tools",
    ],
    tech: ["React", "Three.js", "GSAP", "WebGL", "Node.js"],
  },
  {
    id: 3,
    role: "Software Engineer",
    company: "DataFlow Systems",
    period: "2019 — 2021",
    description:
      "Built scalable data processing pipelines and analytics platforms for enterprise clients.",
    highlights: [
      "Designed ETL pipelines processing 10TB+ daily",
      "Implemented real-time analytics dashboard",
      "Achieved 99.9% uptime for critical services",
    ],
    tech: ["Python", "React", "PostgreSQL", "Redis", "Kubernetes"],
  },
];

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  about      - Learn about me
  skills     - View my technical skills
  projects   - Browse my projects
  experience - View my work experience
  contact    - Get in touch
  resume     - Download my resume
  theme      - Toggle theme
  clear      - Clear terminal
  matrix     - Enter the matrix
  hack       - Initiate hack sequence
  sudo       - Try your luck`,

  about: `
┌─────────────────────────────────────────┐
│          NAVEED AHMED                    │
│     Full-Stack Developer &              │
│     Creative Engineer                   │
├─────────────────────────────────────────┤
│                                         │
│  I build immersive digital experiences  │
│  that push the boundaries of what's     │
│  possible on the web.                   │
│                                         │
│  Specializing in:                       │
│  → Full-Stack Development               │
│  → 3D Graphics & WebGL                  │
│  → AI/ML Integration                    │
│  → Creative Coding                      │
│                                         │
│  Currently building the future of       │
│  developer portfolios.                  │
│                                         │
└─────────────────────────────────────────┘`,

  skills: `
╔══════════════════════════════════════════╗
║           TECH STACK                     ║
╠══════════════════════════════════════════╣
║                                          ║
║  LANGUAGES    TypeScript │ Python │ Rust  ║
║  FRONTEND     React │ Next.js │ Three.js  ║
║  BACKEND      Node.js │ FastAPI │ GraphQL ║
║  DATABASE     PostgreSQL │ MongoDB│ Redis ║
║  DEVOPS       Docker │ AWS │ K8s          ║
║  AI/ML        TensorFlow │ PyTorch        ║
║  MOBILE       React Native │ Flutter      ║
║                                          ║
╚══════════════════════════════════════════╝`,

  projects: `
[01] ASD Screening Platform  ─ AI Health Tech
[02] Neural Code Engine      ─ AI Dev Assistant
[03] Quantum Dashboard       ─ Analytics Platform
[04] CyberVault              ─ Blockchain Security

Type 'project <number>' for details.`,

  experience: `
▸ 2023-Present  Senior Full-Stack Developer
                @ Tech Innovators Inc.

▸ 2021-2023     Creative Developer
                @ Digital Frontiers Studio

▸ 2019-2021     Software Engineer
                @ DataFlow Systems`,

  contact: `
╭──────────────────────────────────────╮
│         GET IN TOUCH                 │
├──────────────────────────────────────┤
│                                      │
│  📧  naveed6028@gmail.com            │
│  🔗  github.com/naveedahmad302       │
│  💼  LinkedIn                        │
│                                      │
│  Or use the contact form below ↓     │
│                                      │
╰──────────────────────────────────────╯`,

  resume: `
Generating resume download link...
[████████████████████████] 100%
Resume ready! Download initiated.`,

  matrix: `
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

  ╔══════════════════════════════╗
  ║  SYSTEM BREACH DETECTED     ║
  ║  ACCESSING MAINFRAME...     ║
  ║  [████████░░] 80%           ║
  ║                              ║
  ║  Just kidding. 😄            ║
  ╚══════════════════════════════╝`,

  hack: `
> Initializing hack sequence...
> Bypassing firewall [████████████] DONE
> Accessing mainframe [████████████] DONE
> Downloading secrets [████████████] DONE
>
> ERROR: Nice try! 🔒
> This portfolio is hack-proof.
> Maybe try 'help' instead?`,

  sudo: `
Permission denied: Nice try! 
You need root access to do that.
This isn't your terminal... or is it? 🤔`,

  clear: "CLEAR",
};
