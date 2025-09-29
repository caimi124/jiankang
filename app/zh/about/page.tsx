import React from 'react'
import { Metadata } from 'next'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '关于我们 | HerbScience.shop',
  description: '了解 HerbScience.shop 团队、使命和我们致力于提供循证草药指导的承诺。',
  keywords: ['关于我们', '团队介绍', '草药专家', '循证医学', '联系方式'],
}

export default function About() {
  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: '关于我们' }
        ]} 
      />

      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ℹ️ 关于我们
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              HerbScience.shop 致力于为全球用户提供科学、可靠的中草药补充剂指导，帮助每个人做出明智的健康决策。
              立即尝试
              <Link href="/zh/constitution-test" className="text-green-600 hover:text-green-700 underline mx-1">体质测试</Link>
              、浏览
              <Link href="/zh/herb-finder" className="text-green-600 hover:text-green-700 underline mx-1">草药数据库</Link>
              ，或阅读我们的
              <Link href="/zh/blog" className="text-green-600 hover:text-green-700 underline mx-1">循证博客</Link>。
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              🎯 我们的使命
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-50 rounded-2xl p-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🔬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  循证医学
                </h3>
                <p className="text-gray-600">
                  基于科学研究和临床证据，提供可信赖的草药信息
                </p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  全球服务
                </h3>
                <p className="text-gray-600">
                  为全世界用户提供多语言的专业草药指导服务
                </p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-8">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  专业合作
                </h3>
                <p className="text-gray-600">
                  与医疗专家、研究机构密切合作，确保信息权威性
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            👥 专家团队
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: '陈博士',
                title: '中医药专家',
                description: '20年中医临床经验，专注于草药安全性研究',
                image: '👨‍⚕️'
              },
              {
                name: '李教授',
                title: '药物学研究员',
                description: '哥伦比亚大学药物学博士，草药-药物相互作用专家',
                image: '👩‍🔬'
              },
              {
                name: '王医师',
                title: '临床药师',
                description: '梅奥诊所临床药师，专注于补充剂安全性评估',
                image: '👨‍💼'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-6">{member.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-4">
                  {member.title}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            📊 我们的成就
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50,000+', label: '信赖用户' },
              { number: '500+', label: '草药分析' },
              { number: '2,000+', label: '研究引用' },
              { number: '98%', label: '用户满意度' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            📞 联系我们
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                💌 取得联系
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📧</span>
                  <div>
                    <p className="font-medium">邮箱</p>
                    <p className="text-gray-600">contact@herbscience.shop</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">🕒</span>
                  <div>
                    <p className="font-medium">工作时间</p>
                    <p className="text-gray-600">周一至周五 9:00-18:00 (北京时间)</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">🌍</span>
                  <div>
                    <p className="font-medium">服务地区</p>
                    <p className="text-gray-600">全球用户，中英双语支持</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">📝 留言给我们</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="您的姓名"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="邮箱地址"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <textarea
                  rows={4}
                  placeholder="您的留言..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                ></textarea>
                <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                  发送留言
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">❓ 常见问题（FAQ）</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">你们的内容如何做到“循证”？</h3>
              <p className="text-gray-600">我们基于同行评审研究、权威数据库与临床经验进行内容整理，并由具有药师与中医背景的专业人士把关。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">如何避免草药与药物相互作用？</h3>
              <p className="text-gray-600">请参考我们的安全指引，并在合用处方药时咨询医生。建议先做
                <Link href="/zh/constitution-test" className="text-green-600 hover:text-green-700 underline mx-1">体质测试</Link>
                ，并在
                <Link href="/zh/herb-finder" className="text-green-600 hover:text-green-700 underline mx-1">草药数据库</Link>
                中查看每味草药的禁忌与注意事项。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">新手如何开始？</h3>
              <p className="text-gray-600">从单味草药开始，按照循证剂量试用2-4周并记录感受。可先阅读
                <Link href="/zh/blog" className="text-green-600 hover:text-green-700 underline mx-1">循证博客</Link>
                获取实用指南。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            🛡️ 安全与信任
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'FDA 注册', description: '设施已注册', icon: '🏛️' },
              { title: 'GMP 认证', description: '良好生产规范', icon: '✅' },
              { title: '第三方检测', description: '独立实验室验证', icon: '🔬' },
              { title: 'HIPAA 合规', description: '隐私保护标准', icon: '🔐' }
            ].map((trust, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">{trust.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {trust.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {trust.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '你们的内容如何做到“循证”？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '我们基于同行评审研究、权威数据库与临床经验进行内容整理，并由具有药师与中医背景的专业人士把关。'
                }
              },
              {
                '@type': 'Question',
                name: '如何避免草药与药物相互作用？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '请参考我们的安全指引，并在合用处方药时咨询医生。建议先做体质测试，并在草药数据库中查看每味草药的禁忌与注意事项。'
                }
              },
              {
                '@type': 'Question',
                name: '新手如何开始？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '从单味草药开始，按照循证剂量试用2-4周并记录感受。建议阅读循证博客获取实用指南。'
                }
              }
            ]
          })
        }}
      />
      </div>
    </div>
  )
} 