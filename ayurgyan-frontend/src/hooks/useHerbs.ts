import { useState, useEffect } from 'react';
import { Herb } from '../types/herb';
import { herbService } from '../services/herbService';

export const useHerbs = () => {
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHerbs();
  }, []);

  const loadHerbs = async () => {
    try {
      setLoading(true);
      const data = await herbService.getAllHerbs();
      setHerbs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load herbs');
      console.error('Error loading herbs:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchHerbs = async (query: string, safetyLevel: string = '') => {
    try {
      setLoading(true);
      const data = await herbService.searchHerbs({ query, safetyLevel, evidenceLevel: '' });
      setHerbs(data);
      setError(null);
    } catch (err) {
      setError('Search failed');
      console.error('Error searching herbs:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    herbs,
    loading,
    error,
    loadHerbs,
    searchHerbs
  };
};