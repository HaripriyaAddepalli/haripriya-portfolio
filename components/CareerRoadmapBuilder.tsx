'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Copy,
  Loader2,
  Map,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  XCircle,
} from 'lucide-react'

type SkillAssessment = {
  skill: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  status: 'Strong' | 'Needs Improvement' | 'Missing'
}

type RoadmapSkill = {
  name: string
  priority: 'High' | 'Medium' | 'Low'
  difficulty: 'Easy' | 'Medium' | 'Hard'
  reason: string
}

type Resource = {
  name: string
  type: string
  url: string
}

type RoadmapPhase = {
  phase: string
  duration: string
  title: string
  goal: string
  skills: RoadmapSkill[]
  resources: Resource[]
  milestones: string[]
}

type RoadmapResponse = {
  summary: string
  skillAssessment: SkillAssessment[]
  roadmap: RoadmapPhase[]
  finalMilestones: string[]
}

const DEFAULT_SKILLS =
  'Python, JavaScript, React, Next.js, Node.js, Express.js, MongoDB, Machine Learning, Computer Vision, REST APIs, LLMs'

const EXAMPLE_ROLES = [
  'AI/ML Engineer',
  'Full Stack Developer',
  'Software Engineer',
  'AI Engineer',
  'Backend Developer',
]

