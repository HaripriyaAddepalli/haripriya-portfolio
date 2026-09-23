import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { resume } =
      await request.json()

    if (!resume) {
      return NextResponse.json(
        {
          error:
            'Resume data is required.',
        },
        { status: 400 }
      )
    }

    const apiKey =
      process.env.GROQ_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'GROQ_API_KEY is not configured.',
        },
        { status: 500 }
      )
    }

    const prompt = `
You are a professional resume writer.

Improve the following resume content for a software
engineering / AI-ML candidate.

IMPORTANT:
- Do not invent companies, degrees, projects,
  technologies, achievements, dates, rankings,
  or responsibilities.
- Preserve factual information.
- Improve clarity and professional wording.
- Make descriptions concise and ATS-friendly.
- Use strong action-oriented wording where
  supported by the original information.

Resume data:

${JSON.stringify(resume, null, 2)}

Return valid JSON with exactly these fields:

{
  "summary": "improved professional summary",
  "experiences": [
    {
      "id": number,
      "company": "existing company",
      "role": "existing role",
      "duration": "existing duration",
      "description": "improved description"
    }
  ],
  "projects": [
    {
      "id": number,
      "name": "existing project name",
      "technologies": "existing technologies",
      "description": "improved description",
      "link": "existing link"
    }
  ]
}
`

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: [
            {
              role: 'system',
              content:
                'You are a precise ATS resume editor. Never fabricate candidate information.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.2,
          max_tokens: 3000,
          response_format: {
            type: 'json_object',
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText =
        await response.text()

      console.error(
        'Groq Resume API error:',
        errorText
      )

      return NextResponse.json(
        {
          error:
            'Groq API request failed.',
        },
        {
          status: response.status,
        }
      )
    }

    const result =
      await response.json()

    const content =
      result?.choices?.[0]?.message
        ?.content

    if (!content) {
      return NextResponse.json(
        {
          error:
            'No resume improvement was returned.',
        },
        { status: 500 }
      )
    }

    let parsed

    try {
      parsed = JSON.parse(content)
    } catch {
      return NextResponse.json(
        {
          error:
            'AI returned an invalid resume format.',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      parsed
    )
  } catch (error) {
    console.error(
      'Resume generator error:',
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Something went wrong.',
      },
      { status: 500 }
    )
  }
}