import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';

import { Mesh } from 'three';

// Import team member images with correct filenames
import bhaveshImg from '../assets/bhavesh.jpg';
import raghavaImg from '../assets/raghava.jpg';
import venkataTejaImg from '../assets/venkatateja.jpg';
import narayanImg from '../assets/Narayan.jpg';

// Animated background sphere
const AnimatedSphere = () => {
  const sphereRef = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });
  
  return (
    <mesh ref={sphereRef} position={[0, 0, -5]} scale={3}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial 
        color="#FFD700" 
        attach="material" 
        distort={0.3} 
        speed={2} 
        roughness={0.5}
        metalness={0.8}
        opacity={0.1}
        transparent={true}
      />
    </mesh>
  );
};

// Team member card component with enhanced animations
interface TeamMemberProps {
  name: string;
  role: string;
  quote: string;
  delay: number;
  isActive: boolean;
  image: string;
}

const TeamMember = ({ name, role, quote, delay, isActive, image }: TeamMemberProps) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <motion.div 
      ref={ref}
      className={`bg-black border border-gold-500/20 rounded-xl overflow-hidden transition-all duration-500
                ${isActive ? 'scale-105 shadow-lg shadow-gold-500/20 z-10' : 'scale-95 opacity-70'}`}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={inView ? { 
        opacity: 1, 
        y: 0, 
        rotateY: isActive ? 0 : -5,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 20,
          delay: delay * 0.2
        }
      } : { opacity: 0, y: 50, rotateY: -15 }}
      whileHover={{ 
        scale: isActive ? 1.05 : 1,
        rotateY: 0,
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
      }}
      transition={{ 
        duration: 0.4,
      }}
    >
      <div className="h-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
        
        {/* Use actual image with enhanced handling */}
        <motion.div 
          className="w-full h-full"
          initial={{ scale: 1.2 }}
          animate={inView ? { scale: 1 } : { scale: 1.2 }}
          transition={{ duration: 0.5, delay: delay * 0.2 }}
        >
          {/* Enhanced image styling for better display */}
          <img 
            src={image} 
            alt={`${name} - ${role}`}
            className={`absolute inset-0 w-full h-full object-cover ${name === "Narayan Soni" ? "object-center" : "object-top"}`}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 hover:opacity-75 transition-opacity duration-300">
            {/* Gradient overlay for better text readability */}
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.4, 
            delay: delay * 0.3 + 0.2 
          } 
        } : { opacity: 0, y: 20 }}
      >
        <h3 className="text-xl font-semibold text-gold-400">{name}</h3>
        <p className="text-gold-300 mb-3">{role}</p>
        <motion.p 
          className="text-gold-200/70 italic text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { 
            opacity: 1, 
            transition: { 
              duration: 0.4, 
              delay: delay * 0.3 + 0.4 
            } 
          } : { opacity: 0 }}
        >
          "{quote}"
        </motion.p>
        
        <motion.button
          className="mt-4 px-4 py-2 bg-gold-500/10 text-gold-400 rounded-md text-sm 
                    hover:bg-gold-500/20 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Profile
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const teamMembers = [
    {
      name: "Narayan Soni",
      role: "Full Stack Developer",
      quote: "Professional developer having experience in various domains from SDE, Cloud and AI/ML",
      image: narayanImg,
    },
    {
      name: "Venkata Teja",
      role: "UI/UX Expert & MERN Developer",
      quote: "Creating beautiful and intuitive user interfaces with a focus on user experience",
      image: venkataTejaImg,
    },
    {
      name: "Bhavesh",
      role: "Backend Developer",
      quote: "Handles in server-side development and creating robust backend solutions",
      image: bhaveshImg,
    },
    {
      name: "Raghava",
      role: "IoT Developer",
      quote: "Expert in IoT development and creating connected solutions",
      image: raghavaImg,
    },
  ];
  
  // Duplicate team members to create a longer carousel effect
  const extendedTeamMembers = [...teamMembers, ...teamMembers];
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };
  
  // Auto-advance carousel
  useEffect(() => {
    if (!autoplay || !inView) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoplay, inView]);
  
  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  return (
    <section 
      id="team" 
      ref={ref}
      className="min-h-screen py-20 flex flex-col justify-center relative overflow-hidden bg-black"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* 3D Background Canvas - Removed 3D Text */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <AnimatedSphere />
          <Environment preset="night" />
        </Canvas>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 w-full z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.8, 
              ease: "easeOut" 
            } 
          } : { opacity: 0, y: -50 }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-gold-500 mb-6"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { 
              clipPath: "inset(0 0% 0 0)",
              transition: { 
                duration: 1, 
                ease: "easeOut",
                delay: 0.2
              } 
            } : { clipPath: "inset(0 100% 0 0)" }}
          >
            Meet the Team
          </motion.h2>
          
          <motion.p 
            className="text-gold-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { 
              opacity: 1,
              transition: { 
                duration: 0.8, 
                delay: 0.4 
              } 
            } : { opacity: 0 }}
          >
            The creative minds behind our successful projects, bringing diverse skills and fresh perspectives.
          </motion.p>
        </motion.div>
        
        {/* Mobile View (Horizontal Carousel) - Full Width */}
        <div className="block md:hidden w-full overflow-hidden">
          <div className="relative px-0 overflow-hidden">
            <AnimatePresence initial={false} custom={currentIndex} mode="popLayout">
              <motion.div 
                key={`mobile-${currentIndex}`}
                className="w-full"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <TeamMember 
                  key={teamMembers[currentIndex].name}
                  name={teamMembers[currentIndex].name}
                  role={teamMembers[currentIndex].role}
                  quote={teamMembers[currentIndex].quote}
                  delay={0}
                  isActive={true}
                  image={teamMembers[currentIndex].image}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Mobile directional hints - Enlarged for better access */}
            <motion.div 
              className="absolute top-1/2 left-2 -translate-y-1/2 w-12 h-20 flex items-center justify-center opacity-70"
              whileHover={{ opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
            >
              <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-gold-400 border border-gold-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute top-1/2 right-2 -translate-y-1/2 w-12 h-20 flex items-center justify-center opacity-70"
              whileHover={{ opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
            >
              <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-gold-400 border border-gold-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Desktop View (Horizontal Carousel) - Full Width */}
        <div className="hidden md:block relative overflow-hidden">
          {/* Main carousel container - Full Width */}
          <div className="relative overflow-hidden w-screen ml-[calc(-50vw+50%)]">
            <motion.div 
              className="flex space-x-8 px-[calc(50vw-380px)]"
              initial={{ x: 0 }}
              animate={{ 
                x: -currentIndex * 380, // Approximate width of a card including gap
                transition: { 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 30 
                }
              }}
            >
              {/* Display more cards than needed to create illusion of infinite carousel */}
              {extendedTeamMembers.map((member, index) => {
                // Calculate relative index for repeating team members
                const actualIndex = index % teamMembers.length;
                const isActive = actualIndex === currentIndex;
                
                return (
                  <motion.div 
                    key={`${member.name}-${index}`}
                    className="w-[350px] flex-shrink-0"
                    onClick={() => setCurrentIndex(actualIndex)}
                    initial={{ scale: 0.95, opacity: 0.7 }}
                    animate={isActive ? { 
                      scale: 1.05, 
                      opacity: 1,
                      transition: { duration: 0.3 }
                    } : { 
                      scale: 0.95, 
                      opacity: 0.7,
                      transition: { duration: 0.3 }
                    }}
                    whileHover={{ 
                      scale: isActive ? 1.05 : 1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <TeamMember 
                      name={member.name}
                      role={member.role}
                      quote={member.quote}
                      delay={index * 0.1}
                      isActive={isActive}
                      image={member.image}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          
          {/* Overlay shadows and direction buttons for carousel effect */}
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
          
          {/* Side navigation arrows for desktop - Enlarged and more prominent */}
          <motion.div 
            className="absolute top-1/2 left-6 -translate-y-1/2 w-16 h-24 flex items-center justify-center opacity-70 z-20"
            whileHover={{ opacity: 1, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
          >
            <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center text-gold-400 border border-gold-500/40 shadow-lg shadow-gold-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute top-1/2 right-6 -translate-y-1/2 w-16 h-24 flex items-center justify-center opacity-70 z-20"
            whileHover={{ opacity: 1, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
          >
            <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center text-gold-400 border border-gold-500/40 shadow-lg shadow-gold-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 