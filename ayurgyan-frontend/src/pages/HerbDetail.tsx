import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, TestTube, AlertTriangle, ImageIcon } from 'lucide-react';
import { Herb } from '../types/herb';
import { herbService } from '../services/herbService';
import { getSafetyLevelInfo, getEvidenceLevelInfo, getEvidenceStrengthInfo, formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './HerbDetail.css';

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
      <div className="herb-detail-container">
        <div className="loading-container">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!herb) {
    return (
      <div className="herb-detail-container">
        <div className="not-found-container">
          <h2 className="not-found-title">Herb not found</h2>
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
    <div className="herb-detail-container">
      {/* Back Button */}
      <Link
        to="/herbs"
        className="back-button"
      >
        <ArrowLeft className="back-icon" />
        Back to Herb Catalog
      </Link>

      {/* Header */}
      <div className="herb-header">
        <div className="herb-header-content">
          <div className="herb-info">
            <div className="herb-header-top">
              <div>
                <h1 className="herb-name">{herb.name}</h1>
                {herb.scientificName && (
                  <p className="herb-scientific-name">{herb.scientificName}</p>
                )}
              </div>
              <span className={`badge badge-${safetyInfo.color}`}>
                {safetyInfo.label}
              </span>
            </div>
            
            <p className="herb-description">{herb.description}</p>
            
            <div className="herb-updated">
              <span>Last updated: {formatDate(herb.updatedAt)}</span>
            </div>
          </div>
          
          {herb.imageUrl && (
            <div className="herb-image-container">
              <img
                src={herb.imageUrl}
                alt={herb.name}
                className="herb-image"
              />
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-navigation">
        <nav className="tabs-list">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'tab-button-active' : ''}`}
              >
                <Icon className="tab-icon" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-panel">
            <div className="overview-grid">
              {/* Traditional Uses */}
              <div className="overview-section">
                <h3 className="overview-title">Traditional Uses</h3>
                <p className="overview-content">{herb.traditionalUses}</p>
              </div>

              {/* Active Compounds */}
              <div className="overview-section">
                <h3 className="overview-title">Active Compounds</h3>
                <p className="overview-content">{herb.activeCompounds}</p>
              </div>
            </div>
          </div>
        )}

        {/* Medicinal Uses Tab */}
        {activeTab === 'uses' && (
          <div className="tab-panel">
            <h3 className="uses-title">Medicinal Uses</h3>
            {herb.medicinalUses.length === 0 ? (
              <p className="uses-empty">No medicinal uses documented yet.</p>
            ) : (
              <div className="uses-list">
                {herb.medicinalUses.map((use) => {
                  const evidenceInfo = getEvidenceLevelInfo(use.evidenceLevel);
                  return (
                    <div key={use.id} className="use-card">
                      <div className="use-header">
                        <h4 className="use-condition">{use.condition}</h4>
                        <span className={`badge ${evidenceInfo.color}`}>
                          {evidenceInfo.label}
                        </span>
                      </div>
                      
                      {use.preparation && (
                        <div className="use-detail">
                          <strong className="use-label">Preparation:</strong>
                          <p className="use-value">{use.preparation}</p>
                        </div>
                      )}
                      
                      {use.dosage && (
                        <div className="use-detail">
                          <strong className="use-label">Dosage:</strong>
                          <p className="use-value">{use.dosage}</p>
                        </div>
                      )}
                      
                      {use.duration && (
                        <div className="use-detail">
                          <strong className="use-label">Duration:</strong>
                          <p className="use-value">{use.duration}</p>
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
          <div className="tab-panel">
            <h3 className="studies-title">Scientific Studies</h3>
            {herb.scientificStudies.length === 0 ? (
              <p className="studies-empty">No scientific studies available yet.</p>
            ) : (
              <div className="studies-list">
                {herb.scientificStudies.map((study) => {
                  const strengthInfo = getEvidenceStrengthInfo(study.evidenceStrength);
                  return (
                    <div key={study.id} className="study-card">
                      <div className="study-header">
                        <h4 className="study-title">{study.title}</h4>
                        <span className={`badge ${strengthInfo.color}`}>
                          {strengthInfo.label}
                        </span>
                      </div>
                      
                      <div className="study-meta">
                        <div className="study-meta-item">
                          <strong>Authors:</strong> {study.authors}
                        </div>
                        <div className="study-meta-item">
                          <strong>Journal:</strong> {study.journal} ({study.publicationYear})
                        </div>
                        {study.studyType && (
                          <div className="study-meta-item">
                            <strong>Study Type:</strong> {study.studyType}
                          </div>
                        )}
                        {study.doi && (
                          <div className="study-meta-item">
                            <strong>DOI:</strong> {study.doi}
                          </div>
                        )}
                      </div>
                      
                      {study.findings && (
                        <div className="study-findings">
                          <strong>Findings:</strong>
                          <p>{study.findings}</p>
                        </div>
                      )}
                      
                      {study.url && (
                        <div>
                          <a
                            href={study.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="study-link"
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
          <div className="tab-panel">
            <div className="safety-grid">
              {/* Contraindications */}
              <div className="safety-section">
                <h3 className="safety-title">Contraindications</h3>
                {herb.contraindications ? (
                  <p className="safety-content">{herb.contraindications}</p>
                ) : (
                  <p className="safety-empty">No specific contraindications documented.</p>
                )}
              </div>

              {/* Side Effects */}
              <div className="safety-section">
                <h3 className="safety-title">Side Effects</h3>
                {herb.sideEffects ? (
                  <p className="safety-content">{herb.sideEffects}</p>
                ) : (
                  <p className="safety-empty">No side effects documented.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Medical Disclaimer */}
      <div className="medical-disclaimer">
        <div className="disclaimer-content">
          <AlertTriangle className="disclaimer-icon" size={20} />
          <div>
            <h3 className="disclaimer-title">Medical Disclaimer</h3>
            <p className="disclaimer-text">
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