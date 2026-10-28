// src/views/chat.js 
import { getCharacterReply } from "../services/aiCliente.js";

const characterData = {
  cartman: {
    name: "Eric Cartman",
    title: "Chat con Eric Cartman",
    subtitle: "Hablá con Cartman... si te animás.",
    img: "/img/cartman.perfil.jpg",
    greeting: "¡Hola! Soy Eric Cartman. ¿Qué querés, imbécil?",
  },
  homero: {
    name: "Homero Simpson",
    title: "Chat con Homero Simpson",
    subtitle: "Mmm... donas. Hablá con Homero.",
    img: "/img/homero_perfil.jpeg",
    greeting: "¡Hola! Soy Homero Simpson. ¿Hay donas?",
  },
  elmo: {
    name: "Elmo Grosero",
    title: "Chat con Elmo Grosero",
    subtitle: "Elmo no está de humor hoy...",
    img: "/img/elmo.png",
    greeting: "¡Hola! Soy Elmo Grosero. ¿Qué querés?",
  },
};

let currentCharacterKey = "homero";
let activeChar = characterData.homero;
let state = { status: "idle", messages: [], error: null };

// 🔄 Variable global temporal para guardar el texto si el servidor se cae
let textoFallido = "";

const storageKey = (characterKey) => `chatverso:messages:${characterKey}`;

function saveConversation() {
  try {
    sessionStorage.setItem(storageKey(currentCharacterKey), JSON.stringify(state.messages));
    sessionStorage.setItem("chatverso:lastCharacter", currentCharacterKey);
  } catch (error) {
    console.warn("No se pudo guardar la conversación en esta sesión:", error);
  }
}

function loadConversation() {
  try {
    const saved = sessionStorage.getItem(storageKey(currentCharacterKey));
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.every((m) => m && ["user", "character"].includes(m.role) && typeof m.text === "string")) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("No se pudo recuperar la conversación:", error);
  }
  return [{ role: "character", text: activeChar.greeting }];
}

export function renderChat() {
  const params = new URLSearchParams(window.location.search);
  const requestedCharacter = params.get("character") || sessionStorage.getItem("chatverso:lastCharacter") || "homero";
  currentCharacterKey = Object.hasOwn(characterData, requestedCharacter) ? requestedCharacter : "homero";
  activeChar = characterData[currentCharacterKey];
  sessionStorage.setItem("chatverso:lastCharacter", currentCharacterKey);
  state = { status: "idle", messages: loadConversation(), error: null };

  const app = document.querySelector("#app");
  app.innerHTML = `
    <main class="chatPage" aria-label="Conversación con ${escapeHtml(activeChar.name)}">
      <header class="chatPage__header">
        <!-- Agrupamos avatar e información juntos -->
        <div class="chatPage__userMeta">
          <img class="chatPage__avatar" src="${activeChar.img}" alt="Perfil de ${escapeHtml(activeChar.name)}">
          <div class="chatPage__identity">
            <h1>${escapeHtml(activeChar.title)}</h1>
            <p><span class="chatPage__statusDot"></span>${escapeHtml(activeChar.subtitle)}</p>
          </div>
        </div>

        <!-- Contador de Tokens -->
        <div class="tokenCounter" aria-label="Uso de tokens">
          <div class="tokenCounter__headerText">
            <span>Uso de Tokens:</span>
            <span class="tokenCounter__stats">
               Gastados: <strong id="usedTokens">0</strong> |
               Disponibles: <strong id="availableTokens">10000</strong> |
               Última respuesta: <strong id="lastTokens">0</strong>
            </span>
          </div>
          <div class="tokenCounter__barContainer">
            <div class="tokenCounter__bar" id="tokenBar" style="width: 0%;"></div>
          </div>
        </div>

        <!-- Botón Cambiar Personaje -->
        <a class="chatPage__back" href="/">Cambiar personaje</a>
      </header>

      <section class="chatPage__messages" id="chatMessages" aria-live="polite" aria-label="Mensajes">
        ${renderMessages()}
        ${renderStatus()}
      </section>

      <form class="chatPage__composer" id="chatComposer">
        <label class="sr-only" for="chatInput">Escribí tu mensaje</label>
        <input id="chatInput" type="text" placeholder="Escribí un mensaje a ${escapeHtml(activeChar.name)}..." autocomplete="off" maxlength="10000" value="${escapeHtml(textoFallido)}">
        <button id="chatSubmitBtn" type="submit" aria-label="Enviar mensaje">Enviar <span aria-hidden="true">➤</span></button>
      </form>
    </main>
  `;

  setupChat();
  scrollToBottom();
  updateTokenBar(getUsedTokens(), 0);
}

function renderMessages() {
  return state.messages.map((message) => `
    <article class="chatBubble chatBubble--${message.role}">
      <span class="chatBubble__author">${message.role === "user" ? "Vos" : escapeHtml(activeChar.name)}</span>
      <p>${escapeHtml(message.text)}</p>
    </article>
  `).join("");
}

function renderStatus() {
  if (state.status === "loading") return '<p class="chatPage__notice" role="status">El personaje está escribiendo<span class="typingDots">...</span></p>';
  
  if (state.status === "error") {
    // 🛠️ Si el servidor está caído, mostramos la alerta con el botón Reenviar integrado
    if (state.isServerDown) {
      return `
        <div class="chatPage__error" role="alert" style="display: flex; flex-direction: column; gap: 8px;">
          <span>${escapeHtml(state.error)}</span>
          <button type="button" id="btnReenviarChat" style="width: fit-content; padding: 6px 14px; background: linear-gradient(110deg, #5147e8, #a632f4); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 700;">
            Reenviar 🔄
          </button>
        </div>
      `;
    }
    return `<p class="chatPage__error" role="alert">${escapeHtml(state.error)}</p>`;
  }
  return "";
}

function updateChatUI() {
  const messages = document.querySelector("#chatMessages");
  const input = document.querySelector("#chatInput");
  const button = document.querySelector("#chatSubmitBtn");
  
  if (messages) {
    messages.innerHTML = `${renderMessages()}${renderStatus()}`;
    
    // Vinculamos el evento del botón Reenviar si se acaba de renderizar
    const btnReenviar = document.querySelector("#btnReenviarChat");
    if (btnReenviar) {
      btnReenviar.addEventListener("click", () => {
        const form = document.querySelector("#chatComposer");
        if (form) form.requestSubmit();
      });
    }
  }

  const loading = state.status === "loading";
  if (input) input.disabled = loading;
  if (button) button.disabled = loading;
  scrollToBottom();
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = String(value ?? "");
  return div.innerHTML;
}

function setupChat() {
  const form = document.querySelector("#chatComposer");
  const input = document.querySelector("#chatInput");

  if (!form || !input) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (getUsedTokens() >= MAX_TOKENS) {
      state.status = "error";
      state.isServerDown = false;
      state.error = "Alcanzaste el límite de 10.000 tokens.";
      updateChatUI();
      return;
    }

    const text = input.value.trim();
    if (!text || state.status === "loading") return;

    // Guardamos temporalmente por si falla
    textoFallido = text;

    state.messages.push({ role: "user", text });
    state.status = "loading";
    state.isServerDown = false;
    state.error = null;
    saveConversation();
    
    input.value = "";
    updateChatUI();

    try {
      const result = await getCharacterReply(
        state.messages,
        currentCharacterKey
      );

      const reply = result.text;
      const tokensUsados = result.usage.totalTokens;
      if (!reply) throw new Error("El servidor devolvió una respuesta vacía.");
      
      state.messages.push({ role: "character", text: reply });
      addUsedTokens(tokensUsados);

      // Si todo sale bien, limpiamos el texto fallido guardado
      textoFallido = "";
      state.status = "idle";
      state.isServerDown = false;
      state.error = null;
      saveConversation();

    } catch (error) {
      console.error("Error al responder en el chat:", error);

      state.status = "error";

      // 🔌 Validamos si es el error del servidor apagado que configuramos en aiCliente.js
      if (error.isServerDown) {
        state.isServerDown = true;
        state.error = error.message;
        
        // Devolvemos el texto al input para que no se pierda
        textoFallido = text;
        input.value = text;
        
        // Quitamos el último mensaje de usuario que se había agregado visualmente para reintentar limpio
        state.messages.pop();
        saveConversation();
      } else if (error.status === 429) {
        state.isServerDown = false;
        const segundos = error.retryAfterSeconds;
        state.error = segundos
          ? `Alcanzaste el límite de solicitudes. Esperá ${segundos} segundos e intentá nuevamente.`
          : "Alcanzaste el límite de solicitudes. Esperá un momento e intentá nuevamente.";
      } else {
        state.isServerDown = false;
        state.error = error.message || "No pude responder. Revisá la conexión e intentá nuevamente.";
      }
    } finally {
      updateChatUI();
      const currentInput = document.querySelector("#chatInput");
      if (currentInput && !currentInput.disabled) currentInput.focus();
    }
  });

  input.focus();
}

const tokenStorageKey = () => "chatverso:tokens:total";

function getUsedTokens() {
  return Number(sessionStorage.getItem(tokenStorageKey()) || 0);
}

function addUsedTokens(tokens) {
  const tokensReales = Number(tokens);

  if (!Number.isFinite(tokensReales) || tokensReales < 0) {
    console.error("Consumo de tokens inválido:", tokens);
    return;
  }

  const total = getUsedTokens() + tokensReales;

  sessionStorage.setItem(tokenStorageKey(), String(total));
  updateTokenBar(total, tokensReales);
}

function scrollToBottom() {
  const messages = document.querySelector("#chatMessages");
  if (messages) messages.scrollTop = messages.scrollHeight;
}

const MAX_TOKENS = 10000;

function updateTokenBar(totalUsed, lastUsed = 0) {
  const usedEl = document.querySelector("#usedTokens");
  const availableEl = document.querySelector("#availableTokens");
  const lastEl = document.querySelector("#lastTokens");
  const barEl = document.querySelector("#tokenBar");

  const used = Math.max(0, totalUsed);
  const available = Math.max(0, MAX_TOKENS - used);
  const percentage = Math.min((used / MAX_TOKENS) * 100, 100);

  if (usedEl) usedEl.textContent = used.toLocaleString("es-AR");
  if (availableEl) availableEl.textContent = available.toLocaleString("es-AR");
  if (lastEl) lastEl.textContent = lastUsed.toLocaleString("es-AR");
  if (barEl) barEl.style.width = `${percentage}%`;
}