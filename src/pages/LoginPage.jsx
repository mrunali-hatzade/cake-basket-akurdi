import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function LoginPage() {
  const [tab,  setTab]  = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const { login }    = useAuth();
  const { addToast } = useToast();
  const navigate     = useNavigate();
  const location     = useLocation();

  // Go back to the page the user came from, or fall back to home
  const from = location.state?.from || '/';

  const handle = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a brief network delay for realism
    setTimeout(() => {
      const name = tab === 'register' ? form.name : form.email.split('@')[0];
      login({ name, email: form.email });
      addToast(`Welcome, ${name}! 🎂`, 'success');
      setLoading(false);
      navigate(from, { replace: true });
    }, 800);
  };

  return (
    <div style={{ maxWidth: 440, margin: '4rem auto', padding: '0 2rem' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>🎂</div>
          <h2 style={{ fontFamily: 'var(--font-heading)' }}>
            {tab === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '.9rem' }}>
            {tab === 'login'
              ? 'Login to access your orders and wishlist.'
              : 'Join us and get 10% off your first order!'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', background: 'var(--color-bg)', borderRadius: 'var(--r-full)', padding: '.25rem', marginBottom: '1.75rem' }}>
          {['login', 'register'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '.6rem', borderRadius: 'var(--r-full)', border: 'none',
                background: tab === t ? 'var(--color-primary)' : 'transparent',
                color: tab === t ? '#fff' : 'var(--color-text)',
                fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
              }}
            >
              {t === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tab === 'register' && (
            <input
              className="input" placeholder="Full Name"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
            />
          )}
          <input
            className="input" type="email" placeholder="Email Address"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
          />
          <input
            className="input" type="password" placeholder="Password"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required
          />
          {tab === 'login' && (
            <a href="#" style={{ fontSize: '.85rem', color: 'var(--color-primary)', textAlign: 'right' }}>
              Forgot password?
            </a>
          )}
          <button type="submit" className="btn btn-primary" style={{ marginTop: '.5rem' }} disabled={loading}>
            {loading
              ? '⏳ Please wait...'
              : tab === 'login' ? 'Login to Account' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '.85rem', color: 'var(--color-text-muted)' }}>
          Or continue with &nbsp;
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ color: '#25D366', fontWeight: 600 }}>
            WhatsApp Order
          </a>
        </div>
      </div>
    </div>
  );
}
