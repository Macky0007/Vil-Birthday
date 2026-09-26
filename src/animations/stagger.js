export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};