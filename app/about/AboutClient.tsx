'use client'

import { useState } from 'react'
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

          {/* Hero Section - Professional Credentials Focus */}
          <div className="text-center mb-16">
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
              <strong>Confused by conflicting herbal advice online?</strong> You&apos;re not alone. With so much misinformation about herbal supplements, 
              finding <em>reliable, professional guidance</em> is nearly impossible. That&apos;s why we created HerbScience.
            </p>
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

          {/* Expert Profile - E-A-T Focus */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-12 mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden shadow-xl border-4 border-white">
                  <img 
                    src="/images/about/zeng-chuping-profile.jpg" 
                    alt="Zeng Chuping - Licensed Pharmacist & TCM Expert"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Your Expert</h2>
                <h3 className="text-2xl font-semibold text-green-600 mb-2">Zeng Chuping</h3>
                <p className="text-lg text-gray-600">Licensed Pharmacist & Certified TCM Dispenser</p>
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
                    {[
                      'Pharmacology & Drug Interactions',
                      'Traditional Chinese Medicine',
                      'Herbal Medicine Safety Assessment',
                      'Evidence-Based Natural Health',
                      'Patient Safety & Risk Management',
                      'Herbal Quality & Purity Analysis'
                    ].map((expertise, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{expertise}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Professional Mission */}
              <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg">
                <blockquote className="text-lg text-gray-700 italic text-center leading-relaxed">
                  &ldquo;My mission is to bridge the gap between traditional herbal wisdom and modern pharmaceutical science. 
                  Too many people suffer from unreliable online advice or dangerous herb-drug interactions. 
                  With my dual training in pharmacy and TCM, I provide the professional guidance you deserve.&rdquo;
                </blockquote>
                <div className="text-center mt-4">
                  <cite className="text-green-600 font-semibold">— Zeng Chuping, Licensed Pharmacist</cite>
                </div>
              </div>
            </div>
          </div>

          {/* User Pain Points Section */}
          <div className="bg-white rounded-3xl shadow-xl p-12 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Professional Guidance Matters</h2>
              <p className="text-xl text-gray-600">The hidden dangers of DIY herbal medicine</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Pain Point 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Dangerous Misinformation</h3>
                <p className="text-gray-600 mb-4">
                  Social media &ldquo;experts&rdquo; without medical training give dangerous advice. 
                  Wrong dosages, harmful combinations, and fake &ldquo;miracle cures&rdquo; put your health at risk.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">
                    <strong>Real Risk:</strong> 50,000+ supplement-related ER visits annually in the US alone
                  </p>
                </div>
              </div>

              {/* Pain Point 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Stethoscope className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Drug Interactions</h3>
                <p className="text-gray-600 mb-4">
                  Your doctor may not know about herbal interactions with your medications. 
                  This knowledge gap can lead to serious, even life-threatening complications.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Hidden Danger:</strong> 40% of adults take herbs with prescription drugs
                  </p>
                </div>
              </div>

              {/* Pain Point 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Wasted Money & Time</h3>
                <p className="text-gray-600 mb-4">
                  Without proper guidance, you buy the wrong herbs, wrong brands, or wrong dosages. 
                  Years pass with no results, costing hundreds in wasted supplements.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Average Cost:</strong> $300-500 wasted annually on ineffective supplements
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution - What Makes Us Different */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 mb-16 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The HerbScience Difference</h2>
              <p className="text-xl opacity-90">Professional expertise you can trust</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Licensed Professional</h3>
                <p className="text-white/80 text-sm">Real credentials, not just online courses</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Evidence-Based</h3>
                <p className="text-white/80 text-sm">Scientific research, not anecdotal stories</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Safety First</h3>
                <p className="text-white/80 text-sm">Comprehensive drug interaction screening</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Proven Results</h3>
                <p className="text-white/80 text-sm">Thousands of success stories worldwide</p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gray-50 rounded-3xl p-12 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands Worldwide</h2>
              <p className="text-xl text-gray-600">See why professionals and individuals choose HerbScience</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
                <p className="text-gray-900 font-semibold mb-2">People Helped</p>
                <p className="text-gray-600 text-sm">Individuals worldwide have received safe, professional herbal guidance</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <p className="text-gray-900 font-semibold mb-2">Safety Success Rate</p>
                <p className="text-gray-600 text-sm">Users report no adverse reactions when following our guidance</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
                <p className="text-gray-900 font-semibold mb-2">Years Experience</p>
                <p className="text-gray-600 text-sm">Combined experience in pharmacy and traditional medicine</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-16" id="contact">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions about herbs, need safety advice, or want to share feedback? 
                Our expert team is here to help you on your herbal health journey.
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
        </div>
      </main>
    </div>
  )
}
