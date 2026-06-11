import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Hero.css';

const SLIDES = [
  {
    img: '/hero1.jpg',
    tag: 'Premium Wedding Collection',
    title: 'Where Every Tier Tells a Love Story',
    sub: 'Handcrafted wedding cakes that become the centrepiece of your most precious moments.',
    cta: 'Explore Wedding Cakes',
    ctaLink: '/shop?cat=wedding',
    accent: '#c97b63',
  },
  {
    img: '/hero2.jpg',
    tag: 'Birthday Specials',
    title: 'Make Every Birthday Unforgettable',
    sub: 'From chocolate dreams to fruit fantasies — fresh, custom-baked, delivered same day.',
    cta: 'Shop Birthday Cakes',
    ctaLink: '/shop?cat=birthday',
    accent: '#d4a853',
  },
  {
    img: '/hero3.jpg',
    tag: 'Designer Creations',
    title: 'Art You Can Taste',
    sub: 'Our master bakers craft edible masterpieces tailored to your vision and occasion.',
    cta: 'Order Custom Cake',
    ctaLink: '/custom-order',
    accent: '#8a9e8a',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % SLIDES.length), 5500);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 400);
  };

  const slide = SLIDES[current];

  return (
    <section className="hero-section">
      {/* Background Images */}
      {SLIDES.map((s, i) => (
        <div key={i} className={`hero-bg-slide ${i === current ? 'active' : ''}`}>
          <img src={s.img} alt="" />
          <div className="hero-bg-overlay" />
        </div>
      ))}

      {/* Content */}
      <div className={`hero-content container ${animating ? 'animating' : ''}`}>
        
        <div className="hero-text">
          <div className="hero-tag fade-up d100">
            <Sparkles size={14} /> {slide.tag}
          </div>
          <h1 className="hero-title fade-up d200">{slide.title}</h1>
          <p className="hero-sub fade-up d300">{slide.sub}</p>
          <div className="hero-ctas fade-up d400">
            <Link to={slide.ctaLink} className="btn btn-primary btn-lg">
              {slide.cta} <ArrowRight size={18} />
            </Link>
            <Link to="/custom-order" className="btn btn-ghost btn-lg">
              🎨 Customize Cake
            </Link>
          </div>
          {/* Trust badges */}
          <div className="hero-trust fade-up d500">
            <span>⭐ 4.9/5 Rating</span>
            <span>🚚 Same-Day Delivery</span>
            <span>🌿 100% Eggless Options</span>
            <span>🎂 5000+ Orders</span>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint">
        <div className="scroll-wheel" />
      </div>
    </section>
  );
}
