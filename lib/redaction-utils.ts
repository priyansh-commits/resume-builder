import type { ResumeData } from "@/types/resume"

export function redactPersonalInfo(data: ResumeData): ResumeData {
  return {
    ...data,
    fullName: redactName(data.fullName),
    email: redactEmail(data.email),
    phone: redactPhone(data.phone),
    address: redactAddress(data.address),
  }
}

function redactName(name: string): string {
  if (!name) return name
  return name
    .split(" ")
    .map((word) => "█".repeat(word.length))
    .join(" ")
}

function redactEmail(email: string): string {
  if (!email) return email
  const [username, domain] = email.split("@")
  return username ? `${"█".repeat(username.length)}@${domain || ""}` : email
}

function redactPhone(phone: string): string {
  if (!phone) return phone
  return phone.replace(/\d/g, "█")
}

function redactAddress(address: string): string {
  if (!address) return address
  return address
    .split(" ")
    .map((word) => "█".repeat(Math.min(word.length, 4)))
    .join(" ")
}
