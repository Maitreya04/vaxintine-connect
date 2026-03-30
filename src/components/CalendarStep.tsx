import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface CalendarStepProps {
  onSelect: (date: Date) => void;
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarStep = ({ onSelect }: CalendarStepProps) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();

  // Get days from next month to fill remaining cells
  const totalCells = firstDay + daysInMonth;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(e.target.value));
    setSelectedDay(null);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setTimeout(() => {
      onSelect(new Date(year, month, day));
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center min-h-screen px-4 md:px-8 py-8 md:py-12"
    >
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="font-script text-[3.5rem] md:text-[6rem] text-primary leading-none mb-6 md:mb-10"
      >
        Pick a Date
      </motion.h2>

      {/* Month selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="self-start mb-4 relative"
      >
        <select
          value={month}
          onChange={handleMonthChange}
          className="appearance-none bg-transparent border border-primary px-4 py-2 pr-10 font-body text-primary cursor-pointer focus:outline-none"
        >
          {MONTH_NAMES.map((name, i) => (
            <option key={name} value={i}>{name}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
      </motion.div>

      {/* Calendar grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-5xl"
      >
        {/* Header row */}
        <div className="grid grid-cols-7 border-t border-l border-primary">
          {DAY_NAMES.map(d => (
            <div
              key={d}
              className="border-r border-b border-primary px-2 md:px-4 py-2 md:py-3 font-body font-semibold text-primary text-sm md:text-base"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 border-l border-primary">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b border-primary aspect-[4/3] md:aspect-[3/2]" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isPast = isCurrentMonth && day < today;
            const isSelected = selectedDay === day;

            return (
              <motion.button
                key={day}
                disabled={isPast}
                onClick={() => handleDayClick(day)}
                whileHover={!isPast ? { backgroundColor: 'hsl(350 72% 46% / 0.06)' } : undefined}
                className={`
                  relative border-r border-b border-primary aspect-[4/3] md:aspect-[3/2] p-2 md:p-3 text-left transition-colors
                  ${isPast ? 'text-muted-foreground/40 cursor-not-allowed' : 'cursor-pointer'}
                  ${isSelected ? 'bg-primary/10' : ''}
                `}
              >
                <span className={`font-body text-sm md:text-base ${isSelected ? 'text-primary font-bold' : ''}`}>
                  {day}
                </span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl"
                  >
                    ❤️
                  </motion.div>
                )}
              </motion.button>
            );
          })}

          {/* Remaining empty cells */}
          {Array.from({ length: remainingCells }).map((_, i) => (
            <div key={`trail-${i}`} className="border-r border-b border-primary aspect-[4/3] md:aspect-[3/2] p-2 md:p-3">
              <span className="font-body text-sm md:text-base text-muted-foreground/30">
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
