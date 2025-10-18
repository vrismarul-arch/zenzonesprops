import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: Logo + About */}
        <div className="footer-section">
          <img src="/logo.png" alt="SVJ Groups Logo" className="footer-logo" />
          <p>
            SVJ Groups provides reliable solutions in security, automation, and
            access control systems for homes and businesses.
          </p>
        </div>

        {/* Column 2: Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <FaPhoneAlt /> <a href="tel:+919025994291">+91 9025994291</a>
            </li>
            <li>
              <FaPhoneAlt /> <a href="tel:+919790984055">+91 9790984055</a>
            </li>
            <li>
              <FaEnvelope /> <a href="mailto:info@svjgroups.com">info@svjgroups.com</a>
            </li>
            <li>
              <FaMapMarkerAlt /> 49F1, Anugraha Apartment, <br />
              Dr. Radhakrishnan Salai, Kurinji St, Valasaravakkam, Chennai-87
            </li>
          </ul>
        </div>

        {/* Column 3: Socials */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SVJ Groups. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
