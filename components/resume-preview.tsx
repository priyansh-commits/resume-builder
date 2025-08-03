"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Shield, Mail, Phone, MapPin, User } from "lucide-react"
import type { ResumeData } from "@/types/resume"
import { redactPersonalInfo } from "@/lib/redaction-utils"
import React from "react"

interface ResumePreviewProps {
  resumeData: ResumeData
  redactMode: boolean
  resumeRef?: React.RefObject<HTMLDivElement> // for PDF export
}

export function ResumePreview({ resumeData, redactMode, resumeRef }: ResumePreviewProps) {
  const displayData = redactMode ? redactPersonalInfo(resumeData) : resumeData

  return (
    <div className="lg:sticky lg:top-24 lg:h-fit">
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <FileText className="w-6 h-6 text-blue-600" />
              Live Preview
            </CardTitle>
            {redactMode && (
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-3 py-1">
                <Shield className="w-4 h-4 mr-1" />
                Protected Mode
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div ref={resumeRef} className="bg-white p-8 min-h-[800px] relative">
            {/* Resume Layout */}
            <div className="space-y-8">
              {/* Header Section */}
              <div className="text-center border-b-2 border-gray-100 pb-8">
                <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                  {displayData.personalInfo?.fullName || "Your Name"}
                </h1>
                <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                  {displayData.personalInfo?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">{displayData.personalInfo.email}</span>
                    </div>
                  )}
                  {displayData.personalInfo?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">{displayData.personalInfo.phone}</span>
                    </div>
                  )}
                  {displayData.personalInfo?.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{displayData.personalInfo.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              {displayData.summary && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {displayData.summary}
                  </p>
                </section>
              )}

              {/* Experience */}
              {displayData.experience?.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                    Work Experience
                  </h2>
                  {displayData.experience.map((exp, i) => (
                    <div key={i} className="text-gray-700 leading-relaxed text-lg">
                      <strong>{exp.position}</strong> at {exp.company} ({exp.startDate} - {exp.endDate})
                      <p>{exp.description}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Education */}
              {displayData.education?.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                    Education
                  </h2>
                  {displayData.education.map((edu, i) => (
                    <div key={i} className="text-gray-700 leading-relaxed text-lg">
                      <strong>{edu.degree}</strong> from {edu.school} ({edu.year})
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </section>
              )}

              {/* Skills */}
              {displayData.skills && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                    Skills & Technologies
                  </h2>
                  <div className="text-gray-700 leading-relaxed text-lg">
                    <strong>Technical:</strong> {displayData.skills.technical.join(", ")}<br />
                    <strong>Soft:</strong> {displayData.skills.soft.join(", ")}
                  </div>
                </section>
              )}

              {/* Empty State */}
              {!displayData.personalInfo?.fullName &&
                !displayData.summary &&
                displayData.experience.length === 0 &&
                displayData.education.length === 0 &&
                displayData.skills.technical.length === 0 &&
                displayData.skills.soft.length === 0 && (
                  <div className="text-center text-gray-400 py-20">
                    <User className="w-20 h-20 mx-auto mb-6 opacity-30" />
                    <h3 className="text-2xl font-bold mb-2">Start Building Your Resume</h3>
                    <p className="text-lg">Fill out the form to see your professional resume come to life</p>
                  </div>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResumePreview