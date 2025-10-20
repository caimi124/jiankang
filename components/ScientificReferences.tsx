/**
 * 科学参考文献组件 - 增强E-A-T信号
 * 展示权威来源，提升内容可信度
 */

import React from 'react'

interface Reference {
  /** 参考文献标题 */
  title: string
  /** 链接URL */
  url?: string
  /** 来源/出版物 */
  source?: string
  /** 是否为外部链接 */
  isExternal?: boolean
}

interface ScientificReferencesProps {
  /** 草药名称 */
  herbName: string
  /** 参考文献列表（可选，如果没有则显示通用参考） */
  references?: Reference[]
}

export default function ScientificReferences({ 
  herbName, 
  references 
}: ScientificReferencesProps) {
  
  // 默认的通用参考文献
  const defaultReferences: Reference[] = [
    {
      title: `National Center for Complementary and Integrative Health (NCCIH) - ${herbName}`,
      url: `https://www.nccih.nih.gov/health/${herbName.toLowerCase().replace(/ /g, '-')}`,
      source: 'U.S. National Institutes of Health',
      isExternal: true
    },
    {
      title: `PubMed Research Database - ${herbName} Clinical Studies`,
      url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(herbName)}`,
      source: 'U.S. National Library of Medicine',
      isExternal: true
    },
    {
      title: `Memorial Sloan Kettering Cancer Center - ${herbName} Information`,
      url: `https://www.mskcc.org/cancer-care/integrative-medicine/herbs/search?keys=${encodeURIComponent(herbName)}`,
      source: 'Memorial Sloan Kettering Cancer Center',
      isExternal: true
    },
    {
      title: `WHO Monographs on Selected Medicinal Plants`,
      source: 'World Health Organization',
      isExternal: false
    },
    {
      title: `Natural Medicines Comprehensive Database - ${herbName}`,
      source: 'Therapeutic Research Center',
      isExternal: false
    }
  ]

  const displayReferences = references || defaultReferences

  return (
    <div className="mt-12 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800">📚 Scientific References</h2>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Our information is based on peer-reviewed research and authoritative medical sources:
      </p>
      
      <ol className="list-decimal list-inside space-y-3">
        {displayReferences.map((ref, index) => (
          <li key={index} className="text-sm text-gray-700 pl-2">
            {ref.url ? (
              <a 
                href={ref.url} 
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {ref.title}
                {ref.isExternal && (
                  <svg className="inline-block h-3 w-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </a>
            ) : (
              <span className="font-medium">{ref.title}</span>
            )}
            {ref.source && (
              <span className="block text-xs text-gray-500 ml-6 mt-0.5">
                Source: {ref.source}
              </span>
            )}
          </li>
        ))}
      </ol>
      
      {/* 医疗免责声明 */}
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-semibold text-yellow-800">
              ⚠️ Medical Disclaimer
            </h3>
            <p className="text-xs text-yellow-700 mt-1">
              This information is for educational purposes only and is not intended as a substitute 
              for professional medical advice, diagnosis, or treatment. Always consult your healthcare 
              provider before starting any herbal supplement, especially if you have existing medical 
              conditions or take prescription medications.
            </p>
          </div>
        </div>
      </div>
      
      {/* 结构化数据：Citation（引用） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalWebPage',
            citation: displayReferences.filter(r => r.url).map(r => r.url)
          })
        }}
      />
    </div>
  )
}

