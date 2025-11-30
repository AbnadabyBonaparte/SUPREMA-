// src/components/AnimatedSection.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
  className?: string;
}

export default function AnimatedSection({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = ''
}: AnimatedSectionProps) {
  const variants = {
    up: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    down: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 }
    },
    left: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    right: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      variants={variants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Componente para animação de hover em cards
export function AnimatedCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Componente para animação de contador
export function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration, ease: 'easeOut' }}
      >
        {value.toLocaleString()}
      </motion.span>
    </motion.span>
  );
}

// Componente para animação de texto gradiente
export function AnimatedGradientText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      style={{
        backgroundSize: '200% 200%'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
