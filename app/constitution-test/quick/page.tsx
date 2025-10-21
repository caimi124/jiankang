import { Metadata } from 'next'
import QuickTestClient from './QuickTestClient'

export const metadata: Metadata = {
  title: 'Quick Constitution Test (2 min) | Find Your TCM Body Type | HerbScience',
  description: 'Take our 2-minute TCM constitution test to discover your body type and get personalized herb recommendations. Perfect for busy professionals seeking natural health solutions.',
  keywords: 'quick constitution test, TCM body type, Chinese medicine quiz, personalized herbs, 2 minute health test',
  openGraph: {
    title: 'Quick Constitution Test - Discover Your TCM Body Type in 2 Minutes',
    description: 'Get instant personalized herb recommendations based on Traditional Chinese Medicine principles.',
    type: 'website',
  }
}

export default function QuickTestPage() {
  return (
    <main>
      {/* SEO优化的头部 */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            2-Minute Constitution Test
          </h1>
          <p className="text-xl text-green-50 mb-2">
            Discover your TCM body type and get personalized herb recommendations
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <span className="text-2xl mr-2">⚡</span>
              <span>Only 10 Questions</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌿</span>
              <span>Free Herb Guide</span>
            </div>
          </div>
        </div>
      </div>

      <QuickTestClient />
    </main>
  )
}
