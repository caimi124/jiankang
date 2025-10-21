import { Metadata } from 'next'
import QuizLandingClient from './QuizLandingClient'

// SEO优化 - 推广着陆页
export const metadata: Metadata = {
  title: '2-Minute Health Quiz - Find Your Perfect Herbs | HerbScience',
  description: 'Take our free 2-minute quiz to discover which herbs work best for YOUR body type. Join 12,000+ people who found their perfect herbs.',
  keywords: 'health quiz, herb quiz, body type test, TCM quiz, herbal medicine quiz, personalized herbs',
  openGraph: {
    title: '2-Minute Health Quiz - Find Your Perfect Herbs',
    description: 'Free quiz reveals which herbs work best for your unique body type',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function QuizLandingPage() {
  return <QuizLandingClient />
}

