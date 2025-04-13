import { ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface SmoothScrollWrapperProps {
  children: ReactNode;
}

export function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
  const { scrollYProgress } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Create a smooth spring animation for scrolling
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Add scroll listener to detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 10) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  return (
    <div className="relative">
      {/* Smooth progress bar indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-300 to-gold-600 origin-left z-50"
        style={{ 
          scaleX: scaleY, 
          opacity: hasScrolled ? 0.7 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
      
      {/* Main content */}
      <div>{children}</div>
    </div>
  );
} 