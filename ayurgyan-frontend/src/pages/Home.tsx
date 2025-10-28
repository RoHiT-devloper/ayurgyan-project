import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Shield } from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Traditional Knowledge',
      description: 'Comprehensive documentation of ancient herbal remedies and traditional practices'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Scientific Validation',
      description: 'Evidence-based research and clinical studies supporting traditional uses'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Safety First',
      description: 'Detailed safety information, contraindications, and usage guidelines'
    }
  ];

  return (
      <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span>AyurGyan</span>
          </h1>
          <p className="hero-description">
            Discover the wisdom of traditional medicine with scientific validation. 
            Explore our comprehensive database of herbs, remedies, and research-backed information.
          </p>
          <div className="hero-actions">
            <Link to="/herbs" className="hero-btn hero-btn-primary">
              Explore Herbs
            </Link>
            <Link to="/search" className="hero-btn hero-btn-secondary">
              Advanced Search
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Why Choose AyurGyan?</h2>
            <p className="features-subtitle">
              Bridging traditional wisdom with modern science for safe and effective herbal medicine
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">
                  {feature.title}
                </h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Explore?</h2>
          <p className="cta-description">
            Join thousands of users who trust AyurGyan for authentic, 
            scientifically-validated traditional medicine information.
          </p>
          <div className="cta-actions">
            <Link to="/register" className="cta-btn hero-btn-primary">
              Get Started
            </Link>
            <Link to="/about" className="cta-btn hero-btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="disclaimer-banner">
        <p className="disclaimer-text">
          <strong>Important:</strong> The information provided is for educational purposes only. 
          Always consult with qualified healthcare professionals before using any herbal remedies.
        </p>
      </div>
    </div>
    );
};

export default Home;