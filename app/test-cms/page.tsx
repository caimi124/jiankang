/**
 * CMS 测试页面
 * 验证 Sanity + Notion 混合系统功能
 */

'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, RefreshCw, Database, FileText, Users } from 'lucide-react'

interface TestResult {
  name: string
  status: 'success' | 'error' | 'loading'
  message: string
  data?: any
}

export default function CMSTestPage() {
  const [tests, setTests] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    setTests([])

    const testResults: TestResult[] = []

    // 测试 1: 混合CMS健康检查
    try {
      testResults.push({ name: '混合CMS健康检查', status: 'loading', message: '检查中...' })
      setTests([...testResults])

      const response = await fetch('/api/blog/hybrid?action=health')
      const data = await response.json()

      testResults[testResults.length - 1] = {
        name: '混合CMS健康检查',
        status: data.success ? 'success' : 'error',
        message: data.message || '健康检查完成',
        data: data.health
      }
      setTests([...testResults])
    } catch (error) {
      testResults[testResults.length - 1] = {
        name: '混合CMS健康检查',
        status: 'error',
        message: '健康检查失败: ' + (error as Error).message
      }
      setTests([...testResults])
    }

    // 测试 2: 获取所有文章
    try {
      testResults.push({ name: '获取所有文章', status: 'loading', message: '获取中...' })
      setTests([...testResults])

      const response = await fetch('/api/blog/hybrid?action=all')
      const data = await response.json()

      testResults[testResults.length - 1] = {
        name: '获取所有文章',
        status: data.success ? 'success' : 'error',
        message: `找到 ${data.count || 0} 篇文章`,
        data: data.sources
      }
      setTests([...testResults])
    } catch (error) {
      testResults[testResults.length - 1] = {
        name: '获取所有文章',
        status: 'error',
        message: '获取失败: ' + (error as Error).message
      }
      setTests([...testResults])
    }

    // 测试 3: 获取特色文章
    try {
      testResults.push({ name: '获取特色文章', status: 'loading', message: '获取中...' })
      setTests([...testResults])

      const response = await fetch('/api/blog/hybrid?action=featured')
      const data = await response.json()

      testResults[testResults.length - 1] = {
        name: '获取特色文章',
        status: data.success ? 'success' : 'error',
        message: `找到 ${data.count || 0} 篇特色文章`,
        data: data.data?.map((p: any) => ({ title: p.title, source: p.source }))
      }
      setTests([...testResults])
    } catch (error) {
      testResults[testResults.length - 1] = {
        name: '获取特色文章',
        status: 'error',
        message: '获取失败: ' + (error as Error).message
      }
      setTests([...testResults])
    }

    // 测试 4: 获取单篇文章
    try {
      testResults.push({ name: '获取单篇文章', status: 'loading', message: '获取中...' })
      setTests([...testResults])

      const response = await fetch('/api/blog/hybrid?action=post&slug=turmeric-gut-relief-guide')
      const data = await response.json()

      testResults[testResults.length - 1] = {
        name: '获取单篇文章',
        status: data.success ? 'success' : 'error',
        message: data.success ? `文章: ${data.data.title} (来源: ${data.source})` : '文章未找到',
        data: data.data ? { title: data.data.title, author: data.data.author.name, source: data.source } : null
      }
      setTests([...testResults])
    } catch (error) {
      testResults[testResults.length - 1] = {
        name: '获取单篇文章',
        status: 'error',
        message: '获取失败: ' + (error as Error).message
      }
      setTests([...testResults])
    }

    setIsRunning(false)
  }

  useEffect(() => {
    runTests()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 CMS 系统测试
          </h1>
          <p className="text-gray-600 mb-6">
            验证 Sanity + Notion 混合内容管理系统
          </p>
          <button
            onClick={runTests}
            disabled={isRunning}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? '测试中...' : '重新测试'}
          </button>
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          {tests.map((test, index) => (
            <div key={index} className="bg-white rounded-lg border p-6">
              <div className="flex items-start space-x-3">
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {test.status === 'loading' && (
                    <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                  )}
                  {test.status === 'success' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {test.status === 'error' && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>

                {/* Test Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {test.name}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    test.status === 'success' ? 'text-green-600' :
                    test.status === 'error' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {test.message}
                  </p>

                  {/* Test Data */}
                  {test.data && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(test.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Setup Guide */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Database className="h-5 w-5 mr-2" />
            设置指南
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Sanity CMS 设置
              </h3>
              <ol className="mt-2 text-sm text-gray-600 list-decimal list-inside space-y-1">
                <li>运行: <code className="bg-gray-200 px-1 rounded">sanity login</code></li>
                <li>运行: <code className="bg-gray-200 px-1 rounded">sanity init</code></li>
                <li>在 .env.local 中配置项目ID和API token</li>
                <li>访问: <a href="/admin" className="text-blue-600 hover:underline">/admin</a> 管理内容</li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                使用说明
              </h3>
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Sanity: 主要CMS，提供可视化编辑界面</li>
                <li>Notion: 备用数据源，现有文章继续可用</li>
                <li>本地备份: 当其他来源不可用时的备用方案</li>
                <li>优先级: Sanity → Notion → 本地备份</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mt-8 bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            API 端点
          </h2>
          <div className="space-y-2 text-sm font-mono">
            <div>GET /api/blog/hybrid?action=all - 获取所有文章</div>
            <div>GET /api/blog/hybrid?action=post&slug=article-slug - 获取单篇文章</div>
            <div>GET /api/blog/hybrid?action=featured - 获取特色文章</div>
            <div>GET /api/blog/hybrid?action=category&category=lifestyle - 按分类获取</div>
            <div>GET /api/blog/hybrid?action=health - 系统健康检查</div>
          </div>
        </div>
      </div>
    </div>
  )
} 