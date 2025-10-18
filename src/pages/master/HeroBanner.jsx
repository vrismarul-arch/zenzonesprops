import React from 'react';
import './HeroBanner.css';
import leftCamera from './right.png'; // Placeholder path for left 3D camera image
import rightCamera from './left.png'; // Placeholder path for right 3D camera image
import flowLines from './bgele.png'; // Placeholder path for flow lines image
const HeroBanner = () => {
  return (
    <section className="heroSection">
      <div className="heroContainer">

        {/* Background Spheres */}
        <div className="bgElements">
          <span className="sphere sphere1"></span>
          <span className="sphere sphere2"></span>
          <span className="sphere sphere3"></span>
        </div>

        {/* 📸 3D Camera Images (Note: Swapped src to match visual placement) */}
        <img 
          src={leftCamera} // This camera is positioned on the left side of the screen
          alt="3D Security Camera Left" 
          className="cameraLeft" 
        />
        <img 
          src={rightCamera} // This camera is positioned on the right side of the screen
          alt="3D Security Camera Right" 
          className="cameraRight" 
        />
        
        {/* ✨ Flow Lines/Connections (Must be a transparent PNG/SVG asset) */}
        <div className="flowLines">
           <img 
             src={flowLines} // Replace with your actual asset path
             alt="Data Flow Lines" 
             className="flowImage" 
           />
        </div>

        {/* Main Glass Content Box */}
        <div className="heroContentBox glassBox">
          <h1 className="heroTitle">
            Protecting Your Home <br />
            Securing Your Peace
          </h1>
          <p className="heroDescription">
            Get round-the-clock protection with our cutting <br />
            edge security systems and monitoring services
          </p>
          <a href="tel:+919790984055" className="ctaButton">
  Call Now ➔
</a>

        </div>

      </div>
    </section>
  );
};

export default HeroBanner;