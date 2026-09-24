/**
 * Story Chapters Configuration
 * Each chapter defines the narrative content, visual accents, map mode,
 * and custom interactive visualizations for scrollytelling.
 */

export const CHAPTERS = [
  // CHAPTER 01: THE BIG PICTURE
  {
    id: 'ch-01',
    title: 'The Big Picture',
    mode: 'TOTAL_CASES',
    eyebrow: 'CHAPTER 01 · THE BIG PICTURE',
    accentColor: '#EF4444',
    headline: 'WHERE WAS CRIME REPORTED?',
    paragraphs: [
      'In 2016, <strong>125,790 criminal offences</strong> were reported across Nigeria’s 36 states and the Federal Capital Territory.',
      'But the national total hides a deeply uneven geography. <strong>Lagos alone accounted for 45,385 reported offences</strong>, more than one-third (36.1%) of all cases recorded nationally.',
      'The Federal Capital Territory followed with 13,181, while Delta recorded 7,867 and Kano recorded 4,917. Together, just these locations accounted for the majority of all reported crime recorded in the country.'
    ],
    note: '<strong>Interactive Instruction:</strong> Hover over any state on the map to explore the exact reported counts, or select a state to view its complete profile.',
    customType: 'rankings'
  },

  // CHAPTER 02: POPULATION
  {
    id: 'ch-02',
    title: 'Population & Rates',
    mode: 'CRIME_RATE',
    eyebrow: 'CHAPTER 02 · POPULATION',
    accentColor: '#EAA171',
    headline: 'THE DENOMINATOR CHANGES THE STORY',
    paragraphs: [
      'Raw counts inherently favor populous places. A massive population creates more opportunities for offences to occur and be reported, so comparing states by total cases alone obscures fundamental differences in scale.',
      'Calculating <strong>rates per 100,000 residents</strong> allows us to ask a different question: <em> How many reported offences were recorded relative to the size of the population?</em>'
    ],
    stat: {
      type: 'pair',
      borderColor: 'rgba(234, 161, 113, 0.3)',
      items: [
        { jumbo: '351.2', unit: 'Lagos / 100k' },
        { jumbo: '337.0', unit: 'FCT / 100k' }
      ]
    },
    statAfterParagraphs: true,
    afterStatParagraphs: [
      'When normalized by population, Lagos (351.2) and the FCT (337.0) still lead, but the gap narrows dramatically. Meanwhile, states like <strong>Kano</strong>, which had the 4th highest raw count (4,917), drop sharply in rate (36.5 per 100k) due to its population of over 13.4 million.'
    ],
    note: 'The geography shifts when population enters the equation. This does not make one measure "correct" and the other "wrong." They answer different questions.'
  },

  // CHAPTER 03: CONCENTRATION
  {
    id: 'ch-03',
    title: 'Top 3 Concentration',
    mode: 'CONCENTRATION',
    eyebrow: 'CHAPTER 03 · CONCENTRATION',
    accentColor: '#EF4444',
    headline: 'THREE PLACES DOMINATE THE COUNT',
    headlineSub: 'Lagos · Federal Capital Territory · Delta',
    stat: {
      jumbo: '56.7%',
      unit: 'Of all reported offences in Nigeria'
    },
    paragraphs: [
      'Lagos, the Federal Capital Territory, and Delta together account for more than half (52.8%) of all reported offences in the dataset. Adding Kano brings this cluster to <strong>56.72%</strong> of the national volume.'
    ],
    customType: 'concentration',
    afterCustomParagraphs: [
      {
        text: 'Concentration in the raw count does not automatically mean these places had the highest rate of reported offences per resident. The distinction is vital for understanding crime geography.',
        style: { marginTop: 20 }
      }
    ]
  },

  // CHAPTER 04: FOUR CATEGORIES
  {
    id: 'ch-04',
    title: 'Four Categories',
    mode: 'PROPERTY_RATE',
    eyebrow: 'CHAPTER 04 · FOUR CATEGORIES',
    accentColor: '#F97316',
    headline: 'FOUR CRIMES. FOUR GEOGRAPHIES.',
    paragraphs: [
      'The national total is composed of four broad statutory offence categories. Each category presents a distinctly different geographic footprint across the country.'
    ],
    customType: 'categories',
    activeCategory: 'PROPERTY_RATE',
    note: 'The geography of crime changes immediately when the definition of crime changes. Click on any category above to transition the map.'
  },

  // CHAPTER 05: CRIMES AGAINST PERSONS
  {
    id: 'ch-05',
    title: 'Offences vs Persons',
    mode: 'PERSONS_RATE',
    eyebrow: 'CHAPTER 05 · PERSONS',
    accentColor: '#EF4444',
    headline: 'CRIMES AGAINST PERSONS',
    stat: {
      jumbo: '45,554',
      unit: 'Reported offences (36.2% of national total)'
    },
    paragraphs: [
      '<strong>45,554 reported offences</strong> in the national dataset were classified as offences against persons. This category encompasses crimes directly involving human beings, including murder, manslaughter, infanticide, concealment of birth, rape, and severe physical assault.',
      'On the map, <strong>Lagos records 119.4 per 100,000</strong>, while <strong>FCT records 76.3</strong> and <strong>Delta records 67.1</strong>.',
      'Notably, in states like Delta, Cross River, and Edo, offences against persons constitute a significantly higher proportion of total reported cases than they do in northern states.'
    ]
  },

  // CHAPTER 06: PROPERTY CRIME
  {
    id: 'ch-06',
    title: 'Offences vs Property',
    mode: 'PROPERTY_RATE',
    eyebrow: 'CHAPTER 06 · PROPERTY',
    accentColor: '#F97316',
    headline: 'PROPERTY OFFENCES DOMINATE THE NATIONAL TOTAL',
    stat: {
      jumbo: '65,397',
      unit: '52.0% of all reported offences in Nigeria',
      borderColor: 'rgba(249, 115, 22, 0.3)'
    },
    paragraphs: [
      'Offences against property represent more than half of all reported criminal cases in Nigeria. The category covers infractions involving belongings and assets, including stealing, receiving stolen property, robbery, burglary, housebreaking, and obtaining by false pretence.',
      'While Lagos logged the largest raw count (22,885 property cases), the <strong>Federal Capital Territory had the highest rate in the country: 239.0 per 100,000</strong>, followed by Lagos at 177.1.'
    ]
  },

  // CHAPTER 07: LAWFUL AUTHORITY
  {
    id: 'ch-07',
    title: 'Lawful Authority',
    mode: 'AUTHORITY_RATE',
    eyebrow: 'CHAPTER 07 · LAWFUL AUTHORITY',
    accentColor: '#14B8A6',
    headline: 'OFFENCES AGAINST LAWFUL AUTHORITY',
    stat: {
      jumbo: '12,144',
      unit: '9.7% of all recorded offences',
      borderColor: 'rgba(20, 184, 166, 0.3)'
    },
    paragraphs: [
      '<strong>12,144 offences</strong> were recorded against lawful authority. These encompass breaches against legal and regulatory establishments, contempt of legal process, and statutory tax-related infractions.',
      'Reporting in this category is heavily concentrated in commercial hubs and administrative centers where tax collection and institutional enforcement mechanisms are most active: <strong>Lagos leads with 52.4 per 100,000</strong>, followed by the FCT (21.6) and Delta (20.6).'
    ]
  },

  // CHAPTER 08: LOCAL ACTS
  {
    id: 'ch-08',
    title: 'Local Acts',
    mode: 'LOCAL_ACTS_RATE',
    eyebrow: 'CHAPTER 08 · LOCAL ACTS',
    accentColor: '#A855F7',
    headline: 'THE SMALLEST CATEGORY, A DISTINCT PATTERN',
    stat: {
      jumbo: '2,695',
      unit: '2.1% of national reported offences',
      borderColor: 'rgba(168, 85, 247, 0.3)'
    },
    paragraphs: [
      'Local Acts represent legislation enforceable solely within Nigeria, such as specific liquor control regulations or firearms licensing acts.',
      'Unlike property and authority offences which cluster around Lagos and Abuja, Local Acts offences show an entirely unique spatial pattern, led by <strong>Gombe State at 10.6 per 100,000</strong> (356 cases).'
    ]
  },

  // CHAPTER 09: STATE SIGNATURES
  {
    id: 'ch-09',
    title: 'State Signatures',
    mode: 'STATE_SIGNATURES',
    eyebrow: 'CHAPTER 09 · STATE PROFILES',
    accentColor: '#F97316',
    headline: 'EVERY STATE HAS A DIFFERENT SIGNATURE',
    paragraphs: [
      'The national aggregate masks the unique internal composition of each state. Across Nigeria, <strong>28 states are dominated by property offences</strong>, while <strong>9 states are dominated by offences against persons</strong>.',
      'Click on any state in the map or list below to inspect its unique composition fingerprint:'
    ],
    customType: 'profile'
  },

  // CHAPTER 10: DIVERGENCE
  {
    id: 'ch-10',
    title: 'Property Divergence',
    mode: 'PROPERTY_DIVERGENCE',
    eyebrow: 'CHAPTER 10 · DIVERGENCE',
    accentColor: '#F97316',
    headline: 'WHERE STATES DEPART FROM THE NATIONAL PROFILE',
    paragraphs: [
      'Property offences represented <strong>52.0%</strong> of all reported cases nationally. However, state-level reality departs markedly from this benchmark.',
      'This diverging map illustrates how far each state’s property share swings relative to the 52.0% national norm:'
    ],
    customType: 'divergence',
    note: 'Divergence highlights differences in composition, not a safety ranking. It reflects reporting characteristics and regional enforcement emphasis.'
  },

  // CHAPTER 11: SCATTERPLOT & EXPLORER STUDIO
  {
    id: 'ch-11',
    title: 'Synthesis & Scatter',
    mode: 'DOMINANT_CATEGORY',
    eyebrow: 'CHAPTER 11 · SYNTHESIS',
    accentColor: '#EF4444',
    headline: 'THERE IS NO SINGLE MAP OF CRIME',
    paragraphs: [
      'Raw counts reveal where the highest volume was processed. Rates show where reported cases were highest relative to population size. Category breakdowns expose divergent spatial patterns.'
    ],
    customType: 'scatter',
    afterCustomParagraphs: [
      {
        text: 'The map changes because the question changes. The geography of reported crime is not a single map—it is an ensemble of spatial dimensions revealed by the lens we choose.',
        style: { marginTop: 24 }
      }
    ]
  },

  // CHAPTER 12: LIMITATIONS
  {
    id: 'ch-12',
    title: 'Data Limitations',
    mode: 'TOTAL_CASES',
    eyebrow: 'CHAPTER 12 · CRITICAL READING',
    accentColor: '#6B7280',
    eyebrowColor: 'var(--text-muted)',
    headline: 'A MAP OF REPORTED CRIME IS NOT A MAP OF ALL CRIME',
    paragraphs: [
      'These data describe <strong>reported offences recorded in police records</strong>. They do not capture every crime that occurred.',
      'Differences in reporting willingness, trust in institutions, proximity to police stations, and record-keeping infrastructure all exert a profound influence on the observable data.',
      'A high count or rate should never be naively interpreted as proof of greater danger, nor a low count as proof of safety.'
    ],
    customType: 'methodology'
  }
];
