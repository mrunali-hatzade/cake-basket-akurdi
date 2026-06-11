import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import { useCart }    from '../context/CartContext';
import { useWishlist }from '../context/WishlistContext';
import { useToast }   from '../context/ToastContext';

const WEIGHTS  = ['500g','1 Kg','1.5 Kg','2 Kg'];
const FLAVORS  = ['Chocolate','Vanilla','Red Velvet','Strawberry','Black Forest'];
const REVIEWS  = [
  { name:'Anjali',  rating:5, text:'Absolutely perfect cake! Moist, fluffy, and not too sweet.', date:'Jun 5, 2026' },
  { name:'Rahul',   rating:5, text:'Stunning design and even better taste. Highly recommend!', date:'May 29, 2026' },
  { name:'Priya',   rating:4, text:'Great quality. Delivery was on time. Will order again!', date:'May 20, 2026' },
];

export default function ProductDetail() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { addToCart }                   = useCart();
  const { toggle: toggleWish, isWishlisted } = useWishlist();
  const { addToast }                    = useToast();
  const [product, setProduct]           = useState(null);
  const [weight,  setWeight]            = useState('1 Kg');
  const [flavor,  setFlavor]            = useState('Chocolate');
  const [message, setMessage]           = useState('');
  const [review,  setReview]            = useState({ name:'', rating:5, text:'' });
  const [reviews, setReviews]           = useState(REVIEWS);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(r=>r.json())
      .then(data => { const p=data.find(p=>String(p.id)===String(id)); setProduct(p||data[0]); })
      .catch(()=>{});
  }, [id]);

  if (!product) return <div style={{padding:'4rem',textAlign:'center'}}>Loading...</div>;

  const handleCart = () => {
    addToCart({ ...product, weight, flavor, message });
    addToast(`${product.name} (${weight}) added to cart! 🛒`);
  };

  const handleBuyNow = () => { handleCart(); navigate('/checkout'); };

  const handleReview = (e) => {
    e.preventDefault();
    setReviews(prev => [{...review, date:'Just now'}, ...prev]);
    setReview({ name:'', rating:5, text:'' });
    addToast('Review submitted! Thank you 🙏', 'success');
  };

  return (
    <div style={{maxWidth:1100,margin:'0 auto',padding:'4rem 2rem'}}>
      <button onClick={()=>navigate(-1)} className="btn btn-outline btn-sm" style={{marginBottom:'2rem'}}>
        <ArrowLeft size={16}/> Back
      </button>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'start'}}>
        {/* Images */}
        <div>
          <div className="card hover-lift" style={{overflow:'hidden',borderRadius:'var(--r-xl)'}}>
            <img src={product.image} alt={product.name} style={{width:'100%',height:420,objectFit:'cover'}}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'.75rem',marginTop:'.75rem'}}>
            {[product.image,product.image,product.image,product.image].map((src,i)=>(
              <img key={i} src={src} alt="" style={{height:80,borderRadius:'var(--r-md)',objectFit:'cover',cursor:'pointer',opacity: i===0?1:.7,border:i===0?'2px solid var(--color-primary)':'2px solid transparent'}}/>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div style={{fontSize:'.8rem',color:'var(--color-text-muted)',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:'.5rem'}}>{product.category}</div>
          <h1 style={{fontFamily:'var(--font-heading)',marginBottom:'.75rem'}}>{product.name}</h1>
          <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1.25rem'}}>
            <div className="stars">{[...Array(5)].map((_,i)=><Star key={i} size={18} fill="currentColor"/>)}</div>
            <span style={{color:'var(--color-text-muted)',fontSize:'.9rem'}}>(48 reviews)</span>
          </div>
          <div style={{fontSize:'2rem',fontWeight:800,color:'var(--color-primary)',fontFamily:'var(--font-heading)',marginBottom:'1.5rem'}}>
            ₹{product.price.toFixed(0)}
          </div>

          {/* Weight */}
          <div style={{marginBottom:'1.25rem'}}>
            <div style={{fontWeight:600,marginBottom:'.6rem',fontSize:'.9rem'}}>Select Weight</div>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
              {WEIGHTS.map(w=>(
                <button key={w} onClick={()=>setWeight(w)} className={`btn btn-sm ${weight===w?'btn-primary':'btn-outline'}`}>{w}</button>
              ))}
            </div>
          </div>

          {/* Flavor */}
          <div style={{marginBottom:'1.25rem'}}>
            <div style={{fontWeight:600,marginBottom:'.6rem',fontSize:'.9rem'}}>Select Flavor</div>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
              {FLAVORS.map(f=>(
                <button key={f} onClick={()=>setFlavor(f)} className={`btn btn-sm ${flavor===f?'btn-gold':'btn-outline'}`}>{f}</button>
              ))}
            </div>
          </div>

          {/* Custom Message */}
          <div style={{marginBottom:'1.5rem'}}>
            <div style={{fontWeight:600,marginBottom:'.6rem',fontSize:'.9rem'}}>Custom Message on Cake</div>
            <input className="input" placeholder='e.g. "Happy Birthday Priya! 🎂"' value={message} onChange={e=>setMessage(e.target.value)}/>
          </div>

          {/* Actions */}
          <div style={{display:'flex',gap:'.75rem',marginBottom:'1rem',flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-lg" style={{flex:1}} onClick={handleCart}><ShoppingCart size={18}/> Add to Cart</button>
            <button className="btn btn-gold btn-lg" style={{flex:1}} onClick={handleBuyNow}>⚡ Buy Now</button>
            <button className={`btn btn-outline ${isWishlisted(product.id)?'wishlisted':''}`} onClick={()=>{toggleWish(product);addToast(isWishlisted(product.id)?'Removed from wishlist':'Saved to wishlist ❤️','info');}}>
              <Heart size={18} fill={isWishlisted(product.id)?'currentColor':'none'}/>
            </button>
          </div>

          <div style={{display:'flex',alignItems:'center',gap:'.5rem',color:'var(--color-text-muted)',fontSize:'.85rem'}}>
            <span>🚚 Same-day delivery if ordered before 2 PM</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'.5rem',color:'var(--color-text-muted)',fontSize:'.85rem',marginTop:'.25rem',marginBottom:'2rem'}}>
            <span>🌿 Available in eggless &nbsp;·&nbsp; 💳 COD & UPI available</span>
          </div>

          {/* Product Details Accodion/List */}
          <div className="product-info-sections" style={{display:'flex',flexDirection:'column',gap:'1rem',borderTop:'1px solid var(--color-border)',paddingTop:'1.5rem'}}>
            <div className="info-section">
              <h4 style={{fontSize:'1rem',marginBottom:'.5rem'}}>📝 Description</h4>
              <p style={{fontSize:'.9rem',color:'var(--color-text-muted)',lineHeight:1.6}}>
                Our signature {product.name} is handcrafted to perfection. Featuring multiple layers of incredibly soft sponge, generously filled with our house-made cream, and finished with elegant artisan decorations. Perfect for making any celebration extraordinary.
              </p>
            </div>
            
            <div className="info-section">
              <h4 style={{fontSize:'1rem',marginBottom:'.5rem'}}>🎁 What's Included</h4>
              <ul style={{fontSize:'.9rem',color:'var(--color-text-muted)',paddingLeft:'1.2rem',lineHeight:1.6}}>
                <li>1 Premium {product.name} ({weight})</li>
                <li>Complimentary Wooden Knife</li>
                <li>Set of 5 Birthday/Anniversary Candles</li>
                <li>Customized Message Card (if message provided)</li>
                <li><span style={{textDecoration:'line-through',opacity:.6}}>Plastic Cutlery</span> (We are 100% eco-friendly!)</li>
              </ul>
            </div>

            <div className="info-section">
              <h4 style={{fontSize:'1rem',marginBottom:'.5rem'}}>❄️ Care & Storage Instructions</h4>
              <ul style={{fontSize:'.9rem',color:'var(--color-text-muted)',paddingLeft:'1.2rem',lineHeight:1.6}}>
                <li>Store the cake in a refrigerator immediately upon delivery.</li>
                <li>Leave it at room temperature for 20 minutes before serving for the best texture.</li>
                <li>Consume within 48 hours for optimal freshness and taste.</li>
                <li>Fondant cakes should be stored in an AC room, not in the fridge.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{marginTop:'5rem'}}>
        <h2 style={{fontFamily:'var(--font-heading)',marginBottom:'2rem'}}>Customer Reviews</h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3rem'}}>
          <div>
            {reviews.map((r,i)=>(
              <div key={i} className="card" style={{padding:'1.5rem',marginBottom:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.5rem'}}>
                  <div style={{fontWeight:600}}>{r.name}</div>
                  <div style={{fontSize:'.82rem',color:'var(--color-text-muted)'}}>{r.date}</div>
                </div>
                <div className="stars" style={{marginBottom:'.5rem'}}>{[...Array(r.rating)].map((_,j)=><Star key={j} size={14} fill="currentColor"/>)}</div>
                <p style={{color:'var(--color-text-muted)',fontSize:'.9rem'}}>{r.text}</p>
              </div>
            ))}
          </div>

          {/* Submit Review */}
          <div>
            <h3 style={{marginBottom:'1.25rem'}}>Write a Review</h3>
            <form onSubmit={handleReview} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              <input className="input" placeholder="Your Name" value={review.name} onChange={e=>setReview({...review,name:e.target.value})} required/>
              <div>
                <div style={{fontWeight:600,marginBottom:'.5rem',fontSize:'.9rem'}}>Rating</div>
                <div style={{display:'flex',gap:'.25rem'}}>
                  {[1,2,3,4,5].map(n=>(
                    <button type="button" key={n} onClick={()=>setReview({...review,rating:n})} style={{background:'none',border:'none',fontSize:'1.5rem',cursor:'pointer',color:n<=review.rating?'var(--brand-gold)':'var(--color-border)'}}>★</button>
                  ))}
                </div>
              </div>
              <textarea className="textarea" rows={4} placeholder="Share your experience..." value={review.text} onChange={e=>setReview({...review,text:e.target.value})} required/>
              <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
