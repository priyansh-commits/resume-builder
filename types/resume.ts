export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  profileImage?: string
  gender?: "male" | "female"
}

export interface Experience {
  position: string
  company: string
  startDate: string
  endDate: string
  description: string
  achievements?: string[]
}

export interface Education {
  degree: string
  school: string
  year: string
  gpa?: string
  relevant_courses?: string[]
}

export interface Skills {
  technical: string[]
  soft: string[]
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  url?: string
}

export interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  data: string // base64 encoded
  uploadDate: string
  category: "education" | "certification" | "other"
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skills
  projects: Project[]
  certifications: Certification[]
  uploadedFiles: UploadedFile[]
}

export type SectionType =
  | "personalInfo"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"

export type ResumeTemplate =
  | "classic"
  | "modern"
  | "creative"
  | "ats-optimized"
  | "business"
