import React, { useState, useEffect } from 'react'
import AnimatedText from './AnimatedText'
import { HeroTitle, Subtitle, ButtonText } from './TypographyGuide'
import { motion, AnimatePresence } from 'framer-motion'
import Typewriter from './Typewriter'
import { useTranslation } from 'react-i18next'

const effects = ['typewriter', 'scramble', 'buble', 'pop']

export default function HeroSection() {
  const { t, i18n } = useTranslation()
  const [mainText, setMainText] = useState('')
  const [effect, setEffect] = useState('typewriter')
  const [showSecondary, setShowSecondary] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showLogo, setShowLogo] = useState(false)

  // Sécurise les textes récupérés
  const getSafeText = (input, fallback = '') => {
    if (!input || typeof input !== 'string' || input.trim().length < 2) return fallback
    return input
  }

  useEffect(() => {
    const phrases = t('hero.mojo', { returnObjects: true })
    if (Array.isArray(phrases) && phrases.length > 0) {
      const randomIndex = Math.floor(Math.random() * phrases.length)
      const randomEffect = effects[Math.floor(Math.random() * effects.length)]
      setMainText(getSafeText(phrases[randomIndex], t('hero.fallbackTitle')))
      setEffect(randomEffect)
    } else {
      setMainText(t('hero.fallbackTitle'))
    }
  }, [t])

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

  const subtitle = getSafeText(t('hero.subtitle'))
  const cta = getSafeText(t('hero.cta'))

  return (
    <header
      className="relative bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-[#0b1f1c] dark:via-[#132b25] dark:to-[#18352d] text-green-900 dark:text-white min-h-screen flex flex-col items-center justify-center px-6"
      aria-label="Section d'accueil de GreenDev"
    >
      <div className="text-center max-w-3xl mx-auto">
        <HeroTitle>
          {mainText ? (
            <AnimatedText
              text={mainText}
              effect={effect}
              onComplete={() => setShowSecondary(true)}
            />
          ) : (
            <span>{t('hero.fallbackTitle')}</span>
          )}
        </HeroTitle>

        <div
          className="mb-8"
          style={{ minHeight: '2.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {showSecondary && subtitle && (
            <Subtitle>
              <Typewriter
                key={i18n.language + subtitle}
                text={subtitle}
                speed={30}
                hideCursor={true}
              />
            </Subtitle>
          )}
        </div>

        <div className="h-[3.5rem] flex items-center justify-center">
          {showButton && cta && (
            <a
              href="#contact"
              role="button"
              aria-label="Aller au formulaire de contact"
              className="inline-block z-50 bg-[#6EAD8C] hover:bg-green-800 dark:bg-green-700 dark:hover:bg-green-600 px-8 py-4 mb-6 rounded-full shadow-lg transition duration-300 opacity-100"
              style={{ transition: 'opacity 0.2s ease-in' }}
            >
              <ButtonText>{cta}</ButtonText>
            </a>
          )}
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
              alt="Logo de GreenDev"
              className="w-[250px] bottom-0 invert-0 dark:invert-0"
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
