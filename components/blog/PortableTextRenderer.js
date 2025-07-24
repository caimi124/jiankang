import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity'

export default function PortableTextRenderer({ content }) {
  const components = {
    // 自定义块样式
    block: {
      h2: ({ children }) => (
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-green-500 pl-4 py-2 my-6 bg-green-50 italic text-gray-700">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="mb-4 leading-relaxed text-gray-700">
          {children}
        </p>
      ),
    },

    // 自定义列表样式
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
          {children}
        </ol>
      ),
    },

    // 自定义列表项样式
    listItem: {
      bullet: ({ children }) => (
        <li className="ml-4">{children}</li>
      ),
      number: ({ children }) => (
        <li className="ml-4">{children}</li>
      ),
    },

    // 自定义标记样式
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-900">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic text-gray-800">{children}</em>
      ),
      underline: ({ children }) => (
        <u className="underline">{children}</u>
      ),
      'strike-through': ({ children }) => (
        <s className="line-through text-gray-500">{children}</s>
      ),
      code: ({ children }) => (
        <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      ),
      // 自定义链接样式
      link: ({ children, value }) => (
        <a
          href={value.href}
          className="text-green-600 hover:text-green-700 underline font-medium"
          target={value.href.startsWith('http') ? '_blank' : '_self'}
          rel={value.href.startsWith('http') ? 'noopener noreferrer' : ''}
        >
          {children}
        </a>
      ),
      // 草药链接样式
      herbLink: ({ children, value }) => (
        <a
          href={`/herbs/${value.herb.slug.current}`}
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium bg-green-50 hover:bg-green-100 px-2 py-1 rounded-md transition-colors"
        >
          🌿 {children}
        </a>
      ),
    },

    // 自定义类型组件
    types: {
      // 图片组件
      image: ({ value }) => (
        <figure className="my-8">
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
            <Image
              src={urlFor(value).width(800).height(600).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ),
      
      // 提示框组件
      callout: ({ value }) => {
        const { type = 'info', content } = value
        
        const styles = {
          info: 'bg-blue-50 border-blue-200 text-blue-900',
          warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
          danger: 'bg-red-50 border-red-200 text-red-900',
          success: 'bg-green-50 border-green-200 text-green-900',
        }
        
        const icons = {
          info: 'ℹ️',
          warning: '⚠️', 
          danger: '🚨',
          success: '✅',
        }
        
        return (
          <div className={`my-6 p-4 border-l-4 rounded-r-lg ${styles[type]}`}>
            <div className="flex items-start">
              <span className="text-lg mr-3 flex-shrink-0">{icons[type]}</span>
              <div className="flex-1">
                <p className="mb-0">{content}</p>
              </div>
            </div>
          </div>
        )
      },
    },
  }

  return (
    <div className="portable-text">
      <PortableText value={content} components={components} />
    </div>
  )
} 