import { motion } from 'framer-motion';
import { useSearchStore } from '@/store/searchStore';
import { Plane, Train, Bus, Sparkles } from 'lucide-react';

const modeIcons = {
  flight: Plane,
  train: Train,
  bus: Bus,
};

export function LoadingState() {
  const { params, loadingProgress, loadingText } = useSearchStore();
  const ModeIcon = modeIcons[params.mode];

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass-strong rounded-2xl p-8 md:p-12 text-center space-y-8">
        {/* Animated Icon */}
        <div className="relative flex justify-center">
          <motion.div
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ModeIcon className="w-12 h-12 text-white" />
          </motion.div>
          
          {/* Orbiting dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-purple-400"
              animate={{
                x: [0, 60 * Math.cos((i * 120 * Math.PI) / 180), 0],
                y: [0, 60 * Math.sin((i * 120 * Math.PI) / 180), 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'linear',
              }}
              style={{
                left: '50%',
                top: '50%',
                marginLeft: -6,
                marginTop: -6,
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <motion.h3
            className="text-2xl font-bold text-white"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AI Agent is Hunting for Deals
          </motion.h3>
          <p className="text-white/60 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Scanning multiple platforms simultaneously
            <Sparkles className="w-4 h-4 text-purple-400" />
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full progress-bar rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">{loadingProgress}%</span>
            <span className="text-purple-400 font-medium">{loadingText}</span>
          </div>
        </div>

        {/* Platform Indicators */}
        <div className="flex justify-center gap-4">
          {['MakeMyTrip', 'Ixigo', 'Goibibo', 'RedBus'].map((platform, index) => (
            <motion.div
              key={platform}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold
                  ${loadingProgress > (index + 1) * 20 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-white/10 text-white/40'
                  }
                `}
                animate={loadingProgress > (index + 1) * 20 ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 0.3 }}
              >
                {platform[0]}
              </motion.div>
              <span className="text-xs text-white/50">{platform}</span>
            </motion.div>
          ))}
        </div>

        {/* Fun Facts */}
        <motion.div
          className="glass rounded-xl p-4 text-sm text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-purple-400 font-medium">Did you know?</span>{' '}
          Booking 2-3 weeks in advance can save you up to 30% on average!
        </motion.div>
      </div>
    </motion.div>
  );
}
