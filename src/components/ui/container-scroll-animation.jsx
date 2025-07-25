"use client";
import React, { useRef, useMemo } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { BackgroundGradient } from "./background-gradient";


export const ContainerScroll = ({
  titleComponent,
  footerComponent,
  children
}) => {
  const containerRef = useRef(null);


  // Optimize scroll configuration
  const { scrollYProgress: mainScroll } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
    layoutEffect: false
  });


  const [isMobile, setIsMobile] = React.useState(false);


  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    
    let resizeTimeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
      clearTimeout(resizeTimeout);
    };
  }, []);


  const scaleDimensions = useMemo(() => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  }, [isMobile]);


  // Card animations
  const rotate = useTransform(mainScroll, [0, 0.6], [20, 0]);
  const scale = useTransform(mainScroll, [0, 1], scaleDimensions);
  
  // Header text animations
  const headerOpacity = useTransform(mainScroll, [0, 0.3], [0, 1]);
  const headerY = useTransform(mainScroll, [0, 0.3], [50, 0]);
  
  // Card content animations
  const contentOpacity = useTransform(mainScroll, [0.2, 0.5], [0, 1]);
  const contentY = useTransform(mainScroll, [0.2, 0.5], [30, 0]);
  
  // Footer text animations
  const footerOpacity = useTransform(mainScroll, [0.6, 0.9], [0, 1]);
  const footerY = useTransform(mainScroll, [0.6, 0.9], [30, 0]);


  return (
    <div
      className="h-[60rem] md:h-[80rem] flex justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header 
          opacity={headerOpacity} 
          translateY={headerY} 
          titleComponent={titleComponent} 
        />
        <Card 
          rotate={rotate} 
          scale={scale}
          contentOpacity={contentOpacity}
          contentY={contentY}
        >
          {children}
        </Card>
        <Footer 
          opacity={footerOpacity} 
          translateY={footerY} 
          footerComponent={footerComponent} 
        />
      </div>
    </div>
  );
};


export const Header = React.memo(({ opacity, translateY, titleComponent }) => {
  return (
    <motion.div
      style={{
        opacity,
        translateY,
      }}
      className="max-w-5xl mx-auto text-center"
      initial={false}
    >
      {titleComponent}
    </motion.div>
  );
});


export const Footer = React.memo(({ opacity, translateY, footerComponent }) => {
  return (
    <motion.div
      style={{
        opacity,
        translateY,
      }}
      className="max-w-5xl mx-auto text-center"
      initial={false}
    >
      {footerComponent}
    </motion.div>
  );
});


export const Card = React.memo(({ rotate, scale, contentOpacity, contentY, children }) => {
  const optimizedShadow = useMemo(() => 
    "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)"
  , []);


  return (
    <motion.div
      className="max-w-5xl mx-auto h-[16.5rem] sm:h-[27rem] md:h-[33rem] lg:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
      initial={false}
      style={{
        rotateX: rotate,
        scale,
        boxShadow: optimizedShadow,
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <BackgroundGradient containerClassName="w-full h-full" className="rounded-[22px] w-full h-full bg-zinc-900 overflow-hidden">
        <motion.div 
          className="overflow-hidden rounded-2xl bg-zinc-900 md:rounded-2xl md:p-4"
          style={{
            opacity: contentOpacity,
            translateY: contentY,
          }}
        >
          {children}
        </motion.div>
      </BackgroundGradient>
    </motion.div>
  );
});


// Set display names for debugging
Header.displayName = 'Header';
Footer.displayName = 'Footer';
Card.displayName = 'Card';