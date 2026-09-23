import { NextRequest, NextResponse } from 'next/server'

type Course = {
  title: string
  platform: string
  duration: string
  type: 'Free' | 'Paid'
  skills: string[]
  reason: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const currentSkills = body.currentSkills || ''
    const targetRole = body.targetRole || 'AI & Full Stack Engineer'
    const completedCourses = body.completedCourses || []

    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'GROQ_API_KEY is not configured.',
        },
        { status: 500 }
      )
    }

    const prompt = `
You are a career learning-path advisor.

Create a practical learning path for:

Target role:
${targetRole}

Current skills:
${currentSkills}

Completed courses:
${JSON.stringify(completedCourses)}

Return ONLY valid JSON in this exact structure:

{
  "summary": "short personalized summary",
  "recommendedCourses": [
    {
      "title": "course or learning resource",
      "platform": "platform name",
      "duration": "estimated completion time",
      "type": "Free",
      "skills": ["skill1", "skill2"],
      "reason": "why this is recommended"
    }
  ]
}

Rules:
- Recommend 5 courses/resources.
- Mix free and paid resources when appropriate.
- Prefer reputable learning platforms.
- Focus on skills useful for the target role.
- Do not recommend courses already completed.
- Keep recommendations realistic for a student.
- "type" must be exactly "Free" or "Paid".
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
          temperature: 0.4,
          messages: [
            {
              role: 'system',
              content:
                'You are an expert technical learning-path advisor. Return valid JSON only.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()

      console.error('Groq learning path error:', errorText)

      return NextResponse.json(
        {
          success: false,
          error: 'Unable to generate learning recommendations.',
        },
        { status: response.status }
      )
    }

    const result = await response.json()

    const content = result.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('No response returned from Groq.')
    }

    let cleaned = content.trim()

    if (cleaned.startsWith('```json')) {
      cleaned = cleaned
        .replace(/^```json/, '')
        .replace(/```$/, '')
        .trim()
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim()
    }

    const learningPath = JSON.parse(cleaned)

    return NextResponse.json({
      success: true,
      ...learningPath,
    })
  } catch (error) {
    console.error('Learning path API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong while generating the learning path.',
      },
      { status: 500 }
    )
  }
}