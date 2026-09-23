import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { techStack, projectType } = body

    if (!techStack || typeof techStack !== 'string') {
      return NextResponse.json(
        { error: 'Tech stack is required.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is not configured.' },
        { status: 500 }
      )
    }

    const prompt = `
You are an expert software architect and technology consultant.

Analyze the following technology stack.

Technology Stack:
${techStack}

Project Type:
${projectType || 'General software project'}

Provide a practical compatibility analysis.

Your response MUST contain these sections:

## 1. Overall Compatibility
Give a clear assessment of how well these technologies work together.
Do not use a numeric score.

## 2. Technology Roles
Explain the role of each technology in the stack.

## 3. Potential Conflicts
Identify:
- Version conflicts
- Runtime conflicts
- Dependency conflicts
- Architecture conflicts
- Development workflow issues

If there are no significant conflicts, clearly say so.

## 4. Why They Work Together
Explain the important integration points between the technologies.

## 5. Recommended Alternatives
Suggest alternatives only where they provide a meaningful improvement.
For every alternative, explain:
- What it replaces
- Why it may be better
- Any trade-offs

## 6. Performance Analysis
Discuss:
- Runtime performance
- Scalability
- API performance
- Database considerations
- Frontend performance
- Resource usage

## 7. Security Considerations
Discuss:
- Authentication
- Authorization
- API key protection
- Dependency security
- Data validation
- Common vulnerabilities
- Production deployment concerns

## 8. Recommended Architecture
Describe a practical architecture for using this stack together.

## 9. Final Recommendations
Give concise, actionable recommendations for building a production-ready project.

Rules:
- Be technically accurate.
- Do not invent dependencies.
- Clearly distinguish confirmed compatibility from potential concerns.
- Use Markdown.
- Explain technical terms when useful.
`

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert software architect specializing in modern full-stack, AI/ML, cloud, and web technologies.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.2,
          max_tokens: 4000,
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()

      console.error('Groq Tech Stack API error:', errorText)

      return NextResponse.json(
        {
          error: 'Groq API request failed.',
        },
        {
          status: response.status,
        }
      )
    }

    const data = await response.json()

    const analysis =
      data?.choices?.[0]?.message?.content

    if (!analysis) {
      return NextResponse.json(
        {
          error: 'No compatibility analysis was returned.',
        },
        {
          status: 500,
        }
      )
    }

    return NextResponse.json({
      analysis,
    })
  } catch (error) {
    console.error(
      'Tech stack compatibility error:',
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Something went wrong while analyzing the tech stack.',
      },
      {
        status: 500,
      }
    )
  }
}