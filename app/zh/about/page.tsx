import React from 'react'
import { Metadata } from 'next'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { Users, Award, Globe, Heart, CheckCircle, BookOpen, Mail, MessageCircle, Clock, MapPin, Phone, Send, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: '关于我们 | HerbScience.shop',
  description: '了解 HerbScience.shop 团队、使命和我们致力于提供循证草药指导的承诺。',
  keywords: ['关于我们', '团队介绍', '草药专家', '循证医学', '联系方式'],
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "陈博士",
      role: "首席医疗官",
      credentials: "医学博士，中医学博士",
      experience: "15年以上中西医结合经验",
      image: "👩‍⚕️",
      bio: "陈博士致力于中西医结合，专攻草药安全性研究和临床应用。"
    },
    {
      name: "迈克尔·罗德里格斯博士",
      role: "研究总监",
      credentials: "药理学博士，植物学硕士", 
      experience: "12年以上制药研究经验",
      image: "👨‍🔬",
      bio: "罗德里格斯博士领导我们的循证医学方法，确保所有建议都有严格的科学研究支持。"
    },
    {
      name: "张丽莎",
      role: "技术总监",
      credentials: "计算机科学硕士，健康IT认证",
      experience: "10年以上健康科技经验",
      image: "👩‍💻",
      bio: "张丽莎负责我们的平台开发，确保用户隐私并创建直观的健康指导工具。"
    }
  ]

  const milestones = [
    { year: "2019", event: "公司成立，使命是解读草药补充剂的奥秘" },
    { year: "2020", event: "推出首个草药-药物相互作用数据库" },
    { year: "2021", event: "与3所主要大学建立研究验证合作伙伴关系" },
    { year: "2022", event: "发布AI体质分析工具" },
    { year: "2023", event: "全球用户超过10万人" },
    { year: "2024", event: "安全数据库扩展至500+草药和1000+相互作用" }
  ]

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "用户优先方法",
      description: "我们构建的每一个功能都始于了解用户对草药补充剂的真实关切和痛点。"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      title: "循证信息",
      description: "我们所有的建议都有同行评议研究、传统智慧和临床经验的支持。"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      title: "安全第一",
      description: "我们将用户安全放在首位，提供全面的相互作用警告和禁忌症。"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      title: "全球可及性",
      description: "让全世界的人都能获得草药健康知识，无论其背景或地理位置如何。"
    }
  ]

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "邮箱支持",
      description: "获得详细的问题解答",
      contact: "support@herbscience.shop",
      responseTime: "24小时内回复"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "在线客服",
      description: "紧急问题的快速帮助",
      contact: "网站内可用",
      responseTime: "工作时间内实时回复"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "电话支持",
      description: "直接与我们的专家交谈",
      contact: "+1 (555) 123-4567",
      responseTime: "周一至周五，上午9点-下午6点（美东时间）"
    }
  ]

  const responseTimesData = [
    {
      category: "安全问题",
      description: "草药相互作用、副作用、禁忌症",
      responseTime: "优先处理 - 4小时内"
    },
    {
      category: "产品问题",
      description: "如何使用我们的工具，技术支持",
      responseTime: "12小时内"
    },
    {
      category: "医疗咨询",
      description: "需要专家审查的复杂健康问题",
      responseTime: "48小时内"
    },
    {
      category: "合作与商务",
      description: "合作机会，媒体咨询",
      responseTime: "72小时内"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: '首页', href: '/zh' },
              { label: '关于我们', href: '/zh/about' }
            ]} 
          />

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              连接古老智慧与现代科学
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              我们致力于让草药补充剂变得可及、可理解且安全。
              通过结合传统知识与前沿研究，我们帮助人们做出明智的健康决策。
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">我们的使命</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                让每个人都能获得安全、循证的草药健康信息。我们相信每个人都应该了解
                自己在服用什么以及为什么服用，而不需要医学学位就能做出明智的决定。
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">我们的愿景</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                在这个世界里，草药补充剂不再神秘或令人生畏，而是值得信赖的健康工具，
                能够补充现代医疗保健。我们设想知情的消费者与医疗保健提供者一起工作，
                自然地优化他们的健康。
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">我们的核心价值观</h2>
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">认识我们的专家团队</h2>
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">我们的历程</h2>
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
            <h2 className="text-3xl font-bold text-center mb-12">数据统计</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-green-100">数据库中的草药</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-green-100">药物相互作用</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10万+</div>
                <div className="text-green-100">帮助的用户</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-green-100">研究合作伙伴</div>
              </div>
            </div>
          </div>

          {/* Certifications & Partnerships */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">认证与合作伙伴关系</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">医疗顾问委员会</h3>
                <p className="text-gray-600 text-sm">由执业医师和药剂师审查</p>
              </div>
              <div>
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">大学合作伙伴关系</h3>
                <p className="text-gray-600 text-sm">与领先学术机构的合作研究</p>
              </div>
              <div>
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">隐私认证</h3>
                <p className="text-gray-600 text-sm">符合HIPAA的数据处理和安全标准</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-16" id="contact">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">联系我们</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                对草药有疑问，需要安全建议，或想分享反馈？
                我们的专家团队随时为您的草药健康之旅提供帮助。
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
              {/* Contact Form - Static version since this is now a server component */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">给我们留言</h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        姓名 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="您的姓名"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        邮箱地址 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      问题类别
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="general">一般问题</option>
                      <option value="safety">安全性与相互作用</option>
                      <option value="technical">技术支持</option>
                      <option value="medical">医疗咨询</option>
                      <option value="business">商务/合作</option>
                      <option value="feedback">反馈与建议</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      主题 *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="您的咨询简要描述"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      留言 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="请详细描述您的问题或关切..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    发送消息
                  </button>
                </form>
              </div>

              {/* Office Info & Response Times */}
              <div className="space-y-8">
                {/* Office Information */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">我们的办公室</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">总部</p>
                        <p className="text-gray-600">123 Health Innovation Drive<br />San Francisco, CA 94105</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">营业时间</p>
                        <p className="text-gray-600">周一至周五：上午9:00 - 下午6:00（太平洋时间）<br />周六：上午10:00 - 下午2:00（太平洋时间）<br />周日：休息</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Times */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">预期回复时间</h3>
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
                      <h4 className="font-bold text-red-900 mb-2">🚨 医疗紧急情况</h4>
                      <p className="text-red-800 text-sm">
                        如果您遇到医疗紧急情况或对任何补充剂有严重不良反应，
                        请立即拨打120或前往最近的急诊科。请不要等待我们的回复。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">对我们的使命有疑问？</h2>
            <p className="text-xl mb-8 text-green-100">
              我们在这里帮助您对草药补充剂做出明智的决定。
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              联系我们的团队
            </a>
          </div>
        </div>
      </main>
    </div>
  )
} 