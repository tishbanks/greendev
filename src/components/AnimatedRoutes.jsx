// src/AnimatedRoutes.jsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from '../pages/LandingPage'
import ServicePageWrapper from './ServicePageWrapper'

export default function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services/:slug" element={<ServicePageWrapper />} />
      </Routes>
    </AnimatePresence>
  )
}
