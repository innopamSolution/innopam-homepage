// Figma node: 254:5519 — white header, unified across all pages
// Fixed height: py-[20px] + logo h-44px = 84px total — consistent on every route

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { asset } from '../utils/asset';

export default function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'Company', href: '/#company', isRoute: false },
    { label: 'Solutions', href: '/solutions', isRoute: true },
    { label: 'Products', href: '/products', isRoute: true },
    { label: 'News', href: '/#news', isRoute: false },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex items-center justify-between px-4 md:px-[60px] py-[20px]">
        <Link to="/" className="shrink-0">
          <img
            src={asset('assets/logo-header-dark.svg')}
            alt="Innopam"
            className="object-contain"
            style={{ width: '131px', height: '44px' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-14">
            {navItems.map((item) => {
              const isActive = item.isRoute
                ? location.pathname === item.href
                : false

              return (
                <li key={item.label}>
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      className={`font-pretendard font-semibold text-[20px] transition-colors hover:text-[#1e273f] ${
                        isActive ? 'text-[#1e273f]' : 'text-[#6d758f]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="font-pretendard font-semibold text-[20px] text-[#6d758f] hover:text-[#1e273f] transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-[#1e273f] text-[24px]"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-[#e9e9e9] w-full">
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const isActive = item.isRoute
                ? location.pathname === item.href
                : false

              return (
                <li key={item.label} className="border-b border-[#e9e9e9]">
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      className={`block px-6 py-4 font-pretendard font-semibold text-[18px] transition-colors hover:text-[#1e273f] ${
                        isActive ? 'text-[#1e273f]' : 'text-[#6d758f]'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-6 py-4 font-pretendard font-semibold text-[18px] text-[#6d758f] hover:text-[#1e273f] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
