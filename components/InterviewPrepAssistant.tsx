'use client'

import { useEffect, useState } from 'react'
import {
  Brain,
  CheckCircle2,
  Clock,
  Loader2,
  Mic,
  RotateCcw,
  Trophy,
  Volume2,
} from 'lucide-react'

type Question = {
  question: string
  category: string
  difficulty: string
  hint?: string
}

type Evaluation = {
  score: number
  strengths: string[]
  improvements: string[]
  feedback: string
  idealAnswerPoints: string[]
}

type HistoryItem = {
  question: string
  score: number
  date: string
}

const categories = [
  'AI & Machine Learning',
  'Python',
  'React & Next.js',
  'Node.js',
  'System Design',
  'Databases',
  'LLMs',
  'Software Engineering',
]

export default function InterviewPrepAssistant() {
  const [category, setCategory] = useState(
    'AI & Machine Learning'
  )

  const [difficulty, setDifficulty] =
    useState('Intermediate')

  const [question, setQuestion] =
    useState<Question | null>(null)

  const [answer, setAnswer] = useState('')

  const [evaluation, setEvaluation] =
    useState<Evaluation | null>(null)

  const [loadingQuestion, setLoadingQuestion] =
    useState(false)

  const [loadingEvaluation, setLoadingEvaluation] =
    useState(false)

  const [history, setHistory] = useState<HistoryItem[]>([])

  const [listening, setListening] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(
      'interview-prep-history'
    )

    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch {
        localStorage.removeItem(
          'interview-prep-history'
        )
      }
    }
  }, [])

  async function generateQuestion() {
    setLoadingQuestion(true)
    setEvaluation(null)
    setAnswer('')

    try {
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'question',
          category,
          difficulty,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Unable to generate question'
        )
      }

      setQuestion(data)
    } catch (error) {
      console.error(error)
      alert(
        'Unable to generate an interview question. Check your Groq API key.'
      )
    } finally {
      setLoadingQuestion(false)
    }
  }

  async function evaluateAnswer() {
    if (!question || !answer.trim()) {
      return
    }

    setLoadingEvaluation(true)

    try {
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'evaluate',
          question: question.question,
          answer,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Unable to evaluate answer'
        )
      }

      setEvaluation(data)

      const item: HistoryItem = {
        question: question.question,
        score: data.score,
        date: new Date().toLocaleString(),
      }

      const updatedHistory = [
        item,
        ...history,
      ].slice(0, 20)

      setHistory(updatedHistory)

      localStorage.setItem(
        'interview-prep-history',
        JSON.stringify(updatedHistory)
      )
    } catch (error) {
      console.error(error)
      alert(
        'Unable to evaluate your answer right now.'
      )
    } finally {
      setLoadingEvaluation(false)
    }
  }

  function startVoiceInput() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert(
        'Voice input is not supported in this browser. Try Google Chrome.'
      )
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.continuous = false

    recognition.onstart = () => {
      setListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript =
        event.results[0][0].transcript

      setAnswer((previous) =>
        previous
          ? `${previous} ${transcript}`
          : transcript
      )
    }

    recognition.onerror = () => {
      setListening(false)
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognition.start()
  }

  function resetInterview() {
    setQuestion(null)
    setAnswer('')
    setEvaluation(null)
  }

  function speakQuestion() {
    if (!question) return

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        question.question
      )

      utterance.rate = 0.95
      window.speechSynthesis.speak(utterance)
    }
  }

  const averageScore =
    history.length > 0
      ? Math.round(
          history.reduce(
            (total, item) => total + item.score,
            0
          ) / history.length
        )
      : 0

  return (
    <section
      id="interview-prep"
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            AI Career Coach
          </p>

          <h2 className="text-4xl font-bold sm:text-5xl">
            AI Interview Prep
          </h2>

          <p className="mt-4 max-w-2xl text-gray-400">
            Practice technical interviews with AI-generated
            questions and receive structured feedback.
          </p>
        </div>

        {/* Controls */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Interview Category
              </label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-black"
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(event) =>
                  setDifficulty(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                <option className="bg-black">
                  Beginner
                </option>

                <option className="bg-black">
                  Intermediate
                </option>

                <option className="bg-black">
                  Advanced
                </option>
              </select>
            </div>
          </div>

          <button
            onClick={generateQuestion}
            disabled={loadingQuestion}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingQuestion ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Brain size={18} />
            )}

            {loadingQuestion
              ? 'Generating...'
              : 'Generate Interview Question'}
          </button>
        </div>

        {/* Question */}
        {question && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_0.5fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                    {question.category}
                  </span>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                    {question.difficulty}
                  </span>
                </div>

                <button
                  onClick={speakQuestion}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5"
                >
                  <Volume2 size={16} />
                  Read Question
                </button>
              </div>

              <h3 className="mt-7 text-2xl font-bold leading-relaxed">
                {question.question}
              </h3>

              {question.hint && (
                <p className="mt-5 rounded-xl border border-yellow-500/10 bg-yellow-500/5 p-4 text-sm text-yellow-200/80">
                  💡 Hint: {question.hint}
                </p>
              )}

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Your Answer
                  </label>

                  <span className="text-xs text-gray-500">
                    {answer.length} characters
                  </span>
                </div>

                <textarea
                  value={answer}
                  onChange={(event) =>
                    setAnswer(event.target.value)
                  }
                  placeholder="Explain your answer as if you were speaking to an interviewer..."
                  rows={8}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-5 text-sm leading-7 text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
                />

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={startVoiceInput}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                      listening
                        ? 'border-red-500/40 bg-red-500/10 text-red-300'
                        : 'border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <Mic size={17} />

                    {listening
                      ? 'Listening...'
                      : 'Voice Answer'}
                  </button>

                  <button
                    onClick={evaluateAnswer}
                    disabled={
                      loadingEvaluation ||
                      !answer.trim()
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {loadingEvaluation ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <CheckCircle2 size={17} />
                    )}

                    Evaluate Answer
                  </button>

                  <button
                    onClick={resetInterview}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-400 hover:bg-white/5"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Score tracker */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              <div className="flex items-center gap-3">
                <Trophy
                  size={20}
                  className="text-yellow-400"
                />

                <h3 className="font-bold">
                  Practice Tracker
                </h3>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500">
                  Average Score
                </p>

                <p className="mt-2 text-5xl font-bold">
                  {averageScore}
                  <span className="text-lg text-gray-600">
                    /100
                  </span>
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  Questions Practiced
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {history.length}
                </p>
              </div>

              {history.length > 0 && (
                <div className="mt-6 space-y-3">
                  {history.slice(0, 4).map((item, index) => (
                    <div
                      key={`${item.date}-${index}`}
                      className="rounded-xl border border-white/5 bg-black/20 p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="line-clamp-1 text-sm text-gray-400">
                          {item.question}
                        </span>

                        <span className="shrink-0 font-bold text-purple-400">
                          {item.score}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-gray-600">
                        {item.date}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Evaluation */}
        {evaluation && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-full border-4 border-purple-500/30 bg-purple-500/5">
                <span className="text-4xl font-bold">
                  {evaluation.score}
                </span>

                <span className="text-xs text-gray-500">
                  / 100
                </span>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-purple-400">
                  AI Evaluation
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Interview Feedback
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  {evaluation.feedback}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <FeedbackList
                title="Strengths"
                items={evaluation.strengths}
                positive
              />

              <FeedbackList
                title="Areas to Improve"
                items={evaluation.improvements}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-5">
              <h4 className="font-semibold text-blue-300">
                Key Points for an Ideal Answer
              </h4>

              <ul className="mt-4 space-y-2">
                {evaluation.idealAnswerPoints.map(
                  (point, index) => (
                    <li
                      key={index}
                      className="text-sm leading-6 text-gray-400"
                    >
                      • {point}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-sm text-gray-500">
          <Clock
            size={17}
            className="mt-0.5 shrink-0"
          />

          <p>
            Interview history is currently stored locally in
            your browser. No personal interview data is sent
            to a database by this feature.
          </p>
        </div>
      </div>
    </section>
  )
}

function FeedbackList({
  title,
  items,
  positive = false,
}: {
  title: string
  items: string[]
  positive?: boolean
}) {
  return (
    <div>
      <h4
        className={`font-semibold ${
          positive
            ? 'text-green-300'
            : 'text-orange-300'
        }`}
      >
        {title}
      </h4>

      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="rounded-xl border border-white/5 bg-black/20 p-4 text-sm leading-6 text-gray-400"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}