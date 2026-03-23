import { motion } from 'framer-motion';

interface LandingStepProps {
  onStart: () => void;
}

const LandingStep = ({ onStart }: LandingStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-2"
      >
        <span className="text-6xl">💉</span>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-gradient-rose mb-4"
      >
        Will you be my
        <br />
        <span className="italic">Vaxintine?</span>
      </motion.h1>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="font-body text-lg text-muted-foreground mb-10 max-w-md"
      >
        Pick a day to care. Send an invite. Make immunity intimate.
      </motion.p>

      <motion.button
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-body font-medium text-lg glow-rose transition-shadow hover:glow-rose-sm"
      >
        Start Invite
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-sm text-muted-foreground font-body italic"
      >
        Not a medical app. Just a moment of care.
      </motion.p>
    </motion.div>
  );
};

export default LandingStep;
