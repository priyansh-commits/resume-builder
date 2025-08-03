"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Save, Building, Calendar } from "lucide-react"
import type { Experience } from "@/types/resume"

interface ExperienceSectionProps {
  data: Experience[]
  onUpdate: (data: Experience[]) => void
}

export function ExperienceSection({ data, onUpdate }: ExperienceSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const addExperience = () => {
    const newExperience: Experience = {
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      achievements: [],
    }
    onUpdate([...data, newExperience])
    setEditingIndex(data.length)
  }

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate(updated)
  }

  const removeExperience = (index: number) => {
    const updated = data.filter((_, i) => i !== index)
    onUpdate(updated)
    setEditingIndex(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Work Experience</Label>
        <Button
          onClick={addExperience}
          size="sm"
          className="bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {data.map((experience, index) => (
          <Card key={index} className="border-stone-200 dark:border-stone-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Building className="w-3 h-3 text-indigo-600" />
                  {experience.position || "New Position"}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="h-6 w-6 p-0"
                  >
                    <Calendar className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeExperience(index)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {editingIndex === index ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`position-${index}`} className="text-xs">
                      Position
                    </Label>
                    <Input
                      id={`position-${index}`}
                      value={experience.position}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      placeholder="Software Engineer"
                      className="mt-1 h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`company-${index}`} className="text-xs">
                      Company
                    </Label>
                    <Input
                      id={`company-${index}`}
                      value={experience.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="Tech Company Inc."
                      className="mt-1 h-8 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`start-${index}`} className="text-xs">
                        Start Date
                      </Label>
                      <Input
                        id={`start-${index}`}
                        value={experience.startDate}
                        onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                        placeholder="Jan 2020"
                        className="mt-1 h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`end-${index}`} className="text-xs">
                        End Date
                      </Label>
                      <Input
                        id={`end-${index}`}
                        value={experience.endDate}
                        onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                        placeholder="Present"
                        className="mt-1 h-8 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`description-${index}`} className="text-xs">
                      Description
                    </Label>
                    <Textarea
                      id={`description-${index}`}
                      value={experience.description}
                      onChange={(e) => updateExperience(index, "description", e.target.value)}
                      placeholder="Describe your role and key achievements..."
                      className="mt-1 min-h-[60px] text-sm resize-none"
                    />
                  </div>
                  <Button
                    onClick={() => setEditingIndex(null)}
                    size="sm"
                    className="w-full bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white"
                  >
                    <Save className="w-3 h-3 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{experience.company}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {experience.startDate} - {experience.endDate}
                  </p>
                  {experience.description && (
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-2">{experience.description}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {data.length === 0 && (
          <Card className="border-dashed border-stone-300 dark:border-stone-600">
            <CardContent className="p-6 text-center">
              <Building className="w-8 h-8 mx-auto mb-2 text-stone-400" />
              <p className="text-sm text-stone-500 dark:text-stone-400">No work experience added yet</p>
              <Button
                onClick={addExperience}
                size="sm"
                className="mt-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Your First Job
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
