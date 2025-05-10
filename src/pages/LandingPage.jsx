import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import WhyUsSection from '../components/WhyUsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import FadeInSection from '../components/FadeInSection'
import ParallaxSection from '../components/ParallaxSection'
import ServicesSection from '../components/ServicesSection'
import { useTranslation } from 'react-i18next'
import CreaSection from '../components/CreaSection'


export default function LandingPage() {

  const { t } = useTranslation()



  return (
    <div className="bg-black min-h-screen flex justify-center">

      <Header />  


      <div className="bg-white w-full max-w-6xl shadow-xl">


        {/* ✅ Hero visible tout de suite */}
        <HeroSection />


          <ParallaxSection imageUrl="/images/lehavre.jpg">
            <h2 className="text-4xl font-bold mb-4">{t('parallax.title')}</h2>
            <p className="text-lg">{t('parallax.description')}</p>
          </ParallaxSection>








       <div id="services">
       <FadeInSection>

  <ServicesSection />

        </FadeInSection>

        </div>


        <div id="crea">
          <FadeInSection>
            <CreaSection />
          </FadeInSection>
        </div>

        <div id="why">
  <FadeInSection>
    <WhyUsSection />
  </FadeInSection>
</div>

      <div id="contact">
      <FadeInSection>
          <ContactSection />
        </FadeInSection>
        </div>


       <Footer />
      </div>
    </div>
  )
}
