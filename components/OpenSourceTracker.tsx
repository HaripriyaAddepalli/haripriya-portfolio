'use client'

import { useEffect, useState } from 'react'
import {
  GitPullRequest,
  Github,
  ExternalLink,
  GitBranch,
  Star,
  CircleDot,
  Code2,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'

interface Repository {
  id: number
  name: string
  fullName: string
  description: string
  url: string
  stars: number
  forks: number
  language: string
  technologies: string[]
  updatedAt: string
}

interface TimelineItem {
  type: string
  title: string
  url: string
  date: string
  repository: string
}

interface TrackerData {
  username: string
  repositories: Repository[]
  statistics: {
    repositories: number
    mergedPullRequests: number
    closedIssues: number
    stars: number
    forks: number
  }
  languages: Record<string, number>
  timeline: TimelineItem[]
}

export default function OpenSourceTracker() {
  const [data, setData] =
    useState<TrackerData | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const fetchData = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        '/api/opensource'
      )

      const result =
        await response.json()

      if (!response.ok) {
        throw new Error(
          result?.error ||
            'Failed to load GitHub data.'
        )
      }

      setData(result)
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load GitHub contributions.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section
      id="opensource-tracker"
      className="py-20"
      aria-labelledby="opensource-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300">
            <Github className="h-4 w-4" />
            Open Source
          </div>

          <h2
            id="opensource-title"
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            Open Source Contributions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            GitHub repositories, pull requests, issues,
            technologies, and contribution activity.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="text-center">
              <RefreshCw className="mx-auto h-8 w-8 animate-spin text-purple-400" />

              <p className="mt-4 text-sm text-gray-400">
                Loading GitHub contributions...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />

              <div>
                <h3 className="font-semibold text-red-300">
                  Unable to load GitHub data
                </h3>

                <p className="mt-1 text-sm text-red-300/80">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={fetchData}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200 hover:bg-red-500/30"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && data && (
          <>
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <StatCard
                icon={<Github className="h-5 w-5" />}
                label="Repositories"
                value={
                  data.statistics
                    .repositories
                }
              />

              <StatCard
                icon={
                  <GitPullRequest className="h-5 w-5" />
                }
                label="Merged PRs"
                value={
                  data.statistics
                    .mergedPullRequests
                }
              />

              <StatCard
                icon={
                  <CircleDot className="h-5 w-5" />
                }
                label="Closed Issues"
                value={
                  data.statistics
                    .closedIssues
                }
              />

              <StatCard
                icon={
                  <Star className="h-5 w-5" />
                }
                label="Repository Stars"
                value={
                  data.statistics
                    .stars
                }
              />

              <StatCard
                icon={
                  <GitBranch className="h-5 w-5" />
                }
                label="Forks"
                value={
                  data.statistics
                    .forks
                }
              />
            </div>

            {/* Repository Grid */}
            <div className="mt-8">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Repository Contributions
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Top repositories by stars
                  </p>
                </div>

                <a
                  href={`https://github.com/${data.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:bg-white/10"
                >
                  View GitHub
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {data.repositories.length ===
              0 ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-gray-500">
                  No public repositories found.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data.repositories.map(
                    (repo) => (
                      <article
                        key={repo.id}
                        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/[0.05]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="rounded-xl bg-purple-500/10 p-3">
                            <Code2 className="h-5 w-5 text-purple-400" />
                          </div>

                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${repo.name} on GitHub`}
                            className="text-gray-500 transition hover:text-white"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>

                        <h4 className="mt-4 font-semibold text-white">
                          {repo.name}
                        </h4>

                        <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                          {repo.description}
                        </p>

                        {/* Technologies */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {repo.technologies
                            .slice(0, 5)
                            .map(
                              (
                                technology
                              ) => (
                                <span
                                  key={
                                    technology
                                  }
                                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-gray-400"
                                >
                                  {
                                    technology
                                  }
                                </span>
                              )
                            )}
                        </div>

                        {/* Stats */}
                        <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <Star className="h-3.5 w-3.5" />
                            {repo.stars}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <GitBranch className="h-3.5 w-3.5" />
                            {repo.forks}
                          </span>

                          <span className="ml-auto">
                            {repo.language}
                          </span>
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Languages */}
            {Object.keys(
              data.languages
            ).length > 0 && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-xl font-semibold text-white">
                  Technologies
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Languages detected across the displayed repositories
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {Object.entries(
                    data.languages
                  )
                    .sort(
                      ([, a], [, b]) =>
                        b - a
                    )
                    .map(
                      ([
                        language,
                        count,
                      ]) => (
                        <div
                          key={language}
                          className="rounded-xl border border-white/10 bg-black/10 px-4 py-3"
                        >
                          <div className="font-medium text-white">
                            {language}
                          </div>

                          <div className="mt-1 text-xs text-gray-500">
                            {count}{' '}
                            {count ===
                            1
                              ? 'repository'
                              : 'repositories'}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Contribution Timeline
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Recent merged pull requests and closed issues
                </p>
              </div>

              {data.timeline.length ===
              0 ? (
                <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-gray-500">
                  No public contribution activity found.
                </div>
              ) : (
                <div className="space-y-5">
                  {data.timeline.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={`${item.url}-${index}`}
                        className="relative flex gap-4"
                      >
                        <div className="flex flex-col items-center">
                          <div className="rounded-full border border-purple-500/30 bg-purple-500/10 p-2">
                            {item.type ===
                            'Pull Request' ? (
                              <GitPullRequest className="h-4 w-4 text-purple-400" />
                            ) : (
                              <CircleDot className="h-4 w-4 text-purple-400" />
                            )}
                          </div>

                          {index !==
                            data.timeline
                              .length -
                              1 && (
                            <div className="mt-2 h-full w-px bg-white/10" />
                          )}
                        </div>

                        <div className="pb-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-white/[0.05] px-2 py-1 text-[10px] uppercase tracking-wide text-gray-400">
                              {item.type}
                            </span>

                            <span className="text-xs text-gray-600">
                              {new Date(
                                item.date
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 block font-medium text-white transition hover:text-purple-300"
                          >
                            {item.title}
                          </a>

                          <p className="mt-1 text-xs text-gray-500">
                            {item.repository}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </>
        )}
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 inline-flex rounded-xl bg-purple-500/10 p-3 text-purple-400">
        {icon}
      </div>

      <div className="text-2xl font-bold text-white">
        {value}
      </div>

      <div className="mt-1 text-xs text-gray-500">
        {label}
      </div>
    </div>
  )
}