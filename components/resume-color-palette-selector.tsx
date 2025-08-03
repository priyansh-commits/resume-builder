"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Check, Palette } from "lucide-react"

export type ResumeColorPalette = "classic" | "modern" | "elegant" | "soft" | "creative"

interface ResumeColorPaletteSelectorProps {
  selectedPalette: ResumeColorPalette
  onPaletteChange: (palette: ResumeColorPalette) => void
}

const colorPalettes = [
  {
    id: "classic" as ResumeColorPalette,
    name: "Classic Blue",
    description: "Professional blue headers with clean layout",
    primary: "#1e40af",
    secondary: "#3b82f6",
    accent: "#60a5fa",
    preview: "bg-gradient-to-r from-blue-600 to-blue-400",
  },
  {
    id: "modern" as ResumeColorPalette,
    name: "Modern Green",
    description: "Fresh emerald design with modern typography",
    primary: "#059669",
    secondary: "#10b981",
    accent: "#34d399",
    preview: "bg-gradient-to-r from-emerald-600 to-emerald-400",
  },
  {
    id: "elegant" as ResumeColorPalette,
    name: "Elegant Black",
    description: "Sophisticated black headers with clean borders",
    primary: "#111827",
    secondary: "#374151",
    accent: "#6b7280",
    preview: "bg-gradient-to-r from-gray-800 to-gray-600",
  },
  {
    id: "soft" as ResumeColorPalette,
    name: "Soft Gray",
    description: "Muted gray tones with subtle elegance",
    primary: "#6b7280",
    secondary: "#9ca3af",
    accent: "#d1d5db",
    preview: "bg-gradient-to-r from-gray-500 to-gray-400",
  },
  {
    id: "creative" as ResumeColorPalette,
    name: "Creative Purple",
    description: "Bold purple design for creative professionals",
    primary: "#7c3aed",
    secondary: "#a855f7",
    accent: "#c084fc",
    preview: "bg-gradient-to-r from-purple-600 to-purple-400",
  },
]

export function ResumeColorPaletteSelector({ selectedPalette, onPaletteChange }: ResumeColorPaletteSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Resume Color Palette</Label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {colorPalettes.map((palette) => (
          <Card
            key={palette.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedPalette === palette.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-sm"
            } bg-white border-gray-200`}
            onClick={() => onPaletteChange(palette.id)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Color Preview */}
                <div className={`h-12 rounded-lg ${palette.preview} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                  {selectedPalette === palette.id && (
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                  )}
                </div>

                {/* Palette Info */}
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{palette.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{palette.description}</p>
                </div>

                {/* Color Swatches */}
                <div className="flex gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: palette.primary }}
                    title="Primary Color"
                  ></div>
                  <div
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: palette.secondary }}
                    title="Secondary Color"
                  ></div>
                  <div
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: palette.accent }}
                    title="Accent Color"
                  ></div>
                </div>

                {/* Use Button */}
                <Button
                  size="sm"
                  variant={selectedPalette === palette.id ? "default" : "outline"}
                  className={`w-full ${
                    selectedPalette === palette.id
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onPaletteChange(palette.id)
                  }}
                >
                  {selectedPalette === palette.id ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Selected
                    </>
                  ) : (
                    "Use Palette"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
