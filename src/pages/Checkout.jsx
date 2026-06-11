import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard } from 'lucide-react';
import './Checkout.css';

const CHECKOUT_ITEMS = [
  { src: '/3d_strawberry.png',  alt: '', className: 'fi-checkout-strawb  fi-lg fi-dim'    },
  { src: '/3d_star_cookie.png', alt: '', className: 'fi-checkout-cookie  fi-xl fi-mid'    },
];

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Order Placed Successfully! Your sweet treats are on the way.');
      navigate('/');
      window.location.reload(); // Quick hack to clear cart since we didn't expose clearCart
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty!</h2>
        <Link to="/shop" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page fade-in">
      <div className="checkout-header">
        <h1>Secure Checkout</h1>
      </div>

      <div className="checkout-container">
        <div className="checkout-form-section glass">
          <form onSubmit={handleCheckout}>
            <div className="form-section">
              <h3>Shipping Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" required />
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input type="text" required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Details</h3>
              <div className="payment-badge">
                <ShieldCheck size={18} />
                <span>256-bit Encrypted Secure Payment</span>
              </div>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Card Number</label>
                  <div className="card-input-wrapper">
                    <CreditCard size={20} className="card-icon" />
                    <input type="text" placeholder="0000 0000 0000 0000" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" required />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" required />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary pay-btn" disabled={isProcessing}>
              {isProcessing ? 'Processing Order...' : `Pay ₹${(cartTotal + 50).toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="order-summary glass slide-left">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="summary-item-info">
                  <h4>{item.name}</h4>
                  <span>Qty: {item.quantity}</span>
                </div>
                <span className="summary-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="totals-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="totals-row">
              <span>Delivery</span>
              <span>₹50.00</span>
            </div>
            <div className="totals-row grand-total">
              <span>Total</span>
              <span>₹{(cartTotal + 50).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
