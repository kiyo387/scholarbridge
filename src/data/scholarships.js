const scholarships = [
  // ─── Indian-side scholarships ───
  {
    id: 'nos',
    name: 'National Overseas Scholarship (NOS)',
    side: 'indian',
    country: 'India',
    degree_levels: ['masters', 'phd'],
    fields: 'any',
    eligible_categories: ['SC', 'ST'],
    income_max: 8,
    funding_type: 'Full tuition + living costs',
    stackable_with: ['csiss', 'jn-tata', 'kc-mahindra'],
    conflicts_with: ['tata-trusts', 'inlaks', 'chevening', 'commonwealth', 'fulbright'],
    notes: 'Government of India scholarship for SC/ST/nomadic tribes/landless agricultural labourers. Conflicts with other government scholarships funding the same purpose abroad.',
  },
  {
    id: 'rsm',
    name: 'Rajarshi Shahu Maharaj Scholarship (Maharashtra)',
    side: 'indian',
    country: 'India',
    degree_levels: ['bachelors', 'masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: 8,
    funding_type: 'Partial tuition support',
    stackable_with: ['csiss', 'jn-tata', 'kc-mahindra', 'daad', 'uni-waiver'],
    conflicts_with: [],
    notes: 'State-level scheme for Maharashtra-domicile students. Generally stackable with most other awards as it provides partial support only.',
  },
  {
    id: 'csiss',
    name: 'Central Sector Interest Subsidy Scheme',
    side: 'indian',
    country: 'India',
    degree_levels: ['bachelors', 'masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: 4.5,
    funding_type: 'Education loan interest subsidy',
    stackable_with: ['nos', 'rsm', 'jn-tata', 'kc-mahindra', 'tata-trusts', 'chevening', 'daad', 'commonwealth', 'fulbright', 'uni-waiver', 'inlaks'],
    conflicts_with: [],
    notes: 'Subsidises education loan interest during the moratorium period. Since it covers loan interest rather than direct funding, it is stackable with virtually all other scholarships.',
  },
  {
    id: 'tata-trusts',
    name: 'Tata Trusts Scholarship',
    side: 'indian',
    country: 'India',
    degree_levels: ['masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Merit + need-based grant',
    stackable_with: ['csiss', 'rsm', 'kc-mahindra', 'daad', 'uni-waiver'],
    conflicts_with: ['nos', 'inlaks', 'chevening', 'commonwealth', 'fulbright'],
    notes: 'Highly competitive merit-and-need-based award for PG study abroad. Conflicts with other full-ride scholarships covering the same expenses.',
  },
  {
    id: 'jn-tata',
    name: 'JN Tata Endowment Loan Scholarship',
    side: 'indian',
    country: 'India',
    degree_levels: ['masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Loan-scholarship hybrid',
    stackable_with: ['nos', 'rsm', 'csiss', 'kc-mahindra', 'tata-trusts', 'daad', 'chevening', 'commonwealth', 'fulbright', 'uni-waiver'],
    conflicts_with: [],
    notes: 'A loan-scholarship hybrid open to any field of study. Stackable with most awards since it is partially a loan component.',
  },
  {
    id: 'inlaks',
    name: 'Inlaks Shivdasani Foundation Scholarship',
    side: 'indian',
    country: 'India',
    degree_levels: ['masters'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Full cost coverage',
    stackable_with: ['csiss'],
    conflicts_with: ['nos', 'tata-trusts', 'chevening', 'commonwealth', 'fulbright', 'daad', 'uni-waiver'],
    notes: 'Covers full cost at top-tier global universities. Explicitly prohibits holding any other major funding source concurrently.',
  },
  {
    id: 'kc-mahindra',
    name: 'KC Mahindra Education Trust Scholarship',
    side: 'indian',
    country: 'India',
    degree_levels: ['masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Need-based loan scholarship',
    stackable_with: ['nos', 'rsm', 'csiss', 'jn-tata', 'tata-trusts', 'daad', 'chevening', 'commonwealth', 'fulbright', 'uni-waiver'],
    conflicts_with: [],
    notes: 'Need-based loan scholarship that is generally stackable with other awards.',
  },
  {
    id: 'narotam',
    name: 'Narotam Sekhsaria Scholarship',
    side: 'indian',
    country: 'India',
    degree_levels: ['masters'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Interest-free loan scholarship',
    stackable_with: ['csiss', 'rsm', 'jn-tata', 'kc-mahindra', 'daad', 'uni-waiver', 'rd-sethna'],
    conflicts_with: ['tata-trusts', 'inlaks', 'chevening', 'commonwealth', 'fulbright'],
    notes: 'A prestigious interest-free loan scholarship for post-graduate studies. Highly competitive, requires an excellent academic record.',
  },
  {
    id: 'aga-khan',
    name: 'Aga Khan Foundation International Scholarship',
    side: 'indian',
    country: 'India',
    degree_levels: ['masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: '50% Grant / 50% Loan',
    stackable_with: ['csiss', 'rsm', 'jn-tata', 'kc-mahindra', 'daad', 'uni-waiver', 'rd-sethna'],
    conflicts_with: ['tata-trusts', 'inlaks', 'chevening', 'commonwealth', 'fulbright'],
    notes: 'Provided as a 50% grant and 50% loan. Highly competitive, prioritized for Master\'s students.',
  },
  {
    id: 'rd-sethna',
    name: 'R.D. Sethna Loan Scholarship',
    side: 'indian',
    country: 'India',
    degree_levels: ['bachelors', 'masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Loan scholarship',
    stackable_with: ['csiss', 'rsm', 'jn-tata', 'kc-mahindra', 'daad', 'uni-waiver', 'narotam', 'aga-khan', 'tata-trusts', 'inlaks'],
    conflicts_with: [],
    notes: 'One of the oldest loan scholarships in India. Stackable with nearly all other grants and scholarships.',
  },
  {
    id: 'debesh',
    name: 'Debesh-Kamal Scholarship',
    side: 'indian',
    country: 'India',
    degree_levels: ['masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Partial grant (₹1 Lakh)',
    stackable_with: ['csiss', 'rsm', 'jn-tata', 'kc-mahindra', 'daad', 'uni-waiver', 'narotam', 'aga-khan', 'rd-sethna'],
    conflicts_with: [],
    notes: 'A one-time grant of around ₹1 Lakh for higher education abroad. Stackable with most other funding sources.',
  },
  {
    id: 'l-ramkumar',
    name: 'L. Ramkumar Foundation Scholarship',
    side: 'indian',
    country: 'India',
    degree_levels: ['bachelors', 'masters'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: 6,
    funding_type: 'Need-based grant',
    stackable_with: ['csiss', 'rsm', 'jn-tata', 'kc-mahindra', 'daad', 'uni-waiver', 'rd-sethna'],
    conflicts_with: [],
    notes: 'A need-based scholarship primarily targeting students from low-income backgrounds.',
  },

  // ─── Destination-side scholarships ───
  {
    id: 'chevening',
    name: 'Chevening Scholarship',
    side: 'destination',
    country: 'UK',
    degree_levels: ['masters'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Fully funded (tuition + living + flights)',
    stackable_with: ['csiss', 'jn-tata', 'kc-mahindra'],
    conflicts_with: ['nos', 'tata-trusts', 'inlaks', 'commonwealth'],
    notes: 'Prestigious UK government award for Master\'s study. Explicitly requires that scholars do not hold another scholarship concurrently.',
  },
  {
    id: 'commonwealth',
    name: 'Commonwealth Scholarship (UK)',
    side: 'destination',
    country: 'UK',
    degree_levels: ['masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Fully funded',
    stackable_with: ['csiss', 'jn-tata', 'kc-mahindra'],
    conflicts_with: ['nos', 'tata-trusts', 'inlaks', 'chevening', 'fulbright'],
    notes: 'Fully-funded Commonwealth award for Master\'s and PhD in the UK. Conflicts with other full-funding awards held simultaneously.',
  },
  {
    id: 'daad',
    name: 'DAAD Scholarship (Germany)',
    side: 'destination',
    country: 'Germany',
    degree_levels: ['masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Monthly stipend + travel allowance',
    stackable_with: ['rsm', 'csiss', 'jn-tata', 'kc-mahindra', 'tata-trusts', 'uni-waiver'],
    conflicts_with: ['inlaks'],
    notes: 'German Academic Exchange Service award. Generally stackable with partial Indian-side awards since it provides a stipend rather than full tuition.',
  },
  {
    id: 'fulbright',
    name: 'Fulbright-Nehru Fellowship',
    side: 'destination',
    country: 'USA',
    degree_levels: ['masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Fully funded',
    stackable_with: ['csiss', 'jn-tata', 'kc-mahindra'],
    conflicts_with: ['nos', 'tata-trusts', 'inlaks', 'chevening', 'commonwealth'],
    notes: 'US-India bilateral exchange programme. Fully funded and conflicts with other full-funding sources from both sides.',
  },
  {
    id: 'uni-waiver',
    name: 'University-Specific Fee Waiver',
    side: 'destination',
    country: 'any',
    degree_levels: ['bachelors', 'masters', 'phd'],
    fields: 'any',
    eligible_categories: 'any',
    income_max: null,
    funding_type: 'Partial/full tuition waiver (varies)',
    stackable_with: ['rsm', 'csiss', 'jn-tata', 'kc-mahindra', 'tata-trusts', 'daad'],
    conflicts_with: ['inlaks'],
    notes: 'University-level fee waivers vary by institution. Generally stackable with external scholarships unless the university specifically restricts it.',
  },
]

export default scholarships

/**
 * Matches scholarships against a student profile.
 * Returns an array of matched scholarship objects with computed compatibility info.
 */
export function matchScholarships(profile) {
  const { country, degreeLevel, fieldOfStudy, category, incomeRange, existingScholarship, domicileState, academicScore, targetIntake } = profile

  // Parse income to a number (in lakhs)
  const incomeMap = {
    'below-2.5': 2.5,
    '2.5-6': 6,
    '6-10': 10,
    'above-10': 100,
  }
  const studentIncome = incomeMap[incomeRange] || 100

  // Normalize the existing scholarship input to try matching an ID
  const existingId = existingScholarship
    ? scholarships.find(
        (s) =>
          s.name.toLowerCase().includes(existingScholarship.toLowerCase()) ||
          s.id.toLowerCase() === existingScholarship.toLowerCase()
      )?.id
    : null

  const matched = scholarships.filter((s) => {
    // Country filter: Indian-side scholarships always eligible;
    // destination-side must match target country or be 'any'
    if (s.side === 'destination' && s.country !== 'any' && s.country.toLowerCase() !== country.toLowerCase()) {
      // Special case: 'Others' country matches 'any' destination scholarships
      if (country.toLowerCase() !== 'others' || s.country !== 'any') {
        return false
      }
    }

    // Degree level filter
    if (!s.degree_levels.includes(degreeLevel)) {
      return false
    }

    // Category filter
    if (s.eligible_categories !== 'any' && !s.eligible_categories.includes(category)) {
      return false
    }

    // Income filter
    if (s.income_max !== null && studentIncome > s.income_max) {
      return false
    }

    // Domicile filter (Rajarshi Shahu Maharaj Scholarship requires Maharashtra domicile)
    if (s.id === 'rsm' && domicileState !== 'Maharashtra') {
      return false
    }

    // Academic score filter (Tata Trusts requires above 60%)
    if (s.id === 'tata-trusts' && academicScore === 'below-60') {
      return false
    }

    // Target Intake (Chevening deadlines are strictly Fall aligned)
    if (s.id === 'chevening' && targetIntake === 'Spring 2027') {
      return false
    }

    return true
  })

  // Compute compatibility info for each matched scholarship
  const matchedIds = matched.map((s) => s.id)

  const results = matched.map((s) => {
    // Find conflicts among matched results (bidirectional)
    const conflictsInResults = matched
      .filter((other) => (s.conflicts_with.includes(other.id) || other.conflicts_with.includes(s.id)) && s.id !== other.id)
      .map((other) => other.id)

    const conflictNames = conflictsInResults.map(
      (cid) => scholarships.find((x) => x.id === cid)?.name || cid
    )

    // Find stackables among matched results (bidirectional, conflict overrides stackable)
    const stackablesInResults = matched
      .filter((other) => {
        if (s.id === other.id) return false
        const isConflict = s.conflicts_with.includes(other.id) || other.conflicts_with.includes(s.id)
        if (isConflict) return false
        return s.stackable_with.includes(other.id) || other.stackable_with.includes(s.id)
      })
      .map((other) => other.id)

    const stackableNames = stackablesInResults.map(
      (cid) => scholarships.find((x) => x.id === cid)?.name || cid
    )

    // Check conflict with existing scholarship (bidirectional)
    let existingConflict = false
    let existingScholarshipName = null
    if (existingId) {
      const existingScholarshipObj = scholarships.find((x) => x.id === existingId)
      existingScholarshipName = existingScholarshipObj?.name || existingScholarship
      // Check both directions: does this scholarship conflict with existing, or does existing conflict with this?
      existingConflict =
        s.conflicts_with.includes(existingId) ||
        (existingScholarshipObj?.conflicts_with?.includes(s.id) ?? false)
      if (existingConflict && !conflictNames.includes(existingScholarshipName)) {
        conflictNames.push(existingScholarshipName)
      }
      
      const existingStackable = !existingConflict && (
        s.stackable_with.includes(existingId) ||
        (existingScholarshipObj?.stackable_with?.includes(s.id) ?? false)
      )
      if (existingStackable && !stackableNames.includes(existingScholarshipName)) {
        stackableNames.push(existingScholarshipName)
      }
    }

    // Determine status
    let status
    if (existingConflict) {
      status = 'conflict'
    } else if (conflictsInResults.length > 0) {
      status = 'conflict'
    } else {
      status = 'stackable'
    }

    return {
      ...s,
      status,
      conflictNames,
      stackableNames,
      existingConflict,
      existingScholarshipName,
    }
  })

  // Sort: conflicts first (if they involve the existing scholarship), then all others
  results.sort((a, b) => {
    if (a.existingConflict && !b.existingConflict) return -1
    if (!a.existingConflict && b.existingConflict) return 1
    if (a.status === 'conflict' && b.status !== 'conflict') return -1
    if (a.status !== 'conflict' && b.status === 'conflict') return 1
    return 0
  })

  return results
}
