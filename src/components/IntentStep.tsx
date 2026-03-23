import { motion } from 'framer-motion';
import { Intent, intentOptions } from '@/lib/vaxintine-data';

interface IntentStepProps {
  onSelect: (intent: Intent) => void;
}

const IntentStep = ({ onSelect }: IntentStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      <motion.h2
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-display text-3xl md:text-4xl font-semibold mb-2 text-center"
      >
        Why are you sending this?
      </motion.h2>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="font-body text-muted-foreground mb-10 text-center"
      >
        Be honest. It changes everything.
      </motion.p>

      <div className="flex flex-col gap-3 max-w-sm w-full">
        {intentOptions.map((opt, i) => (
          <motion.button
            key={opt.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(opt.id)}
            className="text-left p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:glow-rose-sm font-body text-base transition-all cursor-pointer"
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default IntentStep;
