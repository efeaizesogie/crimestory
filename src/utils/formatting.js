/**
 * Formatting utilities for editorial data display
 */

export function formatNumber(val) {
  if (val === null || val === undefined) return '—';
  return Number(val).toLocaleString('en-US');
}

export function formatRate(val, decimals = 1) {
  if (val === null || val === undefined) return '—';
  return Number(val).toFixed(decimals);
}

export function formatPercent(val, decimals = 1) {
  if (val === null || val === undefined) return '—';
  return `${Number(val).toFixed(decimals)}%`;
}

export function formatDivergence(val) {
  if (val === null || val === undefined) return '—';
  const num = Number(val);
  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(1)}%`;
}
