import { LoadingSpinner } from '../components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 text-lg">Loading your herbal wisdom...</p>
        <div className="mt-2 text-sm text-gray-500">
          🌿 Gathering the latest herb information
        </div>
      </div>
    </div>
  )
} 