import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tone, Intent, generateMessage } from '@/lib/vaxintine-data';
import { format } from 'date-fns';
import { RefreshCw } from 'lucide-react';

interface MessageStepProps {
  tone: Tone;
  date: Date;
  message: string;
  onMessageChange: (msg: string) => void;
  onRegenerate: () => void;
  onNext: () => void;
}

const MessageStep = ({ tone, date, message, onMessageChange, onRegenerate, onNext }: MessageStepProps) => {
  useEffect(() => {
    if (!message) {
      const dateStr = format(date, 'MMMM d');
      onMessageChange(generateMessage(tone, 'care', dateStr));
    }
  }, []);

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
        Your message
      </motion.h2>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="font-body text-muted-foreground mb-8 text-center"
      >
        We wrote something. Make it yours.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md"
      >
        <div className="relative">
          <textarea
            value={message}
            onChange={e => onMessageChange(e.target.value)}
            rows={4}
            className="w-full bg-card border border-border rounded-xl p-5 font-display text-lg italic text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <button
            onClick={onRegenerate}
            className="absolute top-3 right-3 p-2 rounded-lg hover:bg-muted transition-colors group"
            title="Regenerate"
          >
            <RefreshCw className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs font-body text-muted-foreground">
            {format(date, 'EEEE, MMMM d')}
          </span>
          <span className="text-xs font-body text-muted-foreground capitalize">
            {tone.replace('-', ' ')} tone
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="mt-8 w-full py-3.5 rounded-full bg-primary text-primary-foreground font-body font-medium text-base glow-rose transition-shadow"
        >
          Continue
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default MessageStep;
