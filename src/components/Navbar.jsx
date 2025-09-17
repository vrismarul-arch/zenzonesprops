import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo (center inside pill) */}
      <div className="navbar-center">
        <img src="logo.png" alt="Zenzones Logo" className="logo-img" />
      </div>

      {/* Right Section
      <div className="navbar-right">
        <button className="contact-btn">Contact us</button>
      </div> */}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-toggle"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <button className="contact-btn">Contact us</button>
        </div>
      )}
    </nav>
  );
}
