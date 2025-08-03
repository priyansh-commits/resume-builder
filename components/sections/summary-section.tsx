"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Save, Sparkles, Copy, RefreshCw } from "lucide-react"

interface SummarySectionProps {
  data: string
  onUpdate: (data: string) => void
}

const summaryTemplates = [
  "Results-driven professional with [X] years of experience in [industry/field]. Proven track record of [key achievement] and expertise in [key skills]. Passionate about [relevant interest] and committed to delivering exceptional results.",
  "Experienced [job title] specializing in [key skills/technologies]. Successfully [major achievement] and led [team/project details]. Strong background in [relevant areas] with a focus on [specific expertise].",
  "Dynamic [profession] with expertise in [core competencies]. Demonstrated ability to [key accomplishment] and drive [business outcome]. Skilled in [technical skills] and passionate about [industry focus].",
]

export function SummarySection({ data, onUpdate }: SummarySectionProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      const randomTemplate = summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)]
      onUpdate(randomTemplate)
      setIsGenerating(false)
    }, 2000)
  }

  const handleTemplateSelect = (template: string) => {
    onUpdate(template)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="summary" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          value={data}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="Write a compelling summary of your professional background, key achievements, and career objectives..."
          className="mt-1 min-h-[120px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500/20 resize-none"
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          variant="outline"
          size="sm"
          className="flex-1 border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 bg-white dark:bg-gray-800"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 mr-2" />
              AI Generate
            </>
          )}
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white"
          size="sm"
        >
          <Save className="w-3 h-3 mr-2" />
          Save
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Templates</Label>
        {summaryTemplates.map((template, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{template.substring(0, 80)}...</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleTemplateSelect(template)}
                  className="shrink-0 h-6 w-6 p-0 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 text-gray-600 dark:text-gray-400"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
