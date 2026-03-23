import { motion } from 'framer-motion';
import { Tone, toneOptions } from '@/lib/vaxintine-data';

interface ToneStepProps {
  onSelect: (tone: Tone) => void;
}

const ToneStep = ({ onSelect }: ToneStepProps) => {
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
        transition={{ delay: 0.1 }}
        className="font-display text-3xl md:text-4xl font-semibold mb-2 text-center"
      >
        Set the mood
      </motion.h2>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-body text-muted-foreground mb-10 text-center"
      >
        How do you want this to feel?
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg w-full">
        {toneOptions.map((opt, i) => (
          <motion.button
            key={opt.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(opt.id)}
            className="flex flex-col items-center p-6 rounded-xl bg-card border border-border hover:border-primary/40 hover:glow-rose-sm transition-all cursor-pointer"
          >
            <span className="text-3xl mb-2">{opt.emoji}</span>
            <span className="font-display text-lg font-medium">{opt.label}</span>
            <span className="font-body text-sm text-muted-foreground mt-1">{opt.description}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ToneStep;
