import { motion } from 'framer-motion';
import { ExternalLink, Clock } from 'lucide-react';
import type { TravelResult } from '@/types';
import { Plane, Train, Bus } from 'lucide-react';

interface ResultCardProps {
  result: TravelResult;
  index: number;
}

const modeIcons = {
  flight: Plane,
  train: Train,
  bus: Bus,
};

const badgeStyles = {
  lowest: 'badge-lowest',
  fastest: 'badge-fastest',
  value: 'badge-value',
};

const badgeLabels = {
  lowest: 'Lowest Price',
  fastest: 'Fastest',
  value: 'Best Value',
};

export function ResultCard({ result, index }: ResultCardProps) {
  const ModeIcon = modeIcons[result.mode];
  
  const handleBook = () => {
    window.open(result.bookingUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="result-card glass rounded-xl overflow-hidden relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      {/* Badge */}
      {result.badge && (
        <motion.div
          className={`absolute top-0 left-0 ${badgeStyles[result.badge]} text-white text-xs font-bold px-3 py-1.5 rounded-br-lg z-10`}
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ delay: index * 0.08 + 0.2 }}
        >
          {badgeLabels[result.badge]}
        </motion.div>
      )}

      <div className="p-5">
        {/* Header: Operator & Platform */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
              <img
                src={result.operatorLogo}
                alt={result.operator}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement?.querySelector('.fallback')?.classList.remove('hidden');
                }}
              />
              <ModeIcon className="w-6 h-6 text-purple-400 fallback hidden" />
            </div>
            <div>
              <h3 className="text-white font-semibold">{result.operator}</h3>
              <p className="text-white/50 text-xs">via {result.platform}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-white/40 text-xs uppercase tracking-wider">{result.class}</span>
          </div>
        </div>

        {/* Route Timeline */}
        <div className="flex items-center gap-4 mb-5">
          <div className="text-center">
            <p className="text-xl font-bold text-white">{result.departureTime}</p>
            <p className="text-white/50 text-sm">{result.from.slice(0, 3).toUpperCase()}</p>
          </div>
          
          <div className="flex-1 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/20" />
            <div className="flex flex-col items-center">
              <Clock className="w-4 h-4 text-white/40" />
              <span className="text-white/50 text-xs">{result.duration}</span>
            </div>
            <div className="h-px flex-1 bg-white/20" />
          </div>
          
          <div className="text-center">
            <p className="text-xl font-bold text-white">{result.arrivalTime}</p>
            <p className="text-white/50 text-sm">{result.to.slice(0, 3).toUpperCase()}</p>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between pt-4 border-t border-white/10">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold gradient-text">
                ₹{result.price.toLocaleString()}
              </span>
              <span className="text-white/40 line-through text-sm">
                ₹{result.originalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-green-400 text-sm mt-1">
              Save ₹{result.savings.toLocaleString()}
            </p>
          </div>
          
          <motion.button
            onClick={handleBook}
            className="gradient-button rounded-lg px-6 py-3 text-white font-semibold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Now
              <ExternalLink className="w-4 h-4" />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
