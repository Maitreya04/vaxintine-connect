export type Tone = 'romantic' | 'flirty' | 'responsible' | 'dark-humor' | 'public-health';
export type Intent = 'care' | 'see-you' | 'panic' | 'excuse';

export const toneOptions: { id: Tone; label: string; emoji: string; description: string }[] = [
  { id: 'romantic', label: 'Romantic', emoji: '💘', description: 'Heartfelt and sweet' },
  { id: 'flirty', label: 'Flirty', emoji: '😏', description: 'Playful and cheeky' },
  { id: 'responsible', label: 'Responsible', emoji: '🧠', description: 'Thoughtful and mature' },
  { id: 'dark-humor', label: 'Dark Humor', emoji: '💀', description: 'Morbidly funny' },
  { id: 'public-health', label: 'Public Health Nerd', emoji: '🧪', description: 'Data-driven care' },
];

export const intentOptions: { id: Intent; label: string }[] = [
  { id: 'care', label: 'I care about you' },
  { id: 'see-you', label: 'I want to see you' },
  { id: 'panic', label: 'I panic every flu season' },
  { id: 'excuse', label: "This is my excuse to hang out" },
];

export const calendarMicrocopy: Record<number, string> = {
  1: 'fresh start energy',
  3: 'low wait time',
  5: 'high immunity vibes',
  7: 'perfect care day',
  10: 'peak antibody potential',
  12: 'ideal timing',
  14: 'Vaxintine\'s Day',
  15: 'immunity sweet spot',
  18: 'self-care Saturday',
  20: 'cozy shot day',
  22: 'spring immunity prep',
  25: 'protect & serve',
  28: 'last chance vibes',
};

const messages: Record<Tone, Record<Intent, string[]>> = {
  romantic: {
    care: [
      "I want you healthy this season. {date}?",
      "Let me protect you — one tiny needle at a time. {date}.",
      "My love language is preventative care. {date}?",
    ],
    'see-you': [
      "I'd get a shot just to see you. {date}?",
      "The flu shot is just my excuse. I miss you. {date}.",
    ],
    panic: [
      "Every cough terrifies me. Stay well with me? {date}.",
      "I can't lose you to something preventable. {date}?",
    ],
    excuse: [
      "Flu shot + coffee after? {date}.",
      "Let's make immunity romantic. {date}?",
    ],
  },
  flirty: {
    care: [
      "Flu shot + me. You in? {date}.",
      "Let's get pricked together 😏 {date}?",
    ],
    'see-you': [
      "I'll hold your hand if you hold mine. {date}?",
      "Shots are better with company. {date}.",
    ],
    panic: [
      "I'd rather panic with you than alone. {date}?",
      "Mutual immunity > mutual ghosting. {date}.",
    ],
    excuse: [
      "This is definitely just about the flu shot. {date}. 😏",
      "Totally medical reasons only. {date}?",
    ],
  },
  responsible: {
    care: [
      "Preventative care > regret. {date} works.",
      "Your health matters to me. Let's go {date}.",
    ],
    'see-you': [
      "Let's catch up and catch immunity. {date}.",
      "Two birds, one needle. {date}?",
    ],
    panic: [
      "Flu season anxiety is real. Let's handle it {date}.",
      "Preparation beats panic. {date}?",
    ],
    excuse: [
      "Productive hangout alert: flu shots on {date}.",
      "Adulting together on {date}?",
    ],
  },
  'dark-humor': {
    care: [
      "Let's not die of something preventable. {date}?",
      "I like you alive. Get vaccinated with me {date}.",
    ],
    'see-you': [
      "If we're both still alive, let's meet {date}.",
      "Surviving flu season together since {date}.",
    ],
    panic: [
      "The void is calling but so is the pharmacy. {date}.",
      "Death comes for us all, but not from the flu. {date}?",
    ],
    excuse: [
      "Nothing says friendship like shared needles. Medical ones. {date}.",
      "Bonding over minor medical procedures. {date}?",
    ],
  },
  'public-health': {
    care: [
      "Join me in achieving herd immunity. {date}.",
      "Your antibodies + mine = community protection. {date}?",
    ],
    'see-you': [
      "Let's contribute to the R₀ reduction together. {date}.",
      "Epidemiologically sound date idea: {date}?",
    ],
    panic: [
      "The CDC recommends it. I recommend you. {date}.",
      "Statistically, we should both be vaccinated. {date}.",
    ],
    excuse: [
      "According to my research, {date} is optimal for antibody development.",
      "N=2 study on friendship + immunity. {date}?",
    ],
  },
};

export function generateMessage(tone: Tone, intent: Intent, date: string): string {
  const pool = messages[tone][intent];
  const msg = pool[Math.floor(Math.random() * pool.length)];
  return msg.replace('{date}', date);
}

export function getRandomMicrocopy(day: number): string {
  if (calendarMicrocopy[day]) return calendarMicrocopy[day];
  const fallbacks = ['good vibes', 'immunity boost', 'care day', 'shot o\'clock', 'wellness window'];
  return fallbacks[day % fallbacks.length];
}
