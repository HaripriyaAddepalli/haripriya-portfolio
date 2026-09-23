'use client'

import { useEffect, useState } from 'react'

type AnalyticsData = {
  visitors: {
    total: number
    unique: number
  }
  devices: {
    mobile: number
    desktop: number
    tablet: number
  }
  countries: {
    country: string
    visits: number
  }[]
  referrals: {
    source: string
    visits: number
  }[]
  sections: {
    section: string
    views: number
  }[]
  performance: {
    averageLoadTime: number
    averagePageLoadTime: number
    totalEvents: number
  }
}

const initialData: AnalyticsData = {
  visitors: {
    total: 0,
    unique: 0,
  },
  devices: {
    mobile: 0,
    desktop: 0,
    tablet: 0,
  },
  countries: [],
  referrals: [],
  sections: [],
  performance: {
    averageLoadTime: 0,
    averagePageLoadTime: 0,
    totalEvents: 0,
  },
}

export default function PortfolioAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('/api/analytics', {
        method: 'GET',
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error('Failed to load analytics')
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Unable to load analytics')
      }

      setData({
        visitors: result.visitors || initialData.visitors,
        devices: result.devices || initialData.devices,
        countries: result.countries || [],
        referrals: result.referrals || [],
        sections: result.sections || [],
        performance: result.performance || initialData.performance,
      })
    } catch (err) {
      console.error('Analytics dashboard error:', err)
      setError('Unable to load analytics data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAnalytics()

    const interval = setInterval(loadAnalytics, 30000)

    return () => clearInterval(interval)
  }, [])

  const totalDevices =
    data.devices.mobile +
    data.devices.desktop +
    data.devices.tablet

  const getPercentage = (value: number, total: number) => {
    if (!total) return 0
    return Math.round((value / total) * 100)
  }

  return (
    <section
      id="analytics"
      className="w-full px-4 py-16 md:px-8 lg:px-12"
      aria-labelledby="analytics-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-400">
              Portfolio Insights
            </p>

            <h2
              id="analytics-heading"
              className="text-3xl font-bold md:text-4xl"
            >
              Portfolio Analytics Dashboard
            </h2>

            <p className="mt-3 max-w-2xl text-sm text-gray-400 md:text-base">
              Track portfolio visitors, devices, referral sources, section
              engagement, and page performance.
            </p>
          </div>

          <button
            type="button"
            onClick={loadAnalytics}
            disabled={loading}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh Analytics'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {/* Main Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Events"
            value={data.performance.totalEvents}
            description="Tracked portfolio events"
          />

          <StatCard
            title="Unique Visitors"
            value={data.visitors.unique}
            description="Estimated unique sessions"
          />

          <StatCard
            title="Total Visits"
            value={data.visitors.total}
            description="Recorded page events"
          />

          <StatCard
            title="Avg. Load Time"
            value={`${data.performance.averageLoadTime} ms`}
            description="Page performance"
          />
        </div>

        {/* Device Breakdown + Referrals */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Device Breakdown */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-semibold">
              Device Breakdown
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Visitors by device type
            </p>

            <div className="mt-6 space-y-5">
              <DeviceRow
                label="Desktop"
                value={data.devices.desktop}
                percentage={getPercentage(
                  data.devices.desktop,
                  totalDevices
                )}
              />

              <DeviceRow
                label="Mobile"
                value={data.devices.mobile}
                percentage={getPercentage(
                  data.devices.mobile,
                  totalDevices
                )}
              />

              <DeviceRow
                label="Tablet"
                value={data.devices.tablet}
                percentage={getPercentage(
                  data.devices.tablet,
                  totalDevices
                )}
              />
            </div>
          </div>

          {/* Referral Sources */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-semibold">
              Referral Sources
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Where portfolio traffic comes from
            </p>

            <div className="mt-6 space-y-4">
              {data.referrals.length > 0 ? (
                data.referrals.map((item) => (
                  <div
                    key={item.source}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4"
                  >
                    <span className="text-sm text-gray-300">
                      {item.source}
                    </span>

                    <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-semibold">
                      {item.visits}
                    </span>
                  </div>
                ))
              ) : (
                <EmptyState text="No referral data yet." />
              )}
            </div>
          </div>
        </div>

        {/* Countries + Sections */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Countries */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-semibold">
              Traffic by Country
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Geographic visitor activity
            </p>

            <div className="mt-6 space-y-4">
              {data.countries.length > 0 ? (
                data.countries.map((item) => (
                  <div
                    key={item.country}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-300">
                      {item.country}
                    </span>

                    <span className="text-sm font-semibold">
                      {item.visits}
                    </span>
                  </div>
                ))
              ) : (
                <EmptyState text="No country data yet." />
              )}
            </div>
          </div>

          {/* Popular Sections */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-semibold">
              Section Engagement
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Most viewed portfolio sections
            </p>

            <div className="mt-6 space-y-4">
              {data.sections.length > 0 ? (
                data.sections.map((item) => (
                  <div key={item.section}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-gray-300">
                        {item.section}
                      </span>

                      <span className="text-sm font-semibold">
                        {item.views}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-purple-500 transition-all"
                        style={{
                          width: `${Math.min(
                            item.views * 10,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState text="No section engagement data yet." />
              )}
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-semibold">
            Page Performance
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Portfolio performance measurements
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <PerformanceCard
              label="Average Load Time"
              value={`${data.performance.averageLoadTime} ms`}
            />

            <PerformanceCard
              label="Average Page Load"
              value={`${data.performance.averagePageLoadTime} ms`}
            />

            <PerformanceCard
              label="Tracked Events"
              value={data.performance.totalEvents}
            />
          </div>
        </div>

        {/* Development Notice */}
        <div className="mt-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-yellow-300">
          <strong>Development analytics:</strong> current analytics data is
          stored in the API&apos;s in-memory store. It will reset when the
          server restarts. For production, connect this dashboard to Vercel
          Analytics or a persistent analytics database.
        </div>
      </div>
    </section>
  )
}

function StatCard({
  title,
  value,
  description,
}: {
  title: string
  value: string | number
  description: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-gray-400">{title}</p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-xs text-gray-500">
        {description}
      </p>
    </div>
  )
}

function DeviceRow({
  label,
  value,
  percentage,
}: {
  label: string
  value: number
  percentage: number
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-gray-300">
          {label}
        </span>

        <span className="text-sm text-gray-400">
          {value} ({percentage}%)
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-purple-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function PerformanceCard({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/10 p-5">
      <p className="text-sm text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 p-5 text-center text-sm text-gray-500">
      {text}
    </div>
  )
}