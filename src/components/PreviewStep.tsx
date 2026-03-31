import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface PreviewStepProps {
  message: string;
  date: Date;
  onShare: () => void;
}

const PreviewStep = ({ message, date, onShare }: PreviewStepProps) => {
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
        className="font-display text-3xl md:text-4xl font-semibold mb-8 text-center"
      >
        Your Vaxintine card
      </motion.h2>

      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="w-full max-w-sm bg-card border border-border rounded-2xl overflow-hidden glow-rose"
      >
        <div className="bg-primary/5 px-6 pt-8 pb-4 text-center border-b border-border">
          <span className="text-4xl mb-3 block">💉</span>
          <h3 className="font-display text-xl font-semibold text-foreground">
            You've been invited to a
          </h3>
          <h3 className="font-display text-2xl font-bold text-foreground italic">
            Vaxintine
          </h3>
        </div>

        <div className="px-6 py-6">
          <p className="font-display text-lg italic text-foreground/90 text-center leading-relaxed mb-4">
            "{message}"
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-body text-muted-foreground">
            <span>📅</span>
            <span>{format(date, 'EEEE, MMMM d, yyyy')}</span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 border-t border-border/50">
          <p className="text-center text-xs font-body text-muted-foreground italic">
            Because caring is contagious
          </p>
        </div>
      </motion.div>

      <motion.button
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onShare}
        className="mt-8 px-10 py-3.5 rounded-full bg-primary text-primary-foreground font-body font-medium text-base glow-rose transition-shadow"
      >
        Share this invite
      </motion.button>
    </motion.div>
  );
};

export default PreviewStep;
