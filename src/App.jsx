import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePWA } from './hooks/usePWA';
import FirstGreetings from './pages/FirstGreetings';
import Letter from './pages/Letter';
import FirstMessage from './pages/FirstMessage';
import Memories from './pages/Memories';
import LastGreeting from './pages/LastGreeting';

const STEPS = ['greeting', 'letter', 'message', 'memories', 'finale'];

export default function App() {
  usePWA(); // keeps the service-worker registration running in the background

  const [step, setStep] = useState('greeting');
  const currentIndex = STEPS.indexOf(step);

  const goNext = () => {
    const next = STEPS[currentIndex + 1];
    if (next) setStep(next);
  };

  const goBack = () => {
    const prev = STEPS[currentIndex - 1];
    if (prev) setStep(prev);
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <AnimatePresence mode="wait">
        {step === 'greeting' && <FirstGreetings key="greeting" onNext={goNext} />}
        {step === 'letter' && <Letter key="letter" onNext={goNext} onBack={goBack} />}
        {step === 'message' && <FirstMessage key="message" onNext={goNext} onBack={goBack} />}
        {step === 'memories' && <Memories key="memories" onNext={goNext} onBack={goBack} />}
        {step === 'finale' && <LastGreeting key="finale" onBack={goBack} />}
      </AnimatePresence>
    </div>
  );
}