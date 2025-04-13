"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Boxes = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const boxes = [
    {
      className:
        "border border-gold-500/10 shadow-lg shadow-gold-500/[0.05] dark:shadow-gold-500/[0.05]",
      size: "100px",
      x: "0%",
      y: "0%",
      zIndex: 3,
    },
    {
      className:
        "border border-gold-500/10 shadow-lg shadow-gold-500/[0.05] dark:shadow-gold-500/[0.05]",
      size: "120px",
      x: "20%",
      y: "10%",
      zIndex: 2,
    },
    {
      className:
        "border border-gold-500/10 shadow-lg shadow-gold-500/[0.05] dark:shadow-gold-500/[0.05]",
      size: "80px",
      x: "80%",
      y: "60%",
      zIndex: 1,
    },
    {
      className:
        "border border-gold-500/10 shadow-lg shadow-gold-500/[0.05] dark:shadow-gold-500/[0.05]",
      size: "200px",
      x: "30%",
      y: "30%",
      zIndex: 2,
    },
    {
      className:
        "border border-gold-500/10 shadow-lg shadow-gold-500/[0.05] dark:shadow-gold-500/[0.05]",
      size: "150px",
      x: "50%",
      y: "60%",
      zIndex: 3,
    },
    {
      className:
        "border border-gold-500/10 shadow-lg shadow-gold-500/[0.05] dark:shadow-gold-500/[0.05]",
      size: "240px",
      x: "70%",
      y: "40%",
      zIndex: 1,
    },
    {
      className:
        "border border-gold-500/10 shadow-lg shadow-gold-500/[0.05] dark:shadow-gold-500/[0.05]",
      size: "100px",
      x: "10%",
      y: "50%",
      zIndex: 2,
    },
    {
      className:
        "border border-gold-500/10 shadow-lg shadow-gold-500/[0.05] dark:shadow-gold-500/[0.05]",
      size: "170px",
      x: "20%",
      y: "70%",
      zIndex: 1,
    },
    {
      className:
        "border border-gold-500/10 shadow-lg shadow-gold-500/[0.05] dark:shadow-gold-500/[0.05]",
      size: "100px",
      x: "80%",
      y: "20%",
      zIndex: 2,
    },
    {
      className:
        "border border-gold-500/10 shadow-lg shadow-gold-500/[0.05] dark:shadow-gold-500/[0.05]",
      size: "120px",
      x: "65%",
      y: "10%",
      zIndex: 3,
    },
    {
      className:
        "border border-gold-500/10 shadow-lg shadow-gold-500/[0.05] dark:shadow-gold-500/[0.05]",
      size: "90px",
      x: "90%",
      y: "80%",
      zIndex: 2,
    },
  ];

  // Animation properties
  const duration = 15; // seconds
  const maxRotation = 25; // degrees

  return (
    <div
      className={cn(
        "absolute top-0 left-0 z-0 h-full w-full overflow-hidden bg-black",
        className
      )}
      {...props}
    >
      {mounted && (
        <div className="absolute inset-0">
          {boxes.map((box, idx) => (
            <motion.div
              key={`box-${idx}`}
              className="absolute"
              animate={{ 
                opacity: [0.7, 1, 0.7],
                scale: [0.98, 1, 0.98]
              }}
              transition={{
                duration: duration + idx,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                width: box.size,
                height: box.size,
                left: box.x,
                top: box.y,
                zIndex: box.zIndex,
                borderRadius: "12px",
                background: `radial-gradient(circle at center, rgba(255, 184, 0, 0.03) 0%, rgba(0, 0, 0, 0) 70%)`,
                boxShadow: "0 0 20px 2px rgba(255, 184, 0, 0.03)",
              }}
            >
              <motion.div
                className={`${box.className} h-full w-full rounded-xl backdrop-blur-sm`}
                animate={{ rotate: idx % 2 === 0 ? 360 : -360 }}
                transition={{
                  duration: duration + idx * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transform: `rotate(${
                    Math.random() * maxRotation * 2 - maxRotation
                  }deg)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}; 