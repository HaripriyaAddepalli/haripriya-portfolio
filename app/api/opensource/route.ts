import { NextResponse } from 'next/server'

const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
  'HaripriyaAddepalli'

interface GitHubRepository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics?: string[]
}

interface GitHubPullRequest {
  id: number
  title: string
  html_url: string
  state: string
  merged_at: string | null
  repository_url: string
}

interface GitHubIssue {
  id: number
  title: string
  html_url: string
  state: string
  created_at: string
  closed_at: string | null
  repository_url: string
}

async function githubFetch(
  url: string
) {
  const response = await fetch(url, {
    headers: {
      Accept:
        'application/vnd.github+json',
      'User-Agent':
        'Haripriya-Portfolio',
    },
    next: {
      revalidate: 3600,
    },
  })

  if (!response.ok) {
    throw new Error(
      `GitHub API returned ${response.status}`
    )
  }

  return response.json()
}

export async function GET() {
  try {
    const [
      repositories,
      pullRequests,
      issues,
    ] = await Promise.all([
      githubFetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
      ),

      githubFetch(
        `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:merged&per_page=100`
      ),

      githubFetch(
        `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:issue+is:closed&per_page=100`
      ),
    ])

    const repoList =
      Array.isArray(repositories)
        ? (repositories as GitHubRepository[])
        : []

    const mergedPRs =
      Array.isArray(pullRequests?.items)
        ? (pullRequests.items as GitHubPullRequest[])
        : []

    const closedIssues =
      Array.isArray(issues?.items)
        ? (issues.items as GitHubIssue[])
        : []

    const sortedRepositories =
      [...repoList]
        .sort(
          (a, b) =>
            b.stargazers_count -
            a.stargazers_count
        )
        .slice(0, 12)

    const languageCounts: Record<
      string,
      number
    > = {}

    sortedRepositories.forEach(
      (repo) => {
        if (repo.language) {
          languageCounts[
            repo.language
          ] =
            (languageCounts[
              repo.language
            ] || 0) + 1
        }
      }
    )

    const repositoryData =
      sortedRepositories.map(
        (repo) => ({
          id: repo.id,
          name: repo.name,
          fullName:
            repo.full_name,
          description:
            repo.description ||
            'No description available.',
          url: repo.html_url,
          stars:
            repo.stargazers_count,
          forks:
            repo.forks_count,
          language:
            repo.language ||
            'Other',
          technologies:
            repo.topics &&
            repo.topics.length > 0
              ? repo.topics
              : repo.language
                ? [repo.language]
                : [],
          updatedAt:
            repo.updated_at,
        })
      )

    const timeline = [
      ...mergedPRs.map(
        (pr) => ({
          type: 'Pull Request',
          title: pr.title,
          url: pr.html_url,
          date:
            pr.merged_at ||
            new Date().toISOString(),
          repository:
            pr.repository_url
              .split('/')
              .pop() ||
            'Repository',
        })
      ),

      ...closedIssues.map(
        (issue) => ({
          type: 'Issue',
          title: issue.title,
          url: issue.html_url,
          date:
            issue.closed_at ||
            issue.created_at,
          repository:
            issue.repository_url
              .split('/')
              .pop() ||
            'Repository',
        })
      ),
    ]
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 20)

    const totalStars =
      repoList.reduce(
        (total, repo) =>
          total +
          repo.stargazers_count,
        0
      )

    const totalForks =
      repoList.reduce(
        (total, repo) =>
          total +
          repo.forks_count,
        0
      )

    return NextResponse.json({
      username:
        GITHUB_USERNAME,

      repositories:
        repositoryData,

      statistics: {
        repositories:
          repoList.length,
        mergedPullRequests:
          pullRequests?.total_count ||
          mergedPRs.length,
        closedIssues:
          issues?.total_count ||
          closedIssues.length,
        stars:
          totalStars,
        forks:
          totalForks,
      },

      languages:
        languageCounts,

      timeline,
    })
  } catch (error) {
    console.error(
      'Open source tracker error:',
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to load GitHub contributions.',
      },
      {
        status: 500,
      }
    )
  }
}