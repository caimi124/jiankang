/**
 * HerbScience Blog CMS 管理界面
 * 基于 Sanity Studio 的可视化内容管理系统
 */

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function AdminPage() {
  return <NextStudio config={config} />
} 