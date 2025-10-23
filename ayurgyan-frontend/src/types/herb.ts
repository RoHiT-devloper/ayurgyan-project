export interface Herb {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  safetyLevel: 'SAFE' | 'CAUTION' | 'RESTRICTED';
  imageUrl: string;
  traditionalUses: string;
  activeCompounds: string;
  contraindications: string;
  sideEffects: string;
  medicinalUses: MedicinalUse[];
  scientificStudies: ScientificStudy[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicinalUse {
  id: number;
  condition: string;
  preparation: string;
  dosage: string;
  duration: string;
  evidenceLevel: 'TRADITIONAL' | 'ANECDOTAL' | 'SCIENTIFIC';
}

export interface ScientificStudy {
  id: number;
  title: string;
  authors: string;
  journal: string;
  publicationYear: number;
  doi: string;
  studyType: string;
  evidenceStrength: 'WEAK' | 'MODERATE' | 'STRONG' | 'VERY_STRONG';
  findings: string;
  url: string;
}

export interface SearchFilters {
  query: string;
  safetyLevel: string;
  evidenceLevel: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}