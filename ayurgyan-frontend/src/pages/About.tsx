import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About AyurGyan</h1>
      <div className="about-content">
        <p className="about-description">
          AyurGyan is a comprehensive digital encyclopedia of traditional and herbal medicine, 
          documenting ancient knowledge with scientific validation for modern healthcare.
        </p>
        <p className="about-description">
          Our mission is to bridge the gap between traditional wisdom and modern scientific research, 
          providing reliable, evidence-based information about herbal remedies and traditional healing practices.
        </p>
      </div>
    </div>
  );
};

export default About;