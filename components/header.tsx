import { Shield, Sparkles } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-3">
          <div className="relative">
            <div className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Privacy-First Resume Builder
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Build professional resumes with advanced privacy protection
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
