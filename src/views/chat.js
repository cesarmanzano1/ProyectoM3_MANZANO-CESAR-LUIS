
// src/views/chat.js 
import { getCharacterReply } from "../services/aiCliente.js";

const characterData = {
  cartman: {
    name: "Eric Cartman",
    title: "Chat con Eric Cartman",
    subtitle: "Hablá con Cartman... si te animás.",
    img: "/img/erick_cartman.jpg",
    greeting: "¡Hola! Soy Eric Cartman. ¿Qué querés, imbécil?",
  },
  homero: {
    name: "Homero Simpson",
    title: "Chat con Homero Simpson",
    subtitle: "Mmm... donas. Hablá con Homero.",
    img: "/img/homero_simpson.png",
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
            <span class="tokenCounter__stats">Gastados: <strong id="usedTokens">0</strong> | Disponibles: <strong id="availableTokens">2000</strong></span>
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
        <input id="chatInput" type="text" placeholder="Escribí un mensaje a ${escapeHtml(activeChar.name)}..." autocomplete="off" maxlength="2000">
        <button id="chatSubmitBtn" type="submit" aria-label="Enviar mensaje">Enviar <span aria-hidden="true">➤</span></button>
      </form>
    </main>
  `;

  setupChat();
  scrollToBottom();
  const initialTokens = state.messages.reduce((acc, m) => acc + m.text.length, 100);
  updateTokenBar(initialTokens);
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
  if (state.status === "error") return `<p class="chatPage__error" role="alert">${escapeHtml(state.error)}</p>`;
  return "";
}

function updateChatUI() {
  const messages = document.querySelector("#chatMessages");
  const input = document.querySelector("#chatInput");
  const button = document.querySelector("#chatSubmitBtn");
  if (messages) messages.innerHTML = `${renderMessages()}${renderStatus()}`;
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
    const text = input.value.trim();
    if (!text || state.status === "loading") return;

    state.messages.push({ role: "user", text });
    state.status = "loading";
    state.error = null;
    saveConversation();
    input.value = "";
    updateChatUI();

    try {
      const reply = await getCharacterReply(state.messages, currentCharacterKey);
      if (!reply) throw new Error("El servidor devolvió una respuesta vacía.");
      state.messages.push({ role: "character", text: reply });
      state.status = "idle";
      state.error = null;
      saveConversation();

      const estimatedTokens = state.messages.reduce((acc, m) => acc + m.text.length, 100);
      updateTokenBar(estimatedTokens);//actualizar el estado de tokens


    } catch (error) {
      console.error("Error al responder en el chat:", error);
      state.status = "error";
      state.error = "No pude responder. Revisá la conexión e intentá nuevamente.";
    } finally {
      updateChatUI();
      const currentInput = document.querySelector("#chatInput");
      if (currentInput && !currentInput.disabled) currentInput.focus();
    }
  });

  input.focus();
}

function scrollToBottom() {
  const messages = document.querySelector("#chatMessages");
  if (messages) messages.scrollTop = messages.scrollHeight;
}


function updateTokenBar(totalUsed) {
  const maxTokens = 2000; // Límite máximo estimado o configurado
  const used = Math.min(totalUsed, maxTokens);
  const available = maxTokens - used;
  const percentage = Math.round((used / maxTokens) * 100);

  const usedEl = document.querySelector("#usedTokens");
  const availableEl = document.querySelector("#availableTokens");
  const barEl = document.querySelector("#tokenBar");

  if (usedEl) usedEl.textContent = used;
  if (availableEl) availableEl.textContent = available;
  if (barEl) {
    barEl.style.width = `${percentage}%`;
  }
}