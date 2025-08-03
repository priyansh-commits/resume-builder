import React, { RefObject } from "react"
import type { ResumeData, ResumeTemplate, SectionType } from "@/types/resume"

export interface ResumeCanvasProps {
  resumeData: ResumeData
  template: ResumeTemplate
  activeSection: SectionType
  onSectionClick: (section: SectionType) => void
  resumeRef?: RefObject<HTMLDivElement> // ✅ Allow ref for PDF
}

export function ResumeCanvas({
  resumeData,
  template,
  activeSection,
  onSectionClick,
  resumeRef,
}: ResumeCanvasProps) {
  return (
    <div ref={resumeRef} className="p-4 lg:p-8">
      {/* Simple rendering of resume data */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <header className="text-center border-b pb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-gray-600">
            {resumeData.personalInfo.email || "you@example.com"} • {resumeData.personalInfo.phone || "123-456-7890"}
          </p>
          <p className="text-gray-500">{resumeData.personalInfo.location || "Your Location"}</p>
        </header>

        {resumeData.summary && (
          <section onClick={() => onSectionClick("summary")} className="cursor-pointer">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
          </section>
        )}

        {resumeData.experience?.length > 0 && (
          <section onClick={() => onSectionClick("experience")} className="cursor-pointer">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Experience</h2>
            {resumeData.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <p className="font-bold">
                  {exp.position} at {exp.company}
                </p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {resumeData.education?.length > 0 && (
          <section onClick={() => onSectionClick("education")} className="cursor-pointer">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Education</h2>
            {resumeData.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="font-bold">
                  {edu.degree} - {edu.school}
                </p>
                <p className="text-sm text-gray-500">{edu.year}</p>
                {edu.gpa && <p>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </section>
        )}

        {resumeData.skills?.technical?.length > 0 && (
          <section onClick={() => onSectionClick("skills")} className="cursor-pointer">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
            <p><strong>Technical:</strong> {resumeData.skills.technical.join(", ")}</p>
            <p><strong>Soft:</strong> {resumeData.skills.soft.join(", ")}</p>
          </section>
        )}
      </div>
    </div>
  )
}

export default ResumeCanvas
