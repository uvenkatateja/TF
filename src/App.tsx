import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar'
import HeroSection from './components/HeroSection'
import { SmoothScrollWrapper } from './components/SmoothScrollWrapper'
import { ScrollToTop } from './components/ScrollToTop'
import { ForStudentsStartupsSection } from './components/ForStudentsStartupsSection'
import { PageTransition } from './components/PageTransition';
import { ServicesSection } from './components/ServicesSection';
import { TeamSection } from './components/TeamSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PricingSection } from './components/PricingSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StatsSection } from './components/StatsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

function App() {
  return (
    <SmoothScrollWrapper>
      <motion.div 
        className="bg-black text-white min-h-screen relative"
        style={{ position: 'relative' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Navbar />
        <PageTransition>
          <main style={{ position: 'relative' }}>
            <HeroSection />
            <ForStudentsStartupsSection />
            <ServicesSection />
            <TeamSection />
            <ProjectsSection />
            <PricingSection />
            <WhyChooseUsSection />
            <TestimonialsSection />
            <StatsSection />
            <CTASection />
          </main>
          
          <Footer />
          
          <ScrollToTop />
        </PageTransition>
      </motion.div>
    </SmoothScrollWrapper>
  )
}

export default App
