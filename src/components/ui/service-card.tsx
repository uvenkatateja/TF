import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  index,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.21, 0.45, 0.32, 0.9] 
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.03, 
        y: -5, 
        transition: { duration: 0.3, ease: 'easeOut' } 
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-gold-500/20 bg-black/40 backdrop-blur-md p-6 hover:shadow-xl hover:shadow-gold-500/10 transition-all duration-500",
        className
      )}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-px rounded-2xl bg-gradient-to-r from-gold-500/0 via-gold-500/20 to-gold-500/0 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
      </div>
      
      {/* Animated particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-gold-500/40"
          initial={{ 
            x: Math.random() * 100, 
            y: Math.random() * 100,
            opacity: 0
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
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      {/* Icon with bounce effect */}
      <motion.div 
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-500 relative"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full bg-gold-500/5"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        {icon}
      </motion.div>

      {/* Content */}
      <motion.h3 
        className="mb-3 text-xl font-bold text-white relative"
        initial={{ opacity: 0.8 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 group-hover:from-gold-300 group-hover:to-white transition-all duration-300">
          {title}
        </span>
      </motion.h3>
      
      <motion.p 
        className="text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-300"
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {description}
      </motion.p>

      {/* Animated line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
      />
      
      {/* Corner accent */}
      <div className="absolute -top-px -right-px w-12 h-12 overflow-hidden">
        <div className="absolute rotate-45 bg-gradient-to-r from-gold-500/40 to-gold-300/40 w-8 h-8 -translate-y-1/2 translate-x-1/2 blur-[1px]" />
      </div>
    </motion.div>
  );
}; 