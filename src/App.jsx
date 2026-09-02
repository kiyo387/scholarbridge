import { useEffect } from 'react'
import Lenis from 'lenis'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import IntakeForm from './components/IntakeForm'
import ResultsPage from './components/ResultsPage'
import BrutalistLayout from './components/BrutalistLayout'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
  
  return (
    <div className="app">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/form" 
            element={
              <BrutalistLayout>
                <IntakeForm />
              </BrutalistLayout>
            } 
          />
          <Route 
            path="/results" 
            element={
              <BrutalistLayout>
                <ResultsPage />
              </BrutalistLayout>
            } 
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
