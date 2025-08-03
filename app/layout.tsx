import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Intelligent Resume Builder | AI-Powered Resume Editor",
  description:
    "Create professional resumes with AI-powered suggestions, smart templates, and interactive editing tools.",
  keywords: "resume builder, AI resume, professional resume, resume editor, career tools",
  authors: [{ name: "Resume Builder Team" }],
  openGraph: {
    title: "Intelligent Resume Builder",
    description: "Create professional resumes with AI-powered suggestions and smart templates",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
