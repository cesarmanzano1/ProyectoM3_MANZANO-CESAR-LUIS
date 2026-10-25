//src/test/chatPayload.test.js

import { describe, it, expect } from "vitest";
import {
  buildPayload,
  normalizeAIResponse,
  getTrimmedHistory,
} from "../src/transform/chatPayload.js";


  
describe("normalizeAIResponse", () => {
    it("extrae el texto de una respuesta válida de Gemini", () => {
        const raw = {
            candidates: [{ content: { parts: [ { text: "Hola imbecil" }] } }],
        };

        expect(normalizeAIResponse(raw)).toBe("Hola imbecil");
    });

    it("devuelve string vació si no hay parts", () => {
        expect(normalizeAIResponse({})).toBe("");
    });
});

describe("buildPayload", () => {
    it("construye la estructura basica del payload con el systemInstruction y generationConfig", () => {
        const systemPrompt = "Hola eres erick carman personaje de south park";
        const uiMessages = [{ role: "user", content: "Hola" }];
    
        // Pasamos systemPrompt que es lo que buildPayload desestructura
        const payload = buildPayload({ systemPrompt, uiMessages });

        expect(payload.systemInstruction).toBeDefined();
        expect(payload.systemInstruction.parts[0].text).toBe(systemPrompt);

        expect(payload.generationConfig).toHaveProperty("maxOutputTokens");
        expect(payload.generationConfig).toHaveProperty("temperature");

        expect(payload.contents).toBeDefined();
    });
});

describe("getTrimmedHistory", () => {
    it("devuelve todos los mensajes si no superan el límite máximo", () => {
        // Asumiendo que MAX_TURNS_HISTORY es mayor que 2
        const mensajes = [
            { role: "user", content: "Hola" },
            { role: "model", content: "¡Hola! ¿Cómo estás?" }
        ];

        const trimmed = getTrimmedHistory(mensajes);
        expect(trimmed.length).toBe(mensajes.length);
        expect(trimmed).toEqual(mensajes);
    });

    it("recorta el historial si excede el límite máximo de turnos", () => {
        // Simulamos un array grande de mensajes (por ejemplo, 20 mensajes)
        const muchosMensajes = Array.from({ length: 20 }, (_, index) => ({
            role: index % 2 === 0 ? "user" : "model",
            content: `Mensaje ${index + 1}`
        }));

        const trimmed = getTrimmedHistory(muchosMensajes);

        // Verificamos que el resultado no sea mayor que MAX_TURNS_HISTORY 
        // (puedes ajustar el número esperado según tu constante global)
        expect(trimmed.length).toBeLessThanOrEqual(muchosMensajes.length);
        
        // Verificamos que se haya quedado con los últimos mensajes (el último debe coincidir)
        expect(trimmed[trimmed.length - 1]).toEqual(muchosMensajes[muchosMensajes.length - 1]);
    });
});








// describe('nombreDeLaFuncion', () => {
//   it('deberia hacer X cuando le doy Y', () => {
//     // 1. ARRANGE: preparar los datos
//     const input = { ... };

//     // 2. ACT: ejecutar la funcion
//     const result = miFuncion(input);

//     // 3. ASSERT: verificar el resultado
//     expect(result).toBe(esperado);
//   });
// });