import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isBefore, startOfToday } from 'date-fns';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = startOfToday();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleSelect = (date: Date) => {
    if (!isBefore(date, today)) {
      onChange(date);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-white/70 mb-2">Travel Date</label>
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass rounded-xl px-4 py-3.5 flex items-center gap-3 text-left transition-all duration-300 hover:bg-white/10"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <CalendarIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
        <span className="flex-1 text-white">
          {format(value, 'EEE, dd MMM yyyy')}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 glass-strong rounded-xl overflow-hidden z-50 p-4 w-72"
          >
            <div className="flex items-center justify-between mb-4">
              <motion.button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <span className="text-white font-medium">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <motion.button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs text-white/50 py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const isSelected = isSameDay(day, value);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isPast = isBefore(day, today);
                
                return (
                  <motion.button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => handleSelect(day)}
                    disabled={isPast}
                    className={`
                      aspect-square rounded-lg text-sm font-medium transition-all
                      ${isSelected 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
                        : isPast
                          ? 'text-white/20 cursor-not-allowed'
                          : isCurrentMonth
                            ? 'text-white hover:bg-white/10'
                            : 'text-white/30'
                      }
                    `}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.005 }}
                    whileHover={!isPast ? { scale: 1.1 } : {}}
                    whileTap={!isPast ? { scale: 0.95 } : {}}
                  >
                    {format(day, 'd')}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
