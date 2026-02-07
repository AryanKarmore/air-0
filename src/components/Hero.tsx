import { motion } from 'framer-motion';
import { Plane, Sparkles, Zap, Shield } from 'lucide-react';

export function Hero() {
  return (
    <motion.div
      className="text-center py-12 md:py-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow">
          <Plane className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="gradient-text">Fare</span>
          <span className="text-white">Finder</span>
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="text-xl md:text-2xl text-white/80 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        AI-Powered Travel Price Comparison
      </motion.p>

      <motion.p
        className="text-white/50 max-w-lg mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Let our AI agent hunt for the best deals across MakeMyTrip, Ixigo, Goibibo, and more. Save up to 40% on your next journey.
      </motion.p>

      {/* Features */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 md:gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { icon: Sparkles, label: 'AI Powered' },
          { icon: Zap, label: 'Real-time Prices' },
          { icon: Shield, label: 'Best Deals' },
        ].map((feature, index) => (
          <motion.div
            key={feature.label}
            className="flex items-center gap-2 text-white/60"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <feature.icon className="w-4 h-4 text-purple-400" />
            <span className="text-sm">{feature.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
