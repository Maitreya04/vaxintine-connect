import { AnimatePresence } from 'framer-motion';
import { useVaxintine } from '@/hooks/useVaxintine';
import LandingStep from '@/components/LandingStep';
import CalendarStep from '@/components/CalendarStep';
import PeopleStep from '@/components/PeopleStep';
import SentStep from '@/components/SentStep';
import FloatingHearts from '@/components/FloatingHearts';

const Index = () => {
  const {
    step, selectedDate, recipients, time,
    goTo, selectDate, addRecipient, removeRecipient, setTime,
  } = useVaxintine();

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingHearts />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <LandingStep key="landing" onStart={() => goTo('calendar')} />
          )}
          {step === 'calendar' && (
            <CalendarStep key="calendar" onSelect={selectDate} />
          )}
          {step === 'people' && selectedDate && (
            <PeopleStep
              key="people"
              date={selectedDate}
              time={time}
              recipients={recipients}
              onAddRecipient={addRecipient}
              onRemoveRecipient={removeRecipient}
              onTimeChange={setTime}
              onSend={() => goTo('send')}
            />
          )}
          {step === 'send' && (
            <SentStep key="send" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
