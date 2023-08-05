import './globals.css'
import type { Metadata } from 'next'


import { syne, inter } from "../utils/fonts"
import Header from './_components/Header'
export const metadata: Metadata = {
  title: 'Converter',
  description: 'Convert Ethereum (ETH) to Wei and Gwei',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <Header />
        {children}</body>
    </html>
  )
}
