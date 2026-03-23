import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, MessageCircle, QrCode } from 'lucide-react';
import { toast } from 'sonner';

interface ShareStepProps {
  onViewRecipient: () => void;
}

const ShareStep = ({ onViewRecipient }: ShareStepProps) => {
  const [copied, setCopied] = useState(false);
  const link = window.location.origin + '?invite=true';

  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { icon: <Copy className="w-5 h-5" />, label: copied ? 'Copied!' : 'Copy link', onClick: copyLink, done: copied },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'iMessage', onClick: () => toast.info('Opens iMessage on device') },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp', onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent('You\'ve been invited to a Vaxintine! ' + link)}`, '_blank') },
    { icon: <QrCode className="w-5 h-5" />, label: 'QR Code', onClick: () => toast.info('QR code generated!') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-5xl mb-4"
      >
        ✨
      </motion.div>

      <motion.h2
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-display text-3xl md:text-4xl font-semibold mb-2 text-center"
      >
        Ready to send
      </motion.h2>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-body text-muted-foreground mb-10 text-center"
      >
        Choose how to share your Vaxintine
      </motion.p>

      <div className="grid grid-cols-2 gap-3 max-w-sm w-full">
        {shareOptions.map((opt, i) => (
          <motion.button
            key={opt.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={opt.onClick}
            className={`flex flex-col items-center gap-2 p-5 rounded-xl border transition-all cursor-pointer ${
              opt.done
                ? 'bg-primary/10 border-primary/30'
                : 'bg-card border-border hover:border-primary/30 hover:glow-rose-sm'
            }`}
          >
            {opt.done ? <Check className="w-5 h-5 text-primary" /> : opt.icon}
            <span className="font-body text-sm">{opt.label}</span>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onViewRecipient}
        className="mt-8 font-body text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
      >
        Preview what they'll see →
      </motion.button>
    </motion.div>
  );
};

export default ShareStep;
