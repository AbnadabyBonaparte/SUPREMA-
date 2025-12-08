// src/lib/motion-variants.ts

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

export const goldShimmer = {
  initial: { backgroundPosition: '-1000px 0' },
  animate: {
    backgroundPosition: '1000px 0',
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity
    }
  }
}

export const floatAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
}
