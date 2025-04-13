import React from 'react';
import { motion } from 'framer-motion';
import { titleVariants, descriptionVariants } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  highlights?: string[];
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  centered = true,
  highlights = [],
}) => {
  // Split title to highlight words that match the highlights array
  const titleParts = title.split(' ').map((word, index, array) => {
    const isHighlighted = highlights.some(highlight => 
      word.toLowerCase().includes(highlight.toLowerCase())
    );
    
    return (
      <React.Fragment key={index}>
        {isHighlighted ? (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-500">
            {word}
          </span>
        ) : (
          word
        )}
        {index < array.length - 1 ? ' ' : ''}
      </React.Fragment>
    );
  });

  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-block text-sm md:text-base uppercase tracking-widest text-gold-500 font-medium mb-3"
        >
          {subtitle}
        </motion.span>
      )}
      
      <motion.h2
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
      >
        {titleParts}
      </motion.h2>
      
      {description && (
        <motion.p
          variants={descriptionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`text-lg text-white/70 ${centered ? 'max-w-2xl mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
      
      {/* Animated accent line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: centered ? 80 : 120, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className={`h-1 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full mt-8 ${
          centered ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}; 