import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'openai/gpt-oss-20b'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      currentSkills,
      targetRole,
      experienceLevel,
      timeline,
    } = body

    if (!currentSkills || !targetRole) {
      return NextResponse.json(
        { error: 'Current skills and target role are required.' },
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
Create a personalized career roadmap.

Candidate information:
- Current skills: ${currentSkills}
- Target role: ${targetRole}
- Experience level: ${experienceLevel || 'Student / Fresher'}
- Preferred timeline: ${timeline || '12 months'}

Return ONLY valid JSON using exactly this structure:

{
  "summary": "short personalized summary",
  "skillAssessment": [
    {
      "skill": "skill name",
      "level": "Beginner|Intermediate|Advanced",
      "status": "Strong|Needs Improvement|Missing"
    }
  ],
  "roadmap": [
    {
      "phase": "Phase 1",
      "duration": "Month 1-3",
      "title": "phase title",
      "goal": "main goal",
      "skills": [
        {
          "name": "skill",
          "priority": "High|Medium|Low",
          "difficulty": "Easy|Medium|Hard",
          "reason": "why this skill matters"
        }
      ],
      "resources": [
        {
          "name": "resource name",
          "type": "Free Course|Documentation|Tutorial|Practice",
          "url": "official or publicly accessible URL"
        }
      ],
      "milestones": [
        "milestone 1",
        "milestone 2"
      ]
    }
  ],
  "finalMilestones": [
    "milestone 1",
    "milestone 2",
    "milestone 3"
  ]
}

Requirements:
- Make the roadmap specific to the candidate.
- Prioritize skills based on the target role.
- Include realistic 3, 6, and 12 month progression where appropriate.
- Prefer genuinely free learning resources.
- Do not invent certifications, jobs, projects, achievements, or experience.
- Keep recommendations practical for a student/fresher.
- Include technical skills and relevant interview/job-preparation skills.
- Return valid JSON only.
`

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.4,
        messages: [
          {
            role: 'system',
            content:
              'You are a professional career roadmap advisor for software engineering and AI/ML careers. Return only valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()

      console.error('Groq roadmap error:', errorText)

      return NextResponse.json(
        { error: 'Unable to generate the career roadmap right now.' },
        { status: response.status }
      )
    }

    const data = await response.json()

    const content = data?.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'Groq returned an empty roadmap.' },
        { status: 502 }
      )
    }

    let roadmap

    try {
      roadmap = JSON.parse(content)
    } catch {
      const cleaned = content
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim()

      roadmap = JSON.parse(cleaned)
    }

    return NextResponse.json(roadmap)
  } catch (error) {
    console.error('Career roadmap API error:', error)

    return NextResponse.json(
      { error: 'Something went wrong while generating the roadmap.' },
      { status: 500 }
    )
  }
}