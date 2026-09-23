'use client'

import { useEffect, useState } from 'react'
import {
  ExternalLink,
  GitFork,
  Github,
  Loader2,
  Star,
  Users,
  BookOpen,
} from 'lucide-react'

type Repository = {
  name: string
  description: string | null
  url: string
  stars: number
  forks: number
  language: string
  updatedAt: string
}

type GitHubData = {
  user: {
    login: string
    name: string | null
    avatar: string
    profileUrl: string
    followers: number
    following: number
    publicRepos: number
  }
  summary: {
    repositories: number
    stars: number
    forks: number
  }
  languages: {
    name: string
    count: number
  }[]
  topRepositories: Repository[]
}

export default function GitHubStatsBoard() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadGitHubStats() {
      try {
        const response = await fetch('/api/github')

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub statistics')
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error(err)
        setError(
          'GitHub statistics are temporarily unavailable.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadGitHubStats()
  }, [])

  if (loading) {
    return (
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-10">
            <div className="flex items-center justify-center gap-3 text-gray-400">
              <Loader2
                size={22}
                className="animate-spin"
              />
              Loading GitHub statistics...
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center">
            <Github
              size={35}
              className="mx-auto mb-4 text-red-400"
            />

            <h2 className="text-xl font-bold">
              GitHub Stats Unavailable
            </h2>

            <p className="mt-2 text-gray-400">
              {error ||
                'Unable to retrieve GitHub data right now.'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const maxLanguageCount = Math.max(
    ...data.languages.map((language) => language.count),
    1
  )

  return (
    <section id="github" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              Open Source
            </p>

            <h2 className="text-4xl font-bold sm:text-5xl">
              GitHub Activity
            </h2>

            <p className="mt-4 max-w-2xl text-gray-400">
              Live repository and profile statistics from GitHub.
            </p>
          </div>

          <a
            href={data.user.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
          >
            <Github size={18} />
            View GitHub
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Profile */}
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <img
              src={data.user.avatar}
              alt={`${data.user.login} GitHub profile`}
              className="h-20 w-20 rounded-2xl border border-white/10"
            />

            <div>
              <h3 className="text-2xl font-bold">
                {data.user.name || data.user.login}
              </h3>

              <p className="text-purple-400">
                @{data.user.login}
              </p>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Users size={15} />
                  {data.user.followers} followers
                </span>

                <span>
                  {data.user.following} following
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<BookOpen size={21} />}
            label="Repositories"
            value={data.summary.repositories}
          />

          <StatCard
            icon={<Star size={21} />}
            label="Total Stars"
            value={data.summary.stars}
          />

          <StatCard
            icon={<GitFork size={21} />}
            label="Total Forks"
            value={data.summary.forks}
          />

          <StatCard
            icon={<Users size={21} />}
            label="Followers"
            value={data.user.followers}
          />
        </div>

        {/* Main grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Languages */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7">
            <h3 className="text-xl font-bold">
              Programming Languages
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Based on the languages detected across repositories.
            </p>

            <div className="mt-7 space-y-5">
              {data.languages.slice(0, 8).map((language) => {
                const percentage =
                  (language.count / maxLanguageCount) * 100

                return (
                  <div key={language.name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-300">
                        {language.name}
                      </span>

                      <span className="text-gray-500">
                        {language.count} repos
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top repos */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7">
            <h3 className="text-xl font-bold">
              Top Repositories
            </h3>

            <div className="mt-6 space-y-3">
              {data.topRepositories.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-white/5 bg-black/20 p-4 transition hover:border-purple-500/30 hover:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="truncate font-semibold">
                        {repo.name}
                      </h4>

                      <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {repo.description ||
                          'No repository description available.'}
                      </p>
                    </div>

                    <ExternalLink
                      size={16}
                      className="shrink-0 text-gray-500"
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span>{repo.language}</span>

                    <span className="flex items-center gap-1">
                      <Star size={13} />
                      {repo.stars}
                    </span>

                    <span className="flex items-center gap-1">
                      <GitFork size={13} />
                      {repo.forks}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: number
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-purple-500/30">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
        {icon}
      </div>

      <p className="text-3xl font-bold">
        {value.toLocaleString()}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {label}
      </p>
    </div>
  )
}