import React, { useRef, useEffect } from 'react';

const AbstractFluidBackground = ({ 
  animate = true, 
  speed = 0.8,
  className = "" 
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!animate) return;
    
    let animationId;
    let start = Date.now();
    
    const animateBlobs = () => {
      const elapsed = (Date.now() - start) * 0.001;
      const blobs = containerRef.current?.querySelectorAll('.blob');
      
      blobs?.forEach((blob, index) => {
        const offset = index * 2;
        const x = Math.sin(elapsed * speed + offset) * 20;
        const y = Math.cos(elapsed * speed * 0.7 + offset) * 15;
        const scale = 1 + Math.sin(elapsed * speed * 1.2 + offset) * 0.1;
        
        blob.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      });
      
      animationId = requestAnimationFrame(animateBlobs);
    };
    
    animateBlobs();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [animate, speed]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        zIndex: 0
      }}
    >
      {/* Large purple blob */}
      <div 
        className="blob absolute opacity-90"
        style={{
          top: '10%',
          left: '15%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, #9f7aea 0%, #667eea 70%)',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          filter: 'blur(40px)',
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Cyan/blue blob */}
      <div 
        className="blob absolute opacity-80"
        style={{
          top: '20%',
          right: '10%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, #4fd1c7 0%, #3182ce 70%)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          filter: 'blur(45px)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Pink/magenta blob */}
      <div 
        className="blob absolute opacity-85"
        style={{
          bottom: '15%',
          left: '25%',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, #f093fb 0%, #f5576c 70%)',
          borderRadius: '70% 30% 40% 60% / 40% 70% 30% 60%',
          filter: 'blur(35px)',
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Yellow/orange accent */}
      <div 
        className="blob absolute opacity-70"
        style={{
          bottom: '25%',
          right: '20%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, #ffecd2 0%, #fcb69f 70%)',
          borderRadius: '40% 60% 60% 40% / 60% 40% 40% 60%',
          filter: 'blur(50px)',
          mixBlendMode: 'soft-light'
        }}
      />
      
      {/* Additional small accent blobs */}
      <div 
        className="blob absolute opacity-60"
        style={{
          top: '60%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, #a8edea 0%, #fed6e3 70%)',
          borderRadius: '50% 50% 50% 50% / 60% 40% 60% 40%',
          filter: 'blur(30px)',
          mixBlendMode: 'color-dodge'
        }}
      />
      
      <div 
        className="blob absolute opacity-75"
        style={{
          top: '5%',
          left: '60%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, #e0c3fc 0%, #9bb5ff 70%)',
          borderRadius: '30% 70% 50% 50% / 70% 30% 50% 50%',
          filter: 'blur(38px)',
          mixBlendMode: 'normal'
        }}
      />
    </div>
  );
};

export default AbstractFluidBackground;
