
//src/test/aiCliente.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCharacterReply } from "../src/services/aiCliente.js";
import { fetchJson } from "../src/services/fechtJson.js";

// 1. Mockeamos la dependencia de fetchJson para interceptar las peticiones HTTP
vi.mock("../src/services/fechtJson.js", () => ({
    fetchJson: vi.fn(),
}));

describe("getCharacterReply", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("retorna la respuesta de la IA correctamente usando el personaje por defecto (cartman)", async () => {
        // Simulamos la respuesta exitosa que devolvería el servidor/Gemini
        const mockApiResponse = {
            candidates: [{ content: { parts: [{ text: "¡Respeten mi autoridad!" }] } }],
            usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 5 }
        };

        // Configuramos el mock para que resuelva con esa respuesta
        fetchJson.mockResolvedValueOnce(mockApiResponse);

        const uiMessages = [{ role: "user", content: "Hola Cartman" }];
        const reply = await getCharacterReply(uiMessages, "cartman");

        // Verificamos que devuelva el texto esperado
        expect(reply).toBe("¡Respeten mi autoridad!");

        // Verificamos que se haya llamado a fetchJson con la ruta correcta
        expect(fetchJson).toHaveBeenCalledTimes(1);
        expect(fetchJson).toHaveBeenCalledWith("api/chat.js", expect.any(Object));
    });

    it("lanza un error si la petición falla con un código diferente a 429", async () => {
        // Simulamos un error HTTP 500
        const httpError = new Error("HTTP 500: Internal Server Error");
        httpError.status = 500;
        
        fetchJson.mockRejectedValueOnce(httpError);

        const uiMessages = [{ role: "user", content: "Hola" }];

        // Verificamos que el error se propague correctamente
        await expect(getCharacterReply(uiMessages, "homero")).rejects.toThrow("HTTP 500");
    });
});