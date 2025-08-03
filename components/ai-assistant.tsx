"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  Sparkles,
  RefreshCw,
  Copy,
  Lightbulb,
  Wand2,
  MessageSquare,
  Send,
  TrendingUp,
  Target,
  CheckCircle,
} from "lucide-react"
import type { ResumeData, SectionType } from "@/types/resume"

interface AIAssistantProps {
  activeSection: SectionType
  resumeData: ResumeData
  onUpdateData: (data: Partial<ResumeData>) => void
}

interface AISuggestion {
  type: "improvement" | "content" | "keyword" | "structure"
  title: string
  description: string
  action?: () => void
}

export function AIAssistant({ activeSection, resumeData, onUpdateData }: AIAssistantProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([])
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "ai"; message: string }>>([])

  const generateSuggestions = async () => {
    setIsGenerating(true)

    // Simulate LangChain AI generation
    setTimeout(() => {
      const sectionSuggestions = getSectionSpecificSuggestions(activeSection, resumeData)
      setSuggestions(sectionSuggestions)
      setIsGenerating(false)
    }, 2000)
  }

  const getSectionSpecificSuggestions = (section: SectionType, data: ResumeData): AISuggestion[] => {
    const suggestions: Record<SectionType, AISuggestion[]> = {
      personalInfo: [
        {
          type: "improvement",
          title: "Add Professional Links",
          description: "Include your LinkedIn profile and portfolio website to increase credibility",
        },
        {
          type: "structure",
          title: "Professional Email",
          description: "Ensure your email address looks professional (avoid nicknames)",
        },
        {
          type: "keyword",
          title: "Location Optimization",
          description: "Include city and state for better local job matching",
        },
      ],
      summary: [
        {
          type: "content",
          title: "Quantify Achievements",
          description: "Add specific numbers and percentages to demonstrate impact",
          action: () => {
            const enhancedSummary = `Results-driven professional with 5+ years of experience in ${
              data.skills.technical[0] || "technology"
            }. Successfully led cross-functional teams to deliver 15+ projects, improving efficiency by 40%. Expertise in ${data.skills.technical
              .slice(0, 3)
              .join(", ")} with a proven track record of driving business growth.`
            onUpdateData({ summary: enhancedSummary })
          },
        },
        {
          type: "structure",
          title: "Power Words",
          description: "Use action verbs like 'Led', 'Developed', 'Optimized' to start sentences",
        },
        {
          type: "keyword",
          title: "Industry Keywords",
          description: "Include relevant industry terms and technologies you've worked with",
        },
      ],
      experience: [
        {
          type: "improvement",
          title: "STAR Method",
          description: "Structure descriptions using Situation, Task, Action, Result format",
        },
        {
          type: "content",
          title: "Quantifiable Results",
          description: "Add metrics: revenue increased, costs reduced, time saved, team size",
        },
        {
          type: "keyword",
          title: "Action Verbs",
          description: "Start bullet points with strong action verbs: Spearheaded, Orchestrated, Pioneered",
        },
      ],
      education: [
        {
          type: "improvement",
          title: "Relevant Coursework",
          description: "Add relevant courses, especially for recent graduates or career changers",
        },
        {
          type: "content",
          title: "Academic Achievements",
          description: "Include honors, awards, or notable projects if applicable",
        },
        {
          type: "structure",
          title: "Upload Certificates",
          description: "Add digital copies of your degrees and certificates for verification",
        },
      ],
      skills: [
        {
          type: "keyword",
          title: "Technical Stack",
          description: "Group skills by category: Frontend, Backend, Database, Tools",
          action: () => {
            const currentSkills = data.skills.technical
            const suggestedSkills = ["Git", "Agile", "REST APIs", "Testing"]
            const newSkills = [...currentSkills, ...suggestedSkills.filter((s) => !currentSkills.includes(s))]
            onUpdateData({ skills: { ...data.skills, technical: newSkills } })
          },
        },
        {
          type: "improvement",
          title: "Skill Proficiency",
          description: "Consider adding proficiency levels (Beginner, Intermediate, Advanced)",
        },
        {
          type: "structure",
          title: "Balance Skills",
          description: "Include both technical and soft skills for a well-rounded profile",
        },
      ],
      projects: [
        {
          type: "content",
          title: "Project Impact",
          description: "Describe the problem solved and the impact of your solution",
        },
        {
          type: "improvement",
          title: "Live Demos",
          description: "Include links to live demos and GitHub repositories",
        },
        {
          type: "keyword",
          title: "Technology Stack",
          description: "Clearly list all technologies and frameworks used in each project",
        },
      ],
      certifications: [
        {
          type: "improvement",
          title: "Verification Links",
          description: "Add verification URLs for digital badges and certificates",
        },
        {
          type: "content",
          title: "Expiration Dates",
          description: "Include expiration dates for time-sensitive certifications",
        },
        {
          type: "structure",
          title: "Relevance Priority",
          description: "Order certifications by relevance to your target role",
        },
      ],
    }

    return suggestions[section] || []
  }

  const generateContent = async () => {
    setIsGenerating(true)

    // Simulate content generation based on section
    setTimeout(() => {
      switch (activeSection) {
        case "summary":
          const generatedSummary = `Dynamic ${
            resumeData.skills.technical[0] || "technology"
          } professional with proven expertise in ${resumeData.skills.technical
            .slice(0, 3)
            .join(", ")}. Successfully delivered ${
            resumeData.projects.length > 0 ? `${resumeData.projects.length}+ projects` : "multiple projects"
          } while leading cross-functional teams and driving innovation. Passionate about leveraging cutting-edge technologies to solve complex business challenges and deliver exceptional user experiences.`
          onUpdateData({ summary: generatedSummary })
          break

        case "experience":
          const sampleExperience = {
            position: "Senior Software Engineer",
            company: "Tech Innovations Inc.",
            startDate: "Jan 2021",
            endDate: "Present",
            description:
              "• Led development of microservices architecture serving 100K+ daily active users\n• Implemented CI/CD pipelines reducing deployment time by 60% and improving code quality\n• Mentored 3 junior developers and conducted comprehensive code reviews\n• Collaborated with product managers to define technical requirements and project roadmaps",
            achievements: [],
          }
          onUpdateData({ experience: [...resumeData.experience, sampleExperience] })
          break

        case "skills":
          const suggestedTechnicalSkills = ["React", "Node.js", "TypeScript", "AWS", "Docker", "Git"]
          const suggestedSoftSkills = ["Leadership", "Communication", "Problem Solving", "Team Collaboration"]
          const newTechnical = [
            ...resumeData.skills.technical,
            ...suggestedTechnicalSkills.filter((s) => !resumeData.skills.technical.includes(s)),
          ]
          const newSoft = [
            ...resumeData.skills.soft,
            ...suggestedSoftSkills.filter((s) => !resumeData.skills.soft.includes(s)),
          ]
          onUpdateData({ skills: { technical: newTechnical, soft: newSoft } })
          break
      }
      setIsGenerating(false)
    }, 2000)
  }

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return

    const userMessage = chatInput.trim()
    setChatHistory((prev) => [...prev, { role: "user", message: userMessage }])
    setChatInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage, activeSection, resumeData)
      setChatHistory((prev) => [...prev, { role: "ai", message: aiResponse }])
    }, 1500)
  }

  const generateAIResponse = (message: string, section: SectionType, data: ResumeData): string => {
    const messageLower = message.toLowerCase()

    if (messageLower.includes("improve") || messageLower.includes("better")) {
      return `For your ${section} section, I recommend focusing on quantifiable achievements and using action verbs. Would you like me to generate some specific examples based on your current content?`
    }

    if (messageLower.includes("keyword") || messageLower.includes("ats")) {
      return `To improve ATS compatibility, consider adding industry-specific keywords. Based on your skills, I suggest including terms like "${
        data.skills.technical[0] || "relevant technology"
      }" and "cross-functional collaboration" in your descriptions.`
    }

    if (messageLower.includes("example") || messageLower.includes("sample")) {
      return `I can help you create compelling content for your ${section} section. Would you like me to generate a professional example based on your current information?`
    }

    return `I understand you're asking about "${message}". For your ${section} section, I recommend focusing on specific, measurable achievements that demonstrate your impact. Would you like me to provide more targeted suggestions?`
  }

  const applySuggestion = (suggestion: AISuggestion) => {
    if (suggestion.action) {
      suggestion.action()
    }
  }

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={generateSuggestions}
          disabled={isGenerating}
          size="sm"
          variant="outline"
          className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20 bg-transparent"
        >
          {isGenerating ? <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> : <Lightbulb className="w-3 h-3 mr-1" />}
          Get Tips
        </Button>
        <Button
          onClick={generateContent}
          disabled={isGenerating}
          size="sm"
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        >
          {isGenerating ? <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> : <Wand2 className="w-3 h-3 mr-1" />}
          Generate
        </Button>
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">AI Suggestions</span>
          </div>
          <ScrollArea className="max-h-48">
            <div className="space-y-2 pr-2">
              {suggestions.map((suggestion, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    suggestion.type === "improvement"
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                      : suggestion.type === "content"
                        ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                        : suggestion.type === "keyword"
                          ? "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800"
                          : "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800"
                  }`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {suggestion.type === "improvement" && <TrendingUp className="w-3 h-3 text-green-600" />}
                          {suggestion.type === "content" && <Wand2 className="w-3 h-3 text-blue-600" />}
                          {suggestion.type === "keyword" && <Target className="w-3 h-3 text-purple-600" />}
                          {suggestion.type === "structure" && <CheckCircle className="w-3 h-3 text-orange-600" />}
                          <h4 className="font-medium text-xs">{suggestion.title}</h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{suggestion.description}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => applySuggestion(suggestion)}
                        className="h-5 w-5 p-0 hover:bg-white/50 dark:hover:bg-slate-800/50"
                      >
                        {suggestion.action ? <Wand2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* AI Chat Interface */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-3 h-3 text-indigo-600" />
          <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Ask AI Assistant</span>
        </div>

        {/* Chat History */}
        {chatHistory.length > 0 && (
          <ScrollArea className="max-h-32 mb-2">
            <div className="space-y-2 pr-2">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-xs ${
                    chat.role === "user"
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 ml-4"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mr-4"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {chat.role === "ai" && <Bot className="w-3 h-3 mt-0.5 text-indigo-600" />}
                    <p className="flex-1">{chat.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="flex gap-2">
          <Textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask for help with your resume..."
            className="flex-1 min-h-[60px] text-xs resize-none border-slate-300 dark:border-slate-600"
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleChatSubmit()
              }
            }}
          />
          <Button
            onClick={handleChatSubmit}
            size="sm"
            disabled={!chatInput.trim()}
            className="self-end bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex justify-center">
        <Badge
          variant="secondary"
          className="text-xs bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        >
          <Bot className="w-3 h-3 mr-1" />
          Powered by LangChain AI
        </Badge>
      </div>
    </div>
  )
}
