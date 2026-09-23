import { NextResponse } from 'next/server'

const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
  'HaripriyaAddepalli'

type GitHubRepository = {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
    }

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const userResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers,
        next: {
          revalidate: 3600,
        },
      }
    )

    if (!userResponse.ok) {
      throw new Error(
        `GitHub user request failed: ${userResponse.status}`
      )
    }

    const user = await userResponse.json()

    const repositoriesResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: {
          revalidate: 3600,
        },
      }
    )

    if (!repositoriesResponse.ok) {
      throw new Error(
        `GitHub repositories request failed: ${repositoriesResponse.status}`
      )
    }

    const repositories: GitHubRepository[] =
      await repositoriesResponse.json()

    const totalStars = repositories.reduce(
      (total, repo) =>
        total + repo.stargazers_count,
      0
    )

    const totalForks = repositories.reduce(
      (total, repo) =>
        total + repo.forks_count,
      0
    )

    const languageCounts: Record<string, number> = {}

    repositories.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1
      }
    })

    const languages = Object.entries(
      languageCounts
    )
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count)

    const topRepositories = [...repositories]
      .sort(
        (a, b) =>
          b.stargazers_count -
          a.stargazers_count
      )
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language:
          repo.language || 'Not specified',
        updatedAt: repo.updated_at,
      }))

    return NextResponse.json({
      user: {
        login: user.login,
        name: user.name,
        avatar: user.avatar_url,
        profileUrl: user.html_url,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
      },

      summary: {
        repositories:
          repositories.length,
        stars: totalStars,
        forks: totalForks,
      },

      languages,

      topRepositories,
    })
  } catch (error) {
    console.error(
      'GitHub API error:',
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Unable to fetch GitHub data',
      },
      {
        status: 500,
      }
    )
  }
}