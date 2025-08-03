"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Save, Award, ExternalLink } from "lucide-react"
import type { Certification } from "@/types/resume"

interface CertificationsSectionProps {
  data: Certification[]
  onUpdate: (data: Certification[]) => void
}

export function CertificationsSection({ data, onUpdate }: CertificationsSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const addCertification = () => {
    const newCertification: Certification = {
      name: "",
      issuer: "",
      date: "",
      url: "",
    }
    onUpdate([...data, newCertification])
    setEditingIndex(data.length)
  }

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate(updated)
  }

  const removeCertification = (index: number) => {
    const updated = data.filter((_, i) => i !== index)
    onUpdate(updated)
    setEditingIndex(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Certifications</Label>
        <Button
          onClick={addCertification}
          size="sm"
          className="bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {data.map((certification, index) => (
          <Card key={index} className="border-stone-200 dark:border-stone-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Award className="w-3 h-3 text-rose-600" />
                  {certification.name || "New Certification"}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="h-6 w-6 p-0"
                  >
                    <Award className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeCertification(index)}
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
                    <Label htmlFor={`cert-name-${index}`} className="text-xs">
                      Certification Name
                    </Label>
                    <Input
                      id={`cert-name-${index}`}
                      value={certification.name}
                      onChange={(e) => updateCertification(index, "name", e.target.value)}
                      placeholder="AWS Certified Solutions Architect"
                      className="mt-1 h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`cert-issuer-${index}`} className="text-xs">
                      Issuing Organization
                    </Label>
                    <Input
                      id={`cert-issuer-${index}`}
                      value={certification.issuer}
                      onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                      placeholder="Amazon Web Services"
                      className="mt-1 h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`cert-date-${index}`} className="text-xs">
                      Date Obtained
                    </Label>
                    <Input
                      id={`cert-date-${index}`}
                      value={certification.date}
                      onChange={(e) => updateCertification(index, "date", e.target.value)}
                      placeholder="March 2023"
                      className="mt-1 h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`cert-url-${index}`} className="text-xs">
                      Verification URL (Optional)
                    </Label>
                    <Input
                      id={`cert-url-${index}`}
                      value={certification.url || ""}
                      onChange={(e) => updateCertification(index, "url", e.target.value)}
                      placeholder="https://verify.certification.com"
                      className="mt-1 h-8 text-sm"
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
                  <p className="text-sm font-medium text-rose-600 dark:text-rose-400">{certification.issuer}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">{certification.date}</p>
                  {certification.url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2 text-xs mt-2 bg-transparent"
                      onClick={() => window.open(certification.url, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Verify
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {data.length === 0 && (
          <Card className="border-dashed border-stone-300 dark:border-stone-600">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-stone-400" />
              <p className="text-sm text-stone-500 dark:text-stone-400">No certifications added yet</p>
              <Button
                onClick={addCertification}
                size="sm"
                className="mt-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Certification
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
