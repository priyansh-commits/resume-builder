"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Globe, Linkedin, Save } from "lucide-react"
import { ImageUpload } from "@/components/image-upload"
import type { PersonalInfo } from "@/types/resume"

interface PersonalInfoSectionProps {
  data: PersonalInfo & { profileImage?: string; gender?: "male" | "female" }
  onUpdate: (data: PersonalInfo & { profileImage?: string; gender?: "male" | "female" }) => void
}

export function PersonalInfoSection({ data, onUpdate }: PersonalInfoSectionProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({ ...data, [field]: value })
  }

  const handleImageChange = (imageUrl: string) => {
    onUpdate({ ...data, profileImage: imageUrl })
  }

  const handleGenderChange = (gender: "male" | "female") => {
    onUpdate({ ...data, gender })
  }

  return (
    <div className="space-y-6">
      {/* Profile Image Upload */}
      <ImageUpload
        currentImage={data.profileImage}
        onImageChange={handleImageChange}
        gender={data.gender || "male"}
        onGenderChange={handleGenderChange}
      />

      <div className="space-y-4">
        <div>
          <Label
            htmlFor="fullName"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <User className="w-3 h-3 text-emerald-600" />
            Full Name
          </Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
            className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>

        <div>
          <Label
            htmlFor="email"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <Mail className="w-3 h-3 text-emerald-600" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
            className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>

        <div>
          <Label
            htmlFor="phone"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <Phone className="w-3 h-3 text-emerald-600" />
            Phone
          </Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>

        <div>
          <Label
            htmlFor="location"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <MapPin className="w-3 h-3 text-emerald-600" />
            Location
          </Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="San Francisco, CA"
            className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>

        <div>
          <Label
            htmlFor="website"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <Globe className="w-3 h-3 text-emerald-600" />
            Website
          </Label>
          <Input
            id="website"
            value={data.website || ""}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder="https://johndoe.com"
            className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>

        <div>
          <Label
            htmlFor="linkedin"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <Linkedin className="w-3 h-3 text-emerald-600" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            value={data.linkedin || ""}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
            className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      <Button
        className="w-full bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white"
        size="sm"
      >
        <Save className="w-3 h-3 mr-2" />
        Save Changes
      </Button>
    </div>
  )
}
