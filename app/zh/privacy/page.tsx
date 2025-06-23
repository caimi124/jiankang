import React from 'react'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'

export default function Privacy() {
  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: '隐私政策' }
        ]} 
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                🔒 隐私政策
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                我们致力于保护您的隐私和个人信息安全
              </p>
              <p className="text-sm text-gray-500 mt-4">
                最后更新时间：2024年12月18日
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 信息收集</h2>
                <div className="prose text-gray-600">
                  <p className="mb-4">我们可能收集的信息类型包括：</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>个人身份信息（姓名、邮箱地址等）</li>
                    <li>健康相关信息（症状、体质等）</li>
                    <li>使用数据（访问时间、浏览记录等）</li>
                    <li>设备信息（IP地址、浏览器类型等）</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 信息使用</h2>
                <div className="prose text-gray-600">
                  <p className="mb-4">我们使用收集的信息用于：</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>提供个性化的草药建议和健康指导</li>
                    <li>改善我们的服务质量和用户体验</li>
                    <li>发送重要的服务通知和更新</li>
                    <li>进行统计分析和研究（匿名化处理）</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🛡️ 信息保护</h2>
                <div className="prose text-gray-600">
                  <p className="mb-4">我们采取以下措施保护您的信息：</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>使用SSL加密技术保护数据传输</li>
                    <li>限制员工访问个人信息的权限</li>
                    <li>定期进行安全审查和系统更新</li>
                    <li>遵守相关的数据保护法规</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 信息共享</h2>
                <div className="prose text-gray-600">
                  <p className="mb-4">我们不会向第三方出售、交易或转移您的个人信息，除非：</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>获得您的明确同意</li>
                    <li>法律要求或政府机关要求</li>
                    <li>保护我们的权利、财产或安全</li>
                    <li>与可信的第三方服务提供商合作（受保密协议约束）</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🍪 Cookie使用</h2>
                <div className="prose text-gray-600">
                  <p className="mb-4">我们使用Cookie和类似技术来：</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>记住您的偏好设置</li>
                    <li>分析网站使用情况</li>
                    <li>提供个性化内容</li>
                    <li>改善网站性能</li>
                  </ul>
                  <p className="mt-4">您可以通过浏览器设置控制Cookie的使用。</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">👤 用户权利</h2>
                <div className="prose text-gray-600">
                  <p className="mb-4">您有权：</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>访问和查看我们收集的您的个人信息</li>
                    <li>要求更正不准确的信息</li>
                    <li>要求删除您的个人信息</li>
                    <li>限制或反对某些信息处理</li>
                    <li>数据可携带权</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">👶 未成年人保护</h2>
                <div className="prose text-gray-600">
                  <p>我们的服务主要面向成年人。我们不会故意收集13岁以下儿童的个人信息。如果发现我们无意中收集了儿童的个人信息，我们将尽快删除这些信息。</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📞 联系我们</h2>
                <div className="prose text-gray-600">
                  <p className="mb-4">如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>邮箱：</strong> privacy@herbscience.shop</p>
                    <p><strong>电话：</strong> +86 400-123-4567</p>
                    <p><strong>地址：</strong> 中国北京市朝阳区健康大街123号</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 政策更新</h2>
                <div className="prose text-gray-600">
                  <p>我们可能会不时更新本隐私政策。重大更改时，我们将通过网站通知或邮件通知您。继续使用我们的服务即表示您接受更新后的隐私政策。</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 