import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface PeopleStepProps {
  date: Date;
  time: string;
  recipients: string[];
  onAddRecipient: (email: string) => void;
  onRemoveRecipient: (email: string) => void;
  onTimeChange: (time: string) => void;
  onSend: () => void;
}

const PeopleStep = ({ date, time, recipients, onAddRecipient, onRemoveRecipient, onTimeChange, onSend }: PeopleStepProps) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !recipients.includes(trimmed)) {
      onAddRecipient(trimmed);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-script text-[3rem] md:text-[5rem] text-primary leading-none mb-8"
      >
        Add People
      </motion.h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md space-y-6"
      >
        {/* Date & Time display */}
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="inline-flex items-center gap-2 border border-primary px-4 py-2 font-body text-sm text-primary">
            📅 {format(date, 'MMM d, yyyy')}
          </span>
          <div className="relative">
            <span className="inline-flex items-center gap-2 border border-primary px-4 py-2 font-body text-sm text-primary">
              🕐
              <input
                type="text"
                value={time}
                onChange={(e) => onTimeChange(e.target.value)}
                className="bg-transparent w-20 focus:outline-none text-primary font-body"
              />
            </span>
          </div>
        </div>

        {/* Recipient input */}
        <div className="flex gap-2">
          <input
            type="email"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="friend@email.com"
            className="flex-1 border border-primary bg-transparent px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={handleAdd}
            className="border border-primary px-4 py-3 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Recipients list */}
        <AnimatePresence>
          {recipients.map(r => (
            <motion.div
              key={r}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center justify-between border border-primary/30 px-4 py-3"
            >
              <span className="font-body text-sm text-foreground">👤 {r}</span>
              <button onClick={() => onRemoveRecipient(r)} className="text-muted-foreground hover:text-primary transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Hearts illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-1 py-4"
        >
          {['❤️', '❤️', '❤️'].map((h, i) => (
            <motion.span
              key={i}
              className="text-4xl md:text-5xl"
              animate={{ y: [0, -4, 0] }}
              transition={{ delay: i * 0.15, duration: 1.5, repeat: Infinity }}
            >
              {h}
            </motion.span>
          ))}
        </motion.div>

        {/* Send button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSend}
          disabled={recipients.length === 0}
          className="w-full border border-primary py-4 font-body font-medium text-lg text-primary hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PeopleStep;
