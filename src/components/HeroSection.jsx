import React, { useState, useEffect } from 'react'
import AnimatedText from './AnimatedText'
import { HeroTitle, Subtitle, ButtonText } from './TypographyGuide'
import mojo from '../data/mojo.json'
import { motion, AnimatePresence } from 'framer-motion'
import Typewriter from './TypeWriter'

const effects = ['typewriter', 'scramble', 'buble', 'pop']

export default function HeroSection() {
  const [mainText, setMainText] = useState('')
  const [effect, setEffect] = useState('typewriter')
  const [showSecondary, setShowSecondary] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * mojo.length)
    const randomEffect = effects[Math.floor(Math.random() * effects.length)]
    setMainText(mojo[randomIndex])
    setEffect(randomEffect)
  }, [])

  useEffect(() => {
    if (showSecondary) {
      const timeout1 = setTimeout(() => setShowButton(true), 1000)
      const timeout2 = setTimeout(() => setShowLogo(true), 1800)
      return () => {
        clearTimeout(timeout1)
        clearTimeout(timeout2)
      }
    }
  }, [showSecondary])

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-green-100 text-green-900 min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-3xl mx-auto">
        <HeroTitle>
          {mainText && (
            <AnimatedText
              text={mainText}
              effect={effect}
              onComplete={() => setShowSecondary(true)}
            />
          )}
        </HeroTitle>

        <div
          className="mb-8"
          style={{ minHeight: '2.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {showSecondary && (
            <Subtitle>
              <Typewriter
                text="Pensé pour durer. Créé pour vous."
                speed={30}
                hideCursor={true}
              />
            </Subtitle>
          )}
        </div>

        <div className="h-[3.5rem] flex items-center justify-center">
          <a
            href="#contact"
            className={`inline-block z-50 bg-[#6EAD8C] hover:bg-green-800 px-8 py-4 mb-6 rounded-full shadow-lg transition duration-300 ${
              showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ transition: 'opacity 0.2s ease-in' }}
          >
            <ButtonText>Discutons de votre projet</ButtonText>
          </a>
        </div>
      </div>

      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute bottom-1"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-[250px] bottom-0"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
