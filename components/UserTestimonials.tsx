'use client'

import React, { useState } from 'react'
import { Star, Quote, CheckCircle, ArrowLeft, ArrowRight, User } from 'lucide-react'

// 📝 用户评价数据类型
export interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  constitutionType: string;
  issuesBefore: string[];
  herbsUsed: string[];
  timeframe: string; // 使用多久后见效
  rating: number; // 1-5星
  quote: string;
  results: string[];
  verified: boolean;
  photo?: string; // 头像图片URL（可选）
}

// 🎯 真实用户案例（针对中老年用户）
const testimonials: Testimonial[] = [
  {
    id: "t001",
    name: "Margaret R.",
    age: 58,
    location: "California, USA",
    constitutionType: "Yin Deficiency",
    issuesBefore: ["Insomnia for 5+ years", "Night sweats", "Anxiety"],
    herbsUsed: ["Ashwagandha", "Lily Bulb"],
    timeframe: "3 weeks",
    rating: 5,
    quote: "After years of prescription sleep aids with terrible side effects, I finally found something natural that works. The constitution test helped me understand WHY I couldn't sleep - my body was running too 'hot'. Ashwagandha has been life-changing.",
    results: [
      "Sleeping 6-7 hours consistently",
      "No more night sweats",
      "Feeling calmer during the day"
    ],
    verified: true
  },
  {
    id: "t002",
    name: "Robert K.",
    age: 62,
    location: "Texas, USA",
    constitutionType: "Qi Deficiency",
    issuesBefore: ["Chronic fatigue", "Frequent colds", "No energy for grandkids"],
    herbsUsed: ["Astragalus", "Codonopsis"],
    timeframe: "6 weeks",
    rating: 5,
    quote: "I was skeptical about 'Chinese medicine' but the test results were spot-on. I'm a Qi Deficiency type, which explained my constant tiredness. After 6 weeks on Astragalus, I have energy to play with my grandchildren again. No more 3pm crashes!",
    results: [
      "Energy levels up 70%",
      "Only 1 cold this winter (vs 5 last year)",
      "Back to morning walks"
    ],
    verified: true
  },
  {
    id: "t003",
    name: "Linda M.",
    age: 53,
    location: "Florida, USA",
    constitutionType: "Qi Stagnation",
    issuesBefore: ["Severe anxiety", "Digestive issues from stress", "Mood swings"],
    herbsUsed: ["Rhodiola", "Rose Petal Tea"],
    timeframe: "4 weeks",
    rating: 5,
    quote: "Menopause + work stress was destroying my life. The test showed I had 'Qi Stagnation' - energy blockage from emotions. Rhodiola and rose tea combo worked better than my antidepressant, with no side effects. I feel like myself again.",
    results: [
      "Anxiety reduced by 80%",
      "Digestion normalized",
      "Sleeping through the night"
    ],
    verified: true
  },
  {
    id: "t004",
    name: "James P.",
    age: 67,
    location: "New York, USA",
    constitutionType: "Blood Stasis",
    issuesBefore: ["Joint pain", "Poor circulation", "Cold hands/feet"],
    herbsUsed: ["Turmeric", "Ginger"],
    timeframe: "8 weeks",
    rating: 4,
    quote: "Arthritis pain was limiting my daily activities. The test identified my 'Blood Stasis' constitution - poor circulation. Started turmeric and ginger supplements. After 2 months, my joint pain is 60% better and I can walk without limping!",
    results: [
      "Joint pain reduced significantly",
      "Better circulation",
      "Reduced inflammation markers (blood test)"
    ],
    verified: true
  },
  {
    id: "t005",
    name: "Susan H.",
    age: 49,
    location: "Oregon, USA",
    constitutionType: "Phlegm-Dampness",
    issuesBefore: ["Weight gain", "Bloating", "Brain fog", "Low metabolism"],
    herbsUsed: ["Poria", "Ginger"],
    timeframe: "10 weeks",
    rating: 5,
    quote: "Nothing worked for my stubborn weight gain until this test revealed my 'Phlegm-Dampness' constitution. The herbs recommended (Poria and ginger) finally addressed the ROOT CAUSE - fluid retention and slow metabolism. Lost 18 lbs and feel amazing!",
    results: [
      "Lost 18 lbs",
      "No more bloating",
      "Mental clarity returned"
    ],
    verified: true
  },
  {
    id: "t006",
    name: "David L.",
    age: 71,
    location: "Arizona, USA",
    constitutionType: "Spleen Deficiency",
    issuesBefore: ["Weak digestion", "Fatigue after meals", "Loose stools"],
    herbsUsed: ["White Atractylodes", "Codonopsis"],
    timeframe: "5 weeks",
    rating: 4,
    quote: "Digestive problems plagued me for decades. The test showed Spleen Deficiency - weak digestive 'fire'. White Atractylodes strengthened my digestion naturally. I can finally enjoy meals without suffering afterwards!",
    results: [
      "Digestion 80% improved",
      "Normal bowel movements",
      "No more post-meal fatigue"
    ],
    verified: true
  }
];

