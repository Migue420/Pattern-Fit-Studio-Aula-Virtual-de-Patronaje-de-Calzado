
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("La variable de entorno API_KEY no está configurada");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getVisionResponse(prompt: string, imageBase64: string, mimeType: string): Promise<string> {
    const model = 'gemini-2.5-flash';

    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType
      }
    };

    const textPart = {
      text: prompt
    };
    
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [textPart, imagePart] }
        });

        if (!response.text) {
          throw new Error("Se recibió una respuesta vacía de la API de Gemini.");
        }
        
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("No se pudo generar contenido desde la API de Gemini.");
    }
}