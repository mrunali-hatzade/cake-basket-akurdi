import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Leaf, ChefHat, MessageSquareQuote, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Home.css';

const HOME_ITEMS = [
  { src: '/3d_macaron.png',  alt: '', className: 'fi-home-macaron  fi-lg fi-mid'  },
  { src: '/3d_donut.png',    alt: '', className: 'fi-home-donut    fi-xl fi-dim'  },
  { src: '/3d_cherry.png',   alt: '', className: 'fi-home-cherry   fi-md fi-mid'  },
  { src: '/3d_cupcake.png',  alt: '', className: 'fi-home-cupcake  fi-lg fi-dim'  },
];

const Home = () => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        // Use all products for the carousel
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content fade-in">
          <h1>Handcrafted Cakes for Your <span className="highlight">Sweetest</span> Moments</h1>
          <p className="hero-subtitle delay-100 fade-in">
            Premium, artisanal cakes baked fresh daily. Order online and get it delivered straight to your door.
          </p>
          <div className="hero-actions delay-200 fade-in">
            <Link to="/shop" className="btn-primary">
              Order Now <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="btn-secondary">
              Our Story
            </Link>
          </div>
        </div>
        <div className="hero-image-container slide-up delay-300">
          <div className="glass-blob"></div>
          <img 
            src="/chocolate-cake.png" 
            alt="Premium Chocolate Truffle Cake" 
            className="hero-image hover-lift"
          />
        </div>
      </section>

      {/* Features Strip */}
      <section className="features-strip fade-in">
        <div className="feature-item">
          <div className="feature-icon-wrapper"><Truck size={28} /></div>
          <div>
            <h3>Fast & Safe Delivery</h3>
            <p>Same-day delivery across Mumbai.</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-wrapper"><Leaf size={28} /></div>
          <div>
            <h3>100% Eggless Options</h3>
            <p>Pure vegetarian cakes available.</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-wrapper"><ChefHat size={28} /></div>
          <div>
            <h3>Baked Fresh Daily</h3>
            <p>Using only premium ingredients.</p>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="categories-section fade-in">
        <div className="category-header">
          <h2>Shop by Occasion</h2>
          <p>Find the perfect treat for your special day</p>
        </div>
        <div className="category-circles-container">
          <Link to="/shop" className="category-circle-item hover-lift">
            <div className="circle-image-wrapper">
              <img src="/strawberry-cake.png" alt="Birthday Cakes" />
            </div>
            <h3>Birthday</h3>
          </Link>
          <Link to="/shop" className="category-circle-item hover-lift">
            <div className="circle-image-wrapper">
              <img src="/chocolate-cake.png" alt="Wedding Cakes" />
            </div>
            <h3>Wedding</h3>
          </Link>
          <Link to="/shop" className="category-circle-item hover-lift">
            <div className="circle-image-wrapper">
              <img src="/strawberry-cake.png" alt="Custom Cupcakes" />
            </div>
            <h3>Cupcakes</h3>
          </Link>
          <Link to="/shop" className="category-circle-item hover-lift">
            <div className="circle-image-wrapper">
              <img src="/chocolate-cake.png" alt="Anniversary Cakes" />
            </div>
            <h3>Anniversary</h3>
          </Link>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="featured-section">
        <div className="section-header fade-in">
          <h2>Signature Bakes</h2>
          <p>Swipe to explore our most loved creations</p>
        </div>
        <div className="product-carousel fade-in delay-200">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="product-card glass carousel-item hover-lift">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} />
                {index === 0 && <div className="product-badge">Best Seller</div>}
              </div>
              <div className="product-info">
                <div className="product-header">
                  <h3>{product.name}</h3>
                  <span className="price">₹{product.price.toFixed(2)}</span>
                </div>
                <p className="product-desc">Premium signature bake crafted with organic ingredients.</p>
                <div className="product-footer">
                  <div className="rating">
                    <Star size={16} fill="#d4a373" color="#d4a373" />
                    <span>{product.rating || "5.0"}</span>
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/shop" className="btn-secondary">View All Cakes</Link>
        </div>
      </section>

      {/* Gallery & Reviews Masonry */}
      <section className="gallery-section fade-in">
        <div className="section-header">
          <h2>Cake Gallery</h2>
          <p>Follow us on Instagram @CakeBasketMumbai</p>
        </div>
        <div className="masonry-grid">
          <div className="masonry-item item-large">
            <img src="/chocolate-cake.png" alt="Gallery" />
            <div className="masonry-overlay">
              <Star fill="#fff" color="#fff" size={20} />
              <p>"Absolute perfection for our wedding!"</p>
            </div>
          </div>
          <div className="masonry-item">
            <img src="/strawberry-cake.png" alt="Gallery" />
            <div className="masonry-overlay">
              <Star fill="#fff" color="#fff" size={20} />
              <p>"So fresh!"</p>
            </div>
          </div>
          <div className="masonry-item">
            <img src="/chocolate-cake.png" alt="Gallery" />
            <div className="masonry-overlay">
              <Star fill="#fff" color="#fff" size={20} />
              <p>"Highly recommend."</p>
            </div>
          </div>
          <div className="masonry-item item-wide">
            <img src="/strawberry-cake.png" alt="Gallery" />
            <div className="masonry-overlay">
              <Star fill="#fff" color="#fff" size={20} />
              <p>"The best eggless cakes in the city, hands down."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section fade-in">
        <div className="section-header">
          <h2>Sweet Words from Sweet People</h2>
          <p>Don't just take our word for it</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card glass hover-lift">
            <MessageSquareQuote size={32} className="quote-icon" />
            <p className="review-text">"The Rasmalai cake was the absolute highlight of my mother's 50th birthday! So soft, perfectly sweet, and beautifully presented."</p>
            <div className="reviewer">
              <div className="reviewer-avatar">A</div>
              <div>
                <h4>Anjali Sharma</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#d4a373" color="#d4a373" />)}
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass hover-lift">
            <MessageSquareQuote size={32} className="quote-icon" />
            <p className="review-text">"Their midnight delivery service saved my anniversary! The Chocolate Truffle dream was fresh and exactly as pictured."</p>
            <div className="reviewer">
              <div className="reviewer-avatar">R</div>
              <div>
                <h4>Rahul Desai</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#d4a373" color="#d4a373" />)}
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass hover-lift">
            <MessageSquareQuote size={32} className="quote-icon" />
            <p className="review-text">"Best eggless cupcakes in Bandra. My kids love the vanilla bean ones. We order almost every weekend now!"</p>
            <div className="reviewer">
              <div className="reviewer-avatar">P</div>
              <div>
                <h4>Priya Kapoor</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#d4a373" color="#d4a373" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Feedback Form */}
      <section className="feedback-section fade-in">
        <div className="feedback-card glass">
          <div className="feedback-content">
            <h2>We Value Your Feedback</h2>
            <p>Help us improve our service and recipes by dropping a quick note.</p>
            <form className="feedback-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" required />
              <textarea placeholder="Tell us about your experience..." rows="4" required></textarea>
              <button type="submit" className="btn-primary">
                Send Feedback <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
