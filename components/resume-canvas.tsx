"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Code,
  FolderOpen,
  FileText,
  Download,
  Share2,
  Printer,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { getBackgroundThemeClasses, type BackgroundTheme } from "@/components/background-color-selector"
import type { ResumeData, SectionType, ResumeTemplate } from "@/types/resume"

interface ResumeCanvasProps {
  resumeData: ResumeData & { backgroundTheme?: BackgroundTheme }
  template: ResumeTemplate
  activeSection: SectionType
  onSectionClick: (section: SectionType) => void
}

export function ResumeCanvas({ resumeData, template, activeSection, onSectionClick }: ResumeCanvasProps) {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Safe data with fallbacks to prevent undefined errors
  const safeResumeData = {
    personalInfo: {
      fullName: resumeData.personalInfo?.fullName || "",
      email: resumeData.personalInfo?.email || "",
      phone: resumeData.personalInfo?.phone || "",
      location: resumeData.personalInfo?.location || "",
      website: resumeData.personalInfo?.website || "",
      linkedin: resumeData.personalInfo?.linkedin || "",
      profileImage: resumeData.personalInfo?.profileImage || "",
      gender: resumeData.personalInfo?.gender || "male",
    },
    summary: resumeData.summary || "",
    experience: resumeData.experience || [],
    education: resumeData.education || [],
    skills: {
      technical: resumeData.skills?.technical || [],
      soft: resumeData.skills?.soft || [],
    },
    projects: resumeData.projects || [],
    certifications: resumeData.certifications || [],
    backgroundTheme: resumeData.backgroundTheme || "white-black",
  }

  const backgroundClasses = getBackgroundThemeClasses(safeResumeData.backgroundTheme)

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 150))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50))
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Trigger download functionality
    console.log("Download resume")
  }

  const handleShare = () => {
    // Trigger share functionality
    console.log("Share resume")
  }

  const renderPersonalInfo = () => (
    <div
      className={`mb-8 cursor-pointer transition-all duration-200 ${
        activeSection === "personalInfo" ? "ring-2 ring-blue-500 ring-opacity-50 rounded-lg p-2 -m-2" : ""
      }`}
      onClick={() => onSectionClick("personalInfo")}
    >
      <div className="text-center mb-6">
        {safeResumeData.personalInfo.profileImage && (
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200">
            <img
              src={safeResumeData.personalInfo.profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1 className={`text-3xl font-bold mb-2 break-words max-w-full ${backgroundClasses.text}`}>
          {safeResumeData.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="space-y-2">
          {safeResumeData.personalInfo.email && (
            <div className={`flex items-center justify-center gap-2 text-sm ${backgroundClasses.accent}`}>
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="break-all max-w-full">{safeResumeData.personalInfo.email}</span>
            </div>
          )}
          {safeResumeData.personalInfo.phone && (
            <div className={`flex items-center justify-center gap-2 text-sm ${backgroundClasses.accent}`}>
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="break-words max-w-full">{safeResumeData.personalInfo.phone}</span>
            </div>
          )}
          {safeResumeData.personalInfo.location && (
            <div className={`flex items-center justify-center gap-2 text-sm ${backgroundClasses.accent}`}>
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="break-words max-w-full">{safeResumeData.personalInfo.location}</span>
            </div>
          )}
          {safeResumeData.personalInfo.website && (
            <div className={`flex items-center justify-center gap-2 text-sm ${backgroundClasses.accent}`}>
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span className="break-all max-w-full">{safeResumeData.personalInfo.website}</span>
            </div>
          )}
          {safeResumeData.personalInfo.linkedin && (
            <div className={`flex items-center justify-center gap-2 text-sm ${backgroundClasses.accent}`}>
              <Linkedin className="w-4 h-4 flex-shrink-0" />
              <span className="break-all max-w-full">{safeResumeData.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderSummary = () => (
    <div
      className={`mb-8 cursor-pointer transition-all duration-200 ${
        activeSection === "summary" ? "ring-2 ring-blue-500 ring-opacity-50 rounded-lg p-2 -m-2" : ""
      }`}
      onClick={() => onSectionClick("summary")}
    >
      <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${backgroundClasses.text}`}>
        <FileText className="w-5 h-5" />
        Professional Summary
      </h2>
      <p className={`text-sm leading-relaxed break-words max-w-full ${backgroundClasses.text}`}>
        {safeResumeData.summary ||
          "Add your professional summary here to highlight your key qualifications and career objectives."}
      </p>
    </div>
  )

  const renderExperience = () => (
    <div
      className={`mb-8 cursor-pointer transition-all duration-200 ${
        activeSection === "experience" ? "ring-2 ring-blue-500 ring-opacity-50 rounded-lg p-2 -m-2" : ""
      }`}
      onClick={() => onSectionClick("experience")}
    >
      <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${backgroundClasses.text}`}>
        <Building className="w-5 h-5" />
        Work Experience
      </h2>
      {safeResumeData.experience.length > 0 ? (
        <div className="space-y-6">
          {safeResumeData.experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-gray-200 pl-4">
              <h3 className={`font-semibold text-lg break-words max-w-full ${backgroundClasses.text}`}>
                {exp.position || "Position Title"}
              </h3>
              <div className={`flex items-center gap-2 mb-2 ${backgroundClasses.accent}`}>
                <Building className="w-4 h-4 flex-shrink-0" />
                <span className="break-words max-w-full">{exp.company || "Company Name"}</span>
                {exp.startDate && (
                  <>
                    <Calendar className="w-4 h-4 flex-shrink-0 ml-2" />
                    <span className="text-sm break-words max-w-full">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </>
                )}
              </div>
              {exp.description && (
                <p className={`text-sm leading-relaxed break-words max-w-full ${backgroundClasses.text}`}>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className={`text-sm italic ${backgroundClasses.text} opacity-70`}>
          Add your work experience to showcase your professional background.
        </p>
      )}
    </div>
  )

  const renderEducation = () => (
    <div
      className={`mb-8 cursor-pointer transition-all duration-200 ${
        activeSection === "education" ? "ring-2 ring-blue-500 ring-opacity-50 rounded-lg p-2 -m-2" : ""
      }`}
      onClick={() => onSectionClick("education")}
    >
      <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${backgroundClasses.text}`}>
        <GraduationCap className="w-5 h-5" />
        Education
      </h2>
      {safeResumeData.education.length > 0 ? (
        <div className="space-y-4">
          {safeResumeData.education.map((edu, index) => (
            <div key={index} className="border-l-2 border-gray-200 pl-4">
              <h3 className={`font-semibold break-words max-w-full ${backgroundClasses.text}`}>
                {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
              </h3>
              <div className={`flex items-center gap-2 mb-1 ${backgroundClasses.accent}`}>
                <GraduationCap className="w-4 h-4 flex-shrink-0" />
                <span className="break-words max-w-full">{edu.institution || "Institution Name"}</span>
                {edu.graduationDate && (
                  <>
                    <Calendar className="w-4 h-4 flex-shrink-0 ml-2" />
                    <span className="text-sm break-words max-w-full">{edu.graduationDate}</span>
                  </>
                )}
              </div>
              {edu.gpa && <p className={`text-sm ${backgroundClasses.text}`}>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className={`text-sm italic ${backgroundClasses.text} opacity-70`}>
          Add your educational background and qualifications.
        </p>
      )}
    </div>
  )

  const renderSkills = () => (
    <div
      className={`mb-8 cursor-pointer transition-all duration-200 ${
        activeSection === "skills" ? "ring-2 ring-blue-500 ring-opacity-50 rounded-lg p-2 -m-2" : ""
      }`}
      onClick={() => onSectionClick("skills")}
    >
      <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${backgroundClasses.text}`}>
        <Code className="w-5 h-5" />
        Skills
      </h2>
      <div className="space-y-4">
        {safeResumeData.skills.technical.length > 0 && (
          <div>
            <h3 className={`font-semibold mb-2 ${backgroundClasses.text}`}>Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {safeResumeData.skills.technical.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`text-xs break-words max-w-full ${backgroundClasses.accent} bg-gray-100 hover:bg-gray-200`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {safeResumeData.skills.soft.length > 0 && (
          <div>
            <h3 className={`font-semibold mb-2 ${backgroundClasses.text}`}>Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {safeResumeData.skills.soft.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`text-xs break-words max-w-full ${backgroundClasses.accent} border-gray-300`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {safeResumeData.skills.technical.length === 0 && safeResumeData.skills.soft.length === 0 && (
          <p className={`text-sm italic ${backgroundClasses.text} opacity-70`}>
            Add your technical and soft skills to highlight your capabilities.
          </p>
        )}
      </div>
    </div>
  )

  const renderProjects = () => (
    <div
      className={`mb-8 cursor-pointer transition-all duration-200 ${
        activeSection === "projects" ? "ring-2 ring-blue-500 ring-opacity-50 rounded-lg p-2 -m-2" : ""
      }`}
      onClick={() => onSectionClick("projects")}
    >
      <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${backgroundClasses.text}`}>
        <FolderOpen className="w-5 h-5" />
        Projects
      </h2>
      {safeResumeData.projects.length > 0 ? (
        <div className="space-y-4">
          {safeResumeData.projects.map((project, index) => (
            <div key={index} className="border-l-2 border-gray-200 pl-4">
              <h3 className={`font-semibold break-words max-w-full ${backgroundClasses.text}`}>
                {project.name || "Project Name"}
              </h3>
              {project.description && (
                <p className={`text-sm leading-relaxed mb-2 break-words max-w-full ${backgroundClasses.text}`}>
                  {project.description}
                </p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="outline"
                      className={`text-xs break-words max-w-full ${backgroundClasses.accent} border-gray-300`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
              {project.url && (
                <div className={`flex items-center gap-2 text-sm ${backgroundClasses.accent}`}>
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all max-w-full">{project.url}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className={`text-sm italic ${backgroundClasses.text} opacity-70`}>
          Add your projects to showcase your practical experience and achievements.
        </p>
      )}
    </div>
  )

  const renderCertifications = () => (
    <div
      className={`mb-8 cursor-pointer transition-all duration-200 ${
        activeSection === "certifications" ? "ring-2 ring-blue-500 ring-opacity-50 rounded-lg p-2 -m-2" : ""
      }`}
      onClick={() => onSectionClick("certifications")}
    >
      <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${backgroundClasses.text}`}>
        <Award className="w-5 h-5" />
        Certifications
      </h2>
      {safeResumeData.certifications.length > 0 ? (
        <div className="space-y-4">
          {safeResumeData.certifications.map((cert, index) => (
            <div key={index} className="border-l-2 border-gray-200 pl-4">
              <h3 className={`font-semibold break-words max-w-full ${backgroundClasses.text}`}>
                {cert.name || "Certification Name"}
              </h3>
              <div className={`flex items-center gap-2 mb-1 ${backgroundClasses.accent}`}>
                <Award className="w-4 h-4 flex-shrink-0" />
                <span className="break-words max-w-full">{cert.issuer || "Issuing Organization"}</span>
                {cert.date && (
                  <>
                    <Calendar className="w-4 h-4 flex-shrink-0 ml-2" />
                    <span className="text-sm break-words max-w-full">{cert.date}</span>
                  </>
                )}
              </div>
              {cert.url && (
                <div className={`flex items-center gap-2 text-sm ${backgroundClasses.accent}`}>
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all max-w-full">{cert.url}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className={`text-sm italic ${backgroundClasses.text} opacity-70`}>
          Add your professional certifications and credentials.
        </p>
      )}
    </div>
  )

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Toolbar - Always visible, dark mode enabled */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Preview</h2>
            <Badge
              variant="outline"
              className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              {template} Template
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 50}
                className="h-8 w-8 p-0 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-xs font-medium px-2 text-gray-700 dark:text-gray-300 min-w-[50px] text-center">
                {zoomLevel}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 150}
                className="h-8 w-8 p-0 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 bg-gray-300 dark:bg-gray-600" />

            {/* Action Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrint}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Resume Preview Container - Always light mode */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div className="w-full max-w-full overflow-hidden">
          <div
            ref={canvasRef}
            className={`resume-preview w-full max-w-[850px] mx-auto transition-all duration-300 ${backgroundClasses.background} shadow-lg rounded-lg overflow-hidden`}
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
              minHeight: "1100px",
            }}
          >
            {/* Resume Content - Always light themed */}
            <div className="p-8 break-words max-w-full overflow-hidden">
              {renderPersonalInfo()}
              <Separator className="my-6 bg-gray-200" />
              {renderSummary()}
              <Separator className="my-6 bg-gray-200" />
              {renderExperience()}
              <Separator className="my-6 bg-gray-200" />
              {renderEducation()}
              <Separator className="my-6 bg-gray-200" />
              {renderSkills()}
              <Separator className="my-6 bg-gray-200" />
              {renderProjects()}
              <Separator className="my-6 bg-gray-200" />
              {renderCertifications()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
