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


// const MAX_OUTPUT_TOKENS = 200;
// const TEMPERATURE = 0.9;
// const MAX_TURNS_HISTORY = 12;

// export function toApiMessages(uiMessages) {
//   return uiMessages.map((msg) => ({
//     role: msg.role === "character" ? "model" : "user",
//     parts: [{ text: msg.text }],
//   }));
// }

// export function getTrimmedHistory(uiMessages = []) {
//   return Array.isArray(uiMessages) ? uiMessages.slice(-MAX_TURNS_HISTORY) : [];
// }

// export function buildPayload({ systemPrompt, uiMessages }) {
//   return {
//     systemInstruction: {
//       parts: [{ text: systemPrompt }],
//     },
//     contents: toApiMessages(getTrimmedHistory(uiMessages)),
//     generationConfig: {
//       maxOutputTokens: MAX_OUTPUT_TOKENS,
//       temperature: TEMPERATURE,
//     },
//   };
// }

// export function normalizeAIResponse(response) {
//   const parts = response?.candidates?.[0]?.content?.parts;
//   const text = Array.isArray(parts)
//     ? parts.map((part) => part?.text || "").join("\n").trim()
//     : "";

//   if (text) return text;

//   const reason = response?.promptFeedback?.blockReason;
//   if (reason) {
//     throw new Error(`La respuesta fue bloqueada por el servicio (${reason}).`);
//   }

//   throw new Error("La API no devolvió texto en la respuesta.");
// }
