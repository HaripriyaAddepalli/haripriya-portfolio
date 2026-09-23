'use client'

import { useEffect, useState } from 'react'
import {
  Check,
  ChevronDown,
  Clipboard,
  Code2,
  History,
  Loader2,
  Sparkles,
  Trash2,
} from 'lucide-react'

type ExplanationMode =
  | 'Beginner'
  | 'Intermediate'
  | 'Expert'

type HistoryItem = {
  id: number
  code: string
  language: string
  mode: ExplanationMode
  explanation: string
  createdAt: string
}

const starterCode = `function findLargest(numbers) {
  let largest = numbers[0]

  for (const number of numbers) {
    if (number > largest) {
      largest = number
    }
  }

  return largest
}`

export default function LiveCodingExplanationBot() {
  const [code, setCode] = useState(starterCode)
  const [language, setLanguage] =
    useState('JavaScript')
  const [mode, setMode] =
    useState<ExplanationMode>('Beginner')

  const [explanation, setExplanation] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const [copied, setCopied] =
    useState(false)

  const [history, setHistory] =
    useState<HistoryItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        'coding-explanation-history'
      )

      if (saved) {
        setHistory(JSON.parse(saved))
      }
    } catch {
      console.error(
        'Unable to load explanation history.'
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
      'coding-explanation-history',
      JSON.stringify(updated)
    )
  }

  const explainCode = async () => {
    if (!code.trim()) {
      setError(
        'Please paste or enter some code first.'
      )
      return
    }

    setLoading(true)
    setError('')
    setExplanation('')
    setCopied(false)

    try {
      const response = await fetch(
        '/api/code-explanation',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            code,
            language,
            mode,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.error ||
            'Failed to explain the code.'
        )
      }

      setExplanation(data.explanation)

      saveHistory({
        id: Date.now(),
        code,
        language,
        mode,
        explanation:
          data.explanation,
        createdAt:
          new Date().toLocaleString(),
      })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong.'
      )
    } finally {
      setLoading(false)
    }
  }

  const copyExplanation = async () => {
    if (!explanation) return

    try {
      await navigator.clipboard.writeText(
        explanation
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setError(
        'Unable to copy the explanation.'
      )
    }
  }

  const loadHistory = (
    item: HistoryItem
  ) => {
    setCode(item.code)
    setLanguage(item.language)
    setMode(item.mode)
    setExplanation(item.explanation)
    setError('')
  }

  const clearHistory = () => {
    setHistory([])

    localStorage.removeItem(
      'coding-explanation-history'
    )
  }

  return (
    <section
      id="live-coding-explanation"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <Sparkles className="h-4 w-4" />
            AI Coding Assistant
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Live Coding Explanation Bot
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Paste your code and get an AI-powered
            explanation tailored to your experience
            level.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold">
                  Your Code
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">

                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value)
                    }
                    className="appearance-none rounded-lg border border-white/10 bg-black px-3 py-2 pr-8 text-sm text-white outline-none focus:border-purple-500"
                  >
                    <option>JavaScript</option>
                    <option>TypeScript</option>
                    <option>Python</option>
                    <option>Java</option>
                    <option>C++</option>
                    <option>C</option>
                    <option>Go</option>
                    <option>Rust</option>
                    <option>HTML</option>
                    <option>CSS</option>
                    <option>SQL</option>
                    <option>Auto Detect</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                </div>

                <div className="relative">
                  <select
                    value={mode}
                    onChange={(e) =>
                      setMode(
                        e.target.value as ExplanationMode
                      )
                    }
                    className="appearance-none rounded-lg border border-white/10 bg-black px-3 py-2 pr-8 text-sm text-white outline-none focus:border-purple-500"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                </div>

              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">

              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-gray-500">
                <span>{language}</span>
                <span>{mode} mode</span>
              </div>

              <textarea
                value={code}
                onChange={(e) =>
                  setCode(e.target.value)
                }
                spellCheck={false}
                aria-label="Code input"
                className="min-h-[420px] w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-gray-200 outline-none placeholder:text-gray-600"
                placeholder="Paste your code here..."
              />
            </div>

            <button
              onClick={explainCode}
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing Code...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Explain My Code
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

            <div className="mb-4 flex items-center justify-between gap-3">

              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold">
                  AI Explanation
                </h3>
              </div>

              {explanation && (
                <button
                  onClick={copyExplanation}
                  className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:bg-white/10"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="min-h-[500px] rounded-xl border border-white/10 bg-black/40 p-5">

              {loading ? (
                <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                  <Loader2 className="mb-4 h-10 w-10 animate-spin text-purple-400" />

                  <p className="font-medium">
                    Groq is analyzing your code...
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Explanation level: {mode}
                  </p>
                </div>
              ) : explanation ? (
                <div className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
                  {explanation}
                </div>
              ) : (
                <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                  <Code2 className="mb-4 h-12 w-12 text-gray-600" />

                  <h4 className="text-lg font-semibold text-gray-300">
                    Ready to explain your code
                  </h4>

                  <p className="mt-2 max-w-md text-sm text-gray-500">
                    Paste a code snippet on the left,
                    choose your experience level,
                    and click Explain My Code.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-purple-400" />

              <h3 className="font-semibold">
                Explanation History
              </h3>

              <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-400">
                {history.length}
              </span>
            </div>

            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
                Clear History
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-sm text-gray-500">
              Your explained snippets will appear here.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    loadHistory(item)
                  }
                  className="rounded-xl border border-white/10 bg-black/30 p-4 text-left transition hover:border-purple-500/40 hover:bg-white/[0.05]"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-purple-500/10 px-2 py-1 text-purple-300">
                      {item.language}
                    </span>

                    <span className="rounded-full bg-white/10 px-2 py-1 text-gray-400">
                      {item.mode}
                    </span>
                  </div>

                  <pre className="max-h-24 overflow-hidden whitespace-pre-wrap font-mono text-xs text-gray-400">
                    {item.code}
                  </pre>

                  <p className="mt-3 text-xs text-gray-600">
                    {item.createdAt}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}