import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  start?: number;
  duration?: number;
}

export function AnimatedCounter({ 
  value, 
  className = '', 
  start = 0, 
  duration = 1 
}: AnimatedCounterProps) {
  // Extract numeric part and suffix
  const numericMatch = value.match(/^(\d+)(\+|\%)?/);
  
  if (!numericMatch) {
    return <span className={className}>{value}</span>;
  }
  
  const numericPart = parseInt(numericMatch[1], 10);
  const suffix = numericMatch[2] || '';
  
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  const spring = useSpring(start, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001,
    duration: duration * 1000 // Convert to milliseconds
  });
  
  const display = useTransform(spring, (current) => {
    return Math.floor(current).toString() + suffix;
  });
  
  useEffect(() => {
    if (hasMounted) {
      spring.set(numericPart);
    }
  }, [hasMounted, numericPart, spring]);
  
  return (
    <motion.span className={className}>
      {hasMounted ? <motion.span>{display}</motion.span> : value}
    </motion.span>
  );
} 