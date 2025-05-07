import React, { useState, useEffect } from 'react'

export default function Typewriter({ text, speed = 50, onComplete, hideCursor = false }) {
    const [displayedText, setDisplayedText] = useState('')
    const [index, setIndex] = useState(0)
    const [done, setDone] = useState(false)
  
    useEffect(() => {
        if (index < text.length) {
          const timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + text[index])
            setIndex(index + 1)
      
            // 💡 Joue un petit son à chaque lettre
            const audio = new Audio('/sounds/key.mp3')
            audio.volume = 0.2
            audio.play().catch((e) => {
              // Certains navigateurs bloquent si pas d'interaction
              console.warn('Audio playback blocked:', e)
            })
          }, speed)
          return () => clearTimeout(timeout)
        } else if (!done) {
          setDone(true)
          if (onComplete) onComplete()
        }
      }, [index, text, speed, done, onComplete])
      
  
    return (
      <span className="whitespace-pre-wrap block">
        {displayedText}
        {!hideCursor && !done && <span className="animate-blink">|</span>}
      </span>
    )
  }
  