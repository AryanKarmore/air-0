# FareFinder - AI Travel Price Comparison Platform

FareFinder is an AI-powered travel price comparison platform that feels like an agentic system working for the user. It searches across multiple travel platforms to find the best deals on flights, trains, and buses.

![FareFinder](https://img.shields.io/badge/FareFinder-AI%20Powered-purple)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## Features

- **AI-Powered Search**: Intelligent price comparison across multiple platforms
- **Multi-Mode Travel**: Search for flights, trains, and buses
- **Real-time Price Comparison**: Compares prices from MakeMyTrip, Ixigo, Goibibo, RedBus, and more
- **AI Insights**: Smart recommendations for savings, timing, and alternatives using Groq AI
- **Voice Input**: Search using voice commands with Web Speech API
- **Glassmorphism UI**: Premium, modern interface with smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **State Management**: Zustand
- **AI Integration**: Groq API (Llama 3.3 70B)
- **Caching**: Upstash Redis
- **Voice Recognition**: Web Speech API

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/farefinder.git
cd farefinder
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Groq API Key for AI Insights
VITE_GROQ_API_KEY=your_groq_api_key_here

# Upstash Redis (for caching - optional)
VITE_UPSTASH_REDIS_REST_URL=your_upstash_url
VITE_UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment on Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/farefinder.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the following:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables:
   - `VITE_GROQ_API_KEY`: Your Groq API key
   - `VITE_UPSTASH_REDIS_REST_URL`: Your Upstash Redis URL (optional)
   - `VITE_UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis token (optional)
6. Click "Deploy"

Your app will be live in minutes! 🚀

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GROQ_API_KEY` | Groq API key for AI insights | Yes |
| `VITE_UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL | No |
| `VITE_UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST Token | No |

## API Keys (Free Tiers)

### Groq API (Required)
- Sign up at [groq.com](https://groq.com)
- Get free API key with generous limits
- Used for AI insights generation

### Upstash Redis (Optional)
- Sign up at [upstash.com](https://upstash.com)
- Free tier includes 10,000 requests/day
- Used for caching search results (10-minute TTL)

## Project Structure

```
farefinder/
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── search/
│   │   │   ├── SearchForm.tsx
│   │   │   ├── LocationInput.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── PassengerSelector.tsx
│   │   │   ├── ClassSelector.tsx
│   │   │   ├── ModeSelector.tsx
│   │   │   └── VoiceInputButton.tsx
│   │   ├── loading/
│   │   │   └── LoadingState.tsx
│   │   └── results/
│   │       ├── ResultsList.tsx
│   │       ├── ResultCard.tsx
│   │       └── AIInsights.tsx
│   ├── hooks/
│   │   └── useVoiceInput.ts
│   ├── lib/
│   │   ├── groq.ts
│   │   └── mockData.ts
│   ├── store/
│   │   └── searchStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Features in Detail

### Search Interface
- Location inputs with city autocomplete
- Date picker with calendar view
- Passenger count selector
- Travel class dropdown (Economy, Premium, Business, First)
- Mode selection (Flight, Train, Bus)
- Voice input support

### Loading State
- Animated progress bar
- Real-time status updates
- Platform connection indicators
- Fun travel facts

### Results Display
- Glassmorphism cards with operator logos
- Route timeline visualization
- Price comparison (current vs. original)
- Savings calculation
- Badges: Lowest Price, Fastest, Best Value
- Direct booking links

### AI Insights
- Smart savings recommendations
- Timing advice
- Alternative route suggestions
- Price trend analysis

## Customization

### Adding More Operators
Edit `src/lib/mockData.ts` to add more operators:

```typescript
const OPERATORS: Record<TravelMode, { name: string; logo: string; platforms: string[] }[]> = {
  flight: [
    // Add your operators here
    { name: 'New Airline', logo: 'https://logo.clearbit.com/newairline.com', platforms: ['MakeMyTrip'] },
  ],
  // ...
};
```

### Changing Colors
Edit `src/index.css` to customize the color scheme:

```css
.gradient-text {
  background-image: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Voice input requires Chrome or Edge for best compatibility.

## Performance

- Lazy loading for components
- Optimized animations with Framer Motion
- Efficient state management with Zustand
- Redis caching for faster repeat searches

## License

MIT License - feel free to use for your hackathon projects!

## Credits

Built with love for hackathons. Powered by:
- [Groq](https://groq.com) - AI inference
- [Upstash](https://upstash.com) - Serverless Redis
- [Vite](https://vitejs.dev) - Build tool
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://framer.com/motion) - Animations

---

**Happy hacking! 🚀✨**
