// Figma node: 254:5519 — white header, unified across all pages
// Fixed height: py-[20px] + logo h-44px = 84px total — consistent on every route

import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { asset } from '../utils/asset';

const companySubMenu = [
  { label: 'Introduction', href: '/company/introduction' },
  { label: 'History', href: '/company/history' },
  { label: 'Business Record', href: '/company/business-record' },
  { label: 'Contact', href: '/company/contact' },
]

export default function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCompanyOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isCompanyActive = location.pathname.startsWith('/company')

  const navItems = [
    { label: 'Solutions', href: '/solutions', isRoute: true },
    { label: 'Products', href: '/products', isRoute: true },
    { label: 'News', href: '/#news', isRoute: false },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
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

            {/* Company with dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                className={`font-pretendard font-semibold text-[20px] transition-colors hover:text-[#1e273f] flex items-center gap-1 ${
                  isCompanyActive ? 'text-[#1e273f]' : 'text-[#6d758f]'
                }`}
                onClick={() => setCompanyOpen((v) => !v)}
              >
                Company
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={`transition-transform ${companyOpen ? 'rotate-180' : ''}`}>
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Dropdown */}
              {companyOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] bg-white border border-[#e9e9e9] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] min-w-[180px] z-50">
                  {/* Arrow */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-[9px] w-[18px] h-[9px] overflow-hidden">
                    <div className="w-3 h-3 bg-white border-l border-t border-[#e9e9e9] rotate-45 mx-auto mt-[5px]" />
                  </div>
                  {companySubMenu.map((sub, i) => (
                    <Link
                      key={sub.label}
                      to={sub.href}
                      onClick={() => setCompanyOpen(false)}
                      className={`block px-[24px] py-[16px] font-pretendard font-semibold text-[18px] text-[#1e273f] hover:bg-[#f8f9ff] transition-colors whitespace-nowrap ${
                        i < companySubMenu.length - 1 ? 'border-b border-[#e9e9e9]' : ''
                      } ${location.pathname === sub.href ? 'text-[#5871ed]' : ''}`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {navItems.map((item) => (
              <li key={item.label}>
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className={`font-pretendard font-semibold text-[20px] transition-colors hover:text-[#1e273f] ${
                      location.pathname === item.href ? 'text-[#1e273f]' : 'text-[#6d758f]'
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
            ))}
          </ul>
        </nav>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-[#1e273f] text-[24px]"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-[#e9e9e9] w-full">
          <ul className="flex flex-col">

            {/* Company expandable */}
            <li className="border-b border-[#e9e9e9]">
              <button
                className="w-full flex items-center justify-between px-6 py-4 font-pretendard font-semibold text-[18px] text-[#6d758f]"
                onClick={() => setMobileCompanyOpen((v) => !v)}
              >
                Company
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={`transition-transform ${mobileCompanyOpen ? 'rotate-180' : ''}`}>
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {mobileCompanyOpen && (
                <ul className="bg-[#f8f9ff]">
                  {companySubMenu.map((sub) => (
                    <li key={sub.label} className="border-t border-[#e9e9e9]">
                      <Link
                        to={sub.href}
                        className={`block pl-10 pr-6 py-3 font-pretendard text-[16px] hover:text-[#1e273f] transition-colors ${
                          location.pathname === sub.href ? 'text-[#5871ed] font-semibold' : 'text-[#6d758f]'
                        }`}
                        onClick={() => { setMenuOpen(false); setMobileCompanyOpen(false) }}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {navItems.map((item) => (
              <li key={item.label} className="border-b border-[#e9e9e9]">
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className={`block px-6 py-4 font-pretendard font-semibold text-[18px] transition-colors hover:text-[#1e273f] ${
                      location.pathname === item.href ? 'text-[#1e273f]' : 'text-[#6d758f]'
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
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
