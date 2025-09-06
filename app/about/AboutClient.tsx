'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { Users, Award, Globe, Heart, CheckCircle, BookOpen, Mail, MessageCircle, Clock, MapPin, Phone, Send, AlertTriangle } from 'lucide-react'

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

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bridging Ancient Wisdom with Modern Science
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We&apos;re on a mission to make herbal supplements accessible, understandable, and safe for everyone. 
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
                to understand what they&apos;re putting in their body and why, without needing a medical degree to make 
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
