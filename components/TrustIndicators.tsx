'use client'

import { Shield, Award, Users, BookOpen, Clock, CheckCircle } from 'lucide-react'

export default function TrustIndicators() {
  const trustBadges = [
    {
      icon: '🏆',
      title: 'Evidence-Based',
      description: 'All recommendations backed by peer-reviewed research',
      stats: '2,000+ Studies Referenced'
    },
    {
      icon: '👨‍⚕️',
      title: 'Expert Reviewed',
      description: 'Content reviewed by licensed healthcare professionals',
      stats: '15+ Medical Experts'
    },
    {
      icon: '🔐',
      title: 'Data Security',
      description: 'Your health information is encrypted and secure',
      stats: 'HIPAA Compliant'
    },
    {
      icon: '🌍',
      title: 'Global Standards',
      description: 'Follows international safety and quality guidelines',
      stats: 'WHO Guidelines'
    }
  ]

  const certifications = [
    {
      name: 'FDA Registered',
      logo: '🏛️',
      description: 'Facility Registration'
    },
    {
      name: 'GMP Certified',
      logo: '✅',
      description: 'Good Manufacturing Practice'
    },
    {
      name: 'Third-Party Tested',
      logo: '🔬',
      description: 'Independent Lab Verification'
    },
    {
      name: 'Organic Certified',
      logo: '🌱',
      description: 'USDA Organic Standards'
    }
  ]

  const stats = [
    { number: '50,000+', label: 'Users Helped', icon: '👥' },
    { number: '500+', label: 'Herbs Analyzed', icon: '🌿' },
    { number: '2,000+', label: 'Research Papers', icon: '📚' },
    { number: '98%', label: 'User Satisfaction', icon: '⭐' }
  ]

  const endorsements = [
    {
      quote: "HerbScience.shop provides the most comprehensive and reliable herbal information I've found online.",
      author: "Dr. Sarah Chen",
      role: "Integrative Medicine Physician",
      credentials: "MD, UCLA Medical Center"
    },
    {
      quote: "Finally, a resource that bridges traditional knowledge with modern scientific evidence.",
      author: "Prof. Michael Rodriguez",
      role: "Pharmacognosy Expert",
      credentials: "PhD, Columbia University"
    },
    {
      quote: "The safety database has prevented numerous potential herb-drug interactions in my practice.",
      author: "Dr. Jennifer Liu",
      role: "Clinical Pharmacist",
      credentials: "PharmD, Mayo Clinic"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Trust HerbScience.shop?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re committed to providing accurate, science-based information to help you make informed decisions about herbal supplements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustBadges.map((badge, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                <span className="text-3xl">{badge.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{badge.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{badge.description}</p>
              <p className="text-green-600 font-medium text-sm">{badge.stats}</p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</div>
                <div className="text-green-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Certifications & Standards</h3>
          <p className="text-gray-600 mb-8">
            We maintain the highest standards of quality and safety in everything we do.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
              <div className="text-4xl mb-3">{cert.logo}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{cert.name}</h4>
              <p className="text-gray-600 text-sm">{cert.description}</p>
            </div>
          ))}
        </div>

        {/* Safety Promise */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Safety Promise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <h4 className="font-semibold text-gray-900">Safety First</h4>
                <p className="text-gray-600 text-sm">We prioritize your safety with comprehensive interaction checking</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📋</span>
              <div>
                <h4 className="font-semibold text-gray-900">Transparent Information</h4>
                <p className="text-gray-600 text-sm">Full disclosure of potential risks and side effects</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">⚕️</span>
              <div>
                <h4 className="font-semibold text-gray-900">Medical Disclaimer</h4>
                <p className="text-gray-600 text-sm">Educational only - always consult healthcare professionals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Endorsements */}
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            What Healthcare Professionals Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {endorsements.map((endorsement, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="mb-4">
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">⭐</span>
                    ))}
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    &quot;{endorsement.quote}&quot;
                  </blockquote>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-900">{endorsement.author}</div>
                  <div className="text-sm text-gray-600">{endorsement.role}</div>
                  <div className="text-xs text-gray-500 mt-1">{endorsement.credentials}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="mt-16 bg-gray-900 text-white rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Your Privacy & Security</h3>
          <p className="text-gray-300 mb-6">
            We never share your personal health information. All searches and recommendations are completely private.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-sm">No Data Sharing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 