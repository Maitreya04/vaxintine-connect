import { AnimatePresence } from 'framer-motion';
import { useVaxintine } from '@/hooks/useVaxintine';
import LandingStep from '@/components/LandingStep';
import ToneStep from '@/components/ToneStep';
import CalendarStep from '@/components/CalendarStep';
import MessageStep from '@/components/MessageStep';
import IntentStep from '@/components/IntentStep';
import PreviewStep from '@/components/PreviewStep';
import ShareStep from '@/components/ShareStep';
import RecipientStep from '@/components/RecipientStep';

const Index = () => {
  const {
    step, tone, selectedDate, message, intent,
    goTo, selectTone, selectDate, regenerateMessage, selectIntent,
    setMessage,
  } = useVaxintine();

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <LandingStep key="landing" onStart={() => goTo('tone')} />
        )}
        {step === 'tone' && (
          <ToneStep key="tone" onSelect={selectTone} />
        )}
        {step === 'calendar' && (
          <CalendarStep key="calendar" onSelect={selectDate} />
        )}
        {step === 'message' && tone && selectedDate && (
          <MessageStep
            key="message"
            tone={tone}
            date={selectedDate}
            message={message}
            onMessageChange={setMessage}
            onRegenerate={regenerateMessage}
            onNext={() => goTo('intent')}
          />
        )}
        {step === 'intent' && (
          <IntentStep key="intent" onSelect={selectIntent} />
        )}
        {step === 'preview' && selectedDate && (
          <PreviewStep
            key="preview"
            message={message}
            date={selectedDate}
            onShare={() => goTo('share')}
          />
        )}
        {step === 'share' && (
          <ShareStep key="share" onViewRecipient={() => goTo('recipient')} />
        )}
        {step === 'recipient' && selectedDate && tone && (
          <RecipientStep
            key="recipient"
            message={message}
            date={selectedDate}
            tone={tone}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
