import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ArrowRight, Truck, Clock, Award, Leaf, Phone, MessageSquareQuote, Send, Zap } from 'lucide-react';
import Hero from '../components/Hero';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useProducts } from '../context/ProductContext';
import ShopStatusIndicator from '../components/ShopStatusIndicator';
import './Home2.css';

const CATEGORIES = [
  { label: 'Birthday',    emoji: '🎂', path: '/shop?cat=birthday'    },
  { label: 'Wedding',     emoji: '💒', path: '/shop?cat=wedding'      },
  { label: 'Anniversary', emoji: '💍', path: '/shop?cat=anniversary'  },
  { label: 'Photo Cakes', emoji: '📸', path: '/shop?cat=photo'        },
  { label: 'Eggless',     emoji: '🌿', path: '/shop?cat=eggless'      },
  { label: 'Cupcakes',    emoji: '🧁', path: '/shop?cat=cupcakes'     },
  { label: 'Pastries',    emoji: '🥐', path: '/shop?cat=pastries'     },
  { label: 'Festival',    emoji: '🪔', path: '/shop?cat=festival'     },
  { label: 'Designer',    emoji: '✨', path: '/shop?cat=designer'     },
  { label: "Kids Special",emoji: '🎠', path: '/shop?cat=kids'         },
];

const WHY_US = [
  { icon: <Truck size={28}/>,  title: 'Same-Day Delivery',  text: 'Order before 2 PM and receive your cake the same day anywhere in Mumbai.' },
  { icon: <Award size={28}/>,  title: 'Premium Quality',    text: 'Only the finest Belgian chocolate, fresh cream, and handpicked ingredients.' },
  { icon: <Leaf size={28}/>,   title: '100% Eggless',       text: 'All our cakes are available in eggless variants — equally rich and delicious.' },
  { icon: <Clock size={28}/>,  title: 'Midnight Delivery',  text: 'Surprise your loved ones at midnight with our special midnight delivery service.' },
];

const TESTIMONIALS = [
  { name:'Anjali Sharma',   city:'Bandra',    rating:5, text:'"The Rasmalai cake for my mom\'s birthday was absolutely divine. Perfectly moist and not overly sweet!"', avatar:'A' },
  { name:'Rahul Desai',     city:'Andheri',   rating:5, text:'"Ordered a custom engagement cake with our photo on it. The team nailed every detail. Will definitely order again!"', avatar:'R' },
  { name:'Priya Kapoor',    city:'Juhu',      rating:5, text:'"Best eggless cupcakes in Mumbai! My kids go crazy for the vanilla bean ones. We order every weekend."', avatar:'P' },
  { name:'Vikram Malhotra', city:'Powai',     rating:5, text:'"Midnight delivery actually came at midnight! The black forest was incredibly fresh. Amazing service."', avatar:'V' },
];

const HOME_3D = [
  { src:'/3d_macaron.png',    alt:'', className:'fi-home-macaron  fi-lg fi-mid' },
  { src:'/3d_donut.png',      alt:'', className:'fi-home-donut    fi-xl fi-dim' },
  { src:'/3d_cherry.png',     alt:'', className:'fi-home-cherry   fi-md fi-mid' },
  { src:'/3d_cupcake.png',    alt:'', className:'fi-home-cupcake  fi-lg fi-dim' },
];

const OFFERS = [
  { tag:'Limited Time', title:'First Order Discount', desc:'Get 15% off on your very first order!', code:'FIRST15', color:'var(--brand-rose)' },
  { tag:'Weekend Special', title:'Buy 2 Get 1 Free', desc:'Order any 2 cakes and get a free cupcake box.', code:'WEEKEND', color:'var(--brand-gold)' },
  { tag:'Loyal Customer', title:'Birthday Month Offer', desc:'30% off on your birthday month. Claim it now!', code:'BDAY30', color:'var(--brand-sage)' },
];

