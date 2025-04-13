import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThreeBackground } from './ThreeBackground';

// Enhanced process step component with perfect alignment
interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  delay: number;
}

const ProcessStep = ({ number, title, description, delay }: ProcessStepProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative px-5 mx-auto flex-1"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1.2, 
        delay: delay + 0.2, 
        type: "spring", 
        stiffness: 50, 
        damping: 15 
      }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Step content */}
      <div className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Step number circle */}
          <motion.div 
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative"
            initial={{ scale: 0.8, opacity: 0.5 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: delay + 0.5 }}
            viewport={{ once: true }}
          >
            {/* Number background */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(0, 0, 0, 0) 70%)",
              }}
              animate={{
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.8 : 0.4
              }}
              transition={{ duration: 0.7 }}
            />
            
            {/* Border circle */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-gold-500"
              animate={{
                boxShadow: isHovered 
                  ? '0 0 25px 5px rgba(212, 175, 55, 0.3)' 
                  : '0 0 5px 0px rgba(212, 175, 55, 0.1)',
                borderColor: isHovered 
                  ? 'rgba(212, 175, 55, 1)' 
                  : 'rgba(212, 175, 55, 0.6)'
              }}
              transition={{ duration: 0.8 }}
            />
            
            <motion.span 
              className="text-gold-500 font-bold text-2xl relative z-10"
              animate={{
                scale: isHovered ? 1.3 : 1,
                textShadow: isHovered ? '0 0 15px rgba(212, 175, 55, 0.7)' : '0 0 0px rgba(212, 175, 55, 0)'
              }}
              transition={{ 
                duration: 0.8,
                type: "spring", 
                stiffness: 200, 
                damping: 15 
              }}
            >
              {number}
            </motion.span>
          </motion.div>
          
          {/* Title and description */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay + 0.7 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-xl font-semibold mb-3 relative inline-block"
              animate={{
                color: isHovered ? '#D4AF37' : 'rgba(212, 175, 55, 0.8)'
              }}
              transition={{ duration: 0.5 }}
            >
              {title}
              
              {/* Animated underline on hover */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-px bg-gold-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
            </motion.h3>
            
            <motion.p 
              className="text-gold-200/70 max-w-[250px] mx-auto"
              animate={{
                opacity: isHovered ? 1 : 0.7
              }}
              transition={{ duration: 0.5 }}
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced pricing tier component with hover effects
interface PricingTierProps {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  delay: number;
  team?: string;
  buttonText?: string;
  emoji?: string;
}

const PricingTier = ({ name, price, features, highlighted = false, delay, team, buttonText = "Get Started", emoji }: PricingTierProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={`overflow-hidden relative group z-10`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.7, 
        delay, 
        type: "spring", 
        stiffness: 60, 
        damping: 15 
      }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card background with animated gradient border */}
      <motion.div 
        className={`h-full bg-black/80 rounded-xl relative z-10 p-6 backdrop-blur-sm`}
        animate={{
          y: isHovered ? -5 : 0,
          boxShadow: isHovered 
            ? '0 20px 30px -10px rgba(0, 0, 0, 0.5)' 
            : '0 0px 0px 0px rgba(0, 0, 0, 0)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Border gradient */}
        <motion.div 
          className="absolute inset-0 rounded-xl -z-10"
          style={{
            background: highlighted
              ? 'linear-gradient(145deg, rgba(212, 175, 55, 0.5), rgba(212, 175, 55, 0.2))'
              : 'linear-gradient(145deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.05))',
          }}
          animate={{
            opacity: isHovered ? 1 : 0.7
          }}
          transition={{ duration: 0.3 }}
        />
      
        {highlighted && (
          <div className="bg-gradient-to-r from-gold-600 to-gold-400 text-black py-1 text-center text-sm font-medium rounded-t-lg absolute top-0 inset-x-0">
            Most Popular
          </div>
        )}
        
        <div className={`${highlighted ? 'pt-8' : 'pt-2'}`}>
          <h3 className="text-xl font-semibold text-gold-400 mb-3">
            {emoji && <span className="mr-2">{emoji}</span>}
            {name}
          </h3>
          <div className="mb-6">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">{price}</span>
          </div>
          
          <ul className="space-y-3 mb-8">
            {features.map((feature) => (
              <motion.li 
                key={feature} 
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: delay + features.indexOf(feature) * 0.05 }}
                viewport={{ once: true }}
              >
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
                  className="text-gold-500 w-5 h-5 mr-2 flex-shrink-0 mt-1"
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                    rotate: isHovered ? 360 : 0
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.1 * features.indexOf(feature),
                    type: "spring"
                  }}
                >
                  <path d="M20 6 9 17l-5-5" />
                </motion.svg>
                <span className="text-gold-200/80 text-sm">{feature}</span>
              </motion.li>
            ))}
          </ul>
          
          {team && (
            <motion.div 
              className="mb-6 text-gold-300/70 text-sm border-t border-gold-500/20 pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.3 }}
              viewport={{ once: true }}
            >
              {team}
            </motion.div>
          )}
          
          <motion.a 
            href="/contact" 
            className={`w-full block text-center py-3 px-4 rounded-lg transition-colors font-medium ${
              highlighted 
                ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black hover:from-gold-400 hover:to-gold-600' 
                : 'bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500/10'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
              window.history.pushState(null, '', '/contact');
            }}
          >
            {buttonText}
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function PricingSection() {
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  
  const process = [
    {
      number: 1,
      title: "Contact",
      description: "Reach out to discuss your project needs and vision.",
    },
    {
      number: 2,
      title: "Plan",
      description: "We'll create a detailed roadmap and timeline together.",
    },
    {
      number: 3,
      title: "Build",
      description: "Our team develops your solution with regular updates.",
    },
    {
      number: 4,
      title: "Launch",
      description: "We deliver the final product and provide support.",
    },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "From ₹2,999",
      emoji: "🧩",
      features: [
        "One-page portfolio or landing site",
        "Fully mobile responsive",
        "Basic SEO optimization",
        "Contact form integration",
        "2 revision rounds",
      ],
     
      buttonText: "Get Started"
    },
    {
      name: "Pro",
      price: "From ₹7,499",
      emoji: "🚀",
      features: [
        "Multi-page modern website",
        "Custom animations & UI polish",
        "Advanced SEO & analytics setup",
        "Social media integration",
        "CMS (e.g., Sanity/WordPress/Contentful)",
        "4 revision rounds",
      ],
     
      highlighted: true,
      buttonText: "Get Started"
    },
    {
      name: "Custom — Built for You",
      price: "Get a Quote",
      emoji: "⚙️",
      features: [
        "Full-stack Web App (Frontend + Backend)",
        "Custom functionality tailored to your idea",
        "Database setup & integrations",
        "User authentication (JWT, OAuth, etc.)",
        "Admin dashboard and analytics",
        "IoT dashboard if needed (Raghava leads)",
        "Unlimited revisions",
        "Ongoing support & maintenance",
      ],
      team: "",
      buttonText: "Let's Talk"
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Three.js background */}
      <ThreeBackground type="objects" intensity={1} className="opacity-40" />
      
      <motion.div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        style={{ opacity: backgroundOpacity }}
      />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, type: "spring", stiffness: 50 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Flexible Options
          </motion.h2>
          
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto rounded-full mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          />
          
          <motion.p 
            className="text-gold-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Choose the package that fits your needs or contact us for a custom solution.
          </motion.p>
        </motion.div>
        
        {/* Process timeline */}
        <div className="mb-32">
          <motion.h3 
            className="text-2xl font-semibold text-gold-400 text-center mb-16"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            How It Works
          </motion.h3>
          
          {/* Process steps wrapper - now without connecting lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-5xl mx-auto">
            {/* Center line for mobile view - kept for mobile */}
            <div className="md:hidden absolute left-1/2 top-[20rem] bottom-[28rem] w-0.5 bg-gradient-to-b from-gold-500/50 via-gold-500/30 to-transparent -z-10" />
            
            {process.map((step, index) => (
              <ProcessStep 
                key={step.title}
                number={step.number}
                title={step.title}
                description={step.description}
                delay={index * 0.3}
              />
            ))}
          </div>
        </div>
        
        {/* Pricing tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pricingTiers.map((tier, index) => (
            <PricingTier 
              key={tier.name}
              name={tier.name}
              price={tier.price}
              features={tier.features}
              highlighted={tier.highlighted}
              delay={index * 0.1}
              team={tier.team}
              buttonText={tier.buttonText}
              emoji={tier.emoji}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 