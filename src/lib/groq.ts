import type { TravelResult, AIInsight } from '@/types';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function generateAIInsights(
  from: string,
  to: string,
  results: TravelResult[]
): Promise<AIInsight[]> {
  try {
    const lowestPrice = Math.min(...results.map(r => r.price));
    const highestPrice = Math.max(...results.map(r => r.price));
    const avgPrice = results.reduce((sum, r) => sum + r.price, 0) / results.length;
    
    const prompt = `Analyze these travel search results from ${from} to ${to} and generate 3 smart insights:
    
Results Summary:
- Lowest Price: ₹${lowestPrice}
- Highest Price: ₹${highestPrice}
- Average Price: ₹${Math.round(avgPrice)}
- Total Options: ${results.length}
- Operators: ${[...new Set(results.map(r => r.operator))].join(', ')}

Generate exactly 3 insights in this JSON format:
[
  {
    "type": "savings" | "timing" | "alternative" | "trend",
    "title": "Short catchy title (5-7 words)",
    "description": "Brief explanation (15-20 words)",
    "potentialSavings": number (percentage or amount)
  }
]

Make insights practical and actionable. Focus on: booking strategies, price trends, alternative routes, or timing advantages.
Return ONLY the JSON array, no other text.`;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a travel price analysis expert. Generate concise, actionable insights for travelers. Always return valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const insights: AIInsight[] = JSON.parse(jsonMatch[0]);
      return insights.map((insight, index) => ({
        ...insight,
        id: `insight-${index}`,
      }));
    }
    
    return getDefaultInsights(lowestPrice, highestPrice);
  } catch (error) {
    console.error('Error generating AI insights:', error);
    return getDefaultInsights(
      Math.min(...results.map(r => r.price)),
      Math.max(...results.map(r => r.price))
    );
  }
}

function getDefaultInsights(lowestPrice: number, highestPrice: number): AIInsight[] {
  const savingsPercent = Math.round(((highestPrice - lowestPrice) / highestPrice) * 100);
  
  return [
    {
      id: 'insight-1',
      type: 'savings',
      title: 'Book 2 weeks ahead',
      description: `Prices typically drop by 15-20% when booking 14 days in advance for this route.`,
      potentialSavings: 18,
    },
    {
      id: 'insight-2',
      type: 'timing',
      title: 'Tuesday departures save more',
      description: 'Mid-week flights are generally 12% cheaper than weekend departures.',
      potentialSavings: 12,
    },
    {
      id: 'insight-3',
      type: 'alternative',
      title: 'Nearby airport option',
      description: 'Consider alternative airports within 50km for potential savings.',
      potentialSavings: savingsPercent > 10 ? savingsPercent : 15,
    },
  ];
}
