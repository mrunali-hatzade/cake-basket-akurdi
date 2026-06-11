import React, { useState } from 'react';
import { Package, ShoppingBag, PlusCircle, Trash2, CheckCircle, Store, BarChart2 } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import './Admin.css';

export default function Admin() {
  const { products, addProduct, removeProduct } = useProducts();
  const { orders, addOrder, updateOrderStatus } = useOrders();
  
  const [activeTab, setActiveTab] = useState('analytics');

  // --- Analytics Calculations ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const todayOrders = orders.filter(o => o.timestamp >= today.getTime());
  const monthOrders = orders.filter(o => o.timestamp >= firstDayOfMonth.getTime());

  const todayRevenue = todayOrders.filter(o => o.paymentStatus === 'Paid').reduce((sum, o) => sum + o.total, 0);
  const monthRevenue = monthOrders.filter(o => o.paymentStatus === 'Paid').reduce((sum, o) => sum + o.total, 0);
  const todayVolume = todayOrders.length;
  
  // Day-wise and Month-wise Summaries
  const dailyReport = Object.values(
    orders.reduce((acc, o) => {
      const date = new Date(o.timestamp || Date.now());
      const dStr = date.toLocaleDateString();
      if (!acc[dStr]) acc[dStr] = { period: dStr, orders: 0, revenue: 0 };
      acc[dStr].orders++;
      if (o.paymentStatus === 'Paid') acc[dStr].revenue += o.total;
      return acc;
    }, {})
  );

  const monthlyReport = Object.values(
    orders.reduce((acc, o) => {
      const date = new Date(o.timestamp || Date.now());
      const mStr = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      if (!acc[mStr]) acc[mStr] = { period: mStr, orders: 0, revenue: 0 };
      acc[mStr].orders++;
      if (o.paymentStatus === 'Paid') acc[mStr].revenue += o.total;
      return acc;
    }, {})
  );
  // ------------------------------
  
  // Inventory Form State
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Signature Cakes', image: '' });
  
  // POS Form State
  const [posData, setPosData] = useState({ productId: '', quantity: 1, customerName: '', paymentMethod: 'Cash' });

  // Inventory Logic
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    addProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || '/hero1.jpg'
    });
    setFormData({ name: '', price: '', category: 'Signature Cakes', image: '' });
    alert('Product successfully added!');
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      removeProduct(id);
    }
  };

  // POS Logic
  const handlePOSSubmit = (e) => {
    e.preventDefault();
    if (!posData.productId) {
      alert("Please select a product");
      return;
    }
    
    const selectedProduct = products.find(p => p.id === parseInt(posData.productId));
    if (!selectedProduct) return;

    const total = selectedProduct.price * posData.quantity;

    addOrder({
      customer: posData.customerName || 'Walk-in Customer',
      items: `${selectedProduct.name} (x${posData.quantity})`,
      total: total,
      platform: 'In-Store',
      status: 'Completed',
      paymentStatus: 'Paid'
    });

    setPosData({ productId: '', quantity: 1, customerName: '', paymentMethod: 'Cash' });
    alert('Sale completed successfully!');
    setActiveTab('orders'); // Jump back to orders to show the new sale
  };

  return (
    <div className="admin-page fade-in">
      <div className="container">
        <div className="admin-header">
          <h1>Owner Dashboard</h1>
          <p>Manage your orders, inventory, and business operations here.</p>
        </div>

        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <BarChart2 size={18} /> Analytics
          </button>
          <button className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <ShoppingBag size={18} /> Order History
          </button>
          <button className={`tab-btn ${activeTab === 'pos' ? 'active' : ''}`} onClick={() => setActiveTab('pos')}>
            <Store size={18} /> Walk-in Sale
          </button>
          <button className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
            <Package size={18} /> Inventory Management
          </button>
        </div>

        {/* --- ANALYTICS TAB --- */}
        {activeTab === 'analytics' && (
          <div className="analytics-dashboard fade-up">
            <div className="stat-grid">
              <div className="stat-card glass">
                <div className="stat-label">Today's Revenue</div>
                <div className="stat-value text-success">₹{todayRevenue.toFixed(2)}</div>
                <div className="stat-sub">From {todayOrders.filter(o => o.paymentStatus === 'Paid').length} paid orders today</div>
              </div>
              <div className="stat-card glass">
                <div className="stat-label">This Month's Revenue</div>
                <div className="stat-value text-primary">₹{monthRevenue.toFixed(2)}</div>
                <div className="stat-sub">Since {firstDayOfMonth.toLocaleDateString()}</div>
              </div>
              <div className="stat-card glass">
                <div className="stat-label">Today's Order Volume</div>
                <div className="stat-value">{todayVolume}</div>
                <div className="stat-sub">Total orders placed today</div>
              </div>
            </div>

            <div className="admin-card glass" style={{marginTop: '2rem'}}>
              <div className="card-title">
                <h2>Recent Activity</h2>
              </div>
              <ul className="activity-list">
                {orders.slice(0, 5).map(o => (
                  <li key={o.id} className="activity-item">
                    <div className="activity-icon">
                      {o.platform === 'In-Store' ? <Store size={16} /> : <ShoppingBag size={16} />}
                    </div>
                    <div className="activity-details">
                      <strong>{o.id}</strong> - {o.customer} bought <em>{o.items}</em> for ₹{o.total}
                      <span className="activity-time">{o.time}</span>
                    </div>
                  </li>
                ))}
                {orders.length === 0 && <li style={{color:'var(--color-text-muted)'}}>No activity yet.</li>}
              </ul>
            </div>

            <div className="summary-tables-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              
              <div className="admin-card glass">
                <div className="card-title">
                  <h2>Daily Sales Tracker</h2>
                </div>
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Orders</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyReport.map((row, i) => (
                        <tr key={i}>
                          <td style={{fontWeight:600}}>{row.period}</td>
                          <td>{row.orders}</td>
                          <td className="text-success" style={{fontWeight:700}}>₹{row.revenue.toFixed(2)}</td>
                        </tr>
                      ))}
                      {dailyReport.length === 0 && (
                        <tr><td colSpan="3" style={{textAlign:'center', padding:'1rem'}}>No data available.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="admin-card glass">
                <div className="card-title">
                  <h2>Monthly Sales Tracker</h2>
                </div>
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Orders</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyReport.map((row, i) => (
                        <tr key={i}>
                          <td style={{fontWeight:600}}>{row.period}</td>
                          <td>{row.orders}</td>
                          <td className="text-primary" style={{fontWeight:700}}>₹{row.revenue.toFixed(2)}</td>
                        </tr>
                      ))}
                      {monthlyReport.length === 0 && (
                        <tr><td colSpan="3" style={{textAlign:'center', padding:'1rem'}}>No data available.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- ORDER HISTORY TAB --- */}
        {activeTab === 'orders' && (
          <div className="admin-card glass fade-up">
            <div className="card-title">
              <h2>Recent Orders</h2>
            </div>
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Platform</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={order.id}>
                      <td style={{fontWeight:600}}>{order.id}<br/><span style={{fontSize:'0.75rem',color:'var(--color-text-muted)',fontWeight:'normal'}}>{order.time}</span></td>
                      <td>{order.customer}</td>
                      <td>{order.items}</td>
                      <td>₹{order.total}</td>
                      <td>
                        <span className={`platform-badge platform-${order.platform.toLowerCase().replace(' ', '-')}`}>
                          {order.platform}
                        </span>
                      </td>
                      <td>
                        <span className={`pay-badge pay-${order.paymentStatus.toLowerCase()}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge status-${order.status.toLowerCase().replace(/ /g, '-')}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan="7" style={{textAlign:'center', padding:'2rem'}}>No orders found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- POINT OF SALE (WALK-IN) TAB --- */}
        {activeTab === 'pos' && (
          <div className="admin-card glass fade-up" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card-title">
              <Store size={20} />
              <h2>New Walk-in Sale</h2>
            </div>
            <form className="admin-form" onSubmit={handlePOSSubmit}>
              <div className="form-group">
                <label>Select Product</label>
                <select value={posData.productId} onChange={e => setPosData({...posData, productId: e.target.value})} required>
                  <option value="" disabled>-- Select from Inventory --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input type="number" min="1" step="1" value={posData.quantity} onChange={e => setPosData({...posData, quantity: parseInt(e.target.value)})} required />
              </div>
              <div className="form-group">
                <label>Customer Name (Optional)</label>
                <input type="text" value={posData.customerName} onChange={e => setPosData({...posData, customerName: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select value={posData.paymentMethod} onChange={e => setPosData({...posData, paymentMethod: e.target.value})}>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{width:'100%', marginTop:'1rem', display:'flex', justifyContent:'center', gap:'0.5rem'}}>
                <CheckCircle size={18} /> Complete Sale
              </button>
            </form>
          </div>
        )}

        {/* --- INVENTORY MANAGEMENT TAB --- */}
        {activeTab === 'inventory' && (
          <div className="inventory-grid">
            <div className="admin-card glass fade-up" style={{ animationDelay: '100ms' }}>
              <div className="card-title">
                <h2>Current Products</h2>
              </div>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td><img src={p.image} alt={p.name} className="admin-thumb" /></td>
                        <td style={{fontWeight:600}}>{p.name}</td>
                        <td><span className="cat-badge">{p.category}</span></td>
                        <td>₹{p.price.toFixed(2)}</td>
                        <td>
                          <button className="icon-btn delete-btn" onClick={() => handleDelete(p.id)} title="Remove Item">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr><td colSpan="5" style={{textAlign:'center', padding:'2rem'}}>No products in inventory.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="admin-card glass fade-up" style={{ animationDelay: '200ms' }}>
              <div className="card-title">
                <PlusCircle size={20} />
                <h2>Add New Item</h2>
              </div>
              <form className="admin-form" onSubmit={handleAddProduct}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="e.g. Red Velvet Cupcake" />
                </div>
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input type="number" step="1" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required placeholder="e.g. 250" />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Signature Cakes">Signature Cakes</option>
                    <option value="Cupcakes">Cupcakes</option>
                    <option value="Custom Orders">Custom Orders</option>
                    <option value="Pastries">Pastries</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image URL (Optional)</label>
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="/chocolate-cake.png" />
                </div>
                <button type="submit" className="btn btn-primary" style={{width:'100%', marginTop:'1rem'}}>Publish Item</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
