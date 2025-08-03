"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Eye, Palette, Sparkles, Briefcase, Zap, Target, Award } from "lucide-react"
import type { ResumeTemplate, ResumeData } from "@/types/resume"

interface TemplateSelectorProps {
  selectedTemplate: ResumeTemplate
  onTemplateChange: (template: ResumeTemplate) => void
  resumeData: ResumeData
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
    preview: "bg-white border-2 border-gray-900",
  },
  {
    id: "modern" as ResumeTemplate,
    name: "Modern Minimalist",
    description: "Sleek design with subtle colors and modern typography",
    icon: Sparkles,
    color: "indigo",
    features: ["Modern Design", "Minimalist", "Typography Focus"],
    bestFor: "Tech, Design, Startups",
    preview: "bg-gradient-to-br from-gray-50 to-gray-100",
  },
  {
    id: "creative" as ResumeTemplate,
    name: "Creative Portfolio",
    description: "Bold design with colors and creative elements",
    icon: Palette,
    color: "purple",
    features: ["Creative Design", "Colorful", "Visual Impact"],
    bestFor: "Design, Marketing, Creative",
    preview: "bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50",
  },
  {
    id: "ats-optimized" as ResumeTemplate,
    name: "ATS Optimized",
    description: "Designed specifically for applicant tracking systems",
    icon: Target,
    color: "green",
    features: ["ATS-Optimized", "Keyword Friendly", "Simple Format"],
    bestFor: "Large Companies, HR Systems",
    preview: "bg-white border border-black",
  },
  {
    id: "business" as ResumeTemplate,
    name: "Executive Business",
    description: "Professional design for senior-level positions",
    icon: Award,
    color: "blue",
    features: ["Executive Level", "Professional", "Sophisticated"],
    bestFor: "Executive, Management, Consulting",
    preview: "bg-gradient-to-br from-blue-50 to-indigo-50",
  },
]

export function TemplateSelector({ selectedTemplate, onTemplateChange, resumeData }: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null)

  const handleTemplateSelect = (templateId: ResumeTemplate) => {
    onTemplateChange(templateId)
  }

  const TemplatePreview = ({ template }: { template: (typeof templates)[0] }) => (
    <div className={`w-full h-64 rounded-lg ${template.preview} p-4 overflow-hidden relative`}>
      {/* Mock Resume Content */}
      <div className="space-y-3">
        <div className="text-center border-b border-gray-300 pb-2">
          <h3 className="font-bold text-lg text-gray-900">{resumeData.personalInfo.fullName || "John Doe"}</h3>
          <p className="text-sm text-gray-600">{resumeData.personalInfo.email || "john.doe@example.com"}</p>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-gray-800 mb-1">Professional Summary</h4>
          <p className="text-xs text-gray-600 line-clamp-2">
            {resumeData.summary || "Experienced professional with expertise in multiple domains..."}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-gray-800 mb-1">Experience</h4>
          <div className="text-xs text-gray-600">
            <p className="font-medium">Senior Developer</p>
            <p>Tech Company • 2020-Present</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-gray-800 mb-1">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {(resumeData.skills.technical.slice(0, 3) || ["JavaScript", "React", "Node.js"]).map((skill, index) => (
              <span key={index} className="text-xs bg-gray-200 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Template-specific styling overlay */}
      {template.id === "creative" && (
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
      )}
      {template.id === "business" && (
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Resume Template</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select a professional template that matches your industry and style
        </p>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
          {templates.map((template) => {
            const IconComponent = template.icon
            const isSelected = selectedTemplate === template.id

            return (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected
                    ? `ring-2 ring-${template.color}-500 shadow-lg bg-${template.color}-50 dark:bg-${template.color}-900/20`
                    : "hover:shadow-md bg-white dark:bg-gray-800"
                } border-gray-200 dark:border-gray-700`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg bg-${template.color}-100 dark:bg-${template.color}-900/30`}>
                        <IconComponent
                          className={`w-4 h-4 text-${template.color}-600 dark:text-${template.color}-400`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold text-gray-900 dark:text-white">
                          {template.name}
                        </CardTitle>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{template.bestFor}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className={`p-1 rounded-full bg-${template.color}-500`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <TemplatePreview template={template} />

                  <div className="mt-4 space-y-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400">{template.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                            onClick={(e) => {
                              e.stopPropagation()
                              setPreviewTemplate(template.id)
                            }}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                          <DialogHeader>
                            <DialogTitle className="text-gray-900 dark:text-white">
                              {template.name} - Full Preview
                            </DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-[60vh]">
                            <div className="p-4">
                              <div className={`w-full min-h-[800px] ${template.preview} p-8 rounded-lg`}>
                                {/* Full resume preview would go here */}
                                <div className="text-center text-gray-500 dark:text-gray-400 py-20">
                                  <IconComponent className="w-16 h-16 mx-auto mb-4" />
                                  <p>Full resume preview with your data would appear here</p>
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        className={`flex-1 ${
                          isSelected
                            ? `bg-${template.color}-600 hover:bg-${template.color}-700`
                            : `bg-${template.color}-600 hover:bg-${template.color}-700`
                        } text-white`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTemplateSelect(template.id)
                        }}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Selected
                          </>
                        ) : (
                          <>
                            <Zap className="w-3 h-3 mr-1" />
                            Use Template
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
