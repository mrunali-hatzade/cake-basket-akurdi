import React from 'react';
import './FloatingBackground.css';

const ITEMS = [
  { src: '/3d_strawberry.png', size: 40, duration: '25s', delay: '0s', left: '5%', top: '15%' },
  { src: '/3d_croissant.png',  size: 60, duration: '30s', delay: '-5s', left: '85%', top: '10%' },
  { src: '/3d_macaron.png',    size: 45, duration: '28s', delay: '-10s', left: '15%', top: '75%' },
  { src: '/3d_donut.png',      size: 50, duration: '35s', delay: '-15s', left: '80%', top: '65%' },
  { src: '/3d_cherry.png',     size: 35, duration: '22s', delay: '-8s', left: '45%', top: '85%' },
  { src: '/3d_cupcake.png',    size: 55, duration: '32s', delay: '-20s', left: '50%', top: '25%' },
];

export default function FloatingBackground() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="floating-bg-container">
      {ITEMS.map((item, i) => {
        // Parallax effect: diff elements move at diff speeds
        const parallaxSpeed = 0.15 + (i * 0.05);
        const yOffset = scrollY * parallaxSpeed;
        
        return (
          <div
            key={i}
            className="floating-parallax-wrapper"
            style={{
              position: 'absolute',
              left: item.left,
              top: item.top,
              transform: `translateY(${yOffset}px)`
            }}
          >
            <img
              src={item.src}
              alt=""
              className={`floating-item float-anim-${i % 3}`}
              style={{
                width: item.size,
                height: 'auto',
                animationDuration: item.duration,
                animationDelay: item.delay,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
