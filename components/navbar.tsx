"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  FileText,
  Download,
  Eye,
  Palette,
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  Share2,
  Save,
  Briefcase,
  FileDown,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth/auth-provider"
import { ResumePreviewModal } from "@/components/resume-preview-modal"
import { FullscreenTemplateModal } from "@/components/fullscreen-template-modal"
import type { ResumeData, ResumeTemplate } from "@/types/resume"
import type { ResumeColorTheme } from "@/components/color-theme-selector"

interface NavbarProps {
  resumeData: ResumeData & { colorTheme?: ResumeColorTheme }
  selectedTemplate: ResumeTemplate
  onTemplateChange: (template: ResumeTemplate) => void
  isSidebarOpen: boolean
  onToggleSidebar: () => void
  onToggleJobMatch: () => void
}

export function Navbar({
  resumeData,
  selectedTemplate,
  onTemplateChange,
  isSidebarOpen,
  onToggleSidebar,
  onToggleJobMatch,
}: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const [showPreview, setShowPreview] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleDownloadPDF = async () => {
    // Simulate PDF generation
    const button = document.querySelector("[data-download-pdf]") as HTMLButtonElement
    if (button) {
      const originalText = button.textContent
      button.textContent = "Generating..."

      // Simulate download delay
      setTimeout(() => {
        // Create a temporary link for download
        const link = document.createElement("a")
        link.href = "/placeholder.svg?height=800&width=600&text=Resume+PDF"
        link.download = `${resumeData.personalInfo.fullName || "resume"}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        button.textContent = originalText
      }, 2000)
    }
  }

  const handleExportResume = () => {
    const dataStr = JSON.stringify(resumeData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `resume-${selectedTemplate}-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (user) {
      localStorage.setItem(`resumeData_${user.id}`, JSON.stringify(resumeData))
    }

    setIsSaving(false)

    // Show success feedback
    const button = document.querySelector("[data-save-button]") as HTMLButtonElement
    if (button) {
      const originalText = button.textContent
      button.textContent = "Saved!"
      setTimeout(() => {
        button.textContent = originalText
      }, 2000)
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm z-50">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white font-sans">Resume Builder</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans">Privacy-Preserving AI</p>
              </div>
            </div>
          </div>

          {/* Center Section - Desktop Only */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTemplateModal(true)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-sans transition-all hover:shadow-md"
            >
              <Palette className="w-4 h-4 mr-2" />
              Choose Template
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(true)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-sans transition-all hover:shadow-md"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onToggleJobMatch}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-sans transition-all hover:shadow-md"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Job Match
            </Button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Save Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              data-save-button
              className="hidden sm:flex bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-sans transition-all hover:shadow-md"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>

            {/* Download Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-sans transition-all hover:shadow-md"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg"
              >
                <DropdownMenuItem
                  onClick={handleDownloadPDF}
                  data-download-pdf
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-sans"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleExportResume}
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-sans"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                >
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg"
              >
                <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white break-words font-sans">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 break-all font-sans">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-sans">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-sans">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Resume
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-sans"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Template Badge - Desktop Only */}
            <Badge
              variant="secondary"
              className="hidden xl:flex bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-sans"
            >
              {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1).replace("-", " ")}
            </Badge>
          </div>
        </div>

        {/* Mobile Menu - Show template and preview buttons on smaller screens */}
        <div className="lg:hidden px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTemplateModal(true)}
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg font-sans text-xs"
            >
              <Palette className="w-3 h-3 mr-1" />
              Template
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(true)}
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg font-sans text-xs"
            >
              <Eye className="w-3 h-3 mr-1" />
              Preview
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onToggleJobMatch}
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg font-sans text-xs"
            >
              <Briefcase className="w-3 h-3 mr-1" />
              Jobs
            </Button>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <ResumePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        resumeData={resumeData}
        template={selectedTemplate}
      />

      <FullscreenTemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        selectedTemplate={selectedTemplate}
        onTemplateChange={onTemplateChange}
        resumeData={resumeData}
      />
    </>
  )
}
