import { Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { SmoothScrollWrapper } from './components/SmoothScrollWrapper'
import { ScrollToTop } from './components/ScrollToTop'
import { ForStudentsStartupsSection } from './components/ForStudentsStartupsSection'

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
  return (
    <SmoothScrollWrapper>
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          
          <ForStudentsStartupsSection />
          
          <Suspense fallback={<LoadingSpinner />}>
            <ServicesSection />
            <WhyChooseUsSection />
            <ProjectsSection />
            <TeamSection />
            <TestimonialsSection />
            <StatsSection />
            <PricingSection />
            <CTASection />
          </Suspense>
        </main>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
        
        <ScrollToTop />
      </div>
    </SmoothScrollWrapper>
  )
}

export default App
