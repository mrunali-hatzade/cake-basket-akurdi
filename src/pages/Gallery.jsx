import React, { useState } from 'react';
import MasonryGallery from '../components/MasonryGallery';
import './Gallery.css';

const FILTER_TABS = ['All','Birthday','Wedding','Anniversary','Custom','Recent'];

// Adapting the original gallery items to the format expected by MasonryGallery
const GALLERY_ITEMS = [
  { id: '1', img:'/hero1.jpg',          cat:'Wedding',     title:'💒 Wedding',     review:'Perfect for our big day!', stars:5, height: 600 },
  { id: '2', img:'/chocolate-cake.png', cat:'Birthday',    title:'🎂 Birthday',    review:'Best birthday cake ever!', stars:5, height: 400 },
  { id: '3', img:'/hero2.jpg',          cat:'Birthday',    title:'🎂 Birthday',    review:'So chocolatey & moist!',   stars:5, height: 500 },
  { id: '4', img:'/strawberry-cake.png',cat:'Anniversary', title:'💍 Anniversary', review:'Loved every bite!',        stars:5, height: 450 },
  { id: '5', img:'/hero3.jpg',          cat:'Custom',      title:'✨ Custom',      review:'Exactly what I wanted.',   stars:5, height: 350 },
  { id: '6', img:'/chocolate-cake.png', cat:'Recent',      title:'🆕 Recent',      review:'Delivered fresh!',         stars:5, height: 400 },
  { id: '7', img:'/strawberry-cake.png',cat:'Wedding',     title:'💒 Wedding',     review:'Stunning 5-tier cake!',    stars:5, height: 650 },
  { id: '8', img:'/hero1.jpg',          cat:'Custom',      title:'✨ Custom',      review:'Amazing photo cake!',      stars:5, height: 550 },
  { id: '9', img:'/hero2.jpg',          cat:'Anniversary', title:'💍 Anniversary', review:'Surprised my wife!',        stars:5, height: 400 },
  { id: '10',img:'/hero3.jpg',          cat:'Recent',      title:'🆕 Recent',      review:'Gorgeous design!',         stars:5, height: 500 },
  { id: '11',img:'/chocolate-cake.png', cat:'Birthday',    title:'🎂 Birthday',    review:'Kids loved it!',           stars:5, height: 450 },
  { id: '12',img:'/strawberry-cake.png',cat:'Custom',      title:'✨ Custom',      review:'Cream art was perfect.',   stars:5, height: 400 },
];

export default function Gallery() {
  const [active,  setActive]  = useState('All');
  const [lightbox,setLightbox]= useState(null);

  const filtered = active==='All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g=>g.cat===active);

  return (
    <div style={{padding:'4rem 0'}}>
      <div style={{textAlign:'center',marginBottom:'2.5rem',padding:'0 2rem'}}>
        <div className="tag" style={{display:'inline-block',marginBottom:'.75rem'}}>Our Work</div>
        <h1 style={{fontFamily:'var(--font-heading)',marginBottom:'.75rem'}}>Cake Gallery</h1>
        <p style={{color:'var(--color-text-muted)',maxWidth:540,margin:'0 auto'}}>
          Every cake tells a story. Browse through our handcrafted creations and get inspired.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{display:'flex',justifyContent:'center',gap:'.75rem',flexWrap:'wrap',padding:'0 2rem',marginBottom:'2.5rem'}}>
        {FILTER_TABS.map(t=>(
          <button key={t} onClick={()=>setActive(t)} className={`btn btn-sm ${active===t?'btn-primary':'btn-outline'}`}>{t}</button>
        ))}
      </div>

      {/* GSAP Masonry Grid */}
      <div className="container" style={{ padding: '0 2rem' }}>
        <MasonryGallery 
          key={active} // Re-animate on filter change
          items={filtered}
          animateFrom="bottom"
          blurToFocus={true}
          stagger={0.08}
          scaleOnHover={true}
          hoverScale={0.96}
          colorShiftOnHover={true}
          onItemClick={(item) => setLightbox(item)}
        />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={()=>setLightbox(null)}>
          <div className="lightbox-content" onClick={e=>e.stopPropagation()}>
            <button className="lightbox-close" onClick={()=>setLightbox(null)}>✕</button>
            <img src={lightbox.img} alt={lightbox.title}/>
            <div className="lightbox-info">
              <div className="g-tag" style={{marginBottom:'.5rem'}}>{lightbox.title}</div>
              <p style={{fontStyle:'italic',color:'var(--color-text-muted)'}}>"{lightbox.review}"</p>
              <div className="stars" style={{marginTop:'.5rem'}}>{[...Array(lightbox.stars)].map((_,j)=><span key={j} style={{color:'var(--brand-gold)',fontSize:'1.2rem'}}>★</span>)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
