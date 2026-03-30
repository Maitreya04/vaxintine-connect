import { useState, useCallback } from 'react';

export type Step = 'landing' | 'calendar' | 'people' | 'send';

export function useVaxintine() {
  const [step, setStep] = useState<Step>('landing');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [time, setTime] = useState('2:00 pm');

  const goTo = useCallback((s: Step) => setStep(s), []);

  const selectDate = useCallback((d: Date) => {
    setSelectedDate(d);
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
    goTo, selectDate, addRecipient, removeRecipient, setTime,
  };
}
