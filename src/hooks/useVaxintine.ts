import { useState, useCallback } from 'react';

export type Step = 'landing' | 'calendar' | 'people' | 'send';

const STEP_ORDER: Step[] = ['landing', 'calendar', 'people', 'send'];

export function useVaxintine() {
  const [step, setStep] = useState<Step>('landing');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [time, setTime] = useState('2:00 pm');

  const goTo = useCallback((s: Step) => setStep(s), []);

  const goBack = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) setStep(STEP_ORDER[idx - 1]);
  }, [step]);

  const selectDate = useCallback((d: Date, t?: string) => {
    setSelectedDate(d);
    if (t) setTime(t);
    goTo('people');
  }, [goTo]);

  const addRecipient = useCallback((email: string) => {
    setRecipients(prev => [...prev, email]);
  }, []);

  const removeRecipient = useCallback((email: string) => {
    setRecipients(prev => prev.filter(r => r !== email));
  }, []);

  return {
    step, selectedDate, recipients, time,
    goTo, goBack, selectDate, addRecipient, removeRecipient, setTime,
  };
}
