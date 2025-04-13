import { motion } from 'framer-motion';

// Testimonial card component
interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  index: number;
}

const Testimonial = ({ quote, name, title, index }: TestimonialProps) => (
  <motion.div 
    className="bg-black p-6 rounded-xl border border-gold-500/20"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <div className="mb-4 text-gold-500">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        className="w-8 h-8 opacity-50"
      >
        <path d="M11.28 3.22 4.26 8a.75.75 0 0 0 0 1.28l7.02 4.78a.75.75 0 0 0 1.16-.88L8.58 8l3.86-5.18a.75.75 0 0 0-1.16-.6m4.5 0L8.78 8a.75.75 0 0 0 0 1.28l7.02 4.78a.75.75 0 0 0 1.16-.88L13.08 8l3.86-5.18a.75.75 0 0 0-1.16-.6" />
      </svg>
    </div>
    <p className="text-gold-300 italic mb-6">{quote}</p>
    <div>
      <p className="font-semibold text-gold-400">{name}</p>
      <p className="text-gold-200/60 text-sm">{title}</p>
    </div>
  </motion.div>
);

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Working with this team was the best decision for my startup. They delivered a beautiful website within our budget and timeline.",
      name: "Jamie Wilson",
      title: "Founder, EcoTech Startup",
    },
    {
      quote: "The app prototype they built for our club helped us win first place in the entrepreneurship competition. Incredible talent!",
      name: "Alex Rodriguez",
      title: "President, Entrepreneurship Club",
    },
    {
      quote: "I was impressed by their professionalism and technical skills. They transformed my vague idea into a fully functional web platform.",
      name: "Dr. Sarah Chen",
      title: "Computer Science Professor",
    },
    {
      quote: "My portfolio site exceeded all expectations. It's helped me land multiple interviews and showcases my work beautifully.",
      name: "Taylor Jackson",
      title: "Graphic Design Student",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-black/95">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gold-500 mb-4">What People Say</h2>
          <p className="text-gold-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients and collaborators have to say.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={testimonial.name}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 