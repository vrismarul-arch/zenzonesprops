import React, { useState } from 'react';
import './LockPointNavbar.css';

const NAV_LINKS = [
    // { name: 'About', href: '#about' },
    // { name: 'Service', href: '#service' },
    // { name: 'Projects', href: '#projects' },
    // { name: 'Contact', href: '#contact' },
];

const LockPointNavbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="header glassEffect">
            <div className="container">
                {/* Logo */}
                <img src="logo.png" alt="Zenzones Logo" className="logo-img" />

                {/* Hamburger Menu for Mobile
                <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div> */}

                {/* Navigation Links */}
                <nav className={`nav ${isMobileMenuOpen ? 'navActive' : ''}`}>
                    <ul className="navList navLinksGlass">
                        {NAV_LINKS.map((link) => (
                            <li key={link.name} className="navItem">
                                <a href={link.href} className="navLink" aria-label={link.name}>
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

               
            </div>
        </header>
    );
};

export default LockPointNavbar;
