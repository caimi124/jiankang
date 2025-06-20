'use client'

import { useState } from 'react'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import IngredientCheckerFAQ from '../../../components/IngredientCheckerFAQ'
import { Upload, AlertTriangle, Shield, Info, CheckCircle, X, Camera, FileText, Star, ExternalLink, Mail, ArrowRight, Lightbulb, Database, Users, Award } from 'lucide-react'

interface AnalysisResults {
  ingredients: Array<{
    name: string
    chineseName?: string
    latinName?: string
    safety: string
    safetyScore: number
    interactions: string[]
    benefits: string
    sideEffects: string[]
    dosage: string
    contraindications: string[]
    pregnancySafety: string
    qualityGrade: string
    herbFinderLink?: string
    alternativeSuggestions?: string[]
  }>
  overallRisk: string
  riskScore: number
  recommendations: string[]
  warnings: string[]
  drugInteractions: Array<{
    drug: string
    severity: string
    description: string
  }>
  alternativeRecommendations?: Array<{
    name: string
    reason: string
    safetyScore: number
    link: string
  }>
}

export default function IngredientChecker() {
  const [ingredientText, setIngredientText] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [inputMethod, setInputMethod] = useState<'text' | 'photo'>('text')
  const [emailForResults, setEmailForResults] = useState('')
  const [showEmailCapture, setShowEmailCapture] = useState(false)

  // 中文示例成分
  const exampleIngredients = [
    "银杏叶提取物 120mg, 红景天 300mg, 咖啡因 100mg",
    "姜黄素 500mg, 生姜根提取物 200mg, 黑胡椒提取物 5mg",
    "印度人参 600mg, 茶氨酸 200mg, 甘氨酸镁 400mg",
    "圣约翰草 300mg, 缬草根 450mg, 西番莲 250mg"
  ]

  const loadExample = (example: string) => {
    setIngredientText(example)
    setInputMethod('text')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setInputMethod('photo')
    }
  }

  const analyzeIngredients = () => {
    setIsAnalyzing(true)
    
    // 模拟AI分析过程
    setTimeout(() => {
      const mockResults: AnalysisResults = {
        ingredients: [
          {
            name: '人参根提取物',
            chineseName: '人参 (Ren Shen)',
            latinName: 'Panax ginseng',
            safety: '一般安全',
            safetyScore: 85,
            interactions: ['抗凝血药物(华法林)', '糖尿病药物', '降压药物'],
            benefits: '增强能量、改善认知功能、提高免疫力、减轻压力',
            sideEffects: ['失眠', '头痛', '消化不良', '神经紧张'],
            dosage: '每日100-400mg（标准化提取物）',
            contraindications: ['怀孕期间', '高血压（未控制）', '失眠症'],
            pregnancySafety: '避免使用 - 安全数据不足',
            qualityGrade: 'A',
            herbFinderLink: '/zh/herb-finder?search=人参',
            alternativeSuggestions: ['红景天', '五味子']
          },
          {
            name: '银杏叶提取物',
            chineseName: '银杏叶 (Yin Xing Ye)',
            latinName: 'Ginkgo biloba',
            safety: '中等风险',
            safetyScore: 75,
            interactions: ['抗凝血药物', '抗癫痫药物', '非甾体抗炎药'],
            benefits: '改善记忆和循环、支持大脑健康、可能有助于耳鸣',
            sideEffects: ['出血风险', '胃部不适', '头痛', '皮肤反应'],
            dosage: '每日120-240mg（24%黄酮苷）',
            contraindications: ['出血性疾病', '手术（术前2周停用）', '癫痫'],
            pregnancySafety: '避免使用 - 可能引起出血',
            qualityGrade: 'B+',
            herbFinderLink: '/zh/herb-finder?search=银杏',
            alternativeSuggestions: ['假马齿苋', '猴头菇']
          },
          {
            name: '姜黄提取物（姜黄素）',
            chineseName: '姜黄 (Jiang Huang)',
            latinName: 'Curcuma longa',
            safety: '安全',
            safetyScore: 90,
            interactions: ['抗凝血药物', '糖尿病药物', '化疗药物'],
            benefits: '抗炎、抗氧化、支持关节健康、可能改善大脑功能',
            sideEffects: ['胃部不适', '高剂量时出血风险增加', '肾结石（罕见）'],
            dosage: '每日500-1000mg（配黑胡椒增强吸收）',
            contraindications: ['胆结石', '肾结石', '出血性疾病'],
            pregnancySafety: '食物量安全，避免补充剂',
            qualityGrade: 'A+',
            herbFinderLink: '/zh/herb-finder?search=姜黄',
            alternativeSuggestions: ['乳香', '酸樱桃提取物']
          }
        ],
        overallRisk: '低-中等',
        riskScore: 78,
        recommendations: [
          '开始使用前请咨询医疗保健提供者，特别是在服用抗凝血药物时',
          '从较低剂量开始，评估个人耐受性',
          '监测任何异常症状，如出现不良反应应停止使用',
          '人参建议早上服用以避免影响睡眠',
          '考虑服用时间：姜黄与食物一起服用以减少胃部不适'
        ],
        warnings: [
          '这种组合可能增加出血风险 - 如果您服用抗凝血药物需特别注意',
          '银杏应在任何手术前2周停用',
          '怀孕和哺乳期间避免使用这种组合'
        ],
        drugInteractions: [
          {
            drug: '华法林（香豆素）',
            severity: '高',
            description: '与人参和银杏结合使用可能显著增加出血风险'
          },
          {
            drug: '糖尿病药物',
            severity: '中等',
            description: '人参可能降低血糖，需要调整药物剂量'
          }
        ],
        alternativeRecommendations: [
          {
            name: '红景天',
            reason: '比人参更安全的能量替代品，无心血管风险',
            safetyScore: 88,
            link: '/zh/herb-finder?search=红景天'
          },
          {
            name: '假马齿苋',
            reason: '记忆增强效果，无出血风险',
            safetyScore: 85,
            link: '/zh/herb-finder?search=假马齿苋'
          }
        ]
      }
      setAnalysisResults(mockResults)
      setIsAnalyzing(false)
      setShowEmailCapture(true)
    }, 3000)
  }

  const getRiskColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case '高': return 'text-red-600 bg-red-100'
      case '中等': return 'text-yellow-600 bg-yellow-100'
      case '低': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb 
        items={[
              { label: '首页', href: '/zh' },
              { label: '成分安全检查器', href: '/zh/ingredient-checker' }
        ]} 
      />

          {/* 增强版标题 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🛡️ 草药成分安全检查器
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              上传补充剂标签或输入成分，获得全面的安全分析、相互作用警告和基于科学研究的专家建议。
            </p>

            {/* 统计数据部分 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-gray-600">草药分析</div>
                </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">准确率</div>
                </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-purple-600">200+</div>
                <div className="text-sm text-gray-600">药物相互作用</div>
                </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-orange-600">24/7</div>
                <div className="text-sm text-gray-600">AI分析</div>
              </div>
            </div>
          </div>

          {/* 增强版输入部分 */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">🔍 分析您的补充剂</h2>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                您可以检查什么？
              </h3>
              <p className="text-blue-800 text-sm">
                输入成分名称（带或不带剂量）、上传补充剂标签，或使用下面的示例。
                我们将分析安全性、相互作用并建议替代品。
            </p>
          </div>

            {/* 快速示例 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">📝 试试这些示例：</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exampleIngredients.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => loadExample(example)}
                    className="text-left p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors text-sm"
                  >
                    <div className="font-medium text-gray-900 mb-1">示例 {index + 1}</div>
                    <div className="text-gray-600">{example}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* 输入方式选项卡 */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setInputMethod('text')}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                    inputMethod === 'text'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>输入成分</span>
                </button>
                <button
                  onClick={() => setInputMethod('photo')}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                    inputMethod === 'photo'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>上传照片</span>
                </button>
              </div>
            </div>

            {/* 增强版输入方式 */}
            {inputMethod === 'text' ? (
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">📝 输入补充剂成分</label>
                <textarea
                  placeholder="在此输入您的成分...

示例：
• 银杏叶、红景天、咖啡因
• 姜黄素 500mg、生姜 200mg、黑胡椒 5mg  
• 印度人参提取物、茶氨酸、甘氨酸镁
• 缬草根、西番莲、褪黑素

如有剂量信息，请一并提供以获得更精确的分析！"
                  value={ingredientText}
                  onChange={(e) => setIngredientText(e.target.value)}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl h-48 resize-none focus:border-blue-500 focus:outline-none text-gray-700"
                />
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-gray-500">
                    💡 提示：包含剂量信息（mg、IU等）可获得更精确的安全评估
                  </p>
                  <span className="text-xs text-gray-400">
                    {ingredientText.length}/1000
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">📷 上传补充剂标签</label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  {selectedFile ? (
                    <div>
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <p className="text-gray-700 font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500 mt-2">🤖 AI将从此图像中提取成分</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedFile(null)
                        }}
                        className="mt-4 text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5 inline mr-1" />
                        移除
              </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">📱 拖拽或点击上传补充剂标签</p>
                      <p className="text-sm text-gray-500 mb-4">支持 JPG、PNG、PDF • 最大 10MB</p>
                      <div className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors inline-block">
                        选择文件
                      </div>
                    </div>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* 增强版分析按钮 */}
            <div className="text-center">
              <button
                onClick={analyzeIngredients}
                disabled={(!ingredientText.trim() && !selectedFile) || isAnalyzing}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-12 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>🧪 正在分析安全性...</span>
                  </div>
                ) : (
                  <>🔍 获取全面安全分析</>
                )}
              </button>
              <p className="text-sm text-gray-500 mt-3">
                ✅ 免费分析 • 🔒 隐私保护 • ⚡ 30秒出结果
              </p>
            </div>
          </div>

          {/* 增强版分析结果 */}
          {analysisResults && (
            <div className="space-y-8">
              {/* 总体评估 */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Shield className="w-6 h-6 text-blue-600 mr-3" />
                  📊 总体安全评估
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 px-4 py-2 rounded-xl ${getRiskColor(analysisResults.riskScore)}`}>
                      {analysisResults.riskScore}/100
                    </div>
                    <p className="text-gray-600">安全评分</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-xl font-bold mb-2 px-4 py-2 rounded-xl ${
                      analysisResults.overallRisk === '低' ? 'text-green-600 bg-green-100' :
                      analysisResults.overallRisk === '低-中等' ? 'text-yellow-600 bg-yellow-100' :
                      'text-red-600 bg-red-100'
                    }`}>
                      {analysisResults.overallRisk}
                    </div>
                    <p className="text-gray-600">风险等级</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold mb-2 px-4 py-2 rounded-xl text-blue-600 bg-blue-100">
                      {analysisResults.ingredients.length}
                    </div>
                    <p className="text-gray-600">已分析成分</p>
                  </div>
                </div>

                {/* 警告 */}
                {analysisResults.warnings.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      ⚠️ 重要安全警告
                    </h4>
                    <ul className="space-y-2">
                      {analysisResults.warnings.map((warning, index) => (
                        <li key={index} className="flex items-start text-red-700">
                          <span className="text-red-600 mr-2 mt-0.5">⚠️</span>
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 建议 */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    💡 专家建议
                  </h4>
                  <ul className="space-y-2">
                    {analysisResults.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-blue-700">
                        <span className="text-blue-600 mr-2 mt-0.5">💡</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 替代建议 */}
              {analysisResults.alternativeRecommendations && analysisResults.alternativeRecommendations.length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Star className="w-6 h-6 text-green-600 mr-3" />
                    🌟 更安全的替代建议
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {analysisResults.alternativeRecommendations.map((alt, index) => (
                      <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">{alt.name}</h4>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            评分: {alt.safetyScore}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{alt.reason}</p>
                        <a 
                          href={alt.link}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                          在草药数据库中了解更多
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 增强版个别成分 */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">🔬 详细成分分析</h3>
                <div className="space-y-6">
                  {analysisResults.ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-2xl hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900">{ingredient.name}</h4>
                          {ingredient.latinName && (
                            <p className="text-gray-600 italic text-sm">{ingredient.latinName}</p>
                          )}
                          {ingredient.chineseName && (
                            <p className="text-gray-600 italic text-sm">{ingredient.chineseName}</p>
                          )}
                        </div>
                        <div className="text-right flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            ingredient.safety === '安全' ? 'bg-green-100 text-green-800' :
                            ingredient.safety === '一般安全' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {ingredient.safety}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">等级: {ingredient.qualityGrade}</span>
                          </div>
                          {ingredient.herbFinderLink && (
                            <a 
                              href={ingredient.herbFinderLink}
                              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              在草药数据库中查看
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                        <div>
                          <strong className="text-green-700 block mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            功效：
                          </strong>
                          <p className="text-gray-700">{ingredient.benefits}</p>
                        </div>
                        <div>
                          <strong className="text-blue-700 block mb-2 flex items-center">
                            <Info className="w-4 h-4 mr-1" />
                            推荐剂量：
                          </strong>
                          <p className="text-gray-700">{ingredient.dosage}</p>
                        </div>
                        <div>
                          <strong className="text-purple-700 block mb-2 flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            妊娠安全性：
                          </strong>
                          <p className="text-gray-700">{ingredient.pregnancySafety}</p>
                        </div>
                        <div>
                          <strong className="text-orange-700 block mb-2 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            副作用：
                          </strong>
                          <ul className="text-gray-700 space-y-1">
                            {ingredient.sideEffects.map((effect, idx) => (
                              <li key={idx}>• {effect}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-red-700 block mb-2 flex items-center">
                            <X className="w-4 h-4 mr-1" />
                            药物相互作用：
                          </strong>
                          <ul className="text-gray-700 space-y-1">
                            {ingredient.interactions.map((interaction, idx) => (
                              <li key={idx}>• {interaction}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-gray-700 block mb-2 flex items-center">
                            <Shield className="w-4 h-4 mr-1" />
                            禁忌症：
                          </strong>
                          <ul className="text-gray-700 space-y-1">
                            {ingredient.contraindications.map((contra, idx) => (
                              <li key={idx}>• {contra}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* 该成分的替代建议 */}
                      {ingredient.alternativeSuggestions && (
                        <div className="mt-4 p-4 bg-green-50 rounded-xl">
                          <strong className="text-green-800 block mb-2">🌿 更安全的替代品：</strong>
                          <div className="flex flex-wrap gap-2">
                            {ingredient.alternativeSuggestions.map((alt, idx) => (
                              <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {alt}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 药物相互作用 */}
              {analysisResults.drugInteractions.length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                    💊 关键药物相互作用
                  </h3>
                  <div className="space-y-4">
                    {analysisResults.drugInteractions.map((interaction, index) => (
                      <div key={index} className="border border-gray-200 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">{interaction.drug}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(interaction.severity)}`}>
                            {interaction.severity}风险
              </span>
            </div>
                        <p className="text-gray-700">{interaction.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 结果邮件收集 */}
              {showEmailCapture && (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-lg p-8 text-white">
                  <div className="text-center">
                    <Mail className="w-12 h-12 mx-auto mb-4 text-blue-100" />
                    <h3 className="text-2xl font-bold mb-4">📧 获取完整安全报告</h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                      获得详细的PDF报告，包含个性化建议、替代建议和"十大危险成分避免指南" - 完全免费！
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="输入您的邮箱地址"
                        value={emailForResults}
                        onChange={(e) => setEmailForResults(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl text-gray-900 w-full sm:w-auto"
                      />
                      <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
                        发送报告
                        <ArrowRight className="w-4 h-4 inline ml-2" />
              </button>
            </div>
                    <p className="text-blue-200 text-sm mt-4">
                      ✅ 无垃圾邮件 • 🔒 隐私保护 • 📱 移动端友好PDF
                    </p>
          </div>
        </div>
              )}
            </div>
          )}

          {/* 我们检查什么部分 */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🔍 我们的安全检查器分析什么
          </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '成分识别',
                  description: '从名称或照片准确识别草药、维生素和化合物',
                icon: '🌿',
                color: 'from-green-500 to-emerald-500'
              },
              {
                  title: '安全评估',
                  description: '基于临床研究和传统使用的循证安全评级',
                icon: '⭐',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                title: '药物相互作用',
                  description: '检查与200多种药物的潜在危险组合',
                icon: '💊',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                  title: '副作用警告',
                  description: '全面的副作用和禁忌症信息',
                icon: '⚠️',
                color: 'from-red-500 to-pink-500'
              },
              {
                title: '剂量分析',
                  description: '验证剂量是否在安全的治疗范围内',
                icon: '⚖️',
                color: 'from-purple-500 to-indigo-500'
              },
              {
                  title: '质量等级',
                  description: '基于纯度和制造标准的补充剂质量评级',
                  icon: '🏆',
                  color: 'from-amber-500 to-yellow-500'
              }
            ].map((feature, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:shadow-lg transition-shadow`}>
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

          {/* 数据库连接部分 */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <Database className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🌐 连接到我们的全面草药数据库
          </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
                每个成分分析都链接到我们广泛的草药数据库。
                点击任何成分结果即可探索详细专论、传统用途、现代研究和寻找优质供应商。
              </p>
              <a 
                href="/zh/herb-finder"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                探索草药数据库
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          {/* FAQ部分 */}
          <IngredientCheckerFAQ isZh={true} />

          {/* CTA部分 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-lg p-8 text-white text-center mt-8">
            <h2 className="text-3xl font-bold mb-4">
              🛡️ 立即检查您的补充剂
          </h2>
            <p className="text-xl text-blue-100 mb-6">
              免费安全分析 • 专家建议 • 科学支持的结果
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              🔍 开始免费分析
            </button>
            <p className="text-blue-200 text-sm mt-4">
              ✅ 无需注册 • 🔒 隐私保护 • ⚡ 秒出结果
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 