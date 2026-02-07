import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { SearchForm } from '@/components/search/SearchForm';
import { LoadingState } from '@/components/loading/LoadingState';
import { ResultsList } from '@/components/results/ResultsList';
import { useSearchStore } from '@/store/searchStore';
import { simulateScraping } from '@/lib/mockData';
import { generateAIInsights } from '@/lib/groq';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

function App() {
  const { 
    isLoading, 
    hasSearched, 
    params, 
    setResults, 
    setInsights, 
    setLoading, 
    setLoadingProgress, 
    setLoadingText 
  } = useSearchStore();

  useEffect(() => {
    if (isLoading && hasSearched) {
      const performSearch = async () => {
        try {
          // Simulate scraping with progress updates
          const results = await simulateScraping(
            params.from,
            params.to,
            params.mode,
            params.travelClass,
            (progress, text) => {
              setLoadingProgress(progress);
              setLoadingText(text);
            }
          );

          setResults(results);

          // Generate AI insights
          const insights = await generateAIInsights(params.from, params.to, results);
          setInsights(insights);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      };

      performSearch();
    }
  }, [isLoading, hasSearched, params, setResults, setInsights, setLoading, setLoadingProgress, setLoadingText]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-600/20 blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px]"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FareFinder</span>
            </motion.div>

            <nav className="hidden md:flex items-center gap-6">
              {['Flights', 'Trains', 'Buses', 'Deals'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <motion.button
              className="glass rounded-lg px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </div>
        </motion.header>

        {/* Hero & Search Section */}
        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {!hasSearched ? (
                <motion.div
                  key="search"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero />
                  <SearchForm />
                </motion.div>
              ) : isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoadingState />
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="pt-8"
                >
                  {/* Back Button */}
                  <motion.button
                    onClick={() => {
                      useSearchStore.getState().reset();
                    }}
                    className="mb-6 glass rounded-lg px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                    whileHover={{ x: -4 }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    New Search
                  </motion.button>

                  <ResultsList />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold">FareFinder</span>
              </div>

              <p className="text-white/40 text-sm text-center">
                © 2025 FareFinder. AI-powered travel price comparison.
              </p>

              <div className="flex items-center gap-4">
                {[Github, Twitter, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-white/40 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2, y: -2 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
