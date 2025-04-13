import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThreeBackground } from './ThreeBackground';
import { AnimatedCounter } from './AnimatedCounter';

// Enhanced stat card component with hover effects
interface StatProps {
  value: string;
  label: string;
  delay: number;
}

const Stat = ({ value, label, delay }: StatProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative group text-center p-6 z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.7, 
        delay, 
        type: "spring", 
        stiffness: 80, 
        damping: 10 
      }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 -z-10"
        animate={{
          boxShadow: isHovered 
            ? '0 0 25px 2px rgba(212, 175, 55, 0.3)' 
            : '0 0 0px 0px rgba(212, 175, 55, 0)'
        }}
        transition={{ duration: 0.3 }}
      />
      
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
        <AnimatedCounter 
          value={value} 
          className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600"
          start={0}
          duration={1.5}
        />
      </h3>
      
      <motion.p 
        className="text-gold-200/80 relative"
        animate={{
          y: isHovered ? -2 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

export function StatsSection() {
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  
  const stats = [
    {
      value: "20+",
      label: "Projects Built"
    },
    {
      value: "7+",
      label: "Team Members"
    },
    {
      value: "15+",
      label: "Happy Clients"
    },
    {
      value: "100%",
      label: "Student-Led"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Three.js background */}
      <ThreeBackground type="particles" intensity={1.5} />
      
      <motion.div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        style={{ opacity: backgroundOpacity }}
      />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
          >
            Our Achievements
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Stat 
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 