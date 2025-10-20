/**
 * 医学审核横幅组件 - 增强E-A-T信号
 * 用于展示内容的专业审核信息，提升Google对页面的信任度
 */

import React from 'react'

interface MedicalReviewBannerProps {
  /** 审核者姓名 */
  reviewerName?: string
  /** 审核者职称 */
  reviewerTitle?: string
  /** 审核者资质 */
  reviewerCredentials?: string
  /** 最后更新日期 */
  lastUpdated?: Date
  /** 审核者链接（通常是about页面） */
  reviewerLink?: string
}

export default function MedicalReviewBanner({
  reviewerName = '曾楚平 (Zeng Chuping)',
  reviewerTitle = 'Licensed Pharmacist & TCM Expert',
  reviewerCredentials = 'Southern Medical University Graduate',
  lastUpdated = new Date(),
  reviewerLink = '/about'
}: MedicalReviewBannerProps) {
  
  const formattedDate = lastUpdated.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <svg 
            className="h-6 w-6 text-blue-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <div className="text-sm text-blue-700 font-semibold flex items-center gap-2">
            <span>✓ Medically Reviewed by</span>
            {reviewerLink ? (
              <a 
                href={reviewerLink} 
                className="hover:text-blue-900 underline"
                rel="author"
              >
                {reviewerName}
              </a>
            ) : (
              <span>{reviewerName}</span>
            )}
          </div>
          <p className="text-xs text-blue-600 mt-1">
            {reviewerTitle}
          </p>
          <p className="text-xs text-blue-500 mt-0.5">
            {reviewerCredentials}
          </p>
          <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Last Updated: {formattedDate}
          </p>
        </div>
      </div>
    </div>
  )
}

