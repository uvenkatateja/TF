import { motion } from 'framer-motion';
import { WavyBackground } from './ui/wavy-background';

export function CTASection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <WavyBackground 
        containerClassName="absolute inset-0"
        colors={[
          "#FFFFFF", // White
          "#FFF6E0", // Very light gold (gold-100)
          "#FFEDC7", // Light gold (gold-200)
          "#FFE5AD", // Medium-light gold (gold-300)
          "#FFDB8A", // Medium gold (gold-400)
        ]}
        waveWidth={60}
        backgroundFill="black"
        blur={10}
        speed="slow"
        waveOpacity={0.3}
      />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gold-500 mb-6">
            Let's Build Something Awesome
          </h2>
          <p className="text-xl text-gold-300 mb-10 max-w-2xl mx-auto">
            Ready to turn your idea into reality? Our team of student innovators is here to help you create exceptional digital experiences.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 rounded-lg bg-gold-500 text-black font-medium text-lg hover:bg-gold-400 focus:ring-4 focus:ring-gold-500/30 transition-colors"
              aria-label="Contact us to start your project"
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
                window.history.pushState(null, '', '/contact');
              }}
            >
              Contact Us Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 