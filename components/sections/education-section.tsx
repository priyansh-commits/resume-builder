"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Save, GraduationCap, Upload, FileText, Eye, X } from "lucide-react"
import type { Education, UploadedFile } from "@/types/resume"

interface EducationSectionProps {
  data: Education[]
  uploadedFiles: UploadedFile[]
  onUpdate: (data: Education[]) => void
  onUpdateFiles: (files: UploadedFile[]) => void
}

export function EducationSection({ data, uploadedFiles, onUpdate, onUpdateFiles }: EducationSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addEducation = () => {
    const newEducation: Education = {
      degree: "",
      school: "",
      year: "",
      gpa: "",
      relevant_courses: [],
    }
    onUpdate([...data, newEducation])
    setEditingIndex(data.length)
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate(updated)
  }

  const removeEducation = (index: number) => {
    const updated = data.filter((_, i) => i !== index)
    onUpdate(updated)
    setEditingIndex(null)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB")
        return
      }

      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPG, and PNG files are allowed")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          data: e.target?.result as string,
          uploadDate: new Date().toISOString(),
          category: "education",
        }
        onUpdateFiles([...uploadedFiles, newFile])
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeFile = (fileId: string) => {
    const updated = uploadedFiles.filter((file) => file.id !== fileId)
    onUpdateFiles(updated)
  }

  const viewFile = (file: UploadedFile) => {
    const newWindow = window.open()
    if (newWindow) {
      if (file.type === "application/pdf") {
        newWindow.document.write(`
          <iframe src="${file.data}" width="100%" height="100%" style="border: none;">
            <p>Your browser does not support PDFs. <a href="${file.data}">Download the PDF</a>.</p>
          </iframe>
        `)
      } else {
        newWindow.document.write(`
          <img src="${file.data}" style="max-width: 100%; height: auto;" alt="${file.name}" />
        `)
      }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const educationFiles = uploadedFiles.filter((file) => file.category === "education")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Education</Label>
        <Button
          onClick={addEducation}
          size="sm"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add
        </Button>
      </div>

      {/* File Upload Section */}
      <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Upload className="w-4 h-4 text-green-600" />
            Upload Certificates & Degrees
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full border-green-300 text-green-700 hover:bg-green-100 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20 bg-transparent"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Files (PDF, JPG, PNG)
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
            <p className="text-xs text-green-600 dark:text-green-400">
              Upload diplomas, certificates, transcripts (Max 10MB each)
            </p>

            {/* Uploaded Files */}
            {educationFiles.length > 0 && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-green-700 dark:text-green-300">Uploaded Files</Label>
                {educationFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded-lg border border-green-200 dark:border-green-700"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="w-4 h-4 text-green-600 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">{file.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => viewFile(file)}
                        className="h-6 w-6 p-0 hover:bg-green-100 dark:hover:bg-green-900/20"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(file.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Education Entries */}
      <div className="space-y-3">
        {data.map((education, index) => (
          <Card key={index} className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <GraduationCap className="w-3 h-3 text-green-600" />
                  {education.degree || "New Degree"}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="h-6 w-6 p-0 hover:bg-green-100 dark:hover:bg-green-900/20"
                  >
                    <GraduationCap className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeEducation(index)}
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
                    <Label htmlFor={`degree-${index}`} className="text-xs">
                      Degree
                    </Label>
                    <Input
                      id={`degree-${index}`}
                      value={education.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                      className="mt-1 h-8 text-sm border-green-300 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`school-${index}`} className="text-xs">
                      School/University
                    </Label>
                    <Input
                      id={`school-${index}`}
                      value={education.school}
                      onChange={(e) => updateEducation(index, "school", e.target.value)}
                      placeholder="University of Technology"
                      className="mt-1 h-8 text-sm border-green-300 focus:border-green-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`year-${index}`} className="text-xs">
                        Graduation Year
                      </Label>
                      <Input
                        id={`year-${index}`}
                        value={education.year}
                        onChange={(e) => updateEducation(index, "year", e.target.value)}
                        placeholder="2020"
                        className="mt-1 h-8 text-sm border-green-300 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`gpa-${index}`} className="text-xs">
                        GPA (Optional)
                      </Label>
                      <Input
                        id={`gpa-${index}`}
                        value={education.gpa || ""}
                        onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                        placeholder="3.8"
                        className="mt-1 h-8 text-sm border-green-300 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => setEditingIndex(null)}
                    size="sm"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    <Save className="w-3 h-3 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">{education.school}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{education.year}</p>
                  {education.gpa && (
                    <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                      GPA: {education.gpa}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {data.length === 0 && (
          <Card className="border-dashed border-slate-300 dark:border-slate-600 hover:border-green-400 transition-colors">
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">No education added yet</p>
              <Button
                onClick={addEducation}
                size="sm"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Your First Education
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
