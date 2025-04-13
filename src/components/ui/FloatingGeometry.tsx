import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingBlobProps {
  color: string;
  size: number;
  delay: number;
  duration: number;
  x: number;
  y: number;
}

const FloatingBlob: React.FC<FloatingBlobProps> = ({ color, size, delay, duration, x, y }) => {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        opacity: 0.15,
      }}
      initial={{ scale: 0.9, opacity: 0.1 }}
      animate={{ 
        scale: [0.9, 1.1, 0.9],
        opacity: [0.1, 0.15, 0.1],
        x: [0, 20, 0],
        y: [0, 10, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  );
};

interface FloatingGeometryProps {
  className?: string;
}

export const FloatingGeometry: React.FC<FloatingGeometryProps> = ({ className }) => {
  const blobs = useMemo(() => {
    const colors = ['#FFDA77', '#FFE1A1', '#FFD580', '#FFE5B4'];
    return Array.from({ length: 8 }).map((_, i) => ({
      color: colors[i % colors.length],
      size: Math.random() * 300 + 100,
      delay: Math.random() * 2,
      duration: Math.random() * 8 + 8,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    }));
  }, []);

  return (
    <div className={`${className} relative overflow-hidden`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/80" />
      
      {/* Floating blobs */}
      {blobs.map((blob, index) => (
        <FloatingBlob key={index} {...blob} />
      ))}

      {/* Add some small floating particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 rounded-full bg-gold-500/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
}; 