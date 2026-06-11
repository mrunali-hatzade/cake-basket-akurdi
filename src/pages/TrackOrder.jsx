import React, { useState } from 'react';
import { Package, CheckCircle, Truck, Star } from 'lucide-react';

const MOCK_ORDERS = {
  'CB1001': { status:'delivered', cake:'Rasmalai Pistachio Cake', date:'Jun 10, 2026', steps:['placed','baked','dispatched','delivered'] },
  'CB1002': { status:'dispatched', cake:'Black Forest Premium', date:'Jun 11, 2026', steps:['placed','baked','dispatched'] },
  'CB1003': { status:'baked',  cake:'Chocolate Truffle Dream',  date:'Jun 11, 2026', steps:['placed','baked'] },
};
const TIMELINE = ['Order Placed','Being Baked','Out for Delivery','Delivered'];
const KEYS = ['placed','baked','dispatched','delivered'];

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [result,  setResult]  = useState(null);
  const [notFound,setNotFound]= useState(false);

  const search = (e) => {
    e.preventDefault();
    const r = MOCK_ORDERS[orderId.trim().toUpperCase()];
    setResult(r || null); setNotFound(!r);
  };

  return (
    <div style={{maxWidth:700,margin:'0 auto',padding:'4rem 2rem'}}>
      <div style={{textAlign:'center',marginBottom:'3rem'}}>
        <div style={{fontSize:'3rem'}}>📦</div>
        <h1 style={{fontFamily:'var(--font-heading)',margin:'.5rem 0'}}>Track Your Order</h1>
        <p style={{color:'var(--color-text-muted)'}}>Enter your Order ID to see the live status</p>
      </div>

      <form onSubmit={search} style={{display:'flex',gap:'1rem',marginBottom:'2.5rem'}}>
        <input className="input" placeholder="e.g. CB1001 or CB1002" value={orderId} onChange={e=>setOrderId(e.target.value)} required style={{flex:1}}/>
        <button type="submit" className="btn btn-primary">Track</button>
      </form>

      {notFound && <div className="card" style={{padding:'2rem',textAlign:'center',color:'var(--color-text-muted)'}}>Order not found. Try CB1001, CB1002, or CB1003.</div>}

      {result && (
        <div className="card" style={{padding:'2rem'}}>
          <div style={{marginBottom:'1.5rem'}}>
            <div style={{fontSize:'.85rem',color:'var(--color-text-muted)',marginBottom:'.25rem'}}>Order ID: {orderId.toUpperCase()}</div>
            <h3 style={{fontFamily:'var(--font-heading)'}}>{result.cake}</h3>
            <div style={{color:'var(--color-text-muted)',fontSize:'.9rem'}}>Ordered on {result.date}</div>
          </div>

          <div className="divider"/>

          <div style={{position:'relative',paddingLeft:'2rem'}}>
            {TIMELINE.map((label,i) => {
              const done  = result.steps.includes(KEYS[i]);
              const active= result.steps[result.steps.length-1]===KEYS[i];
              return (
                <div key={i} style={{display:'flex',gap:'1rem',alignItems:'flex-start',marginBottom: i<3?'2rem':'0',position:'relative'}}>
                  <div style={{
                    position:'absolute',left:'-2rem',top:0,
                    width:28,height:28,borderRadius:'50%',
                    background: done ? (active ? 'var(--color-primary)':'#4caf50') : 'var(--color-border)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    color:'#fff',flexShrink:0,
                    boxShadow: active ? '0 0 0 6px rgba(201,123,99,.2)':'none',
                    transition:'all .3s'
                  }}>
                    {done ? (i===3?'✓':'✓') : <span style={{opacity:.4}}>○</span>}
                  </div>
                  {i < 3 && <div style={{position:'absolute',left:'-1.1rem',top:28,width:2,height:32,background:result.steps.length>i+1?'#4caf50':'var(--color-border)'}}/>}
                  <div>
                    <div style={{fontWeight:600,color:done?'var(--color-text)':'var(--color-text-muted)'}}>{label}</div>
                    {active && <div style={{fontSize:'.85rem',color:'var(--color-primary)',fontWeight:500}}>Current Status</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {result.status==='delivered' && (
            <div style={{marginTop:'2rem',padding:'1rem',background:'var(--brand-blush)',borderRadius:'var(--r-md)',textAlign:'center'}}>
              <div style={{fontWeight:600,marginBottom:'.25rem'}}>🎉 Delivered! Enjoy your cake!</div>
              <div style={{fontSize:'.85rem',color:'var(--color-text-muted)'}}>Share your experience and leave a review.</div>
            </div>
          )}
        </div>
      )}

      <div style={{marginTop:'2rem',color:'var(--color-text-muted)',fontSize:'.85rem',textAlign:'center'}}>
        Need help? <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{color:'#25D366',fontWeight:600}}>Contact us on WhatsApp</a>
      </div>
    </div>
  );
}