export default function Home() {
  const { addToCart } = useCart();
  const { toggle: toggleWish, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const { products } = useProducts();
  const [feedback, setFeedback] = useState({ name:'', message:'' });
  const [activeOffer, setActiveOffer] = useState(null);
  const [countdown, setCountdown] = useState({ h:4, m:23, s:59 });

  // Countdown timer for offers
  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(prev => {
        let {h,m,s} = prev;
        s--; if(s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0){h=23;m=59;s=59;}
        return {h,m,s};
      });
    }, 1000);
    return ()=>clearInterval(t);
  }, []);

  const handleAddToCart = (p) => {
    addToCart(p);
    addToast(`${p.name} added to cart! 🛒`);
  };
  const handleWish = (p) => {
    toggleWish(p);
    addToast(isWishlisted(p.id) ? 'Removed from wishlist' : `Added to wishlist ❤️`, 'info');
  };
  const handleFeedback = (e) => {
    e.preventDefault();
    addToast('Thank you for your feedback! 🙏', 'success');
    setFeedback({name:'',message:''});
  };

  const pad = n => String(n).padStart(2,'0');

  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <Hero />

      {/* ── Features Strip ── */}
      <div className="features-bar">
        <div className="container features-bar-inner">
          {WHY_US.map((f,i) => (
            <div key={i} className="fbar-item">
              <div className="fbar-icon">{f.icon}</div>
              <div>
                <div className="fbar-title">{f.title}</div>
                <div className="fbar-sub">{f.text.split('.')[0]}.</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Categories ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="tag">Browse</div>
            <h2>Shop by Occasion</h2>
            <p>Find the perfect cake for every celebration</p>
          </div>
          <div className="cats-grid">
            {CATEGORIES.map(c => (
              <Link key={c.label} to={c.path} className="cat-pill hover-lift">
                <span className="cat-emoji">{c.emoji}</span>
                <span>{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products Carousel ── */}
      <section className="section stripe">
        <div className="container">
          <div className="section-header reveal">
            <div className="tag">Bestsellers</div>
            <h2>Signature Bakes</h2>
            <p>Handcrafted with love, adored by thousands</p>
          </div>
          <div className="products-carousel">
            {products.map((p, i) => (
              <div key={p.id} className="product-card card reveal" style={{transitionDelay:`${i*80}ms`}}>
                <div className="product-img-wrap">
                  <img src={p.image} alt={p.name} />
                  {i===0 && <div className="product-badge-tag">🔥 Best Seller</div>}
                  <button className={`wish-btn ${isWishlisted(p.id)?'wishlisted':''}`} onClick={()=>handleWish(p)}>
                    <Heart size={18} fill={isWishlisted(p.id)?'currentColor':'none'} />
                  </button>
                </div>
                <div className="product-body">
                  <div className="product-cat">{p.category}</div>
                  <h3 className="product-name">{p.name}</h3>
                  <div className="product-meta">
                    <div className="stars">
                      {[...Array(5)].map((_,j)=><Star key={j} size={14} fill="currentColor" />)}
                      <span style={{color:'var(--color-text-muted)', fontSize:'.85rem'}}>&nbsp;(48)</span>
                    </div>
                    <span className="product-price">₹{p.price.toFixed(0)}</span>
                  </div>
                  <div style={{display:'flex', gap:'.5rem', marginTop:'.75rem'}}>
                    <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={()=>handleAddToCart(p)}>
                      <ShoppingCart size={15}/> Add to Cart
                    </button>
                    <Link to={`/product/${p.id}`} className="btn btn-outline btn-sm">View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:'2.5rem'}}>
            <Link to="/shop" className="btn btn-outline reveal">View All Cakes <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* ── Special Offers ── */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <div className="tag">Deals</div>
            <h2>Special Offers</h2>
            <p>Limited time deals — don't miss out!</p>
          </div>
          <div className="countdown-banner reveal">
            <Zap size={20} />
            <span>Offers end in:</span>
            <span className="countdown-time">{pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}</span>
          </div>
          <div className="offers-grid">
            {OFFERS.map((o,i) => (
              <div key={i} className="offer-card card hover-lift reveal" style={{'--oc':o.color, transitionDelay:`${i*100}ms`}}>
                <div className="offer-tag">{o.tag}</div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
                <div className="offer-code" onClick={()=>{navigator.clipboard?.writeText(o.code); addToast(`Code "${o.code}" copied!`,'info');}}>
                  <span>CODE: {o.code}</span>
                  <span className="copy-hint">click to copy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section stripe">
        <div className="container">
          <div className="section-header reveal">
            <div className="tag">Why Us</div>
            <h2>The Cake Basket Promise</h2>
            <p>Every cake baked with love, delivered with care</p>
          </div>
          <div className="why-grid">
            {WHY_US.map((w,i) => (
              <div key={i} className="why-card card reveal" style={{transitionDelay:`${i*100}ms`}}>
                <div className="why-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Same-Day Delivery Banner ── */}
      <section className="delivery-banner reveal">
        <div className="container delivery-banner-inner">
          <div>
            <h2>🚚 Same-Day Delivery Across Pune!</h2>
            <p>Order before 2 PM today and we'll deliver by evening. Fresh, on time, every time.</p>
          </div>
          <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            <Link to="/shop" className="btn btn-gold btn-lg">Order Now</Link>
            <a href="https://wa.me/918446980001" target="_blank" rel="noreferrer" className="btn btn-ghost btn-lg" style={{background:'rgba(37,211,102,.2)',borderColor:'#25D366',color:'#25D366'}}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Gallery Strip ── */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <div className="tag">Gallery</div>
            <h2>Cake Gallery</h2>
            <p>Follow us @the_cakesbasket_akurdi</p>
          </div>
          <div className="gallery-strip">
            {['/hero1.jpg','/chocolate-cake.png','/hero2.jpg','/strawberry-cake.png','/hero3.jpg','/chocolate-cake.png'].map((src,i)=>(
              <Link key={i} to="/gallery" className="gallery-strip-item hover-lift reveal" style={{transitionDelay:`${i*50}ms`}}>
                <img src={src} alt="Gallery" />
                <div className="gallery-overlay">
                  <span>📷 View Gallery</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'2rem'}}>
            <Link to="/gallery" className="btn btn-outline reveal">View Full Gallery <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section stripe">
        <div className="container">
          <div className="section-header reveal">
            <div className="tag">Reviews</div>
            <h2>Sweet Words from Sweet People</h2>
            <p>Over 5000 happy customers and counting</p>
          </div>
          <div className="testimonials-marquee-wrap reveal">
            <div className="testimonials-marquee">
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t,i) => (
                <div key={i} className="testimonial-card card">
                  <MessageSquareQuote size={32} className="quote-icon-bg" />
                  <div className="stars" style={{marginBottom:'1rem'}}>
                    {[...Array(t.rating)].map((_,j)=><Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <div className="reviewer-avatar">{t.avatar}</div>
                    <div>
                      <div style={{fontWeight:600}}>{t.name}</div>
                      <div style={{fontSize:'.85rem',color:'var(--color-text-muted)'}}>{t.city}, Mumbai</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Feedback Form ── */}
      <section className="section">
        <div className="container" style={{maxWidth:640}}>
          <div className="section-header">
            <div className="tag">Feedback</div>
            <h2>We'd Love to Hear From You</h2>
          </div>
          <form className="feedback-form card" onSubmit={handleFeedback}>
            <input className="input" placeholder="Your Name" value={feedback.name}
              onChange={e=>setFeedback({...feedback,name:e.target.value})} required />
            <textarea className="textarea" rows={4} placeholder="Share your experience or suggestions..."
              value={feedback.message} onChange={e=>setFeedback({...feedback,message:e.target.value})} required />
            <button type="submit" className="btn btn-primary" style={{alignSelf:'center',paddingInline:'2.5rem'}}>
              <Send size={17}/> Send Feedback
            </button>
          </form>
        </div>
      </section>

      {/* ── Find Us / Map Section ── */}
      <section className="section stripe">
        <div className="container">
          <div className="section-header">
            <div className="tag">Location</div>
            <h2>📍 Find Our Bakery</h2>
            <p>Come visit us in Akurdi, Pune — we'd love to welcome you!</p>
          </div>

          <div className="home-map-grid">
            {/* Map */}
            <div className="home-map-frame">
              <iframe
                src="https://maps.google.com/maps?q=Akurdi,+Pune,+Maharashtra&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%"
                style={{border:0, display:'block'}}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cake Basket Pune Location"
              />
            </div>

            {/* Info Panel */}
            <div className="shop-details-panel">
            <div className="shop-detail-item">
              <span className="sdp-icon">🎂</span>
              <div>
                <div className="sdp-title" style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                  The Cake's Basket Akurdi
                  <ShopStatusIndicator />
                </div>
                <div className="sdp-sub">Shop No. 12, Main Market, Akurdi, Pune – 411035</div>
              </div>
            </div>
              <div className="hmi-row">
                <span className="hmi-icon">🕐</span>
                <div>
                  <div className="hmi-title">Opening Hours</div>
                  <div className="hmi-sub">Mon–Fri: 8 AM – 10 PM</div>
                  <div className="hmi-sub">Sat: 8 AM – 11 PM</div>
                  <div className="hmi-sub">Sun: 9 AM – 9 PM</div>
                </div>
              </div>
              <div className="hmi-row">
                <span className="hmi-icon">📞</span>
                <div>
                  <div className="hmi-title">Contact</div>
                  <div className="hmi-sub">+91 84469 80001</div>
                  <div className="hmi-sub">namaste@cakebasket.in</div>
                </div>
              </div>
              <div className="hmi-row">
                <span className="hmi-icon">⭐</span>
                <div>
                  <div className="hmi-title">4.9 / 5 on Google</div>
                  <div className="hmi-sub">1,200+ happy customer reviews</div>
                </div>
              </div>
              <div className="hmi-actions">
                <a
                  href="https://maps.google.com/?q=Akurdi+Pune"
                  target="_blank" rel="noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{flex:1,justifyContent:'center'}}
                >
                  🗺️ Get Directions
                </a>
                <a
                  href="https://wa.me/918446980001"
                  target="_blank" rel="noreferrer"
                  className="btn btn-sm"
                  style={{flex:1,justifyContent:'center',background:'#25D366',color:'#fff'}}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
