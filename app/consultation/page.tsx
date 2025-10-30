import { Metadata } from 'next'
import React from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Expert TCM Consultation | HerbScience',
  description: 'Book a consultation with our qualified Traditional Chinese Medicine practitioners. Get personalized guidance based on your constitution test results.',
  keywords: 'TCM consultation, Chinese medicine practitioner, constitution consultation, herbal medicine expert, personalized health guidance',
}

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Expert Consultation' }
          ]}
        />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Expert Consultation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized guidance from qualified Traditional Chinese Medicine practitioners
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-6">🩺</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Consultation Service Coming Soon
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're working on connecting you with qualified TCM practitioners who can provide
            personalized consultations based on your constitution test results. This service will be
            available soon.
          </p>

          <div className="space-y-4 max-w-md mx-auto">
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">What to Expect:</h3>
              <ul className="text-sm text-green-800 space-y-1 text-left">
                <li>• Detailed constitution analysis review</li>
                <li>• Personalized herbal recommendations</li>
                <li>• Lifestyle and dietary guidance</li>
                <li>• Follow-up support and monitoring</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <a
                href="/constitution-test"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Take Constitution Test
              </a>
              <a
                href="/herb-finder"
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-colors"
              >
                Explore Herbs
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}