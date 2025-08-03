"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  X,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Search,
  Sparkles,
  RefreshCw,
  Star,
  Award,
  Brain,
} from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface JobMatchPanelProps {
  isOpen: boolean
  resumeData: ResumeData
  onClose: () => void
  onUpdateData: (data: Partial<ResumeData>) => void
}

interface JobMatchResult {
  score: number
  level: "strong" | "medium" | "weak"
  missingSkills: string[]
  matchingSkills: string[]
  recommendations: string[]
  keywordSuggestions: string[]
  sectionsToImprove: string[]
}

export function JobMatchPanel({ isOpen, resumeData, onClose, onUpdateData }: JobMatchPanelProps) {
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null)

  const analyzeJobMatch = async () => {
    if (!jobTitle.trim()) return

    setIsAnalyzing(true)

    // Simulate LangChain AI analysis
    setTimeout(() => {
      const mockAnalysis = generateMockAnalysis(jobTitle, resumeData)
      setMatchResult(mockAnalysis)
      setIsAnalyzing(false)
    }, 3000)
  }

  const generateMockAnalysis = (title: string, resume: ResumeData): JobMatchResult => {
    const jobTitleLower = title.toLowerCase()
    const allSkills = [...resume.skills.technical, ...resume.skills.soft]

    const jobSkillMap: Record<string, string[]> = {
      "frontend developer": ["react", "javascript", "typescript", "html", "css", "vue", "angular"],
      "backend developer": ["node.js", "python", "java", "sql", "mongodb", "express", "api"],
      "full stack developer": ["react", "node.js", "javascript", "typescript", "sql", "mongodb"],
      "data scientist": ["python", "machine learning", "sql", "pandas", "numpy", "tensorflow"],
      "product manager": ["leadership", "communication", "project management", "analytics"],
      "software engineer": ["javascript", "python", "java", "git", "problem solving"],
      "devops engineer": ["docker", "kubernetes", "aws", "ci/cd", "linux", "terraform"],
    }

    const requiredSkills = Object.entries(jobSkillMap).find(([key]) => jobTitleLower.includes(key))?.[1] || [
      "communication",
      "problem solving",
      "teamwork",
    ]

    const matchingSkills = allSkills.filter((skill) =>
      requiredSkills.some((req) => skill.toLowerCase().includes(req.toLowerCase())),
    )

    const missingSkills = requiredSkills.filter(
      (req) => !allSkills.some((skill) => skill.toLowerCase().includes(req.toLowerCase())),
    )

    const score = Math.max(20, Math.min(95, (matchingSkills.length / requiredSkills.length) * 100))
    const level = score >= 80 ? "strong" : score >= 50 ? "medium" : "weak"

    return {
      score: Math.round(score),
      level,
      missingSkills: missingSkills.slice(0, 5),
      matchingSkills: matchingSkills.slice(0, 8),
      recommendations: [
        `Add ${missingSkills[0] || "relevant skills"} to your skills section`,
        `Highlight ${jobTitleLower} experience in your summary`,
        "Include quantifiable achievements in your experience",
        "Add relevant projects that demonstrate your expertise",
      ],
      keywordSuggestions: [...requiredSkills.slice(0, 3), "agile", "collaboration", "problem-solving"],
      sectionsToImprove: score < 70 ? ["skills", "experience", "projects"] : ["summary"],
    }
  }

  const applyRecommendation = (recommendation: string) => {
    console.log("Applying recommendation:", recommendation)
  }

  const addSuggestedKeyword = (keyword: string) => {
    const currentTechnical = resumeData.skills.technical
    if (!currentTechnical.includes(keyword)) {
      onUpdateData({
        skills: {
          ...resumeData.skills,
          technical: [...currentTechnical, keyword],
        },
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-slate-200/60 dark:border-slate-700/60 shadow-xl z-40 flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-6 border-b border-slate-200/60 dark:border-slate-700/60 z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Job Match AI
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Analyze how well your resume matches specific job roles
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Job Input */}
          <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-600" />
                Target Job Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <Label htmlFor="jobTitle" className="text-sm font-medium">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Frontend Developer, Product Manager"
                  className="mt-1 border-purple-300 focus:border-purple-500"
                />
              </div>

              <div>
                <Label htmlFor="jobDescription" className="text-sm font-medium">
                  Job Description (Optional)
                </Label>
                <Textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job description for more accurate analysis..."
                  className="mt-1 min-h-[80px] border-purple-300 focus:border-purple-500 resize-none"
                />
              </div>

              <Button
                onClick={analyzeJobMatch}
                disabled={!jobTitle.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze Job Match
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Match Results */}
          {matchResult && (
            <div className="space-y-4">
              {/* Score Card */}
              <Card
                className={`border-2 ${
                  matchResult.level === "strong"
                    ? "border-green-300 bg-green-50 dark:bg-green-900/20"
                    : matchResult.level === "medium"
                      ? "border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20"
                      : "border-red-300 bg-red-50 dark:bg-red-900/20"
                }`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    {matchResult.level === "strong" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : matchResult.level === "medium" ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    Job Fit Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{matchResult.score}%</span>
                      <Badge
                        className={
                          matchResult.level === "strong"
                            ? "bg-green-100 text-green-800"
                            : matchResult.level === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {matchResult.level === "strong"
                          ? "✅ Strong Fit"
                          : matchResult.level === "medium"
                            ? "⚠️ Medium Fit"
                            : "❌ Weak Fit"}
                      </Badge>
                    </div>
                    <Progress
                      value={matchResult.score}
                      className={`h-2 ${
                        matchResult.level === "strong"
                          ? "bg-green-200"
                          : matchResult.level === "medium"
                            ? "bg-yellow-200"
                            : "bg-red-200"
                      }`}
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {matchResult.level === "strong"
                        ? "Excellent match! Your resume aligns well with this role."
                        : matchResult.level === "medium"
                          ? "Good potential. Some improvements needed."
                          : "Significant gaps identified. Consider skill development."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Matching Skills */}
              {matchResult.matchingSkills.length > 0 && (
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Matching Skills ({matchResult.matchingSkills.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {matchResult.matchingSkills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Missing Skills */}
              {matchResult.missingSkills.length > 0 && (
                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      Missing Skills ({matchResult.missingSkills.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {matchResult.missingSkills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-red-300 text-red-700 dark:border-red-600 dark:text-red-400 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => addSuggestedKeyword(skill)}
                        >
                          + {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                      Click to add missing skills to your resume
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* AI Recommendations */}
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {matchResult.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      >
                        <p className="text-sm text-blue-800 dark:text-blue-200 flex-1">{rec}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => applyRecommendation(rec)}
                          className="ml-2 h-6 w-6 p-0 text-blue-600 hover:bg-blue-200 dark:hover:bg-blue-800"
                        >
                          <Sparkles className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Keyword Suggestions */}
              {matchResult.keywordSuggestions.length > 0 && (
                <Card className="border-indigo-200 dark:border-indigo-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-indigo-600" />
                      Suggested Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {matchResult.keywordSuggestions.map((keyword, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          onClick={() => addSuggestedKeyword(keyword)}
                          className="h-7 px-3 text-xs border-indigo-300 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-600 dark:text-indigo-400 dark:hover:bg-indigo-900/20 bg-transparent"
                        >
                          + {keyword}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2">
                      Add these keywords to improve ATS compatibility
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Sections to Improve */}
              {matchResult.sectionsToImprove.length > 0 && (
                <Card className="border-orange-200 dark:border-orange-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      Priority Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {matchResult.sectionsToImprove.map((section, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="mr-2 border-orange-300 text-orange-700 dark:border-orange-600 dark:text-orange-400"
                        >
                          📝 {section.charAt(0).toUpperCase() + section.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* LangChain Attribution */}
          <div className="text-center pb-4">
            <Badge variant="outline" className="text-xs">
              <Brain className="w-3 h-3 mr-1" />
              Powered by LangChain AI
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
