import React from 'react'
import {Title} from './TypographyGuide'

const creations = [
  {
    title: 'Site de voyage @slowtravelwithtish',
    image: '/crea/crea1.png',
    features: [
      'Carte interactive',
      'Mise à jour mobile',
      'Données EXIF auto',
      'Trajets calculés sur carte',
      'Posts Insta automatisés',
    ],
  },
  {
    title: "L'atelier de la matière",
    image: '/crea/crea2.png',
    features: [
      'Réservations en ligne',
      'App mobile de gestion',
      'Inscriptions en temps réel',
      'API pour les cours',
      'Posts auto réseaux sociaux',
    ],
  },
  {
    title: 'Site de location écolo',
    image: '/crea/crea3.png',
    features: [
      'Données ADEME intégrées',
      'Calcul empreinte carbone',
      'Graphiques dynamiques',
      'Export CSV simplifié',
    ],
  },
]

export default function CreaSection() {
  return (
    <section
      id="crea"
      className="py-20 px-4 bg-gradient-to-b text-center from-white to-green-50 dark:from-[#0b1f1c] dark:to-[#1d352c]"
    >
      <Title>
        Créations GreenDev</Title>


      <div className="flex flex-col md:flex-row gap-10 max-w-7xl mx-auto">
        {creations.map((crea, index) => (
          <div key={index} className="flex-1 group relative overflow-visible">
            {/* IMAGE PRINCIPALE */}
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src={crea.image}
                alt={crea.title}
                className="w-full h-[260px] object-cover grayscale group-hover:grayscale-0 transition duration-500"
              />
            </div>

{/* REFLET */}
<div className="relative rounded-xl h-[260px] overflow-hidden">
  {/* IMAGE inversée */}
  <div className="h-[260px] transform scale-y-[-1]">
    <img
      src={crea.image}
      alt=""
      className="w-full h-full object-cover opacity-30 blur-sm grayscale group-hover:grayscale-0 transition duration-700"
    />
  </div>


  {/* TEXTE superposé, même taille */}
  <div className="absolute inset-0 px-4 text-sm text-green-900 dark:text-white text-center flex flex-col items-center justify-center opacity-40 group-hover:opacity-80 transition duration-700 z-50">
    <h3 className="font-bold text-lg mb-2">{crea.title}</h3>
    <ul className="space-y-1">
      {crea.features.map((feat, i) => (
        <li key={i}>• {feat}</li>
      ))}
    </ul>
  </div>

  {/* FADE-OUT */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 dark:via-[#0b1f1c]/70 to-white dark:to-[#0b1f1c] pointer-events-none z-20" />
</div>

          </div>
        ))}
      </div>
    </section>
  )
}
