"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Save, FolderOpen, Github, ExternalLink, X } from "lucide-react"
import type { Project } from "@/types/resume"

interface ProjectsSectionProps {
  data: Project[]
  onUpdate: (data: Project[]) => void
}

export function ProjectsSection({ data, onUpdate }: ProjectsSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [newTech, setNewTech] = useState("")

  const addProject = () => {
    const newProject: Project = {
      name: "",
      description: "",
      technologies: [],
      github: "",
      demo: "",
    }
    onUpdate([...data, newProject])
    setEditingIndex(data.length)
  }

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate(updated)
  }

  const removeProject = (index: number) => {
    const updated = data.filter((_, i) => i !== index)
    onUpdate(updated)
    setEditingIndex(null)
  }

  const addTechnology = (index: number, tech: string) => {
    if (!tech.trim()) return
    const project = data[index]
    const technologies = [...project.technologies, tech.trim()]
    updateProject(index, "technologies", technologies)
    setNewTech("")
  }

  const removeTechnology = (index: number, tech: string) => {
    const project = data[index]
    const technologies = project.technologies.filter((t) => t !== tech)
    updateProject(index, "technologies", technologies)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Projects</Label>
        <Button
          onClick={addProject}
          size="sm"
          className="bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {data.map((project, index) => (
          <Card key={index} className="border-stone-200 dark:border-stone-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FolderOpen className="w-3 h-3 text-teal-600" />
                  {project.name || "New Project"}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="h-6 w-6 p-0"
                  >
                    <FolderOpen className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeProject(index)}
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
                    <Label htmlFor={`project-name-${index}`} className="text-xs">
                      Project Name
                    </Label>
                    <Input
                      id={`project-name-${index}`}
                      value={project.name}
                      onChange={(e) => updateProject(index, "name", e.target.value)}
                      placeholder="E-commerce Platform"
                      className="mt-1 h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-description-${index}`} className="text-xs">
                      Description
                    </Label>
                    <Textarea
                      id={`project-description-${index}`}
                      value={project.description}
                      onChange={(e) => updateProject(index, "description", e.target.value)}
                      placeholder="Built a full-stack e-commerce platform with user authentication, payment processing, and admin dashboard..."
                      className="mt-1 min-h-[60px] text-sm resize-none"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Technologies</Label>
                    <div className="flex flex-wrap gap-1 mt-1 mb-2 min-h-[2rem] p-2 border border-stone-300 dark:border-stone-600 rounded-md">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 cursor-pointer hover:bg-teal-200 dark:hover:bg-teal-800"
                          onClick={() => removeTechnology(index, tech)}
                        >
                          {tech}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        placeholder="Add technology..."
                        className="flex-1 h-8 text-sm"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addTechnology(index, newTech)
                          }
                        }}
                      />
                      <Button
                        onClick={() => addTechnology(index, newTech)}
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`github-${index}`} className="text-xs">
                        GitHub URL
                      </Label>
                      <Input
                        id={`github-${index}`}
                        value={project.github || ""}
                        onChange={(e) => updateProject(index, "github", e.target.value)}
                        placeholder="https://github.com/..."
                        className="mt-1 h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`demo-${index}`} className="text-xs">
                        Live Demo URL
                      </Label>
                      <Input
                        id={`demo-${index}`}
                        value={project.demo || ""}
                        onChange={(e) => updateProject(index, "demo", e.target.value)}
                        placeholder="https://demo.com"
                        className="mt-1 h-8 text-sm"
                      />
                    </div>
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
                <div className="space-y-2">
                  {project.description && (
                    <p className="text-xs text-stone-600 dark:text-stone-300">{project.description}</p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mt-2">
                    {project.github && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-xs bg-transparent"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-xs bg-transparent"
                        onClick={() => window.open(project.demo, "_blank")}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {data.length === 0 && (
          <Card className="border-dashed border-stone-300 dark:border-stone-600">
            <CardContent className="p-6 text-center">
              <FolderOpen className="w-8 h-8 mx-auto mb-2 text-stone-400" />
              <p className="text-sm text-stone-500 dark:text-stone-400">No projects added yet</p>
              <Button
                onClick={addProject}
                size="sm"
                className="mt-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
