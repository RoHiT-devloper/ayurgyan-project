import React from 'react';
import { Search, Filter } from 'lucide-react';
import { SAFETY_LEVELS } from '../../utils/constants';
import './SearchFilters.css';

interface SearchFiltersProps {
  query: string;
  safetyLevel: string;
  onQueryChange: (query: string) => void;
  onSafetyLevelChange: (level: string) => void;
  onSearch: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  query,
  safetyLevel,
  onQueryChange,
  onSafetyLevelChange,
  onSearch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="card p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search herbs by name, scientific name, or description..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="input pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Safety Level Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Safety Level
            </label>
            <select
              value={safetyLevel}
              onChange={(e) => onSafetyLevelChange(e.target.value)}
              className="input"
            >
              <option value="">All Levels</option>
              {Object.entries(SAFETY_LEVELS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="sm:self-end">
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;