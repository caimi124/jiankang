import Link from 'next/link'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">🧪 Test Page</h1>
        <p className="text-gray-600 mb-6">This is a test page for development purposes.</p>
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
} 