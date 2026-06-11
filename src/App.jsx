import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useGlobalReveal from './hooks/useGlobalReveal';

// Contexts
import { CartProvider }     from './context/CartContext';
import { ThemeProvider }    from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider }    from './context/ToastContext';
import { AuthProvider }     from './context/AuthContext';
import { ProductProvider }  from './context/ProductContext';
import { OrderProvider }    from './context/OrderContext';

// Layout
import Navbar   from './components/Navbar';
import Footer2  from './components/Footer2';
import Cart     from './components/Cart';
import ScrollToTop from './components/ScrollToTop';


// Pages
import Home2    from './pages/Home2';
import Shop     from './pages/Shop';
import About    from './pages/About';
import Contact  from './pages/Contact';
import Checkout from './pages/Checkout';
import Admin    from './pages/Admin';
import Gallery  from './pages/Gallery';

// Phase 3+ placeholder pages (will be built)
import CustomOrder  from './pages/CustomOrder';
import TrackOrder   from './pages/TrackOrder';
import ProductDetail from './pages/ProductDetail';
import LoginPage    from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';

function AppContent() {
  useGlobalReveal();

  return (
    <Router>
      <ScrollToTop />

      <div className="app-wrapper">
        <Navbar />
        <Cart />

        {/* Floating WhatsApp */}
        <a className="wa-float" href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20a%20cake%20🎂" target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>

        {/* Floating Social Bar */}
        <div className="floating-social-bar fade-in">
          {[['https://instagram.com','IG'],['https://facebook.com','FB'],['https://twitter.com','TW']].map(([h,l])=>(
            <a key={l} href={h} target="_blank" rel="noreferrer" aria-label={l}>{l}</a>
          ))}
        </div>

        <main>
          <Routes>
            <Route path="/"             element={<Home2 />} />
            <Route path="/shop"          element={<Shop />} />
            <Route path="/product/:id"   element={<ProductDetail />} />
            <Route path="/about"         element={<About />} />
            <Route path="/contact"       element={<Contact />} />
            <Route path="/checkout"      element={<Checkout />} />
            <Route path="/gallery"       element={<Gallery />} />
            <Route path="/custom-order"  element={<CustomOrder />} />
            <Route path="/track-order"   element={<TrackOrder />} />
            <Route path="/login"         element={<LoginPage />} />
            <Route path="/wishlist"      element={<WishlistPage />} />
            <Route path="/admin"         element={<Admin />} />
            {/* Catch-all placeholder */}
            <Route path="*" element={
              <div style={{textAlign:'center',padding:'8rem 2rem'}}>
                <h2>Coming Soon!</h2>
                <p style={{color:'var(--color-text-muted)',margin:'1rem 0'}}>This page is under construction.</p>
                <a href="/" className="btn btn-primary" style={{display:'inline-flex',gap:'.5rem',marginTop:'1rem'}}>← Back to Home</a>
              </div>
            } />
          </Routes>
        </main>

        <Footer2 />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          <OrderProvider>
            <CartProvider>
              <WishlistProvider>
                <ToastProvider>
                  <AppContent />
                </ToastProvider>
              </WishlistProvider>
            </CartProvider>
          </OrderProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
