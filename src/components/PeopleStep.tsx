import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Heart, ArrowLeft, CalendarDays, Clock, Send } from 'lucide-react';
import { format } from 'date-fns';

interface PeopleStepProps {
  date: Date;
  time: string;
  recipients: string[];
  onAddRecipient: (email: string) => void;
  onRemoveRecipient: (email: string) => void;
  onTimeChange: (time: string) => void;
  onSend: () => void;
  onBack: () => void;
}

const PeopleStep = ({ date, time, recipients, onAddRecipient, onRemoveRecipient, onTimeChange, onSend, onBack }: PeopleStepProps) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !recipients.includes(trimmed)) {
      onAddRecipient(trimmed);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); handleAdd(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center min-h-screen px-4 md:px-6 py-6 pb-32 md:pb-12"
    >
      {/* Back button */}
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="self-start mb-4 md:mb-8"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-body text-sm text-foreground/80 hover:text-primary transition-colors border border-primary/20 hover:border-primary/40 px-3 py-1.5 md:px-4 md:py-2 rounded-md bg-background shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-script text-[2.5rem] md:text-[4rem] text-primary leading-none mb-2"
      >
        Invite your people
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="font-body text-muted-foreground text-sm mb-5 md:mb-8"
      >
        who deserves a shot of love?
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md space-y-5"
      >
        {/* Date & Time chips */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
          <span className="inline-flex items-center gap-2 bg-background shadow-sm rounded-lg px-4 py-2.5 font-body text-sm text-primary border border-primary/20">
            <CalendarDays className="w-4 h-4" />
            {format(date, 'EEEE, MMM d')}
          </span>
          <span className="inline-flex items-center gap-2 bg-background shadow-sm rounded-lg px-4 py-2.5 font-body text-sm text-primary border border-primary/20">
            <Clock className="w-4 h-4" />
            <span className="font-medium px-1">{time}</span>
          </span>
        </div>

        {/* Recipient input */}
        <div className="flex gap-2.5">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="name or email..."
            className="flex-1 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm"
          />
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-[52px] h-[52px] rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:shadow-lg transition-all border border-primary/20"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Recipients list */}
        <div className="space-y-2">
          <AnimatePresence>
            {recipients.map(r => (
              <motion.div
                key={r}
                initial={{ opacity: 0, scale: 0.9, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-between bg-background shadow-sm rounded-lg border border-primary/20 px-4 py-2.5"
              >
                <span className="flex items-center gap-2.5 font-body text-sm text-foreground font-medium">
                  <Heart className="w-4 h-4 text-primary fill-primary/20" strokeWidth={1.5} />
                  {r}
                </span>
                <button onClick={() => onRemoveRecipient(r)} className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-md hover:bg-destructive/10">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Decorative hearts */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-2 py-3"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
              transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
            >
              <Heart className={`text-primary ${i === 1 ? 'w-8 h-8 fill-primary' : 'w-6 h-6 fill-primary/30'}`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Send button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 30px hsl(350 72% 46% / 0.25)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onSend}
          disabled={recipients.length === 0}
          className="w-full rounded-xl bg-primary text-primary-foreground py-4 font-body font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground/30 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 border border-primary/20"
        >
          <Send className="w-5 h-5" />
          Send Invite {recipients.length > 0 && `(${recipients.length})`}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PeopleStep;
