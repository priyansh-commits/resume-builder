"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, User, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageUrl: string) => void
  gender?: "male" | "female"
  onGenderChange?: (gender: "male" | "female") => void
}

export function ImageUpload({ currentImage, onImageChange, gender = "male", onGenderChange }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const defaultAvatars = {
    male: "/placeholder.svg?height=150&width=150&text=👨",
    female: "/placeholder.svg?height=150&width=150&text=👩",
  }

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeImage = () => {
    onImageChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const useDefaultAvatar = () => {
    onImageChange(defaultAvatars[gender])
  }

  const displayImage = currentImage || defaultAvatars[gender]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Photo</Label>
        {onGenderChange && (
          <Select value={gender} onValueChange={onGenderChange}>
            <SelectTrigger className="w-32 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectItem value="male" className="text-gray-900 dark:text-white">
                👨 Male
              </SelectItem>
              <SelectItem value="female" className="text-gray-900 dark:text-white">
                👩 Female
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Image Preview */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <Image
              src={displayImage || "/placeholder.svg"}
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          {currentImage && (
            <Button
              size="sm"
              variant="destructive"
              className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
              onClick={removeImage}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Drag & drop or click to upload</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              Choose File
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={useDefaultAvatar}
              className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              <User className="w-3 h-3 mr-1" />
              Use Default
            </Button>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">Recommended: Square image, max 5MB. JPG, PNG, or GIF.</p>
    </div>
  )
}
