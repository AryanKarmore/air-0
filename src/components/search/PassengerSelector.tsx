import { motion } from 'framer-motion';
import { Users, Minus, Plus } from 'lucide-react';

interface PassengerSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function PassengerSelector({ value, onChange, min = 1, max = 9 }: PassengerSelectorProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-2">Passengers</label>
      <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
        <Users className="w-5 h-5 text-purple-400 flex-shrink-0" />
        <div className="flex-1 flex items-center justify-between">
          <motion.button
            type="button"
            onClick={handleDecrease}
            disabled={value <= min}
            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            whileHover={value > min ? { scale: 1.1 } : {}}
            whileTap={value > min ? { scale: 0.9 } : {}}
          >
            <Minus className="w-4 h-4" />
          </motion.button>
          
          <span className="text-white font-medium min-w-[2rem] text-center">
            {value}
          </span>
          
          <motion.button
            type="button"
            onClick={handleIncrease}
            disabled={value >= max}
            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            whileHover={value < max ? { scale: 1.1 } : {}}
            whileTap={value < max ? { scale: 0.9 } : {}}
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
