import React, { useState, useEffect } from 'react';
import { Herb } from '../types/herb';
import { herbService } from '../services/herbService';
import HerbGrid from '../components/herb/HerbGrid';
import SearchFilters from '../components/herb/SearchFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HerbCatalog: React.FC = () => {
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [safetyLevel, setSafetyLevel] = useState('');

  useEffect(() => {
    loadHerbs();
  }, []);

  const loadHerbs = async () => {
    try {
      setLoading(true);
      const data = await herbService.getAllHerbs();
      setHerbs(data);
    } catch (error) {
      console.error('Error loading herbs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await herbService.searchHerbs({
        query: searchQuery,
        safetyLevel,
        evidenceLevel: ''
      });
      setHerbs(data);
    } catch (error) {
      console.error('Error searching herbs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Herb Catalog</h1>
        <p className="text-gray-600">
          Explore our comprehensive database of traditional medicinal herbs
        </p>
      </div>

      {/* Search and Filters */}
      <SearchFilters
        query={searchQuery}
        safetyLevel={safetyLevel}
        onQueryChange={setSearchQuery}
        onSafetyLevelChange={setSafetyLevel}
        onSearch={handleSearch}
      />

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {loading ? 'Loading herbs...' : `${herbs.length} herbs found`}
          </h2>
          {!loading && (
            <button
              onClick={loadHerbs}
              className="btn btn-secondary text-sm"
            >
              Reset Filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <HerbGrid herbs={herbs} />
        )}
      </div>
    </div>
  );
};

export default HerbCatalog;