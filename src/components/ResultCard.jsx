import { useState } from 'react'
import { ChevronDown, ChevronUp, Globe, MapPin } from 'lucide-react'
import ConflictBadge from './ConflictBadge'

export default function ResultCard({ scholarship }) {
  const [expanded, setExpanded] = useState(false)

  const { id, name, side, funding_type, notes, status, conflictNames, stackableNames = [] } = scholarship

  // Determine visual hierarchy based on funding impact
  const isHighWeight = funding_type && (funding_type.toLowerCase().includes('fully funded') || funding_type.toLowerCase().includes('full tuition') || funding_type.toLowerCase().includes('up to £'))
  const weight = isHighWeight ? 'high' : 'low'

  return (
    <div className={`result-card ${status}`} data-weight={weight}>
      <div className="result-card-main">
        <div className="result-card-body">
          <div className="result-card-top">
            <span className="result-card-name">{name}</span>
            <span className={`source-tag ${side}`}>
              {side === 'indian' ? (
                <>
                  <MapPin size={11} /> Indian
                </>
              ) : (
                <>
                  <Globe size={11} /> International
                </>
              )}
            </span>
          </div>

          <div className="result-card-funding">
            <strong>Funding:</strong> {funding_type}
          </div>

          <ConflictBadge status={status} conflictNames={conflictNames} stackableNames={stackableNames} />
        </div>
      </div>

      <button
        className="result-card-toggle"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? (
          <>
            Hide details <ChevronUp size={16} />
          </>
        ) : (
          <>
            Show details <ChevronDown size={16} />
          </>
        )}
      </button>

      {expanded && (
        <div className="result-card-details">
          <p>{notes}</p>
          {id === 'uni-waiver' && (
            <p style={{ marginTop: '8px', color: 'var(--primary)' }}>
              <strong>Note:</strong> Please refer to your corresponding university website for specific details on fee waivers.
            </p>
          )}
          {conflictNames.length > 0 && (
            <p style={{ marginTop: '8px' }}>
              <strong>Conflicts with:</strong> {conflictNames.join(', ')}
            </p>
          )}
          {stackableNames.length > 0 && (
            <p style={{ marginTop: '8px' }}>
              <strong>Stackable with:</strong> {stackableNames.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
