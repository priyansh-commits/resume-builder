"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Check, Palette } from "lucide-react"

export type ResumeColorTheme =
  | "classic-blue"
  | "green-black"
  | "orange-white"
  | "purple-dark"
  | "cream-gray"
  | "light-gray-navy"
  | "pale-blue-charcoal"
  | "white-black"

interface ColorThemeSelectorProps {
  selectedTheme: ResumeColorTheme
  onThemeChange: (theme: ResumeColorTheme) => void
}

const colorThemes = [
  {
    id: "white-black" as ResumeColorTheme,
    name: "Classic White",
    description: "Clean white background with black text",
    background: "bg-white",
    text: "text-black",
    topBar: "bg-blue-600",
    accent: "text-blue-700",
    preview: "bg-gradient-to-r from-white to-gray-100",
  },
  {
    id: "cream-gray" as ResumeColorTheme,
    name: "Soft Cream",
    description: "Warm cream background with dark gray text",
    background: "bg-amber-50",
    text: "text-gray-800",
    topBar: "bg-amber-600",
    accent: "text-amber-700",
    preview: "bg-gradient-to-r from-amber-50 to-amber-100",
  },
  {
    id: "light-gray-navy" as ResumeColorTheme,
    name: "Professional Gray",
    description: "Light gray background with navy text",
    background: "bg-gray-100",
    text: "text-navy-900",
    topBar: "bg-navy-600",
    accent: "text-navy-700",
    preview: "bg-gradient-to-r from-gray-100 to-gray-200",
  },
  {
    id: "pale-blue-charcoal" as ResumeColorTheme,
    name: "Soft Blue",
    description: "Pale blue background with charcoal text",
    background: "bg-blue-50",
    text: "text-gray-900",
    topBar: "bg-blue-600",
    accent: "text-blue-700",
    preview: "bg-gradient-to-r from-blue-50 to-blue-100",
  },
  {
    id: "classic-blue" as ResumeColorTheme,
    name: "Corporate Blue",
    description: "Traditional blue headers with white background",
    background: "bg-white",
    text: "text-gray-900",
    topBar: "bg-blue-600",
    accent: "text-blue-700",
    preview: "bg-gradient-to-r from-blue-500 to-blue-400",
  },
  {
    id: "green-black" as ResumeColorTheme,
    name: "Modern Green",
    description: "Fresh green headers with clean layout",
    background: "bg-white",
    text: "text-black",
    topBar: "bg-emerald-600",
    accent: "text-emerald-700",
    preview: "bg-gradient-to-r from-emerald-500 to-emerald-400",
  },
  {
    id: "orange-white" as ResumeColorTheme,
    name: "Creative Orange",
    description: "Vibrant orange design for creative roles",
    background: "bg-white",
    text: "text-gray-900",
    topBar: "bg-orange-500",
    accent: "text-orange-700",
    preview: "bg-gradient-to-r from-orange-500 to-orange-400",
  },
  {
    id: "purple-dark" as ResumeColorTheme,
    name: "Executive Purple",
    description: "Sophisticated purple for leadership roles",
    background: "bg-white",
    text: "text-gray-900",
    topBar: "bg-purple-600",
    accent: "text-purple-700",
    preview: "bg-gradient-to-r from-purple-500 to-purple-400",
  },
]

export function getThemeStyles(theme: ResumeColorTheme) {
  const themeConfig = colorThemes.find((t) => t.id === theme) || colorThemes[0]
  return {
    background: themeConfig.background,
    text: themeConfig.text,
    topBar: themeConfig.topBar,
    accent: themeConfig.accent,
  }
}

export function ColorThemeSelector({ selectedTheme, onThemeChange }: ColorThemeSelectorProps) {
  return (
    <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-indigo-900/20 shadow-lg">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Resume Background & Colors</Label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {colorThemes.map((theme) => (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedTheme === theme.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-sm"
                } bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
                onClick={() => onThemeChange(theme.id)}
              >
                <CardContent className="p-3">
                  <div className="space-y-3">
                    {/* Color Preview */}
                    <div className={`h-10 rounded-lg ${theme.preview} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                      {selectedTheme === theme.id && (
                        <div className="absolute top-1 right-1 bg-white dark:bg-gray-800 rounded-full p-1">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      )}
                    </div>

                    {/* Theme Info */}
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{theme.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-words">{theme.description}</p>
                    </div>

                    {/* Use Button */}
                    <Button
                      size="sm"
                      variant={selectedTheme === theme.id ? "default" : "outline"}
                      className={`w-full text-xs ${
                        selectedTheme === theme.id
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onThemeChange(theme.id)
                      }}
                    >
                      {selectedTheme === theme.id ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          Selected
                        </>
                      ) : (
                        "Use Theme"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
