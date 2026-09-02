import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../context/ProfileContext'
import { BookOpen, User, AlertCircle } from 'lucide-react'
import MatchingSequence from './MatchingSequence'

const COUNTRIES = [
  { value: '', label: 'Select a country' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'Germany', label: 'Germany' },
  { value: 'USA', label: 'United States' },
  { value: 'Others', label: 'Other countries' },
]

const DEGREE_LEVELS = [
  { value: 'bachelors', label: "Bachelor's" },
  { value: 'masters', label: "Master's" },
  { value: 'phd', label: 'PhD' },
]

const FIELDS = [
  { value: '', label: 'Select a field' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Sciences', label: 'Sciences' },
  { value: 'Humanities', label: 'Humanities' },
  { value: 'Business', label: 'Business' },
  { value: 'Other', label: 'Other' },
]

const CATEGORIES = [
  { value: '', label: 'Select your category' },
  { value: 'General', label: 'General' },
  { value: 'OBC', label: 'OBC' },
  { value: 'SC', label: 'SC' },
  { value: 'ST', label: 'ST' },
  { value: 'EWS', label: 'EWS' },
]

const INCOME_RANGES = [
  { value: '', label: 'Select range' },
  { value: 'below-2.5', label: 'Below ₹2.5 Lakh' },
  { value: '2.5-6', label: '₹2.5L – ₹6 Lakh' },
  { value: '6-10', label: '₹6L – ₹10 Lakh' },
  { value: 'above-10', label: 'Above ₹10 Lakh' },
]

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
  'Delhi', 'Lakshadweep', 'Puducherry', 'Other'
]

const ACADEMIC_SCORES = [
  { value: '', label: 'Select academic score' },
  { value: 'below-60', label: 'Below 60% / < 6.0 CGPA' },
  { value: '60-75', label: '60% - 75% / 6.0 - 7.5 CGPA' },
  { value: '75-90', label: '75% - 90% / 7.5 - 9.0 CGPA' },
  { value: 'above-90', label: 'Above 90% / > 9.0 CGPA' },
]

const INTAKES = [
  { value: '', label: 'Select target intake' },
  { value: 'Fall 2026', label: 'Fall 2026' },
  { value: 'Spring 2027', label: 'Spring 2027' },
  { value: 'Fall 2027', label: 'Fall 2027' },
  { value: 'Undecided', label: 'Undecided' },
]

const REQUIRED_FIELDS = ['country', 'degreeLevel', 'fieldOfStudy', 'category', 'incomeRange', 'domicileState', 'academicScore', 'targetIntake']

const ERROR_MESSAGES = {
  country: "We need to know where you're headed",
  degreeLevel: "Pick the degree level you're aiming for",
  fieldOfStudy: 'Tell us what you want to study',
  category: 'This helps us match government schemes',
  incomeRange: 'Needed for income-linked scholarships',
  domicileState: 'Required for state-level scholarships',
  academicScore: 'Required for merit-based scholarships',
  targetIntake: 'Required for deadline matching',
}

