import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heartsImg from '@/assets/hearts-motif.png';

interface CalendarStepProps {
  onSelect: (date: Date) => void;
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const CalendarStep = ({ onSelect }: CalendarStepProps) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setTimeout(() => onSelect(new Date(year, month, day)), 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8"
    >
      {/* Title */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-script text-[3rem] md:text-[5rem] text-primary leading-none mb-2"
      >
        Pick a Date
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-body text-muted-foreground text-sm mb-8"
      >
        choose the perfect day to care
      </motion.p>

      {/* Calendar card */}
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
        className="w-full max-w-sm bg-card/60 backdrop-blur-sm rounded-3xl border border-primary/20 shadow-xl p-6 relative overflow-hidden"
      >
        {/* Decorative hearts in corner */}
        <img src={heartsImg} alt="" aria-hidden className="absolute -top-4 -right-6 w-24 opacity-15 rotate-12 pointer-events-none" />

        {/* Month navigation */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-primary/10 transition-colors">
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <h3 className="font-body font-semibold text-lg text-foreground tracking-wide">
            {MONTH_NAMES[month]} {year}
          </h3>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-primary/10 transition-colors">
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_NAMES.map((d, i) => (
            <div key={i} className="text-center font-body text-xs font-semibold text-muted-foreground py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`e-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isPast = isCurrentMonth && day < today;
            const isSelected = selectedDay === day;
            const isToday = isCurrentMonth && day === today;

            return (
              <motion.button
                key={day}
                disabled={isPast}
                onClick={() => handleDayClick(day)}
                whileHover={!isPast ? { scale: 1.15 } : undefined}
                whileTap={!isPast ? { scale: 0.9 } : undefined}
                className={`
                  aspect-square rounded-full flex items-center justify-center font-body text-sm transition-all relative
                  ${isPast ? 'text-muted-foreground/30 cursor-not-allowed' : 'cursor-pointer hover:bg-primary/10'}
                  ${isSelected ? 'bg-primary text-primary-foreground font-bold shadow-lg' : ''}
                  ${isToday && !isSelected ? 'ring-2 ring-primary/40 font-semibold' : ''}
                `}
              >
                {day}
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 text-xs"
                  >
                    ♥
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalendarStep;
