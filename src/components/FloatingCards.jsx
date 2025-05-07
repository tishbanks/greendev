import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function FloatingCard({
  children,
  floatDirection = 'up', // 'up' ou 'down'
  delay = 0,
}) {
  const { scrollYProgress } = useScroll()
  const floatY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0px', floatDirection === 'up' ? '-30px' : '30px']
  )

  return (
    <motion.div
      className="group bg-white/85 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-100 ease-out"
      style={{ y: floatY }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.04, // Subtile mais rapide agrandissement
        backgroundColor: '#166534', // Fond vert réactif
        color: '#ffffff', // Texte en blanc
        transition: { duration: 0.1 }, // Transition ultra rapide
      }}
    >
      {/* Texte interne avec couleur fluide */}
      <div className="text-green-800 group-hover:text-white transition-colors duration-100">
        {children}
      </div>
    </motion.div>
  )
}
