'use client'

import { useMemo, useState } from 'react'
import {
  Download,
  FileText,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  Plus,
  Trash2,
  Eye,
} from 'lucide-react'

type Template = 'classic' | 'modern' | 'minimal' | 'professional'

interface Experience {
  id: number
  company: string
  role: string
  duration: string
  description: string
}

interface Project {
  id: number
  name: string
  technologies: string
  description: string
  link: string
}

interface Education {
  id: number
  institution: string
  degree: string
  duration: string
  score: string
}

interface ResumeData {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  summary: string
  skills: string
  experiences: Experience[]
  projects: Project[]
  education: Education[]
  certifications: string
}

const initialData: ResumeData = {
  name: 'Haripriya Addepalli',
  title: 'AI & Full Stack Engineer',
  email: 'haripriyaaddepalli64@gmail.com',
  phone: '+91 9346650682',
  location: 'Visakhapatnam, Andhra Pradesh',
  linkedin:
    'linkedin.com/in/haripriya-addepalli-764b75350',
  github:
    'github.com/HaripriyaAddepalli',
  summary:
    'B.Tech CSE (AI & ML) student focused on AI-powered web applications, intelligent automation, and full-stack development.',
  skills:
    'Python, JavaScript, TypeScript, React, Next.js, Node.js, Express.js, MongoDB, Machine Learning, Computer Vision, REST APIs, LLMs',
  experiences: [
    {
      id: 1,
      company: 'Vats Mobility',
      role: 'Founding AI & Full Stack Engineer Intern',
      duration: 'Jul 2026 – Present',
      description:
        'Worked on AI-powered mobility applications, full-stack development, automation workflows, and LLM integrations.',
    },
  ],
  projects: [
    {
      id: 1,
      name: 'GlowGuide AI',
      technologies:
        'Next.js, React, Gemini API',
      description:
        'AI-powered skincare application providing personalized recommendations and multi-routine assistance.',
      link:
        'https://glowguide-skincare-ai.vercel.app/',
    },
    {
      id: 2,
      name: 'Smart Task Automation Assistant',
      technologies:
        'React, TypeScript, Express, MongoDB, Groq',
      description:
        'Full-stack AI automation platform for managing intelligent tasks and workflows.',
      link:
        'https://smart-task-frontend-one.vercel.app/',
    },
  ],
  education: [
    {
      id: 1,
      institution: 'ANITS',
      degree: 'B.Tech CSE (AI & ML)',
      duration: '2023 – 2027',
      score: 'CGPA: 8.67/10',
    },
  ],
  certifications:
    'A Practical Intro to AI Agents and Agentic AI — Udemy\nGoogle Student Ambassador 2026\nSmart India Hackathon 2025 — Shortlisted',
}

