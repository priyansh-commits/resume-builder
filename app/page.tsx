"use client"

export const dynamic = "force-dynamic" // prevent prerender crash at build time

import { useState, useEffect, useRef } from "react"
import { ResumeCanvas } from "@/components/resume-canvas"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { JobMatchPanel } from "@/components/job-match-panel"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider, useAuth } from "@/components/auth/auth-provider"
import { LoginForm } from "@/components/auth/login-form"
import type { ResumeData, SectionType, ResumeTemplate } from "@/types/resume"
import type { BackgroundTheme } from "@/components/background-color-selector"
import html2pdf from "html2pdf.js"

function ResumeEditor() {
  const { user, loading } = useAuth()
  const resumeRef = useRef<HTMLDivElement>(null)
  const [resumeData, setResumeData] = useState<ResumeData & { backgroundTheme?: BackgroundTheme }>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      profileImage: "",
      gender: "male",
    },
    summary: "",
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
    },
    projects: [],
    certifications: [],
    uploadedFiles: [],
    backgroundTheme: "white-black",
  })

  const [activeSection, setActiveSection] = useState<SectionType>("personalInfo")
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>("classic")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isJobMatchOpen, setIsJobMatchOpen] = useState(false)

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`resumeData_${user.id}`)
      if (saved) {
        try {
          const parsedData = JSON.parse(saved)
          setResumeData(parsedData)
        } catch (error) {
          console.error("Failed to load saved data:", error)
        }
      }
    }
  }, [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`resumeData_${user.id}`, JSON.stringify(resumeData))
    }
  }, [resumeData, user])

  const updateResumeData = (newData: Partial<ResumeData & { backgroundTheme?: BackgroundTheme }>) => {
    setResumeData((prev) => ({ ...prev, ...newData }))
  }

  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section)
  }

  const handleTemplateChange = (template: ResumeTemplate) => {
    setSelectedTemplate(template)
  }

  const handleBackgroundThemeChange = (theme: BackgroundTheme) => {
    updateResumeData({ backgroundTheme: theme })
  }

  const handleDownload = () => {
    if (resumeRef.current) {
      html2pdf()
        .set({
          margin: 0,
          filename: "resume.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .from(resumeRef.current)
        .save()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return <LoginForm />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 overflow-hidden">
      <Navbar
        resumeData={resumeData}
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onToggleJobMatch={() => setIsJobMatchOpen(!isJobMatchOpen)}
        onDownloadClick={handleDownload}
      />

      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-80" : "w-0"
          } overflow-hidden bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700`}
        >
          <Sidebar
            isOpen={isSidebarOpen}
            activeSection={activeSection}
            resumeData={resumeData}
            onSectionChange={handleSectionChange}
            onUpdateData={updateResumeData}
            onBackgroundThemeChange={handleBackgroundThemeChange}
          />
        </div>

        <div className={`flex-1 transition-all duration-300 overflow-hidden ${isJobMatchOpen ? "mr-96" : ""}`}>
          <div className="light-only h-full">
            <ResumeCanvas
              resumeData={resumeData}
              template={selectedTemplate}
              activeSection={activeSection}
              onSectionClick={handleSectionChange}
              resumeRef={resumeRef}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${
            isJobMatchOpen ? "w-96" : "w-0"
          } overflow-hidden bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700`}
        >
          <JobMatchPanel
            isOpen={isJobMatchOpen}
            resumeData={resumeData}
            onClose={() => setIsJobMatchOpen(false)}
            onUpdateData={updateResumeData}
          />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeEditor />
      </AuthProvider>
    </ThemeProvider>
  )
}
