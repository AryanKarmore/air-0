import { create } from 'zustand';
import type { SearchParams, TravelResult, AIInsight } from '@/types';

interface SearchState {
  params: SearchParams;
  results: TravelResult[];
  insights: AIInsight[];
  isLoading: boolean;
  loadingProgress: number;
  loadingText: string;
  error: string | null;
  hasSearched: boolean;
  
  // Actions
  setParams: (params: Partial<SearchParams>) => void;
  setResults: (results: TravelResult[]) => void;
  setInsights: (insights: AIInsight[]) => void;
  setLoading: (isLoading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setLoadingText: (text: string) => void;
  setError: (error: string | null) => void;
  setHasSearched: (hasSearched: boolean) => void;
  reset: () => void;
}

const initialParams: SearchParams = {
  from: '',
  to: '',
  date: new Date(),
  passengers: 1,
  travelClass: 'economy',
  mode: 'flight',
};

export const useSearchStore = create<SearchState>((set) => ({
  params: initialParams,
  results: [],
  insights: [],
  isLoading: false,
  loadingProgress: 0,
  loadingText: '',
  error: null,
  hasSearched: false,

  setParams: (newParams) =>
    set((state) => ({
      params: { ...state.params, ...newParams },
    })),

  setResults: (results) => set({ results }),
  
  setInsights: (insights) => set({ insights }),

  setLoading: (isLoading) => set({ isLoading }),

  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),

  setLoadingText: (loadingText) => set({ loadingText }),

  setError: (error) => set({ error }),

  setHasSearched: (hasSearched) => set({ hasSearched }),

  reset: () =>
    set({
      params: initialParams,
      results: [],
      insights: [],
      isLoading: false,
      loadingProgress: 0,
      loadingText: '',
      error: null,
      hasSearched: false,
    }),
}));
