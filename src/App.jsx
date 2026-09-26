import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { usePWA } from './hooks/usePWA';
import bgMusic from './assets/bg-music.mp3';
import FirstGreetings from './pages/FirstGreetings';
import Letter from './pages/Letter';
import FirstMessage from './pages/FirstMessage';
import Memories from './pages/Memories';
import LastGreeting from './pages/LastGreeting';

const STEPS = ['greeting', 'letter', 'message', 'memories', 'finale'];

export default function App() {
  usePWA(); // keeps the service-worker registration running in the background

  const [step, setStep] = useState('greeting');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const currentIndex = STEPS.indexOf(step);

  // Each step reuses the same scrollable container, so without this the
  // next page can mount while still scrolled to wherever the previous
  // page left off (showing its bottom instead of its top).
  useEffect(() => {
    scrollContainerRef.current?.scrollTo(0, 0);
  }, [step]);

  const goNext = () => {
    const next = STEPS[currentIndex + 1];
    if (next) setStep(next);
  };

  const startMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.4; // 0 (silent) to 1 (full) — tune to taste
    audioRef.current.play().catch(() => {
      // Would only land here if autoplay got blocked anyway — shouldn't
      // happen since this only ever runs from a real click.
    });
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  };

  const goBack = () => {
    const prev = STEPS[currentIndex - 1];
    if (prev) setStep(prev);
  };

    return (
    <MotionConfig reducedMotion="user">
      <div
        ref={scrollContainerRef}
        className={`fixed inset-0 overflow-x-hidden bg-background font-body text-foreground ${
        ['letter', 'message', 'memories'].includes(step) ? 'overflow-y-auto' : 'overflow-y-hidden'
      }`}
      >
        <audio ref={audioRef} src={bgMusic} loop />

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
          className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground shadow-md backdrop-blur transition-transform hover:scale-105"
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

        <AnimatePresence mode="wait">
          {step === 'greeting' && (
            <FirstGreetings
              key="greeting"
              onNext={() => {
                startMusic();
                goNext();
              }}
            />
          )}
          {step === 'letter' && <Letter key="letter" onNext={goNext} onBack={goBack} />}
          {step === 'message' && <FirstMessage key="message" onNext={goNext} onBack={goBack} />}
          {step === 'memories' && <Memories key="memories" onNext={goNext} onBack={goBack} />}
          {step === 'finale' && <LastGreeting key="finale" onBack={goBack} />}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}