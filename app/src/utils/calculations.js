// National Totals
export const NATIONAL_TOTALS = {
  totalCases: 125790,
  population: 199322679,
  crimeRatePer100k: 63.11,
  persons: { count: 45554, pct: 36.21, ratePer100k: 22.85 },
  property: { count: 65397, pct: 51.99, ratePer100k: 32.81 },
  authority: { count: 12144, pct: 9.65, ratePer100k: 6.09 },
  localActs: { count: 2695, pct: 2.14, ratePer100k: 1.35 }
};

// Formats numbers with commas (e.g. 125,790)
export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '—';
  return Math.round(num).toLocaleString('en-US');
}

// Formats decimal rate (e.g. 351.2)
export function formatRate(num, decimals = 1) {
  if (num === null || num === undefined || isNaN(num)) return '—';
  return Number(num).toFixed(decimals);
}

// Formats percentage (e.g. 36.1%)
export function formatPercent(num, decimals = 1) {
  if (num === null || num === undefined || isNaN(num)) return '—';
  return `${Number(num).toFixed(decimals)}%`;
}

// Natural Breaks / Calibrated Classification for each mode
export const CLASSIFICATIONS = {
  total_cases: {
    title: 'Reported Offences',
    unit: 'cases',
    breaks: [1000, 2500, 5000, 15000, 45385],
    labels: ['< 1,000', '1,000 – 2,500', '2,500 – 5,000', '5,000 – 15,000', '15,000+ (Lagos: 45,385)']
  },
  crime_rate: {
    title: 'Crime Rate per 100,000',
    unit: 'per 100k',
    breaks: [25, 50, 100, 200, 352],
    labels: ['< 25', '25 – 50', '50 – 100', '100 – 200', '200 – 352']
  },
  concentration: {
    title: 'Offence Concentration',
    unit: 'cases',
    breaks: [1000, 2500, 5000, 15000, 45385],
    labels: ['< 1,000', '1,000 – 2,500', '2,500 – 5,000', '5,000 – 15,000', 'Top 3 (Lagos, FCT, Delta)']
  },
  categories_overview: {
    title: 'Dominant Category Share',
    unit: '%',
    breaks: [35, 45, 55, 65, 80],
    labels: ['< 35%', '35 – 45%', '45 – 55%', '55 – 65%', '65%+']
  },
  rate_persons: {
    title: 'Offences Against Persons per 100k',
    unit: 'per 100k',
    breaks: [10, 20, 40, 80, 120],
    labels: ['< 10', '10 – 20', '20 – 40', '40 – 80', '80 – 120']
  },
  rate_property: {
    title: 'Offences Against Property per 100k',
    unit: 'per 100k',
    breaks: [15, 30, 60, 120, 178],
    labels: ['< 15', '15 – 30', '30 – 60', '60 – 120', '120 – 178']
  },
  rate_authority: {
    title: 'Offences Against Lawful Authority per 100k',
    unit: 'per 100k',
    breaks: [2, 5, 12, 25, 53],
    labels: ['< 2', '2 – 5', '5 – 12', '12 – 25', '25 – 53']
  },
  rate_local: {
    title: 'Offences Against Local Acts per 100k',
    unit: 'per 100k',
    breaks: [0.5, 1.5, 3, 6, 12],
    labels: ['< 0.5', '0.5 – 1.5', '1.5 – 3', '3 – 6', '6 – 12']
  },
  dominant_category: {
    title: 'Dominant Category',
    unit: 'category',
    categories: ['Property', 'Persons'],
    labels: ['Property (28 states)', 'Persons (9 states)']
  },
  dimension_scatter: {
    title: 'Crime Rate vs Persons %',
    unit: 'bivariate'
  },
  exploration: {
    title: 'Full Metric Explorer',
    unit: 'cases'
  },
  methodology: {
    title: 'Reporting Methodology',
    unit: 'metadata'
  }
};

// Returns value for the active map mode from state properties
export function getStateValue(props, mode) {
  if (!props) return 0;
  switch (mode) {
    case 'total_cases':
    case 'concentration':
    case 'exploration':
      return props.total_cases;
    case 'crime_rate':
      return props.crime_rate_per_100k;
    case 'rate_persons':
      return props.categories.persons.rate_per_100k;
    case 'rate_property':
      return props.categories.property.rate_per_100k;
    case 'rate_authority':
      return props.categories.lawful_authority.rate_per_100k;
    case 'rate_local':
      return props.categories.local_acts.rate_per_100k;
    case 'dominant_category':
      return props.dominant_category;
    case 'categories_overview':
      return props.dominant_pct;
    default:
      return props.total_cases;
  }
}
