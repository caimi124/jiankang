'use client'

import React, { useState } from 'react'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'

export default function UserExperiences() {
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    herb: '',
    experience: '',
    condition: '',
    duration: ''
  })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里处理提交逻辑
    alert('感谢您的分享！您的评论已提交，我们会在审核后发布。')
    // 重置表单
    setNewReview({
      name: '',
      rating: 5,
      herb: '',
      experience: '',
      condition: '',
      duration: ''
    })
  }

  const userExperiences = [
    {
      name: '张先生',
      age: 35,
      herb: '姜黄',
      condition: '关节疼痛',
      rating: 5,
      duration: '3个月',
      experience: '患有轻度关节炎多年，开始服用姜黄补充剂后，疼痛明显减轻。现在爬楼梯不再困难，睡眠质量也有所改善。',
      helpfulVotes: 24,
      date: '2024年11月'
    },
    {
      name: '李女士',
      age: 28,
      herb: '洋甘菊',
      condition: '失眠、焦虑',
      rating: 4,
      duration: '2个月',
      experience: '工作压力大导致长期失眠。开始喝洋甘菊茶后，晚上更容易入睡，焦虑感也减少了。唯一的问题是需要坚持使用才有效果。',
      helpfulVotes: 18,
      date: '2024年10月'
    },
    {
      name: '王先生',
      age: 42,
      herb: '人参',
      condition: '疲劳、精力不足',
      rating: 5,
      duration: '4个月',
      experience: '中年后总感觉疲倦，医生建议尝试人参。服用几周后精力明显提升，工作效率也提高了。现在每天都很有活力。',
      helpfulVotes: 31,
      date: '2024年10月'
    },
    {
      name: '陈女士',
      age: 38,
      herb: '生姜',
      condition: '消化问题',
      rating: 4,
      duration: '6周',
      experience: '长期胃部不适，医生推荐生姜补充剂。服用后消化明显改善，胃胀和恶心的情况减少很多。',
      helpfulVotes: 15,
      date: '2024年9月'
    }
  ]

  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: '用户评论' }
        ]} 
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                💬 用户真实体验
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                真实用户分享他们使用草药补充剂的体验、效果和建议，为您的健康选择提供参考。
              </p>
              <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-8 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1000+</div>
                    <div className="text-gray-600">真实评论</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">4.8</div>
                    <div className="text-gray-600">平均评分</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-gray-600">推荐率</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Reviews */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              📝 用户真实分享
            </h2>
            <div className="space-y-8">
              {userExperiences.map((review, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        <p className="text-gray-600 text-sm">{review.age}岁 · {review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-2xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-1">使用草药</h4>
                      <p className="text-blue-600 font-medium">{review.herb}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-1">改善症状</h4>
                      <p className="text-green-600 font-medium">{review.condition}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-1">使用时间</h4>
                      <p className="text-purple-600 font-medium">{review.duration}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{review.experience}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                      <span className="mr-2">👍</span>
                      有帮助 ({review.helpfulVotes})
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      举报
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submit Review Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              ✍️ 分享您的体验
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      您的姓名（可使用昵称）
                    </label>
                    <input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入您的姓名"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      使用的草药
                    </label>
                    <input
                      type="text"
                      value={newReview.herb}
                      onChange={(e) => setNewReview({...newReview, herb: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="例如：姜黄、人参"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      改善的症状
                    </label>
                    <input
                      type="text"
                      value={newReview.condition}
                      onChange={(e) => setNewReview({...newReview, condition: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="例如：关节疼痛、失眠"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      使用时间
                    </label>
                    <select
                      value={newReview.duration}
                      onChange={(e) => setNewReview({...newReview, duration: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">请选择使用时间</option>
                      <option value="1-2周">1-2周</option>
                      <option value="1个月">1个月</option>
                      <option value="2-3个月">2-3个月</option>
                      <option value="3-6个月">3-6个月</option>
                      <option value="6个月以上">6个月以上</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    总体评分
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className={`text-3xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                      >
                        ⭐
                      </button>
                    ))}
                    <span className="ml-4 text-gray-600">
                      {newReview.rating}/5 分
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    详细体验分享
                  </label>
                  <textarea
                    rows={6}
                    value={newReview.experience}
                    onChange={(e) => setNewReview({...newReview, experience: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="请详细描述您的使用体验、效果、注意事项等..."
                    required
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">📋 分享须知：</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• 请分享真实、客观的使用体验</li>
                    <li>• 避免夸大效果或做出医疗声明</li>
                    <li>• 尊重他人隐私，不泄露个人信息</li>
                    <li>• 我们会审核后发布您的评论</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  📝 提交我的体验分享
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Guidelines Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              📋 分享指南
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">✅</span>
                  鼓励分享的内容
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    真实的使用体验和感受
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    具体的改善情况描述
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    使用过程中的注意事项
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    客观的效果评价
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  请避免的内容
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    夸大或虚假的效果声明
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    医疗诊断或治疗建议
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    个人隐私或敏感信息
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    商业推广或广告内容
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}