'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle, AlertCircle, Gift, TrendingUp, BookOpen, Sparkles } from 'lucide-react'

export interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'sidebar' | 'modal';
  constitutionType?: string; // 如果有体质测试结果，可以个性化内容
  showBenefits?: boolean;
  className?: string;
}

export default function NewsletterSignup({ 
  variant = 'default',
  constitutionType,
  showBenefits = true,
  className = ''
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: 集成实际的邮件服务
      // 选项1: Mailchimp API
      // 选项2: SendGrid API
      // 选项3: ConvertKit API
      // 选项4: 自建API端点
      
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          constitutionType,
          source: 'website',
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setSubscribed(true);
      
      // 可选：Google Analytics事件追踪
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'newsletter_signup', {
          method: constitutionType || 'general'
        });
      }

    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Newsletter subscription error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 成功状态
  if (subscribed) {
    return (
      <div className={`bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center ${className}`}>
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Welcome to HerbScience!</h3>
        <p className="text-gray-700 mb-4">
          Check your email for a confirmation link and your welcome gift 🎁
        </p>
        {constitutionType && (
          <p className="text-sm text-gray-600">
            Your personalized {constitutionType} guide is on its way!
          </p>
        )}
      </div>
    );
  }

  // 简洁版（侧边栏/弹窗）
  if (variant === 'compact' || variant === 'sidebar') {
    return (
      <div className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Get Free Health Tips</h3>
            <p className="text-sm text-gray-600">Weekly herb guides & wellness advice</p>
          </div>
        </div>
        
        <form onSubmit={handleSubscribe} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
          >
            {loading ? 'Subscribing...' : 'Subscribe Free'}
          </button>
        </form>
        
        {error && (
          <div className="mt-3 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-3 text-center">
          🔒 Unsubscribe anytime. No spam.
        </p>
      </div>
    );
  }

  // 完整版（首页/结果页）
  return (
    <div className={`bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-lg overflow-hidden ${className}`}>
      <div className="md:flex">
        {/* 左侧：价值主张 */}
        {showBenefits && (
          <div className="md:w-1/2 bg-green-600 text-white p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8" />
              <h3 className="text-2xl md:text-3xl font-bold">
                Join 50,000+ Health Enthusiasts
              </h3>
            </div>
            
            <p className="text-green-100 mb-8 text-lg">
              Get personalized herb guides, wellness tips, and exclusive content delivered to your inbox every week.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">FREE Welcome Gift</h4>
                  <p className="text-sm text-green-100">
                    {constitutionType 
                      ? `Personalized ${constitutionType} Health Guide + Recipe Book`
                      : 'TCM Body Type Guide + 20 Herbal Recipes'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Weekly Expert Content</h4>
                  <p className="text-sm text-green-100">
                    Herb spotlights, dosage guides, safety tips, and latest research
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Exclusive Deals</h4>
                  <p className="text-sm text-green-100">
                    Partner discounts on premium herb supplements (20-30% off)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-green-500">
              <p className="text-sm text-green-200 italic">
                "The weekly emails are packed with actionable tips. I've learned more about herbs in 3 months than in years of Googling!" - Sarah M., 54
              </p>
            </div>
          </div>
        )}

        {/* 右侧：表单 */}
        <div className={`${showBenefits ? 'md:w-1/2' : 'w-full'} p-8 md:p-12 bg-white`}>
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Get Started Today
            </h3>
            <p className="text-gray-600 mb-8">
              Subscribe now and receive your personalized welcome guide instantly
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {constitutionType && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>📋 Your Constitution:</strong> {constitutionType}
                    <br />
                    <span className="text-xs text-gray-600">
                      You'll receive content tailored to your body type
                    </span>
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5" />
                    Subscribe Free
                  </span>
                )}
              </button>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <p className="text-xs text-gray-500 text-center">
                🔒 We respect your privacy. Unsubscribe anytime with one click.
                <br />
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>

            {/* 社交证明 */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  50,000+ subscribers
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  4.8/5 rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🎁 弹出式Newsletter（可用于Exit Intent）
export function NewsletterPopup({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Wait! Before You Go... 🎁
            </h2>
            <p className="text-gray-600">
              Get your FREE Personalized Herb Guide + 20% off your first supplement purchase
            </p>
          </div>
          
          <NewsletterSignup variant="compact" showBenefits={false} />
        </div>
      </div>
    </div>
  );
}

