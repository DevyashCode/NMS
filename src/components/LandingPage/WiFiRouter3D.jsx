import React, { useState, useEffect, useRef } from 'react';

const WiFiRouter3D = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef();
  const rotationRef = useRef({ A: 0, B: 0 });

  // Constants from C code
  const SCREEN_WIDTH = 80;
  const SCREEN_HEIGHT = 24;
  const PI = Math.PI;
  
  const ROUTER_WIDTH = 2.5;
  const ROUTER_HEIGHT = 0.8;
  const ROUTER_DEPTH = 1.5;
  const ANTENNA_RADIUS = 0.1;
  const ANTENNA_HEIGHT = 1.2;
  
  const K2 = 8;
  const K1 = SCREEN_WIDTH * K2 * 3 / (8 * 4);
  
  const CHARS = ".,~:;=!*#$@#";

  const renderRouterFrame = (A, B) => {
    // Precompute rotation matrices
    const cosA = Math.cos(A);
    const sinA = Math.sin(A);
    const cosB = Math.cos(B);
    const sinB = Math.sin(B);

    // Initialize output and zbuffer
    const output = Array(SCREEN_WIDTH).fill().map(() => Array(SCREEN_HEIGHT).fill(' '));
    const zbuffer = Array(SCREEN_WIDTH).fill().map(() => Array(SCREEN_HEIGHT).fill(0));

    // Render router base (rectangular box)
    for (let x = -ROUTER_WIDTH/2; x <= ROUTER_WIDTH/2; x += 0.1) {
      for (let y = -ROUTER_DEPTH/2; y <= ROUTER_DEPTH/2; y += 0.1) {
        for (let z = -ROUTER_HEIGHT/2; z <= ROUTER_HEIGHT/2; z += 0.1) {
          
          // Only render surface points
          const isSurface = (
            Math.abs(x - ROUTER_WIDTH/2) < 0.05 || Math.abs(x + ROUTER_WIDTH/2) < 0.05 ||
            Math.abs(y - ROUTER_DEPTH/2) < 0.05 || Math.abs(y + ROUTER_DEPTH/2) < 0.05 ||
            Math.abs(z - ROUTER_HEIGHT/2) < 0.05 || Math.abs(z + ROUTER_HEIGHT/2) < 0.05
          );
          
          if (!isSurface) continue;

          // Apply rotations
          const rx = x * cosB - z * sinB;
          const ry = x * sinA * sinB + y * cosA + z * sinA * cosB;
          const rz = K2 + x * cosA * sinB - y * sinA + z * cosA * cosB;
          
          if (rz <= 0) continue;
          
          const ooz = 1/rz;
          const xp = Math.floor(SCREEN_WIDTH/2 + K1 * ooz * rx);
          const yp = Math.floor(SCREEN_HEIGHT/2 - K1 * ooz * ry);
          
          if (xp >= 0 && xp < SCREEN_WIDTH && yp >= 0 && yp < SCREEN_HEIGHT) {
            if (ooz > zbuffer[xp][yp]) {
              zbuffer[xp][yp] = ooz;
              
              // Calculate surface normal
              let nx = 0, ny = 0, nz = 0;
              if (Math.abs(x - ROUTER_WIDTH/2) < 0.05) nx = 1;
              else if (Math.abs(x + ROUTER_WIDTH/2) < 0.05) nx = -1;
              else if (Math.abs(y - ROUTER_DEPTH/2) < 0.05) ny = 1;
              else if (Math.abs(y + ROUTER_DEPTH/2) < 0.05) ny = -1;
              else if (Math.abs(z - ROUTER_HEIGHT/2) < 0.05) nz = 1;
              else nz = -1;
              
              // Apply rotation to normal
              const rnx = nx * cosB - nz * sinB;
              const rny = nx * sinA * sinB + ny * cosA + nz * sinA * cosB;
              const rnz = nx * cosA * sinB - ny * sinA + nz * cosA * cosB;
              
              // Light from front-upper-right
              const L = rnx * 0.5 + rny * 0.3 + rnz * 0.8;
              
              if (L > 0) {
                let luminanceIndex = Math.floor(L * 8);
                if (luminanceIndex > 11) luminanceIndex = 11;
                output[xp][yp] = CHARS[luminanceIndex];
              }
            }
          }
        }
      }
    }

    // Render antennas (2 cylindrical antennas)
    for (let antenna = 0; antenna < 2; antenna++) {
      const antennaX = antenna === 0 ? -ROUTER_WIDTH/3 : ROUTER_WIDTH/3;
      
      for (let h = 0; h <= ANTENNA_HEIGHT; h += 0.05) {
        for (let theta = 0; theta < 2 * PI; theta += 0.3) {
          const x = antennaX + ANTENNA_RADIUS * Math.cos(theta);
          const y = ANTENNA_RADIUS * Math.sin(theta);
          const z = ROUTER_HEIGHT/2 + h;
          
          // Apply rotations
          const rx = x * cosB - z * sinB;
          const ry = x * sinA * sinB + y * cosA + z * sinA * cosB;
          const rz = K2 + x * cosA * sinB - y * sinA + z * cosA * cosB;
          
          if (rz <= 0) continue;
          
          const ooz = 1/rz;
          const xp = Math.floor(SCREEN_WIDTH/2 + K1 * ooz * rx);
          const yp = Math.floor(SCREEN_HEIGHT/2 - K1 * ooz * ry);
          
          if (xp >= 0 && xp < SCREEN_WIDTH && yp >= 0 && yp < SCREEN_HEIGHT) {
            if (ooz > zbuffer[xp][yp]) {
              zbuffer[xp][yp] = ooz;
              
              // Antenna surface normal
              const nx = Math.cos(theta);
              const ny = Math.sin(theta);
              const nz = 0;
              
              // Apply rotation to normal
              const rnx = nx * cosB - nz * sinB;
              const rny = nx * sinA * sinB + ny * cosA + nz * sinA * cosB;
              
              const L = rnx * 0.5 + rny * 0.3 + 0.6;
              
              if (L > 0) {
                let luminanceIndex = Math.floor(L * 8);
                if (luminanceIndex > 11) luminanceIndex = 11;
                output[xp][yp] = CHARS[luminanceIndex];
              }
            }
          }
        }
      }
    }

    // Add LED indicators on front face
    for (let led = 0; led < 3; led++) {
      const x = ROUTER_WIDTH/2;
      const y = -0.3 + led * 0.3;
      const z = 0.1;
      
      // Apply rotations
      const rx = x * cosB - z * sinB;
      const ry = x * sinA * sinB + y * cosA + z * sinA * cosB;
      const rz = K2 + x * cosA * sinB - y * sinA + z * cosA * cosB;
      
      if (rz > 0) {
        const ooz = 1/rz;
        const xp = Math.floor(SCREEN_WIDTH/2 + K1 * ooz * rx);
        const yp = Math.floor(SCREEN_HEIGHT/2 - K1 * ooz * ry);
        
        if (xp >= 0 && xp < SCREEN_WIDTH && yp >= 0 && yp < SCREEN_HEIGHT) {
          if (ooz > zbuffer[xp][yp]) {
            output[xp][yp] = '*'; // LED indicators
          }
        }
      }
    }

    return output;
  };

  const [frame, setFrame] = useState(() => renderRouterFrame(0, 0));

  useEffect(() => {
    let frameId;
    
    const animate = () => {
      if (isAnimating) {
        rotationRef.current.A += 0.04;
        rotationRef.current.B += 0.02;
        
        const newFrame = renderRouterFrame(rotationRef.current.A, rotationRef.current.B);
        setFrame(newFrame);
        
        frameId = setTimeout(() => {
          requestAnimationFrame(animate);
        }, 50); // 20 FPS
      }
    };

    if (isAnimating) {
      animate();
    }

    return () => {
      if (frameId) {
        clearTimeout(frameId);
      }
    };
  }, [isAnimating]);

  const handleStartStop = () => {
    setIsAnimating(!isAnimating);
  };

  const handleReset = () => {
    setIsAnimating(false);
    rotationRef.current = { A: 0, B: 0 };
    setFrame(renderRouterFrame(0, 0));
  };

  return (
    <div style={{ 
      fontFamily: 'monospace', 
      backgroundColor: '#000', 
      color: '#0f0', 
      padding: '20px',
      borderRadius: '8px'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <h2 style={{ color: '#0f0', marginBottom: '5px' }}>3D ASCII WiFi Router - React Component</h2>
        <div style={{ borderBottom: '1px solid #0f0', marginBottom: '10px' }}></div>
        <button 
          onClick={handleStartStop}
          style={{
            marginRight: '10px',
            padding: '5px 15px',
            backgroundColor: '#0f0',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isAnimating ? 'Stop' : 'Start'} Animation
        </button>
        <button 
          onClick={handleReset}
          style={{
            padding: '5px 15px',
            backgroundColor: '#f70',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
      
      <pre style={{ 
        margin: 0, 
        lineHeight: '1',
        fontSize: '12px',
        whiteSpace: 'pre'
      }}>
        {frame.map((row, j) => (
          <div key={j}>
            {row.map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </div>
        ))}
      </pre>
      
      <div style={{ marginTop: '10px', fontSize: '10px', color: '#888' }}>
        Rotation: A = {rotationRef.current.A.toFixed(2)}, B = {rotationRef.current.B.toFixed(2)}
      </div>
    </div>
  );
};

export default WiFiRouter3D;
