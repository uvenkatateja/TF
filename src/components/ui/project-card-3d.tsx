import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "./3d-card";

interface ProjectCard3DProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  index?: number;
  fallbackImage?: string;
  fallbackGradient?: string;
}

// Tag component for project categories
const Tag = ({ text }: { text: string }) => (
  <span className="inline-block px-3 py-1.5 bg-gold-500/10 text-gold-400 text-sm rounded-full">
    {text}
  </span>
);

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  title,
  description,
  tags,
  imageUrl,
  index = 0,
  fallbackImage,
  fallbackGradient
}) => {
  // Fallback image - gold gradient pattern
  const defaultFallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23B8860B;stop-opacity:0.3' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:0.7' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad1)' /%3E%3C/svg%3E";
  
  // State to track hover for additional effects
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [imgError, setImgError] = useState(false);

  // Handle image error
  useEffect(() => {
    // Immediately use fallback for empty URLs without logging warnings
    if (!imageUrl || imageUrl.trim() === '') {
      setImgError(true);
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImgSrc(imageUrl);
      setImgError(false);
    };
    img.onerror = () => {
      console.warn(`Failed to load image: ${imageUrl}, using fallback`);
      setImgError(true);
      if (fallbackImage) {
        setImgSrc(fallbackImage);
      }
    };
  }, [imageUrl, fallbackImage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContainer containerClassName="py-10">
        <CardBody className="relative bg-black border border-gold-500/20 hover:border-gold-500/60 rounded-xl overflow-hidden h-[480px] min-h-[480px] w-full group">
          {/* Enhanced glow effect on hover */}
          <div className={`absolute -inset-0.5 bg-gradient-to-r from-gold-500/0 via-gold-500/30 to-gold-500/0 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10 ${isHovered ? 'animate-pulse' : ''}`}></div>
          
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            {!imgError ? (
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${imgSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
              </div>
            ) : (
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: fallbackGradient || 
                    (fallbackImage ? `url(${fallbackImage})` : defaultFallbackImage),
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="relative z-10 h-full p-8 flex flex-col">
            {/* Title with 3D effect */}
            <CardItem
              translateZ={80}
              className="text-2xl md:text-3xl font-bold mb-4 w-full"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-gold-500">
                {title}
              </span>
            </CardItem>
            
            {/* Description with 3D effect */}
            <CardItem
              as="p"
              translateZ={60}
              className="text-gold-200/80 mb-8 text-base md:text-lg w-full"
            >
              {description}
            </CardItem>
            
            {/* Tags with 3D effect */}
            <CardItem
              translateZ={40}
              className="flex flex-wrap gap-3 mt-auto mb-8 w-full"
            >
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </CardItem>

            {/* Button with 3D effect */}
            <CardItem
              translateZ={100}
              className="mt-auto w-full"
            >
              <button className="px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-black text-base font-bold w-full hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-lg shadow-gold-500/20 hover:shadow-xl hover:shadow-gold-500/40 transform hover:-translate-y-1">
                View Project
              </button>
            </CardItem>
          </div>

          {/* Decorative elements with increased 3D effect */}
          <CardItem
            translateZ={30}
            translateX={-15}
            className="absolute top-6 right-6 w-28 h-28 rounded-full bg-gold-500/10 blur-xl"
          >
            <div className="w-full h-full"></div>
          </CardItem>
          
          <CardItem
            translateZ={40}
            translateX={20}
            className="absolute bottom-20 left-0 w-52 h-10 bg-gradient-to-r from-gold-500/20 to-transparent blur-lg"
          >
            <div className="w-full h-full"></div>
          </CardItem>
          
          {/* Additional floating particles */}
          {[...Array(5)].map((_, i) => (
            <CardItem
              key={`particle-${i}`}
              translateZ={10 + i * 5}
              translateX={i % 2 === 0 ? 10 : -10}
              translateY={i % 3 === 0 ? 15 : -15}
              className={`absolute w-2 h-2 rounded-full bg-gold-400/40 blur-sm`}
              style={{
                top: `${20 + i * 15}%`,
                left: `${15 + i * 15}%`,
              }}
            >
              <div className="w-full h-full"></div>
            </CardItem>
          ))}
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}; 