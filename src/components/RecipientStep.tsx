import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Tone } from '@/lib/vaxintine-data';

interface RecipientStepProps {
  message: string;
  date: Date;
  tone: Tone;
}

type RecipientState = 'invite' | 'convince' | 'accepted' | 'declined';

const convinceMessages: Record<Tone, string> = {
  romantic: "They care about you enough to send this. That's worth a tiny needle.",
  flirty: "Someone literally made you a flirty flu shot invite. The bar is on the floor. Say yes.",
  responsible: "Statistically, you'll thank yourself. And them.",
  'dark-humor': "You could say no. But then who'll attend your funeral? (It's just the flu, but still.)",
  'public-health': "Each vaccinated individual reduces community transmission by up to 40%. Be the statistic that matters.",
};

const RecipientStep = ({ message, date, tone }: RecipientStepProps) => {
  const [state, setState] = useState<RecipientState>('invite');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      <AnimatePresence mode="wait">
        {state === 'invite' && (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center"
          >
            <span className="text-5xl mb-4">💉</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
              You've been invited to a{' '}
              <span className="text-foreground italic">Vaxintine</span>
            </h2>
            <p className="font-display text-lg italic text-foreground/80 mt-4 max-w-md">
              "{message}"
            </p>
            <p className="font-body text-sm text-muted-foreground mt-3">
              📅 {format(date, 'EEEE, MMMM d')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setState('accepted')}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-body font-medium glow-rose"
              >
                Yes, I'm in 💉
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setState('convince')}
                className="px-8 py-3 rounded-full bg-card border border-border font-body font-medium hover:border-primary/30 transition-colors"
              >
                Convince me
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setState('declined')}
                className="px-8 py-3 rounded-full bg-card border border-border font-body font-medium text-muted-foreground hover:border-destructive/30 transition-colors"
              >
                I'll risk it
              </motion.button>
            </div>
          </motion.div>
        )}

        {state === 'convince' && (
          <motion.div
            key="convince"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-md"
          >
            <span className="text-5xl mb-4">🤔</span>
            <h2 className="font-display text-2xl font-semibold mb-4">Okay, here's the thing...</h2>
            <p className="font-display text-lg italic text-foreground/80 leading-relaxed">
              {convinceMessages[tone]}
            </p>
            <div className="flex gap-3 mt-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setState('accepted')}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-body font-medium glow-rose"
              >
                Fine, I'm in
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setState('declined')}
                className="px-8 py-3 rounded-full bg-card border border-border font-body font-medium text-muted-foreground"
              >
                Still no
              </motion.button>
            </div>
          </motion.div>
        )}

        {state === 'accepted' && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 150 }}
            className="flex flex-col items-center text-center"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              You just prevented something.
            </h2>
            <p className="font-body text-muted-foreground max-w-sm">
              {format(date, 'EEEE, MMMM d')} — it's a date. A Vaxintine date.
            </p>
            <p className="font-body text-sm text-muted-foreground mt-6 italic">
              Because caring is contagious 💉
            </p>
          </motion.div>
        )}

        {state === 'declined' && (
          <motion.div
            key="declined"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <span className="text-5xl mb-4">😔</span>
            <h2 className="font-display text-2xl font-semibold mb-3">
              We respect that.
            </h2>
            <p className="font-body text-muted-foreground max-w-sm">
              But if you change your mind, the invite stands. Someone out there wants you healthy.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setState('invite')}
              className="mt-8 px-8 py-3 rounded-full bg-card border border-border font-body text-sm hover:border-primary/30 transition-colors"
            >
              ← Back to invite
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RecipientStep;
