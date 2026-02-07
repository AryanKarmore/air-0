import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { CITIES } from '@/types';

interface LocationInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function LocationInput({ label, value, onChange, placeholder }: LocationInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCities = CITIES.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 8);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: string) => {
    onChange(city);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-white/70 mb-2">{label}</label>
      <motion.button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
          }
        }}
        className="w-full glass rounded-xl px-4 py-3.5 flex items-center gap-3 text-left transition-all duration-300 hover:bg-white/10"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
        <span className={`flex-1 ${value ? 'text-white' : 'text-white/50'}`}>
          {value || placeholder || 'Select city'}
        </span>
        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl overflow-hidden z-50 max-h-72"
          >
            <div className="p-3">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cities..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="max-h-48 overflow-y-auto scrollbar-hide">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <motion.button
                    key={city}
                    type="button"
                    onClick={() => handleSelect(city)}
                    className="w-full px-4 py-2.5 text-left text-white/80 hover:bg-white/10 flex items-center gap-3 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <MapPin className="w-4 h-4 text-purple-400/60" />
                    {city}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-3 text-white/50 text-sm">No cities found</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
