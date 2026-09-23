'use client'

import LearningPathTracker from '@/components/LearningPathTracker'
import PortfolioAnalyticsDashboard from '@/components/PortfolioAnalyticsDashboard'
import CareerRoadmapBuilder from '@/components/CareerRoadmapBuilder'
import OpenSourceTracker from '@/components/OpenSourceTracker'
import ResumeGenerator from '@/components/ResumeGenerator'
import TechStackChecker from '@/components/TechStackChecker'
import LiveCodingExplanationBot from '@/components/LiveCodingExplanationBot'
import HackathonTimeline from '@/components/HackathonTimeline'
import GitHubStatsBoard from '@/components/GitHubStatsBoard'
import InterviewPrepAssistant from '@/components/InterviewPrepAssistant'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  X,
} from 'lucide-react'
import { useState } from 'react'

/* =========================================================
   PROJECTS
========================================================= */

const projects = [
  {
    title: 'GlowGuide AI',
    description:
      'AI-powered skincare application that provides personalized skincare recommendations, routine guidance, and product discovery.',
    tags: ['Next.js', 'React', 'Gemini', 'AI'],
    link: 'https://glowguide-skincare-ai.vercel.app/',
    github: '',
  },
  {
    title: 'Smart Task Automation Assistant',
    description:
      'Full-stack AI automation platform with authentication, task management, dashboards, REST APIs, workflow capabilities, and LLM-powered assistance.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'LLM'],
    link: 'https://smart-task-frontend-one.vercel.app/',
    github:
      'https://github.com/HaripriyaAddepalli/smart-task-automation-assistant',
  },
  {
    title: 'AI Virtual Try-On',
    description:
      'Computer-vision based virtual try-on application exploring clothing visualization, image processing, segmentation, pose-related processing, and garment overlay.',
    tags: ['Python', 'Flask', 'TensorFlow', 'OpenCV', 'Computer Vision'],
    link: 'https://virtual-try-on-website-ar-vr.onrender.com',
    github: '',
  },
  {
    title: 'Food Delivery Platform',
    description:
      'Full-stack food delivery platform with authentication, restaurant browsing, cart management, ordering, live order tracking, and an admin dashboard.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT'],
    link: 'https://food-delivery-frontend-s2l9.onrender.com/',
    github: '',
  },
  {
    title: 'Raksha-AI',
    description:
      'AI-focused web application developed as part of the portfolio project collection, demonstrating practical AI integration and modern web development.',
    tags: ['React', 'AI', 'Web Development'],
    link: 'https://raksha-ai-three.vercel.app/',
    github: '',
  },
  {
    title: 'NoteStream',
    description:
      'Full-stack note management application demonstrating modern web application development, data management, and responsive UI.',
    tags: ['React', 'Node.js', 'MongoDB', 'Full Stack'],
    link: 'https://notestream-kj7z.onrender.com/',
    github: '',
  },
  {
    title: 'SemanticMatch AI',
    description:
      'AI-based candidate matching application designed to compare candidate information with job requirements using semantic matching techniques.',
    tags: ['Python', 'NLP', 'AI', 'Streamlit'],
    link: '',
    github: '',
  },
  {
    title: 'Gesture Arena',
    description:
      'Real-time gesture interaction project using computer vision and web technologies for interactive multiplayer experiences.',
    tags: ['React', 'MediaPipe', 'Socket.IO'],
    link: '',
    github: '',
  },
  {
    title: 'NIDS + AI Analysis',
    description:
      'Academic cybersecurity project combining Snort and Suricata rule-based network intrusion detection with an additional ML/AI analysis layer.',
    tags: ['Snort', 'Suricata', 'Python', 'ML', 'Cybersecurity'],
    link: '',
    github: '',
  },
]

/* =========================================================
   SKILLS
========================================================= */

