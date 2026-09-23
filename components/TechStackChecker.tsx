'use client'

import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clipboard,
  Loader2,
  ShieldCheck,
  Sparkles,
  Trash2,
  Zap,
} from 'lucide-react'

interface HistoryItem {
  id: string
  techStack: string
  projectType: string
  analysis: string
  createdAt: string
}

const exampleStacks = [
  {
    name: 'Next.js AI App',
    stack:
      'Next.js, React, TypeScript, Tailwind CSS, Node.js, MongoDB, Groq API',
    type: 'AI-powered web application',
  },
  {
    name: 'MERN Stack',
    stack:
      'React, Node.js, Express.js, MongoDB, TypeScript',
    type: 'Full-stack web application',
  },
  {
    name: 'AI/ML Platform',
    stack:
      'Python, FastAPI, React, PostgreSQL, Docker, TensorFlow',
    type: 'AI/ML platform',
  },
]

export default function TechStackChecker() {
  const [techStack, setTechStack] = useState('')
  const [projectType, setProjectType] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        'tech-stack-checker-history'
      )

      if (saved) {
        setHistory(JSON.parse(saved))
      }
    } catch (err) {
      console.error(
        'Failed to load tech stack history:',
        err
      )
    }
  }, [])

  const saveHistory = (
    item: HistoryItem
  ) => {
    const updated = [
      item,
      ...history,
    ].slice(0, 10)

    setHistory(updated)

    localStorage.setItem(
      'tech-stack-checker-history',
      JSON.stringify(updated)
    )
  }

  const analyzeStack = async () => {
    if (!techStack.trim()) {
      setError(
        'Please enter at least two technologies to analyze.'
      )
      return
    }

    setLoading(true)
    setError('')
    setAnalysis('')
    setCopied(false)

    try {
      const response = await fetch(
        '/api/tech-stack',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            techStack,
            projectType,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.error ||
            'Failed to analyze the tech stack.'
        )
      }

      setAnalysis(data.analysis)

      saveHistory({
        id: Date.now().toString(),
        techStack,
        projectType,
        analysis: data.analysis,
        createdAt:
          new Date().toISOString(),
      })
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong.'
      )
    } finally {
      setLoading(false)
    }
  }

  const copyAnalysis = async () => {
    if (!analysis) return

    try {
      await navigator.clipboard.writeText(
        analysis
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error(
        'Failed to copy:',
        err
      )
    }
  }

  const clearHistory = () => {
    setHistory([])

    localStorage.removeItem(
      'tech-stack-checker-history'
    )
  }

  const loadHistory = (
    item: HistoryItem
  ) => {
    setTechStack(item.techStack)
    setProjectType(item.projectType)
    setAnalysis(item.analysis)
    setError('')
    setShowHistory(false)
  }

  const useExample = (
    example: (typeof exampleStacks)[number]
  ) => {
    setTechStack(example.stack)
    setProjectType(example.type)
    setAnalysis('')
    setError('')
  }

  return (
    <section
      id="tech-stack-checker"
      className="relative py-20"
      aria-labelledby="tech-stack-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <Sparkles className="h-4 w-4" />
            AI-Powered Architecture Analysis
          </div>

          <h2
            id="tech-stack-title"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Tech Stack Compatibility Checker
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Enter your technologies and let AI analyze
            compatibility, conflicts, performance, and
            security considerations.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Input Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-xl">

            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-purple-500/10 p-3">
                <Zap className="h-5 w-5 text-purple-400" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Your Tech Stack
                </h3>

                <p className="text-sm text-gray-500">
                  Enter technologies separated by commas
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <label
              htmlFor="tech-stack-input"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Technologies
            </label>

            <textarea
              id="tech-stack-input"
              value={techStack}
              onChange={(event) =>
                setTechStack(
                  event.target.value
                )
              }
              placeholder="Example: Next.js, React, TypeScript, Node.js, MongoDB, Groq API"
              className="min-h-[180px] w-full resize-y rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
              aria-describedby="tech-stack-help"
            />

            <p
              id="tech-stack-help"
              className="mt-2 text-xs text-gray-500"
            >
              Example: React, Node.js, Express,
              MongoDB, Redis
            </p>

            {/* Project Type */}
            <div className="mt-6">
              <label
                htmlFor="project-type"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Project Type
              </label>

              <input
                id="project-type"
                type="text"
                value={projectType}
                onChange={(event) =>
                  setProjectType(
                    event.target.value
                  )
                }
                placeholder="Example: AI-powered SaaS application"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* Analyze */}
            <button
              type="button"
              onClick={analyzeStack}
              disabled={
                loading ||
                !techStack.trim()
              }
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing Stack...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Analyze Compatibility
                </>
              )}
            </button>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mt-4 flex gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Examples */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-gray-400">
                Try an example
              </p>

              <div className="space-y-2">
                {exampleStacks.map(
                  (example) => (
                    <button
                      key={example.name}
                      type="button"
                      onClick={() =>
                        useExample(
                          example
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left transition hover:border-purple-500/30 hover:bg-white/[0.05]"
                    >
                      <div className="text-sm font-medium text-white">
                        {example.name}
                      </div>

                      <div className="mt-1 text-xs text-gray-500">
                        {example.stack}
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Analysis Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-xl">

            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500/10 p-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    AI Analysis
                  </h3>

                  <p className="text-sm text-gray-500">
                    Architecture and compatibility report
                  </p>
                </div>
              </div>

              {analysis && (
                <button
                  type="button"
                  onClick={copyAnalysis}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:bg-white/10"
                >
                  <Clipboard className="h-4 w-4" />
                  {copied
                    ? 'Copied!'
                    : 'Copy'}
                </button>
              )}
            </div>

            {!analysis && !loading && (
              <div className="flex min-h-[500px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/10 p-8 text-center">
                <div className="mb-4 rounded-2xl bg-purple-500/10 p-4">
                  <CheckCircle2 className="h-8 w-8 text-purple-400" />
                </div>

                <h4 className="text-lg font-semibold text-white">
                  Ready to analyze
                </h4>

                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  Enter your technology stack on the
                  left and click &quot;Analyze
                  Compatibility&quot;.
                </p>
              </div>
            )}

            {loading && (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <Loader2 className="h-10 w-10 animate-spin text-purple-400" />

                <p className="mt-4 font-medium text-white">
                  AI is analyzing your stack...
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Checking compatibility, conflicts,
                  performance, and security.
                </p>
              </div>
            )}

            {analysis && !loading && (
              <div className="max-h-[650px] overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-5">
                <div className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
                  {analysis}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">

          <button
            type="button"
            onClick={() =>
              setShowHistory(
                !showHistory
              )
            }
            className="flex w-full items-center justify-between p-5 text-left"
            aria-expanded={showHistory}
          >
            <div>
              <h3 className="font-semibold text-white">
                Analysis History
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {history.length} saved analysis
                {history.length === 1
                  ? ''
                  : 'es'}
              </p>
            </div>

            {showHistory ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {showHistory && (
            <div className="border-t border-white/10 p-5">

              {history.length === 0 ? (
                <p className="py-6 text-center text-sm text-gray-500">
                  No analysis history yet.
                </p>
              ) : (
                <>
                  <div className="mb-4 flex justify-end">
                    <button
                      type="button"
                      onClick={clearHistory}
                      className="inline-flex items-center gap-2 text-xs text-red-400 transition hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear History
                    </button>
                  </div>

                  <div className="space-y-3">
                    {history.map(
                      (item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            loadHistory(
                              item
                            )
                          }
                          className="w-full rounded-xl border border-white/10 bg-black/10 p-4 text-left transition hover:border-purple-500/30 hover:bg-white/[0.04]"
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <span className="font-medium text-white">
                              {item.techStack}
                            </span>

                            <span className="text-xs text-gray-500">
                              {new Date(
                                item.createdAt
                              ).toLocaleString()}
                            </span>
                          </div>

                          {item.projectType && (
                            <p className="mt-1 text-xs text-gray-500">
                              {item.projectType}
                            </p>
                          )}
                        </button>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}