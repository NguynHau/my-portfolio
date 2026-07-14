import React from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  id?: string;
  key?: React.Key;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  className = '',
  id,
}: RevealProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, filter: 'blur(10px)', y: yOffset }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier (easeOutExpo-like)
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
