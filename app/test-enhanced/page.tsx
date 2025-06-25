import EnhancedHerbSearch from '../../components/EnhancedHerbSearch'
import EnhancedHerbDetail from '../../components/EnhancedHerbDetail'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '增强功能测试 | HerbScience',
  description: '测试新开发的草药搜索和详情展示功能'
}

// 测试数据
const testHerbData = {
  id: 'ginger',
  name: 'Ginger',
  chineseName: '生姜',
  latinName: 'Zingiber officinale',
  briefDescription: '温胃散寒、降逆止呕、化痰止咳，为常用的温里药',
  dosage: '3-10g',
  usage: '煎汤内服，或研末冲服',
  safetyLevel: 'high' as const,
  precautions: '胃溃疡患者慎用，阴虚内热者慎用',
  medicalCaseAnalysis: JSON.stringify([
    {
      symptoms: '恶心呕吐，食欲不振，胃脘冷痛',
      treatment: '生姜10g，大枣3枚，甘草6g，煎汤温服',
      outcome: '服用3天后恶心症状明显改善，食欲逐渐恢复',
      mechanism: '生姜辛温，能温中散寒，降逆止呕，调和脾胃'
    }
  ]),
  wellnessRecipes: JSON.stringify([
    {
      name: '生姜蜂蜜茶',
      ingredients: '新鲜生姜10g，蜂蜜15ml，温水200ml',
      preparation: '生姜切片，用开水冲泡10分钟，晾至温热后加入蜂蜜',
      benefits: '温胃散寒，润燥止咳，提高免疫力',
      timing: '早晨空腹或饭后1小时饮用'
    }
  ]),
  practicalTips: JSON.stringify([
    {
      title: '储存方法',
      content: '生姜应储存在阴凉干燥处，避免阳光直射，可用报纸包裹延长保鲜期',
      category: '储存'
    },
    {
      title: '使用技巧',
      content: '煮汤时最后5分钟加入生姜片，既能发挥药效又不会过于辛辣',
      category: '使用'
    }
  ]),
  applicableSymptoms: ['恶心', '呕吐', '消化不良', '感冒', '食欲不振'],
  applicableDiseases: ['慢性胃炎', '功能性消化不良', '妊娠呕吐', '风寒感冒'],
  contraindicationGroups: ['胃溃疡患者', '阴虚内热者', '孕晚期妇女'],
  contraindicationDetails: '胃溃疡患者慎用，可能刺激胃黏膜；阴虚内热者慎用，可能加重燥热症状',
  tcmConstitution: ['寒性体质', '痰湿体质'],
  effectCategories: ['温中散寒', '降逆止呕', '化痰止咳']
}

export default function TestEnhancedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">增强功能测试页面</h1>
          <p className="text-gray-600 mt-2">测试新开发的智能搜索和草药详情功能</p>
        </div>
      </div>

      {/* 功能展示区域 */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        
        {/* 智能搜索功能 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 智能症状搜索功能</h2>
          <div className="bg-white rounded-2xl shadow-xl p-1">
            <EnhancedHerbSearch />
          </div>
        </section>

        {/* 分隔线 */}
        <div className="border-t border-gray-200"></div>

        {/* 草药详情展示 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 增强草药详情展示</h2>
          <div className="bg-white rounded-2xl shadow-xl p-1">
            <EnhancedHerbDetail herbData={testHerbData} />
          </div>
        </section>

        {/* 功能说明 */}
        <section className="bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">🚀 新功能特点</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-800">智能搜索</h3>
              <ul className="space-y-2 text-blue-700">
                <li>• 症状智能匹配</li>
                <li>• 健康状况安全检查</li>
                <li>• 个性化推荐算法</li>
                <li>• 中英文症状识别</li>
                <li>• 实时安全评估</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-800">详情展示</h3>
              <ul className="space-y-2 text-blue-700">
                <li>• 医学案例分析</li>
                <li>• 养生食谱指导</li>
                <li>• 实用使用贴士</li>
                <li>• 详细安全信息</li>
                <li>• 体质匹配建议</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 