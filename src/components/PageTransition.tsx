import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  location?: string;
}

export function PageTransition({ children, location }: PageTransitionProps) {
  const [currentPath, setCurrentPath] = useState('');

  // Track the current path for transitions
  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    // Set initial path
    handlePathChange();

    // Create a MutationObserver to watch for URL changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
          handlePathChange();
        }
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { 
      attributes: true,
      childList: true,
      subtree: true
    });

    // Set up popstate event for browser back/forward navigation
    window.addEventListener('popstate', handlePathChange);

    // Clean up
    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPath || location}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 