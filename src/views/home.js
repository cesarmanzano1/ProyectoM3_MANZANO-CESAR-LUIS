//src/views/home.js
import { navigateTo } from "../router.js";

export function renderHome() {
    const app = document.querySelector("#app");

    const characters = {
        homero: {
            name: "Homero Simpson",
            model: "/img/homero3D-v1.glb",
            universe: "LOS SIMPSON",
            description:
                "Es divertido, impulsivo, glotón y siempre se mete en situaciones inesperadas.",
            traits: ["Divertido", "Glotón", "Impulsivo", "Amante de las donas"],
            quote: "¡D'oh!",
            button: "Hablar con Homero"
        },
        cartman: {
            name: "Eric Cartman",
            model: "/img/cartma_3D-v4.glb",
            universe: "SOUTH PARK",
            description:
                "Es egocéntrico, impulsivo, manipulador y cree tener siempre la razón.",
            traits: ["Egocéntrico", "Manipulador", "Temperamental", "Amante del KFC"],
            quote: "¡Respeten mi autoridad!",
            button: "Hablar con Cartman"
        },
        elmo: {
            name: "Elmo Grosero",
            model: "/img/elmo3D-v2.glb",
            universe: "ELMO",
            description:
                "Tiene una personalidad irreverente, provocadora y nada amigable.",
            traits: ["Irreverente", "Provocador", "Sarcástico", "Malhumorado"],
            quote: "¡No soy amigable!",
            button: "Hablar con Elmo"
        }
    };

    app.innerHTML = `
        <main class="home">
            <section class="characterLayout">

                <aside class="characterSelection">
                    <h2>Seleccionar Personaje</h2>

                    <button class="characterOption characterOption--homero characterOption--active"
                        data-character="homero" aria-pressed="true" type="button">
                        <img class="characterOption__image"
                            src="/img/homero_simpson.png" alt="Homero Simpson">
                        <span class="characterOption__info">
                            <strong>Homero Simpson</strong>
                            <small>D'oh!</small>
                        </span>
                    </button>

                    <button class="characterOption characterOption--cartman"
                        data-character="cartman" aria-pressed="false" type="button">
                        <img class="characterOption__image"
                            src="/img/erick_cartman.jpg" alt="Eric Cartman">
                        <span class="characterOption__info">
                            <strong>Eric Cartman</strong>
                            <small>¡Respeten mi autoridad!</small>
                        </span>
                    </button>

                    <button class="characterOption characterOption--elmo"
                        data-character="elmo" aria-pressed="false" type="button">
                        <img class="characterOption__image"
                            src="/img/elmo.png" alt="Elmo Grosero">
                        <span class="characterOption__info">
                            <strong>Elmo Grosero</strong>
                            <small>No soy amigable...</small>
                        </span>
                    </button>
                </aside>

                <section class="chatPanel">
                    <h2 id="chatTitle">Características de Homero Simpson</h2>

                    <div class="characterProfile">
                        <div class="characterProfile__cover">
                            <model-viewer
                                id="characterModel"
                                src="/img/homero3D-v1.glb"
                                alt="Modelo 3D del personaje"
                                camera-controls
                                auto-rotate
                                disable-tap
                                disable-zoom
                                shadow-intensity="1"
                                environment-image="neutral"
                                exposure="1"
                                camera-orbit="0deg 75deg 150%"
                                field-of-view="35deg"> 
                                 </model-viewer>
                        </div>

                        <div class="characterProfile__content">
                            <p class="characterProfile__universe" id="characterUniverse">
                                LOS SIMPSON
                            </p>

                            <h2 class="characterProfile__name" id="characterName">
                                Homero Simpson
                            </h2>

                            <p class="characterProfile__description" id="characterDescription">
                                Es divertido, impulsivo, glotón y siempre se mete en situaciones inesperadas.
                            </p>

                            <div class="characterTraits" id="characterTraits">
                                <span class="characterTrait">Divertido</span>
                                <span class="characterTrait">Glotón</span>
                                <span class="characterTrait">Impulsivo</span>
                                <span class="characterTrait">Amante de las donas</span>
                            </div>

                            <blockquote class="characterQuote" id="characterQuote">
                                ¡D'oh!
                            </blockquote>

                            <!-- BARRA DE TOKENS -->
                            <div class="tokenCounter" aria-label="Uso de tokens" style="width: 100%; max-width: 100%;">
                                <div class="tokenCounter__headerText">
                                    <span>Uso de Tokens:</span>
                                    <span class="tokenCounter__stats">Gastados: <strong id="usedTokens">0</strong> | Disponibles: <strong id="availableTokens">10000</strong></span>
                                </div>
                                <div class="tokenCounter__barContainer">
                                    <div class="tokenCounter__bar" id="tokenBar" style="width: 0%;"></div>
                                </div>
                            </div>

                            <button class="profileButton" id="startCharacterChat" type="button">
                                Hablar con Homero
                            </button>
                        </div>
                    </div>
                </section>

            </section>
        </main>`;

    const characterButtons = app.querySelectorAll(".characterOption");
    const chatTitle = app.querySelector("#chatTitle");
    const model = app.querySelector("#characterModel");
    const universe = app.querySelector("#characterUniverse");
    const name = app.querySelector("#characterName");
    const description = app.querySelector("#characterDescription");
    const traits = app.querySelector("#characterTraits");
    const quote = app.querySelector("#characterQuote");
    const chatButton = app.querySelector("#startCharacterChat");

    model.addEventListener("pointerdown", (event) => {
        if (event.ctrlKey) {
            event.stopImmediatePropagation();
        }
    }, { capture: true });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Control" && document.activeElement === model) {
            event.preventDefault();
        }
    }, { capture: true });

    let selectedCharacter = "homero";

    // Función para actualizar los tokens según el personaje seleccionado
    function updateTokensForCharacter(charKey) {
        const MAX_TOKENS = 10000;

        // Leer el consumo compartido por todos los personajes.
        const used = Number(
            sessionStorage.getItem("chatverso:tokens:total") || 0
        );

        const available = Math.max(0, MAX_TOKENS - used);
        const percentage = Math.min(
            (used / MAX_TOKENS) * 100,
            100
        );

        const uEl = app.querySelector("#usedTokens");
        const aEl = app.querySelector("#availableTokens");
        const bEl = app.querySelector("#tokenBar");

        if (uEl) {
            uEl.textContent = used.toLocaleString("es-AR");
        }

        if (aEl) {
            aEl.textContent = available.toLocaleString("es-AR");
        }

        if (bEl) {
            bEl.style.width = `${percentage}%`;
        }
    }
    function selectCharacter(characterKey) {
        const character = characters[characterKey];

        if (!character) return;

        selectedCharacter = characterKey;

        characterButtons.forEach((button) => {
            const isActive = button.dataset.character === characterKey;

            button.classList.toggle("characterOption--active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        chatTitle.textContent = `Características de ${character.name}`;
        universe.textContent = character.universe;
        name.textContent = character.name;
        description.textContent = character.description;
        quote.textContent = character.quote;
        chatButton.textContent = character.button;

        traits.replaceChildren(
            ...character.traits.map((trait) => {
                const span = document.createElement("span");
                span.className = "characterTrait";
                span.textContent = trait;
                return span;
            })
        );
        model.setAttribute("alt", `Modelo 3D de ${character.name}`);
        model.setAttribute("src", character.model);

        // Actualizar la barra de tokens para este personaje al hacer clic
        updateTokensForCharacter(characterKey);
    }

    characterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectCharacter(button.dataset.character);
        });
    });

    chatButton.addEventListener("click", () => {
        navigateTo(`/chat?character=${selectedCharacter}`);
    });

    model.addEventListener("error", (event) => {
        console.error("No se pudo cargar el modelo 3D:", event);
    });

    // Detectar cuál fue el último personaje activo o iniciar con Homero
    const lastCharKey = sessionStorage.getItem("chatverso:lastCharacter") || "homero";
    selectCharacter(lastCharKey);
}