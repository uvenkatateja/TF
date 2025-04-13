import React from 'react';
import { motion, useScroll, useTransform, useAnimation, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Audience card component with enhanced animations
interface AudienceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

// 3D Floating Shape Component for Three.js
function FloatingShape({ position, color, speed = 1, scale = 1 }: { position: [number, number, number], color: string, speed?: number, scale?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.2;
    mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 * speed) * 0.2;
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={2}
    >
      <mesh 
        ref={mesh} 
        position={position}
        scale={scale}
      >
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial 
          color={color} 
          speed={0.5} 
          distort={0.3} 
          radius={1}
        />
      </mesh>
    </Float>
  );
}

const AudienceCard = ({ title, description, icon, delay }: AudienceCardProps) => {
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Handle intersection observer
  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible').catch(err => {
            console.warn('Animation error in AudienceCard:', err);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [controls, isMounted]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    initial: { x: 0 },
    hover: { x: 5, transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 0.6 } }
  };

  return (
    <motion.div 
      ref={cardRef}
      className="relative bg-black/90 backdrop-blur-md p-8 rounded-xl border border-gold-500/30 hover:border-gold-500/70 transition-all shadow-lg hover:shadow-gold-500/20 overflow-hidden"
      style={{ position: 'relative' }}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      whileHover={{
        y: -10,
        boxShadow: "0 10px 30px -15px rgba(212, 175, 55, 0.3)",
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      viewport={{ once: true }}
    >
      {/* Background gradient effect */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-20 -z-10"
        style={{
          background: isHovered
            ? `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.3), rgba(0, 0, 0, 0) 80%)`
            : `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1), rgba(0, 0, 0, 0) 70%)`,
          position: 'absolute'
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div 
        className="mb-6 text-gold-500"
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
      >
        {icon}
      </motion.div>

      <h3 className="text-2xl font-semibold text-gold-400 mb-3">{title}</h3>
      <p className="text-gold-200/80 mb-6">{description}</p>
      
      <motion.a 
        href="#contact" 
        className="group inline-flex items-center text-gold-500 font-medium hover:text-gold-400 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Let's Build It Together
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="ml-1 w-4 h-4"
          variants={buttonVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </motion.svg>
      </motion.a>
    </motion.div>
  );
};

// 3D Background component with reduced complexity for mobile
const ThreeBackground = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const [hasError, setHasError] = useState(false);

  // Handle WebGL errors
  useEffect(() => {
    const handleError = () => {
      console.warn("WebGL rendering failed, disabling 3D effects");
      setHasError(true);
    };

    window.addEventListener('webglcontextlost', handleError);
    window.addEventListener('error', (e) => {
      if (e.message?.includes('WebGL') || e.message?.includes('THREE')) {
        handleError();
      }
    });

    return () => {
      window.removeEventListener('webglcontextlost', handleError);
    };
  }, []);

  if (hasError) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        {/* Render fewer shapes when reduced motion is preferred */}
        {!reducedMotion ? (
          <>
            <FloatingShape position={[-4, 2, -2]} color="#D4AF37" speed={0.5} scale={0.8} />
            <FloatingShape position={[4, -2, -3]} color="#D4AF37" speed={0.7} scale={0.6} />
            <FloatingShape position={[0, 3, -4]} color="#D4AF37" speed={0.3} scale={1.2} />
          </>
        ) : (
          <FloatingShape position={[0, 0, -3]} color="#D4AF37" speed={0.3} scale={1} />
        )}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export function ForStudentsStartupsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7]);
  
  // Add error state for catching render errors
  const [renderError, setRenderError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);

  const audiences = [
    {
      title: "Startup Founder?",
      description: "Transform your vision into a compelling digital presence. We understand the startup journey and can help you create a professional website or MVP on a startup-friendly budget.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-12 h-12"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13 15v4" />
          <path d="M11 15v4" />
          <path d="M12 3v5" />
        </svg>
      ),
    },
    {
      title: "Final-Year Project?",
      description: "Need technical help with your capstone project? Our team can help you build something impressive that showcases your skills and stands out to potential employers.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-12 h-12"
        >
          <path d="M22 19V9c0-1.1-.9-2-2-2H15a1 1 0 0 0-1 1v10" />
          <path d="M9 18h12" />
          <path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6.5" />
          <path d="M9 9a3 3 0 0 1 5.6 1.5" />
          <path d="M16 19h3" />
        </svg>
      ),
    },
    {
      title: "Need a Portfolio Site?",
      description: "Elevate your online presence with a standout portfolio that highlights your achievements and skills. Perfect for job hunting or personal branding.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-12 h-12"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <line x1="3" x2="21" y1="9" y2="9" />
          <line x1="9" x2="9" y1="21" y2="9" />
        </svg>
      ),
    },
  ];

  // Check for mobile device and browser performance
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Check for low-power devices
      const lowPower = mobile || navigator.hardwareConcurrency <= 4 || 
                      (prefersReducedMotion !== null && prefersReducedMotion);
      setIsLowPowerDevice(lowPower);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [prefersReducedMotion]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut" 
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        delay: 0.2,
        ease: "easeOut" 
      }
    }
  };

  // If an error occurs during rendering
  if (renderError) {
    return (
      <section id="for-you" className="relative pt-0 pb-16 min-h-[90vh] bg-black overflow-hidden flex items-center">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gold-500 mb-4">For Students & Startups</h2>
          <p className="text-gold-300 max-w-2xl mx-auto text-lg mb-8">
            Solutions tailored to your unique needs and goals, whether you're launching a venture or building your portfolio.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {audiences.map((audience) => (
              <div key={audience.title} className="bg-black/90 p-8 rounded-xl border border-gold-500/30">
                <div className="mb-6 text-gold-500">{audience.icon}</div>
                <h3 className="text-2xl font-semibold text-gold-400 mb-3">{audience.title}</h3>
                <p className="text-gold-200/80 mb-6">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  try {
    return (
      <section id="for-you" className="relative pt-0 pb-16 min-h-[90vh] bg-black overflow-hidden flex items-center">
        {!isMobile && !isLowPowerDevice && 
          <ThreeBackground reducedMotion={prefersReducedMotion || false} />}
        
        <motion.div 
          ref={containerRef}
          className="max-w-6xl mx-auto px-4 relative z-10 w-full"
          style={{ 
            ...(!isLowPowerDevice ? { y, opacity } : {}),
            position: 'relative' // Explicitly set position for Framer Motion
          }}
          initial={{}}
        >
          <motion.div 
            className="text-center mb-8 relative"
            style={{ position: 'relative' }} // Explicitly set position for Framer Motion
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-gold-500 mb-4"
              variants={titleVariants}
            >
              For Students & Startups
            </motion.h2>
            
            <motion.p 
              className="text-gold-300 max-w-2xl mx-auto text-lg"
              variants={subtitleVariants}
            >
              Solutions tailored to your unique needs and goals, whether you're launching a venture or building your portfolio.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {audiences.map((audience, index) => (
              <AudienceCard 
                key={audience.title}
                title={audience.title}
                description={audience.description}
                icon={audience.icon}
                delay={index * 0.15}
              />
            ))}
          </div>
        </motion.div>
      </section>
    );
  } catch (error) {
    console.error("Render error in ForStudentsStartupsSection:", error);
    setRenderError(true);
    return null; // This will be replaced by the error UI on the next render
  }
} 