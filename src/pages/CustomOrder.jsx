import React, { useState } from 'react';
import { Upload, Calendar, MessageSquare } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const OCCASIONS  = ['Birthday','Anniversary','Wedding','Baby Shower','Corporate','Festival','Other'];
const FLAVORS    = ['Chocolate','Vanilla','Red Velvet','Strawberry','Black Forest','Butterscotch','Mango','Pineapple'];
const SHAPES     = ['Round','Square','Heart','Tier','Custom'];
const SIZES      = ['500g (Serves 4-6)','1 Kg (Serves 8-12)','1.5 Kg (Serves 12-15)','2 Kg (Serves 18-20)','3 Kg+ (Custom)'];

export default function CustomOrder() {
  const { addToast } = useToast();
  const [form, setForm] = useState({ occasion:'Birthday', flavor:'Chocolate', shape:'Round', size:'1 Kg (Serves 8-12)', message:'', date:'', time:'', instructions:'', name:'', phone:'', email:'' });
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); const f=e.dataTransfer.files[0]; if(f)setImage(URL.createObjectURL(f)); };
  const handleFileChange = (e) => { const f=e.target.files[0]; if(f)setImage(URL.createObjectURL(f)); };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Custom order request sent! We\'ll WhatsApp you within 30 minutes. 🎂','success');
  };

  return (
    <div style={{maxWidth:860,margin:'0 auto',padding:'4rem 2rem'}}>
      <div style={{textAlign:'center',marginBottom:'3rem'}}>
        <div style={{fontSize:'3rem'}}>🎨</div>
        <h1 style={{fontFamily:'var(--font-heading)',margin:'.5rem 0'}}>Design Your Dream Cake</h1>
        <p style={{color:'var(--color-text-muted)'}}>Tell us your vision and we'll make it real. Our baker will confirm via WhatsApp.</p>
      </div>

      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'2rem'}}>
        {/* Upload */}
        <div className="card" style={{padding:'2rem'}}>
          <h3 style={{marginBottom:'1.25rem'}}>📸 Reference Image (Optional)</h3>
          <div
            className={`upload-zone ${dragOver?'drag-over':''}`}
            onDragOver={e=>{e.preventDefault();setDragOver(true);}}
            onDragLeave={()=>setDragOver(false)}
            onDrop={handleDrop}
            style={{border:'2.5px dashed var(--color-border)',borderRadius:'var(--r-lg)',padding:'3rem 2rem',textAlign:'center',cursor:'pointer',transition:'border-color .2s',borderColor:dragOver?'var(--color-primary)':'var(--color-border)'}}
          >
            {image ? (
              <img src={image} alt="Preview" style={{maxHeight:220,borderRadius:'var(--r-md)',margin:'0 auto'}}/>
            ) : (
              <>
                <Upload size={36} color="var(--color-text-muted)" style={{marginBottom:'1rem'}}/>
                <p style={{color:'var(--color-text-muted)'}}>Drag & drop your reference image here<br/><span style={{fontSize:'.85rem'}}>or</span></p>
                <label className="btn btn-outline btn-sm" style={{marginTop:'.75rem',cursor:'pointer'}}>
                  Browse File
                  <input type="file" accept="image/*" style={{display:'none'}} onChange={handleFileChange}/>
                </label>
              </>
            )}
          </div>
        </div>

        {/* Selections */}
        <div className="card" style={{padding:'2rem'}}>
          <h3 style={{marginBottom:'1.25rem'}}>🎂 Cake Details</h3>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem'}}>
            {[['Occasion',OCCASIONS,'occasion'],['Flavor',FLAVORS,'flavor'],['Shape',SHAPES,'shape'],['Size',SIZES,'size']].map(([label,opts,key])=>(
              <div key={key}>
                <label style={{display:'block',fontWeight:600,marginBottom:'.4rem',fontSize:'.9rem'}}>{label}</label>
                <select className="input select" value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}>
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{marginTop:'1.25rem'}}>
            <label style={{display:'block',fontWeight:600,marginBottom:'.4rem',fontSize:'.9rem'}}>Custom Message on Cake</label>
            <input className="input" placeholder='e.g. "Happy Birthday Priya! 🎂"' value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
          </div>
        </div>

        {/* Delivery */}
        <div className="card" style={{padding:'2rem'}}>
          <h3 style={{marginBottom:'1.25rem'}}>🚚 Delivery Preferences</h3>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem'}}>
            <div>
              <label style={{display:'block',fontWeight:600,marginBottom:'.4rem',fontSize:'.9rem'}}>Delivery Date</label>
              <input className="input" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required min={new Date().toISOString().split('T')[0]}/>
            </div>
            <div>
              <label style={{display:'block',fontWeight:600,marginBottom:'.4rem',fontSize:'.9rem'}}>Preferred Time</label>
              <input className="input" type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/>
            </div>
          </div>
          <div style={{marginTop:'1.25rem'}}>
            <label style={{display:'block',fontWeight:600,marginBottom:'.4rem',fontSize:'.9rem'}}>Special Instructions</label>
            <textarea className="textarea" rows={3} placeholder="Allergens, nut-free, extra decorations, etc." value={form.instructions} onChange={e=>setForm({...form,instructions:e.target.value})}/>
          </div>
        </div>

        {/* Contact */}
        <div className="card" style={{padding:'2rem'}}>
          <h3 style={{marginBottom:'1.25rem'}}>📞 Your Contact Info</h3>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1.25rem'}}>
            {[['Name','text','name','Full Name'],['Phone','tel','phone','+91 98765 43210'],['Email','email','email','your@email.com']].map(([l,t,k,ph])=>(
              <div key={k}>
                <label style={{display:'block',fontWeight:600,marginBottom:'.4rem',fontSize:'.9rem'}}>{l}</label>
                <input className="input" type={t} placeholder={ph} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} required/>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <button type="submit" className="btn btn-primary btn-lg">🎂 Submit Custom Order</button>
          <a href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20place%20a%20custom%20cake%20order" target="_blank" rel="noreferrer" className="btn btn-lg" style={{background:'#25D366',color:'#fff'}}>
            💬 Discuss on WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
}
