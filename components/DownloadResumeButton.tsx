"use client"
import html2pdf from "html2pdf.js"
import { Button } from "@/components/ui/button"

export function DownloadResumeButton({ resumeRef }: { resumeRef: React.RefObject<HTMLDivElement> }) {
  const handleDownload = () => {
    if (resumeRef.current) {
      const element = resumeRef.current
      const options = {
        margin: 0,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      }

      html2pdf().set(options).from(element).save()
    }
  }

  return (
    <Button className="mt-4" onClick={handleDownload}>
      Download Resume
    </Button>
  )
}
