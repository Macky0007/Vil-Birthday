import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { pageVariants, pageTransition } from '../animations/pageTransition';
import heroImage from '../assets/hero.jpg';

// Swap these two for the real thing whenever you're ready — see notes below.
const RECIPIENT_NAME = 'Vil';
const OPENING_LINE = "I made you something. It's not much, but every bit of it is real.";

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function FirstGreetings({ onNext }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden px-6 text-center"
    >
      {/* Decorative glows — visual only, don't intercept clicks */}
      <motion.div
        className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-secondary/30 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative flex flex-col items-center"
      >
        <motion.p
          variants={itemVariants}
          className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground"
        >
          A little something for you
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-display text-6xl text-primary sm:text-7xl"
        >
          Happy Birthday, {RECIPIENT_NAME}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mt-8 h-64 w-52 overflow-hidden rounded-[2rem] border-4 border-card shadow-xl sm:h-80 sm:w-64"
        >
          <img src={heroImage} alt="A photo of us" className="h-full w-full object-cover" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-md font-body text-lg text-foreground sm:text-xl"
        >
          {OPENING_LINE}
        </motion.p>

        <motion.button
          variants={itemVariants}
          type="button"
          onClick={onNext}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-10 py-3 font-body text-lg text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <FaHeart className="text-sm" />
          Open it
        </motion.button>
      </motion.div>
    </motion.div>
  );
}