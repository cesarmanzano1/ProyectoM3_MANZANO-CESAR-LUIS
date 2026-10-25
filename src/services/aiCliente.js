//src/services/aiCliente

import { CARTMAN_SYSTEM_PROMPT, HOMER_SYSTEM_PROMPT, ELMO_SYSTEM_PROMPT } from "./prompts.js";
import { buildPayload, normalizeAIResponse, getTrimmedHistory } from "../transform/chatPayload.js";
import { fetchJson } from "../services/fechtJson.js";

const CHAT_ENDPOINT = "api/chat.js";

export async function getCharacterReply(uiMessages, characterKey = "cartman") {
  // 1. Recortar historial para controlar tokens.
  const trimmed = getTrimmedHistory(uiMessages);

  // Seleccionar el prompt según el personaje recibido
  let systemPrompt = CARTMAN_SYSTEM_PROMPT; // Valor por defecto
  
  if (characterKey === "homero") {
    systemPrompt = HOMER_SYSTEM_PROMPT;
  } else if (characterKey === "elmo") {
    systemPrompt = ELMO_SYSTEM_PROMPT;
  }

  // 2. Construir payload con shape de Gemini usando el prompt dinámico.
  const payload = buildPayload({
    systemPrompt: systemPrompt,
    uiMessages: trimmed,
  });

  // 3. Llamar al endpoint.
  let rawResponse;
  try {
    rawResponse = await fetchJson(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (error.status === 429 && error.body?.retryAfterSeconds) {
      // TODO: Agregar lógica de reintento aquí si lo deseas
    } else {
      throw error;
    }
  }

  // 4. Normalizar la respuesta a string limpio.
  const text = normalizeAIResponse(rawResponse);

  const usage = rawResponse?.usageMetadata;
  if (usage) {
    console.log(`[Tokens] input: ${usage.promptTokenCount}, output: ${usage.candidatesTokenCount}`);
  }

  return text;
}