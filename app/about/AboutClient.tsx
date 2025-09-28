'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { 
  Users, Award, Globe, Heart, CheckCircle, BookOpen, Mail, MessageCircle, 
  Clock, MapPin, Phone, Send, AlertTriangle, Shield, GraduationCap, 
  FileCheck, Stethoscope, Brain, Target, TrendingUp, UserCheck, 
  Building2, Calendar, Star, Zap, AlertCircle, ThumbsUp
} from 'lucide-react'

export default function AboutClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', category: 'general', message: '' })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about' }
            ]} 
          />

          {/* Hero Section - Desktop Version (Full) */}
          <div className="text-center mb-16 hidden md:block">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
                <Shield className="w-5 h-5 mr-2" />
                Licensed Pharmacist & TCM Expert
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Trusted Source for Evidence-Based Herbal Medicine
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              <strong>Confused by conflicting herbal supplement advice online?</strong> You&apos;re not alone. With so much misinformation about herbs, 
              finding reliable, <strong>science-backed herbal guidance</strong> is nearly impossible. That&apos;s why we created 
              <strong>HerbScience</strong>—to deliver <strong>safe, professional herbal medicine advice</strong> you can trust.
            </p>
            <div className="mt-6 max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Start your personalized herbal journey with our <Link href="/constitution-test" className="text-green-600 hover:text-green-700 font-semibold underline">TCM Body Constitution Test</Link> or explore our comprehensive <Link href="/herb-finder" className="text-green-600 hover:text-green-700 font-semibold underline">Herbal Database</Link> for <strong>evidence-based herbal medicine</strong> information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/constitution-test"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Take Our TCM Constitution Test
                </Link>
                <Link 
                  href="/herb-finder"
                  className="inline-flex items-center border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Browse Herb Database
                </Link>
              </div>
            </div>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Licensed Professional
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                University Graduate
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Evidence-Based
              </div>
            </div>
          </div>

          {/* Mobile Hero Section - Simplified */}
          <div className="text-center mb-12 md:hidden">
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Shield className="w-4 h-4 mr-2" />
                Licensed Pharmacist & TCM Expert
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              🌿 HerbScience – Evidence-Based Herbal Guidance
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              Confused by conflicting <strong>herbal advice</strong> online? <strong>HerbScience</strong> provides 
              <strong>safe, professional guidance</strong> from licensed experts trained in both pharmacy and Traditional Chinese Medicine. 
              Take our <Link href="/constitution-test" className="text-green-600 hover:text-green-700 font-medium underline">constitution test</Link> to get started.
            </p>
          </div>

          {/* Expert Profile - Desktop Version */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-12 mb-16 hidden md:block">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/about/zeng-chuping-profile.jpg"
                    alt="Zeng Chuping, Licensed Pharmacist and Certified TCM Dispenser specializing in evidence-based herbal medicine and herb-drug interaction safety"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Your Expert: Zeng Chuping</h2>
                <p className="text-lg text-gray-600"><strong>Licensed Pharmacist & Certified TCM Dispenser</strong></p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Professional Credentials */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <GraduationCap className="w-8 h-8 text-green-600 mr-3" />
                    <h4 className="text-xl font-bold text-gray-900">Professional Credentials</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <FileCheck className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Licensed Pharmacist</p>
                        <p className="text-sm text-gray-600">China Food and Drug Administration</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Certified TCM Dispenser</p>
                        <p className="text-sm text-gray-600">Traditional Chinese Medicine Board</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Building2 className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Bachelor of Pharmacy</p>
                        <p className="text-sm text-gray-600">Southern Medical University, Guangzhou</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expertise Areas */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <Brain className="w-8 h-8 text-blue-600 mr-3" />
                    <h4 className="text-xl font-bold text-gray-900">Areas of Expertise</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">
                        Pharmacology & <Link href="/blog" className="text-green-600 hover:text-green-700 underline">Herb-Drug Interaction Safety</Link>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">
                        <Link href="/constitution-test" className="text-green-600 hover:text-green-700 underline">Traditional Chinese Medicine & Body Constitution</Link>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">
                        <Link href="/blog" className="text-green-600 hover:text-green-700 underline">Herbal Medicine Safety Assessment</Link>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">
                        <Link href="/herb-finder" className="text-green-600 hover:text-green-700 underline">Evidence-Based Natural Health Support</Link>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Patient Safety & Risk Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">
                        <Link href="/herb-finder" className="text-green-600 hover:text-green-700 underline">Herbal Quality & Purity Analysis</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Mission */}
              <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg">
                <blockquote className="text-lg text-gray-700 italic text-center leading-relaxed">
                  &ldquo;My mission is to bridge the gap between traditional herbal wisdom and modern pharmaceutical science. 
                  Too many people suffer from unreliable online advice or dangerous herb-drug interactions. 
                  With my dual training in pharmacy and TCM, I provide the <strong>evidence-based herbal guidance</strong> you deserve.&rdquo;
                </blockquote>
                <div className="text-center mt-4">
                  <cite className="text-green-600 font-semibold">— Zeng Chuping, Licensed Pharmacist & TCM Expert</cite>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Expert Profile - Simplified */}
          <div className="bg-white rounded-2xl p-6 mb-12 shadow-lg md:hidden">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden shadow-lg border-2 border-green-100">
                <Image
                  src="/images/about/zeng-chuping-profile.jpg"
                  alt="Zeng Chuping, Licensed Pharmacist and Certified TCM Expert providing safe herbal supplement advice"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Meet Zeng Chuping</h2>
              <p className="text-gray-600">Licensed Pharmacist & Certified TCM Dispenser with expertise in pharmacology, <strong>herb-drug interactions</strong>, and <strong>herbal medicine safety</strong>.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Why Professional Guidance Matters:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">⚠</span>
                  <span>Avoid Dangerous Misinformation – risky social media advice</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2 mt-1">⚠</span>
                  <span>Prevent Herb-Drug Interactions – 40% of adults use herbs with prescriptions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">💰</span>
                  <span>Save Money & Time – stop wasting hundreds on ineffective supplements</span>
                </li>
              </ul>
            </div>
          </div>

          {/* User Pain Points Section - Desktop */}
          <div className="bg-white rounded-3xl shadow-xl p-12 mb-16 hidden md:block">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Professional Herbal Guidance Matters</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Pain Point 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">🚫 Dangerous Misinformation</h3>
                <p className="text-gray-600 mb-4">
                  Social media &ldquo;experts&rdquo; without medical training promote harmful &ldquo;miracle cures.&rdquo; 
                  Wrong dosages, risky herb combinations, and misleading claims can put your health at risk. 
                  That&apos;s why we provide <Link href="/blog" className="text-green-600 hover:text-green-700 underline font-semibold">evidence-based herbal medicine</Link> guidance.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">
                    <strong>Fact:</strong> Over <strong>50,000 ER visits annually in the US</strong> are linked to supplements.
                  </p>
                </div>
              </div>

              {/* Pain Point 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Stethoscope className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Drug Interaction Risks</h3>
                <p className="text-gray-600 mb-4">
                  Doctors often overlook <strong>herb-drug interactions</strong>. Without proper screening, 
                  combining herbs with prescription medications can cause severe complications. 
                  Our <Link href="/herb-finder" className="text-green-600 hover:text-green-700 underline font-semibold">herb database</Link> includes comprehensive safety information for each herb.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Fact:</strong> Nearly <strong>40% of adults</strong> use herbs alongside prescription drugs.
                  </p>
                </div>
              </div>

              {/* Pain Point 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">💸 Wasted Money & Time</h3>
                <p className="text-gray-600 mb-4">
                  Without professional advice, people spend hundreds of dollars on the wrong herbs, brands, 
                  or dosages—with little or no results. Start with our <Link href="/constitution-test" className="text-green-600 hover:text-green-700 underline font-semibold">constitution test</Link> to find herbs that match your body type.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Average Loss:</strong> $300–500 wasted annually on ineffective supplements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution - Desktop Version */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 mb-16 text-white hidden md:block">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The HerbScience Difference</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Licensed Professional</h3>
                <p className="text-white/80 text-sm">real credentials, not online certificates</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Evidence-Based Herbal Medicine</h3>
                <p className="text-white/80 text-sm">built on research, not anecdotes</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Safety First</h3>
                <p className="text-white/80 text-sm">comprehensive <Link href="/blog" className="text-white hover:text-green-100 underline">herbal safety checks</Link> and drug interaction reviews</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Proven Results</h3>
                <p className="text-white/80 text-sm">thousands worldwide guided safely and effectively</p>
              </div>
            </div>
          </div>

          {/* Mobile Promise Section */}
          <div className="bg-green-50 rounded-2xl p-6 mb-12 md:hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Our Promise:</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span><strong>Licensed & Experienced Professionals</strong></span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span><strong>Evidence-Based Recommendations</strong></span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span><strong>Safety First with Drug Interaction Screening</strong></span>
              </li>
            </ul>
          </div>

          {/* Trust Indicators - Desktop */}
          <div className="bg-gray-50 rounded-3xl p-12 mb-16 hidden md:block">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands Worldwide</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
                <p className="text-gray-900 font-semibold mb-2">People Helped</p>
                <p className="text-gray-600 text-sm">safe, professional herbal guidance delivered globally</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <p className="text-gray-900 font-semibold mb-2">Safety Success Rate</p>
                <p className="text-gray-600 text-sm">users report no adverse reactions when following our guidance</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
                <p className="text-gray-900 font-semibold mb-2">Years Experience</p>
                <p className="text-gray-600 text-sm">in both pharmacy and Traditional Chinese Medicine</p>
              </div>
            </div>
          </div>

          {/* Mobile Trust Section */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-12 md:hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
            <p className="text-gray-600 mb-4">50,000+ people helped worldwide, 98% safety success rate, 15+ years of combined experience in pharmacy and TCM.</p>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Have questions? Need <strong>safe herbal supplement advice</strong>? Contact us via email or visit our office in San Francisco. 
                Read our <Link href="/blog" className="text-green-600 hover:text-green-700 underline">blog</Link> for more <strong>evidence-based herbal medicine</strong> tips.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-xs text-red-800">
                  <strong>Medical Emergency:</strong> Call 911 immediately for severe reactions.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-16" id="contact">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions about herbs, need <strong>safe herbal supplement advice</strong>, or want to share feedback? 
                Our expert team is here to support your natural health journey. Check out our <Link href="/blog" className="text-green-600 hover:text-green-700 underline font-semibold">latest articles</Link> on herbal safety and effectiveness.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-600">Thank you for contacting us. We&apos;ll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Please provide details about your question or concern..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Office Info */}
              <div className="space-y-8">
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Office</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Headquarters</p>
                        <p className="text-gray-600">123 Health Innovation Drive<br />San Francisco, CA 94105</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Business Hours</p>
                        <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />Saturday: 10:00 AM - 2:00 PM (PST)<br />Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Notice */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-red-900 mb-2">🚨 Medical Emergency</h4>
                      <p className="text-red-800 text-sm">
                        If you&apos;re experiencing a medical emergency or severe adverse reaction to any supplement, 
                        please call 911 or go to your nearest emergency room immediately. Do not wait for our response.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Resources Footer */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Explore Our Resources</h3>
            <p className="text-gray-600 mb-6">
              Discover more about <strong>evidence-based herbal medicine</strong> and <strong>safe herbal supplement advice</strong> through our comprehensive resources.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/blog" 
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-sm border border-green-200"
              >
                📚 Herbal Medicine Blog
              </Link>
              <Link 
                href="/constitution-test" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-sm border border-blue-200"
              >
                🧠 Constitution Test
              </Link>
              <Link 
                href="/herb-finder" 
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors shadow-sm border border-purple-200"
              >
                🔍 Herbal Database
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
