import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Armchair, ChevronDown } from 'lucide-react';
import type { TravelClass } from '@/types';
import { TRAVEL_CLASSES } from '@/types';

interface ClassSelectorProps {
  value: TravelClass;
  onChange: (value: TravelClass) => void;
}

export function ClassSelector({ value, onChange }: ClassSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = TRAVEL_CLASSES.find(c => c.value === value)?.label || 'Economy';

  const handleSelect = (travelClass: TravelClass) => {
    onChange(travelClass);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-white/70 mb-2">Class</label>
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass rounded-xl px-4 py-3.5 flex items-center gap-3 text-left transition-all duration-300 hover:bg-white/10"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Armchair className="w-5 h-5 text-purple-400 flex-shrink-0" />
        <span className="flex-1 text-white">{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl overflow-hidden z-50"
          >
            {TRAVEL_CLASSES.map((travelClass, index) => (
              <motion.button
                key={travelClass.value}
                type="button"
                onClick={() => handleSelect(travelClass.value)}
                className={`
                  w-full px-4 py-3 text-left flex items-center gap-3 transition-all
                  ${value === travelClass.value 
                    ? 'bg-purple-500/20 text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }
                `}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${value === travelClass.value ? 'border-purple-400' : 'border-white/30'}
                `}>
                  {value === travelClass.value && (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-purple-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </div>
                {travelClass.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
