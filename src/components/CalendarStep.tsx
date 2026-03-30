import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft, Heart, Clock } from 'lucide-react';

interface CalendarStepProps {
  onSelect: (date: Date, timeStr?: string) => void;
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
  };

  const TIME_SLOTS = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];
  const handleTimeSelect = (timeSlot: string) => {
    if (selectedDay) {
      setTimeout(() => onSelect(new Date(year, month, selectedDay), timeSlot), 300);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-[100dvh] overflow-hidden px-4 md:px-8 pt-4 md:pt-6 pb-6 md:pb-8"
    >
      {/* Top bar: back */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-2 md:mb-6"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-body text-sm text-foreground/80 hover:text-primary transition-colors border border-primary/20 hover:border-primary/40 px-3 py-1.5 md:px-4 md:py-2 rounded-md bg-background shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="font-script text-[2.5rem] md:text-[4.5rem] text-primary leading-none text-center mb-0 md:mb-1"
      >
        Pick a Date
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-body text-muted-foreground text-xs md:text-sm text-center mb-3 md:mb-8"
      >
        choose the perfect day to care
      </motion.p>

      {/* Full-width calendar grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full flex-1 flex flex-col relative min-h-0"
      >
        {/* Sticky Month Selector */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md py-2 md:py-4 flex items-center justify-between border-b border-primary/20 mb-3 md:mb-6 px-1">
          <button onClick={prevMonth} className="p-2 md:p-2.5 rounded-md border border-primary/30 hover:bg-primary/5 transition-all shadow-sm bg-background text-primary flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <h3 className="font-body font-bold text-lg md:text-2xl text-foreground text-center tracking-wide">
            {MONTH_NAMES[month]} {year}
          </h3>
          <button onClick={nextMonth} className="p-2 md:p-2.5 rounded-md border border-primary/30 hover:bg-primary/5 transition-all shadow-sm bg-background text-primary flex items-center justify-center">
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Header row */}
        <div className="grid grid-cols-7 border-t border-l border-primary/30">
          {DAY_NAMES.map(d => (
            <div
              key={d}
              className="border-r border-b border-primary/30 px-1 md:px-4 py-2 md:py-3 font-body font-semibold text-muted-foreground text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-center flex items-center justify-center"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 flex-1 min-h-0 auto-rows-[1fr] border-l border-primary/30 mt-1 md:mt-2">
          {/* Empty cells */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b border-primary/30" />
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
                  relative border-r border-b border-primary/30 p-1 md:p-2 flex flex-col items-center justify-center transition-all
                  ${isPast ? 'text-muted-foreground/30 cursor-not-allowed' : 'cursor-pointer'}
                  ${isSelected ? 'bg-primary/10' : ''}
                `}
              >
                <span className={`
                  font-body text-sm md:text-base relative z-10
                  ${isSelected ? 'text-primary font-bold -translate-y-[2px] md:-translate-y-[3px]' : ''}
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
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <Heart className="w-10 h-10 md:w-12 md:h-12 text-primary fill-primary/15" strokeWidth={1.2} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}

          {/* Trailing empty cells */}
          {Array.from({ length: remainingCells }).map((_, i) => (
            <div key={`trail-${i}`} className="border-r border-b border-primary/30 p-1 md:p-2 flex flex-col items-center justify-center">
              <span className="font-body text-sm md:text-base text-muted-foreground/20">
                {i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Time Selector Widget */}
        <AnimatePresence>
          {selectedDay && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: 10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 10 }}
              className="flex-shrink-0 mt-3 md:mt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-3 md:gap-4 p-4 md:p-5 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm shadow-sm">
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="flex items-center gap-1.5 text-primary text-sm md:text-base font-body font-bold">
                    <Clock className="w-4 h-4 md:w-5 md:h-5" /> Pick a Time
                  </span>
                  <span className="text-muted-foreground text-xs md:text-sm font-body font-medium">
                    {MONTH_NAMES[month]} {selectedDay}, {year}
                  </span>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
                  {TIME_SLOTS.map((time) => (
                    <motion.button
                      key={time}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTimeSelect(time)}
                      className="px-1 py-2 md:px-3 md:py-2.5 text-xs md:text-sm font-body font-semibold border border-primary/30 rounded-lg md:rounded-xl hover:border-primary/60 hover:bg-primary/5 transition-all text-foreground text-center flex items-center justify-center shadow-sm"
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CalendarStep;