export default function IntakeForm() {
  const navigate = useNavigate()
  const { profile, setProfile } = useProfile()

  const [form, setForm] = useState(profile || {
    country: '',
    degreeLevel: '',
    fieldOfStudy: '',
    category: '',
    incomeRange: '',
    domicileState: '',
    academicScore: '',
    targetIntake: '',
    existingScholarship: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isMatching, setIsMatching] = useState(false)
  const [isStateOpen, setIsStateOpen] = useState(false)
  
  const dropdownRef = useRef(null)

  const filteredStates = INDIAN_STATES.filter(s => 
    s.toLowerCase().includes(form.domicileState.toLowerCase())
  )

  useEffect(() => {
    const el = dropdownRef.current
    if (!el) return

    const handleWheel = (e) => {
      e.preventDefault()
      // Reduce the scroll delta to 35% of its normal speed
      el.scrollTop += e.deltaY * 0.35
    }

    // Must be non-passive to allow preventDefault
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [isStateOpen, filteredStates])

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function validate() {
    const newErrors = {}
    for (const field of REQUIRED_FIELDS) {
      if (!form[field]) {
        newErrors[field] = ERROR_MESSAGES[field]
      }
    }
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Scroll to the first error
      const firstError = document.querySelector('.form-group .error')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setProfile(form)
    setIsMatching(true)
  }

  function handleMatchingComplete() {
    navigate('/results')
  }

  return (
    <motion.div 
      className="form-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="form-container">
        <div className="form-header">
          <h1>Let's find your matches</h1>
          <p>Built exclusively for Indian students. Takes under a minute — and we'll check compatibility for free.</p>
        </div>

        <AnimatePresence mode="wait">
          {!isMatching ? (
            <motion.form 
              key="form"
              className="form-card" 
              onSubmit={handleSubmit} 
              transition={{ duration: 0.8, ease: "easeInOut" }}
              noValidate
            >
          {/* ── About your studies ── */}
          <div className="form-section-title">
            <BookOpen size={16} />
            About your studies
          </div>

          {/* Country */}
          <div className="form-group">
            <label className="form-label" htmlFor="country">
              Target country <span className="required">*</span>
            </label>
            <select
              id="country"
              className={`form-select ${errors.country ? 'error' : ''}`}
              value={form.country}
              onChange={(e) => updateField('country', e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {errors.country && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.country}
              </div>
            )}
          </div>

          {/* Degree Level */}
          <div className="form-group">
            <label className="form-label">
              Degree level <span className="required">*</span>
            </label>
            <div className="degree-buttons">
              {DEGREE_LEVELS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  className={`degree-btn ${form.degreeLevel === d.value ? 'active' : ''} ${
                    errors.degreeLevel && submitted ? 'error' : ''
                  }`}
                  onClick={() => updateField('degreeLevel', d.value)}
                >
                  {d.label}
                </button>
              ))}
            </div>
            {errors.degreeLevel && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.degreeLevel}
              </div>
            )}
          </div>

          {/* Field of Study */}
          <div className="form-group">
            <label className="form-label" htmlFor="field">
              Field of study <span className="required">*</span>
            </label>
            <select
              id="field"
              className={`form-select ${errors.fieldOfStudy ? 'error' : ''}`}
              value={form.fieldOfStudy}
              onChange={(e) => updateField('fieldOfStudy', e.target.value)}
            >
              {FIELDS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            {errors.fieldOfStudy && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.fieldOfStudy}
              </div>
            )}
          </div>

          {/* Academic Score */}
          <div className="form-group">
            <label className="form-label" htmlFor="academicScore">
              Current academic score <span className="required">*</span>
            </label>
            <select
              id="academicScore"
              className={`form-select ${errors.academicScore ? 'error' : ''}`}
              value={form.academicScore}
              onChange={(e) => updateField('academicScore', e.target.value)}
            >
              {ACADEMIC_SCORES.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
            {errors.academicScore && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.academicScore}
              </div>
            )}
          </div>

          {/* Target Intake */}
          <div className="form-group">
            <label className="form-label" htmlFor="targetIntake">
              Target intake <span className="required">*</span>
            </label>
            <select
              id="targetIntake"
              className={`form-select ${errors.targetIntake ? 'error' : ''}`}
              value={form.targetIntake}
              onChange={(e) => updateField('targetIntake', e.target.value)}
            >
              {INTAKES.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
            {errors.targetIntake && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.targetIntake}
              </div>
            )}
          </div>

          <div className="form-divider" />

          {/* ── About you ── */}
          <div className="form-section-title">
            <User size={16} />
            About you
          </div>

          {/* State of Domicile */}
          <div className="form-group custom-dropdown-container">
            <label className="form-label" htmlFor="domicileState">
              State of Domicile <span className="required">*</span>
            </label>
            <input
              id="domicileState"
              autoComplete="off"
              className={`form-input ${errors.domicileState ? 'error' : ''}`}
              placeholder="Select your state"
              value={form.domicileState}
              onChange={(e) => {
                updateField('domicileState', e.target.value)
                setIsStateOpen(true)
              }}
              onFocus={(e) => {
                e.target.placeholder = 'Type to search...'
                setIsStateOpen(true)
              }}
              onBlur={(e) => {
                e.target.placeholder = 'Select your state'
                setTimeout(() => setIsStateOpen(false), 200)
              }}
            />
            
            <AnimatePresence>
              {isStateOpen && filteredStates.length > 0 && (
                <motion.ul 
                  ref={dropdownRef}
                  className="custom-dropdown-list"
                  data-lenis-prevent="true"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {filteredStates.map((s) => (
                    <li 
                      key={s} 
                      className="custom-dropdown-item"
                      onClick={() => {
                        updateField('domicileState', s)
                        setIsStateOpen(false)
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {errors.domicileState && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.domicileState}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              className={`form-select ${errors.category ? 'error' : ''}`}
              value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.category}
              </div>
            )}
          </div>

          {/* Income */}
          <div className="form-group">
            <label className="form-label" htmlFor="income">
              Annual family income <span className="required">*</span>
            </label>
            <select
              id="income"
              className={`form-select ${errors.incomeRange ? 'error' : ''}`}
              value={form.incomeRange}
              onChange={(e) => updateField('incomeRange', e.target.value)}
            >
              {INCOME_RANGES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            {errors.incomeRange && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.incomeRange}
              </div>
            )}
          </div>

          {/* Existing scholarship */}
          <div className="form-group">
            <label className="form-label" htmlFor="existing">
              Existing scholarship or offer{' '}
              <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="existing"
              type="text"
              className="form-input"
              placeholder="e.g. Chevening, university waiver — leave blank if none"
              value={form.existingScholarship}
              onChange={(e) => updateField('existingScholarship', e.target.value)}
            />
          </div>

          <div className="form-submit-area">
            <button type="submit" className="btn btn-primary">
              Find My Matches
            </button>
          </div>
        </motion.form>
          ) : (
            <motion.div
              key="matching"
              layoutId="form-container"
              className="form-card"
            >
              <MatchingSequence onComplete={handleMatchingComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
