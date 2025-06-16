import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { Shield, Lock, Eye, Database, UserCheck, Calendar } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <Database className="w-6 h-6" />,
      content: `We collect information you provide directly to us, such as when you create an account, use our tools, or contact us. This includes:
      • Personal Information: Name, email address, phone number
      • Health Information: Symptoms, health conditions (anonymized for analysis)
      • Usage Data: How you interact with our platform and tools
      • Technical Data: IP address, browser type, device information`
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: <UserCheck className="w-6 h-6" />,
      content: `We use your information to:
      • Provide personalized herb recommendations and safety information
      • Improve our AI analysis and constitution assessment tools
      • Send you important safety alerts and health updates
      • Respond to your questions and provide customer support
      • Ensure platform security and prevent fraud
      • Comply with legal obligations and regulatory requirements`
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: <Eye className="w-6 h-6" />,
      content: `We do not sell your personal information. We may share information in these limited circumstances:
      • With your consent for specific services
      • With healthcare providers (only with your explicit permission)
      • With service providers who help us operate our platform
      • To comply with legal obligations or protect rights and safety
      • In anonymized, aggregated form for research purposes`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Lock className="w-6 h-6" />,
      content: `We implement comprehensive security measures:
      • End-to-end encryption for sensitive health data
      • Regular security audits and penetration testing
      • HIPAA-compliant data handling procedures
      • Secure cloud infrastructure with backup systems
      • Limited access controls and employee training
      • Incident response and breach notification procedures`
    },
    {
      id: 'your-rights',
      title: 'Your Rights and Choices',
      icon: <Shield className="w-6 h-6" />,
      content: `You have the right to:
      • Access, update, or delete your personal information
      • Opt out of marketing communications
      • Request a copy of your data (data portability)
      • Withdraw consent for data processing
      • Lodge a complaint with supervisory authorities
      • Request restriction of processing in certain circumstances`
    },
    {
      id: 'retention',
      title: 'Data Retention',
      icon: <Calendar className="w-6 h-6" />,
      content: `We retain your information only as long as necessary:
      • Account data: Until you delete your account or 3 years of inactivity
      • Health assessments: 7 years for medical records compliance
      • Usage analytics: 2 years for service improvement
      • Marketing preferences: Until you opt out
      • Legal compliance data: As required by applicable laws`
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy', href: '/privacy' }
            ]} 
          />

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is fundamental to our mission. Learn how we protect your personal and health information.
            </p>
            <div className="text-sm text-gray-500 mt-4">
              Last updated: January 15, 2024 • Effective: January 15, 2024
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At HerbScience.shop, we understand that your health information is deeply personal. This Privacy Policy explains 
              how we collect, use, protect, and share your information when you use our herbal supplement guidance platform.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to transparency and give you control over your data. This policy complies with the General Data 
              Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other applicable privacy laws.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <p className="text-green-800 text-sm font-medium">
                🔒 Key Principle: We never sell your personal information and only use your health data to provide you with 
                safer, more personalized herbal guidance.
              </p>
            </div>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={section.id} id={section.id} className="bg-white rounded-3xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <div className="text-blue-600">
                      {section.icon}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 mt-12 text-white">
            <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
            <p className="text-blue-100 mb-6">
              Our Data Protection Officer is available to answer any questions about how we handle your information.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-blue-100">privacy@herbscience.shop</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Mail</h3>
                <p className="text-blue-100">Data Protection Officer<br />HerbScience.shop<br />123 Health Innovation Drive<br />San Francisco, CA 94105</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-blue-100">Within 30 days of receipt<br />(or as required by law)</p>
              </div>
            </div>
          </div>

          {/* International Users */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are accessing our services from outside the United States, please note that your information may be 
              transferred to, stored, and processed in the United States where our servers are located and our central 
              database is operated.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We have implemented appropriate safeguards to protect your personal information, including Standard Contractual 
              Clauses approved by the European Commission for transfers to third countries.
            </p>
          </div>

          {/* Changes to Policy */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-8">
            <h3 className="font-bold text-yellow-800 mb-2">Updates to This Policy</h3>
            <p className="text-yellow-700 text-sm">
              We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. 
              We will notify you of material changes via email or prominent notice on our website at least 30 days before 
              the changes take effect.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 