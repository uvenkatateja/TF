import { Suspense, lazy, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar'
import HeroSection from './components/HeroSection'
import { SmoothScrollWrapper } from './components/SmoothScrollWrapper'
import { ScrollToTop } from './components/ScrollToTop'
import { ForStudentsStartupsSection } from './components/ForStudentsStartupsSection'
import { PageTransition } from './components/PageTransition';

// Lazy load components for better performance
const ServicesSection = lazy(() => import('./components/ServicesSection').then(module => ({ default: module.ServicesSection })));
const WhyChooseUsSection = lazy(() => import('./components/WhyChooseUsSection').then(module => ({ default: module.WhyChooseUsSection })));
const TeamSection = lazy(() => import('./components/TeamSection').then(module => ({ default: module.TeamSection })));
const ProjectsSection = lazy(() => import('./components/ProjectsSection').then(module => ({ default: module.ProjectsSection })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const StatsSection = lazy(() => import('./components/StatsSection').then(module => ({ default: module.StatsSection })));
const PricingSection = lazy(() => import('./components/PricingSection').then(module => ({ default: module.PricingSection })));
const CTASection = lazy(() => import('./components/CTASection').then(module => ({ default: module.CTASection })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));

// Loading fallback spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-gold-500 rounded-full border-t-transparent animate-spin"></div>
  </div>
);

function App() {
  const [currentPath, setCurrentPath] = useState('');

  // Track current path for transitions
  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    // Initialize
    handlePathChange();

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handlePathChange);
    
    // Create an observer to watch for pushState/replaceState
    const observer = new MutationObserver(() => {
      if (currentPath !== window.location.pathname) {
        handlePathChange();
      }
    });
    
    // Start observing the document
    observer.observe(document.body, { 
      childList: true,
      subtree: true,
      attributes: true
    });

    return () => {
      window.removeEventListener('popstate', handlePathChange);
      observer.disconnect();
    };
  }, [currentPath]);

  return (
    <SmoothScrollWrapper>
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentPath}
          className="bg-black text-white min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Navbar />
          <PageTransition>
            <main>
              <HeroSection />
              
              <ForStudentsStartupsSection />
              
              <Suspense fallback={<LoadingSpinner />}>
                <ServicesSection />
                <TeamSection />
                <ProjectsSection />
                <PricingSection />
                <WhyChooseUsSection />
                <TestimonialsSection />
                <StatsSection />
                <CTASection />
              </Suspense>
            </main>
            
            <Suspense fallback={<LoadingSpinner />}>
              <Footer />
            </Suspense>
            
            <ScrollToTop />
          </PageTransition>
        </motion.div>
      </AnimatePresence>
    </SmoothScrollWrapper>
  )
}

export default App
