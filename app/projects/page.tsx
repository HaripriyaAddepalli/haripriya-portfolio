'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Sparkles,
  Zap,
} from 'lucide-react'

const projects = [
  {
    title: 'GlowGuide AI',
    description:
      'AI-powered skincare application for personalized skincare recommendations and routine-based product discovery.',
    technologies: ['Next.js', 'React', 'Gemini', 'AI'],
    live: 'https://glowguide-skincare-ai.vercel.app/',
    github: null,
  },
  {
    title: 'Smart Task Automation Assistant',
    description:
      'Full-stack AI automation platform with task management, authentication, dashboards, APIs, and LLM-powered workflows.',
    technologies: [
      'React',
      'TypeScript',
      'Express',
      'MongoDB',
      'LLM',
    ],
    live: null,
    github:
      'https://github.com/HaripriyaAddepalli/smart-task-automation-assistant',
  },
  {
    title: 'AI Virtual Try-On',
    description:
      'Computer-vision project exploring AI-assisted clothing visualization and virtual try-on experiences.',
    technologies: ['AI/ML', 'Computer Vision', 'React'],
    live: 'https://virtual-try-on-website-ar-vr.onrender.com',
    github: null,
  },
  {
    title: 'SemanticMatch AI',
    description:
      'AI-based semantic matching application designed to compare candidate information with job requirements.',
    technologies: ['Python', 'NLP', 'AI', 'Streamlit'],
    live: null,
    github: null,
  },
  {
    title: 'Gesture Arena',
    description:
      'Real-time gesture interaction project using computer vision and web technologies.',
    technologies: ['React', 'MediaPipe', 'Socket.IO'],
    live: null,
    github: null,
  },
  {
    title: 'NIDS + AI Analysis',
    description:
      'Academic cybersecurity project combining rule-based network intrusion detection with an ML/AI analysis layer.',
    technologies: [
      'Snort',
      'Suricata',
      'Python',
      'Machine Learning',
    ],
    live: null,
    github: null,
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-32 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute right-[-10%] top-[30%] h-[450px] w-[450px] rounded-full bg-pink-600/15 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <Sparkles size={16} />
            Selected Work
          </div>

          <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
            My{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            A collection of AI, full-stack, automation, computer vision,
            and cybersecurity projects.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400" />

              <div className="flex flex-1 flex-col p-7">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <Zap size={22} />
                </div>

                <h2 className="text-2xl font-bold">
                  {project.title}
                </h2>

                <p className="mt-4 flex-1 leading-7 text-gray-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-gray-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/20"
                    >
                      Live Demo
                      <ExternalLink size={15} />
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-white/10"
                    >
                      <Github size={15} />
                      GitHub
                    </a>
                  )}

                  {!project.live && !project.github && (
                    <span className="text-sm text-gray-500">
                      Details available on request
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  )
}