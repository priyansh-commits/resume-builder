import { type NextRequest, NextResponse } from "next/server"
import type { ResumeData } from "@/types/resume"

// Redaction patterns
const REDACTION_PATTERNS = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  phone: /(\+?\d{1,2}[-.\s]?)?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}/g,
  ssn: /\b\d{3}-?\d{2}-?\d{4}\b/g,
  creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
  name: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, // Simple name pattern
}

function redactText(text: string, type: keyof typeof REDACTION_PATTERNS): string {
  if (!text) return text

  switch (type) {
    case "email":
      return text.replace(REDACTION_PATTERNS.email, (match) => {
        const [username, domain] = match.split("@")
        return `${"█".repeat(username.length)}@${domain}`
      })
    case "phone":
      return text.replace(REDACTION_PATTERNS.phone, "███-███-████")
    case "name":
      return text
        .split(" ")
        .map((word) => "█".repeat(word.length))
        .join(" ")
    default:
      return text
  }
}

function redactAddress(address: string): string {
  if (!address) return address
  return address
    .replace(/\d+/g, "███")
    .split(" ")
    .map((word) => (word.length > 3 ? "█".repeat(Math.min(word.length, 4)) : word))
    .join(" ")
}

export async function POST(request: NextRequest) {
  try {
    const resumeData: ResumeData = await request.json()

    const redactedData: ResumeData = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        fullName: redactText(resumeData.personalInfo.fullName, "name"),
        email: redactText(resumeData.personalInfo.email, "email"),
        phone: redactText(resumeData.personalInfo.phone, "phone"),
        location: redactAddress(resumeData.personalInfo.location),
        website: resumeData.personalInfo.website,
        linkedin: resumeData.personalInfo.linkedin,
        profileImage: resumeData.personalInfo.profileImage,
        gender: resumeData.personalInfo.gender,
      },
    }

    return NextResponse.json({
      success: true,
      data: redactedData,
      redactedFields: ["fullName", "email", "phone", "location"],
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to redact resume data" },
      { status: 500 }
    )
  }
}
