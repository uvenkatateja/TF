import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Footer link component
  const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a 
      href={href} 
      className="text-gold-300 hover:text-gold-500 transition-colors"
      onClick={(e) => {
        e.preventDefault();
        // Update URL without hash
        window.history.pushState(null, '', href);
        // Smooth scroll to section
        const sectionId = href === '/' ? '' : href.replace('/', '');
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
    >
      {children}
    </a>
  );

  // Social icon component
  const SocialIcon = ({ href, label, children }: { href: string, label: string, children: React.ReactNode }) => (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 hover:text-gold-500 transition-colors" 
      aria-label={label}
    >
      {children}
    </a>
  );

  // Navigation sections
  const navSections = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Team", href: "/team" },
        { label: "Projects", href: "/projects" },
        { label: "Pricing", href: "/pricing" },
        { label: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Website Development", href: "/services" },
        { label: "Web App Prototyping", href: "/services" },
        { label: "UI/UX Design", href: "/services" },
        { label: "Custom Projects", href: "/services" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Projects", href: "/projects" },
        { label: "Testimonials", href: "/testimonials" },
      ]
    },
  ];

  return (
    <footer id="contact" className="bg-black pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {/* Logo and contact */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-gold-500 font-bold text-2xl mb-4">Triad Forge</h2>
              <p className="text-gold-300/80 mb-6 max-w-xs">
                Building the future of digital experiences with innovative solutions.
              </p>
              <div className="space-y-2">
                <p className="text-gold-300">
                  <strong className="text-gold-400">Email:</strong> contact.triadforge@gmail.com
                </p>
                {/* <p className="text-gold-300">
                  <strong className="text-gold-400">Campus:</strong> Innovation Hub, College Campus
                </p> */}
              </div>
            </motion.div>
          </div>
          
          {/* Navigation sections */}
          {navSections.map((section, index) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-gold-400 font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Social icons and copyright */}
        <div className="pt-8 border-t border-gold-500/20 flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="flex space-x-4 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <SocialIcon href="https://github.com" label="GitHub">
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
                className="w-5 h-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" label="LinkedIn">
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
                className="w-5 h-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://instagram.com" label="Instagram">
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
                className="w-5 h-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://twitter.com" label="Twitter">
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
                className="w-5 h-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </SocialIcon>
          </motion.div>
          
          <motion.div 
            className="text-gold-300/60 text-sm text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            &copy; {currentYear} Traid-Forge. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
} 