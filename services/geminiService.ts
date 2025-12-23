import { GoogleGenAI, Type } from "@google/genai";
import { SERVICES, CATEGORIES } from '../constants';

// Initialize the AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface RecommendationResult {
  recommendedCategory?: string;
  reasoning: string;
  suggestedServiceIds: string[];
}

export const getServiceRecommendation = async (query: string): Promise<RecommendationResult> => {
  const serviceList = SERVICES.map(s => ({ id: s.id, name: s.name, description: s.description, category: s.category }));
  
  const prompt = `
    You are a smart assistant for a home service app called "Service on Call".
    User Query: "${query}"
    
    Available Services: ${JSON.stringify(serviceList)}
    Available Categories: ${JSON.stringify(CATEGORIES)}

    Analyze the user's problem. 
    1. Identify the most relevant Category.
    2. Identify specific Service IDs that match the problem.
    3. Provide a brief, friendly reasoning (max 1 sentence).
    
    If the request is vague, guess the most likely category based on common home issues.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedCategory: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            suggestedServiceIds: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["reasoning", "suggestedServiceIds"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as RecommendationResult;

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      reasoning: "I couldn't process that request right now. Please browse our categories.",
      suggestedServiceIds: []
    };
  }
};