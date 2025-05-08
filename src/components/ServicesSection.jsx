import React, { useEffect, useState } from 'react'
import AnimatedServiceCard from "./AnimatedServiceCard"
import { Title, Subtitle, Paragraph } from './TypographyGuide'
import { useTranslation } from 'react-i18next'

export default function ServicesSection() {
  const { t, i18n } = useTranslation()
  const [services, setServices] = useState([])

  useEffect(() => {
    const translated = t('services.list', { returnObjects: true })
    setServices(translated)
  }, [i18n.language, t]) // 🔁 se relance à chaque changement de langue

  return (
    <main>
      <section className="bg-gradient-to-b from-white to-[#F3EAC2] py-20 px-6" aria-labelledby="services-title">
        <div className="max-w-5xl mx-auto">
          <header className="text-center text-green-900 mb-12">
            <Title id="services-title">{t('services.title')}</Title>
            <Subtitle>{t('services.subtitle')}</Subtitle>
            <Paragraph>{t('services.intro')}</Paragraph>
          </header>

          <div className="grid grid-cols-1 gap-10" role="list">
            {services.map((service, index) => (
              <article key={service.slug} role="listitem" aria-label={service.title}>
                <AnimatedServiceCard
                  title={service.title}
                  description={service.description}
                  iconKey={service.iconKey}
                  slug={service.slug}
                  delay={index * 0.1}
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
