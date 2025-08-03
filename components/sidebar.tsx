"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Award,
  Bot,
  Sparkles,
  ChevronRight,
  CheckCircle,
  Circle,
  ChevronLeft,
} from "lucide-react"
import { PersonalInfoSection } from "@/components/sections/personal-info-section"
import { SummarySection } from "@/components/sections/summary-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { EducationSection } from "@/components/sections/education-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { AIAssistant } from "@/components/ai-assistant"
import { ColorThemeSelector, type ResumeColorTheme } from "@/components/color-theme-selector"
import { BackgroundColorSelector, type BackgroundTheme } from "@/components/background-color-selector"
import type { ResumeData, SectionType } from "@/types/resume"

interface SidebarProps {
  isOpen: boolean
  activeSection: SectionType
  resumeData: ResumeData & { colorTheme?: ResumeColorTheme; backgroundTheme?: BackgroundTheme }
  onSectionChange: (section: SectionType) => void
  onUpdateData: (
    data: Partial<ResumeData & { colorTheme?: ResumeColorTheme; backgroundTheme?: BackgroundTheme }>,
  ) => void
  onBackgroundThemeChange?: (theme: BackgroundTheme) => void
}

const sectionConfig = [
  {
    id: "personalInfo" as SectionType,
    label: "Personal Info",
    icon: User,
    color: "blue",
    description: "Contact details & links",
  },
  {
    id: "summary" as SectionType,
    label: "Professional Summary",
    icon: FileText,
    color: "indigo",
    description: "Career overview",
  },
  {
    id: "experience" as SectionType,
    label: "Work Experience",
    icon: Briefcase,
    color: "purple",
    description: "Employment history",
  },
  {
    id: "education" as SectionType,
    label: "Education",
    icon: GraduationCap,
    color: "green",
    description: "Academic background",
  },
  {
    id: "skills" as SectionType,
    label: "Skills",
    icon: Code,
    color: "orange",
    description: "Technical & soft skills",
  },
  {
    id: "projects" as SectionType,
    label: "Projects",
    icon: FolderOpen,
    color: "teal",
    description: "Portfolio projects",
  },
  {
    id: "certifications" as SectionType,
    label: "Certifications",
    icon: Award,
    color: "rose",
    description: "Professional certificates",
  },
]

