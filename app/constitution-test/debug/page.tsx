import { Metadata } from 'next'
import ConstitutionTestClientDebug from '../ConstitutionTestClientDebug'

export const metadata: Metadata = {
  title: 'Constitution Test Debug | HerbScience',
  description: 'Debug version of TCM Constitution Test with detailed error tracking',
  robots: 'noindex, nofollow' // 不要被搜索引擎索引
}

/**
 * 🔬 Constitution Test 调试页面
 * 专门用于定位"Something went wrong!"错误
 * 访问路径: /constitution-test/debug
 */
export default function ConstitutionTestDebugPage() {
  return <ConstitutionTestClientDebug />
}
