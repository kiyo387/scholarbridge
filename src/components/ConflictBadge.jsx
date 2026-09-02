import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle, AlertTriangle, Info } from 'lucide-react'

export default function ConflictBadge({ status, conflictNames = [], stackableNames = [] }) {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  if (status === 'stackable') {
    const label =
      stackableNames.length > 0
        ? `Stackable with ${stackableNames[0]}${stackableNames.length > 1 ? ` +${stackableNames.length - 1} more` : ''}`
        : 'Stackable'

    return (
      <motion.span 
        className="conflict-badge stackable"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
        whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: '4px' }}
        >
          <path d="M22 11.08V12a10 10 2-1-5.93-9.14" />
          <motion.path 
            d="M22 4L12 14.01l-3-3"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0.3 }}
            animate={{ pathLength: isHovered || prefersReducedMotion ? 1 : 0.3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </svg>
        {label}

        {isHovered && stackableNames.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="conflict-tooltip"
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              marginTop: '8px',
              padding: '8px 12px',
              background: 'var(--surface)',
              border: '1px solid var(--status-stackable-border)',
              borderRadius: '0px',
              color: 'var(--text-main)',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              zIndex: 50
            }}
          >
            Safe to combine with {stackableNames.join(', ')}
          </motion.div>
        )}
      </motion.span>
    )
  }

  if (status === 'conflict') {
    const label =
      conflictNames.length > 0
        ? `Conflicts with ${conflictNames[0]}${conflictNames.length > 1 ? ` +${conflictNames.length - 1} more` : ''}`
        : 'Has conflicts'
    return (
      <motion.span 
        className="conflict-badge conflict"
        style={{ cursor: 'help', position: 'relative' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
      >
        <AlertTriangle size={15} />
        {label}

        {isHovered && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="conflict-tooltip"
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              marginTop: '8px',
              padding: '8px 12px',
              background: 'var(--surface)',
              border: '1px solid var(--status-conflict-border)',
              borderRadius: '6px',
              color: 'var(--text-main)',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              zIndex: 50,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            Requires exclusive funding.
          </motion.div>
        )}
      </motion.span>
    )
  }

  return (
    <span className="conflict-badge check">
      <Info size={15} />
      Check requirements
    </span>
  )
}
