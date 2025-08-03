"use client"

import html2pdf from "html2pdf.js"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import React from "react"

interface DownloadResumeButtonProps {
  resumeRef: React.RefObject<HTMLDivElement>
}

export function DownloadResumeButton({ resumeRef }: DownloadResumeButtonProps) {
  const handleDownload = () => {
    if (!resumeRef.current) {
      alert("Resume preview is not available yet.")
      return
    }

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }

    html2pdf().set(opt).from(resumeRef.current).save()
  }

  return (
    <Button onClick={handleDownload} variant="default" className="gap-2">
      <FileDown className="w-4 h-4" />
      Download as PDF
    </Button>
  )
}
