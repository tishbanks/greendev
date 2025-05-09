// ... imports inchangés ...
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import Logo from './Logo'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import ThemeToggle from './ThemeToggle'

const LANGUAGES = [
  { code: 'fr', label: '🇫🇷' },
  { code: 'en', label: '🇬🇧' },
  { code: 'es', label: '🇪🇸' },
  { code: 'ja', label: '🇯🇵' }
]

export default function Header() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false)
        setMobileOpen(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    const handleMouseMove = () => setVisible(true)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [lastScrollY])

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen)

  const navItems = [
    { href: '/', label: t('nav.home'), type: 'route' },
    { href: '#services', label: t('nav.services'), type: 'anchor' },
    { href: '/#why', label: t('nav.why'), type: 'anchor' },
    { href: '/#contact', label: t('nav.contact'), type: 'anchor' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={clsx(
          'fixed top-0 left-0 w-full z-[9999] h-auto min-h-[52px] backdrop-blur-md border-b border-green-200 shadow-sm bg-white  text-green-900 transition-transform duration-500 ease-in-out will-change-transform',
          visible ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="h-[80%]">
            <Logo className="w-[160px] md:w-[200px]" />
          </div>

          <nav className="hidden md:flex space-x-8 text-sm font-poppins font-medium items-center">
            {navItems.map((item) => (
              <NavItem key={item.href} href={item.href} type={item.type}>
                {item.label}
              </NavItem>
            ))}
            <div className="flex gap-2 ml-4 text-xl">
              {LANGUAGES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => i18n.changeLanguage(code)}
                  className={`transition hover:scale-110 ${
                    i18n.language === code ? 'opacity-100' : 'opacity-60'
                  }`}
                  aria-label={`Langue : ${code}`}
                >
                  {label}
                </button>
              ))}
              <ThemeToggle />
            </div>
          </nav>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Menu mobile"
              aria-expanded={mobileOpen}
              className="relative w-10 h-8 flex flex-col justify-center items-center space-y-[4px] bg-[#6EAD8C] hover:bg-[#5a9d79] rounded-lg transition duration-300 shadow-lg"
            >
              <motion.span
                className="block h-[2px] w-6 bg-white"
                animate={mobileOpen ? { rotate: 60, y: 6, width: '1.5rem' } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-[2px] w-6 bg-white"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[2px] w-6 bg-white"
                animate={mobileOpen ? { rotate: -60, y: -6, width: '1.5rem' } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 right-0 w-full h-screen bg-[#6EAD8C] z-[9999] flex flex-col justify-center items-center"
          >
            <motion.ul
              className="space-y-12 z-50 text-4xl font-extrabold text-white text-center drop-shadow-lg font-poppins mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {item.type === 'route' ? (
                    <Link
                      to={item.href}
                      onClick={toggleMobileMenu}
                      className="hover:underline underline-offset-4 text-white"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={toggleMobileMenu}
                      className="hover:underline underline-offset-4 text-white"
                    >
                      {item.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
              className="mt-10 flex flex-col items-center justify-center"
            >
              <div className="flex gap-4 text-4xl mb-6 leading-none">
                {LANGUAGES.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => {
                      i18n.changeLanguage(code)
                      setMobileOpen(false)
                    }}
                    className={`transition hover:scale-125 ${
                      i18n.language === code ? 'opacity-100' : 'opacity-60'
                    }`}
                    aria-label={`Langue : ${code}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <ThemeToggle />

              <img
                src="/logo.png"
                alt="Logo"
                className="opacity-90 filter invert brightness-0 w-[200px]"
              />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

function NavItem({ href, type = 'route', children }) {
  const commonClasses = 'relative group transition hover:text-green-800 dark:hover:text-white'

  if (type === 'route') {
    return (
      <Link to={href} className={commonClasses}>
        <span>{children}</span>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-800 dark:bg-white transition-all duration-300 group-hover:w-full" />
      </Link>
    )
  }

  return (
    <a href={href} className={commonClasses}>
      <span>{children}</span>
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-800 dark:bg-white transition-all duration-300 group-hover:w-full" />
    </a>
  )
}
