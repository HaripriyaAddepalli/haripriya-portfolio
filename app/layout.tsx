import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DarkModeToggle from '@/components/DarkModeToggle'
import Providers from '@/components/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Haripriya Addepalli - AI & Full Stack Engineer',
  description:
    'Full-stack AI engineer | Next.js | React | Python | TensorFlow | LLMs | System Design',
  keywords: [
    'AI Engineer',
    'Full Stack Developer',
    'Machine Learning',
    'Next.js',
    'React',
    'Python',
    'System Design',
  ],
  authors: [{ name: 'Haripriya Addepalli' }],
  creator: 'Haripriya Addepalli',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-lime-sigma-56.vercel.app',
    title: 'Haripriya Addepalli - AI & Full Stack Engineer',
    description:
      'Portfolio showcasing AI/ML projects, system design expertise, and full-stack development skills',
    siteName: 'Haripriya Addepalli Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haripriya Addepalli - AI & Full Stack Engineer',
    description: 'Explore my projects, skills, and experience',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white overflow-x-hidden">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <DarkModeToggle />
        </Providers>
      </body>
    </html>
  )
}