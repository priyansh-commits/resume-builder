"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X, Code, Heart, Sparkles } from "lucide-react"
import type { Skills } from "@/types/resume"

interface SkillsSectionProps {
  data: Skills
  onUpdate: (data: Skills) => void
}

const technicalSkillSuggestions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "SQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
  "HTML/CSS",
  "Vue.js",
  "Angular",
  "Express.js",
  "PostgreSQL",
]

const softSkillSuggestions = [
  "Leadership",
  "Communication",
  "Problem Solving",
  "Team Collaboration",
  "Project Management",
  "Critical Thinking",
  "Adaptability",
  "Time Management",
  "Creativity",
  "Analytical Thinking",
]

export function SkillsSection({ data, onUpdate }: SkillsSectionProps) {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("")
  const [newSoftSkill, setNewSoftSkill] = useState("")

  const addSkill = (skill: string, type: "technical" | "soft") => {
    if (!skill.trim()) return

    const currentSkills = data[type] || []
    if (!currentSkills.includes(skill.trim())) {
      onUpdate({
        ...data,
        [type]: [...currentSkills, skill.trim()],
      })
    }

    if (type === "technical") {
      setNewTechnicalSkill("")
    } else {
      setNewSoftSkill("")
    }
  }

  const removeSkill = (skill: string, type: "technical" | "soft") => {
    const currentSkills = data[type] || []
    onUpdate({
      ...data,
      [type]: currentSkills.filter((s) => s !== skill),
    })
  }

  const addSuggestedSkill = (skill: string, type: "technical" | "soft") => {
    addSkill(skill, type)
  }

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Code className="w-3 h-3 text-orange-600" />
          Technical Skills
        </Label>

        <div className="flex flex-wrap gap-2 min-h-[2rem] p-2 border border-stone-300 dark:border-stone-600 rounded-md">
          {data.technical.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-800"
              onClick={() => removeSkill(skill, "technical")}
            >
              {skill}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            placeholder="Add technical skill..."
            className="flex-1 h-8 text-sm"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addSkill(newTechnicalSkill, "technical")
              }
            }}
          />
          <Button
            onClick={() => addSkill(newTechnicalSkill, "technical")}
            size="sm"
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>

        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3 h-3 text-orange-600" />
              <span className="text-xs font-medium text-orange-700 dark:text-orange-300">Suggestions</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {technicalSkillSuggestions
                .filter((skill) => !data.technical.includes(skill))
                .slice(0, 8)
                .map((skill, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => addSuggestedSkill(skill, "technical")}
                    className="h-6 px-2 text-xs text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800"
                  >
                    + {skill}
                  </Button>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Soft Skills */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Heart className="w-3 h-3 text-emerald-600" />
          Soft Skills
        </Label>

        <div className="flex flex-wrap gap-2 min-h-[2rem] p-2 border border-stone-300 dark:border-stone-600 rounded-md">
          {data.soft.map((skill, index) => (
            <Badge
              key={index}
              variant="outline"
              className="border-emerald-300 text-emerald-700 dark:border-emerald-600 dark:text-emerald-400 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              onClick={() => removeSkill(skill, "soft")}
            >
              {skill}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            placeholder="Add soft skill..."
            className="flex-1 h-8 text-sm"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addSkill(newSoftSkill, "soft")
              }
            }}
          />
          <Button
            onClick={() => addSkill(newSoftSkill, "soft")}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>

        <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Suggestions</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {softSkillSuggestions
                .filter((skill) => !data.soft.includes(skill))
                .slice(0, 6)
                .map((skill, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => addSuggestedSkill(skill, "soft")}
                    className="h-6 px-2 text-xs text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800"
                  >
                    + {skill}
                  </Button>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
