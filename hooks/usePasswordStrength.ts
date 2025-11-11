import { useMemo } from 'react';

export function usePasswordStrength(password: string) {
  return useMemo(() => {
    if (!password) {
      return { score: 0, percent: 0, label: '', color: '#e5e7eb', suggestions: [] };
    }

    const checks = {
      length: password.length >= 8,
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(checks).reduce((s, v) => s + (v ? 1 : 0), 0);
    const percent = Math.round((score / Object.keys(checks).length) * 100);

    let label = 'Very weak';
    let color = '#ef4444'; // red
    if (score >= 5) {
      label = 'Strong';
      color = '#16a34a'; // green
    } else if (score === 4) {
      label = 'Good';
      color = '#22c55e';
    } else if (score === 3) {
      label = 'Fair';
      color = '#f59e0b';
    } else if (score === 2) {
      label = 'Weak';
      color = '#f97316';
    }

    const suggestions: string[] = [];
    if (!checks.length) suggestions.push('Use at least 8 characters.');
    if (!checks.upper) suggestions.push('Add an uppercase letter.');
    if (!checks.lower) suggestions.push('Add a lowercase letter.');
    if (!checks.number) suggestions.push('Include a number.');
    if (!checks.special) suggestions.push('Include a special character (e.g. !@#$%).');

    return { score, percent, label, color, suggestions };
  }, [password]);
}