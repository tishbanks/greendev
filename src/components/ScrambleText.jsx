import React, { useState, useEffect } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}'

export default function ScrambleText({ text, speed = 60, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [tempChar, setTempChar] = useState('')

  // 🔁 Reset animation when text changes
  useEffect(() => {
    setDisplayed('')
    setCurrentIndex(0)
    setTempChar('')
  }, [text])

  useEffect(() => {
    if (currentIndex >= text.length) {
      if (onComplete) onComplete()
      return
    }

    let iteration = 0
    const maxIterations = 5
    const scrambleInterval = setInterval(() => {
      const targetChar = text[currentIndex]
      if (iteration < maxIterations && targetChar !== ' ') {
        setTempChar(CHARS[Math.floor(Math.random() * CHARS.length)])
        iteration++
      } else {
        clearInterval(scrambleInterval)
        setDisplayed((prev) => prev + targetChar)
        setCurrentIndex((prev) => prev + 1)
        setTempChar('')
      }
    }, speed / maxIterations)

    return () => clearInterval(scrambleInterval)
  }, [currentIndex, text, speed, onComplete])

  return (
    <span
      className="inline-block"
      style={{
        fontFamily: 'inherit',
        whiteSpace: 'normal',
        wordBreak: 'keep-all',
        textShadow: '0 2px 5px rgba(0,0,0,0.3)',
      }}
    >
      <span>{displayed}</span>
      {tempChar && (
        <span style={{ color: '#059669' }}>{tempChar}</span>
      )}
    </span>
  )
}
