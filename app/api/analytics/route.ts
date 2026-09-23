import { NextRequest, NextResponse } from 'next/server'

type AnalyticsEvent = {
  type: string
  section?: string
  device?: string
  country?: string
  referrer?: string
  timestamp?: string
}

const analyticsEvents: AnalyticsEvent[] = []

export async function GET() {
  try {
    const totalVisitors = new Set(
      analyticsEvents.map((event) => event.timestamp)
    ).size

    const deviceBreakdown = {
      mobile: analyticsEvents.filter(
        (event) => event.device === 'mobile'
      ).length,
      desktop: analyticsEvents.filter(
        (event) => event.device === 'desktop'
      ).length,
      tablet: analyticsEvents.filter(
        (event) => event.device === 'tablet'
      ).length,
    }

    const countryCounts: Record<string, number> = {}

    analyticsEvents.forEach((event) => {
      if (event.country) {
        countryCounts[event.country] =
          (countryCounts[event.country] || 0) + 1
      }
    })

    const referralCounts: Record<string, number> = {}

    analyticsEvents.forEach((event) => {
      if (event.referrer) {
        referralCounts[event.referrer] =
          (referralCounts[event.referrer] || 0) + 1
      }
    })

    const sectionCounts: Record<string, number> = {}

    analyticsEvents.forEach((event) => {
      if (event.section) {
        sectionCounts[event.section] =
          (sectionCounts[event.section] || 0) + 1
      }
    })

    return NextResponse.json({
      success: true,

      visitors: {
        total: analyticsEvents.length,
        unique: totalVisitors,
      },

      devices: deviceBreakdown,

      countries: Object.entries(countryCounts).map(
        ([country, visits]) => ({
          country,
          visits,
        })
      ),

      referrals: Object.entries(referralCounts).map(
        ([source, visits]) => ({
          source,
          visits,
        })
      ),

      sections: Object.entries(sectionCounts).map(
        ([section, views]) => ({
          section,
          views,
        })
      ),

      performance: {
        averageLoadTime: 0,
        averagePageLoadTime: 0,
        totalEvents: analyticsEvents.length,
      },
    })
  } catch (error) {
    console.error('Analytics GET error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to load analytics data.',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const event: AnalyticsEvent = {
      type: body.type || 'page_view',
      section: body.section || undefined,
      device: body.device || 'desktop',
      country: body.country || 'Unknown',
      referrer: body.referrer || 'Direct',
      timestamp: new Date().toISOString(),
    }

    analyticsEvents.push(event)

    // Prevent unlimited memory growth during development.
    if (analyticsEvents.length > 1000) {
      analyticsEvents.shift()
    }

    return NextResponse.json({
      success: true,
      message: 'Analytics event recorded.',
    })
  } catch (error) {
    console.error('Analytics POST error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to record analytics event.',
      },
      { status: 500 }
    )
  }
}