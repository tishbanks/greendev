import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Title, Subtitle, Paragraph } from './TypographyGuide'
import FloatingCard from './FloatingCards'


export default function MethodologySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Parallaxe sur l'image de fond
  const bgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <section ref={ref} className="relative py-24 px-6 bg-white text-green-900 border-t border-green-200">
      {/* ✅ Background image avec parallaxe */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src="/images/methodology-bg.webp"
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
      </motion.div>

      {/* ✅ Foreground content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title className="text-4xl md:text-5xl mb-14">
            Humain.
          </Title>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 text-left mt-16">
          <FloatingCard floatDirection="up" delay={0}>
            <Subtitle className="text-xl font-semibold mb-3">
            🧭 Écoute & immersion
            </Subtitle>
            <Paragraph>
            On échange pour comprendre vos valeurs, vos besoins réels et le contexte de votre projet. Sans jargon, sans pression, avec attention.
            </Paragraph>
          </FloatingCard>

          <FloatingCard floatDirection="down" delay={0.2}>
            <Subtitle className="text-xl font-semibold mb-3">
            🤝 Suivi humain & transparent
            </Subtitle>
            <Paragraph>
            Une fois le projet en ligne, je reste disponible pour faire évoluer, ajuster ou maintenir votre outil dans la durée.
            </Paragraph>
          </FloatingCard>
        </div>
      </div>
    </section>
  )
}
