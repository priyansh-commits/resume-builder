import type { ResumeData } from "@/types/resume"
import { redactPersonalInfo } from "./redaction-utils"

export async function downloadPDF(resumeData: ResumeData, redactMode: boolean) {
  const dataToDownload = redactMode ? redactPersonalInfo(resumeData) : resumeData

  // Create a simple HTML version for PDF generation
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Resume - ${dataToDownload.fullName}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .name { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
        .contact { color: #666; margin-bottom: 5px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 20px; font-weight: bold; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; }
        .content { line-height: 1.6; white-space: pre-line; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${dataToDownload.fullName || "Your Name"}</div>
        ${dataToDownload.email ? `<div class="contact">${dataToDownload.email}</div>` : ""}
        ${dataToDownload.phone ? `<div class="contact">${dataToDownload.phone}</div>` : ""}
        ${dataToDownload.address ? `<div class="contact">${dataToDownload.address}</div>` : ""}
      </div>
      
      ${
        dataToDownload.summary
          ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <div class="content">${dataToDownload.summary}</div>
        </div>
      `
          : ""
      }
      
      ${
        dataToDownload.experience
          ? `
        <div class="section">
          <div class="section-title">Work Experience</div>
          <div class="content">${dataToDownload.experience}</div>
        </div>
      `
          : ""
      }
      
      ${
        dataToDownload.education
          ? `
        <div class="section">
          <div class="section-title">Education</div>
          <div class="content">${dataToDownload.education}</div>
        </div>
      `
          : ""
      }
      
      ${
        dataToDownload.skills
          ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="content">${dataToDownload.skills}</div>
        </div>
      `
          : ""
      }
    </body>
    </html>
  `

  // Create a blob and download
  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `resume-${redactMode ? "redacted-" : ""}${Date.now()}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  // Note: For actual PDF generation, you would use libraries like:
  // - react-pdf
  // - html2pdf.js
  // - puppeteer (server-side)
  console.log("PDF download would be implemented with react-pdf or html2pdf.js")
}

export function downloadJSON(resumeData: ResumeData, redactMode: boolean) {
  const dataToDownload = redactMode ? redactPersonalInfo(resumeData) : resumeData

  const jsonData = {
    ...dataToDownload,
    metadata: {
      generatedAt: new Date().toISOString(),
      redacted: redactMode,
      version: "1.0",
    },
  }

  const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `resume-data-${redactMode ? "redacted-" : ""}${Date.now()}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
