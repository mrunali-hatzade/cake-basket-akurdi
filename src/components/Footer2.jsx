import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import ShopStatusIndicator from './ShopStatusIndicator';
import './Footer2.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const handleNewsletter = (e) => { e.preventDefault(); setEmail(''); alert('Subscribed! 🎉'); };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">🎂</span>
              <span className="logo-name">The Cake's Basket</span>
            </Link>
            <p className="footer-bio">
              Akurdi's finest bakery, crafting premium cakes, pastries, and custom desserts for all your special moments. Made with love.
            </p>
            <div className="footer-socials">
              {[['https://instagram.com/thecakesbasket','IG'],['https://facebook.com','FB'],['https://twitter.com','TW'],['https://youtube.com','YT']].map(([h,l])=>(
                <a key={l} href={h} target="_blank" rel="noreferrer" className="social-dot">{l}</a>
              ))}
            </div>
            <div className="footer-contact-info">
              <li><Phone size={14}/> +91 84469 80001</li>
              <li><Mail size={14}/> namaste@cakebasket.in</li>
              <li><MapPin size={14}/> Shop No. 12, Main Market, Akurdi, Pune</li>
              <li style={{marginTop:'0.5rem'}}><ShopStatusIndicator /></li>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>{[['/', 'Home'],['/shop','Shop Cakes'],['/custom-order','Custom Cake Order'],['/gallery','Gallery'],['/about','About Us'],['/contact','Contact'],['/track-order','Track Order'],['/admin','Admin Dashboard']].map(([p,l])=>(
              <li key={p}><Link to={p}>{l}</Link></li>
            ))}</ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4>Categories</h4>
            <ul>{[['birthday','🎂 Birthday Cakes'],['wedding','💒 Wedding Cakes'],['anniversary','💍 Anniversary Cakes'],['photo','📸 Photo Cakes'],['eggless','🌿 Eggless Cakes'],['cupcakes','🧁 Cupcakes'],['pastries','🥐 Pastries'],['festival','🪔 Festival Cakes'],['designer','✨ Designer Cakes'],['kids','🎠 Kids Special']].map(([c,l])=>(
              <li key={c}><Link to={`/shop?cat=${c}`}>{l}</Link></li>
            ))}</ul>
          </div>

          {/* Customer Support */}
          <div className="footer-col">
            <h4>Customer Support</h4>
            <ul>{[['/faq','FAQ'],['/track-order','Track My Order'],['/contact','Contact Support'],['/custom-order','Custom Order Help'],['/delivery','Delivery Info'],['/refund','Refund Policy'],['/privacy','Privacy Policy'],['/terms','Terms & Conditions']].map(([p,l])=>(
              <li key={p}><Link to={p}>{l}</Link></li>
            ))}</ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col newsletter-col">
            <h4>Stay Sweet 🍭</h4>
            <p>Subscribe for exclusive deals, new launches, and birthday surprises!</p>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} required className="newsletter-input" />
              <button type="submit" className="btn btn-primary btn-sm"><Send size={15}/></button>
            </form>
            <div className="payment-icons">
              <div className="payment-title">Accepted Payments</div>
              <div className="payment-row">
                {['Visa','Master','UPI','Razorpay','GPay','COD'].map(p=>(
                  <span key={p} className="payment-chip">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} The Cake's Basket Akurdi. All rights reserved.</p>
          <div className="footer-bottom-links">
            {['/privacy','/terms','/refund','/delivery'].map((p,i)=>(
              <React.Fragment key={p}>
                {i>0 && <span className="dot-sep">·</span>}
                <Link to={p}>{['Privacy Policy','Terms & Conditions','Refund Policy','Delivery Info'][i]}</Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
