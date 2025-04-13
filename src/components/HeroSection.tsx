import { SparklesPreview } from './SparklesPreview';
import { ScrollAnimationWrapper } from './ScrollAnimationWrapper';

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black/95 z-0"></div>
      
      {/* Hero content */}
      <div className="container mx-auto max-w-6xl relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Sparkles Title Section - Full width on smaller screens, centered on larger screens */}
          <ScrollAnimationWrapper 
            className="lg:col-span-12 w-full"
            animation="fadeIn"
            duration={1.2}
          >
            <SparklesPreview />
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
} 