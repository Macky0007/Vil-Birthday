import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import moment from 'moment';
import { pageVariants, pageTransition } from '../animations/pageTransition';

// Placeholder — tell me the real closing message and I'll drop it in.
const CLOSING_TITLE = 'Happy Birthday, Vil!';
const FINAL_MESSAGE = `Here's to more memories with you, and more random moments together. I really appreciate you and everything you've done for me, and I'm really glad I got the chance to know you. Happy birthday! ❤️`;

// Optional elapsed-time line. Leave this null until you give me the real date —
// e.g. RELATIONSHIP_START_DATE = '2023-06-15'. While it's null, that line just doesn't render.
const RELATIONSHIP_START_DATE = null;

function getElapsedSince(dateString) {
  const start = moment(dateString);
  const now = moment();
  const years = now.diff(start, 'years');
  const months = now.diff(start.clone().add(years, 'years'), 'months');
  return { years, months };
}

// Precomputed once — angle + distance for each heart in the burst, evenly spaced around a circle.
const BURST_COUNT = 10;
const BURST_PARTICLES = Array.from({ length: BURST_COUNT }, (_, i) => {
  const angle = (i / BURST_COUNT) * Math.PI * 2;
  const distance = 70 + (i % 3) * 18;
  return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
});

export default function LastGreeting({ onBack }) {
  const [isShaking, setIsShaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen && !isShaking) setIsShaking(true);
  };

  const elapsed = RELATIONSHIP_START_DATE ? getElapsedSince(RELATIONSHIP_START_DATE) : null;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="relative flex min-h-dvh flex-col items-center justify-center gap-8 overflow-x-hidden px-6 py-16 text-center"
    >
      {/* Ambient background glow — mirrors FirstGreetings so the first and last screens rhyme */}
      <motion.div
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-secondary/30 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -top-20 -right-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div key="box" className="relative flex flex-col items-center gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground"
            >
              One last thing for you
            </motion.p>

            {/* Outer element only ever animates x/rotate for the shake — keeps onAnimationComplete safe to trust */}
            <motion.button
              type="button"
              onClick={handleOpen}
              aria-label="Open the gift box"
              className="w-64 sm:w-72"
              animate={
                isShaking
                  ? { x: [0, -10, 10, -10, 10, -6, 6, 0], rotate: [0, -3, 3, -3, 3, -1, 1, 0] }
                  : { x: 0, rotate: 0 }
              }
              transition={{ duration: 0.6 }}
              onAnimationComplete={() => {
                if (isShaking) {
                  setIsShaking(false);
                  setIsOpen(true);
                }
              }}
            >
              {/* Inner element owns the idle "breathing" loop, kept separate so an infinite
                  animation never shares a completion callback with the one-shot shake */}
              <motion.div
                animate={{ scale: isShaking ? 1 : [1, 1.04, 1] }}
                transition={
                  isShaking
                    ? { duration: 0 }
                    : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <svg viewBox="0 0 240 170" className="drop-shadow-xl">
                  {/* bow loops */}
                  <ellipse cx="96" cy="36" rx="17" ry="13" className="fill-accent" transform="rotate(-35 96 36)" />
                  <ellipse cx="144" cy="36" rx="17" ry="13" className="fill-accent" transform="rotate(35 144 36)" />
                  {/* bow knot */}
                  <circle cx="120" cy="40" r="10" className="fill-primary" />

                  {/* lid */}
                  <rect x="8" y="45" width="224" height="28" rx="10" className="fill-secondary" />
                  <rect x="8" y="54" width="224" height="10" className="fill-accent" />

                  {/* box body */}
                  <rect x="20" y="65" width="200" height="95" rx="14" className="fill-primary" />
                  <rect x="108" y="45" width="24" height="115" className="fill-accent" />
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-2xl"
          >
            {/* Soft glow "spotlight" behind the card, sized larger than the card itself */}
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-secondary/25 blur-3xl" />

            {/* heart burst — plays once, the moment this block mounts, alternating tones */}
            {BURST_PARTICLES.map((p, i) => (
              <div
                key={i}
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <motion.span
                  className={i % 2 === 0 ? 'block text-accent' : 'block text-primary'}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                >
                  <FaHeart />
                </motion.span>
              </div>
            ))}

            <FaHeart className="text-4xl text-primary" />
            <h2 className="font-display text-4xl text-primary sm:text-5xl">{CLOSING_TITLE}</h2>
            <p className="whitespace-pre-line font-body text-lg text-foreground sm:text-xl">
              {FINAL_MESSAGE}
            </p>

            {elapsed && (
              <p className="font-body text-sm text-muted-foreground">
                It's been {elapsed.years} year{elapsed.years !== 1 ? 's' : ''} and {elapsed.months} month
                {elapsed.months !== 1 ? 's' : ''} since {moment(RELATIONSHIP_START_DATE).format('MMMM D, YYYY')}.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onBack}
        className="relative mt-4 inline-flex items-center gap-2 font-body text-muted-foreground transition-colors hover:text-foreground"
      >
        <FaArrowLeft className="text-sm" />
        Back
      </button>
    </motion.div>
  );
}