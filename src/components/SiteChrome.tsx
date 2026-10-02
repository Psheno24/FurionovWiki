import Link from 'next/link'

import { navLinks, site } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden />
          <span className="brand-text">
            <strong>{site.shortName}</strong>
            <em>{site.tagline}</em>
          </span>
        </Link>

        <nav className="nav" aria-label="Разделы">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/search" className="search-chip">
            Поиск
          </Link>
          <Link href="/admin" className="ghost-link">
            Админка
          </Link>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-brand">{site.name}</p>
          <p className="footer-copy">
            Вики семьи Фурионовых по игре «Россия Онлайн» (GTA 5 RP / Majestic). Фокус — фарм, смены и
            практичные гайды.
          </p>
        </div>
        <div>
          <p className="footer-heading">Разделы</p>
          <div className="footer-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="footer-heading">Важно</p>
          <p className="footer-copy">
            Неофициальный фан-проект семьи. Не аффилирован с Take-Two Interactive, Rockstar Games,
            Majestic и правообладателями.
          </p>
        </div>
      </div>
    </footer>
  )
}
