import { motion } from 'framer-motion';
import { Sparkles, TrendingDown, Clock, Lightbulb } from 'lucide-react';
import type { AIInsight } from '@/types';

interface AIInsightsProps {
  insights: AIInsight[];
}

const typeIcons = {
  savings: TrendingDown,
  timing: Clock,
  alternative: Lightbulb,
  trend: TrendingDown,
};

const typeColors = {
  savings: 'from-green-500 to-emerald-500',
  timing: 'from-blue-500 to-cyan-500',
  alternative: 'from-amber-500 to-orange-500',
  trend: 'from-purple-500 to-pink-500',
};

export function AIInsights({ insights }: AIInsightsProps) {
  if (!insights.length) return null;

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
          animate={{
            boxShadow: [
              '0 0 10px rgba(167, 139, 250, 0.2)',
              '0 0 20px rgba(192, 132, 252, 0.4)',
              '0 0 10px rgba(167, 139, 250, 0.2)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-300">AI Insights</span>
        </motion.div>
        <span className="text-white/50 text-sm">Smart recommendations based on price analysis</span>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const Icon = typeIcons[insight.type];
          const gradient = typeColors[insight.type];
          
          return (
            <motion.div
              key={insight.id}
              className="ai-insight rounded-xl p-5 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              {/* Background glow */}
              <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm leading-tight">
                      {insight.title}
                    </h4>
                  </div>
                </div>
                
                <p className="text-white/70 text-sm mb-3 leading-relaxed">
                  {insight.description}
                </p>
                
                {insight.potentialSavings && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/50">Potential savings:</span>
                    <span className={`text-sm font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                      {insight.potentialSavings}%
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
