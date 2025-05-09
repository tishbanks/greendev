import React, { useState, useEffect } from 'react'

export default function Typewriter({ text, speed = 50, onComplete, hideCursor = false }) {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  const safeText = typeof text === 'string' ? text : ''

  // 🔁 Reset à chaque nouveau texte
  useEffect(() => {
    setDisplayedText('')
    setIndex(0)
    setDone(false)
  }, [safeText])

  useEffect(() => {
    if (index < safeText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + safeText[index])
        setIndex(index + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else if (!done) {
      setDone(true)
      if (onComplete) onComplete()
    }
  }, [index, safeText, speed, done, onComplete])

  if (safeText.length === 0) return null

  return (
    <span className="whitespace-pre-wrap block">
      {displayedText}
      {!hideCursor && !done && <span className="animate-blink">|</span>}
    </span>
  )
}
