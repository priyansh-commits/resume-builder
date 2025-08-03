"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Palette,
  Briefcase,
  Sparkles,
  Target,
  Award,
  Download,
  Save,
} from "lucide-react"
import Image from "next/image"
import type { ResumeTemplate, ResumeData } from "@/types/resume"
import type { BackgroundTheme } from "@/components/background-color-selector"
import { getBackgroundThemeClasses } from "@/components/background-color-selector"

interface FullscreenTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  selectedTemplate: ResumeTemplate
  onTemplateChange: (template: ResumeTemplate) => void
  resumeData: ResumeData & { backgroundTheme?: BackgroundTheme }
}

const templates = [
  {
    id: "classic" as ResumeTemplate,
    name: "Classic Professional",
    description: "Traditional, clean layout perfect for corporate roles",
    icon: Briefcase,
    color: "blue",
    features: ["ATS-Friendly", "Professional", "Clean Layout"],
    bestFor: "Corporate, Finance, Legal",
    preview: "/placeholder.svg?height=400&width=300&text=Classic+Template",
  },
  {
    id: "modern" as ResumeTemplate,
    name: "Modern Minimalist",
    description: "Sleek design with subtle colors and modern typography",
    icon: Sparkles,
    color: "emerald",
    features: ["Modern Design", "Minimalist", "Typography Focus"],
    bestFor: "Tech, Design, Startups",
    preview: "/placeholder.svg?height=400&width=300&text=Modern+Template",
  },
  {
    id: "creative" as ResumeTemplate,
    name: "Creative Portfolio",
    description: "Bold design with colors and creative elements",
    icon: Palette,
    color: "purple",
    features: ["Creative Design", "Colorful", "Visual Impact"],
    bestFor: "Design, Marketing, Creative",
    preview: "/placeholder.svg?height=400&width=300&text=Creative+Template",
  },
  {
    id: "ats-optimized" as ResumeTemplate,
    name: "ATS Optimized",
    description: "Designed specifically for applicant tracking systems",
    icon: Target,
    color: "green",
    features: ["ATS-Optimized", "Keyword Friendly", "Simple Format"],
    bestFor: "Large Companies, HR Systems",
    preview: "/placeholder.svg?height=400&width=300&text=ATS+Template",
  },
  {
    id: "business" as ResumeTemplate,
    name: "Executive Business",
    description: "Professional design for senior-level positions",
    icon: Award,
    color: "blue",
    features: ["Executive Level", "Professional", "Sophisticated"],
    bestFor: "Executive, Management, Consulting",
    preview: "/placeholder.svg?height=400&width=300&text=Business+Template",
  },
]

// Sample resume data for previews
const sampleData = {
  personalInfo: {
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "https://sarahjohnson.dev",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    profileImage: "",
    gender: "female" as const,
  },
  summary:
    "Experienced software engineer with 5+ years developing scalable web applications. Passionate about creating user-friendly solutions and leading cross-functional teams.",
  experience: [
    {
      position: "Senior Software Engineer",
      company: "TechCorp Inc.",
      startDate: "Jan 2022",
      endDate: "Present",
      description:
        "Led development of microservices architecture serving 1M+ users. Mentored junior developers and improved deployment efficiency by 40%.",
    },
    {
      position: "Software Engineer",
      company: "StartupXYZ",
      startDate: "Jun 2019",
      endDate: "Dec 2021",
      description:
        "Built responsive web applications using React and Node.js. Collaborated with design team to implement pixel-perfect UI components.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      year: "2019",
      gpa: "3.8",
    },
  ],
  skills: {
    technical: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
    soft: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"],
  },
  projects: [
    {
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/sarah/ecommerce",
      demo: "https://demo.ecommerce.com",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      url: "https://aws.amazon.com/certification/",
    },
  ],
  uploadedFiles: [],
}

