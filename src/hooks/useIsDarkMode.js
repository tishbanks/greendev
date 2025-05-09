// src/hooks/useIsDarkMode.js
import { useEffect, useState } from 'react'

export default function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () =>
      document.documentElement.classList.contains('dark')

    const update = () => setIsDark(checkDark())

    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return isDark
}
