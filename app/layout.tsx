import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SYSTMATIIX - Custom Software Solutions',
  description: 'Build fast, scalable software solutions. From websites to mobile apps and custom systems—SYSTMATIIX delivers results.',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
  },
  icons: {
    icon: [
      {
        url: '/logoSys.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logoSys.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logoSys.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/logoSys.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
