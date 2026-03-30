import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';
import HeartsLockup from './HeartsLockup';
import { generateRoutingLink, categorizeRecipient, generateBatchRoutingLinks } from '../utils/routing';

interface SentStepProps {
  recipients: string[];
  date: Date;
  time: string;
}

const SentStep = ({ recipients, date, time }: SentStepProps) => {
  const heartCount = Math.min(3, Math.max(1, recipients.length));
  const lockupWidth = 140 + heartCount * 90;
  const { emailLink, smsLink, emailCount, smsCount } = generateBatchRoutingLinks(recipients, date, time);
  const entryDelay = heartCount * 0.08;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center min-h-screen px-6 py-12 relative overflow-hidden"
    >
      {/* Hearts lockup */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="w-full max-w-[400px] mb-8 flex justify-center items-center"
      >
        <div style={{ width: lockupWidth, maxWidth: '100%' }}>
          <HeartsLockup count={heartCount} label="Ready!" />
        </div>
      </motion.div>

      {/* Sub-copy */}
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: entryDelay + 0.55 }}
        className="font-body text-muted-foreground text-sm max-w-xs text-center mb-8"
      >
        Tap below to send your invites via text or email.
        <br />
        <span className="italic">Love is Contagious.</span>
      </motion.p>

      {/* Action list */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: entryDelay + 0.7 }}
        className="w-full max-w-sm space-y-3"
      >
        {smsLink && (
          <motion.a
            href={smsLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-primary bg-primary text-primary-foreground shadow-sm hover:shadow-md transition-all font-medium font-body"
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
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-primary bg-primary text-primary-foreground shadow-sm hover:shadow-md transition-all font-medium font-body"
          >
            <Mail className="w-5 h-5" />
            Send to all {emailCount} via Email
          </motion.a>
        )}

        {(smsLink || emailLink) && recipients.length > 0 && (
          <div className="py-2 flex items-center">
            <div className="h-px bg-primary/20 flex-1" />
            <span className="px-3 font-body text-xs text-muted-foreground tracking-wider uppercase">Individually</span>
            <div className="h-px bg-primary/20 flex-1" />
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
              whileHover={{ scale: 1.02, boxShadow: '0 8px 30px hsl(350 72% 46% / 0.22)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground shadow-md transition-all font-body font-medium border border-primary/20"
            >
              <span className="truncate mr-4">{recipient}</span>
              <span className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-primary-foreground/15">
                {isEmail ? <Mail className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
              </span>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Start over */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: entryDelay + 1.1 }}
        onClick={() => window.location.reload()}
        className="mt-10 font-body text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors underline underline-offset-4"
      >
        Start over
      </motion.button>
    </motion.div>
  );
};

export default SentStep;
