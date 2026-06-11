import React from 'react';
import './FloatingItems.css';

/**
 * Renders animated floating 3D bakery decorations.
 * Pass `items` as array of { src, alt, className }
 */
const FloatingItems = ({ items = [] }) => {
  return (
    <div className="floating-items-layer" aria-hidden="true">
      {items.map((item, i) => (
        <div key={i} className={`fi-wrapper ${item.className || ''}`}>
          <img src={item.src} alt={item.alt || ''} className="fi-img" />
        </div>
      ))}
    </div>
  );
};

export default FloatingItems;
