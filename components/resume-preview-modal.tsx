"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Share2, PrinterIcon as Print, X } from "lucide-react"
import { ResumeCanvas } from "./resume-canvas"
import type { ResumeData, ResumeTemplate } from "@/types/resume"

interface ResumePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  resumeData: ResumeData
  template: ResumeTemplate
}

export function ResumePreviewModal({ isOpen, onClose, resumeData, template }: ResumePreviewModalProps) {
  const handleDownload = () => {
    // Create a printable version
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Resume - ${resumeData.personalInfo.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .resume-container { max-width: 800px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .name { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
            .contact { color: #666; margin-bottom: 5px; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 20px; font-weight: bold; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; }
            .content { line-height: 1.6; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="resume-container">
            <div class="header">
              <div class="name">${resumeData.personalInfo.fullName || "Your Name"}</div>
              ${resumeData.personalInfo.email ? `<div class="contact">${resumeData.personalInfo.email}</div>` : ""}
              ${resumeData.personalInfo.phone ? `<div class="contact">${resumeData.personalInfo.phone}</div>` : ""}
              ${resumeData.personalInfo.location ? `<div class="contact">${resumeData.personalInfo.location}</div>` : ""}
            </div>
            
            ${
              resumeData.summary
                ? `
              <div class="section">
                <div class="section-title">Professional Summary</div>
                <div class="content">${resumeData.summary}</div>
              </div>
            `
                : ""
            }
            
            ${
              resumeData.experience.length > 0
                ? `
              <div class="section">
                <div class="section-title">Work Experience</div>
                ${resumeData.experience
                  .map(
                    (exp) => `
                  <div class="content" style="margin-bottom: 20px;">
                    <div style="font-weight: bold; font-size: 18px;">${exp.position}</div>
                    <div style="color: #666; margin-bottom: 5px;">${exp.company} • ${exp.startDate} - ${exp.endDate}</div>
                    <div style="white-space: pre-line;">${exp.description}</div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
            
            ${
              resumeData.education.length > 0
                ? `
              <div class="section">
                <div class="section-title">Education</div>
                ${resumeData.education
                  .map(
                    (edu) => `
                  <div class="content" style="margin-bottom: 15px;">
                    <div style="font-weight: bold;">${edu.degree}</div>
                    <div style="color: #666;">${edu.school} • ${edu.year}</div>
                    ${edu.gpa ? `<div style="color: #666;">GPA: ${edu.gpa}</div>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
            
            ${
              resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0
                ? `
              <div class="section">
                <div class="section-title">Skills</div>
                ${
                  resumeData.skills.technical.length > 0
                    ? `
                  <div class="content" style="margin-bottom: 10px;">
                    <strong>Technical Skills:</strong> ${resumeData.skills.technical.join(", ")}
                  </div>
                `
                    : ""
                }
                ${
                  resumeData.skills.soft.length > 0
                    ? `
                  <div class="content">
                    <strong>Soft Skills:</strong> ${resumeData.skills.soft.join(", ")}
                  </div>
                `
                    : ""
                }
              </div>
            `
                : ""
            }
          </div>
        </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Resume - ${resumeData.personalInfo.fullName}`,
        text: "Check out my professional resume",
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-transparent border-none">
        {/* Top Bar Enhancements */}
        <DialogHeader className="sticky top-0 z-10 flex flex-row items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80">
          <DialogTitle className="font-sans text-lg font-semibold tracking-wide text-gray-900 dark:text-white">
            Resume Preview
          </DialogTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="text-gray-700 transition-colors duration-300 bg-white border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="text-gray-700 transition-colors duration-300 bg-white border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Print className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-300 rounded-md shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          {/* Close (X) Button fix */}
          <DialogClose className="absolute transition-colors duration-300 rounded-sm top-4 right-4 opacity-70 ring-offset-background hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:text-red-500">
            <X className="w-4 h-4 text-gray-900 dark:text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        {/* Resume Preview Panel fix */}
        <ScrollArea className="h-[75vh] p-4">
          <div className="p-4 overflow-auto rounded-md shadow-md bg-white text-black max-w-full">
            <div className="w-[8.5in] mx-auto min-h-[11in] shadow-lg">
                <ResumeCanvas
                resumeData={resumeData}
                template={template}
                activeSection="personalInfo"
                onSectionClick={() => {}}
                />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}