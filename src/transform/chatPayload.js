//src/transform/chatPayload.js

const MAX_OUTPUT_TOKENS = 200;
const TEMPERATURE = 0.9; 
const MAX_TURNS_HISTORY = 12; 

export function toApiMessages(uiMessages) {
  return uiMessages.map((msg) => ({
    role: msg.role === "character" ? "model" : "user",
    parts: [{ text: msg.text }],
  }));
}

export function buildPayload({ systemPrompt, uiMessages }) {
  return {
    // MODEL_NAME,
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: toApiMessages(uiMessages),
    generationConfig: {
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: TEMPERATURE,
    },
  };
}

export function normalizeAIResponse(raw) {
    const parts = raw?.candidates?.[0]?.content?.parts;

    if (!Array.isArray(parts)) {
        console.error("Gemini no devolvió partes de texto:", raw);
        return "";
    }

    return parts
        .map((part) => part.text ?? "")
        .join("")
        .trim();
}
export function getTrimmedHistory(uiMessages) {
    return uiMessages.slice(-MAX_TURNS_HISTORY);
}

