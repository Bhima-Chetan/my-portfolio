// All site content lives here. Pure data (no JSX / asset imports) so node:test can load it.

export const profile = {
  name: 'Bhima Chetan',
  role: 'Software Developer',
  location: 'Hyderabad, India',
  timeZone: 'Asia/Kolkata',
  email: 'bhimachetan.work@gmail.com',
  github: 'https://github.com/Bhima-Chetan',
  linkedin: 'https://www.linkedin.com/in/bhima-chetan-0b4b612b5/',
  resume: '/Bhima_Chetan_Resume.pdf',
};

export const roles = [
  'enterprise web apps',
  'Angular + .NET systems',
  'full-stack products',
  'things that ship',
];

export const stats = [
  { value: 3, suffix: '', label: 'internships, including a defence PSU' },
  { value: 13, suffix: '', label: 'months of hands-on industry work' },
  { value: 6, suffix: '', label: 'projects built and deployed end-to-end' },
];

export const experience = [
  {
    id: 'hal',
    role: 'Software Developer Intern',
    company: 'Hindustan Aeronautics Limited',
    place: 'Hyderabad',
    period: 'Jan 2026 — Jun 2026',
    summary:
      'Full-stack work on an internal enterprise web application: Angular front end, .NET Web API backend, PostgreSQL data layer.',
    points: [
      'Built reusable, responsive UI components (dynamic data tables, dialogs, multi-step forms) and wired them to backend REST endpoints.',
      'Implemented Excel import/export end-to-end, from the UI through to backend document generation, improving reporting reliability.',
      'Diagnosed and fixed defects across a multi-role approval workflow spanning frontend logic, backend validation and database queries.',
      'Worked with engineering and operations stakeholders on requirements, testing cycles and iterative delivery.',
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', '.NET Web API', 'C#', 'PostgreSQL', 'SQL', 'REST APIs'],
  },
  {
    id: 'unified-mentor',
    role: 'Software Engineer Intern',
    company: 'Unified Mentor',
    place: 'Remote',
    period: 'Jun 2025 — Sep 2025',
    summary: 'Feature work inside a distributed Agile team, from user needs through QA.',
    points: [
      'Analysed user needs and developed software features with a distributed team.',
      'Used Git and Jira for version control and issue tracking, supporting continuous integration.',
      'Authored test cases and resolved defects during QA cycles, improving product stability.',
    ],
    stack: ['Git/GitHub', 'Jira', 'Agile'],
  },
  {
    id: 'anitha-dairy',
    role: 'Mobile Application Developer Intern',
    company: 'Anitha Dairy Products',
    place: 'Hyderabad',
    period: 'Jun 2024 — Aug 2024',
    summary: 'An Android app that streamlined operational data collection and reporting for dairy operations.',
    points: [
      'Gathered requirements from stakeholders and built features that improved data accuracy and reporting.',
      'Ran end-to-end testing and assisted deployment for smooth user adoption.',
    ],
    stack: ['Java', 'Android'],
  },
];

export const projects = [
  {
    id: 'festly',
    title: 'Festly',
    kind: 'Full-stack',
    featured: true,
    status: 'Launching soon',
    tagline: 'A commission-free sports events booking platform.',
    points: [
      'Payment verification, fraud detection and encrypted host-to-booker chat.',
      'Self-hosted with Docker Compose, GitHub Actions CI/CD and Sentry monitoring.',
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Docker', 'GitHub Actions', 'Sentry', 'Linux'],
    live: 'https://festly.co.in',
  },
  {
    id: 'unfiltered',
    title: 'Unfiltered',
    kind: 'Full-stack',
    featured: true,
    status: 'Live',
    tagline: 'A self-hosted blogging platform with its own admin CMS, running in production.',
    points: [
      'Admin dashboard for posts, comments, taxonomy, subscribers, users and view analytics; TipTap rich-text editor.',
      'PostgreSQL full-text search with live suggestions, reactions, RSS and a confirmed-opt-in newsletter.',
      'NextAuth sign-in; Docker Compose behind Cloudflare with a scheduled backup worker to MinIO.',
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Docker', 'Linux'],
    live: 'https://bhuvanasrija-blogs.xyz/',
    code: 'https://github.com/Bhima-Chetan/unfiltered-blog-website',
  },
  {
    id: 'smart-presence',
    title: 'Smart Presence AI',
    kind: 'AI',
    featured: true,
    tagline: 'Facial-recognition attendance with a reporting layer and admin dashboard.',
    points: [
      'Python + Flask + OpenCV pipeline backed by SQLite.',
      'Containerised with Docker and deployed across Render, Vercel and Railway.',
    ],
    stack: ['Python', 'Flask', 'OpenCV', 'SQLite', 'Docker'],
    code: 'https://github.com/Bhima-Chetan/smart-presence-ai',
  },
  {
    id: 'chat',
    title: 'Realtime Chat',
    kind: 'Mobile',
    tagline: 'Expo React Native app with JWT auth, presence, typing indicators and read receipts over Socket.IO.',
    stack: ['React Native', 'Node.js', 'Socket.IO', 'MongoDB', 'JavaScript'],
    code: 'https://github.com/Bhima-Chetan/chat-app',
  },
  {
    id: 'expense',
    title: 'Expense Tracker',
    kind: 'Full-stack',
    tagline: 'Budgets, categories and charts in a React + Redux single-page app.',
    stack: ['React', 'Redux', 'Recharts', 'JavaScript'],
    live: 'https://expense-tracker-8nan6tnzl-chetan-github12s-projects.vercel.app/',
    code: 'https://github.com/Bhima-Chetan/Expense-Tracker',
  },
  {
    id: 'todo',
    title: 'Todo List',
    kind: 'Full-stack',
    tagline: 'A fast, minimal task manager built with React and Vite.',
    stack: ['React', 'Vite', 'JavaScript'],
    live: 'https://todo-list-app-bct.netlify.app/',
    code: 'https://github.com/Bhima-Chetan/todo-list-app',
  },
];

export const skillGroups = [
  { name: 'Languages', skills: ['Java', 'Python', 'C#', 'TypeScript', 'JavaScript', 'SQL'] },
  { name: 'Frontend & Mobile', skills: ['Angular', 'RxJS', 'Next.js', 'React', 'Android'] },
  { name: 'Backend & Data', skills: ['.NET Web API', 'Flask', 'REST APIs', 'PostgreSQL', 'Oracle', 'SQLite'] },
  { name: 'Tools & Cloud', skills: ['Git/GitHub', 'Jira', 'Agile', 'Docker', 'GitHub Actions', 'AWS', 'Linux'] },
];

// Fallback copy for skills that no listed role/project shows off.
export const skillNotes = {
  AWS: 'EC2, S3, IAM and VPC: hands-on from deploying personal projects.',
};

// Where a skill was used, across roles and projects. Drives the Skills explorer.
export function usedIn(skill) {
  return [
    ...experience.filter((e) => e.stack.includes(skill)).map((e) => ({ type: 'Role', title: e.company, sub: e.role, href: '#experience' })),
    ...projects.filter((p) => p.stack.includes(skill)).map((p) => ({ type: 'Project', title: p.title, sub: p.tagline, href: '#projects' })),
  ];
}

// Command palette matching: every query word must appear in the label or keywords.
export function matchCommand(command, query) {
  const hay = `${command.label} ${command.keywords ?? ''}`.toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
}
