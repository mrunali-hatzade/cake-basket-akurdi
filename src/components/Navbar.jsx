import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import {
  ShoppingCart, Search, Heart, User, Menu, X,
  Sun, Moon, ChevronDown, Phone, LogOut
} from 'lucide-react';
import ShopStatusIndicator from './ShopStatusIndicator';
import './Navbar.css';

const CATEGORIES = [
  { label: 'Birthday Cakes',    emoji: '🎂', path: '/shop?cat=birthday'    },
  { label: 'Anniversary Cakes', emoji: '💍', path: '/shop?cat=anniversary'  },
  { label: 'Wedding Cakes',     emoji: '💒', path: '/shop?cat=wedding'      },
  { label: 'Photo Cakes',       emoji: '📸', path: '/shop?cat=photo'        },
  { label: 'Eggless Cakes',     emoji: '🌿', path: '/shop?cat=eggless'      },
  { label: 'Cupcakes',          emoji: '🧁', path: '/shop?cat=cupcakes'     },
  { label: 'Pastries',          emoji: '🥐', path: '/shop?cat=pastries'     },
  { label: 'Festival Cakes',    emoji: '🪔', path: '/shop?cat=festival'     },
  { label: 'Designer Cakes',    emoji: '✨', path: '/shop?cat=designer'     },
  { label: "Kids Special",      emoji: '🎠', path: '/shop?cat=kids'         },
];

export default function Navbar() {
  const { cartItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { isDark, toggle } = useTheme();
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catOpen, setCatOpen]       = useState(false);
  const [searchVal, setSearchVal]   = useState('');
  const catRef  = useRef(null);
  const searchInputRef = useRef(null);

  const cartCount    = cartItems.reduce((s, i) => s + i.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close cat dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // focus search input when opened
  useEffect(() => { if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 100); }, [searchOpen]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchVal.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  return (
    <header className="site-header">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div className="announcement-content" style={{flex: 1, overflow: 'hidden'}}>
            <span className="marquee">🎉 Special Offer: Use code <strong>CAKE10</strong> for 10% off your first order! &nbsp;&nbsp;|&nbsp;&nbsp; 🚚 Free Same-Day Delivery in Pune! &nbsp;&nbsp;|&nbsp;&nbsp; <Phone size={12}/> +91 84469 80001</span>
          </div>
          <div className="hide-mobile" style={{flexShrink: 0, paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.2)'}}>
            <ShopStatusIndicator darkTheme={true} />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-icon">🎂</span>
            <div>
              <div className="logo-name" style={{lineHeight: '1.1'}}>
                The Cake's<br/>Basket
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="nav-links hide-mobile">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/shop" className="nav-link">Shop</Link>

            {/* Categories Mega Dropdown */}
            <div className="nav-dropdown" ref={catRef}>
              <button className="nav-link dropdown-trigger" onClick={() => setCatOpen(p => !p)}>
                Categories <ChevronDown size={16} className={catOpen ? 'rotated' : ''} />
              </button>
              {catOpen && (
                <div className="mega-menu">
                  <div className="mega-menu-inner">
                    {CATEGORIES.map(c => (
                      <Link key={c.label} to={c.path} className="mega-item" onClick={() => setCatOpen(false)}>
                        <span className="mega-emoji">{c.emoji}</span>
                        <span>{c.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/custom-order" className="nav-link">Custom Cake</Link>
            <Link to="/gallery" className="nav-link">Gallery</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/track-order" className="nav-link">Track Order</Link>
          </div>

          {/* Right Actions */}
          <div className="nav-actions">
            
            <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search size={20} />
            </button>

            <button className="icon-btn" onClick={toggle} aria-label="Toggle theme">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/wishlist" className="icon-btn icon-badge-wrap" aria-label="Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="badge nav-badge">{wishlistCount}</span>}
            </Link>

            <button className="icon-btn icon-badge-wrap" aria-label="Cart" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="badge nav-badge">{cartCount}</span>}
            </button>

            {isLoggedIn ? (
              <div className="nav-dropdown user-menu-wrap hide-mobile" style={{position:'relative'}}>
                <button
                  className="user-avatar-btn"
                  onClick={() => setUserMenuOpen(p => !p)}
                >
                  <div className="user-avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name-label">
                    {user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1).toLowerCase()}
                  </span>
                  <ChevronDown size={14} className={userMenuOpen ? 'rotated' : ''} />
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <div className="user-avatar-circle lg">{user.name.charAt(0).toUpperCase()}</div>
                      <div style={{minWidth: 0, flex: 1}}>
                        <div style={{fontWeight:700, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                          {user.name}
                        </div>
                        <div style={{fontSize:'.8rem',color:'var(--color-text-muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="divider" style={{margin:'.5rem 0'}} />
                    <Link to="/wishlist" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>❤️ My Wishlist</Link>
                    <Link to="/track-order" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>📦 Track Order</Link>
                    <div className="divider" style={{margin:'.5rem 0'}} />
                    <button className="user-menu-item logout-btn" onClick={() => { logout(); setUserMenuOpen(false); navigate('/'); }}>
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="icon-btn hide-mobile" aria-label="Login">
                <User size={20} />
              </Link>
            )}

            <Link to="/shop" className="btn btn-primary btn-sm hide-mobile nav-cta">
              Order Now
            </Link>

            {/* Hamburger */}
            <button className="icon-btn show-mobile" onClick={() => setMobileOpen(p => !p)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mobile-menu">
            <div className="mobile-links">
              {[['/', 'Home'], ['/shop', 'Shop'], ['/custom-order', 'Custom Cake'],
                ['/gallery', 'Gallery'], ['/about', 'About'], ['/contact', 'Contact'],
                ['/track-order', 'Track Order'], ['/login', 'Login / Register']].map(([p,l]) => (
                <Link key={p} to={p} className="mobile-link" onClick={() => setMobileOpen(false)}>{l}</Link>
              ))}
              <div className="mobile-cats">
                <div className="mobile-cats-title">Categories</div>
                {CATEGORIES.map(c => (
                  <Link key={c.label} to={c.path} className="mobile-cat-link" onClick={() => setMobileOpen(false)}>
                    {c.emoji} {c.label}
                  </Link>
                ))}
              </div>
              <Link to="/shop" className="btn btn-primary" style={{margin:'1rem 0'}} onClick={() => setMobileOpen(false)}>
                🛒 Order Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-box" onClick={e => e.stopPropagation()}>
            <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
              <Search size={24} color="var(--color-primary)" />
              <input
                ref={searchInputRef}
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search for cakes, flavors, occasions..."
              />
              <button onClick={() => setSearchOpen(false)} style={{background:'none', cursor:'pointer'}}>
                <X size={20} color="var(--color-text-muted)" />
              </button>
            </div>
            <p style={{fontSize:'.85rem', color:'var(--color-text-muted)', marginTop:'.75rem'}}>
              Press Enter to search &nbsp;·&nbsp; Try "Birthday", "Eggless", "Wedding"
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
