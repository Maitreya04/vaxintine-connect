import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send } from 'lucide-react';
import HeartsLockup from './HeartsLockup';
import { generateRoutingLink, categorizeRecipient, generateBatchRoutingLinks } from '../utils/routing';

interface SentStepProps {
  recipients: string[];
  date: Date;
  time: string;
}

const SentStep = ({ recipients, date, time }: SentStepProps) => {
  const heartCount = 3;
  const lockupWidth = 140 + heartCount * 90;
  const entryDelay = heartCount * 0.08;

  // Compute the primary CTA link:
  // - Single recipient → their individual link
  // - Multiple → prefer batch SMS, then batch email, then first recipient's link
  const { emailLink: batchEmail, smsLink: batchSms } = generateBatchRoutingLinks(recipients, date, time);
  const primaryLink = recipients.length === 1
    ? generateRoutingLink(recipients[0], date, time)
    : (batchSms || batchEmail || (recipients[0] ? generateRoutingLink(recipients[0], date, time) : '#'));

  const showIndividualList = recipients.length > 1;

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
        className="font-body text-foreground/80 text-sm max-w-xs text-center mb-8"
      >
        Your Vaxintine is ready to send.
      </motion.p>

      {/* Action area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: entryDelay + 0.7 }}
        className="w-full max-w-sm space-y-4"
      >
        {/* Primary CTA — always shown */}
        <motion.a
          href={primaryLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, boxShadow: '0 16px 48px hsl(357 76% 50% / 0.45)' }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-primary text-primary-foreground shadow-xl font-body font-semibold text-lg transition-all"
        >
          <Send className="w-5 h-5" />
          Send Invite!
        </motion.a>

        {/* Individual pills — only shown for multi-recipient flows */}
        {showIndividualList && (
          <>
            <div className="py-1 flex items-center">
              <div className="h-px bg-white/20 flex-1" />
              <span className="px-3 font-body text-xs text-foreground/50 tracking-wider uppercase">Individually</span>
              <div className="h-px bg-white/20 flex-1" />
            </div>
            {recipients.map((recipient, i) => {
              const isEmail = categorizeRecipient(recipient) === 'email';
              const link = generateRoutingLink(recipient, date, time);
              return (
                <motion.a
                  key={recipient + i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-foreground font-body font-medium transition-all"
                >
                  <span className="truncate mr-4">{recipient}</span>
                  <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-white/15">
                    {isEmail ? <Mail className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                  </span>
                </motion.a>
              );
            })}
          </>
        )}
      </motion.div>

      {/* Start over */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: entryDelay + 1.1 }}
        onClick={() => window.location.reload()}
        className="mt-10 font-body text-xs text-foreground/40 hover:text-foreground/70 transition-colors underline underline-offset-4"
      >
        Start over
      </motion.button>


    </motion.div>
  );
};

export default SentStep;
