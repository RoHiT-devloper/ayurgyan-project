import React, { useState, useEffect } from 'react';
import { Herb } from '../types/herb';
import { herbService } from '../services/herbService';
import HerbGrid from '../components/herb/HerbGrid';
import SearchFilters from '../components/herb/SearchFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './HerbCatalog.css';

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
 <div className="catalog-container">
      {/* Header */}
      <div className="catalog-header">
        <h1 className="catalog-title">Herb Catalog</h1>
        <p className="catalog-description">
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
        <div className="results-header">
          <h2 className="results-title">
            {loading ? 'Loading herbs...' : `${herbs.length} herbs found`}
          </h2>
          {!loading && (
            <button
              onClick={loadHerbs}
              className="reset-button"
            >
              Reset Filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-container">
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