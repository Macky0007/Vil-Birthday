import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaHeart } from 'react-icons/fa';
import { pageVariants, pageTransition } from '../animations/pageTransition';

const LETTER_MESSAGE = `Happy Happy Birthday, Vil! 🥳❤️

I probably don't say this enough, but I really want you to know how much I appreciate you and everything you've done for me. From treating me to different kinds of food, spending time with me, and even taking the time to watch my performances, all of those little things mean so much to me. I may not always say it or show it, but I genuinely notice and appreciate every effort you make.

You're such a great person to be with, and honestly, I couldn't be happier that I got the chance to know someone like you. Every time we're together, you somehow make everything feel more enjoyable and memorable. Even the simplest moments become something I look forward to because I'm spending them with you. I really love how easy it is to have fun and be myself whenever I'm around you.

One thing I really admire about you is how much effort you put into the things and people you care about. I still remember when you asked around the campus just to find me. I don't think you realize how much that meant to me. It genuinely made my heart flutter because, honestly, who would have thought that someone would actually go around looking for me just to find me? That moment really stayed with me, and it made me realize even more how thoughtful you can be.

I appreciate all the little things you do, even the ones you might think aren't a big deal. The way you remember things, the way you make an effort, the way you spend time with me, and the way you make me feel appreciated are things that I truly value. You have this way of making people around you feel comfortable and happy, and I'm really grateful that I get to experience that with you.

I'm also thankful for all the memories we've already made together, and I hope we get to make even more. I hope that this birthday reminds you of how loved and appreciated you are by the people around you, especially by the people who are lucky enough to know you.

You deserve so many good things, not just today but in all the days ahead. I hope you continue being the amazing person that you are, and I hope you never lose that kindness and effort that make you so special. Always remember that there are people who genuinely appreciate having you in their lives, and I'm definitely one of them.

Once again, Happy Happy Birthday, Vil! 🎂❤️ I hope you enjoy your day, eat lots of good food, make more amazing memories, and most importantly, have a really happy birthday. Thank you for being you, and thank you for letting me be part of your life. I'm really, really glad I got to meet you. Here's to more food, more memories, more random moments, and more time together. Happy birthday! ❤️`;

const TYPE_SPEED_MS = 10;

export default function Letter({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const intervalRef = useRef(null);

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true);
  };

  useEffect(() => {
    if (!letterVisible) return;

    intervalRef.current = setInterval(() => {
      setTypedCount((count) => {
        if (count >= LETTER_MESSAGE.length) {
          clearInterval(intervalRef.current);
          return count;
        }
        return count + 1;
      });
    }, TYPE_SPEED_MS);

    return () => clearInterval(intervalRef.current);
  }, [letterVisible]);

  const isTypingDone = typedCount >= LETTER_MESSAGE.length;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 py-12 text-center"
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope-wrap"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
            className="flex flex-col items-center gap-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-body text-lg text-muted-foreground"
            >
              Tap the envelope to open it
            </motion.p>

            <button
              type="button"
              onClick={handleOpen}
              aria-label="Open the envelope"
              className="relative aspect-[300/190] w-72 sm:w-80"
            >
              <svg
                viewBox="0 0 300 190"
                className="absolute inset-0 h-full w-full drop-shadow-xl"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Body — the full rounded card silhouette, all 4 corners rounded */}
                <rect
                  x="0"
                  y="0"
                  width="300"
                  height="190"
                  rx="22"
                  className="fill-muted stroke-accent"
                  strokeWidth="2"
                />
                {/* Flap — reuses the same 22px corner radius as the body so the top edges line up seamlessly */}
                <path
                  d="M22,0 L278,0 A22,22 0 0 1 300,22 L150,118 L0,22 A22,22 0 0 1 22,0 Z"
                  className="fill-secondary"
                />
              </svg>

              <span className="absolute left-1/2 top-[62%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary shadow-md sm:h-14 sm:w-14">
                <FaHeart className="text-lg text-white sm:text-xl" />
              </span>
            </button>
          </motion.div>
        ) : (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
              onAnimationComplete={() => setLetterVisible(true)}
              className="font-display text-6xl text-primary sm:text-7xl"
            >
              A Letter for You
            </motion.h1>
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
              onAnimationComplete={() => setLetterVisible(true)}
              className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-left shadow-2xl"
            >
              <p className="whitespace-pre-line font-body text-base text-foreground sm:text-lg">
                {LETTER_MESSAGE.slice(0, typedCount)}
                {!isTypingDone && <span className="animate-pulse">|</span>}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && isTypingDone && (
          <motion.button
            type="button"
            onClick={onNext}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-body text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Continue <FaArrowRight className="text-sm" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}