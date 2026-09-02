import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { UserCheck, Search, ShieldCheck, IndianRupee, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export default function LandingPage() {
  const navigate = useNavigate()
  
  // Parallax ref
  const mockContainerRef = useRef(null)
  // Magnetic Button ref
  const ctaRef = useRef(null)
  
  // Custom cursor position
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  
  // Interpolate from deep dark to yellow green
  const journeyColor = useTransform(scrollYProgress, [0, 1], ['#0a0a0a', '#D2FF00'])
  const accentColor = prefersReducedMotion ? '#D2FF00' : journeyColor

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768 && !window.matchMedia('(hover: none)').matches)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    // Scroll Parallax
    const handleScroll = () => {
      if (mockContainerRef.current) {
        const scrolled = window.scrollY
        mockContainerRef.current.style.transform = `perspective(1000px) rotateY(-6deg) rotateX(2deg) translateY(calc(-4px + ${scrolled * 0.15}px))`
      }
    }

    // Mouse movement for cursor
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    // Button Magnetic Effect
    const btn = ctaRef.current
    const handleBtnMove = (e) => {
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`
    }
    const handleBtnLeave = () => {
      if (!btn) return
      btn.style.transform = `translate(0px, 0px) scale(1)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)
    
    // Add hover listener to interactive elements for cursor state
    const interactables = document.querySelectorAll('button, a')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => setIsHovering(true))
      el.addEventListener('mouseleave', () => setIsHovering(false))
    })

    if (btn) {
      btn.addEventListener('mousemove', handleBtnMove)
      btn.addEventListener('mouseleave', handleBtnLeave)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      if (btn) {
        btn.removeEventListener('mousemove', handleBtnMove)
        btn.removeEventListener('mouseleave', handleBtnLeave)
      }
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', () => setIsHovering(true))
        el.removeEventListener('mouseleave', () => setIsHovering(false))
      })
    }
  }, [isDesktop])

  return (
    <motion.main 
      style={{ cursor: isDesktop ? 'none' : 'auto' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {isDesktop && (
        <div 
          className="custom-cursor"
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: isHovering ? '40px' : '16px',
            height: isHovering ? '40px' : '16px',
            backgroundColor: isHovering ? 'rgba(210, 255, 0, 0.15)' : 'var(--primary)',
            border: isHovering ? '1px solid var(--primary)' : 'none',
            borderRadius: '0%',
            transform: `translate(calc(${cursorPos.x}px - 50%), calc(${cursorPos.y}px - 50%))`,
            pointerEvents: 'none',
            zIndex: 9999,
            transition: 'width 0.1s ease, height 0.1s ease, background-color 0.1s ease, border 0.1s ease',
            mixBlendMode: 'difference'
          }}
        />
      )}

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-mesh-bg" style={{ pointerEvents: 'none', zIndex: 0, position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {/* Marquee Background */}
          <div style={{ position: 'absolute', top: '20%', width: '200%', transform: 'rotate(-5deg) translateY(-50%)', opacity: 0.15, whiteSpace: 'nowrap' }}>
            <motion.h1 
              initial={{ x: '0%' }}
              animate={{ x: '-50%' }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ fontSize: '12rem', color: 'var(--primary)', margin: 0, display: 'inline-block' }}
            >
              SCHOLARBRIDGE // HIGH-SPEED MATCHING // FIND FUNDING //
            </motion.h1>
            <motion.h1 
              initial={{ x: '0%' }}
              animate={{ x: '-50%' }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ fontSize: '12rem', color: 'var(--primary)', margin: 0, display: 'inline-block' }}
            >
              SCHOLARBRIDGE // HIGH-SPEED MATCHING // FIND FUNDING //
            </motion.h1>
          </div>
        </div>
        <div className="noise-overlay"></div>
        <div className="hero-inner">
          <div className="hero-content">
            <span className="hero-eyebrow animate-hero-1" style={{ display: 'inline-block', marginBottom: '16px', color: 'var(--primary)', letterSpacing: '0.1em', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase' }}>
              Built for Indian Students
            </span>
            <h1 className="animate-hero-1">
              Fund your degree abroad — without losing money to the fine print.
            </h1>
            <p className="hero-sub animate-hero-2">
              ScholarBridge checks every Indian and international scholarship you qualify for, and flags
              exactly which ones you can safely combine.
            </p>
            <div className="hero-actions animate-hero-3">
              <motion.button 
                ref={ctaRef}
                className="btn btn-primary btn-lg" 
                onClick={() => navigate('/form')}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transition: 'transform 0.1s ease, box-shadow 350ms var(--ease-lux), background 350ms var(--ease-lux)' }}
              >
                Check My Scholarships
              </motion.button>
              <div className="hero-trust-line">
                Free demo · Takes under 2 minutes · No account needed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <motion.section 
        className="how-it-works"
        style={{ borderBottomColor: accentColor, borderBottomWidth: 1, borderBottomStyle: 'solid' }}
      >
        <div className="section-inner">
          <h2 className="section-title">How it works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <motion.span className="step-number" style={{ color: accentColor }}>01</motion.span>
              <h3>Tell us your plans</h3>
              <p>Answer 5 quick questions about where you want to study and your background.</p>
            </div>
            <div className="step-card">
              <motion.span className="step-number" style={{ color: accentColor }}>02</motion.span>
              <h3>We search the database</h3>
              <p>Our engine cross-references Indian government schemes with international university grants.</p>
            </div>
            <div className="step-card">
              <motion.span className="step-number" style={{ color: accentColor }}>03</motion.span>
              <h3>See safe combinations</h3>
              <p>We flag which scholarships you can safely stack without violating exclusivity clauses.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="section-inner">
          <h2 className="section-title">Why this matters</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">
                1,500 Cr+
              </div>
              <div className="stat-label">
                in scholarships go unclaimed by Indian students every year
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                60%+
              </div>
              <div className="stat-label">
                of funding conflicts are discovered only after a rejection letter arrives
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                3–5x
              </div>
              <div className="stat-label">
                more funding is possible when you strategically stack compatible scholarships
              </div>
            </div>
          </div>
          <p className="stat-disclaimer">
            * Illustrative figures based on publicly available reports and estimates
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="noise-overlay"></div>
        <span className="footer-brand">ScholarBridge</span> | eYIC 2026-27 Hackathon Track
      </footer>
    </motion.main>
  )
}
