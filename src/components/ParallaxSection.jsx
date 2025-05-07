import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import clsx from 'clsx'

export default function ParallaxSection({ imageUrl, children, height = '70vh' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height }}
    >
      {/* Parallax background */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt="Visuel Green Dev"
          className="w-full h-full object-cover opacity-80"
          loading="lazy"
        />
      </motion.div>

      {/* Foreground content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div
          className={clsx(
            'text-white text-center max-w-3xl font-poppins',
            'drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-xl md:text-2xl leading-relaxed'
          )}
        >
          {children || (
            <p>
              Green Dev conçoit des solutions web performantes, durables et sur mesure.
              Notre approche allie efficacité technique, éco-conception et stratégie digitale.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
