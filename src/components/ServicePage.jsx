import { motion } from 'framer-motion'



export default function ServicePage({ title, intro, features, slug }) {
  return (
    <>
      <div className="mb-10">
        <div className="w-full h-[300px] overflow-hidden rounded-2xl shadow-md mb-8">
          <motion.img
            src={`/services/${slug}.jpg`}
            alt={title}
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight font-poppins"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-green-900/80 leading-relaxed font-rubik"
        >
          {intro}
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.15 }}
        className="space-y-6"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold mb-2 font-poppins"
        >
          Ce que nous proposons
        </motion.h2>

        <ul className="list-disc pl-6 space-y-2 text-green-900 font-rubik">
          {features.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-lg"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  )
}
