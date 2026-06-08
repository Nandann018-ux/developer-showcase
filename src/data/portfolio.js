// ── Portfolio data for Nandan Achar. Edit links marked TODO with real URLs. ──

export const profile = {
  name: 'Nandan S Achar',
  role: 'Full Stack Developer | MERN Stack | Next.js | React Native',
  tagline:
    'I build scalable web and mobile applications using modern technologies like React, Next.js, Node.js, MongoDB, MySQL, and TypeScript. Passionate about creating user-focused products and solving real-world problems through software.',
  location: 'Bengaluru, India',
  eduLocation: 'Pune, Maharashtra',
  hometown: 'Bangalore, Karnataka',
  email: 'nandanachar18@gmail.com',
  phone: '+91 94839 69052',
  resumeUrl: '/resume.pdf', // drop resume.pdf into /public
  about: [
    "I'm a Full Stack Developer specializing in modern web and mobile applications using React, Next.js, Node.js, TypeScript, MongoDB, and React Native.",
    "Over the years, I've built projects ranging from responsive web platforms to cross-platform mobile applications, focusing on performance, scalability, and user experience. I enjoy working across the entire development lifecycle, from crafting intuitive interfaces to designing secure APIs and efficient database architectures.",
    'Beyond development, I actively contribute to open source, solve algorithmic problems, and continuously explore new technologies to grow as a software engineer.',
  ],
}

export const education = {
  degree: 'B.Tech — Computer Science & AI-ML',
  school: 'Newton School of Technology (ADYPU)',
  period: '2024 — 2028',
  grade: 'CGPA 7.72 / 10.0',
}

// Education timeline (most recent first). TODO: fill real school names/years.
export const educationTimeline = [
  {
    degree: 'B.Tech — Computer Science & AI-ML',
    school: 'Newton School of Technology (ADYPU)',
    period: '2024 — 2028',
    detail: '',
  },
  {
    degree: 'Senior Secondary (Class XII)',
    school: 'Narayana PU College, Nagarbhavi',
    period: '2022 — 2024',
    detail: 'PCM + IIT-JEE preparation.',
  },
  {
    degree: 'Secondary (Class X)',
    school: 'Chinmaya Vidyalaya, Banashankari',
    period: '2014 — 2022',
    detail: '',
  },
]

export const socials = [
  // TODO: replace # with your real profile URLs
  { label: 'GitHub', url: 'https://github.com/Nandann018-ux', icon: 'github' },
  { label: 'LinkedIn', url: '#', icon: 'linkedin' },
  { label: 'Codeforces', url: '#', icon: 'code' },
  { label: 'LeetCode', url: '#', icon: 'trophy' },
  { label: 'Email', url: 'mailto:nandanachar18@gmail.com', icon: 'mail' },
]

// Hero metric strip — head + accent (highlighted suffix) + caption.
export const stats = [
  { head: '150', accent: '+', label: 'DSA Solved', sub: 'LeetCode + Codeforces' },
  { head: '952', accent: '', label: 'CF Max Rating', sub: 'Codeforces peak' },
  { head: '2.5', accent: 'K+', label: 'GitHub Contribs', sub: 'last 12 months' },
  { head: '8', accent: '', label: 'OSS PRs Merged', sub: 'Airflow, Marked, Axios…' },
  { head: '10', accent: '+', label: 'Projects Built', sub: 'web, ML & mobile' },
]

// "What I bring" highlight cards
export const highlights = [
  { icon: 'cap', title: 'B.Tech — CS & AI-ML', detail: 'Newton School of Technology (ADYPU)' },
  { icon: 'git', title: 'Open Source', detail: '8 merged PRs across Apache Airflow, Marked, React-Router, Axios & Shiki' },
  { icon: 'code', title: '150+ DSA', detail: 'Solved across LeetCode + Codeforces · max CF rating 952' },
  { icon: 'layers', title: 'Full-Stack', detail: 'React · Next.js · Node · Express · MongoDB · MySQL' },
  { icon: 'phone', title: 'Mobile', detail: 'React Native + Expo — offline-first apps, native UX' },
  { icon: 'server', title: 'Backend', detail: 'Express + Prisma + MySQL · JWT auth · web scraping pipelines' },
  { icon: 'brain', title: 'ML', detail: 'PyTorch · Scikit-learn · RAG · LLaMA 3 · image forensics' },
  { icon: 'cloud', title: 'DevOps', detail: 'AWS · Docker · GitHub Actions · CI/CD for shipped projects' },
]

