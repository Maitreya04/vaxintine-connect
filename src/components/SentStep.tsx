import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import heartsImg from '@/assets/hearts-motif.png';

const SentStep = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden"
    >
      {/* Background hearts */}
      <img src={heartsImg} alt="" aria-hidden className="absolute top-12 left-1/2 -translate-x-1/2 w-64 opacity-10 pointer-events-none select-none" />

      {/* Animated heart burst */}
      <div className="relative mb-6">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 0.6, 0] }}
            transition={{ delay: 0.3 + i * 0.15, duration: 1.2 }}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 72}deg) translateY(-30px)`,
            }}
          >
            <Heart className="w-5 h-5 text-primary fill-primary" />
          </motion.div>
        ))}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          <Heart className="w-16 h-16 text-primary fill-primary" />
        </motion.div>
      </div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-script text-[3.5rem] md:text-[6rem] text-primary leading-none mb-3"
      >
        Sent!
      </motion.h2>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="font-body text-muted-foreground text-base md:text-lg max-w-xs"
      >
        Your Vaxentine invite is on its way.
        <br />
        <span className="italic">Because caring is contagious.</span>
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => window.location.reload()}
        className="mt-10 px-10 py-3.5 rounded-full border-2 border-primary text-primary font-body font-medium hover:bg-primary hover:text-primary-foreground transition-all"
      >
        Send another
      </motion.button>
    </motion.div>
  );
};

export default SentStep;
