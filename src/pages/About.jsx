import React from 'react';
import './About.css';

const ABOUT_ITEMS = [
  { src: '/3d_star_cookie.png', alt: '', className: 'fi-about-cookie  fi-lg fi-mid'   },
  { src: '/3d_macaron.png',     alt: '', className: 'fi-about-macaron fi-md fi-dim'   },
  { src: '/3d_donut.png',       alt: '', className: 'fi-about-donut   fi-xl fi-mid'   },
];

const About = () => {
  return (
    <div className="about-page fade-in">
      <section className="about-hero">
        <div className="about-hero-text slide-up delay-100">
          <h1>Our Story</h1>
          <p>Baked with love, shared with joy.</p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-grid">
          <div className="about-text glass slide-left delay-200">
            <h2>The Cake Basket Journey</h2>
            <p>
              Founded in 2010 by a passionate home baker, Cake Basket started as a small local kitchen. 
              Our mission has always been simple: to bring people together through the universal language of sweet treats.
            </p>
            <p>
              Every cake is crafted using the finest organic ingredients, traditional techniques, and a touch of modern artistry. 
              We believe that every celebration, big or small, deserves a centerpiece that looks as incredible as it tastes.
            </p>
          </div>
          <div className="about-image-wrapper delay-300">
            <div className="glass-blob blob-small"></div>
            <img src="/strawberry-cake.png" alt="Our Baking Process" className="about-img hover-lift" />
          </div>
        </div>
      </section>

      <section className="values-section glass delay-400">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Quality First</h3>
            <p>We source only premium, organic ingredients to ensure every bite is perfect.</p>
          </div>
          <div className="value-card">
            <h3>Handcrafted</h3>
            <p>No mass production. Every item is baked fresh in small batches.</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>Supporting local farmers and giving back to our neighborhood.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
