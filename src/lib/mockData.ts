import type { TravelResult, TravelMode } from '@/types';

const OPERATORS: Record<TravelMode, { name: string; logo: string; platforms: string[] }[]> = {
  flight: [
    { name: 'IndiGo', logo: 'https://logo.clearbit.com/goindigo.in', platforms: ['MakeMyTrip', 'Ixigo', 'Goibibo'] },
    { name: 'Air India', logo: 'https://logo.clearbit.com/airindia.com', platforms: ['MakeMyTrip', 'Ixigo', 'Goibibo'] },
    { name: 'Vistara', logo: 'https://logo.clearbit.com/airvistara.com', platforms: ['MakeMyTrip', 'Goibibo'] },
    { name: 'SpiceJet', logo: 'https://logo.clearbit.com/spicejet.com', platforms: ['Ixigo', 'Goibibo'] },
    { name: 'Akasa Air', logo: 'https://logo.clearbit.com/akasaair.com', platforms: ['MakeMyTrip', 'Ixigo'] },
    { name: 'AirAsia India', logo: 'https://logo.clearbit.com/airasia.com', platforms: ['Goibibo', 'Ixigo'] },
  ],
  train: [
    { name: 'IRCTC', logo: 'https://logo.clearbit.com/irctc.co.in', platforms: ['IRCTC', 'MakeMyTrip', 'Ixigo'] },
    { name: 'Rajdhani Express', logo: 'https://logo.clearbit.com/irctc.co.in', platforms: ['IRCTC', 'MakeMyTrip'] },
    { name: 'Shatabdi Express', logo: 'https://logo.clearbit.com/irctc.co.in', platforms: ['IRCTC', 'Ixigo'] },
    { name: 'Vande Bharat', logo: 'https://logo.clearbit.com/irctc.co.in', platforms: ['IRCTC', 'MakeMyTrip', 'Goibibo'] },
    { name: 'Duronto Express', logo: 'https://logo.clearbit.com/irctc.co.in', platforms: ['IRCTC'] },
  ],
  bus: [
    { name: 'Volvo', logo: 'https://logo.clearbit.com/volvo.com', platforms: ['RedBus', 'MakeMyTrip', 'Goibibo'] },
    { name: 'SRS Travels', logo: 'https://logo.clearbit.com/srstravels.com', platforms: ['RedBus', 'Ixigo'] },
    { name: 'VRL Travels', logo: 'https://logo.clearbit.com/vrlgroup.com', platforms: ['RedBus', 'MakeMyTrip'] },
    { name: 'Orange Travels', logo: 'https://logo.clearbit.com/orangetravels.in', platforms: ['RedBus', 'Goibibo'] },
    { name: 'KSRTC', logo: 'https://logo.clearbit.com/ksrtc.in', platforms: ['RedBus', 'Ixigo'] },
    { name: 'MSRTC', logo: 'https://logo.clearbit.com/msrtc.in', platforms: ['RedBus'] },
  ],
};

const PLATFORM_URLS: Record<string, (params: { from: string; to: string; date: string }) => string> = {
  MakeMyTrip: (p) => `https://www.makemytrip.com/flights/${p.from}-${p.to}-cheap-airtickets.html`,
  Ixigo: (p) => `https://www.ixigo.com/search/result/flight/${p.from}/${p.to}/${p.date}`,
  Goibibo: (p) => `https://www.goibibo.com/flights/${p.from}-${p.to}-${p.date}/`,
  RedBus: (p) => `https://www.redbus.in/search?from=${p.from}&to=${p.to}&date=${p.date}`,
  IRCTC: (p) => `https://www.irctc.co.in/nget/train-search?from=${p.from}&to=${p.to}&date=${p.date}`,
};