export default function CareerRoadmapBuilder() {
  const [currentSkills, setCurrentSkills] = useState(DEFAULT_SKILLS)
  const [targetRole, setTargetRole] = useState('AI/ML Engineer')
  const [experienceLevel, setExperienceLevel] = useState('Student / Fresher')
  const [timeline, setTimeline] = useState('12 months')

  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('career-roadmap')
      if (saved) {
        setRoadmap(JSON.parse(saved))
      }
    } catch {
      localStorage.removeItem('career-roadmap')
    }
  }, [])

  const generateRoadmap = async () => {
    if (!currentSkills.trim() || !targetRole.trim()) {
      setError('Please enter your current skills and target role.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/career-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentSkills,
          targetRole,
          experienceLevel,
          timeline,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate roadmap.')
      }

      setRoadmap(data)

      localStorage.setItem('career-roadmap', JSON.stringify(data))
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to generate your roadmap.'
      )
    } finally {
      setLoading(false)
    }
  }

  const clearRoadmap = () => {
    setRoadmap(null)
    localStorage.removeItem('career-roadmap')
  }

  const copyRoadmap = async () => {
    if (!roadmap) return

    const text = [
      `Career Roadmap: ${targetRole}`,
      '',
      roadmap.summary,
      '',
      'Skill Assessment:',
      ...roadmap.skillAssessment.map(
        (skill) =>
          `- ${skill.skill}: ${skill.level} — ${skill.status}`
      ),
      '',
      ...roadmap.roadmap.flatMap((phase) => [
        `${phase.phase}: ${phase.title}`,
        `Duration: ${phase.duration}`,
        `Goal: ${phase.goal}`,
        'Skills:',
        ...phase.skills.map(
          (skill) =>
            `- ${skill.name} (${skill.priority}, ${skill.difficulty})`
        ),
        'Milestones:',
        ...phase.milestones.map((milestone) => `- ${milestone}`),
        '',
      ]),
      'Final Milestones:',
      ...roadmap.finalMilestones.map((item) => `- ${item}`),
    ].join('\n')

    await navigator.clipboard.writeText(text)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <section
      id="career-roadmap"
      className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="career-roadmap-title"
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
          <Map className="h-4 w-4" />
          AI Career Planning
        </div>

        <h2
          id="career-roadmap-title"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Career Roadmap Builder
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Tell the AI where you are today and where you want to go.
          Get a personalized skill roadmap with priorities, resources,
          timelines, and milestones.
        </p>
      </div>

      {/* Input Panel */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Skills */}
          <div className="lg:col-span-2">
            <label
              htmlFor="current-skills"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Current Skills
            </label>

            <textarea
              id="current-skills"
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              rows={4}
              placeholder="Example: Python, JavaScript, React, SQL, Machine Learning..."
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
              aria-describedby="skills-help"
            />

            <p
              id="skills-help"
              className="mt-2 text-xs text-gray-500"
            >
              Separate your skills with commas.
            </p>
          </div>

          {/* Target role */}
          <div>
            <label
              htmlFor="target-role"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Target Role
            </label>

            <input
              id="target-role"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="Example: AI/ML Engineer"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {EXAMPLE_ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setTargetRole(role)}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400 transition hover:border-purple-500/40 hover:text-purple-300"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label
              htmlFor="experience-level"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Experience Level
            </label>

            <select
              id="experience-level"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
            >
              <option>Student / Fresher</option>
              <option>Entry Level</option>
              <option>1–2 Years Experience</option>
              <option>3+ Years Experience</option>
            </select>
          </div>

          {/* Timeline */}
          <div>
            <label
              htmlFor="roadmap-timeline"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Roadmap Timeline
            </label>

            <select
              id="roadmap-timeline"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
            >
              <option>3 months</option>
              <option>6 months</option>
              <option>12 months</option>
            </select>
          </div>

          {/* Generate */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={generateRoadmap}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 px-6 py-3.5 font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Building Roadmap...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate My Roadmap
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
          >
            <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Empty state */}
      {!roadmap && !loading && (
        <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
          <Target className="mx-auto h-12 w-12 text-purple-400" />

          <h3 className="mt-4 text-xl font-semibold">
            Build your career roadmap
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
            Your roadmap will identify skill gaps, prioritize what to
            learn, and break your goal into manageable milestones.
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-purple-400" />
          <p className="mt-4 text-gray-300">
            Groq AI is analyzing your skills and building your roadmap...
          </p>
        </div>
      )}

      {/* Results */}
      {roadmap && !loading && (
        <div className="mt-8 space-y-8">
          {/* Toolbar */}
          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={copyRoadmap}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:bg-white/[0.06]"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy Roadmap'}
            </button>

            <button
              type="button"
              onClick={generateRoadmap}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 transition hover:bg-purple-500/20"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </button>

            <button
              type="button"
              onClick={clearRoadmap}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
            >
              Clear
            </button>
          </div>

          {/* Summary */}
          <div className="rounded-3xl border border-purple-500/20 bg-purple-500/[0.06] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-purple-500/10 p-3">
                <Sparkles className="h-6 w-6 text-purple-400" />
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Your Personalized Roadmap
                </h3>

                <p className="mt-3 leading-7 text-gray-300">
                  {roadmap.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Skill Assessment */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <h3 className="text-2xl font-bold">
                Current Skills Assessment
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roadmap.skillAssessment.map((skill) => (
                <div
                  key={skill.skill}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-semibold">{skill.skill}</h4>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        skill.status === 'Strong'
                          ? 'bg-green-500/10 text-green-300'
                          : skill.status === 'Missing'
                            ? 'bg-red-500/10 text-red-300'
                            : 'bg-yellow-500/10 text-yellow-300'
                      }`}
                    >
                      {skill.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-gray-400">
                    Level: {skill.level}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap timeline */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Map className="h-6 w-6 text-purple-400" />
              <h3 className="text-2xl font-bold">
                Learning Roadmap
              </h3>
            </div>

            <div className="relative space-y-8">
              {roadmap.roadmap.map((phase, index) => (
                <div
                  key={`${phase.phase}-${index}`}
                  className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
                >
                  {/* Phase header */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
                          {phase.phase}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <Clock3 className="h-3.5 w-3.5" />
                          {phase.duration}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold">
                        {phase.title}
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-gray-400">
                        {phase.goal}
                      </p>
                    </div>

                    <div className="hidden rounded-full border border-white/10 p-3 sm:block">
                      <ArrowRight className="h-5 w-5 text-purple-400" />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-7">
                    <h5 className="mb-4 flex items-center gap-2 font-semibold">
                      <Target className="h-4 w-4 text-purple-400" />
                      Skills to Learn
                    </h5>

                    <div className="grid gap-4 md:grid-cols-2">
                      {phase.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="rounded-2xl border border-white/10 bg-black/10 p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h6 className="font-semibold">
                              {skill.name}
                            </h6>

                            <div className="flex gap-2">
                              <span className="rounded-full bg-purple-500/10 px-2 py-1 text-[11px] text-purple-300">
                                {skill.priority}
                              </span>

                              <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-gray-400">
                                {skill.difficulty}
                              </span>
                            </div>
                          </div>

                          <p className="mt-2 text-sm leading-6 text-gray-500">
                            {skill.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="mt-7">
                    <h5 className="mb-4 flex items-center gap-2 font-semibold">
                      <BookOpen className="h-4 w-4 text-purple-400" />
                      Free Resources
                    </h5>

                    <div className="grid gap-3 md:grid-cols-2">
                      {phase.resources.map((resource) => (
                        <a
                          key={`${resource.name}-${resource.url}`}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group rounded-2xl border border-white/10 bg-black/10 p-4 transition hover:border-purple-500/30"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="font-medium group-hover:text-purple-300">
                                {resource.name}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {resource.type}
                              </p>
                            </div>

                            <ArrowRight className="h-4 w-4 text-gray-600 transition group-hover:translate-x-1 group-hover:text-purple-400" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="mt-7">
                    <h5 className="mb-4 flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="h-4 w-4 text-purple-400" />
                      Milestones
                    </h5>

                    <div className="space-y-3">
                      {phase.milestones.map((milestone) => (
                        <div
                          key={milestone}
                          className="flex items-start gap-3 rounded-xl border border-white/5 bg-black/10 p-3"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
                          <span className="text-sm text-gray-400">
                            {milestone}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final milestones */}
          <div className="rounded-3xl border border-green-500/20 bg-green-500/[0.05] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-green-400" />
              <h3 className="text-xl font-bold">
                Final Career Milestones
              </h3>
            </div>

            <div className="mt-5 space-y-3">
              {roadmap.finalMilestones.map((milestone) => (
                <div
                  key={milestone}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                  <span className="text-gray-300">{milestone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}