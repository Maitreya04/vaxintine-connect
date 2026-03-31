import { motion } from 'framer-motion';
import lockupImg from '@/assets/lockup-shadow.png';
import heartsImg from '@/assets/hearts-motif.png';

interface LandingStepProps {
  onStart: () => void;
}

const LandingStep = ({ onStart }: LandingStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden"
    >
      {/* Decorative hearts motif - top */}
      <motion.img
        src={heartsImg}
        alt=""
        aria-hidden
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="w-48 md:w-64 mb-6 select-none"
      />

      {/* Hero lockup image */}
      <motion.img
        src={lockupImg}
        alt="Will you be my Vaxentine?"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 80 }}
        className="w-[85vw] max-w-xl md:max-w-2xl select-none"
      />

        {/* Subtitle */}
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="font-body text-foreground/80 text-base md:text-lg mt-4 tracking-wide"
      >
        Care is Contagious.
      </motion.p>

      {/* CTA button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="mt-10 px-14 py-4 rounded-xl border border-primary/20 bg-primary text-primary-foreground font-body font-semibold text-lg shadow-lg transition-colors"
      >
        Pick a Date
      </motion.button>

    </motion.div>
  );
};

export default LandingStep;
