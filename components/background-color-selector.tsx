"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Palette, Check, X } from "lucide-react"

export type BackgroundTheme =
  | "white-black"
  | "cream-dark"
  | "gray-navy"
  | "blue-charcoal"
  | "corporate-blue"
  | "modern-green"
  | "creative-orange"
  | "executive-purple"

interface BackgroundThemeData {
  id: BackgroundTheme
  name: string
  description: string
  bgColor: string
  textColor: string
  accentColor: string
  preview: string
  borderColor: string
}

const backgroundThemes: BackgroundThemeData[] = [
  {
    id: "white-black",
    name: "Classic White",
    description: "Clean white background with black text",
    bgColor: "bg-white",
    textColor: "text-black",
    accentColor: "text-blue-600",
    preview: "bg-gradient-to-br from-white to-gray-50",
    borderColor: "border-gray-200",
  },
  {
    id: "cream-dark",
    name: "Soft Cream",
    description: "Warm cream background with dark gray text",
    bgColor: "bg-amber-50",
    textColor: "text-gray-800",
    accentColor: "text-amber-700",
    preview: "bg-gradient-to-br from-amber-50 to-amber-100",
    borderColor: "border-amber-200",
  },
  {
    id: "gray-navy",
    name: "Professional Gray",
    description: "Light gray background with navy text",
    bgColor: "bg-gray-100",
    textColor: "text-gray-900",
    accentColor: "text-blue-700",
    preview: "bg-gradient-to-br from-gray-100 to-gray-200",
    borderColor: "border-gray-300",
  },
  {
    id: "blue-charcoal",
    name: "Soft Blue",
    description: "Pale blue background with charcoal text",
    bgColor: "bg-blue-50",
    textColor: "text-gray-900",
    accentColor: "text-blue-700",
    preview: "bg-gradient-to-br from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
  },
  {
    id: "corporate-blue",
    name: "Corporate Blue",
    description: "Professional blue tone with dark text",
    bgColor: "bg-slate-50",
    textColor: "text-slate-900",
    accentColor: "text-slate-700",
    preview: "bg-gradient-to-br from-slate-50 to-slate-100",
    borderColor: "border-slate-200",
  },
  {
    id: "modern-green",
    name: "Modern Green",
    description: "Fresh green background with dark text",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-900",
    accentColor: "text-emerald-700",
    preview: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    borderColor: "border-emerald-200",
  },
  {
    id: "creative-orange",
    name: "Creative Orange",
    description: "Warm orange background with dark text",
    bgColor: "bg-orange-50",
    textColor: "text-orange-900",
    accentColor: "text-orange-700",
    preview: "bg-gradient-to-br from-orange-50 to-orange-100",
    borderColor: "border-orange-200",
  },
  {
    id: "executive-purple",
    name: "Executive Purple",
    description: "Sophisticated purple with dark text",
    bgColor: "bg-purple-50",
    textColor: "text-purple-900",
    accentColor: "text-purple-700",
    preview: "bg-gradient-to-br from-purple-50 to-purple-100",
    borderColor: "border-purple-200",
  },
]

interface BackgroundColorSelectorProps {
  selectedTheme: BackgroundTheme
  onThemeChange: (theme: BackgroundTheme) => void
}

export function BackgroundColorSelector({ selectedTheme, onThemeChange }: BackgroundColorSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tempSelectedTheme, setTempSelectedTheme] = useState(selectedTheme)
  const [isApplying, setIsApplying] = useState(false)

  const currentTheme = backgroundThemes.find((theme) => theme.id === selectedTheme) || backgroundThemes[0]

  const handleApply = async () => {
    setIsApplying(true)

    // Simulate applying background theme
    await new Promise((resolve) => setTimeout(resolve, 500))

    onThemeChange(tempSelectedTheme)
    setIsApplying(false)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setTempSelectedTheme(selectedTheme)
    setIsModalOpen(false)
  }

  const handleThemeSelect = (themeId: BackgroundTheme) => {
    setTempSelectedTheme(themeId)
  }

  return (
    <>
      <Card className="border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-gray-900 dark:text-white">
            <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Background Theme
            <Badge
              variant="outline"
              className="text-xs ml-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              {currentTheme.name}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Current Selection Preview */}
          <div
            className={`p-4 rounded-lg border-2 transition-all duration-300 bg-theme-preview ${currentTheme.preview} ${currentTheme.borderColor}`}
          >
            <div className={`text-sm font-semibold mb-1 ${currentTheme.textColor}`}>John Doe</div>
            <div className={`text-xs opacity-80 mb-2 ${currentTheme.accentColor}`}>Software Engineer</div>
            <div className={`text-xs leading-relaxed ${currentTheme.textColor} break-words max-w-full`}>
              Experienced developer with expertise in React, TypeScript, and modern web technologies.
            </div>
          </div>

          {/* Change Background Button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="w-full justify-center gap-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
          >
            <Palette className="w-4 h-4" />
            Change Background
          </Button>
        </CardContent>
      </Card>

      {/* Background Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Choose Background Theme</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <div className="grid grid-cols-2 gap-4">
                {backgroundThemes.map((theme) => (
                  <Button
                    key={theme.id}
                    variant="ghost"
                    className={`h-auto p-4 flex flex-col items-start gap-3 relative transition-all duration-300 template-card ${
                      tempSelectedTheme === theme.id
                        ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 selected"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    }`}
                    onClick={() => handleThemeSelect(theme.id)}
                  >
                    {/* Theme Preview */}
                    <div
                      className={`w-full h-16 rounded-lg ${theme.preview} border ${theme.borderColor} bg-theme-preview overflow-hidden`}
                    >
                      <div className="p-2 h-full flex flex-col justify-between">
                        <div className={`text-xs font-semibold ${theme.textColor} break-words max-w-full`}>
                          Sample Name
                        </div>
                        <div className={`text-xs ${theme.accentColor} break-words max-w-full`}>Sample Title</div>
                      </div>
                    </div>

                    {/* Theme Info */}
                    <div className="text-left w-full">
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white break-words flex-1 min-w-0 pr-2">
                          {theme.name}
                        </span>
                        {tempSelectedTheme === theme.id && (
                          <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 success-checkmark" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight break-words max-w-full">
                        {theme.description}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Sticky Footer with Apply/Cancel Buttons */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isApplying}
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                disabled={isApplying}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 min-w-[100px]"
              >
                {isApplying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 loading-spinner"></div>
                    Applying...
                  </>
                ) : (
                  "Apply Theme"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function getBackgroundThemeClasses(theme: BackgroundTheme) {
  const themeData = backgroundThemes.find((t) => t.id === theme) || backgroundThemes[0]
  return {
    background: themeData.bgColor,
    text: themeData.textColor,
    accent: themeData.accentColor,
    border: themeData.borderColor,
  }
}
