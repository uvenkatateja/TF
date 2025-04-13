import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
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
      className="group relative overflow-hidden rounded-2xl border border-gold-500/20 bg-black/40 backdrop-blur-md p-6 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-500"
    >
      {/* Gradient blob in the background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/5 via-gold-500/10 to-gold-500/5 opacity-0 blur-xl group-hover:opacity-100 transition-all duration-700 -z-10"></div>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 border-2 border-transparent bg-clip-border bg-gradient-to-br from-gold-400/0 via-gold-400/10 to-gold-400/0 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl -z-10"></div>
      
      {/* Icon with bounce effect */}
      <motion.div 
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-500"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>

      {/* Content */}
      <motion.h3 
        className="mb-3 text-xl font-bold text-white"
        initial={{ opacity: 0.8 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-white/70 leading-relaxed"
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
    </motion.div>
  );
}; 