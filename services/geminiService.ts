
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_ROUTES_FOR_AI } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development if the API key isn't set.
  // In a real production environment, this should throw an error or be handled securely.
  console.warn("API_KEY is not set. Using a mock response.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const mockResponse = {
    optimized_schedules: [
        {
            route_name: "New York, NY to Boston, MA",
            new_departure_times: ["07:00", "11:00", "15:00", "19:00"],
            justification: "Adjusted to avoid peak morning and evening traffic in NYC, improving on-time performance. Added an evening departure to capture more demand."
        },
        {
            route_name: "Los Angeles, CA to San Francisco, CA",
            new_departure_times: ["08:30", "12:30", "16:30"],
            justification: "Slightly delayed departures to miss the worst of LA's morning commute congestion."
        }
    ],
    new_route_suggestions: [
        {
            from: "San Jose, CA",
            to: "Sacramento, CA",
            suggested_times: ["09:00", "16:00"],
            rationale: "Connects two major tech and government hubs with high potential commuter traffic. Mid-morning and late-afternoon times are optimal for business travelers."
        }
    ]
};

const getRouteOptimizationPrompt = () => {
  const routesString = MOCK_ROUTES_FOR_AI.map(r => `- Route: ${r.from} to ${r.to}, current departures: ${r.departures.join(', ')}`).join('\n');
  return `
    You are a logistics and route optimization expert for a transport company called AeroBook Pro.
    Given the following routes and constraints, provide optimized schedules and potential new, more efficient routes.
    Consider factors like minimizing fuel consumption, avoiding peak traffic hours (assume typical 7-9AM and 4-6PM peaks in major cities), and maximizing passenger capacity.
    Drivers must have a 30-minute break after 4 hours of driving.

    Current Routes:
    ${routesString}

    Provide your suggestions in a structured JSON format. Do not add any markdown formatting like \`\`\`json.
    `;
};


export const getRouteOptimizations = async (): Promise<any> => {
  if (!API_KEY) {
    return new Promise(resolve => setTimeout(() => resolve(mockResponse), 1500));
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: getRouteOptimizationPrompt(),
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            optimized_schedules: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  route_name: { type: Type.STRING },
                  new_departure_times: { type: Type.ARRAY, items: { type: Type.STRING } },
                  justification: { type: Type.STRING }
                },
                required: ["route_name", "new_departure_times", "justification"]
              }
            },
            new_route_suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  from: { type: Type.STRING },
                  to: { type: Type.STRING },
                  suggested_times: { type: Type.ARRAY, items: { type: Type.STRING } },
                  rationale: { type: Type.STRING }
                },
                required: ["from", "to", "suggested_times", "rationale"]
              }
            }
          }
        }
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Error fetching route optimizations from Gemini:", error);
    // Fallback to mock data on API error
    return mockResponse;
  }
};
