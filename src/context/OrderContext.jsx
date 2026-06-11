import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

const DEFAULT_ORDERS = [
  { id: '#10042', customer: 'Riya Sharma', items: 'Chocolate Truffle (x1)', total: 550, platform: 'Zomato', status: 'Pending', paymentStatus: 'Pending', time: '10 mins ago', timestamp: Date.now() - 600000 },
  { id: '#10043', customer: 'Amit Patel', items: 'Mango Cheesecake (x2)', total: 1300, platform: 'Website', status: 'Preparing', paymentStatus: 'Paid', time: '25 mins ago', timestamp: Date.now() - 1500000 },
  { id: '#10044', customer: 'Sneha Desai', items: 'Custom Engagement Cake', total: 2500, platform: 'WhatsApp', status: 'Completed', paymentStatus: 'Paid', time: '1 hour ago', timestamp: Date.now() - 3600000 },
  { id: '#10045', customer: 'Rahul K', items: 'Red Velvet Fantasy (x1)', total: 700, platform: 'Swiggy', status: 'Out for Delivery', paymentStatus: 'Paid', time: '2 hours ago', timestamp: Date.now() - 7200000 },
  { id: '#10046', customer: 'Walk-in Customer', items: 'Vanilla Bean Cupcakes (x4)', total: 1400, platform: 'In-Store', status: 'Completed', paymentStatus: 'Paid', time: '3 hours ago', timestamp: Date.now() - 10800000 }
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load from localStorage or use defaults
    const stored = localStorage.getItem('bakery_orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    } else {
      setOrders(DEFAULT_ORDERS);
      localStorage.setItem('bakery_orders', JSON.stringify(DEFAULT_ORDERS));
    }
  }, []);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `#${10047 + orders.length}`, // Simple ID generation
      time: 'Just now',
      timestamp: Date.now()
    };
    
    // Put newest orders at the top
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('bakery_orders', JSON.stringify(updated));
  };

  const updateOrderStatus = (id, newStatus, newPaymentStatus) => {
    const updated = orders.map(o => {
      if (o.id === id) {
        return { ...o, status: newStatus || o.status, paymentStatus: newPaymentStatus || o.paymentStatus };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem('bakery_orders', JSON.stringify(updated));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};
