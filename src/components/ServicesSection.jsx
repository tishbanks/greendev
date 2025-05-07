import React from 'react'
import AnimatedServiceCard from "./AnimatedServiceCard"
import { Title, Subtitle, Paragraph } from './TypographyGuide'

const services = [
  {
    title: 'Site internet sur mesure',
    description: `Nous concevons des sites web à votre image : rapides, accessibles, 
    responsives, et optimisés pour le référencement naturel (SEO). Chaque projet est 
    pensé pour mettre en valeur votre activité, vos services, et faciliter la navigation 
    de vos utilisateurs.`,
    iconKey: 'site',
    slug: 'site',
  },
  {
    title: 'Plateforme & API',
    description: `Vous avez besoin de connecter des outils entre eux ou de structurer 
    des flux métiers complexes ? Nous développons des plateformes web et des APIs 
    sur-mesure pour automatiser vos processus internes et améliorer la cohérence de vos données.`,
    iconKey: 'api',
    slug: 'api',
  },
  {
    title: 'Administration mobile',
    description: `Gérez votre activité en mobilité : publications, réservations, mises à jour… 
    Notre interface d’administration est pensée pour un usage fluide sur smartphone, 
    avec les fonctionnalités essentielles à portée de main.`,
    iconKey: 'mobile',
    slug: 'mobile',
  },
  {
    title: 'Gestionnaire de données',
    description: `Nous mettons en place des tableaux de bord interactifs vous permettant 
    de visualiser, filtrer et analyser vos données en temps réel. Ces outils sont personnalisés 
    selon vos indicateurs clés (KPI), pour une prise de décision éclairée.`,
    iconKey: 'data',
    slug: 'data',
  },
  {
    title: 'Espace clients & réservations',
    description: `Offrez à vos utilisateurs un espace personnel pour réserver, 
    payer en ligne, gérer leurs informations et recevoir des notifications. 
    Une interface moderne, sécurisée et conçue pour renforcer la relation client.`,
    iconKey: 'clients',
    slug: 'clients',
  },
  {
    title: 'Audit technique & éco-conception',
    description: `Nous analysons votre site existant pour identifier les points de friction 
    techniques, d’accessibilité et de performance environnementale. Vous repartez avec une feuille de route concrète.`,
    iconKey: 'site',
    slug: 'audit',
  },
  {
    title: 'Maintenance & évolutions continues',
    description: `Nous assurons la stabilité, les sauvegardes, les mises à jour et les ajouts 
    fonctionnels de votre solution. Idéal pour rester serein dans le temps.`,
    iconKey: 'mobile',
    slug: 'maintenance',
  },
  {
    title: 'Stratégie de contenu & SEO',
    description: `Nous structurons vos contenus et vous aidons à les optimiser pour 
    améliorer votre visibilité et votre impact auprès de votre audience.`,
    iconKey: 'data',
    slug: 'seo',
  }
]

export default function ServicesPage() {
  return (
    <main>
      <section className="bg-gradient-to-b from-white to-[#F3EAC2] py-20 px-6" aria-labelledby="services-title">
        <div className="max-w-5xl mx-auto">
          <header className="text-center text-green-900 mb-12">
            <Title id="services-title">Services Web sur mesure – GreenDev</Title>
            <Subtitle>Développement, plateformes, éco-conception, mobile & référencement naturel</Subtitle>
            <Paragraph>
              GreenDev vous accompagne dans la réalisation de solutions digitales robustes, durables et performantes : sites web, plateformes connectées, outils mobiles, espaces clients ou encore stratégie SEO. Chaque service est pensé pour répondre à vos enjeux métier et améliorer votre visibilité en ligne.
            </Paragraph>
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
