import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Navigation, MessageCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './Contact.css';

const HOURS = [
  { day: 'Monday – Friday', time: '8:00 AM – 10:00 PM' },
  { day: 'Saturday',        time: '8:00 AM – 11:00 PM' },
  { day: 'Sunday',          time: '9:00 AM – 9:00 PM'  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Message sent! We\'ll reply within 2 hours. 🙏', 'success');
    setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  };

  return (
    <div className="contact-page fade-in">

      {/* ── Hero ── */}
      <div className="contact-hero">
        <div className="container">
          <div className="tag">Say Hello</div>
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Reach out for custom orders, bulk enquiries, or just to say hi!</p>
        </div>
      </div>

      {/* ── Info Cards ── */}
      <div className="container">
        <div className="contact-info-cards">
          <div className="info-card card">
            <div className="info-icon-wrap"><MapPin size={24} /></div>
            <h3>Visit Us</h3>
            <p>Shop No. 12, Main Market</p>
            <p>Akurdi, Pune, Maharashtra 411035</p>
            <a
              href="https://maps.google.com/?q=Akurdi+Pune"
              target="_blank" rel="noreferrer"
              className="info-link"
            >
              <Navigation size={14} /> Get Directions
            </a>
          </div>

          <div className="info-card card">
            <div className="info-icon-wrap"><Phone size={24} /></div>
            <h3>Call / WhatsApp</h3>
            <p>+91 84469 80001</p>
            <p>+91 91234 56789</p>
            <a href="https://wa.me/918446980001" target="_blank" rel="noreferrer" className="info-link wa-link">
              <MessageCircle size={14} /> Chat on WhatsApp
            </a>
          </div>

          <div className="info-card card">
            <div className="info-icon-wrap"><Mail size={24} /></div>
            <h3>Email Us</h3>
            <p>namaste@cakebasket.in</p>
            <p>custom@cakebasket.in</p>
            <a href="mailto:namaste@cakebasket.in" className="info-link">
              <Send size={14} /> Send Email
            </a>
          </div>

          <div className="info-card card">
            <div className="info-icon-wrap"><Clock size={24} /></div>
            <h3>Opening Hours</h3>
            {HOURS.map(h => (
              <div key={h.day} className="hours-row">
                <span>{h.day}</span>
                <span className="hours-time">{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Map + Form ── */}
      <div className="container contact-main-grid">

        {/* Google Maps */}
        <div className="map-section">
          <div className="map-header">
            <h2>📍 Find Our Bakery</h2>
            <a
              href="https://maps.google.com/?q=Akurdi+Pune"
              target="_blank" rel="noreferrer"
              className="btn btn-outline btn-sm"
            >
              <Navigation size={15} /> Open in Google Maps
            </a>
          </div>

          <div className="map-wrapper">
            <div className="contact-map-wrap card">
              <iframe 
                src="https://maps.google.com/maps?q=Akurdi,+Pune,+Maharashtra&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                title="Shop Location in Akurdi"
                width="100%" height="100%" 
                style={{border:0}} allowFullScreen="" loading="lazy">
              </iframe>
            </div>
          </div>

          {/* Shop Details Panel */}
          <div className="shop-details-panel">
            <div className="shop-detail-item">
              <span className="sdp-icon">🎂</span>
              <div>
                <div className="sdp-title">The Cake's Basket Akurdi</div>
                <div className="sdp-sub">Shop No. 12, Main Market, Akurdi, Pune – 411035</div>
              </div>
            </div>
            <div className="shop-detail-item">
              <span className="sdp-icon">⭐</span>
              <div>
                <div className="sdp-title">4.9 / 5 Rating</div>
                <div className="sdp-sub">Based on 1,200+ Google reviews</div>
              </div>
            </div>
            <div className="shop-detail-item">
              <span className="sdp-icon">🚗</span>
              <div>
                <div className="sdp-title">Easy Parking</div>
                <div className="sdp-sub">Free parking available · 2 min from Akurdi station</div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="contact-socials">
            <span style={{fontWeight:600, fontSize:'.9rem'}}>Follow Us</span>
            {[
              { icon: '📸', href: 'https://instagram.com/the_cakesbasket_akurdi', label: 'Instagram', color: '#E1306C' },
              { icon: '🐦', href: 'https://twitter.com',   label: 'Twitter',   color: '#1DA1F2' },
              { icon: <MessageCircle size={18}/>, href: 'https://wa.me/918446980001', label: 'WhatsApp', color: '#25D366' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="social-pill" style={{'--sc': s.color}} title={s.label}>
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section card">
          <h2>Send a Message 💬</h2>
          <p style={{color:'var(--color-text-muted)', marginBottom:'1.75rem', fontSize:'.9rem'}}>
            We reply within 2 hours during business hours.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="c-name">Full Name</label>
                <input className="input" type="text" id="c-name"
                  placeholder="Priya Sharma"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label htmlFor="c-phone">Phone</label>
                <input className="input" type="tel" id="c-phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="c-email">Email Address</label>
              <input className="input" type="email" id="c-email"
                placeholder="priya@example.com"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label htmlFor="c-subject">Subject</label>
              <select className="input select" id="c-subject"
                value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                {['General Enquiry','Custom Cake Order','Bulk / Corporate Order','Delivery Issue','Feedback','Other'].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="c-msg">Your Message</label>
              <textarea className="textarea" id="c-msg" rows="5"
                placeholder="Tell us about your requirements or enquiry..."
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}}>
              <Send size={17} /> Send Message
            </button>
          </form>

          <div className="form-or">
            <span>or reach us directly via</span>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hi!%20I%20have%20an%20enquiry%20about%20Cake%20Basket."
            target="_blank" rel="noreferrer"
            className="btn"
            style={{width:'100%', justifyContent:'center', background:'#25D366', color:'#fff'}}
          >
            💬 WhatsApp Us Directly
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
