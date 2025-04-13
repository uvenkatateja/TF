import { motion,AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Testimonial card component
interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image?: string;
  index: number;
}

const Testimonial = ({ quote, name, title, image, index }: TestimonialProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const quoteVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.2 + index * 0.1, duration: 0.4 } },
    hover: { y: -3, transition: { duration: 0.2 } }
  };
  
  return (
    <motion.div 
      className="bg-black p-8 rounded-xl border border-gold-500/30 shadow-lg shadow-gold-500/10 flex flex-col h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        boxShadow: '0 8px 32px -4px rgba(212, 175, 55, 0.20)',
        y: -2,
        borderColor: 'rgba(212, 175, 55, 0.5)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="mb-4 text-gold-500">
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="w-10 h-10 opacity-60"
          animate={{ rotate: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M11.28 3.22 4.26 8a.75.75 0 0 0 0 1.28l7.02 4.78a.75.75 0 0 0 1.16-.88L8.58 8l3.86-5.18a.75.75 0 0 0-1.16-.6m4.5 0L8.78 8a.75.75 0 0 0 0 1.28l7.02 4.78a.75.75 0 0 0 1.16-.88L13.08 8l3.86-5.18a.75.75 0 0 0-1.16-.6" />
        </motion.svg>
      </div>
      <motion.p 
        className="text-gold-300 italic mb-8 text-lg leading-relaxed flex-grow"
        variants={quoteVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        {quote}
      </motion.p>
      <motion.div 
        className="flex items-center mt-auto"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      >
        {image && (
          <div className="mr-4">
            <motion.div 
              className="w-12 h-12 rounded-full bg-gold-600 overflow-hidden border-2 border-gold-400"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Image placeholder - replace with actual images */}
              <motion.div 
                className="w-full h-full bg-gradient-to-br from-gold-400 to-gold-700"
                animate={{ 
                  background: isHovered 
                    ? 'linear-gradient(to bottom right, rgba(234, 211, 141, 1), rgba(212, 175, 55, 1))' 
                    : 'linear-gradient(to bottom right, rgba(212, 175, 55, 1), rgba(181, 134, 23, 1))'
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        )}
        <div>
          <motion.p 
            className="font-bold text-gold-400"
            animate={{ color: isHovered ? 'rgb(234, 211, 141)' : 'rgb(212, 175, 55)' }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.p>
          <p className="text-gold-200/70 text-sm">{title}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Traid Forge completely transformed our digital presence. Their attention to detail and innovative approach has helped us grow our customer base by 40% in just three months.",
      name: "Tarun Reddy",
      title: "CTO, InnovateX Solutions",
      image: "/testimonials/tarun.jpg"
    },
    {
      quote: "The team at Traid Forge delivered beyond our expectations. Their expertise in UI/UX design and web development created an exceptional platform that our users love.",
      name: "Latish Kumar",
      title: "Founder, TechSprint Analytics",
      image: "/testimonials/latish.jpg"
    },
    {
      quote: "Working with Traid Forge has been a game-changer for our startup. Their strategic approach and technical excellence helped us secure our first round of funding.",
      name: "Shyam Varma",
      title: "CEO, NextGen Ventures",
      image: "/testimonials/shyam.jpg"
    },
    {
      quote: "As a non-technical founder, I was amazed by how Traid Forge translated my vision into reality. Their team made the entire development process smooth and transparent.",
      name: "Raj Patel",
      title: "Founder, EcoSmart Solutions",
      image: "/testimonials/raj.jpg"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  // Auto carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Show two testimonials on desktop, one on mobile
  const visibleTestimonials = () => {
    // We'll use window object safely with useEffect/useState
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Initial check
      checkMobile();
      
      // Listen for window resize
      window.addEventListener('resize', checkMobile);
      
      // Clean up
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    if (isMobile) {
      return [testimonials[currentIndex]];
    } else {
      return [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length]
      ];
    }
  };

  // Progress indicators with animated transitions
  const progressIndicators = () => {
    return testimonials.map((_, index) => (
      <motion.button
        key={index}
        className={`h-2 mx-1 rounded-full ${
          index === currentIndex ? "bg-gold-500" : "bg-gold-500/30"
        }`}
        initial={false}
        animate={{ 
          width: index === currentIndex ? 28 : 8,
          opacity: index === currentIndex ? 1 : 0.5,
        }}
        whileHover={{ 
          opacity: 1,
          scale: 1.1
        }}
        transition={{ duration: 0.3 }}
        onClick={() => setCurrentIndex(index)}
        aria-label={`Go to testimonial ${index + 1}`}
      />
    ));
  };

  return (
    <motion.section 
      className="py-16 bg-gradient-to-b from-black to-black/95 overflow-hidden"
      ref={sectionRef}
      style={{ opacity, scale }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-gold-500 mb-2"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>
          
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto rounded-full mb-4"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="text-gold-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Success stories from those who trusted us with their digital transformation journey.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                >
                  <Testimonial 
                    quote={testimonial.quote}
                    name={testimonial.name}
                    title={testimonial.title}
                    image={testimonial.image}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
          
          {/* Navigation arrows with hover animations */}
          <motion.div 
            className="absolute -left-4 top-1/2 transform -translate-y-1/2"
            whileHover={{ scale: 1.1, x: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button 
              className="p-2 rounded-full bg-black/50 border border-gold-500/30 text-gold-400 hover:bg-gold-900/30 transition-colors"
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          </motion.div>
          <motion.div 
            className="absolute -right-4 top-1/2 transform -translate-y-1/2"
            whileHover={{ scale: 1.1, x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button 
              className="p-2 rounded-full bg-black/50 border border-gold-500/30 text-gold-400 hover:bg-gold-900/30 transition-colors"
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Progress indicators with animations */}
        <motion.div 
          className="flex justify-center mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {progressIndicators()}
        </motion.div>
      </div>
    </motion.section>
  );
} 