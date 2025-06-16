import { Shield, Award, Users, BookOpen, Clock, CheckCircle } from 'lucide-react'

export default function TrustIndicators() {
  const certifications = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Medical Review Board",
      description: "Content reviewed by licensed healthcare professionals",
      badge: "MD Reviewed"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Research-Based",
      description: "All recommendations backed by peer-reviewed studies",
      badge: "Evidence-Based"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Safety Verified",
      description: "Comprehensive safety checks and interaction warnings",
      badge: "Safety First"
    }
  ]

  const stats = [
    { number: "50,000+", label: "Trusted Users", icon: <Users className="w-6 h-6" /> },
    { number: "500+", label: "Herbs Analyzed", icon: <BookOpen className="w-6 h-6" /> },
    { number: "2,000+", label: "Research Citations", icon: <BookOpen className="w-6 h-6" /> },
    { number: "24/7", label: "Updated Database", icon: <Clock className="w-6 h-6" /> }
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Our commitment to accuracy, safety, and evidence-based recommendations
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
                <div className="text-green-600 mb-4 flex justify-center">
                  {cert.icon}
                </div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    {cert.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            By the Numbers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-green-600 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
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
                    "{endorsement.quote}"
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