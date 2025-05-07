import { Paragraph } from './TypographyGuide'
import { motion } from 'framer-motion'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#6EAD8C] text-white py-10 px-6 text-center text-sm font-inter rounded-tl-2xl">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <Paragraph className="opacity-90 text-white">
          &copy; {new Date().getFullYear()} LH Green Dev. Tous droits réservés.
        </Paragraph>

        <Paragraph className="opacity-90 text-white">
          Site conçu avec 🌿 et passion. Hébergement local, design sobre et impact réduit.
        </Paragraph>

        <Paragraph className="opacity-90">
          <a
            href="mailto:contact@lhgreendev.fr"
            className="text-white underline hover:text-white/80 transition"
          >
            contact@lhgreendev.fr
          </a>
        </Paragraph>

        <motion.img
          src="/logo.png"
          alt="Logo LH Green Dev"
          className="opacity-90 filter invert brightness-0 w-[160px] sm:w-[200px] mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </footer>
  )
}
