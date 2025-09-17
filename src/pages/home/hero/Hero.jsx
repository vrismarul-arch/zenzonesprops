  import "./Hero.css";
  import herobg from "./hero.png";

  export default function Hero() {
    return (
      <section className="hero">
        {/* Left Content */}
        <div className="hero-content">
          <p className="hero-subtitle">Welcome to ZenZones</p>
          <h1 className="hero-title">
           Smartest Deal of 2025  <br /> Buy and Earn from Day One!
          </h1>
          <p className="hero-text">
            Home sweet home? More like home sweet income. Why settle for just a house when this 2BHK pays you back every month? A rare deal right at your fingertips
          </p>

          {/* Input with Button */}
        
        </div>

        {/* Right Side Image */}
        <div className="hero-image">
          
          <img
            src={herobg}
            alt="Modern Property"
            className="hero-house"
          />
        </div>
      </section>
    );
  }
