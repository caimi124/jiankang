import React from 'react'
import { Metadata } from 'next'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'

export const metadata: Metadata = {
  title: '草药安全检查器 | HerbScience.shop',
  description: '上传您的补充剂标签，获得详细的安全分析，包括成分解析、药物相互作用和个人风险评估。',
  keywords: ['草药安全检查', '成分分析', '药物相互作用', '补充剂安全', '风险评估'],
}

export default function IngredientChecker() {
  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: '成分检查器' }
        ]} 
      />

      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🛡️ 草药安全检查器
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              上传您的补充剂标签，获得专业的安全分析，包括成分详解、潜在风险和药物相互作用检查。
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">30秒</div>
                  <div className="text-gray-600">快速分析</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">1000+</div>
                  <div className="text-gray-600">草药数据库</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">AI</div>
                  <div className="text-gray-600">智能识别</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              📷 上传产品标签
            </h2>
            <p className="text-lg text-gray-600">
              拍照或上传您的补充剂产品标签，我们将为您进行全面的安全分析
            </p>
          </div>

          {/* Upload Box */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-orange-400 transition-colors">
            <div className="text-6xl text-gray-400 mb-6">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              上传产品标签照片
            </h3>
            <p className="text-gray-600 mb-6">
              支持 JPG、PNG、PDF 格式，最大 10MB
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors">
                📁 选择文件
              </button>
              <button className="bg-gray-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors">
                📷 拍照
              </button>
            </div>
          </div>

          {/* Alternative Input */}
          <div className="mt-8">
            <div className="text-center mb-6">
              <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-600 text-sm">
                或者手动输入成分
              </span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                请输入产品成分列表：
              </label>
              <textarea
                rows={4}
                placeholder="例如：姜黄素 500mg、生姜提取物 200mg、黑胡椒提取物 5mg..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              ></textarea>
              <button className="mt-4 bg-orange-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors">
                🔍 开始分析
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            🔍 我们检查什么
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '成分识别',
                description: '准确识别每种草药成分和含量',
                icon: '🌿',
                color: 'from-green-500 to-emerald-500'
              },
              {
                title: '安全等级',
                description: '评估每种成分的安全性等级',
                icon: '⭐',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                title: '药物相互作用',
                description: '检查与常用药物的相互作用',
                icon: '💊',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: '副作用预警',
                description: '列出可能的副作用和注意事项',
                icon: '⚠️',
                color: 'from-red-500 to-pink-500'
              },
              {
                title: '剂量分析',
                description: '分析剂量是否在安全范围内',
                icon: '⚖️',
                color: 'from-purple-500 to-indigo-500'
              },
              {
                title: '禁忌症检查',
                description: '检查特殊人群使用禁忌',
                icon: '🚫',
                color: 'from-gray-500 to-slate-500'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Analysis */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            📊 示例分析报告
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                产品：复合姜黄素胶囊
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-100 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <span className="text-green-600 text-xl mr-2">✅</span>
                    <span className="font-semibold text-green-800">总体安全性: 高</span>
                  </div>
                  <p className="text-green-700 text-sm">该产品成分安全，适合大多数成年人使用</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-600 text-xl mr-2">⚠️</span>
                    <span className="font-semibold text-yellow-800">注意事项: 2个</span>
                  </div>
                  <p className="text-yellow-700 text-sm">孕妇慎用，服用抗凝药物者需咨询医生</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <span className="text-blue-600 text-xl mr-2">🔍</span>
                    <span className="font-semibold text-blue-800">成分数量: 4个</span>
                  </div>
                  <p className="text-blue-700 text-sm">识别到4种活性成分，全部在安全范围内</p>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900">详细成分分析：</h4>
              
              {[
                {
                  name: '姜黄素',
                  dose: '500mg',
                  safety: '高',
                  safetyColor: 'text-green-600',
                  description: '抗炎、抗氧化作用显著，剂量在推荐范围内'
                },
                {
                  name: '生姜提取物',
                  dose: '200mg',
                  safety: '高',
                  safetyColor: 'text-green-600',
                  description: '促进消化，增强姜黄素吸收，剂量适中'
                },
                {
                  name: '黑胡椒提取物',
                  dose: '5mg',
                  safety: '中',
                  safetyColor: 'text-yellow-600',
                  description: '提高生物利用度，剂量偏高，建议监测'
                },
                {
                  name: '维生素D3',
                  dose: '1000IU',
                  safety: '高',
                  safetyColor: 'text-green-600',
                  description: '支持免疫功能，剂量在安全范围内'
                }
              ].map((ingredient, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <h5 className="font-semibold text-gray-900 mr-2">{ingredient.name}</h5>
                      <span className="text-gray-600 text-sm">({ingredient.dose})</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${ingredient.safetyColor} bg-gray-100`}>
                      安全性: {ingredient.safety}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{ingredient.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            📋 安全使用指南
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">✅</span>
                安全建议
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  在开始任何新的补充剂前咨询医生
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  严格按照产品说明书推荐剂量服用
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  定期监测身体反应和健康状况
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  保存好产品包装和说明书
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  购买信誉良好品牌的产品
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                风险提醒
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  孕妇、哺乳期妇女需特别谨慎
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  慢性病患者必须医生指导下使用
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  注意草药与处方药的相互作用
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  出现不良反应立即停用并就医
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  避免超量服用或混合使用多种产品
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            立即检查您的补充剂安全性
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            免费上传产品标签，30秒获得专业安全分析报告
          </p>
          <button className="bg-white text-orange-600 px-12 py-4 rounded-2xl text-xl font-semibold hover:bg-orange-50 transition-colors shadow-lg">
            🛡️ 免费安全检查
          </button>
          <p className="text-orange-200 text-sm mt-4">
            ✅ 完全免费 ✅ 隐私保护 ✅ 专业可靠
          </p>
        </div>
      </section>
      </div>
    </div>
  )
} 