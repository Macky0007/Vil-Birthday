import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { pageVariants, pageTransition } from '../animations/pageTransition';
import { staggerContainer, staggerItem } from '../animations/stagger';
import first from '../assets/firstMessage.jpg';

// Placeholder paragraphs — swap these out once you give me the real message.
const MESSAGE_PARAGRAPHS = [
  `Remember the first message you sent to me? There's actually something you probably didn't know about that moment. I purposely asked to use your phone to take a picture of us together because, honestly, I wanted you to be the one to chat me first. I really wanted to get closer to you back then, but I was too shy to make the first move myself. So I guess that was my little way of creating an opportunity for us to start talking without having to admit that I was actually trying to get closer to you. Looking back at it now, it's kind of funny to think about how something as simple as taking a picture together eventually led to all the memories we've made since then. I'm really glad I took that little step, even if I was too shy to do it directly, because it eventually gave me the chance to know you better and become closer to you.`];

export default function FirstMessage({ onNext, onBack }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden px-6 py-16"
    >
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid w-full max-w-4xl items-center gap-10 md:grid-cols-2 md:gap-14"
      >
        <motion.div variants={staggerItem} className="mx-auto md:mx-0">
          <img
            src={first}
            alt="A photo of us"
            className="h-96 w-auto -rotate-3 rounded-[2rem] border-4 border-card shadow-xl sm:h-[30rem]"
          />
        </motion.div>

        <motion.div variants={staggerItem} className="flex flex-col gap-5 text-left">
          {MESSAGE_PARAGRAPHS.map((paragraph, index) => (
            <p
              key={index}
              className="max-w-prose font-body text-lg leading-relaxed text-foreground sm:text-xl"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerItem}
        initial="initial"
        animate="animate"
        className="mt-10 flex items-center gap-4"
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