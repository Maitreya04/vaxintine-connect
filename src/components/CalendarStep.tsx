import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomMicrocopy } from '@/lib/vaxintine-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarStepProps {
  onSelect: (date: Date) => void;
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarStep = ({ onSelect }: CalendarStepProps) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      <motion.h2
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-display text-3xl md:text-4xl font-semibold mb-2"
      >
        Pick your day
      </motion.h2>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="font-body text-muted-foreground mb-8"
      >
        When should the caring happen?
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm bg-card rounded-2xl border border-border p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <span className="font-display text-lg font-medium">
            {MONTH_NAMES[month]} {year}
          </span>
          <button onClick={nextMonth} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_NAMES.map(d => (
            <div key={d} className="text-center text-xs font-body text-muted-foreground py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 relative">
          {cells.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />;
            const isPast = isCurrentMonth && day < today;
            return (
              <motion.button
                key={day}
                disabled={isPast}
                whileHover={!isPast ? { scale: 1.15 } : undefined}
                whileTap={!isPast ? { scale: 0.9 } : undefined}
                onMouseEnter={() => !isPast && setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                onClick={() => onSelect(new Date(year, month, day))}
                className={`
                  relative aspect-square flex items-center justify-center rounded-lg font-body text-sm transition-all
                  ${isPast ? 'text-muted-foreground/40 cursor-not-allowed' : 'cursor-pointer hover:bg-primary/10 hover:glow-rose-sm'}
                  ${day === 14 ? 'text-primary font-semibold' : ''}
                `}
              >
                {day}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {hoveredDay && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="mt-4 text-center font-body text-sm text-primary italic"
            >
              ✨ {getRandomMicrocopy(hoveredDay)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CalendarStep;
