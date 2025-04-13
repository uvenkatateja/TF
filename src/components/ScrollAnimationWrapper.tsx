import React, { useEffect} from 'react';
import { motion, useAnimation, Variant } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type AnimationVariant = {
  hidden: Variant;
  visible: Variant;
};

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'scaleUp' | 'slideLeft' | 'slideRight' | 'bounce';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export function ScrollAnimationWrapper({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.7,
  threshold = 0.1,
  once = true,
}: ScrollAnimationWrapperProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: threshold,
    triggerOnce: once,
  });

  // Define animation variants
  const variants: Record<string, AnimationVariant> = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    bounce: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
          duration: duration,
          delay: delay,
        }
      },
    },
  };

  const selectedVariant = variants[animation];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={selectedVariant}
      transition={{ duration: duration, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 