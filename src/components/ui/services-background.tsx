import React, {useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParticleProps {
  index: number;
  total: number;
}

const Particle: React.FC<ParticleProps> = ({ index, total }) => {
  // Calculate positions distributed across the container
  const angle = (index / total) * Math.PI * 2;
  const radius = 30 + Math.random() * 40; // Random radius between 30-70%
  const x = 50 + Math.cos(angle) * radius; // Center + offset
  const y = 50 + Math.sin(angle) * radius; // Center + offset
  
  const size = Math.random() * 4 + 1; // Random size between 1-5px
  const duration = Math.random() * 10 + 10; // Random duration between 10-20s
  const delay = Math.random() * -10; // Random negative delay for staggered start

  return (
    <motion.div
      className="absolute rounded-full bg-gold-500/20"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        x: `calc(${x}% - ${size/2}px)`,
        y: `calc(${y}% - ${size/2}px)`,
        filter: `blur(${size <= 2 ? 0 : 1}px)`,
      }}
      animate={{
        x: [
          `calc(${x}% - ${size/2}px)`,
          `calc(${x + Math.random() * 10 - 5}% - ${size/2}px)`,
          `calc(${x}% - ${size/2}px)`,
        ],
        y: [
          `calc(${y}% - ${size/2}px)`,
          `calc(${y + Math.random() * 10 - 5}% - ${size/2}px)`,
          `calc(${y}% - ${size/2}px)`,
        ],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
};

interface ServicesBackgroundProps {
  className?: string;
}

export const ServicesBackground: React.FC<ServicesBackgroundProps> = ({ className }) => {
  // Create 50 particles
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => (
      <Particle key={i} index={i} total={50} />
    ));
  }, []);

  // Create larger floating blobs for background atmosphere
  const blobs = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const size = Math.random() * 300 + 100; // 100-400px
      const x = Math.random() * 100; // 0-100%
      const y = Math.random() * 100; // 0-100%
      const duration = Math.random() * 15 + 15; // 15-30s
      const delay = Math.random() * -10; // Random negative delay
      
      return (
        <motion.div
          key={`blob-${i}`}
          className="absolute rounded-full bg-gold-500/5 blur-3xl"
          style={{
            width: size,
            height: size,
            left: `${x}%`,
            top: `${y}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 40 - 20, 0], // Move +/- 20px
            y: [0, Math.random() * 40 - 20, 0], // Move +/- 20px
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      );
    });
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/80" />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-transparent to-black/80 opacity-70"
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Floating blobs */}
      {blobs}
      
      {/* Particles */}
      {particles}
      
      {/* Subtle grid lines */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(to right, #B8860B 1px, transparent 1px), linear-gradient(to bottom, #B8860B 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
    </div>
  );
}; 