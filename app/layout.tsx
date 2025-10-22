import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Content Curator - Swipe & Discover',
  description: 'Autonomous content discovery with Tinder-style swiping',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
