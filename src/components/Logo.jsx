import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Logo() {
  const [expanded, setExpanded] = useState(false)

  const handleHoverStart = () => setExpanded(true)
  const handleHoverEnd = () => setExpanded(false)

  // Positions manuelles des lettres selon le layout final
  const positions = {
    '<': expanded ? 0 : 0,
    G: expanded ? 20 : 20,
    r: 40,
    e1: 52,
    e2: 68,
    n: 84,
    D: expanded ? 102 : 40,
    e3: 122,
    v: 138,
    '/': expanded ? 160 : 70,
    '>': expanded ? 180 : 90,
  }

  const fadeLetters = ['r', 'e1', 'e2', 'n', 'e3', 'v']

  return (
    <div
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      className="relative h-full flex items-start text-[#6EAD8C] font-[Rubik] font-extrabold text-[30px] leading-none cursor-pointer"
    >
      {/* Conteneur des lettres positionnées absolument */}
      <div className="relative h-full w-full">
        {/* Lettres communes qui bougent */}
        <motion.span
          className="absolute"
          animate={{ x: positions['<'], y:-10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          &lt;
        </motion.span>

        <motion.span
          className="absolute"
          animate={{ x: positions['G'], y:-10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          G
        </motion.span>

        <motion.span
          className="absolute"
          animate={{ x: positions['D'], y:-10 }}
          transition={{ type: 'spring', stiffness: 100, delay:0.2 }}
        >
          D
        </motion.span>

        <motion.span
          className="absolute"
          animate={{ x: positions['/'], y:-10 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
          style={{ transformOrigin: 'center' }}
        >
          <motion.span
            animate={{ rotate: expanded ? 3600 : 0 }}
            transition={{ duration: 0.7, delay:0 }}
            className="inline-block"
          >
            /
          </motion.span>
        </motion.span>

        <motion.span
          className="absolute"
          animate={{ x: positions['>'], y:-10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          &gt;
        </motion.span>

        {/* Lettres qui apparaissent en fade */}
        {fadeLetters.map((letter, i) => (
  <motion.span
    key={letter}
    className="absolute"
    animate={{
      x: positions[letter],
      y: -10,
      opacity: expanded ? 1 : 0,
    }}
    transition={{
      duration: expanded ? 0.3 : 0.2,
      delay: expanded ? 0.4 + i * 0.05 : 0,
    }}
  >
    {letter.replace(/[0-9]/, '')}
  </motion.span>
))}
      </div>
    </div>
  )
}
