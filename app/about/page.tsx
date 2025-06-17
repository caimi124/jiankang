'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { Users, Award, Globe, Heart, CheckCircle, BookOpen, Mail, MessageCircle, Clock, MapPin, Phone, Send, AlertTriangle } from 'lucide-react'

export default function AboutPage() {
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

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      credentials: "MD, PhD in Traditional Chinese Medicine",
      experience: "15+ years in integrative medicine",
      image: "👩‍⚕️",
      bio: "Dr. Chen bridges Eastern and Western medicine, specializing in herbal safety research and clinical applications."
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Head of Research",
      credentials: "PhD in Pharmacology, MS in Botany", 
      experience: "12+ years in pharmaceutical research",
      image: "👨‍🔬",
      bio: "Dr. Rodriguez leads our evidence-based approach, ensuring all recommendations are backed by rigorous scientific research."
    },
    {
      name: "Lisa Zhang",
      role: "Technology Director",
      credentials: "MS Computer Science, Certified Health IT",
      experience: "10+ years in health technology",
      image: "👩‍💻",
      bio: "Lisa oversees our platform development, ensuring user privacy and creating intuitive tools for health guidance."
    }
  ]

  const milestones = [
    { year: "2019", event: "Company founded with mission to demystify herbal supplements" },
    { year: "2020", event: "Launched first herb-drug interaction database" },
    { year: "2021", event: "Partnership with 3 major universities for research validation" },
    { year: "2022", event: "AI constitution analysis tool released" },
    { year: "2023", event: "Reached 100,000+ users worldwide" },
    { year: "2024", event: "Expanded safety database to 500+ herbs and 1000+ interactions" }
  ]

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "User-First Approach",
      description: "Every feature we build starts with understanding real user concerns and pain points around herbal supplements."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      title: "Evidence-Based Information",
      description: "All our recommendations are backed by peer-reviewed research, traditional wisdom, and clinical experience."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      title: "Safety First",
      description: "We prioritize user safety above all else, providing comprehensive interaction warnings and contraindications."
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      title: "Global Accessibility",
      description: "Making herbal health knowledge accessible to people worldwide, regardless of their background or location."
    }
  ]

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Get detailed answers to your questions",
      contact: "support@herbscience.shop",
      responseTime: "Within 24 hours"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Quick help for urgent questions",
      contact: "Available on website",
      responseTime: "Real-time during business hours"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      contact: "+1 (555) 123-4567",
      responseTime: "Mon-Fri, 9AM-6PM EST"
    }
  ]

  const responseTimesData = [
    {
      category: "Safety Questions",
      description: "Herb interactions, side effects, contraindications",
      responseTime: "Priority - within 4 hours"
    },
    {
      category: "Product Questions",
      description: "How to use our tools, technical support",
      responseTime: "Within 12 hours"
    },
    {
      category: "Medical Inquiries",
      description: "Complex health questions requiring expert review",
      responseTime: "Within 48 hours"
    },
    {
      category: "Partnership & Business",
      description: "Collaboration opportunities, media inquiries",
      responseTime: "Within 72 hours"
    }
  ]

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

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bridging Ancient Wisdom with Modern Science
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make herbal supplements accessible, understandable, and safe for everyone. 
              By combining traditional knowledge with cutting-edge research, we help people make informed decisions about their health.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To democratize access to safe, evidence-based herbal health information. We believe everyone deserves 
                to understand what they're putting in their body and why, without needing a medical degree to make 
                informed decisions.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                A world where herbal supplements are no longer mysterious or intimidating, but trusted tools for 
                wellness that complement modern healthcare. We envision informed consumers working alongside healthcare 
                providers to optimize their health naturally.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Expert Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-lg p-8 text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-2">{member.credentials}</p>
                  <p className="text-sm text-blue-600 mb-4">{member.experience}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Company Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">{milestone.year}</span>
                    </div>
                    <div className="pt-3">
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 mb-16 text-white">
            <h2 className="text-3xl font-bold text-center mb-12">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-green-100">Herbs in Database</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-green-100">Drug Interactions</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100K+</div>
                <div className="text-green-100">Users Helped</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-green-100">Research Partners</div>
              </div>
            </div>
          </div>

          {/* Certifications & Partnerships */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Certifications & Partnerships</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Medical Advisory Board</h3>
                <p className="text-gray-600 text-sm">Reviewed by licensed physicians and pharmacists</p>
              </div>
              <div>
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">University Partnerships</h3>
                <p className="text-gray-600 text-sm">Collaborative research with leading academic institutions</p>
              </div>
              <div>
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Privacy Certified</h3>
                <p className="text-gray-600 text-sm">HIPAA-compliant data handling and security</p>
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

            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-lg p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-green-600">
                      {method.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className="text-green-600 font-semibold mb-2">{method.contact}</p>
                  <p className="text-sm text-gray-500">{method.responseTime}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
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
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Question Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="general">General Question</option>
                        <option value="safety">Safety & Interactions</option>
                        <option value="technical">Technical Support</option>
                        <option value="medical">Medical Inquiry</option>
                        <option value="business">Business/Partnership</option>
                        <option value="feedback">Feedback & Suggestions</option>
                      </select>
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

              {/* Office Info & Response Times */}
              <div className="space-y-8">
                {/* Office Information */}
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

                {/* Response Times */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Expected Response Times</h3>
                  <div className="space-y-4">
                    {responseTimesData.map((item, index) => (
                      <div key={index} className="border-l-4 border-green-600 pl-4">
                        <h4 className="font-semibold text-gray-900">{item.category}</h4>
                        <p className="text-gray-600 text-sm mb-1">{item.description}</p>
                        <p className="text-green-600 font-medium text-sm">{item.responseTime}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Notice */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-red-900 mb-2">🚨 Medical Emergency</h4>
                      <p className="text-red-800 text-sm">
                        If you're experiencing a medical emergency or severe adverse reaction to any supplement, 
                        please call 911 or go to your nearest emergency room immediately. Do not wait for our response.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Questions About Our Mission?</h2>
            <p className="text-xl mb-8 text-green-100">
              We'd love to hear from you and discuss how we can better serve your herbal health needs.
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </main>
    </div>
  )
} 