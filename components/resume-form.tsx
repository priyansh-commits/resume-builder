"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Briefcase,
  GraduationCap,
  Zap,
  Shield,
  Eye,
  EyeOff,
  Download,
  Save,
} from "lucide-react"
import type { ResumeData } from "@/types/resume"
import { downloadPDF, downloadJSON } from "@/lib/download-utils"

interface ResumeFormProps {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
  redactMode: boolean
  setRedactMode: (mode: boolean) => void
}

export function ResumeForm({ resumeData, setResumeData, redactMode, setRedactMode }: ResumeFormProps) {
  const handleInputChange = (field: keyof ResumeData, value: string) => {
    const newData = { ...resumeData, [field]: value }
    setResumeData(newData)
    // Auto-save to localStorage
    localStorage.setItem("resumeData", JSON.stringify(newData))
  }

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("resumeData")
    if (saved) {
      setResumeData(JSON.parse(saved))
    }
  }, [setResumeData])

  const handleDownloadPDF = async () => {
    await downloadPDF(resumeData, redactMode)
  }

  const handleDownloadJSON = () => {
    downloadJSON(resumeData, redactMode)
  }

  return (
    <div className="space-y-6">
      {/* Privacy Control */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl transition-all duration-300 ${
                  redactMode
                    ? "bg-amber-100 shadow-amber-200/50 shadow-lg"
                    : "bg-emerald-100 shadow-emerald-200/50 shadow-lg"
                }`}
              >
                {redactMode ? (
                  <EyeOff className="w-6 h-6 text-amber-600" />
                ) : (
                  <Eye className="w-6 h-6 text-emerald-600" />
                )}
              </div>
              <div>
                <Label htmlFor="privacy-toggle" className="text-xl font-bold cursor-pointer">
                  Privacy Shield
                </Label>
                <p className="text-gray-600 font-medium">
                  {redactMode ? "Personal data is protected" : "All information visible"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={redactMode ? "destructive" : "default"} className="px-3 py-1">
                {redactMode ? "Protected" : "Standard"}
              </Badge>
              <Switch
                checked={redactMode}
                onCheckedChange={setRedactMode}
                id="privacy-toggle"
                className="data-[state=checked]:bg-amber-500 scale-125"
              />
            </div>
          </div>
          {redactMode && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-amber-800 font-medium flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Your personal information will be automatically redacted in preview and downloads
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Tabs */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <FileText className="w-6 h-6 text-blue-600" />
            Resume Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100/80 p-1 rounded-xl">
              <TabsTrigger value="personal" className="rounded-lg font-semibold">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="professional" className="rounded-lg font-semibold">
                Professional
              </TabsTrigger>
              <TabsTrigger value="additional" className="rounded-lg font-semibold">
                Additional
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="flex items-center gap-2 font-semibold text-gray-700">
                    <User className="w-4 h-4 text-blue-500" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={resumeData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="flex items-center gap-2 font-semibold text-gray-700">
                    <Mail className="w-4 h-4 text-blue-500" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={resumeData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="phone" className="flex items-center gap-2 font-semibold text-gray-700">
                    <Phone className="w-4 h-4 text-blue-500" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={resumeData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="address" className="flex items-center gap-2 font-semibold text-gray-700">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State"
                    value={resumeData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="summary" className="flex items-center gap-2 font-semibold text-gray-700">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Professional Summary
                </Label>
                <Textarea
                  id="summary"
                  placeholder="Brief overview of your professional background and key achievements..."
                  className="min-h-[120px] border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none"
                  value={resumeData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="experience" className="flex items-center gap-2 font-semibold text-gray-700">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  Work Experience
                </Label>
                <Textarea
                  id="experience"
                  placeholder="List your work experience, including job titles, companies, dates, and key responsibilities..."
                  className="min-h-[150px] border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none"
                  value={resumeData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="additional" className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="education" className="flex items-center gap-2 font-semibold text-gray-700">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  Education
                </Label>
                <Textarea
                  id="education"
                  placeholder="List your educational background, including degrees, institutions, and graduation dates..."
                  className="min-h-[120px] border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none"
                  value={resumeData.education}
                  onChange={(e) => handleInputChange("education", e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="skills" className="flex items-center gap-2 font-semibold text-gray-700">
                  <Zap className="w-4 h-4 text-blue-500" />
                  Skills & Technologies
                </Label>
                <Textarea
                  id="skills"
                  placeholder="List your technical and soft skills, separated by commas..."
                  className="min-h-[100px] border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none"
                  value={resumeData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Download Options */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleDownloadPDF}
              className="flex-1 h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
            <Button
              onClick={handleDownloadJSON}
              variant="outline"
              className="flex-1 h-14 text-lg font-semibold border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 rounded-xl bg-transparent"
            >
              <Save className="w-5 h-5 mr-2" />
              Export JSON
            </Button>
          </div>
          <p className="text-center text-gray-500 mt-3 font-medium">
            {redactMode ? "Downloads will include redacted information" : "Downloads will include all information"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
