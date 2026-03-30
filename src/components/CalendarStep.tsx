import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft, Heart } from 'lucide-react';

interface CalendarStepProps {
  onSelect: (date: Date) => void;
  onBack: () => void;
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarStep = ({ onSelect, onBack }: CalendarStepProps) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();

  const totalCells = firstDay + daysInMonth;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

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
    setTimeout(() => onSelect(new Date(year, month, day)), 350);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen px-4 md:px-8 py-6 md:py-10"
    >
      {/* Top bar: back + month nav */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-6"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-4">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-primary/10 transition-colors">
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <h3 className="font-body font-semibold text-base md:text-lg text-foreground min-w-[160px] text-center">
            {MONTH_NAMES[month]} {year}
          </h3>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-primary/10 transition-colors">
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>

        <div className="w-14" /> {/* spacer for balance */}
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="font-script text-[2.5rem] md:text-[4.5rem] text-primary leading-none text-center mb-1"
      >
        Pick a Date
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-body text-muted-foreground text-sm text-center mb-6"
      >
        choose the perfect day to care
      </motion.p>

      {/* Full-width calendar grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full flex-1"
      >
        {/* Header row */}
        <div className="grid grid-cols-7 border-t border-l border-primary/30">
          {DAY_NAMES.map(d => (
            <div
              key={d}
              className="border-r border-b border-primary/30 px-2 md:px-4 py-2 md:py-3 font-body font-semibold text-muted-foreground text-xs md:text-sm uppercase tracking-wider"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 border-l border-primary/30">
          {/* Empty cells */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b border-primary/30 aspect-[4/3] md:aspect-[3/2]" />
          ))}

          {/* Days */}
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
                whileHover={!isPast ? { backgroundColor: 'hsl(350 72% 46% / 0.04)' } : undefined}
                className={`
                  relative border-r border-b border-primary/30 aspect-[4/3] md:aspect-[3/2] p-2 md:p-3 text-left transition-all
                  ${isPast ? 'text-muted-foreground/30 cursor-not-allowed' : 'cursor-pointer'}
                  ${isSelected ? 'bg-primary/10' : ''}
                `}
              >
                <span className={`
                  font-body text-sm md:text-base
                  ${isSelected ? 'text-primary font-bold' : ''}
                  ${isToday && !isSelected ? 'font-semibold text-primary' : ''}
                `}>
                  {day}
                </span>
                {isToday && !isSelected && (
                  <span className="absolute top-1 right-1 md:top-2 md:right-2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary fill-primary/20" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}

          {/* Trailing empty cells */}
          {Array.from({ length: remainingCells }).map((_, i) => (
            <div key={`trail-${i}`} className="border-r border-b border-primary/30 aspect-[4/3] md:aspect-[3/2] p-2 md:p-3">
              <span className="font-body text-sm md:text-base text-muted-foreground/20">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalendarStep;
