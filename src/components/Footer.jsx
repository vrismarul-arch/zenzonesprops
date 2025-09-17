import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: Logo + About */}
        <div className="footer-section">
<img src="/logo.png" alt="ZenZones Props Logo" className="footer-logo" />
          <p className="footer-about">
            Helping people find their dream homes with trust, transparency, and
            ease. Your next property is just a step away.
          </p>
        </div>

        {/* Column 2: Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>
              <FaMapMarkerAlt className="footer-icon" />
              Phase I, GREETA Towers, Perungudi, Chennai - 600096
            </li>
            <li>
              <FaPhoneAlt className="footer-icon" /> +91 90420 76573
            </li>
            <li>
              <FaEnvelope className="footer-icon" />
              <a href="mailto:admin@zenzonesprops.com">
                admin@zenzonesprops.com
              </a>
            </li>
          </ul>
        </div>

    

        {/* Column 4: Socials */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ZenZones Props. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
