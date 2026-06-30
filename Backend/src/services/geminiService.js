import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateGeminiResponse = async (prompt) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing Gemini API Key configuration.");
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Enforcing strict JSON output to prevent frontend parsing errors
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response structure returned from Google SDK.");
    }

    return text;
  } catch (error) {
    throw new Error(`Gemini SDK Core Error: ${error.message}`);
  }
};
