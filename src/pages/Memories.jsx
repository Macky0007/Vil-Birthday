import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaImage } from 'react-icons/fa';
import { pageVariants, pageTransition } from '../animations/pageTransition';
import { staggerContainer, staggerItem } from '../animations/stagger';
import meetImage from '../assets/meet.png';
import froshieImage from '../assets/orientation.png';
import firstDayImage from '../assets/firstDay.png'; 
import hangoutImage from '../assets/hangout.png';
import favImage from '../assets/fav.png'; 

// Once you have real photos: add them under src/assets/memories/ (see notes below),
// import each one at the top of this file, then replace the matching `image: null`
// with the imported variable — e.g. `image: theDayWeMet`.
const MEMORIES = [
  {
    id: 'met',
    label: 'The day we met',
    image: meetImage,
    caption: 'First thing I saw was the duck in your head, I thought it was really cute, I was also surprised when you we-re also selected as a representative for the Mr. LTS. That event was really fun experience',
  },
  {
    id: 'froshie',
    label: 'Froshie orientation',
    image: froshieImage,
    caption: `I was joking when I asked if you wanted to watch our performance. I didn't think that you would take it seriously HAHAHAHA. But I really do appreciate you taking the time to watch us and even taking a fan cam for me`,
  },
  {
    id: 'first-day',
    label: 'First Day of School',
    image: firstDayImage,
    caption: 'It was as stressful day because it was really rainy and I was gonna be late for the performance. But what really surprised me was when you suddenly gave me flowers, that was the first time someone gave me flowers so I really appreciate it when you gave me one.',
  },
  {
    id: 'hangout',
    label: 'First hangout',
    image: hangoutImage,
    caption: `I was laughing secretly cause I wasn't really used to someone calling that kind of thing as "hangout" HAHAHA. It ended up being such a good day, and I definitely wasn't ready for your whole family to suddenly be meeting me by the end of it HAHAHA`,
  },
  {
    id: 'fav',
    label: 'Fav memory',
    image: favImage,
    caption: `I really love the memomry of us going to libro espresso and celebrating my birthday. I really appreciate you taking the time to celebrate my birthday with me,especially sine I didn't really made any plans to celebrate it in the firstplace`,
  },
];

export default function Memories({ onNext, onBack }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = MEMORIES[activeIndex];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="relative flex min-h-dvh flex-col items-center justify-center gap-8 overflow-x-hidden px-6 py-16"
    >
      {/* Ambient background glow — same treatment as FirstGreetings/LastGreeting */}
      <motion.div
        className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-secondary/30 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl text-primary sm:text-5xl"
      >
        A Few of My Favorites
      </motion.h2>

      {/* 5 memory buttons */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex flex-wrap justify-center gap-3"
      >
        {MEMORIES.map((memory, index) => (
          <motion.button
            key={memory.id}
            variants={staggerItem}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-pressed={index === activeIndex}
            className={`rounded-full border px-5 py-2 font-body text-sm transition-colors sm:text-base ${
              index === activeIndex
                ? 'border-primary bg-primary text-white'
                : 'border-border bg-card text-foreground hover:border-primary'
            }`}
          >
            {memory.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Shared display panel — swaps content based on which memory is selected */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-xl"
        >
          <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-muted">
            {active.image ? (
              <img src={active.image} alt={active.label} className="h-full w-full object-cover" />
            ) : (
              <FaImage className="text-5xl text-muted-foreground/50" />
            )}
          </div>
          <p className="font-body text-lg text-foreground sm:text-xl">{active.caption}</p>
        </motion.div>
      </AnimatePresence>

      <motion.div
        variants={staggerItem}
        initial="initial"
        animate="animate"
        className="flex items-center gap-4"
      >
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 font-body text-muted-foreground transition-colors hover:text-foreground"
        >
          <FaArrowLeft className="text-sm" />
          Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-body text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          Continue
          <FaArrowRight className="text-sm" />
        </button>
      </motion.div>
    </motion.div>
  );
}