// "Currently" status rows
export const currently = {
  date: 'Jun 2026',
  rows: [
    { k: 'Building', v: 'Production-grade web & ML projects, this portfolio' },
    { k: 'Learning', v: 'AWS · Docker · system design · AI agents' },
    { k: 'Contributing', v: 'Open source — upstream PRs & Hacktoberfest' },
    { k: 'Looking for', v: 'Full-Stack · ML · Software Development internships' },
  ],
}

// grouped skills from resume
export const skills = [
  { name: 'Python', level: 92 },
  { name: 'React / Next.js', level: 90 },
  { name: 'TypeScript / JavaScript', level: 86 },
  { name: 'PyTorch / Scikit-learn', level: 84 },
  { name: 'Node.js / Express', level: 85 },
  { name: 'React Native', level: 80 },
  { name: 'SQL / MongoDB / Prisma', level: 78 },
  { name: 'Docker / AWS / CI', level: 72 },
]

export const skillGroups = [
  { title: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'CSS'] },
  {
    title: 'Frameworks & Libraries',
    items: ['React', 'Next.js', 'React Native', 'Node.js', 'Express', 'FastAPI', 'Tailwind CSS', 'Prisma ORM', 'PyTorch', 'Scikit-learn', 'Pandas'],
  },
  {
    title: 'Data & Infra',
    items: ['MySQL', 'MongoDB', 'AWS', 'Docker', 'Docker Compose', 'GitHub Actions', 'Hugging Face', 'RAG'],
  },
  { title: 'Tools', items: ['Git & GitHub', 'Postman', 'Tableau', 'OAuth 2.0', 'UI/UX'] },
]

// Merged open-source pull requests. Preview images are rendered live from
// GitHub's OpenGraph endpoint (opengraph.githubassets.com) in the PR section.
export const pullRequests = [
  {
    repo: 'apache/airflow',
    number: 64133,
    title: 'Fix task CLI map_index bounds validation',
    tags: ['Python', 'CLI', 'Bugfix'],
    url: 'https://github.com/apache/airflow/pull/64133',
  },
  {
    repo: 'apache/airflow',
    number: 63712,
    title: 'Remove stray character and add a unit test to lock formatting',
    tags: ['Python', 'Tests'],
    url: 'https://github.com/apache/airflow/pull/63712',
  },
  {
    repo: 'markedjs/marked',
    number: 3923,
    title: 'fix(cli): use file URL for config import',
    tags: ['CLI', 'Bugfix'],
    url: 'https://github.com/markedjs/marked/pull/3923',
  },
  {
    repo: 'markedjs/marked',
    number: 3922,
    title: 'fix(cli): honor positional input file',
    tags: ['CLI', 'Bugfix'],
    url: 'https://github.com/markedjs/marked/pull/3922',
  },
  {
    repo: 'remix-run/react-router',
    number: 14830,
    title: 'Improve type safety — reduce unsafe casts & remove @ts-expect-error',
    tags: ['TypeScript', 'DX'],
    url: 'https://github.com/remix-run/react-router/pull/14830',
  },
  {
    repo: 'axios/axios',
    number: 7272,
    title: 'Add unit tests for nested objects, arrays & circular references',
    tags: ['Testing', 'Reliability'],
    url: 'https://github.com/axios/axios/pull/7272',
  },
  {
    repo: 'shikijs/shiki',
    number: 1245,
    title: 'CLI language inference edge cases + platform file-handling tests',
    tags: ['CLI', 'Tests'],
    url: 'https://github.com/shikijs/shiki/pull/1245',
  },
  {
    repo: 'shikijs/shiki',
    number: 1153,
    title: 'Shiki CLI language inference improvements',
    tags: ['CLI'],
    url: 'https://github.com/shikijs/shiki/pull/1153',
  },
]

