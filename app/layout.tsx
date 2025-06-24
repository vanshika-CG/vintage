import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Dancing_Script, Playfair_Display } from "next/font/google"

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cursive",
})

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Happy Birthday My Love",
  description: "A romantic birthday website filled with love",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cursive.variable} ${serif.variable}`}>{children}</body>
    </html>
  )
}