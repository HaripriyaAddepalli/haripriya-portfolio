import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { code, language, mode } = body

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Code is required.' },
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

    const selectedMode =
      mode === 'Expert'
        ? 'Expert'
        : mode === 'Intermediate'
          ? 'Intermediate'
          : 'Beginner'

    const selectedLanguage =
      language || 'Auto Detect'

    const prompt = `
You are an expert programming instructor.

Explain the following code for a ${selectedMode}-level developer.

Programming language:
${selectedLanguage}

Explanation level:
${selectedMode}

Code:
\`\`\`
${code}
\`\`\`

Provide a clear explanation with these sections:

1. What this code does
2. Step-by-step explanation
3. Important concepts
4. Time and space complexity, if applicable
5. Potential issues or improvements
6. A simple example of how it works

For Beginner mode:
- Use simple language.
- Explain programming concepts from the basics.
- Avoid unnecessary jargon.

For Intermediate mode:
- Explain implementation details.
- Include relevant programming concepts.
- Discuss practical improvements.

For Expert mode:
- Focus on architecture, performance, edge cases,
  complexity, and production considerations.

Do not rewrite the entire code unless necessary.
Use Markdown formatting.
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
                'You are a precise and helpful programming instructor.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 3000,
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()

      console.error('Groq API error:', errorText)

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

    const explanation =
      data?.choices?.[0]?.message?.content

    if (!explanation) {
      return NextResponse.json(
        {
          error: 'No explanation was returned.',
        },
        {
          status: 500,
        }
      )
    }

    return NextResponse.json({
      explanation,
    })
  } catch (error) {
    console.error(
      'Code explanation error:',
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Something went wrong.',
      },
      {
        status: 500,
      }
    )
  }
}