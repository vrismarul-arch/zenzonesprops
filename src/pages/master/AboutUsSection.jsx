import React from 'react';
import './AboutUsSection.css'; // Make sure to create this CSS file
import smartLockImage from './cctv.png'; // Replace with your actual image path

const AboutUsSection = () => {
  return (
    <section className="aboutUsSection">
      <div className="aboutUsContainer">
        
        <h2 className="aboutUsTitle">ABOUT US</h2>

        <div className="aboutContentWrapper">
          <div className="aboutTextBox glassBox">
            <p className="aboutDescription">
              Your safety begins where you live. From smart locks and CCTV to complete home automation, we secure what matters most — your loved ones.
            </p>
            <div className="statsRow">
              <div className="statItem">
                <span className="statNumber">3K+</span>
                <span className="statLabel">Customer</span>
              </div>
              <div className="statItem">
                <span className="statNumber">100M+</span>
                <span className="statLabel">Revenue</span>
              </div>
            </div>
          </div>

          <div className="aboutImageContainer">
            <img 
              src={smartLockImage} 
              alt="Smart lock and smartphone controlling it" 
              className="aboutImage" 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;