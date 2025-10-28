import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">AyurGyan</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              A comprehensive digital encyclopedia of traditional and herbal medicine, 
              documenting ancient knowledge with scientific validation for modern healthcare.
            </p>
            <p className="text-sm text-gray-500">
              Aligned with UN Sustainable Development Goal 3: Good Health and Well-being
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/herbs" className="text-gray-400 hover:text-white transition-colors">Herb Catalog</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-white transition-colors">Advanced Search</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Project</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Traditional Texts</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 AyurGyan. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-sm text-center">
              Important: This information is for educational purposes only. Always consult healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;