// Education + certifications timeline.
export const milestones = [
  {
    role: 'B.Tech — Computer Science & AI-ML',
    company: 'Newton School of Technology (ADYPU)',
    period: '2024 — 2028',
    desc: 'CGPA 7.72 / 10.0. Coursework spanning machine learning, full-stack web, and systems.',
  },
  {
    role: 'Deloitte — Technology Job Simulation',
    company: 'Certification',
    period: 'May 2026',
    desc: 'Implemented data transformation logic with unit tests; drafted a software development proposal for machine health.',
    link: '#',
  },
  {
    role: 'Hacktoberfest',
    company: 'Open Source',
    period: '2025',
    desc: 'Collaborated with global maintainers across multiple repositories — merged PRs to Apache Airflow, Marked, React-Router, Axios, and Shiki.',
  },
]

// Live coding-profile handles for the Coding Activity dashboard.
export const githubUser = 'Nandann018-ux'
export const leetcodeUser = 'Nandannn018'
export const codeforcesUser = 'Nandynamic'

// Host for github-readme-stats. The public demo (…vercel.app) is heavily
// rate-limited and often fails. Deploy your own fork and put its URL here.
// e.g. 'https://github-readme-stats-yourname.vercel.app'
export const githubStatsHost = 'https://github-readme-stats.vercel.app'

// Competitive-programming / coding profiles. TODO: set real URLs + stats.
export const codingProfiles = [
  { platform: 'LeetCode', icon: 'code', handle: '@nandanachar', stat: 'Problems solved', url: '#' },
  { platform: 'Codeforces', icon: 'terminal', handle: '@nandanachar', stat: 'Rating', url: '#' },
  { platform: 'HackerRank', icon: 'binary', handle: '@nandanachar', stat: '5★ Problem Solving', url: '#' },
  { platform: 'GitHub', icon: 'github', handle: '@Nandann018-ux', stat: 'Repositories', url: 'https://github.com/Nandann018-ux' },
]

// Certifications & credentials. TODO: add real links.
export const certifications = [
  {
    title: 'Technology Job Simulation',
    issuer: 'Deloitte (Forage)',
    date: 'May 2026',
    desc: 'Data transformation logic with unit tests; software development proposal for machine health.',
    link: '#',
  },
  {
    title: 'Hacktoberfest',
    issuer: 'DigitalOcean',
    date: '2025',
    desc: 'Merged open-source pull requests across multiple repositories with global maintainers.',
    link: '#',
  },
]

// "What I do" service cards
export const services = [
  {
    icon: 'layout',
    title: 'Full-Stack Web',
    desc: 'End-to-end apps with React, Next.js, Node & Express — from schema design to polished UI.',
  },
  {
    icon: 'brain',
    title: 'Machine Learning',
    desc: 'Training & deploying models in PyTorch — image forensics, fine-tuning, interpretability.',
  },
  {
    icon: 'smartphone',
    title: 'Mobile Apps',
    desc: 'Offline-first cross-platform apps with React Native, local persistence & smooth UX.',
  },
  {
    icon: 'server',
    title: 'Backend & APIs',
    desc: 'Secure JWT/OAuth APIs, web scraping pipelines, and data tooling with Python & Node.',
  },
]

export const achievements = [
  { icon: 'target', title: '98.25% Accuracy', desc: 'AI-image detection model (Aperture) on CIFAKE, 0.9987 AUC.' },
  { icon: 'gitMerge', title: '8 Merged PRs', desc: 'Upstream contributions to Apache Airflow, Marked, React-Router, Axios & Shiki.' },
  { icon: 'award', title: 'Deloitte Simulation', desc: 'Technology Job Simulation — data transformation + unit tests.' },
  { icon: 'flame', title: 'Hacktoberfest', desc: 'Collaborated with global maintainers across repositories.' },
]

// TODO: replace with real testimonials (name, role, quote, optional avatar URL)
export const testimonials = [
  {
    quote:
      'Nandan ships fast and writes clean, well-tested code. His open-source PRs were thorough and a pleasure to review.',
    name: 'Open-Source Maintainer',
    role: 'Reviewer',
  },
  {
    quote:
      'Strong across ML and full-stack — rare to find someone equally comfortable in PyTorch and a React codebase.',
    name: 'Project Collaborator',
    role: 'Engineer',
  },
  {
    quote:
      'Reliable, curious, and detail-oriented. Took ownership of the backend and delivered ahead of schedule.',
    name: 'Team Lead',
    role: 'Mentor',
  },
]

