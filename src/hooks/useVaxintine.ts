import { useState, useCallback } from 'react';
import { Tone, Intent, generateMessage } from '@/lib/vaxintine-data';
import { format } from 'date-fns';

export type Step = 'landing' | 'tone' | 'calendar' | 'message' | 'intent' | 'preview' | 'share' | 'recipient';

export function useVaxintine() {
  const [step, setStep] = useState<Step>('landing');
  const [tone, setTone] = useState<Tone | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [message, setMessage] = useState('');
  const [intent, setIntent] = useState<Intent | null>(null);

  const goTo = useCallback((s: Step) => setStep(s), []);

  const selectTone = useCallback((t: Tone) => {
    setTone(t);
    goTo('calendar');
  }, [goTo]);

  const selectDate = useCallback((d: Date) => {
    setSelectedDate(d);
    goTo('message');
  }, [goTo]);

  const regenerateMessage = useCallback(() => {
    if (tone && selectedDate) {
      const dateStr = format(selectedDate, 'MMMM d');
      setMessage(generateMessage(tone, intent || 'care', dateStr));
    }
  }, [tone, selectedDate, intent]);

  const selectIntent = useCallback((i: Intent) => {
    setIntent(i);
    if (tone && selectedDate) {
      const dateStr = format(selectedDate, 'MMMM d');
      setMessage(generateMessage(tone, i, dateStr));
    }
    goTo('preview');
  }, [tone, selectedDate, goTo]);

  return {
    step, tone, selectedDate, message, intent,
    goTo, selectTone, selectDate, regenerateMessage, selectIntent,
    setMessage,
  };
}
