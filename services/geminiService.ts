import { GoogleGenAI, Type } from "@google/genai";
import { BusinessReport } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeBusinessIdea = async (
  idea: string,
  targetLanguage: string
): Promise<BusinessReport> => {
  if (!apiKey) {
    throw new Error("API Key not found. Please set the API_KEY environment variable.");
  }

  const modelId = "gemini-2.5-flash"; // Fast and capable enough for structured output

  const prompt = `
    Analyze the following business idea rigorously as a top-tier venture capitalist and strategic consultant.
    
    Business Idea: "${idea}"
    
    Output Language: The content of the response MUST be in ${targetLanguage}. 
    Ensure the currency is appropriate for the implied region of the language or idea (e.g., INR for Indian languages, USD/EUR otherwise unless specified).
    
    Provide a realistic assessment including:
    1. A success rate score (0-100) based on market saturation, difficulty, and potential.
    2. A realistic budget range (min and max) to launch a Minimum Viable Product (MVP).
    3. A breakdown of that budget into key categories (e.g., Marketing, Development, Operations).
    4. Key success factors.
    5. Strategic advice (as a list of actionable points).
    6. Market insights (competitors, trends).
    7. Concrete next steps.
    8. A risk assessment.
  `;

  // Define the schema for structured JSON output
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      ideaName: { type: Type.STRING, description: "A catchy, short name for this business concept." },
      successRate: { type: Type.NUMBER, description: "Estimated success probability from 0 to 100." },
      budgetMin: { type: Type.NUMBER, description: "Minimum budget to start (numeric value only)." },
      budgetMax: { type: Type.NUMBER, description: "Maximum budget to start (numeric value only)." },
      currency: { type: Type.STRING, description: "Currency symbol or code (e.g., $, ₹, €)." },
      budgetBreakdown: {
        type: Type.ARRAY,
        description: "Breakdown of expenses.",
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            percentage: { type: Type.NUMBER, description: "Percentage of total budget (0-100)." },
            description: { type: Type.STRING, description: "Brief explanation of this cost." }
          },
          required: ["category", "percentage", "description"]
        }
      },
      keySuccessFactors: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of critical factors for success."
      },
      strategicAdvice: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of actionable strategic advice points."
      },
      marketInsights: { type: Type.STRING, description: "Analysis of the current market landscape." },
      nextSteps: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Actionable first steps to take."
      },
      riskAssessment: { type: Type.STRING, description: "Potential pitfalls and risks." },
      language: { type: Type.STRING, description: "The language code of the response." }
    },
    required: [
      "ideaName",
      "successRate",
      "budgetMin",
      "budgetMax",
      "currency",
      "budgetBreakdown",
      "keySuccessFactors",
      "strategicAdvice",
      "marketInsights",
      "nextSteps",
      "riskAssessment",
      "language"
    ]
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Balance creativity with realism
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from Gemini.");
    }

    const data = JSON.parse(responseText) as BusinessReport;
    return data;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};