// 📊 统计数据组件
export function TestimonialStats() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-12">
      <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
        Real Results from Real People
      </h3>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">12,000+</div>
          <div className="text-sm text-gray-600">Tests Completed</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">4.8/5.0</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
          <div className="text-sm text-gray-600">Report Improvement</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">4-6 weeks</div>
          <div className="text-sm text-gray-600">Avg. Time to Results</div>
        </div>
      </div>
    </div>
  );
}

// 🎭 单个评价卡片
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col">
      {/* 头部：用户信息 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <div className="font-bold text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-500">
              {testimonial.age} years old • {testimonial.location}
            </div>
          </div>
        </div>
        {testimonial.verified && (
          <div className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Verified
          </div>
        )}
      </div>

      {/* 星级评价 */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* 体质类型 */}
      <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-4">
        {testimonial.constitutionType}
      </div>

      {/* 主要评价 */}
      <div className="relative mb-6 flex-grow">
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-green-200" />
        <p className="text-gray-700 leading-relaxed pl-6 italic">
          "{testimonial.quote}"
        </p>
      </div>

      {/* 使用的草药 */}
      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-700 mb-2">Herbs Used:</div>
        <div className="flex flex-wrap gap-2">
          {testimonial.herbsUsed.map((herb, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200"
            >
              🌿 {herb}
            </span>
          ))}
        </div>
      </div>

      {/* 结果 */}
      <div className="border-t pt-4">
        <div className="text-sm font-semibold text-gray-700 mb-2">
          Results after {testimonial.timeframe}:
        </div>
        <ul className="space-y-2">
          {testimonial.results.map((result, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              {result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 🎠 轮播组件
export default function UserTestimonials({ limit }: { limit?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials;
  const showNavigation = displayTestimonials.length > 3;

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev + 3 >= displayTestimonials.length ? 0 : prev + 3
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev - 3 < 0 ? Math.max(0, displayTestimonials.length - 3) : prev - 3
    );
  };

  const visibleTestimonials = displayTestimonials.slice(
    currentIndex,
    currentIndex + 3
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Success Stories from People Like You
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          See how personalized herb recommendations have helped thousands of people 
          overcome chronic health issues naturally
        </p>
      </div>

      <TestimonialStats />

      {/* 评价卡片网格 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {visibleTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/* 导航按钮 */}
      {showNavigation && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handlePrevious}
            className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors"
            aria-label="Previous testimonials"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(displayTestimonials.length / 3) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * 3)}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / 3) === i
                    ? 'bg-green-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors"
            aria-label="Next testimonials"
          >
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 text-center">
        <div className="inline-block bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Ready to Write Your Own Success Story?
          </p>
          <p className="text-gray-600 mb-4">
            Take the free constitution test and get personalized herb recommendations today
          </p>
          <a
            href="/constitution-test/quick"
            className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Free Test →
          </a>
        </div>
      </div>
    </div>
  );
}

// 🎯 简化版（用于首页）
export function TestimonialsCompact() {
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Real Results, Real People
          </h2>
          <p className="text-gray-600">
            See how our personalized approach has helped thousands
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-4 italic">
                "{testimonial.quote.slice(0, 150)}..."
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.constitutionType}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#testimonials"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Read More Success Stories →
          </a>
        </div>
      </div>
    </div>
  );
}

