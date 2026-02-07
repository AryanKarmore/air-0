import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceInput } from '@/hooks/useVoiceInput';

interface VoiceInputButtonProps {
  onTranscript: (transcript: string) => void;
}

export function VoiceInputButton({ onTranscript }: VoiceInputButtonProps) {
  const { isListening, transcript, startListening, stopListening, isSupported } = useVoiceInput();

  const handleClick = () => {
    if (isListening) {
      stopListening();
      if (transcript) {
        onTranscript(transcript);
      }
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={`
        relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
        ${isListening 
          ? 'bg-red-500/20 text-red-400 animate-pulse' 
          : 'glass text-purple-400 hover:bg-white/10'
        }
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isListening ? 'Stop listening' : 'Voice input'}
    >
      <AnimatePresence mode="wait">
        {isListening ? (
          <motion.div
            key="listening"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <MicOff className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="not-listening"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Mic className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple effect when listening */}
      {isListening && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full bg-red-500/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-red-500/10"
            animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
        </>
      )}

      {/* Glow effect */}
      {!isListening && (
        <motion.span
          className="absolute inset-0 rounded-full bg-purple-500/20"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
