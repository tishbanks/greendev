import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FloatingCard from './FloatingCards'
import { Title, Subtitle, Paragraph } from './TypographyGuide'

export default function TayloredSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Parallaxe pour l'image de fond
  const bgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  // Parallaxe pour le texte
  const textY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  // Parallaxe pour les cartes flottantes
  const card1Y = useTransform(scrollYProgress, [0, 1], ['0px', '-30px'])
  const card2Y = useTransform(scrollYProgress, [0, 1], ['0px', '30px'])

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      {/* ✅ Background image avec parallaxe */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src="/images/customsolutions.webp"
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
      </motion.div>

      {/* ✅ Foreground content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6 text-green-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title className="text-4xl md:text-5xl mb-16" style={{ y: textY }}>
            Sur-mesure.
          </Title>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          {/* Carte flottante 1 avec parallaxe */}
          <motion.div
            style={{ y: card1Y }}
            className="relative"
          >
            <FloatingCard floatDirection="up" delay={0}>
              <Subtitle className="text-xl font-semibold mb-3">Unicité</Subtitle>
              <Paragraph>
                Nous développons des solutions uniques, en parfaite cohérence avec votre image de marque 
                et les exigences de votre métier. Chaque réalisation reflète votre singularité et votre vision.
              </Paragraph>
            </FloatingCard>
          </motion.div>

          {/* Carte flottante 2 avec parallaxe */}
          <motion.div
            style={{ y: card2Y }}
            className="relative"
          >
            <FloatingCard floatDirection="down" delay={0.2}>
              <Subtitle className="text-xl font-semibold mb-3">
                100% Vous
              </Subtitle>
              <Paragraph>
                Des interfaces entièrement personnalisables, conçues pour s’aligner parfaitement avec vos processus métier.  
                Chaque fonctionnalité est pensée sur mesure pour répondre à vos besoins spécifiques, dans une logique de performance, de clarté et de durabilité.
              </Paragraph>
            </FloatingCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
