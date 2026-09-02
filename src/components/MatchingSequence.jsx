import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'

const DUMMY_SCHOLARSHIPS = [
  "DAAD Scholarship (Germany)",
  "Chevening Scholarship (UK)",
  "Inlaks Shivdasani",
  "Commonwealth Master's",
  "Fulbright-Nehru",
]

export default function MatchingSequence({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsDone(true)
      const timer = setTimeout(() => {
        onComplete()
      }, 1000)
      return () => clearTimeout(timer)
    }

    if (currentIndex < DUMMY_SCHOLARSHIPS.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
      }, 400) // 400ms per check * 5 = 2.0 seconds total
      return () => clearTimeout(timer)
    } else {
      setIsDone(true)
      const timer = setTimeout(() => {
        onComplete()
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, onComplete, prefersReducedMotion])

  return (
    <motion.div 
      className="matching-sequence"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        minHeight: '400px',
        textAlign: 'center'
      }}
    >
      {!isDone ? (
        <>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ marginBottom: '24px', color: 'var(--primary)' }}
          >
            <Loader2 size={48} />
          </motion.div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Checking Compatibility...</h2>
          <div style={{ height: '24px', overflow: 'hidden', color: 'var(--text-light-sub)' }}>
            <motion.p
              key={currentIndex}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              Checking {DUMMY_SCHOLARSHIPS[currentIndex] || "Finalizing"}...
            </motion.p>
          </div>
        </>
      ) : (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            style={{ color: 'var(--status-stackable)', display: 'inline-flex', marginBottom: '24px' }}
          >
            <CheckCircle2 size={64} />
          </motion.div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>14 schemes checked</h2>
          <p style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '1.125rem' }}>5 matches found</p>
        </motion.div>
      )}
    </motion.div>
  )
}