const skills = [
  {
    title: 'Programming',
    icon: Code2,
    items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'SQL'],
  },
  {
    title: 'Frontend',
    icon: Layers3,
    items: [
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'Bootstrap',
      'HTML5',
      'CSS3',
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT',
      'Socket.IO',
    ],
  },
  {
    title: 'AI / ML',
    icon: Brain,
    items: [
      'Machine Learning',
      'Deep Learning',
      'LLMs',
      'NLP',
      'Computer Vision',
      'TensorFlow',
      'PyTorch',
      'Scikit-Learn',
      'OpenCV',
      'Hugging Face',
      'LangChain',
      'Gemini',
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    items: ['MongoDB', 'MySQL', 'Firebase'],
  },
  {
    title: 'Automation & Tools',
    icon: Code2,
    items: [
      'n8n',
      'Selenium',
      'BeautifulSoup',
      'Pandas',
      'NumPy',
      'Git',
      'GitHub',
      'Docker',
      'Postman',
      'Linux',
    ],
  },
]

/* =========================================================
   EXPERIENCE
========================================================= */

const experiences = [
  {
    role: 'Founding AI & Full Stack Engineer Intern',
    company: 'Vats Mobility',
    period: 'Jul 2026 - Present',
    location: 'Remote',
    type: 'Internship',
    description:
      'Building AI-powered mobility solutions and intelligent product features using React, Node.js, Express.js, MongoDB, Python, and LLM APIs. Contributing to Vats Insight, Vats Connect, REST APIs, and product architecture.',
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Python',
      'LLM APIs',
      'REST APIs',
    ],
  },
  {
    role: 'AI Automation Engineer Intern',
    company: 'AI Training Startup',
    period: '2025 - Present',
    location: 'Remote',
    type: 'Internship',
    description:
      'Building AI-powered automation workflows using n8n for lead capture, career assessment, job placement, and marketing processes. Working with Tally, webhooks, Gmail, Google Sheets, JavaScript Code nodes, IF conditions, and LLM APIs.',
    technologies: [
      'n8n',
      'Tally',
      'Webhooks',
      'Gmail',
      'Google Sheets',
      'JavaScript',
      'LLM APIs',
    ],
  },
  {
    role: 'AI-Driven Software Development Intern',
    company: 'Pantech Solutions × SVNIT Surat',
    period: 'May 2026',
    location: 'Remote',
    type: 'Internship',
    description:
      'Worked on AI-driven software development using Python and machine learning, including data preprocessing, model development, and software engineering tasks.',
    technologies: [
      'Python',
      'AI',
      'Machine Learning',
      'Data Preprocessing',
      'Software Development',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'InAmigos Foundation',
    period: 'May 2026',
    location: 'Remote',
    type: 'Internship',
    description:
      'Developed responsive web interfaces using HTML, CSS, and JavaScript for social-impact web applications and worked on frontend user experience.',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Responsive Design',
      'Web Development',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'ApexPlanet Software Pvt. Ltd.',
    period: 'Jun 2025 - Jul 2025',
    location: 'Remote',
    type: 'Internship',
    description:
      'Worked on responsive frontend development using HTML, CSS, and JavaScript, REST API integration, cross-browser compatibility, and frontend performance.',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'REST APIs',
      'Frontend Development',
    ],
  },
  {
    role: 'Python Web Scraping Intern',
    company: 'Phelix IT Solutions',
    period: '2024 - 2025',
    location: 'Remote',
    type: 'Internship',
    description:
      'Developed Python-based web scraping workflows using BeautifulSoup and Selenium, with data cleaning and structured processing using CSV, JSON, and database storage.',
    technologies: [
      'Python',
      'BeautifulSoup',
      'Selenium',
      'Web Scraping',
      'Data Cleaning',
      'CSV',
      'JSON',
    ],
  },
]

/* =========================================================
   ACHIEVEMENTS
========================================================= */

