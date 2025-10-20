import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Surgical Stages Management System',
  description: 'Healthcare surgical workflow tracking system',
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