export function Sidebar({
  isOpen,
  activeSection,
  resumeData,
  onSectionChange,
  onUpdateData,
  onBackgroundThemeChange,
}: SidebarProps) {
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const activeSectionRef = useRef<HTMLDivElement>(null)

  // Scroll to active section when it changes
  useEffect(() => {
    if (activeSectionRef.current) {
      activeSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }, [activeSection])

  const renderActiveSection = () => {
    switch (activeSection) {
      case "personalInfo":
        return (
          <PersonalInfoSection
            data={resumeData.personalInfo}
            onUpdate={(data) => onUpdateData({ personalInfo: data })}
          />
        )
      case "summary":
        return <SummarySection data={resumeData.summary} onUpdate={(summary) => onUpdateData({ summary })} />
      case "experience":
        return (
          <ExperienceSection data={resumeData.experience} onUpdate={(experience) => onUpdateData({ experience })} />
        )
      case "education":
        return (
          <EducationSection
            data={resumeData.education}
            uploadedFiles={resumeData.uploadedFiles}
            onUpdate={(education) => onUpdateData({ education })}
            onUpdateFiles={(uploadedFiles) => onUpdateData({ uploadedFiles })}
          />
        )
      case "skills":
        return <SkillsSection data={resumeData.skills} onUpdate={(skills) => onUpdateData({ skills })} />
      case "projects":
        return <ProjectsSection data={resumeData.projects} onUpdate={(projects) => onUpdateData({ projects })} />
      case "certifications":
        return (
          <CertificationsSection
            data={resumeData.certifications}
            onUpdate={(certifications) => onUpdateData({ certifications })}
          />
        )
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Select a section to edit</p>
          </div>
        )
    }
  }

  const handleSectionClick = (sectionId: SectionType) => {
    console.log("Sidebar button clicked:", sectionId)
    onSectionChange(sectionId)
  }

  const handleBackgroundThemeChange = (theme: BackgroundTheme) => {
    onUpdateData({ backgroundTheme: theme })
    if (onBackgroundThemeChange) {
      onBackgroundThemeChange(theme)
    }
  }

  const getCompletionStatus = (sectionId: SectionType) => {
    switch (sectionId) {
      case "personalInfo":
        const personalFields = Object.values(resumeData.personalInfo || {}).filter(Boolean)
        return {
          completed: personalFields.length >= 3,
          count: personalFields.length,
          total: 6,
        }
      case "summary":
        return {
          completed: (resumeData.summary || "").length > 50,
          count: resumeData.summary ? 1 : 0,
          total: 1,
        }
      case "experience":
        return {
          completed: (resumeData.experience || []).length > 0,
          count: (resumeData.experience || []).length,
          total: null,
        }
      case "education":
        return {
          completed: (resumeData.education || []).length > 0,
          count: (resumeData.education || []).length,
          total: null,
        }
      case "skills":
        const skillCount = (resumeData.skills?.technical || []).length + (resumeData.skills?.soft || []).length
        return {
          completed: skillCount >= 5,
          count: skillCount,
          total: null,
        }
      case "projects":
        return {
          completed: (resumeData.projects || []).length > 0,
          count: (resumeData.projects || []).length,
          total: null,
        }
      case "certifications":
        return {
          completed: (resumeData.certifications || []).length > 0,
          count: (resumeData.certifications || []).length,
          total: null,
        }
      default:
        return { completed: false, count: 0, total: null }
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 shadow-xl z-40 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-80"
      }`}
    >
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute -right-3 top-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-md hover:shadow-lg transition-all text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>

      {/* AI Assistant Toggle - Sticky Header */}
      {!isCollapsed && (
        <div className="sticky top-0 bg-white dark:bg-gray-900 backdrop-blur-xl p-4 border-b border-gray-200 dark:border-gray-700 z-10">
          <Button
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className={`w-full justify-start gap-3 transition-all duration-300 ${
              showAIAssistant
                ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
            variant={showAIAssistant ? "default" : "ghost"}
          >
            <Bot className="w-4 h-4" />
            AI Assistant
            <div className="ml-auto flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {showAIAssistant && <ChevronRight className="w-3 h-3 rotate-90 transition-transform" />}
            </div>
          </Button>
        </div>
      )}

      {/* Collapsed Navigation */}
      {isCollapsed && (
        <div className="p-2 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {sectionConfig.map((section) => {
            const isActive = activeSection === section.id
            const status = getCompletionStatus(section.id)
            const IconComponent = section.icon

            return (
              <Button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                variant="ghost"
                size="sm"
                className={`w-full p-2 h-10 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
                title={section.label}
              >
                <div className="relative">
                  <IconComponent className="w-4 h-4" />
                  {status.completed && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </Button>
            )
          })}
        </div>
      )}

      {/* Expanded Sidebar Content */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="p-4 space-y-4">
            {/* Section Navigation */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2 sticky top-0 bg-white dark:bg-gray-900 backdrop-blur-xl py-2 z-10">
                <FileText className="w-4 h-4" />
                Resume Sections
              </h3>

              {sectionConfig.map((section) => {
                const isActive = activeSection === section.id
                const status = getCompletionStatus(section.id)
                const IconComponent = section.icon

                return (
                  <Button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    variant="ghost"
                    className={`w-full justify-start gap-3 h-auto p-4 transition-all duration-300 ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300 shadow-md transform scale-[1.02]"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-sm hover:scale-[1.01]"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-blue-500 text-white shadow-lg"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm truncate">{section.label}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {status.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                          )}
                          {status.count > 0 && (
                            <Badge
                              variant="secondary"
                              className={`text-xs px-2 py-0.5 ${
                                isActive
                                  ? "bg-blue-200 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200"
                                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {status.count}
                              {status.total && `/${status.total}`}
                            </Badge>
                          )}
                          <ChevronRight
                            className={`w-3 h-3 transition-transform duration-300 ${isActive ? "rotate-90" : ""}`}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{section.description}</p>
                    </div>
                  </Button>
                )
              })}
            </div>

            <Separator className="my-6 bg-gray-200 dark:bg-gray-700" />

            {/* Background Color Theme Selector */}
            <BackgroundColorSelector
              selectedTheme={resumeData.backgroundTheme || "white-black"}
              onThemeChange={handleBackgroundThemeChange}
            />

            <Separator className="my-6 bg-gray-200 dark:bg-gray-700" />

            {/* Resume Color Theme Selector */}
            <ColorThemeSelector
              selectedTheme={resumeData.colorTheme || "classic-blue"}
              onThemeChange={(colorTheme) => onUpdateData({ colorTheme })}
            />

            {/* AI Assistant Panel */}
            {showAIAssistant && (
              <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2 text-gray-900 dark:text-white">
                    <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    AI Assistant
                    <Badge
                      variant="outline"
                      className="text-xs ml-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    >
                      LangChain
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <AIAssistant activeSection={activeSection} resumeData={resumeData} onUpdateData={onUpdateData} />
                </CardContent>
              </Card>
            )}

            {/* Active Section Content - Top Aligned */}
            <div ref={activeSectionRef}>
              <Card className="border-gray-200 dark:border-gray-700 shadow-lg sticky top-0 bg-white dark:bg-gray-900 z-10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2 text-gray-900 dark:text-white">
                    {(() => {
                      const config = sectionConfig.find((s) => s.id === activeSection)
                      const IconComponent = config?.icon || FileText
                      const status = getCompletionStatus(activeSection)
                      return (
                        <>
                          <div className="p-1.5 rounded-md bg-blue-500 text-white shadow-sm">
                            <IconComponent className="w-3 h-3" />
                          </div>
                          <span className="truncate">Edit {config?.label}</span>
                          {status.completed && <CheckCircle className="w-4 h-4 text-green-500 ml-auto flex-shrink-0" />}
                        </>
                      )
                    })()}
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Section Content - Scrollable */}
              <Card className="border-gray-200 dark:border-gray-700 shadow-lg mt-2 bg-white dark:bg-gray-900">
                <CardContent className="p-4">
                  <div className="max-h-[60vh] overflow-y-auto pr-2 break-words scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {renderActiveSection()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
