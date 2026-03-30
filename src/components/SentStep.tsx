import { motion } from 'framer-motion';
import { Mail, MessageCircle, RefreshCw } from 'lucide-react';
import HeartsLockup from './HeartsLockup';
import { generateRoutingLink, categorizeRecipient, generateBatchRoutingLinks } from '../utils/routing';

interface SentStepProps {
  recipients: string[];
  date: Date;
  time: string;
}

const SentStep = ({ recipients, date, time }: SentStepProps) => {
  // Cap at 3 hearts for visual aesthetics so it doesn't bleed off screen awkwardly
  const heartCount = Math.min(3, Math.max(1, recipients.length));
  
  // Calculate batch links
  const { emailLink, smsLink, emailCount, smsCount } = generateBatchRoutingLinks(recipients, date, time);

  // Calculate width so each heart gets roughly 90px-120px depending on count
  // For 1 heart: ~260px, For 5 hearts: ~500px, etc.
  const lockupWidth = 140 + heartCount * 90;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center relative overflow-hidden"
    >
      {/* Hearts lockup — responsive scaling */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="w-full max-w-[400px] mb-8 flex justify-center items-center"
      >
        <div style={{ width: lockupWidth, maxWidth: '100%' }}>
          <HeartsLockup count={heartCount} label={"Ready!"} />
        </div>
      </motion.div>

      {/* Sub-copy */}
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: heartCount * 0.08 + 0.55 }}
        className="font-body text-muted-foreground text-base md:text-lg max-w-xs mb-8"
      >
        Tap below to send out your invites.
        <br />
        <span className="italic">Love is Contagious.</span>
      </motion.p>

      {/* Action List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: heartCount * 0.08 + 0.7 }}
        className="w-full max-w-sm space-y-3"
      >
        {smsLink && (
          <motion.a
            href={smsLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-primary bg-primary text-primary-foreground shadow-sm hover:shadow-md transition-all font-medium font-body mb-2"
          >
            <MessageCircle className="w-5 h-5" />
            Send to all {smsCount} via Text
          </motion.a>
        )}
        
        {emailLink && (
          <motion.a
            href={emailLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-primary bg-primary text-primary-foreground shadow-sm hover:shadow-md transition-all font-medium font-body mb-2"
          >
            <Mail className="w-5 h-5" />
            Send to all {emailCount} via Email
          </motion.a>
        )}

        {(smsLink || emailLink) && (
          <div className="py-3 flex items-center justify-center opacity-70">
            <div className="h-px bg-primary/20 flex-1"></div>
            <span className="px-3 text-muted-foreground text-xs font-body tracking-wider uppercase">Send Individually</span>
            <div className="h-px bg-primary/20 flex-1"></div>
          </div>
        )}

        {recipients.map((recipient, i) => {
          const type = categorizeRecipient(recipient);
          const link = generateRoutingLink(recipient, date, time);
          const isEmail = type === 'email';

          return (
            <motion.a
              key={recipient + i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-primary/20 bg-background shadow-sm hover:border-primary/50 transition-colors group"
            >
              <span className="font-body text-foreground truncate mr-4">
                {recipient}
              </span>
              <span className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                {isEmail ? <Mail className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
              </span>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Send another */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: heartCount * 0.08 + 1.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => window.location.reload()}
        className="mt-10 flex items-center gap-2 px-8 py-3 rounded-full border border-primary/30 text-primary font-body text-sm font-medium hover:bg-primary/5 transition-all"
      >
        <RefreshCw className="w-4 h-4" />
        Start over
      </motion.button>
    </motion.div>
  );
};

export default SentStep;
