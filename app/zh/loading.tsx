export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="text-center">
        {/* 旋转的草药图标 */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-t-green-600 border-r-green-600 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-4 flex items-center justify-center text-4xl">
            🌿
          </div>
        </div>

        {/* 加载文本 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Loading your herbal wisdom...
        </h2>
        <p className="text-gray-600 animate-pulse">
          🌿 Gathering the latest herb information
        </p>

        {/* 加载进度点 */}
        <div className="flex justify-center items-center space-x-2 mt-6">
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}

