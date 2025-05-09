import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const isDark =
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    document.documentElement.classList.toggle('dark', isDark)
    setDark(isDark)
  }, [])

  const toggleTheme = () => {
    const newTheme = dark ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', !dark)
    localStorage.setItem('theme', newTheme)
    setDark(!dark)
  }

  return (
    <div className="relative z-0">
      <button
        onClick={toggleTheme}
        aria-label="Basculer thème clair/sombre"
        className="w-12 h-6 bg-green-300 dark:bg-green-800 rounded-full px-1 flex items-center relative shadow-inner transition-colors duration-300"
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full rounded-full pointer-events-none"
        />

        <motion.div
          animate={{ x: dark ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md relative z-10"
        >
          <AnimatePresence mode="wait" initial={false}>
            {dark ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <Moon className="w-4 h-4 text-green-900" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <Sun className="w-4 h-4 text-green-900" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </button>
    </div>
  )
}
