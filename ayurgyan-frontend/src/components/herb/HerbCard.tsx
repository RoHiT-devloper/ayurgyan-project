import React from 'react';
import { Link } from 'react-router-dom';
import { Herb } from '../../types/herb';
import { getSafetyLevelInfo } from '../../utils/helpers';
import './HerbCard.css';

interface HerbCardProps {
  herb: Herb;
}

const HerbCard: React.FC<HerbCardProps> = ({ herb }) => {
  const safetyInfo = getSafetyLevelInfo(herb.safetyLevel);

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {herb.name}
          </h3>
          <span className={`badge badge-${safetyInfo.color}`}>
            {safetyInfo.label}
          </span>
        </div>

        {/* Scientific Name */}
        {herb.scientificName && (
          <p className="text-sm text-gray-600 italic mb-3">
            {herb.scientificName}
          </p>
        )}

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {herb.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>
            {herb.medicinalUses.length} medicinal use{herb.medicinalUses.length !== 1 ? 's' : ''}
          </span>
          <span>
            {herb.scientificStudies.length} study{herb.scientificStudies.length !== 1 ? 'ies' : ''}
          </span>
        </div>

        {/* Action */}
        <Link
          to={`/herbs/${herb.id}`}
          className="w-full btn btn-primary text-sm text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HerbCard;