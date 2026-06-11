import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="cart-overlay fade-in" onClick={() => setIsCartOpen(false)}>
      <div className="cart-panel glass slide-left delay-100" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <button className="btn-primary" onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item hover-lift">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <span className="cart-item-price">₹{item.price.toFixed(2)}</span>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn-primary checkout-btn" onClick={handleCheckout}>
              Checkout Securely
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
