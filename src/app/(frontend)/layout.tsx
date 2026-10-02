import React from 'react'
import { Manrope, Unbounded } from 'next/font/google'

import { SiteFooter, SiteHeader } from '@/components/SiteChrome'
import { site } from '@/lib/site'

import './styles.css'

const display = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display-next',
})

const body = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body-next',
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
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
