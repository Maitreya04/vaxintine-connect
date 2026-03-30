import { motion } from 'framer-motion';

interface LandingStepProps {
  onStart: () => void;
}

const LandingStep = ({ onStart }: LandingStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="relative"
      >
        <h1 className="font-script text-[4rem] md:text-[7rem] leading-none text-primary select-none">
          Will you be my
        </h1>
        <h1 className="font-script text-[5rem] md:text-[9rem] leading-none text-primary -mt-4 md:-mt-8 select-none">
          Vaxentine?
        </h1>
        {/* Shadow text layer */}
        <h1
          className="font-script text-[5rem] md:text-[9rem] leading-none text-blush absolute -mt-4 md:-mt-8 select-none pointer-events-none"
          style={{ top: '50%', left: '50%', transform: 'translate(-48%, -46%)', zIndex: -1 }}
          aria-hidden
        >
          Vaxentine?
        </h1>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="mt-12 px-12 py-4 border border-primary text-primary font-body font-medium text-lg hover:bg-primary hover:text-primary-foreground transition-all"
      >
        Pick a Date
      </motion.button>
    </motion.div>
  );
};

export default LandingStep;
