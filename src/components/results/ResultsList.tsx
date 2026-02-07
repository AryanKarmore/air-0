import { motion } from 'framer-motion';
import { useSearchStore } from '@/store/searchStore';
import { ResultCard } from './ResultCard';
import { AIInsights } from './AIInsights';
import { Sparkles, Filter, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

type SortOption = 'price' | 'duration' | 'departure';

export function ResultsList() {
  const { results, insights, params } = useSearchStore();
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [showFilters, setShowFilters] = useState(false);

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'duration':
        const durationA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split(' ')[1] || '0');
        const durationB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split(' ')[1] || '0');
        return durationA - durationB;
      case 'departure':
        return a.departureTime.localeCompare(b.departureTime);
      default:
        return 0;
    }
  });

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* AI Insights */}
      <AIInsights insights={insights} />

      {/* Results Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Top {results.length} Deals Found
          </h2>
          <p className="text-white/50 text-sm mt-1">
            {params.from} to {params.to} • {params.passengers} passenger{params.passengers > 1 ? 's' : ''} • {params.travelClass}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="glass rounded-lg px-4 py-2 flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="text-sm">Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
            </motion.button>

            {showFilters && (
              <motion.div
                className="absolute top-full right-0 mt-2 glass-strong rounded-lg overflow-hidden z-20 min-w-[150px]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {(['price', 'duration', 'departure'] as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setShowFilters(false);
                    }}
                    className={`
                      w-full px-4 py-2.5 text-left text-sm transition-colors
                      ${sortBy === option ? 'bg-purple-500/20 text-white' : 'text-white/70 hover:bg-white/10'}
                    `}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Filter Button */}
          <motion.button
            className="glass rounded-lg px-4 py-2 flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Results Grid */}
      <div className="space-y-4">
        {sortedResults.map((result, index) => (
          <ResultCard key={result.id} result={result} index={index} />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/40 text-sm">
          Prices are inclusive of all taxes and fees. Actual prices may vary at checkout.
        </p>
      </motion.div>
    </motion.div>
  );
}
