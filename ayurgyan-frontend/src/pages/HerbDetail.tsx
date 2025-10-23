import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, TestTube, AlertTriangle, ImageIcon } from 'lucide-react';
import { Herb } from '../types/herb';
import { herbService } from '../services/herbService';
import { getSafetyLevelInfo, getEvidenceLevelInfo, getEvidenceStrengthInfo, formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HerbDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [herb, setHerb] = useState<Herb | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      loadHerb(parseInt(id));
    }
  }, [id]);

  const loadHerb = async (herbId: number) => {
    try {
      setLoading(true);
      const data = await herbService.getHerbById(herbId);
      setHerb(data);
    } catch (error) {
      console.error('Error loading herb:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!herb) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Herb not found</h2>
          <Link to="/herbs" className="btn btn-primary">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const safetyInfo = getSafetyLevelInfo(herb.safetyLevel);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'uses', label: 'Medicinal Uses', icon: TestTube },
    { id: 'studies', label: 'Scientific Studies', icon: TestTube },
    { id: 'safety', label: 'Safety Info', icon: AlertTriangle },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/herbs"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Herb Catalog
      </Link>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{herb.name}</h1>
                {herb.scientificName && (
                  <p className="text-xl text-gray-600 italic">{herb.scientificName}</p>
                )}
              </div>
              <span className={`badge ${safetyInfo.color} text-sm`}>
                {safetyInfo.label}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{herb.description}</p>
            
            <div className="flex items-center text-sm text-gray-500">
              <span>Last updated: {formatDate(herb.updatedAt)}</span>
            </div>
          </div>
          
          {herb.imageUrl && (
            <div className="mt-4 lg:mt-0 lg:ml-6">
              <img
                src={herb.imageUrl}
                alt={herb.name}
                className="w-48 h-48 object-cover rounded-lg shadow-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traditional Uses */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Traditional Uses</h3>
                <p className="text-gray-700 whitespace-pre-line">{herb.traditionalUses}</p>
              </div>

              {/* Active Compounds */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Compounds</h3>
                <p className="text-gray-700">{herb.activeCompounds}</p>
              </div>
            </div>
          </div>
        )}

        {/* Medicinal Uses Tab */}
        {activeTab === 'uses' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Medicinal Uses</h3>
            {herb.medicinalUses.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No medicinal uses documented yet.</p>
            ) : (
              <div className="space-y-6">
                {herb.medicinalUses.map((use) => {
                  const evidenceInfo = getEvidenceLevelInfo(use.evidenceLevel);
                  return (
                    <div key={use.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-medium text-gray-900">{use.condition}</h4>
                        <span className={`badge ${evidenceInfo.color}`}>
                          {evidenceInfo.label}
                        </span>
                      </div>
                      
                      {use.preparation && (
                        <div className="mb-3">
                          <strong className="text-gray-700">Preparation:</strong>
                          <p className="text-gray-700 mt-1">{use.preparation}</p>
                        </div>
                      )}
                      
                      {use.dosage && (
                        <div className="mb-3">
                          <strong className="text-gray-700">Dosage:</strong>
                          <p className="text-gray-700 mt-1">{use.dosage}</p>
                        </div>
                      )}
                      
                      {use.duration && (
                        <div>
                          <strong className="text-gray-700">Duration:</strong>
                          <p className="text-gray-700 mt-1">{use.duration}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Scientific Studies Tab */}
        {activeTab === 'studies' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Scientific Studies</h3>
            {herb.scientificStudies.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No scientific studies available yet.</p>
            ) : (
              <div className="space-y-6">
                {herb.scientificStudies.map((study) => {
                  const strengthInfo = getEvidenceStrengthInfo(study.evidenceStrength);
                  return (
                    <div key={study.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-medium text-gray-900">{study.title}</h4>
                        <span className={`badge ${strengthInfo.color}`}>
                          {strengthInfo.label}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <strong>Authors:</strong> {study.authors}
                        </div>
                        <div>
                          <strong>Journal:</strong> {study.journal} ({study.publicationYear})
                        </div>
                        {study.studyType && (
                          <div>
                            <strong>Study Type:</strong> {study.studyType}
                          </div>
                        )}
                        {study.doi && (
                          <div>
                            <strong>DOI:</strong> {study.doi}
                          </div>
                        )}
                      </div>
                      
                      {study.findings && (
                        <div>
                          <strong className="text-gray-700">Findings:</strong>
                          <p className="text-gray-700 mt-1">{study.findings}</p>
                        </div>
                      )}
                      
                      {study.url && (
                        <div className="mt-3">
                          <a
                            href={study.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 text-sm"
                          >
                            View Full Study →
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Safety Info Tab */}
        {activeTab === 'safety' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contraindications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contraindications</h3>
                {herb.contraindications ? (
                  <p className="text-gray-700 whitespace-pre-line">{herb.contraindications}</p>
                ) : (
                  <p className="text-gray-500">No specific contraindications documented.</p>
                )}
              </div>

              {/* Side Effects */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Side Effects</h3>
                {herb.sideEffects ? (
                  <p className="text-gray-700 whitespace-pre-line">{herb.sideEffects}</p>
                ) : (
                  <p className="text-gray-500">No side effects documented.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Medical Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-yellow-600 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-yellow-800">Medical Disclaimer</h3>
            <p className="text-yellow-700 text-sm mt-1">
              This information is for educational purposes only and is not intended as medical advice. 
              Always consult with a qualified healthcare professional before using any herbal remedies. 
              Individual results may vary, and proper diagnosis and treatment should be obtained from healthcare providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerbDetail;