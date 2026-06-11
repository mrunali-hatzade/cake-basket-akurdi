import React from 'react';
import { Link } from 'react-router-dom';
import { Cake, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand-section">
          <Link to="/" className="footer-logo">
            <Cake size={32} className="logo-icon" />
            <span>Cake Basket</span>
          </Link>
          <p className="footer-desc">
            Baking sweet memories since 2010. Handcrafted, premium cakes delivered straight to your door with love.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">IG</a>
            <a href="#" className="social-link">FB</a>
            <a href="#" className="social-link">TW</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop Online</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="contact-info">
            <li><MapPin size={18} /> 45 Bakery Lane, Bandra West, Mumbai 400050</li>
            <li><Phone size={18} /> +91 98765 43210</li>
            <li><Mail size={18} /> namaste@cakebasket.in</li>
          </ul>
        </div>

        <div className="footer-section newsletter-section">
          <h3>Newsletter</h3>
          <p>Subscribe for updates, new flavors, and special offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cake Basket. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
