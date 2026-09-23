'use client'

import { useEffect, useState } from 'react'

type Course = {
  title: string
  platform: string
  duration: string
  type: 'Free' | 'Paid'
  skills: string[]
  reason: string
}

type LearningPath = {
  summary: string
  recommendedCourses: Course[]
}

const defaultCompletedCourses = [
  {
    title: 'A Practical Intro to AI Agents and Agentic AI',
    platform: 'Udemy',
    date: 'September 16, 2026',
    certificate: true,
    skills: ['AI Agents', 'Agentic AI'],
  },
]

const enrolledCourses = [
  {
    title: 'Capstone Project: Build an AI Agent for Travel Planning',
    platform: 'Percipio',
    progress: 0,
    skills: ['AI Agents', 'LLMs', 'Agentic AI'],
  },
  {
    title: 'Building Generative AI Agents',
    platform: 'Online Learning',
    progress: 0,
    skills: ['LangGraph', 'AutoGen', 'CrewAI'],
  },
]

export default function LearningPathTracker() {
  const [currentSkills, setCurrentSkills] = useState(
    'Python, JavaScript, React, Next.js, Node.js, Express.js, MongoDB, Machine Learning, Computer Vision, REST APIs, LLMs'
  )

  const [targetRole, setTargetRole] = useState(
    'AI & Full Stack Engineer'
  )

  const [completedCourses, setCompletedCourses] = useState(
    defaultCompletedCourses
  )

  const [learningPath, setLearningPath] =
    useState<LearningPath | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('learning-path')

    if (saved) {
      try {
        setLearningPath(JSON.parse(saved))
      } catch {
        localStorage.removeItem('learning-path')
      }
    }
  }, [])

  const generateLearningPath = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('/api/learning-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentSkills,
          targetRole,
          completedCourses,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || 'Unable to generate learning path.'
        )
      }

      const newPath: LearningPath = {
        summary: result.summary,
        recommendedCourses: result.recommendedCourses || [],
      }

      setLearningPath(newPath)

      localStorage.setItem(
        'learning-path',
        JSON.stringify(newPath)
      )
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to generate learning path.'
      )
    } finally {
      setLoading(false)
    }
  }

  const clearLearningPath = () => {
    setLearningPath(null)
    localStorage.removeItem('learning-path')
  }

  return (
    <section
      id="learning-path"
      className="w-full px-4 py-16 md:px-8 lg:px-12"
      aria-labelledby="learning-path-heading"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-400">
            Continuous Learning
          </p>

          <h2
            id="learning-path-heading"
            className="text-3xl font-bold md:text-4xl"
          >
            Learning Path Tracker
          </h2>

          <p className="mt-3 max-w-2xl text-sm text-gray-400 md:text-base">
            Track completed learning, current courses, and generate
            an AI-powered path for your next skills.
          </p>
        </div>

        {/* Completed Courses */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-semibold">
                Completed Courses
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Courses completed and certificates earned
              </p>
            </div>

            <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-300">
              {completedCourses.length} completed
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {completedCourses.map((course) => (
              <div
                key={course.title}
                className="rounded-xl border border-white/10 bg-black/10 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold">
                      {course.title}
                    </h4>

                    <p className="mt-1 text-sm text-gray-400">
                      {course.platform}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      {course.date}
                    </p>
                  </div>

                  {course.certificate && (
                    <span className="shrink-0 rounded-lg bg-green-500/10 px-3 py-1 text-xs text-green-300">
                      Certificate
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Currently Enrolled */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-semibold">
            Currently Enrolled
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Courses currently in progress
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {enrolledCourses.map((course) => (
              <div
                key={course.title}
                className="rounded-xl border border-white/10 bg-black/10 p-5"
              >
                <h4 className="font-semibold">
                  {course.title}
                </h4>

                <p className="mt-1 text-sm text-gray-400">
                  {course.platform}
                </p>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-gray-400">
                      Progress
                    </span>

                    <span>{course.progress}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-purple-500"
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Generator */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-semibold">
            AI Learning Path Generator
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Get personalized course recommendations based on your
            current skills and career goal.
          </p>

          <div className="mt-6 grid gap-5">
            <div>
              <label
                htmlFor="learning-skills"
                className="mb-2 block text-sm font-medium"
              >
                Current Skills
              </label>

              <textarea
                id="learning-skills"
                value={currentSkills}
                onChange={(event) =>
                  setCurrentSkills(event.target.value)
                }
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm outline-none transition focus:border-purple-500"
                placeholder="Enter your current skills..."
              />
            </div>

            <div>
              <label
                htmlFor="learning-role"
                className="mb-2 block text-sm font-medium"
              >
                Target Role
              </label>

              <input
                id="learning-role"
                value={targetRole}
                onChange={(event) =>
                  setTargetRole(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm outline-none transition focus:border-purple-500"
                placeholder="Example: AI Engineer"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={generateLearningPath}
                disabled={loading || !currentSkills.trim()}
                className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? 'Generating...'
                  : 'Generate My Learning Path'}
              </button>

              {learningPath && (
                <button
                  type="button"
                  onClick={clearLearningPath}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm transition hover:bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        {learningPath && (
          <div className="mt-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
            <h3 className="text-xl font-semibold">
              Recommended Next Courses
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-300">
              {learningPath.summary}
            </p>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {learningPath.recommendedCourses.map(
                (course, index) => (
                  <div
                    key={`${course.title}-${index}`}
                    className="rounded-xl border border-white/10 bg-black/10 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-semibold text-purple-400">
                          STEP {index + 1}
                        </span>

                        <h4 className="mt-2 text-lg font-semibold">
                          {course.title}
                        </h4>

                        <p className="mt-1 text-sm text-gray-400">
                          {course.platform}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-lg px-3 py-1 text-xs ${
                          course.type === 'Free'
                            ? 'bg-green-500/10 text-green-300'
                            : 'bg-yellow-500/10 text-yellow-300'
                        }`}
                      >
                        {course.type}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
                      <span>
                        ⏱ {course.duration}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-gray-300">
                      {course.reason}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {course.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}