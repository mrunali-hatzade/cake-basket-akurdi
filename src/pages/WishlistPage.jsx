import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart }     from '../context/CartContext';
import { useToast }    from '../context/ToastContext';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, toggle } = useWishlist();
  const { addToCart }        = useCart();
  const { addToast }         = useToast();

  const handleAdd = (p) => { addToCart(p); addToast(`${p.name} added to cart! 🛒`); };

  return (
    <div style={{maxWidth:1100,margin:'0 auto',padding:'4rem 2rem'}}>
      <h1 style={{fontFamily:'var(--font-heading)',marginBottom:'.5rem'}}>My Wishlist ❤️</h1>
      <p style={{color:'var(--color-text-muted)',marginBottom:'2.5rem'}}>{wishlist.length} item{wishlist.length!==1?'s':''} saved</p>
      {wishlist.length === 0 ? (
        <div style={{textAlign:'center',padding:'4rem 0'}}>
          <Heart size={64} color="var(--color-border)" />
          <h3 style={{marginTop:'1rem',color:'var(--color-text-muted)'}}>Your wishlist is empty</h3>
          <Link to="/shop" className="btn btn-primary" style={{marginTop:'1.5rem',display:'inline-flex'}}>Shop Now</Link>
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'1.5rem'}}>
          {wishlist.map(p => (
            <div key={p.id} className="card hover-lift" style={{overflow:'hidden'}}>
              <div style={{height:200,overflow:'hidden'}}><img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
              <div style={{padding:'1.25rem'}}>
                <h3 style={{marginBottom:'.25rem'}}>{p.name}</h3>
                <p style={{color:'var(--color-primary)',fontWeight:700,fontSize:'1.2rem',marginBottom:'1rem'}}>₹{p.price.toFixed(0)}</p>
                <div style={{display:'flex',gap:'.5rem'}}>
                  <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={()=>handleAdd(p)}><ShoppingCart size={15}/> Add</button>
                  <button className="btn btn-outline btn-sm" onClick={()=>toggle(p)}><Trash2 size={15}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
