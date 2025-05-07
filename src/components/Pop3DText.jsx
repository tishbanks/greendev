import React, { useState, useEffect } from 'react'

export default function Pop3DText({ text, delay = 60, onComplete }) {
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

  // Découpe par mots pour éviter les césures
  const words = text.split(' ')

  return (
    <span
      className="inline-block leading-snug"
      style={{
        perspective: '1000px',
        whiteSpace: 'normal',
        wordBreak: 'keep-all',
        transformStyle: 'preserve-3d',
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
                  transform: isVisible
                    ? 'translateZ(0) scale(1)'
                    : 'translateZ(100px) scale(1.5)',
                  transition: 'transform 0.4s ease-out, opacity 0.3s ease-out',
                  transitionDelay: `${globalIndex * delay}ms`,
                  transformOrigin: 'center',
                  textShadow: isVisible
                    ? '0 2px 6px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.15)'
                    : 'none',
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
