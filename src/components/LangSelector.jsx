import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import i18n from 'i18next'

const LANGUAGES = [
  { code: 'fr', label: '🇫🇷' },
  { code: 'en', label: '🇬🇧' },
  { code: 'es', label: '🇪🇸' },
  { code: 'ja', label: '🇯🇵' },
]

export default function LangSelector() {
  const [open, setOpen] = useState(false)
  const currentLang = i18n.language
  const ref = useRef(null)

  const toggle = () => setOpen(!open)
  const selectLang = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  // Fermer au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative inline-block ml-4 z-50">
      <button
        onClick={toggle}
        aria-label="Changer de langue"
        className="w-10 h-10 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center shadow-inner hover:scale-105 transition"
        style={{
          fontSize: '1.5rem',
          fontFamily: `'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif`,
          lineHeight: 1,
        }}
      >
        {LANGUAGES.find((l) => l.code === currentLang)?.label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-green-900 rounded-xl shadow-xl py-3 px-4"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              {LANGUAGES.filter((l) => l.code !== currentLang).map(({ code, label }) => (
                <motion.button
                  key={code}
                  onClick={() => selectLang(code)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 text-2xl rounded-full flex items-center justify-center transition bg-transparent hover:bg-green-100 dark:hover:bg-green-800"
                  style={{
                    fontFamily: `'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif`,
                    lineHeight: 1,
                  }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
