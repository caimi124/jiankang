export default function TestPage() {
  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          🌿 HerbScience Test Page
        </h1>
        <p className="text-xl text-green-600 mb-4">
          If you can see this, the server is working correctly!
        </p>
        <p className="text-gray-700">
          Now go back to <a href="/" className="text-green-600 underline">the homepage</a>
        </p>
      </div>
    </div>
  )
} 