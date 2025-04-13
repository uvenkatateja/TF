import { ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface SmoothScrollWrapperProps {
  children: ReactNode;
}

export function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
  const { scrollYProgress } = useScroll();
  
  // Create a smooth spring animation for scrolling
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Smooth progress bar indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-300 to-gold-600 origin-left z-50"
        style={{ scaleX: scaleY, opacity: 0.7 }}
      />
      
      {/* Main content */}
      {children}
    </>
  );
} 