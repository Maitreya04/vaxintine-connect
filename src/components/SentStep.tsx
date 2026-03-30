import { motion } from 'framer-motion';

const SentStep = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="text-6xl mb-6"
      >
        💌
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-script text-[3rem] md:text-[5rem] text-primary leading-none mb-4"
      >
        Sent!
      </motion.h2>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="font-body text-muted-foreground text-lg max-w-sm"
      >
        Your Vaxentine invite is on its way. Because caring is contagious.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => window.location.reload()}
        className="mt-10 px-10 py-3 border border-primary text-primary font-body hover:bg-primary hover:text-primary-foreground transition-all"
      >
        Send another
      </motion.button>
    </motion.div>
  );
};

export default SentStep;
