import { motion} from 'framer-motion';

import { ServicesBackground } from './ui/services-background';
import { ServiceCard } from './ui/service-card';
import { SectionHeader } from './ui/section-header';
import { fadeInStaggerVariants } from '@/lib/utils';

// Enhanced service card with additional hover effects
const EnhancedServiceCard = ({ 
  service, 
  index 
}: { 
  service: {
    title: string;
    description: string;
    icon: React.ReactNode;
    longDescription?: string;
  };
  index: number;
}) => {
  
  return (
    <motion.div
      custom={index}
      variants={fadeInStaggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <ServiceCard
        title={service.title}
        description={service.description}
        icon={service.icon}
        index={index}
      />

      {/* Expandable detail on hover - uncomment if you want additional details on hover
      <AnimatePresence>
        {isHovered && service.longDescription && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 px-4 py-2 rounded-lg bg-black/30 backdrop-blur-sm border border-gold-500/10"
          >
            <p className="text-sm text-white/80">{service.longDescription}</p>
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </motion.div>
  );
};

export function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with the latest technologies.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      longDescription: "Create stunning web experiences with React, Next.js, and other modern frameworks. We focus on performance, accessibility, and beautiful UI."
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
      longDescription: "Build seamless mobile experiences using React Native, Flutter, or native development with Swift and Kotlin."
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive user interfaces designed for optimal user experience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
      longDescription: "Craft user-centered designs that not only look beautiful but also enhance usability and conversion rates."
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      ),
      longDescription: "Deploy your applications on robust cloud infrastructure using AWS, Azure, or Google Cloud, with proper scaling and security."
    },
    {
      title: "AI Integration",
      description: "Incorporate artificial intelligence to enhance your applications.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
      longDescription: "Leverage the power of AI and machine learning to create smart features and automate complex processes."
    },
    {
      title: "DevOps",
      description: "Streamline your development workflow with CI/CD pipelines.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
        </svg>
      ),
      longDescription: "Implement efficient development processes with automated testing, deployment, and monitoring."
    }
  ];

  return (
    <section id="services" className="relative min-h-screen py-32 px-4 md:px-8 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <ServicesBackground />
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header with animation */}
        <SectionHeader
          subtitle="Our Services"
          title="Comprehensive Digital Solutions"
          description="We provide end-to-end services to help your business thrive in the digital landscape, combining technical expertise with creative innovation."
          highlights={["Digital", "Solutions"]}
        />
        
        {/* Service cards grid with staggered animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <EnhancedServiceCard
              key={index}
              service={service}
              index={index}
            />
          ))}
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-black font-medium hover:from-gold-400 hover:to-gold-500 transition-all duration-300 text-lg shadow-lg shadow-gold-500/20 hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-1"
          >
            Discuss Your Project 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 