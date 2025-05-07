import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import serviceDetails from '../data/serviceDetails'
import ServicePage from './ServicePage'
import Footer from './Footer'
import Header from './Header2'
import React, { useEffect } from 'react'

export default function ServicePageWrapper() {
  const { slug } = useParams()
  const data = serviceDetails[slug]

  useEffect(() => {
    if (data) {
      document.title = `${data.title} | GreenDev`
      
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = data.intro
    }
  }, [data])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  if (!data) {
    return (
      <>
        <Header />
        <div className="p-12 text-center text-red-600 text-xl">
          Oups ! Ce service n'existe pas.
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-white to-[#F0FAF8] min-h-screen w-full font-rubik text-green-900">
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-20 px-6 gap-12">
          <aside className="lg:w-1/4 hidden lg:block">
            <nav className="sticky top-32 space-y-4 text-green-800 font-medium">
              {Object.entries(serviceDetails).map(([key, s]) => (
                <Link
                  key={key}
                  to={`/services/${key}`}
                  className={`block px-3 py-2 rounded-md hover:bg-green-100 transition ${
                    key === slug ? 'bg-green-100 font-bold' : ''
                  }`}
                >
                  {s.title}
                </Link>
              ))}
            </nav>
          </aside>

          <AnimatePresence mode="wait">
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <ServicePage {...data} slug={slug} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  )
}
