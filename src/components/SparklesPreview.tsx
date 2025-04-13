import { motion, useInView } from "framer-motion";
import { SparklesCore } from "./ui/sparkles";
import { useRef, useState } from "react";

export function SparklesPreview() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      ref={containerRef}
      className="h-[30rem] sm:h-[35rem] md:h-[40rem] w-full bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md relative"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center text-white relative z-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 15,
              delay: 0.2
            }}
          >
            Traid Forge
          </motion.h1>
          
          {/* Title hover effect */}
          <motion.div 
            className="absolute -inset-2 rounded-xl bg-gradient-to-r from-gold-500/10 to-gold-400/5 -z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: isHovered ? 0.7 : 0, 
              scale: isHovered ? 1.05 : 0.9,
              rotate: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        <motion.p
          className="text-base sm:text-lg md:text-xl text-center text-gold-300/80 mt-4 max-w-sm sm:max-w-md md:max-w-lg mx-auto z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 15,
            delay: 0.4
          }}
        >
          Transforming ideas into digital experiences that captivate and inspire.
        </motion.p>
        
        {/* Desktop CTA - hidden on mobile */}
        <motion.div
          className="hidden md:block mt-8"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 15,
            delay: 0.6
          }}
        >
          <motion.a 
            href="/contact" 
            className="px-8 py-3 rounded-lg bg-gold-500 text-black font-medium text-lg hover:bg-gold-400 transition-colors"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#FFDE81" 
            }}
            whileTap={{ 
              scale: 0.95,
              backgroundColor: "#D4AF37"
            }}
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
              window.history.pushState(null, '', '/contact');
            }}
          >
            Start Your Project
          </motion.a>
        </motion.div>
        
        {/* Mobile CTA - shown only on mobile */}
        <motion.div
          className="block md:hidden mt-6"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 15,
            delay: 0.6
          }}
        >
          <motion.a 
            href="/contact" 
            className="px-6 py-2.5 rounded-lg bg-gold-500 text-black font-medium text-base hover:bg-gold-400 transition-colors"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#FFDE81" 
            }}
            whileTap={{ 
              scale: 0.95,
              backgroundColor: "#D4AF37"
            }}
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
              window.history.pushState(null, '', '/contact');
            }}
          >
            Start Your Project
          </motion.a>
        </motion.div>
      </div>
      
      <div className="w-full h-40 relative mt-4 sm:mt-6">
        {/* Gradients - adjusted for better responsiveness */}
        <div className="absolute inset-x-5 sm:inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-gold-500 to-transparent h-[2px] w-[90%] sm:w-[85%] md:w-3/4 blur-sm mx-auto left-0 right-0" />
        <div className="absolute inset-x-5 sm:inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-gold-500 to-transparent h-px w-[90%] sm:w-[85%] md:w-3/4 mx-auto left-0 right-0" />
        <div className="absolute inset-x-20 sm:inset-x-40 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-gold-400 to-transparent h-[5px] w-[60%] sm:w-[40%] md:w-1/4 blur-sm mx-auto left-0 right-0" />
        <div className="absolute inset-x-20 sm:inset-x-40 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-gold-400 to-transparent h-px w-[60%] sm:w-[40%] md:w-1/4 mx-auto left-0 right-0" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFDA77"
          speed={2}
        />

        {/* Radial Gradient to prevent sharp edges - adjusted for responsiveness */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(250px_150px_at_top,transparent_20%,black)] sm:[mask-image:radial-gradient(300px_180px_at_top,transparent_20%,black)] md:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,black)]"></div>
      </div>
    </div>
  );
} 