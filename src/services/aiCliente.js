//src/services/aiCliente

import { CARTMAN_SYSTEM_PROMPT, HOMER_SYSTEM_PROMPT, ELMO_SYSTEM_PROMPT } from "./prompts.js";
import { buildPayload, normalizeAIResponse, getTrimmedHistory } from "../transform/chatPayload.js";
import { fetchJson } from "./fechtJson.js";

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
  } catch (error)  {
    if (error.status === 429) {
      const segundos = error.body?.retryAfterSeconds;

      const nuevoError = new Error(
        segundos
          ? `Se alcanzó el límite de solicitudes. Intentá nuevamente en ${segundos} segundos.`
          : "Se alcanzó el límite de solicitudes. Esperá un momento e intentá nuevamente."
      );

      nuevoError.status = 429;
      nuevoError.retryAfterSeconds = segundos;
      throw nuevoError;
    }

    throw error;
  }
const text = normalizeAIResponse(rawResponse);
const metadata = rawResponse?.usageMetadata;

const usage = {
  inputTokens: metadata?.promptTokenCount ?? 0,
  outputTokens: metadata?.candidatesTokenCount ?? 0,
  totalTokens: metadata?.totalTokenCount ??
    ((metadata?.promptTokenCount ?? 0) +
     (metadata?.candidatesTokenCount ?? 0)),
};

console.log("[Consumo real de Gemini]", usage);

return { text, usage };}
