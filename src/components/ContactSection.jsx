import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Title, Subtitle, Paragraph, ButtonText } from './TypographyGuide'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

export default function ContactSection() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.target
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const message = form.message.value.trim()

    if (!name || !email || !message || !email.includes('@')) {
      toast.error(t('contact.errors.invalid'))
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setSubmitted(true)
        toast.success(t('contact.success'), {
          style: {
            background: '#6EAD8C',
            color: '#fff',
            fontFamily: 'Rubik, sans-serif',
          },
          icon: '🌿',
        })
      } else {
        toast.error(t('contact.errors.failed'))
      }
    } catch (err) {
      console.error(err)
      toast.error(t('contact.errors.network'))
    } finally {
      setLoading(false)
    }
  }

  const formVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-[#B8E0E5] to-white text-green-800">
      <div className="max-w-xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <Title className="text-5xl sm:text-4xl mb-6 sm:mb-8">{t('contact.title')}</Title>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          <Subtitle className="mb-10 sm:mb-12 leading-relaxed text-base sm:text-lg">
            {t('contact.subtitle')}
          </Subtitle>
        </motion.div>

        {!submitted && (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 text-left"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <label htmlFor="name" className="block font-medium mb-1 font-rubik">
                {t('contact.fields.name')}
              </label>
              <input type="text" id="name" name="name" required className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 font-rubik" />
            </motion.div>

            <motion.div variants={item}>
              <label htmlFor="email" className="block font-medium mb-1 font-rubik">
                {t('contact.fields.email')}
              </label>
              <input type="email" id="email" name="email" required className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 font-rubik" />
            </motion.div>

            <motion.div variants={item}>
              <label htmlFor="message" className="block font-medium mb-1 font-rubik">
                {t('contact.fields.message')}
              </label>
              <textarea id="message" name="message" required rows="5" className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 font-rubik" />
            </motion.div>

            <motion.div variants={item}>
              <button type="submit" disabled={loading} className="w-full bg-[#6EAD8C] hover:bg-green-800 text-white py-3 px-6 rounded-full shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                <ButtonText>{loading ? t('contact.loading') : t('contact.send')}</ButtonText>
              </button>
            </motion.div>
          </motion.form>
        )}

        {submitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mt-8">
            <Paragraph className="text-green-700 text-xl font-semibold">
              {t('contact.thankyou')}
            </Paragraph>
          </motion.div>
        )}
      </div>
    </section>
  )
}