const achievements = [
  'Google Gemini Student Ambassador 2026',
  'Smart India Hackathon — College Level Shortlisted',
  'HackOn with Amazon 6.0 — Shortlisted',
  'Founding AI & Full Stack Engineer Intern at Vats Mobility',
  '7+ technical internships',
  '9+ AI and Full Stack projects',
  'Multiple live project deployments',
]

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]" />

        <div className="absolute right-[-10%] top-[20%] h-[450px] w-[450px] rounded-full bg-pink-600/15 blur-[140px]" />

        <div className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[140px]" />
      </div>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            <span className="text-white">Hari</span>
            <span className="text-purple-400">Priya</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">

            <a
              href="#about"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              About
            </a>

            <a
              href="#skills"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Skills
            </a>

            <a
              href="#projects"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Projects
            </a>

            <a
              href="#github"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              GitHub
            </a>

            <a
              href="#experience"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Experience
            </a>

            <a
              href="#interview-prep"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Interview Prep
            </a>

            <a
              href="#contact"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Contact
            </a>

          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-black/95 px-6 py-5 md:hidden">
            <div className="flex flex-col gap-5">

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>

              <a
                href="#skills"
                onClick={() => setMenuOpen(false)}
              >
                Skills
              </a>

              <a
                href="#projects"
                onClick={() => setMenuOpen(false)}
              >
                Projects
              </a>

              <a
                href="#github"
                onClick={() => setMenuOpen(false)}
              >
                GitHub
              </a>

              <a
                href="#experience"
                onClick={() => setMenuOpen(false)}
              >
                Experience
              </a>

              <a
                href="#interview-prep"
                onClick={() => setMenuOpen(false)}
              >
                Interview Prep
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>

            </div>
          </div>
        )}
      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative flex min-h-screen items-center px-6 pb-20 pt-32">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.3fr_0.7fr]">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              <Sparkles size={16} />
              AI & Full Stack Engineer
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              Building

              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                intelligent
              </span>

              digital experiences.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
              I build AI-powered applications, full-stack products,
              intelligent automation workflows, and practical software
              solutions using modern web technologies, machine learning,
              computer vision, and LLMs.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3.5 font-semibold transition hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20"
              >
                Explore Projects

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold transition hover:bg-white/10"
              >
                Contact Me
                <Mail size={18} />
              </a>

            </div>

            <div className="mt-10 flex flex-wrap gap-5 text-sm text-gray-400">

              <span className="flex items-center gap-2">
                <MapPin
                  size={16}
                  className="text-purple-400"
                />
                Andhra Pradesh, India
              </span>

              <span className="flex items-center gap-2">
                <GraduationCap
                  size={16}
                  className="text-pink-400"
                />
                B.Tech CSE — AI & ML
              </span>

            </div>

          </motion.div>

          {/* Hero Card */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >

            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">

              <div className="rounded-2xl border border-white/10 bg-black/60 p-6">

                <div className="mb-8 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="font-mono text-sm leading-8">

                  <p className="text-purple-400">
                    const <span className="text-white">developer</span> = {'{'}
                  </p>

                  <p className="pl-5 text-gray-400">
                    name:{' '}
                    <span className="text-green-400">
                      &quot;Haripriya Addepalli&quot;
                    </span>
                  </p>

                  <p className="pl-5 text-gray-400">
                    role:{' '}
                    <span className="text-green-400">
                      &quot;AI & Full Stack Engineer&quot;
                    </span>
                  </p>

                  <p className="pl-5 text-gray-400">
                    education:{' '}
                    <span className="text-green-400">
                      &quot;B.Tech CSE — AI & ML&quot;
                    </span>
                  </p>

                  <p className="pl-5 text-gray-400">
                    stack: [
                  </p>

                  <p className="pl-10 text-cyan-400">
                    &quot;Next.js&quot;,
                  </p>

                  <p className="pl-10 text-cyan-400">
                    &quot;React&quot;,
                  </p>

                  <p className="pl-10 text-cyan-400">
                    &quot;Python&quot;,
                  </p>

                  <p className="pl-10 text-cyan-400">
                    &quot;AI/ML&quot;,
                  </p>

                  <p className="pl-10 text-cyan-400">
                    &quot;LLMs&quot;
                  </p>

                  <p className="pl-5 text-gray-400">
                    ]
                  </p>

                  <p className="text-purple-400">
                    {'}'}
                  </p>

                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">

                  <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-4">
                    <p className="text-2xl font-bold">
                      7+
                    </p>

                    <p className="text-xs text-gray-400">
                      Technical Internships
                    </p>
                  </div>

                  <div className="rounded-xl border border-pink-500/20 bg-pink-500/10 p-4">
                    <p className="text-2xl font-bold">
                      9+
                    </p>

                    <p className="text-xs text-gray-400">
                      AI & Full Stack Projects
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section id="about" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
          >

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              About Me
            </p>

            <h2 className="text-4xl font-bold sm:text-5xl">
              AI, Full Stack & Automation.
            </h2>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">

              <p className="text-lg leading-8 text-gray-400">
                I am a Computer Science and Engineering student specializing
                in Artificial Intelligence and Machine Learning. I enjoy
                building practical software across AI, full-stack development,
                automation, computer vision, and modern web technologies.
              </p>

              <p className="text-lg leading-8 text-gray-400">
                My projects and internship experience include AI-powered web
                applications, LLM integrations, automation workflows,
                intelligent matching systems, computer-vision applications,
                and full-stack platforms using technologies such as React,
                Next.js, Node.js, Python, MongoDB, and LangChain.
              </p>

            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <p className="text-3xl font-bold text-purple-400">
                  7+
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  Technical Internships
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <p className="text-3xl font-bold text-pink-400">
                  9+
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  AI & Full Stack Projects
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <p className="text-3xl font-bold text-cyan-400">
                  8.64
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  Current CGPA / 10
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <p className="text-3xl font-bold text-green-400">
                  AI + FS
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  Primary Engineering Focus
                </p>
              </div>

            </div>

          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SKILLS
      ===================================================== */}

      <section id="skills" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              Technical Skills
            </p>

            <h2 className="text-4xl font-bold sm:text-5xl">
              Technologies I work with.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {skills.map((skill) => {
              const Icon = skill.icon

              return (
                <motion.div
                  key={skill.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"
                >

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                      <Icon size={20} />
                    </div>

                    <h3 className="font-semibold">
                      {skill.title}
                    </h3>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-gray-300"
                      >
                        {item}
                      </span>
                    ))}

                  </div>

                </motion.div>
              )
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section id="projects" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              Projects
            </p>

            <h2 className="text-4xl font-bold sm:text-5xl">
              Things I&apos;ve built.
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">
              A selection of AI, full-stack, automation, computer vision,
              and cybersecurity projects developed through academic work,
              internships, and independent development.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/[0.05]"
              >

                <div className="mb-5 flex items-start justify-between gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <Code2 size={22} />
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-purple-400/30 hover:text-white"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}

                </div>

                <h3 className="text-xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-gray-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">

                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}

                </div>

                <div className="mt-6 flex flex-wrap gap-3">

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/15"
                    >
                      Live / Demo
                      <ExternalLink size={15} />
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                    >
                      <Github size={15} />
                      GitHub
                    </a>
                  )}

                </div>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          GITHUB + NEW FEATURES
      ===================================================== */}

      <GitHubStatsBoard />

      <HackathonTimeline />

      <LiveCodingExplanationBot />

      <TechStackChecker />

      <ResumeGenerator />

      <OpenSourceTracker />

      <CareerRoadmapBuilder />

      <PortfolioAnalyticsDashboard />

      <LearningPathTracker />

      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section id="experience" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={fadeUp}
          >

            <div className="mb-12">

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                Experience
              </p>

              <h2 className="text-4xl font-bold sm:text-5xl">
                Internship Experience
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">
                Practical experience across AI engineering, full-stack
                development, automation, web development, and data-focused
                engineering.
              </p>

            </div>

            <div className="relative ml-3 border-l border-white/10">

              {experiences.map((experience, index) => (
                <motion.div
                  key={`${experience.company}-${experience.role}`}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="relative pb-12 pl-8 last:pb-0"
                >

                  <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-[#050505] bg-purple-500" />

                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-7 transition hover:border-purple-500/20">

                    <div className="flex flex-col justify-between gap-4 md:flex-row">

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h3 className="text-xl font-bold">
                            {experience.role}
                          </h3>

                          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                            {experience.type}
                          </span>

                        </div>

                        <p className="mt-2 text-purple-400">
                          {experience.company}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {experience.location}
                        </p>

                      </div>

                      <span className="shrink-0 text-sm text-gray-500">
                        {experience.period}
                      </span>

                    </div>

                    <p className="mt-5 leading-7 text-gray-400">
                      {experience.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">

                      {experience.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-gray-300"
                        >
                          {technology}
                        </span>
                      ))}

                    </div>

                  </div>

                </motion.div>
              ))}

            </div>

          </motion.div>
        </div>
      </section>

      {/* =====================================================
          ACHIEVEMENTS
      ===================================================== */}

      <section id="achievements" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 p-8 md:p-12">

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

              <div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                  Highlights
                </p>

                <h2 className="text-4xl font-bold sm:text-5xl">
                  Building, learning & competing.
                </h2>

                <p className="mt-6 leading-8 text-gray-400">
                  Alongside academic work, I actively participate in
                  internships, hackathons, student programs, and practical
                  software development projects.
                </p>

              </div>

              <div className="space-y-4">

                {achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-start gap-4 rounded-xl border border-white/10 bg-black/30 p-4"
                  >

                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-green-400"
                      size={20}
                    />

                    <span className="text-gray-300">
                      {achievement}
                    </span>

                  </div>
                ))}

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          AI INTERVIEW PREP
      ===================================================== */}

      <InterviewPrepAssistant />

      {/* =====================================================
          EDUCATION
      ===================================================== */}

      <section id="education" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12">

            <p className="text-sm uppercase tracking-wider text-gray-500">
              Education
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Academic{' '}
              <span className="text-purple-400">
                Journey
              </span>
            </h2>

          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            {/* B.Tech */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-8">

              <GraduationCap
                className="mb-6 text-purple-400"
                size={32}
              />

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Bachelor&apos;s Degree
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                B.Tech — Computer Science & Engineering
              </h3>

              <p className="mt-2 text-purple-400">
                Artificial Intelligence & Machine Learning
              </p>

              <p className="mt-4 text-gray-400">
                Anil Neerukonda Institute of Technology and Sciences (ANITS)
              </p>

              <div className="mt-6 space-y-3 text-sm text-gray-400">

                <p>
                  <span className="font-semibold text-white">
                    Duration:
                  </span>{' '}
                  Aug 2023 – May 2027
                </p>

                <p>
                  <span className="font-semibold text-white">
                    CGPA:
                  </span>{' '}
                  8.64 / 10
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Specialization:
                  </span>{' '}
                  Artificial Intelligence & Machine Learning
                </p>

              </div>

            </div>

            {/* Intermediate */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-8">

              <GraduationCap
                className="mb-6 text-pink-400"
                size={32}
              />

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Intermediate
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Intermediate — MPC
              </h3>

              <p className="mt-4 text-gray-400">
                A.P. Model Junior College
              </p>

              <div className="mt-6 space-y-3 text-sm text-gray-400">

                <p>
                  <span className="font-semibold text-white">
                    Stream:
                  </span>{' '}
                  Mathematics, Physics & Chemistry
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Score:
                  </span>{' '}
                  90%
                </p>

              </div>

            </div>

            {/* SSC */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-8">

              <GraduationCap
                className="mb-6 text-blue-400"
                size={32}
              />

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Secondary School
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                SSC
              </h3>

              <p className="mt-4 text-gray-400">
                A.P. Model School
              </p>

              <div className="mt-6 space-y-3 text-sm text-gray-400">

                <p>
                  <span className="font-semibold text-white">
                    Score:
                  </span>{' '}
                  90%
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 text-center md:p-14"
          >

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
              <Mail size={30} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              Let&apos;s Connect
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Have a project or opportunity?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-400">
              I&apos;m interested in software engineering, AI/ML,
              full-stack development, and opportunities where I can build
              useful technology.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">

              <a
                href="mailto:haripriyaaddepalli64@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3.5 font-semibold transition hover:-translate-y-1"
              >
                <Mail size={18} />
                Email Me
              </a>

              <a
                href="https://github.com/HaripriyaAddepalli"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold transition hover:bg-white/10"
              >
                <Github size={18} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/haripriya-addepalli-764b75350/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold transition hover:bg-white/10"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>

            </div>

          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-gray-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} Haripriya Addepalli
          </p>

          <p>
            AI & Full Stack Engineer
          </p>

        </div>
      </footer>

    </main>
  )
}