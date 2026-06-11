import React, { useState, useEffect } from 'react';

export default function ShopStatusIndicator({ darkTheme = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [closingTime, setClosingTime] = useState('');

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday
      const hour = now.getHours();
      const min = now.getMinutes();
      const currentTime = hour + min / 60;

      let openTime = 8;
      let closeTime = 22; // 10 PM
      let closeString = "10:00 PM";

      if (day === 0) {
        // Sunday: 9 AM - 9 PM
        openTime = 9;
        closeTime = 21;
        closeString = "9:00 PM";
      } else if (day === 6) {
        // Saturday: 8 AM - 11 PM
        openTime = 8;
        closeTime = 23;
        closeString = "11:00 PM";
      }

      if (currentTime >= openTime && currentTime < closeTime) {
        setIsOpen(true);
        setClosingTime(closeString);
      } else {
        setIsOpen(false);
      }
    };

    checkStatus();
    // Re-check every minute
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      background: isOpen 
        ? (darkTheme ? 'rgba(37,211,102,0.2)' : 'rgba(37, 211, 102, 0.15)') 
        : (darkTheme ? 'rgba(235,87,87,0.2)' : 'rgba(235, 87, 87, 0.15)'),
      color: isOpen 
        ? (darkTheme ? '#4ade80' : '#1e9b4b') 
        : (darkTheme ? '#f87171' : '#c62828'),
      padding: '0.3rem 0.8rem',
      borderRadius: '99px',
      fontSize: '0.75rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }}>
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: isOpen ? '#25D366' : '#EB5757',
        boxShadow: isOpen ? '0 0 6px rgba(37,211,102,0.8)' : '0 0 6px rgba(235,87,87,0.8)',
        animation: 'pulse 2s infinite'
      }}></span>
      {isOpen ? `Open Now (Closes at ${closingTime})` : 'Currently Closed'}
    </div>
  );
}
