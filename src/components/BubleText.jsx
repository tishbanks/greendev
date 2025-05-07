import React, { useState, useEffect } from 'react'

export default function BubbleText({ text, delay = 45, onComplete }) {
  const [visibleLetters, setVisibleLetters] = useState(0)

  useEffect(() => {
    if (visibleLetters < text.length) {
      const timeout = setTimeout(() => {
        setVisibleLetters((prev) => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    } else {
      if (onComplete) onComplete()
    }
  }, [visibleLetters, text.length, delay, onComplete])

  const words = text.split(' ')

  return (
    <span
      className="inline-block leading-snug"
      style={{
        whiteSpace: 'normal',
        wordBreak: 'keep-all',
      }}
    >
      {words.map((word, wIndex) => (
        <span key={wIndex} style={{ display: 'inline-block', marginRight: '0.4em' }}>
          {word.split('').map((char, i) => {
            const globalIndex = words
              .slice(0, wIndex)
              .reduce((acc, w) => acc + w.length + 1, 0) + i
            const isVisible = globalIndex < visibleLetters

            return (
              <span
                key={i}
                className="inline-block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1)' : 'scale(0)',
                  transition: 'transform 0.25s ease-out, opacity 0.25s ease-out',
                  transitionDelay: `${globalIndex * delay}ms`,
                }}
              >
                {char}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}
