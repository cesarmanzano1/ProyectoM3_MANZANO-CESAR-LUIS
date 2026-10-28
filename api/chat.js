
//api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const RETRY_AFTER_FALLBACK_SECONDS = 10;//lo ideal son 30 segundos


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { contents, systemInstruction, generationConfig } = req.body ?? {};

if (!Array.isArray(contents) || contents.length === 0) {
    return res.status(400).json({ error: "contents required and must be non-empty" });
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({
//   model: "gemini-flash-lite-latest",
//   systemInstruction,
//   generationConfig,
// });
const model = genAI.getGenerativeModel({
  model: "gemini-flash-lite-latest",
  systemInstruction,
  generationConfig: {
    ...generationConfig,
    maxOutputTokens: 180,
    temperature: 0.8,
  },
});

const result = await model.generateContent({ contents });
return res.status(200).json(result.response);
  // return res.status(200).json({
  //   candidates: [
  //     {
  //       content: {
  //         parts: [{ text: "Mock desde la serverless. Cableado OK." }],
  //         role: "model",
  //       },
  //       finishReason: "STOP",
  //     },
  //   ],
  //   usageMetadata: {
  //     promptTokenCount: 10,
  //     candidatesTokenCount: 10,
  //     totalTokenCount: 20,
  //   }
  // });
} catch (error) {
if (error.status === 429) {
  console.warn("Rate limit hit on Gemini");

  return res.status(429).json({
    error: "Rate limit exceeded",
    retryAfterSeconds: RETRY_AFTER_FALLBACK_SECONDS,
  });
}

  console.error("Error in /api/chat:", error);
  return res.status(500).json({ error: "Internal server error" });
}}