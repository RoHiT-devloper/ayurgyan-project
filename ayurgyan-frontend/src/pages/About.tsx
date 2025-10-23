import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About AyurGyan</h1>
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-4">
          AyurGyan is a comprehensive digital encyclopedia of traditional and herbal medicine, 
          documenting ancient knowledge with scientific validation for modern healthcare.
        </p>
        <p className="text-gray-600">
          Our mission is to bridge the gap between traditional wisdom and modern scientific research, 
          providing reliable, evidence-based information about herbal remedies and traditional healing practices.
        </p>
      </div>
    </div>
  );
};

export default About;