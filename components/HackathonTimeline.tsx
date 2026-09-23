'use client'

import { useMemo, useState } from 'react'
import {
  CalendarDays,
  ExternalLink,
  Filter,
  Github,
  Users,
  Trophy,
  Code2,
} from 'lucide-react'

type Hackathon = {
  id: number
  name: string
  date: string
  year: string
  result: string
  prize: string
  teamSize: number
  technologies: string[]
  project: string
  description: string
  position: string
  teamMembers: string[]
  projectLink?: string
  githubLink?: string
}

const hackathons: Hackathon[] = [
  {
    id: 1,
    name: 'Smart India Hackathon 2025',
    date: '2025',
    year: '2025',
    result: 'Shortlisted',
    prize: 'Shortlisted',
    teamSize: 6,
    technologies: [
      'AI/ML',
      'Computer Vision',
      'React',
      'Python',
    ],
    project: 'AI Virtual Try-On',
    description:
      'AI-powered virtual try-on solution that helps users visualize clothing before purchase.',
    position: 'Shortlisted',
    teamMembers: [],
    projectLink:
      'https://virtual-try-on-website-ar-vr.onrender.com',
  },
  {
    id: 2,
    name: 'HackOn with Amazon 6.0',
    date: '2025',
    year: '2025',
    result: 'Shortlisted',
    prize: 'Shortlisted',
    teamSize: 5,
    technologies: [
      'AI/ML',
      'React',
      'Node.js',
      'MongoDB',
    ],
    project: 'Data Era',
    description:
      'Team-based AI solution developed during HackOn with Amazon.',
    position: 'Shortlisted',
    teamMembers: [],
  },
]

const years = [
  'All',
  ...Array.from(
    new Set(hackathons.map((h) => h.year))
  ),
]

const technologies = [
  'All',
  ...Array.from(
    new Set(
      hackathons.flatMap(
        (h) => h.technologies
      )
    )
  ),
]

export default function HackathonTimeline() {
  const [yearFilter, setYearFilter] =
    useState('All')

  const [
    technologyFilter,
    setTechnologyFilter,
  ] = useState('All')

  const [prizeOnly, setPrizeOnly] =
    useState(false)

  const filteredHackathons = useMemo(() => {
    return hackathons.filter((hackathon) => {
      const matchesYear =
        yearFilter === 'All' ||
        hackathon.year === yearFilter

      const matchesTechnology =
        technologyFilter === 'All' ||
        hackathon.technologies.includes(
          technologyFilter
        )

      const matchesPrize =
        !prizeOnly ||
        hackathon.prize.toLowerCase() !==
          'participated'

      return (
        matchesYear &&
        matchesTechnology &&
        matchesPrize
      )
    })
  }, [
    yearFilter,
    technologyFilter,
    prizeOnly,
  ])

  function resetFilters() {
    setYearFilter('All')
    setTechnologyFilter('All')
    setPrizeOnly(false)
  }

  return (
    <section
      id="hackathons"
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            Competitions
          </p>

          <h2 className="text-4xl font-bold sm:text-5xl">
            Hackathon Achievements
          </h2>

          <p className="mt-4 max-w-2xl text-gray-400">
            A timeline of hackathons and
            achievements.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <div className="mb-5 flex items-center gap-3">
            <Filter
              size={18}
              className="text-purple-400"
            />
            <h3 className="font-semibold">
              Filters
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <select
              value={yearFilter}
              onChange={(e) =>
                setYearFilter(e.target.value)
              }
              className="rounded-xl border border-white/10 bg-black/40 p-3"
            >
              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>

            <select
              value={technologyFilter}
              onChange={(e) =>
                setTechnologyFilter(
                  e.target.value
                )
              }
              className="rounded-xl border border-white/10 bg-black/40 p-3"
            >
              {technologies.map((tech) => (
                <option
                  key={tech}
                  value={tech}
                >
                  {tech}
                </option>
              ))}
            </select>

            <button
              onClick={() =>
                setPrizeOnly(!prizeOnly)
              }
              className={`rounded-xl border p-3 ${
                prizeOnly
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-white/10'
              }`}
            >
              {prizeOnly
                ? 'Achievements Only'
                : 'All Results'}
            </button>
          </div>

          <button
            onClick={resetFilters}
            className="mt-4 text-sm text-gray-400"
          >
            Reset Filters
          </button>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {filteredHackathons.map(
            (hackathon) => (
              <div
                key={hackathon.id}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                    {hackathon.date}
                  </span>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">
                    {hackathon.result}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-bold">
                  {hackathon.name}
                </h3>

                <p className="mt-2 text-purple-300">
                  {hackathon.project}
                </p>

                <p className="mt-5 text-gray-400">
                  {hackathon.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {hackathon.technologies.map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 px-3 py-1 text-xs"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                {hackathon.projectLink && (
                  <a
                    href={
                      hackathon.projectLink
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-black"
                  >
                    View Project
                    <ExternalLink
                      size={14}
                    />
                  </a>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}