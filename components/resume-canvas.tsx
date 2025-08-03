"use client"

import React, { RefObject } from "react"
import type { ResumeData, ResumeTemplate, SectionType } from "@/types/resume"
import ResumePreview from "@/components/resume-preview"

interface ResumeCanvasProps {
  resumeData: ResumeData & { backgroundTheme?: string }
  template: ResumeTemplate
  activeSection: SectionType
  onSectionClick: (section: SectionType) => void
  resumeRef: RefObject<HTMLDivElement> // ✅ Added here
}

export function ResumeCanvas({
  resumeData,
  template,
  activeSection,
  onSectionClick,
  resumeRef,
}: ResumeCanvasProps) {
  return (
    <div className="w-full h-full px-4 py-6 overflow-y-auto">
      {/* Pass ref to the actual rendered resume for PDF download */}
      <ResumePreview resumeData={resumeData} redactMode={false} resumeRef={resumeRef} />
    </div>
  )
}
