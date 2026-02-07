import { motion } from 'framer-motion';
import { Plane, Train, Bus } from 'lucide-react';
import type { TravelMode } from '@/types';
import { TRAVEL_MODES } from '@/types';

interface ModeSelectorProps {
  value: TravelMode;
  onChange: (value: TravelMode) => void;
}

const modeIcons: Record<TravelMode, typeof Plane> = {
  flight: Plane,
  train: Train,
  bus: Bus,
};

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-2">Travel Mode</label>
      <div className="grid grid-cols-3 gap-2">
        {TRAVEL_MODES.map((mode, index) => {
          const Icon = modeIcons[mode.value];
          const isActive = value === mode.value;
          
          return (
            <motion.button
              key={mode.value}
              type="button"
              onClick={() => onChange(mode.value)}
              className={`
                relative rounded-xl p-3 flex flex-col items-center gap-2 transition-all duration-300
                ${isActive 
                  ? 'mode-active' 
                  : 'glass hover:bg-white/10'
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${isActive 
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                    : 'bg-white/10'
                  }
                `}
                animate={isActive ? { 
                  boxShadow: [
                    '0 0 10px rgba(167, 139, 250, 0.3)',
                    '0 0 20px rgba(192, 132, 252, 0.5)',
                    '0 0 10px rgba(167, 139, 250, 0.3)'
                  ]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/70'}`} />
              </motion.div>
              <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                {mode.label}
              </span>
              
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-purple-400/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layoutId="mode-border"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
