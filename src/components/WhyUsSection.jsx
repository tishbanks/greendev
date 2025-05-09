import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Title, Subtitle, Paragraph } from './TypographyGuide'
import { useTranslation } from 'react-i18next'
import useIsDarkMode from '../hooks/useIsDarkMode'


export default function WhyUsSection() {
  const { t, i18n } = useTranslation()
  const points = t('why.points', { returnObjects: true })

  const isDark = useIsDarkMode()

  useEffect(() => {
    document.title = t('why.titleSeo')

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = t('why.metaDescription')
  }, [i18n.language, t])

  const sectionRef = useRef(null)
  const pointRefs = useRef(points.map(() => React.createRef()))
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const scrollToSection = (i) => {
    if (!sectionRef.current) return
    const sectionTop = sectionRef.current.offsetTop
    const y = sectionTop + i * window.innerHeight
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.offsetTop
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const relativeScroll = scrollY - sectionTop
      const stepHeight = viewportHeight

      let newIndex = Math.floor(relativeScroll / stepHeight)
      if (newIndex >= points.length) newIndex = points.length - 1
      if (newIndex < 0) newIndex = 0

      setIndex(newIndex)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [points.length])

  useEffect(() => {
    const handleVisibility = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      const inView =
        scrollY + viewportHeight >= sectionTop + viewportHeight * 0.8 &&
        scrollY <= sectionTop + sectionHeight - viewportHeight / 2

      setIsVisible(inView)
    }

    handleVisibility()
    window.addEventListener('scroll', handleVisibility)
    return () => window.removeEventListener('scroll', handleVisibility)
  }, [])

  const current = points[index]

  return (
    <section
      ref={sectionRef}
      style={{ height: `${points.length * 100}vh`, position: 'relative' }}
      className="relative"
    >
      {/* Background dynamique */}
      <motion.div
        animate={{ backgroundColor: isDark ? current.bgColorDark || current.bgColor : current.bgColor }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute inset-0 z-0"
      />

      {/* Bloc sticky central */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-0 px-6">
        <div className="text-white text-center max-w-3xl">
          {/* Header avec titre + timeline */}
          <motion.div
            key="why-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <AnimatePresence>
              {isVisible && (
                <>
                  {/* Timeline verticale (desktop) */}
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: -30, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="hidden md:flex fixed top-[20vh] left-[80px] h-[60vh] flex-col items-center justify-between z-10"
                  >
                    {points.map((point, i) => (
                      <motion.div
                        key={`desktop-${i}`}
                        onClick={() => scrollToSection(i)}
                        whileHover={{ scale: 1.1 }}
                        className="group cursor-pointer relative"
                      >
                        <div
                          className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center
                            ${i === index ? 'border-white bg-white text-black' : 'border-white/50 text-white/50 group-hover:bg-white group-hover:text-black'}`}
                        >
                          <span className="text-xl">{point.title.split(' ')[0]}</span>
                        </div>
                        <div className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-black/70 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {point.title.replace(/^.\s/, '')}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Timeline horizontale (mobile) */}
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="md:hidden fixed bottom-4 -translate-x-1/2 max-w-[90%] flex gap-4 justify-center items-center px-4 py-3 bg-black/60 rounded-full z-10"
                  >
                    {points.map((point, i) => (
                      <motion.div
                        key={`mobile-${i}`}
                        onClick={() => scrollToSection(i)}
                        whileHover={{ scale: 1.1 }}
                        className="group cursor-pointer relative shrink-0"
                      >
                        <div
                          className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center
                            ${i === index ? 'border-white bg-white text-black' : 'border-white/50 text-white/50 group-hover:bg-white group-hover:text-black'}`}
                        >
                          <span className="text-xl">{point.title.split(' ')[0]}</span>
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/70 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {point.title.replace(/^.\s/, '')}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Titre traduit */}
            <Title className="text-white drop-shadow-lg text-center">
              {t('why.title')}
            </Title>
          </motion.div>

          {/* Description dynamique */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <Subtitle className="text-black drop-shadow">{current.title}</Subtitle>
              <Paragraph className="text-4xl text-black drop-shadow">
                {current.description}
              </Paragraph>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll anchors */}
      {points.map((_, i) => (
        <div key={i} ref={pointRefs.current[i]} className="h-screen" />
      ))}

      {/* Bloc SEO caché */}
      <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        <section>
          <h2>{t('why.title')}</h2>
          <ul>
            {points.map((point, i) => (
              <li key={i}>
                <article>
                  <h3>{point.title.replace(/^.\s/, '')}</h3>
                  <p>{point.description}</p>
                </article>
              </li>
            ))}
          </ul>
          <p>{t('why.seoText')}</p>
        </section>
      </div>
    </section>
  )
}
