"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Sparkles, Plus, Save, Lightbulb, LayoutTemplateIcon as Template, Zap, Copy, Wand2 } from "lucide-react"
import type { ResumeData, SectionType } from "@/types/resume"
import { getSuggestions, getTemplates } from "@/lib/suggestions"

interface SuggestionPanelProps {
  isOpen: boolean
  sectionType: SectionType | null
  sectionIndex: number | null
  resumeData: ResumeData
  onClose: () => void
  onUpdate: (data: Partial<ResumeData>) => void
}

export function SuggestionPanel({
  isOpen,
  sectionType,
  sectionIndex,
  resumeData,
  onClose,
  onUpdate,
}: SuggestionPanelProps) {
  const [formData, setFormData] = useState<any>({})
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (sectionType && isOpen) {
      // Initialize form data based on section type and index
      initializeFormData()
    }
  }, [sectionType, sectionIndex, isOpen])

  const initializeFormData = () => {
    if (!sectionType) return

    switch (sectionType) {
      case "personalInfo":
        setFormData(resumeData.personalInfo)
        break
      case "summary":
        setFormData({ summary: resumeData.summary })
        break
      case "experience":
        if (sectionIndex !== null && resumeData.experience[sectionIndex]) {
          setFormData(resumeData.experience[sectionIndex])
        } else {
          setFormData({
            position: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
            achievements: [],
          })
        }
        break
      case "education":
        if (sectionIndex !== null && resumeData.education[sectionIndex]) {
          setFormData(resumeData.education[sectionIndex])
        } else {
          setFormData({
            degree: "",
            school: "",
            year: "",
            gpa: "",
            relevant_courses: [],
          })
        }
        break
      case "skills":
        setFormData(resumeData.skills)
        break
      case "projects":
        if (sectionIndex !== null && resumeData.projects[sectionIndex]) {
          setFormData(resumeData.projects[sectionIndex])
        } else {
          setFormData({
            name: "",
            description: "",
            technologies: [],
            github: "",
            demo: "",
          })
        }
        break
    }
  }

  const handleSave = () => {
    if (!sectionType) return

    switch (sectionType) {
      case "personalInfo":
        onUpdate({ personalInfo: formData })
        break
      case "summary":
        onUpdate({ summary: formData.summary })
        break
      case "experience":
        const newExperience = [...resumeData.experience]
        if (sectionIndex !== null) {
          newExperience[sectionIndex] = formData
        } else {
          newExperience.push(formData)
        }
        onUpdate({ experience: newExperience })
        break
      case "education":
        const newEducation = [...resumeData.education]
        if (sectionIndex !== null) {
          newEducation[sectionIndex] = formData
        } else {
          newEducation.push(formData)
        }
        onUpdate({ education: newEducation })
        break
      case "skills":
        onUpdate({ skills: formData })
        break
      case "projects":
        const newProjects = [...resumeData.projects]
        if (sectionIndex !== null) {
          newProjects[sectionIndex] = formData
        } else {
          newProjects.push(formData)
        }
        onUpdate({ projects: newProjects })
        break
    }
    onClose()
  }

  const handleAIGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      if (sectionType === "summary") {
        setFormData({
          ...formData,
          summary:
            "Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams to achieve business objectives.",
        })
      }
      setIsGenerating(false)
    }, 2000)
  }

  const addSkill = (skill: string, type: "technical" | "soft") => {
    const currentSkills = formData[type] || []
    if (!currentSkills.includes(skill)) {
      setFormData({
        ...formData,
        [type]: [...currentSkills, skill],
      })
    }
  }

  const removeSkill = (skill: string, type: "technical" | "soft") => {
    const currentSkills = formData[type] || []
    setFormData({
      ...formData,
      [type]: currentSkills.filter((s: string) => s !== skill),
    })
  }

  const suggestions = sectionType ? getSuggestions(sectionType) : null
  const templates = sectionType ? getTemplates(sectionType) : null

  if (!isOpen || !sectionType) return null

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-700 shadow-2xl z-40 transform transition-transform duration-300">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
              {sectionType.replace(/([A-Z])/g, " $1").trim()}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Use templates and AI suggestions to enhance your content
          </p>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="suggestions">AI</TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="space-y-4">
                {sectionType === "personalInfo" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName || ""}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone || ""}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location || ""}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                  </div>
                )}

                {sectionType === "summary" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={formData.summary || ""}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        placeholder="Write a compelling summary of your professional background..."
                        className="min-h-[120px]"
                      />
                    </div>
                    <Button
                      onClick={handleAIGenerate}
                      disabled={isGenerating}
                      className="w-full bg-transparent"
                      variant="outline"
                    >
                      {isGenerating ? (
                        <>
                          <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {sectionType === "experience" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={formData.position || ""}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company || ""}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Tech Company Inc."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          value={formData.startDate || ""}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          placeholder="Jan 2020"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          value={formData.endDate || ""}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          placeholder="Present"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your role and achievements..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {sectionType === "skills" && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold">Technical Skills</Label>
                      <div className="flex flex-wrap gap-2 mt-2 mb-3">
                        {(formData.technical || []).map((skill: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-red-100"
                            onClick={() => removeSkill(skill, "technical")}
                          >
                            {skill} <X className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                      <Input
                        placeholder="Add technical skill..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            const value = (e.target as HTMLInputElement).value.trim()
                            if (value) {
                              addSkill(value, "technical")
                              ;(e.target as HTMLInputElement).value = ""
                            }
                          }
                        }}
                      />
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Soft Skills</Label>
                      <div className="flex flex-wrap gap-2 mt-2 mb-3">
                        {(formData.soft || []).map((skill: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer hover:bg-red-100"
                            onClick={() => removeSkill(skill, "soft")}
                          >
                            {skill} <X className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                      <Input
                        placeholder="Add soft skill..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            const value = (e.target as HTMLInputElement).value.trim()
                            if (value) {
                              addSkill(value, "soft")
                              ;(e.target as HTMLInputElement).value = ""
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="templates" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Template className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold">Quick Templates</h3>
                </div>

                {templates?.map((template, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{template.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{template.description}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setFormData({ ...formData, ...template.data })
                          }}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="suggestions" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold">Smart Suggestions</h3>
                </div>

                {suggestions?.map((suggestion, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {suggestion.category}
                          </Badge>
                          <p className="text-sm">{suggestion.text}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (sectionType === "skills") {
                              addSkill(suggestion.text, suggestion.category as "technical" | "soft")
                            }
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  className="w-full mt-4 bg-transparent"
                  variant="outline"
                >
                  {isGenerating ? (
                    <>
                      <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate More Suggestions
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-slate-700">
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
