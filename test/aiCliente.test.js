// src/test/aiCliente.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCharacterReply } from "../src/services/aiCliente.js";
import { fetchJson } from "../src/services/fechtJson.js";

vi.mock("../src/services/fechtJson.js", () => ({
    fetchJson: vi.fn(),
}));
//
describe("getCharacterReply", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("retorna la respuesta de la IA correctamente usando el personaje por defecto (cartman)", async () => {
        const mockApiResponse = {
            candidates: [
                {
                    content: {
                        parts: [
                            { text: "¡Respeten mi autoridad!" }
                        ]
                    }
                }
            ],
            usageMetadata: {
                promptTokenCount: 10,
                candidatesTokenCount: 5,
                totalTokenCount: 15
            }
        };

        fetchJson.mockResolvedValueOnce(mockApiResponse);

        const uiMessages = [
            { role: "user", text: "Hola Cartman" }
        ];

        const result = await getCharacterReply(uiMessages);

        // Verificar el texto de la respuesta
        expect(result.text).toBe("¡Respeten mi autoridad!");

        // Verificar el consumo de tokens
        expect(result.usage).toEqual({
            inputTokens: 10,
            outputTokens: 5,
            totalTokens: 15,
        });

        // Verificar la petición HTTP
        expect(fetchJson).toHaveBeenCalledTimes(1);
        expect(fetchJson).toHaveBeenCalledWith(
            "api/chat.js",
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: expect.any(String),
            })
        );
    });

    it("lanza un error si la petición falla con un código diferente a 429", async () => {
        const httpError = new Error("HTTP 500: Internal Server Error");
        httpError.status = 500;

        fetchJson.mockRejectedValueOnce(httpError);

        const uiMessages = [
            { role: "user", text: "Hola" }
        ];

        await expect(
            getCharacterReply(uiMessages, "homero")
        ).rejects.toThrow("HTTP 500");
    });
});