export function FullscreenTemplateModal({
  isOpen,
  onClose,
  selectedTemplate,
  onTemplateChange,
  resumeData,
}: FullscreenTemplateModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isApplying, setIsApplying] = useState(false)
  const [tempSelectedTemplate, setTempSelectedTemplate] = useState(selectedTemplate)

  useEffect(() => {
    const currentTemplateIndex = templates.findIndex((t) => t.id === selectedTemplate)
    if (currentTemplateIndex !== -1) {
      setCurrentIndex(currentTemplateIndex)
      setTempSelectedTemplate(selectedTemplate)
    }
  }, [selectedTemplate])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevTemplate()
      } else if (e.key === "ArrowRight") {
        nextTemplate()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("keydown", handleArrowKeys)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("keydown", handleArrowKeys)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const currentTemplate = templates[currentIndex]
  const displayData = resumeData.personalInfo.fullName ? resumeData : sampleData
  const backgroundTheme = resumeData.backgroundTheme || "white-black"
  const themeStyles = getBackgroundThemeClasses(backgroundTheme)

  const nextTemplate = () => {
    const newIndex = (currentIndex + 1) % templates.length
    setCurrentIndex(newIndex)
    setTempSelectedTemplate(templates[newIndex].id)
  }

  const prevTemplate = () => {
    const newIndex = (currentIndex - 1 + templates.length) % templates.length
    setCurrentIndex(newIndex)
    setTempSelectedTemplate(templates[newIndex].id)
  }

  const handleApplyTemplate = async () => {
    setIsApplying(true)

    // Simulate applying template
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onTemplateChange(tempSelectedTemplate)
    setIsApplying(false)
    onClose()
  }

  const handleSaveAndContinue = () => {
    onTemplateChange(tempSelectedTemplate)
    onClose()
  }

  const handleCancel = () => {
    setTempSelectedTemplate(selectedTemplate)
    const originalIndex = templates.findIndex((t) => t.id === selectedTemplate)
    if (originalIndex !== -1) {
      setCurrentIndex(originalIndex)
    }
    onClose()
  }

  const TemplatePreview = ({ template }: { template: (typeof templates)[0] }) => (
    <div className="w-full h-full overflow-hidden rounded-lg shadow-2xl bg-white">
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <div className={`resume-preview p-6 min-h-full break-words ${themeStyles.background} ${themeStyles.text}`}>
          {/* Header Section */}
          <div className={`text-center border-b-2 border-${template.color}-500 pb-6 mb-6`}>
            <div className="flex items-center justify-center mb-4">
              {displayData.personalInfo.profileImage ? (
                <Image
                  src={displayData.personalInfo.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl">{displayData.personalInfo.gender === "female" ? "👩" : "👨"}</span>
                </div>
              )}
            </div>
            <h1 className={`text-3xl font-bold mb-3 ${themeStyles.accent} break-words max-w-full`}>
              {displayData.personalInfo.fullName}
            </h1>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 max-w-full">
              {displayData.personalInfo.email && (
                <span className="break-all max-w-full">{displayData.personalInfo.email}</span>
              )}
              {displayData.personalInfo.phone && <span>{displayData.personalInfo.phone}</span>}
              {displayData.personalInfo.location && (
                <span className="break-words max-w-full">{displayData.personalInfo.location}</span>
              )}
            </div>
          </div>

          {/* Summary Section */}
          {displayData.summary && (
            <div className="mb-6">
              <h2
                className={`text-xl font-bold mb-3 ${themeStyles.accent} border-l-4 border-${template.color}-400 pl-3`}
              >
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed break-words max-w-full">{displayData.summary}</p>
            </div>
          )}

          {/* Experience Section */}
          {displayData.experience.length > 0 && (
            <div className="mb-6">
              <h2
                className={`text-xl font-bold mb-4 ${themeStyles.accent} border-l-4 border-${template.color}-400 pl-3`}
              >
                Work Experience
              </h2>
              <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                {displayData.experience.slice(0, 2).map((exp, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-gray-200">
                    <div
                      className={`absolute -left-2 top-2 w-4 h-4 bg-${template.color}-500 rounded-full border-2 border-white`}
                    ></div>
                    <h3 className="text-lg font-semibold text-gray-900 break-words max-w-full">{exp.position}</h3>
                    <p className={`${themeStyles.accent} font-medium break-words max-w-full`}>{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="text-gray-700 leading-relaxed break-words max-w-full">
                      {exp.description.substring(0, 150)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {(displayData.skills.technical.length > 0 || displayData.skills.soft.length > 0) && (
            <div className="mb-6">
              <h2
                className={`text-xl font-bold mb-4 ${themeStyles.accent} border-l-4 border-${template.color}-400 pl-3`}
              >
                Skills
              </h2>
              <div className="space-y-3">
                {displayData.skills.technical.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2 max-w-full">
                      {displayData.skills.technical.slice(0, 6).map((skill, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 bg-${template.color}-100 text-${template.color}-700 rounded text-sm font-medium break-words`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Education Section */}
          {displayData.education.length > 0 && (
            <div className="mb-6">
              <h2
                className={`text-xl font-bold mb-4 ${themeStyles.accent} border-l-4 border-${template.color}-400 pl-3`}
              >
                Education
              </h2>
              <div className="space-y-3">
                {displayData.education.slice(0, 2).map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900 break-words max-w-full">{edu.degree}</h3>
                    <p className={`${themeStyles.accent} break-words max-w-full`}>{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-7xl h-[90vh] shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg bg-${currentTemplate.color}-100 dark:bg-${currentTemplate.color}-900/30`}>
              <currentTemplate.icon
                className={`w-6 h-6 text-${currentTemplate.color}-600 dark:text-${currentTemplate.color}-400`}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentTemplate.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 break-words max-w-md">{currentTemplate.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentIndex + 1} of {templates.length}
              </span>
              <div className="flex gap-1">
                {templates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setTempSelectedTemplate(templates[index].id)
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100%-140px)]">
          {/* Navigation */}
          <Button
            variant="ghost"
            size="lg"
            onClick={prevTemplate}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full w-12 h-12 p-0 text-gray-700 dark:text-gray-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={nextTemplate}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full w-12 h-12 p-0 text-gray-700 dark:text-gray-300"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Template Preview */}
          <div className="flex-1 p-6 overflow-hidden">
            <div className="h-full max-w-full overflow-hidden">
              <TemplatePreview template={currentTemplate} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Template Features</h3>
                  <div className="space-y-2">
                    {currentTemplate.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="mr-2 mb-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Best For</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm break-words">{currentTemplate.bestFor}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">All Templates</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {templates.map((template, index) => (
                      <button
                        key={template.id}
                        onClick={() => {
                          setCurrentIndex(index)
                          setTempSelectedTemplate(template.id)
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors break-words template-card ${
                          index === currentIndex
                            ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 selected"
                            : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <template.icon
                            className={`w-4 h-4 text-${template.color}-600 dark:text-${template.color}-400 flex-shrink-0`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                              {template.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{template.bestFor}</p>
                          </div>
                          {tempSelectedTemplate === template.id && (
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0 success-checkmark" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sample Resume Notice */}
                {!resumeData.personalInfo.fullName && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      <strong>Preview Mode:</strong> Showing sample data. Your actual resume data will be used when you
                      apply the template.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Cancel
            </Button>

            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Preview
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {selectedTemplate === tempSelectedTemplate ? (
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2">
                <Check className="w-4 h-4 mr-2" />
                Currently Selected
              </Badge>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleApplyTemplate}
                  disabled={isApplying}
                  className={`bg-${currentTemplate.color}-600 hover:bg-${currentTemplate.color}-700 text-white px-6 py-2 transition-all duration-200`}
                >
                  {isApplying ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 loading-spinner"></div>
                      Applying...
                    </>
                  ) : (
                    "Apply Template"
                  )}
                </Button>

                <Button
                  onClick={handleSaveAndContinue}
                  variant="outline"
                  className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save & Continue
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