// TODO: replace with your real posts / links
export const posts = [
  {
    title: 'Detecting AI-Generated Images with EfficientNet',
    excerpt: 'How I fused CNN features, Error Level Analysis and EXIF anomalies into a meta-classifier hitting 98% accuracy.',
    date: 'May 2026',
    tag: 'Machine Learning',
    url: '#',
  },
  {
    title: 'Building a RAG Pipeline over Research Papers',
    excerpt: 'PDF chunking, embeddings and top-K retrieval feeding LLaMA 3 for grounded, source-attributed answers.',
    date: 'Mar 2026',
    tag: 'LLMs',
    url: '#',
  },
  {
    title: 'My First Merged PRs to Axios & React-Router',
    excerpt: 'Lessons from contributing tests and type-safety fixes to libraries millions of devs depend on.',
    date: 'Oct 2025',
    tag: 'Open Source',
    url: '#',
  },
]

export const faqs = [
  {
    q: 'Are you open to internships or full-time roles?',
    a: 'Yes — I\'m actively looking for opportunities in full-stack and ML engineering. Reach out via email and I\'ll respond quickly.',
  },
  {
    q: 'What\'s your strongest stack?',
    a: 'React / Next.js on the frontend, Node.js & FastAPI on the backend, and PyTorch for machine-learning work. I\'m comfortable owning a feature end to end.',
  },
  {
    q: 'Do you contribute to open source?',
    a: 'Regularly. I have 8 merged pull requests across Apache Airflow, Marked, React-Router, Axios and Shiki, and participated in Hacktoberfest with global maintainers.',
  },
  {
    q: 'Can you work on mobile apps?',
    a: 'Yes — I build cross-platform apps with React Native, including offline-first architectures with on-device persistence.',
  },
]

// Drop UI screenshots into public/projects/ with these names (png/jpg/webp).
// Missing files fall back gracefully to a gradient placeholder.
export const projects = [
  {
    title: 'Aperture',
    category: 'ML',
    desc: 'AI-powered image forensics platform that detects AI-generated and manipulated images using deep learning and forensic analysis. Combines EfficientNet-B0, metadata inspection, object detection, and visual explainability for accurate, transparent authenticity verification.',
    tags: ['PyTorch', 'EfficientNet', 'YOLOv8', 'CLIP', 'Streamlit'],
    highlight: '98.25% accuracy · 0.9987 AUC',
    image: '/projects/aperture.png',
    link: 'https://nandann018-aperture-forensics.hf.space/',
    repo: 'https://github.com/Nandann018-ux/Aperture',
  },
  {
    title: 'PaperMind',
    category: 'ML + Backend',
    desc: 'RAG-powered research assistant that lets users query academic papers in natural language. Combines PDF processing, semantic search, and LLaMA 3 to deliver accurate, context-aware answers with source-backed citations.',
    tags: ['RAG', 'LLaMA 3', 'Groq', 'Embeddings', 'Python'],
    highlight: 'grounded answers with source attribution',
    image: '/projects/papermind.png',
    link: 'https://papermindgit.streamlit.app/',
    repo: 'https://github.com/Nandann018-ux/Papermind',
  },
  {
    title: 'JobSync',
    category: 'Full-Stack',
    desc: 'Job application management platform that tracks opportunities from discovery to offer. Centralizes listings, application statuses, and progress updates while automating job aggregation from multiple platforms.',
    tags: ['Node.js', 'Express', 'JWT', 'Web Scraping'],
    highlight: '100+ listings unified across platforms',
    image: '/projects/jobsync.png',
    link: 'https://chronosapiens.vercel.app/',
    repo: 'https://github.com/Nandann018-ux/chronosapiens',
  },
  {
    title: 'StepUp — Offline Fitness Tracker',
    category: 'Mobile',
    desc: 'Offline-first fitness tracking app to log workouts, monitor progress, and keep exercise streaks without an internet connection. All workout data is securely stored on-device for a fast, seamless experience.',
    tags: ['React Native', 'AsyncStorage', 'Context API'],
    highlight: 'offline-first · zero backend',
    image: '/projects/stepup.png',
    link: 'https://drive.google.com/file/d/1ydgGcwvDTTGquenB4k0OID-b3fOdTv4z/view',
    repo: 'https://github.com/Nandann018-ux/StepUp',
  },
]
