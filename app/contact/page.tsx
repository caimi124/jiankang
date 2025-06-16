'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { Mail, MessageCircle, Clock, MapPin, Phone, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
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
    // Handle form submission here
    setIsSubmitted(true)
    // Reset form after 3 seconds
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

  const faqCategories = [
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
              { label: 'Contact Us', href: '/contact' }
            ]} 
          />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about herbs, need safety advice, or want to share feedback? 
              Our expert team is here to help you on your herbal health journey.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
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
                      placeholder="Brief description of your question"
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
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Please provide as much detail as possible to help us assist you better..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Response Times & FAQ */}
            <div className="space-y-8">
              {/* Response Times */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Expected Response Times</h3>
                <div className="space-y-4">
                  {faqCategories.map((category, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-900">{category.category}</h4>
                      <p className="text-sm text-gray-600 mb-1">{category.description}</p>
                      <p className="text-xs text-green-600 font-medium">{category.responseTime}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Info */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Headquarters</p>
                      <p className="text-gray-600">123 Health Innovation Drive<br />San Francisco, CA 94105</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Business Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
                      Saturday: 10:00 AM - 2:00 PM (PST)<br />
                      Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h4 className="font-bold text-red-800 mb-2">🚨 Medical Emergency</h4>
                <p className="text-red-700 text-sm">
                  If you're experiencing a medical emergency or severe adverse reaction to any supplement, 
                  please call 911 or go to your nearest emergency room immediately. Do not wait for our response.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="mt-16 text-center">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Looking for Quick Answers?</h3>
              <p className="text-gray-600 mb-6">
                Check our comprehensive FAQ section for immediate answers to common questions about herbs, safety, and our platform.
              </p>
              <a href="/knowledge-center" className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                <span>Visit Knowledge Center</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 