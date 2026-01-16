'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'

const Header = dynamic(() => import('../components/Header'), { ssr: false })

const frictionPoints = [
  'Choosing herbs without knowing your body constitution is guesswork.',
  'The same herb can help one person and cause discomfort in another.',
  'You need a stable reference—your constitution—before matching herbs.'
]

const constitutionReasons = [
  'Body constitution reflects long-term patterns, not temporary symptoms.',
  'It explains why people respond differently to the same herbs.',
  'Matching herbs to constitution improves clarity and keeps choices grounded.'
]

const flowSteps = [
  { title: 'Step 1', copy: 'Take a short body constitution test' },
  { title: 'Step 2', copy: 'Understand your constitution type and tendencies' },
  { title: 'Step 3', copy: 'Explore herbs that fit — and avoid those that don’t' }
]

const featuredHerbs = [
  {
    name: 'Ashwagandha',
    constitution: 'Best for Yang-deficient bodies',
    description: 'Supports gentle energy when matched to softer constitutions.'
  },
  {
    name: 'Turmeric',
    constitution: 'Best for Damp-heat clearing constitution types',
    description: 'Pairs well with people who handle warming, detoxifying flavors.'
  }
]

const blogHighlights = [
  { title: 'How Body Types Shape Herb Choices', href: '/blog/how-body-types-affect-herbal-choices' },
  { title: 'Why Matching Matters More Than Dosage', href: '/blog/why-matching-matters' }
]

export default function HomeClient() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-900">
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-white">
          <div className="max-w-6xl mx-auto px-4 py-20 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-green-700 mb-4">Decision entry point</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Find the Herbs That Actually Fit Your Body
            </h1>
            <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
              Not all herbs work the same for everyone. Your body type determines what helps — and what harms.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link
                href="/constitution-test"
                className="inline-flex items-center gap-3 px-10 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-xl transition hover:bg-green-700"
              >
                <span aria-hidden>🧪</span>
                <span>Take the Free Body Constitution Test</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-gray-600">Free · Takes 2–3 minutes</p>
              <Link href="/herb-finder" className="text-sm text-green-700 underline-offset-4 underline">
                Browse Herbs by Purpose
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Decision friction</h2>
            <p className="text-gray-700 mb-6">
              Choosing herbs without considering body constitution is guesswork. The same herb can help one person and cause discomfort in another.
            </p>
            <div className="grid gap-5 md:grid-cols-3">
              {frictionPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-800">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Why Body Constitution Matters More Than Symptoms</h2>
            <ul className="space-y-4 text-gray-700">
              {constitutionReasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-600"></span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/constitution-test" className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 underline">
                Take the Free Body Constitution Test
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 border-b border-gray-100 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">The Path to a Confident Herb Choice</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {flowSteps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-800">
                  <p className="text-xs uppercase tracking-[0.4em] text-green-600">{step.title}</p>
                  <p className="mt-4 text-lg font-medium">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold text-gray-900">Popular Herbs — When Matched Correctly</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredHerbs.map((herb) => (
                <div key={herb.name} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">Best for specific constitution types</p>
                  <h3 className="text-2xl font-semibold text-gray-900">{herb.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{herb.constitution}</p>
                  <p className="mt-3 text-gray-700">{herb.description}</p>
                  <div className="mt-6">
                    <Link
                      href="/herb-finder"
                      className="text-sm font-semibold text-green-700 underline"
                    >
                      See if this fits your constitution
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Learn How Body Types Affect Herbal Choices</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {blogHighlights.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-2xl border border-gray-200 p-5 text-gray-700 transition hover:border-green-500"
                >
                  <p className="text-sm text-green-600 uppercase tracking-[0.4em] mb-3">Educational</p>
                  <p className="text-xl font-semibold">{item.title}</p>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-500">
              Educational content only — not a substitute for medical advice.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
