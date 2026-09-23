import { NextResponse } from 'next/server'

const USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'HaripriyaAddepalli'

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const userResponse = await fetch(
      `https://api.github.com/users/${USERNAME}`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    )

    if (!userResponse.ok) {
      throw new Error(
        `GitHub user request failed: ${userResponse.status}`
      )
    }

    const user = await userResponse.json()

    const reposResponse = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    )

    if (!reposResponse.ok) {
      throw new Error(
        `GitHub repositories request failed: ${reposResponse.status}`
      )
    }

    const repositories = await reposResponse.json()

    const topRepositories = repositories
      .filter((repo: any) => !repo.fork)
      .sort(
        (a: any, b: any) =>
          (b.stargazers_count || 0) -
          (a.stargazers_count || 0)
      )
      .slice(0, 6)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language || 'Other',
        updatedAt: repo.updated_at,
      }))

    const languageCounts: Record<string, number> = {}

    repositories.forEach((repo: any) => {
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1
      }
    })

    const totalRepositories = repositories.filter(
      (repo: any) => !repo.fork
    ).length

    const totalStars = repositories.reduce(
      (total: number, repo: any) =>
        total + (repo.stargazers_count || 0),
      0
    )

    const totalForks = repositories.reduce(
      (total: number, repo: any) =>
        total + (repo.forks_count || 0),
      0
    )

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
        repositories: totalRepositories,
        stars: totalStars,
        forks: totalForks,
      },

      languages: Object.entries(languageCounts)
        .map(([name, count]) => ({
          name,
          count,
        }))
        .sort((a: any, b: any) => b.count - a.count),

      topRepositories,
    })
  } catch (error) {
    console.error('GitHub API error:', error)

    return NextResponse.json(
      {
        error: 'Unable to load GitHub statistics.',
        message:
          'GitHub data is temporarily unavailable. Please try again later.',
      },
      { status: 503 }
    )
  }
}