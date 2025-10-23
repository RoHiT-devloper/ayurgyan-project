import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Shield } from 'lucide-react';

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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="text-primary-600">AyurGyan</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the wisdom of traditional medicine with scientific validation. 
            Explore our comprehensive database of herbs, remedies, and research-backed information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/herbs" className="btn btn-primary text-lg px-8 py-3">
              Explore Herbs
            </Link>
            <Link to="/search" className="btn btn-secondary text-lg px-8 py-3">
              Advanced Search
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AyurGyan?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bridging traditional wisdom with modern science for safe and effective herbal medicine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Explore?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who trust AyurGyan for authentic, 
            scientifically-validated traditional medicine information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
            <Link to="/about" className="btn btn-secondary text-lg px-8 py-3">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-yellow-800 text-center">
            <strong>Important:</strong> The information provided is for educational purposes only. 
            Always consult with qualified healthcare professionals before using any herbal remedies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;