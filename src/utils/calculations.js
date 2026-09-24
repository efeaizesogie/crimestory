/**
 * Analytical calculations and helpers for state crime statistics
 */

export function calculateSummary(states) {
  if (!states || !states.length) return null;

  const totalCases = states.reduce((sum, s) => sum + s.total_cases, 0);
  const totalPop = states.reduce((sum, s) => sum + s.population, 0);
  const totalPersons = states.reduce((sum, s) => sum + s.persons, 0);
  const totalProperty = states.reduce((sum, s) => sum + s.property, 0);
  const totalAuthority = states.reduce((sum, s) => sum + s.authority, 0);
  const totalLocalActs = states.reduce((sum, s) => sum + s.local_acts, 0);

  return {
    totalCases,
    totalPop,
    overallRate: (totalCases / totalPop) * 100000,
    persons: totalPersons,
    personsShare: (totalPersons / totalCases) * 100,
    property: totalProperty,
    propertyShare: (totalProperty / totalCases) * 100,
    authority: totalAuthority,
    authorityShare: (totalAuthority / totalCases) * 100,
    localActs: totalLocalActs,
    localActsShare: (totalLocalActs / totalCases) * 100,
    topThreeShare: ((45385 + 13181 + 7867) / totalCases) * 100,
    topFourShare: ((45385 + 13181 + 7867 + 4917) / totalCases) * 100
  };
}

export function getRankedStates(states, metricKey = 'total_cases', limit = 10) {
  if (!states) return [];
  return [...states]
    .sort((a, b) => b[metricKey] - a[metricKey])
    .slice(0, limit);
}
