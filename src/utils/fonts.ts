import { Inter } from 'next/font/google'
import { Syne } from 'next/font/google'
export const syne = Syne({
  weight: ["400", "700"],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
})
export const inter = Inter({
  weight: ["400", "700"],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
