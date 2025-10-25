
import { GoogleGenAI } from "@google/genai";

// Assume API_KEY is set in the environment
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

export const getFunFact = async (topic: string): Promise<string> => {
  try {
    const prompt = `Tell me one brief, interesting, and fun fact about the telecommunications company "${topic}" in Ghana. Keep it to a single sentence.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error(`Error fetching fun fact from Gemini for topic "${topic}":`, error);
    throw new Error("Failed to generate fun fact.");
  }
};