function generateRandomTime(): string {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function addDuration(startTime: string, durationHours: number): string {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + durationHours * 60 + Math.floor(Math.random() * 60);
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;
  return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
}

function generateDuration(mode: TravelMode): string {
  if (mode === 'flight') {
    const hours = Math.floor(Math.random() * 3) + 1;
    const mins = Math.floor(Math.random() * 60);
    return `${hours}h ${mins}m`;
  } else if (mode === 'train') {
    const hours = Math.floor(Math.random() * 12) + 4;
    const mins = Math.floor(Math.random() * 60);
    return `${hours}h ${mins}m`;
  } else {
    const hours = Math.floor(Math.random() * 8) + 4;
    const mins = Math.floor(Math.random() * 60);
    return `${hours}h ${mins}m`;
  }
}

function parseDuration(duration: string): number {
  const match = duration.match(/(\d+)h\s*(\d+)?m?/);
  if (match) {
    const hours = parseInt(match[1]) || 0;
    const mins = parseInt(match[2]) || 0;
    return hours * 60 + mins;
  }
  return 0;
}

function generatePrice(mode: TravelMode, travelClass: string): { price: number; originalPrice: number } {
  let basePrice = 0;
  
  if (mode === 'flight') {
    switch (travelClass) {
      case 'economy': basePrice = 3500 + Math.random() * 4000; break;
      case 'premium': basePrice = 8000 + Math.random() * 5000; break;
      case 'business': basePrice = 20000 + Math.random() * 15000; break;
      case 'first': basePrice = 50000 + Math.random() * 30000; break;
      default: basePrice = 3500 + Math.random() * 4000;
    }
  } else if (mode === 'train') {
    switch (travelClass) {
      case 'economy': basePrice = 500 + Math.random() * 1000; break;
      case 'premium': basePrice = 1500 + Math.random() * 1500; break;
      case 'business': basePrice = 3000 + Math.random() * 2000; break;
      case 'first': basePrice = 5000 + Math.random() * 3000; break;
      default: basePrice = 500 + Math.random() * 1000;
    }
  } else {
    switch (travelClass) {
      case 'economy': basePrice = 800 + Math.random() * 700; break;
      case 'premium': basePrice = 1500 + Math.random() * 1000; break;
      case 'business': basePrice = 2500 + Math.random() * 1500; break;
      case 'first': basePrice = 4000 + Math.random() * 2000; break;
      default: basePrice = 800 + Math.random() * 700;
    }
  }
  
  const price = Math.round(basePrice);
  const originalPrice = Math.round(basePrice * (1.1 + Math.random() * 0.3));
  
  return { price, originalPrice };
}

export function generateMockResults(
  from: string,
  to: string,
  mode: TravelMode,
  travelClass: string,
  count: number = 10
): TravelResult[] {
  const operators = OPERATORS[mode];
  const results: TravelResult[] = [];
  
  for (let i = 0; i < count; i++) {
    const operatorInfo = operators[Math.floor(Math.random() * operators.length)];
    const platform = operatorInfo.platforms[Math.floor(Math.random() * operatorInfo.platforms.length)];
    const departureTime = generateRandomTime();
    const duration = generateDuration(mode);
    const arrivalTime = addDuration(departureTime, parseDuration(duration) / 60);
    const { price, originalPrice } = generatePrice(mode, travelClass);
    
    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    
    results.push({
      id: `result-${i}`,
      operator: operatorInfo.name,
      operatorLogo: operatorInfo.logo,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      price,
      originalPrice,
      savings: originalPrice - price,
      mode,
      class: travelClass,
      platform,
      bookingUrl: PLATFORM_URLS[platform]?.({ from, to, date: dateStr }) || '#',
    });
  }
  
  // Sort by price
  results.sort((a, b) => a.price - b.price);
  
  // Add badges
  if (results.length > 0) {
    results[0].badge = 'lowest';
    
    // Find fastest
    const fastest = [...results].sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration))[0];
    if (fastest && fastest.id !== results[0].id) {
      const fastestIndex = results.findIndex(r => r.id === fastest.id);
      if (fastestIndex >= 0) results[fastestIndex].badge = 'fastest';
    }
    
    // Find best value (good balance of price and duration)
    const valueScores = results.map(r => ({
      id: r.id,
      score: (r.price / Math.max(...results.map(x => x.price))) + 
             (parseDuration(r.duration) / Math.max(...results.map(x => parseDuration(x.duration)))),
    }));
    valueScores.sort((a, b) => a.score - b.score);
    const bestValue = valueScores.find(v => v.id !== results[0].id && v.id !== fastest.id);
    if (bestValue) {
      const valueIndex = results.findIndex(r => r.id === bestValue.id);
      if (valueIndex >= 0) results[valueIndex].badge = 'value';
    }
  }
  
  return results;
}

// Simulate scraping delay
export async function simulateScraping(
  from: string,
  to: string,
  mode: TravelMode,
  travelClass: string,
  onProgress?: (progress: number, text: string) => void
): Promise<TravelResult[]> {
  const steps = [
    { progress: 10, text: 'Connecting to travel platforms...', delay: 300 },
    { progress: 25, text: 'Scanning MakeMyTrip...', delay: 400 },
    { progress: 40, text: 'Checking Ixigo deals...', delay: 400 },
    { progress: 55, text: 'Fetching Goibibo prices...', delay: 400 },
    { progress: 70, text: 'Comparing RedBus options...', delay: 300 },
    { progress: 85, text: 'Analyzing price trends...', delay: 300 },
    { progress: 95, text: 'Finding best deals...', delay: 200 },
    { progress: 100, text: 'Ready!', delay: 100 },
  ];
  
  for (const step of steps) {
    await new Promise(resolve => setTimeout(resolve, step.delay));
    onProgress?.(step.progress, step.text);
  }
  
  return generateMockResults(from, to, mode, travelClass, 10);
}
