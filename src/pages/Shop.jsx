import React, { useState, useEffect } from 'react';
import './Shop.css';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const SHOP_ITEMS = [
  { src: '/3d_strawberry.png', alt: '', className: 'fi-shop-strawb   fi-lg fi-mid'  },
  { src: '/3d_croissant.png',  alt: '', className: 'fi-shop-croissant fi-xl fi-dim' },
  { src: '/3d_ice_cream.png',  alt: '', className: 'fi-shop-icecream fi-md fi-bright'},
];

const CATEGORIES = ['All Products', 'Signature Cakes', 'Cupcakes', 'Custom Orders'];

const Shop = () => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = activeCategory === 'All Products' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (p) => {
    addToCart(p);
    addToast(`${p.name} added to cart! 🛒`);
  };

  return (
    <div className="shop-page fade-in">
      <div className="shop-header">
        <h1>Our Menu</h1>
        <p>Explore our wide selection of freshly baked goods.</p>
      </div>

      <div className="shop-container">
        {/* Simple Sidebar */}
        <aside className="shop-sidebar glass">
          <h3>Categories</h3>
          <ul>
            {CATEGORIES.map(cat => (
              <li 
                key={cat} 
                className={activeCategory === cat ? 'active' : ''}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <div className="shop-grid">
          {filteredProducts.length === 0 ? (
            <div className="empty-category">
              <p>No products found in this category yet!</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card glass hover-lift delay-100">
                <Link to={`/product/${product.id}`} className="product-image-wrapper">
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="product-info">
                  <div className="product-header">
                    <h3>{product.name}</h3>
                    <span className="price">₹{product.price.toFixed(2)}</span>
                  </div>
                  <div className="product-footer" style={{marginTop: '1rem', display:'flex', gap:'.5rem'}}>
                    <button className="add-to-cart-btn btn-primary" style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem', padding:'.5rem'}} onClick={() => handleAddToCart(product)}>
                      <ShoppingCart size={15}/> Add to Cart
                    </button>
                    <Link to={`/product/${product.id}`} className="btn btn-outline" style={{padding:'.5rem 1rem'}}>View</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
