import { SAFETY_LEVELS, EVIDENCE_LEVELS, EVIDENCE_STRENGTH } from './constants';

export const getSafetyLevelInfo = (level: string) => {
  const info = SAFETY_LEVELS[level as keyof typeof SAFETY_LEVELS] || { label: level, color: 'gray' };
  return {
    ...info,
    // Map to the new badge classes
    badgeClass: `badge-${info.color.replace('bg-', '').replace('-100', '')}`
  };
};

export const getEvidenceLevelInfo = (level: string) => {
  return EVIDENCE_LEVELS[level as keyof typeof EVIDENCE_LEVELS] || { label: level, color: 'bg-gray-100 text-gray-800' };
};

export const getEvidenceStrengthInfo = (strength: string) => {
  return EVIDENCE_STRENGTH[strength as keyof typeof EVIDENCE_STRENGTH] || { label: strength, color: 'bg-gray-100 text-gray-800' };
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};