import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'
import { matchScholarships } from '../data/scholarships'
import ResultCard from './ResultCard'
import { ArrowLeft, Search, CheckCircle, AlertTriangle, Info, BookOpen } from 'lucide-react'

const DEGREE_LABELS = {
  bachelors: "Bachelor's",
  masters: "Master's",
  phd: 'PhD',
}

export default function ResultsPage() {
  const navigate = useNavigate()
  const { profile } = useProfile()

  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!profile) {
      navigate('/form')
      return
    }

    // Brief loading for transition
    const timer = setTimeout(() => {
      const matched = matchScholarships(profile)
      setResults(matched)
      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [profile, navigate])

  if (!profile) return null

  const totalCount = results.length
  const stackableCount = results.filter((r) => r.status === 'stackable').length
  const conflictCount = results.filter((r) => r.status === 'conflict').length

  const degreeLabel = DEGREE_LABELS[profile.degreeLevel] || profile.degreeLevel
  const headerText = `${degreeLabel} in ${profile.fieldOfStudy}, ${profile.country}`

  return (
    <div className="results-page">
      <div className="results-container">
        {/* Back button */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate('/form')}
          style={{ marginBottom: 24 }}
        >
          Edit profile
        </button>

        {/* Header */}
        <div className="results-header">
          <h1>{headerText} — here's what you qualify for</h1>
          <p>
            Showing scholarships matched to your profile. Compatibility is checked against all
            results below.
          </p>
        </div>

        {loading ? (
          /* Skeleton loader */
          <div>
            {[1, 2, 3].map((i) => (
              <div className="skeleton-card" key={i}>
                <div className="skeleton-line w60" />
                <div className="skeleton-line w40" />
                <div className="skeleton-line w80" />
                <div className="skeleton-line w30" />
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <>
            {/* Summary strip */}
            <div className="results-summary-strip">
              <span className="summary-pill total">
                <Search size={14} />
                {totalCount} scholarship{totalCount !== 1 ? 's' : ''} found
              </span>
              <span className="summary-pill stackable">
                <CheckCircle size={14} />
                {stackableCount} safely stackable
              </span>
              {conflictCount > 0 && (
                <span className="summary-pill conflicts">
                  <AlertTriangle size={14} />
                  {conflictCount} conflict{conflictCount !== 1 ? 's' : ''} to watch
                </span>
              )}
            </div>

            {/* Existing scholarship alert */}
            {profile.existingScholarship && (
              <div className="existing-alert">
                <Info size={20} className="existing-alert-icon" />
                <div>
                  You told us you already have <strong>"{profile.existingScholarship}"</strong>.
                  We've checked every result below for compatibility with it — conflicts are
                  highlighted in red and shown first.
                </div>
              </div>
            )}

            {/* Results list */}
            <div className="results-list">
              {results.map((s) => (
                <ResultCard key={s.id} scholarship={s} />
              ))}
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="empty-state">
            <div className="empty-state-icon">
              <BookOpen size={36} />
            </div>
            <h2>No exact matches — but don't worry!</h2>
            <p>
              We couldn't find scholarships that perfectly match all your criteria. Try broadening
              your search — for example, check a different country or degree level.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/form')}>
              Adjust your profile
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