export default function ResumeGenerator() {
  const [data, setData] =
    useState<ResumeData>(initialData)

  const [template, setTemplate] =
    useState<Template>('modern')

  const [activeTab, setActiveTab] =
    useState('personal')

  const [generating, setGenerating] =
    useState(false)

  const [aiMessage, setAiMessage] =
    useState('')

  const updateField = (
    field: keyof ResumeData,
    value: string
  ) => {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const updateExperience = (
    id: number,
    field: keyof Experience,
    value: string
  ) => {
    setData((previous) => ({
      ...previous,
      experiences:
        previous.experiences.map(
          (experience) =>
            experience.id === id
              ? {
                  ...experience,
                  [field]: value,
                }
              : experience
        ),
    }))
  }

  const updateProject = (
    id: number,
    field: keyof Project,
    value: string
  ) => {
    setData((previous) => ({
      ...previous,
      projects:
        previous.projects.map(
          (project) =>
            project.id === id
              ? {
                  ...project,
                  [field]: value,
                }
              : project
        ),
    }))
  }

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string
  ) => {
    setData((previous) => ({
      ...previous,
      education:
        previous.education.map(
          (education) =>
            education.id === id
              ? {
                  ...education,
                  [field]: value,
                }
              : education
        ),
    }))
  }

  const addExperience = () => {
    setData((previous) => ({
      ...previous,
      experiences: [
        ...previous.experiences,
        {
          id: Date.now(),
          company: '',
          role: '',
          duration: '',
          description: '',
        },
      ],
    }))
  }

  const removeExperience = (
    id: number
  ) => {
    setData((previous) => ({
      ...previous,
      experiences:
        previous.experiences.filter(
          (item) => item.id !== id
        ),
    }))
  }

  const addProject = () => {
    setData((previous) => ({
      ...previous,
      projects: [
        ...previous.projects,
        {
          id: Date.now(),
          name: '',
          technologies: '',
          description: '',
          link: '',
        },
      ],
    }))
  }

  const removeProject = (
    id: number
  ) => {
    setData((previous) => ({
      ...previous,
      projects:
        previous.projects.filter(
          (item) => item.id !== id
        ),
    }))
  }

  const addEducation = () => {
    setData((previous) => ({
      ...previous,
      education: [
        ...previous.education,
        {
          id: Date.now(),
          institution: '',
          degree: '',
          duration: '',
          score: '',
        },
      ],
    }))
  }

  const removeEducation = (
    id: number
  ) => {
    setData((previous) => ({
      ...previous,
      education:
        previous.education.filter(
          (item) => item.id !== id
        ),
    }))
  }

  const generateWithAI = async () => {
    setGenerating(true)
    setAiMessage('')

    try {
      const response = await fetch(
        '/api/resume',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            resume: data,
          }),
        }
      )

      const result =
        await response.json()

      if (!response.ok) {
        throw new Error(
          result?.error ||
            'AI generation failed.'
        )
      }

      setData((previous) => ({
        ...previous,
        summary:
          result.summary ||
          previous.summary,
        experiences:
          result.experiences ||
          previous.experiences,
        projects:
          result.projects ||
          previous.projects,
      }))

      setAiMessage(
        'AI improved your resume descriptions.'
      )
    } catch (error) {
      console.error(error)

      setAiMessage(
        error instanceof Error
          ? error.message
          : 'AI generation failed.'
      )
    } finally {
      setGenerating(false)
    }
  }

  const exportPDF = () => {
    window.print()
  }

  const exportDOCX = () => {
    setAiMessage(
      'DOCX export can be connected to a server-side document generator next.'
    )
  }

  const templateClass = useMemo(() => {
    if (template === 'classic') {
      return 'font-serif'
    }

    if (template === 'minimal') {
      return 'font-mono'
    }

    if (template === 'professional') {
      return 'font-sans'
    }

    return 'font-sans'
  }, [template])

  const tabs = [
    {
      id: 'personal',
      label: 'Personal',
      icon: User,
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: Briefcase,
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: Code2,
    },
    {
      id: 'education',
      label: 'Education',
      icon: GraduationCap,
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: Award,
    },
  ]

  return (
    <section
      id="resume-generator"
      className="py-20"
      aria-labelledby="resume-generator-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <FileText className="h-4 w-4" />
            AI Resume Builder
          </div>

          <h2
            id="resume-generator-title"
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            Resume / CV Generator
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Build a professional resume using your
            portfolio information and preview changes
            instantly.
          </p>
        </div>

        {/* Templates */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white">
              Choose Template
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ['classic', 'Classic'],
                ['modern', 'Modern'],
                ['minimal', 'Minimal'],
                [
                  'professional',
                  'Professional',
                ],
              ] as [
                Template,
                string
              ][]
            ).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setTemplate(value)
                  }
                  className={`rounded-xl border p-4 text-left transition ${
                    template === value
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="font-medium text-white">
                    {label}
                  </div>

                  <div className="mt-1 text-xs text-gray-500">
                    Professional CV layout
                  </div>
                </button>
              )
            )}
          </div>
        </div>

        {/* Editor + Preview */}
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">

          {/* Editor */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            {/* Tabs */}
            <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {tabs.map(
                ({
                  id,
                  label,
                  icon: Icon,
                }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      setActiveTab(id)
                    }
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs transition ${
                      activeTab === id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/[0.04] text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {label}
                    </span>
                  </button>
                )
              )}
            </div>

            {/* Personal */}
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={data.name}
                  onChange={(value) =>
                    updateField(
                      'name',
                      value
                    )
                  }
                />

                <Input
                  label="Professional Title"
                  value={data.title}
                  onChange={(value) =>
                    updateField(
                      'title',
                      value
                    )
                  }
                />

                <Input
                  label="Email"
                  value={data.email}
                  onChange={(value) =>
                    updateField(
                      'email',
                      value
                    )
                  }
                />

                <Input
                  label="Phone"
                  value={data.phone}
                  onChange={(value) =>
                    updateField(
                      'phone',
                      value
                    )
                  }
                />

                <Input
                  label="Location"
                  value={data.location}
                  onChange={(value) =>
                    updateField(
                      'location',
                      value
                    )
                  }
                />

                <Input
                  label="LinkedIn"
                  value={data.linkedin}
                  onChange={(value) =>
                    updateField(
                      'linkedin',
                      value
                    )
                  }
                />

                <Input
                  label="GitHub"
                  value={data.github}
                  onChange={(value) =>
                    updateField(
                      'github',
                      value
                    )
                  }
                />

                <Textarea
                  label="Professional Summary"
                  value={data.summary}
                  onChange={(value) =>
                    updateField(
                      'summary',
                      value
                    )
                  }
                />
              </div>
            )}

            {/* Experience */}
            {activeTab === 'experience' && (
              <div className="space-y-5">
                {data.experiences.map(
                  (experience) => (
                    <div
                      key={experience.id}
                      className="rounded-xl border border-white/10 p-4"
                    >
                      <div className="mb-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            removeExperience(
                              experience.id
                            )
                          }
                          className="text-red-400 hover:text-red-300"
                          aria-label="Remove experience"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <Input
                          label="Company"
                          value={
                            experience.company
                          }
                          onChange={(
                            value
                          ) =>
                            updateExperience(
                              experience.id,
                              'company',
                              value
                            )
                          }
                        />

                        <Input
                          label="Role"
                          value={
                            experience.role
                          }
                          onChange={(
                            value
                          ) =>
                            updateExperience(
                              experience.id,
                              'role',
                              value
                            )
                          }
                        />

                        <Input
                          label="Duration"
                          value={
                            experience.duration
                          }
                          onChange={(
                            value
                          ) =>
                            updateExperience(
                              experience.id,
                              'duration',
                              value
                            )
                          }
                        />

                        <Textarea
                          label="Description"
                          value={
                            experience.description
                          }
                          onChange={(
                            value
                          ) =>
                            updateExperience(
                              experience.id,
                              'description',
                              value
                            )
                          }
                        />
                      </div>
                    </div>
                  )
                )}

                <button
                  type="button"
                  onClick={
                    addExperience
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 p-3 text-sm text-gray-400 transition hover:border-purple-500/40 hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                  Add Experience
                </button>
              </div>
            )}

            {/* Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-5">
                {data.projects.map(
                  (project) => (
                    <div
                      key={project.id}
                      className="rounded-xl border border-white/10 p-4"
                    >
                      <div className="mb-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            removeProject(
                              project.id
                            )
                          }
                          className="text-red-400 hover:text-red-300"
                          aria-label="Remove project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <Input
                          label="Project Name"
                          value={
                            project.name
                          }
                          onChange={(
                            value
                          ) =>
                            updateProject(
                              project.id,
                              'name',
                              value
                            )
                          }
                        />

                        <Input
                          label="Technologies"
                          value={
                            project.technologies
                          }
                          onChange={(
                            value
                          ) =>
                            updateProject(
                              project.id,
                              'technologies',
                              value
                            )
                          }
                        />

                        <Textarea
                          label="Description"
                          value={
                            project.description
                          }
                          onChange={(
                            value
                          ) =>
                            updateProject(
                              project.id,
                              'description',
                              value
                            )
                          }
                        />

                        <Input
                          label="Project Link"
                          value={
                            project.link
                          }
                          onChange={(
                            value
                          ) =>
                            updateProject(
                              project.id,
                              'link',
                              value
                            )
                          }
                        />
                      </div>
                    </div>
                  )
                )}

                <button
                  type="button"
                  onClick={
                    addProject
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 p-3 text-sm text-gray-400 transition hover:border-purple-500/40 hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                  Add Project
                </button>
              </div>
            )}

            {/* Education */}
            {activeTab === 'education' && (
              <div className="space-y-5">
                {data.education.map(
                  (education) => (
                    <div
                      key={education.id}
                      className="rounded-xl border border-white/10 p-4"
                    >
                      <div className="mb-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            removeEducation(
                              education.id
                            )
                          }
                          className="text-red-400 hover:text-red-300"
                          aria-label="Remove education"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <Input
                          label="Institution"
                          value={
                            education.institution
                          }
                          onChange={(
                            value
                          ) =>
                            updateEducation(
                              education.id,
                              'institution',
                              value
                            )
                          }
                        />

                        <Input
                          label="Degree"
                          value={
                            education.degree
                          }
                          onChange={(
                            value
                          ) =>
                            updateEducation(
                              education.id,
                              'degree',
                              value
                            )
                          }
                        />

                        <Input
                          label="Duration"
                          value={
                            education.duration
                          }
                          onChange={(
                            value
                          ) =>
                            updateEducation(
                              education.id,
                              'duration',
                              value
                            )
                          }
                        />

                        <Input
                          label="Score"
                          value={
                            education.score
                          }
                          onChange={(
                            value
                          ) =>
                            updateEducation(
                              education.id,
                              'score',
                              value
                            )
                          }
                        />
                      </div>
                    </div>
                  )
                )}

                <button
                  type="button"
                  onClick={
                    addEducation
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 p-3 text-sm text-gray-400 transition hover:border-purple-500/40 hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                  Add Education
                </button>
              </div>
            )}

            {/* Skills */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <Textarea
                  label="Skills"
                  value={data.skills}
                  onChange={(value) =>
                    updateField(
                      'skills',
                      value
                    )
                  }
                />

                <Textarea
                  label="Certifications & Achievements"
                  value={
                    data.certifications
                  }
                  onChange={(value) =>
                    updateField(
                      'certifications',
                      value
                    )
                  }
                />
              </div>
            )}

            {/* AI */}
            <div className="mt-8 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 text-purple-400" />

                <div className="flex-1">
                  <h4 className="font-medium text-white">
                    Improve with Groq AI
                  </h4>

                  <p className="mt-1 text-xs text-gray-500">
                    Improve your summary, experience,
                    and project descriptions.
                  </p>

                  <button
                    type="button"
                    onClick={
                      generateWithAI
                    }
                    disabled={generating}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500 disabled:opacity-50"
                  >
                    {generating ? (
                      'Improving...'
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Improve Resume
                      </>
                    )}
                  </button>

                  {aiMessage && (
                    <p className="mt-3 text-xs text-gray-400">
                      {aiMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">
                  Live Preview
                </h3>

                <p className="text-xs text-gray-500">
                  Changes appear instantly
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={
                    exportPDF
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:bg-white/10"
                >
                  <Download className="h-4 w-4" />
                  PDF
                </button>

                <button
                  type="button"
                  onClick={
                    exportDOCX
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:bg-white/10"
                >
                  <Download className="h-4 w-4" />
                  DOCX
                </button>
              </div>
            </div>

            {/* Resume Paper */}
            <div
              id="resume-preview"
              className={`${templateClass} mx-auto min-h-[1100px] max-w-[820px] bg-white p-8 text-gray-900 shadow-2xl sm:p-12`}
            >
              <header className="border-b border-gray-300 pb-5">
                <h1 className="text-3xl font-bold">
                  {data.name}
                </h1>

                <p className="mt-1 text-lg text-gray-600">
                  {data.title}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                  <span>
                    {data.email}
                  </span>

                  <span>
                    {data.phone}
                  </span>

                  <span>
                    {data.location}
                  </span>

                  <span>
                    {data.linkedin}
                  </span>

                  <span>
                    {data.github}
                  </span>
                </div>
              </header>

              <ResumeSection title="Summary">
                <p className="text-sm leading-6">
                  {data.summary}
                </p>
              </ResumeSection>

              <ResumeSection title="Skills">
                <p className="text-sm leading-6">
                  {data.skills}
                </p>
              </ResumeSection>

              <ResumeSection title="Experience">
                {data.experiences.map(
                  (experience) => (
                    <div
                      key={experience.id}
                      className="mb-4"
                    >
                      <div className="flex flex-col justify-between gap-1 sm:flex-row">
                        <div>
                          <h4 className="font-bold">
                            {experience.role}
                          </h4>

                          <p className="text-sm font-medium text-gray-700">
                            {experience.company}
                          </p>
                        </div>

                        <span className="text-xs text-gray-500">
                          {
                            experience.duration
                          }
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6">
                        {
                          experience.description
                        }
                      </p>
                    </div>
                  )
                )}
              </ResumeSection>

              <ResumeSection title="Projects">
                {data.projects.map(
                  (project) => (
                    <div
                      key={project.id}
                      className="mb-4"
                    >
                      <div className="flex flex-col justify-between gap-1 sm:flex-row">
                        <h4 className="font-bold">
                          {project.name}
                        </h4>

                        {project.link && (
                          <span className="text-xs text-gray-500">
                            {project.link}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs font-medium text-gray-600">
                        {
                          project.technologies
                        }
                      </p>

                      <p className="mt-1 text-sm leading-6">
                        {
                          project.description
                        }
                      </p>
                    </div>
                  )
                )}
              </ResumeSection>

              <ResumeSection title="Education">
                {data.education.map(
                  (education) => (
                    <div
                      key={education.id}
                      className="mb-3"
                    >
                      <div className="flex flex-col justify-between gap-1 sm:flex-row">
                        <div>
                          <h4 className="font-bold">
                            {
                              education.degree
                            }
                          </h4>

                          <p className="text-sm">
                            {
                              education.institution
                            }
                          </p>
                        </div>

                        <span className="text-xs text-gray-500">
                          {
                            education.duration
                          }
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-gray-600">
                        {education.score}
                      </p>
                    </div>
                  )
                )}
              </ResumeSection>

              <ResumeSection title="Certifications & Achievements">
                <p className="whitespace-pre-line text-sm leading-6">
                  {
                    data.certifications
                  }
                </p>
              </ResumeSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Reusable Inputs ---------- */

function Input({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-400">
        {label}
      </label>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/50"
      />
    </div>
  )
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-400">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows={5}
        className="w-full resize-y rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/50"
      />
    </div>
  )
}

function ResumeSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 border-b border-gray-200 pb-1 text-sm font-bold uppercase tracking-wider">
        {title}
      </h2>

      {children}
    </section>
  )
}