import { motion } from 'framer-motion';
import { Search, ArrowRightLeft } from 'lucide-react';
import { LocationInput } from './LocationInput';
import { DatePicker } from './DatePicker';
import { PassengerSelector } from './PassengerSelector';
import { ClassSelector } from './ClassSelector';
import { ModeSelector } from './ModeSelector';
import { VoiceInputButton } from './VoiceInputButton';
import { useSearchStore } from '@/store/searchStore';

export function SearchForm() {
  const { params, setParams, setLoading, setHasSearched } = useSearchStore();

  const handleSwapLocations = () => {
    const temp = params.from;
    setParams({ from: params.to, to: temp });
  };

  const handleVoiceTranscript = (transcript: string) => {
    // Simple parsing for voice input
    const lowerTranscript = transcript.toLowerCase();
    
    // Try to extract cities
    const cities = ['mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata', 'pune', 'ahmedabad'];
    const foundCities = cities.filter(city => lowerTranscript.includes(city));
    
    if (foundCities.length >= 2) {
      setParams({ 
        from: foundCities[0].charAt(0).toUpperCase() + foundCities[0].slice(1),
        to: foundCities[1].charAt(0).toUpperCase() + foundCities[1].slice(1)
      });
    }
    
    // Try to extract mode
    if (lowerTranscript.includes('flight') || lowerTranscript.includes('fly')) {
      setParams({ mode: 'flight' });
    } else if (lowerTranscript.includes('train') || lowerTranscript.includes('rail')) {
      setParams({ mode: 'train' });
    } else if (lowerTranscript.includes('bus')) {
      setParams({ mode: 'bus' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.from || !params.to) return;
    
    setLoading(true);
    setHasSearched(true);
  };

  const isValid = params.from && params.to;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="glass-strong rounded-2xl p-6 md:p-8 space-y-6">
        {/* Mode Selector */}
        <ModeSelector 
          value={params.mode} 
          onChange={(mode) => setParams({ mode })} 
        />

        {/* Location Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
          <LocationInput
            label="From"
            value={params.from}
            onChange={(from) => setParams({ from })}
            placeholder="Departure city"
          />
          
          <motion.button
            type="button"
            onClick={handleSwapLocations}
            className="mx-auto w-10 h-10 rounded-full glass flex items-center justify-center text-purple-400 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRightLeft className="w-4 h-4" />
          </motion.button>
          
          <LocationInput
            label="To"
            value={params.to}
            onChange={(to) => setParams({ to })}
            placeholder="Destination city"
          />
        </div>

        {/* Date, Passengers, Class */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DatePicker
            value={params.date}
            onChange={(date) => setParams({ date })}
          />
          <PassengerSelector
            value={params.passengers}
            onChange={(passengers) => setParams({ passengers })}
          />
          <ClassSelector
            value={params.travelClass}
            onChange={(travelClass) => setParams({ travelClass })}
          />
        </div>

        {/* Search Button */}
        <div className="flex items-center gap-4 pt-2">
          <motion.button
            type="submit"
            disabled={!isValid}
            className={`
              flex-1 gradient-button rounded-xl py-4 px-6 flex items-center justify-center gap-3 text-white font-semibold text-lg
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            whileHover={isValid ? { scale: 1.02 } : {}}
            whileTap={isValid ? { scale: 0.98 } : {}}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Search className="w-5 h-5" />
              Find Best Deals
            </span>
          </motion.button>
          
          <VoiceInputButton onTranscript={handleVoiceTranscript} />
        </div>

        {/* Helper Text */}
        {!isValid && (
          <motion.p
            className="text-center text-white/50 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Select departure and destination cities to search
          </motion.p>
        )}
      </div>
    </motion.form>
  );
}
