import EnhancedHerbSearch from '../../components/EnhancedHerbSearch'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '症状搜索草药 | 智能中药推荐系统 | HerbScience',
  description: '根据症状智能匹配草药，安全检查，个性化推荐。专业的中药症状搜索引擎，帮您找到最适合的天然草药解决方案。',
  keywords: [
    '症状搜索',
    '草药推荐',
    '中药搜索',
    '安全检查',
    '个性化推荐',
    '天然草药',
    '症状匹配',
    '草药安全',
    '中医药',
    '智能搜索'
  ]
}

export default function SymptomSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <EnhancedHerbSearch />
    </div>
  )
} 