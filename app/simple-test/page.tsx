'use client'

import { useState } from 'react'

export default function SimpleTest() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('等待JavaScript加载...')

  // 在客户端执行时会运行
  if (typeof window !== 'undefined' && message === '等待JavaScript加载...') {
    setMessage('✅ JavaScript正常工作！')
  }

  const handleClick = () => {
    setCount(count + 1)
    console.log('按钮点击成功！点击次数:', count + 1)
    alert(`按钮点击成功！这是第 ${count + 1} 次点击`)
  }

  const testNavigation = () => {
    console.log('测试页面跳转')
    window.location.href = '/constitution-test'
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f9ff',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#1f2937'
        }}>
          🔧 极简测试页面
        </h1>

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>JavaScript状态</h2>
          <div style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: message.includes('✅') ? '#d1fae5' : '#fee2e2',
            color: message.includes('✅') ? '#065f46' : '#991b1b',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>
            {message}
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>事件测试</h2>
          
          <button
            onClick={handleClick}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              marginRight: '1rem',
              marginBottom: '1rem'
            }}
          >
            🎯 点击测试 (次数: {count})
          </button>

          <button
            onClick={testNavigation}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            🚀 跳转到体质测试
          </button>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>HTML链接备用</h2>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="/constitution-test"
              style={{
                backgroundColor: '#f97316',
                color: 'white',
                padding: '0.75rem 1.5rem',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '500'
              }}
            >
              🔗 体质测试
            </a>
            <a 
              href="/herb-finder"
              style={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                padding: '0.75rem 1.5rem',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '500'
              }}
            >
              🌿 草药查找
            </a>
            <a 
              href="/"
              style={{
                backgroundColor: '#6b7280',
                color: 'white',
                padding: '0.75rem 1.5rem',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '500'
              }}
            >
              🏠 首页
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}