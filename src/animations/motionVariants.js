// Reusable Framer Motion variants for premium transition effects

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

export const slideUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -25,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

export const slideDown = {
  hidden: { opacity: 0, y: -25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: 25,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, y: { type: "spring", stiffness: 100 } }
  }
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.03,
    transition: { duration: 0.2, yoyo: Infinity }
  },
  tap: { scale: 0.97 }
};

export const float = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};
