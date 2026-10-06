import React from 'react'
import { JetBrains_Mono, Onest } from 'next/font/google'

import { SiteFooter, SiteHeader } from '@/components/SiteChrome'
import { site } from '@/lib/site'

import './styles.css'

const sans = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
})

const mono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
})

export const metadata = {
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
