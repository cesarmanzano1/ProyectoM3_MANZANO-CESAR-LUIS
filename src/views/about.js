// src/views/about.js 
export function renderabout() {
    const app = document.querySelector("#app");

    app.innerHTML = `
        <!-- UN SOLO RECUADRO PRINCIPAL -->
        <section class="about-card">
            <h1 class="about-card__title">¿Qué es ChatVerso?</h1>
            <p class="about-card__subtitle">Hacemos de la tecnología y la IA algo divertido</p>

            <div class="about-mission-grid">
                <div class="mission-box mission-box--mision">
                    <div class="about-card__section">
                        <h2>Misión</h2>
                        <p>
                            Crear un multiverso conversacional único que conecte a las personas con sus personajes favoritos a través de la IA más avanzada.
                        </p>
                    </div>
                </div>

                <div class="mission-box mission-box--vision">
                    <div class="about-card__section">
                        <h2>Visión</h2>
                        <p>
                            Ser el espacio de interacción y entretenimiento con inteligencia artificial referente en el mercado de Latinoamérica y el mundo.
                        </p>
                    </div>
                </div>

                <div class="mission-box mission-box--proposito">
                    <div class="about-card__section">
                        <h2>Propósito</h2>
                        <p>
                            Hacemos la IA accesible, cercana y memorable para que todas las personas disfruten de experiencias de comunicación auténticas.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECCIÓN DE VALORES FLOTANTE FUERA DEL CUADRO -->
        <section class="values-section-floating">
            <h2 class="values-section__title">Nuestros Valores</h2>

            <div class="universe-container">
                <!-- Imagen para PC / Tablet -->
                <img src="/img/sistema_chatverso.png" alt="Sistema ChatVerso" class="universe-bg universe-bg-desktop">


                <div class="planet-item pos-integridad" title="Integridad">
                    <img src="/img/planeta_Integridad.png" alt="Integridad" class="planet-img">
                    <span class="planet-label">Integridad</span>
                </div>

                <div class="planet-item pos-diversidad" title="Diversidad">
                    <img src="/img/planeta_Divercidad.png" alt="Diversidad" class="planet-img">
                    <span class="planet-label">Diversidad</span>
                </div>

                <div class="planet-item pos-espiritu" title="Espíritu emprendedor">
                    <img src="/img/planeta_espirito.png" alt="Espíritu emprendedor" class="planet-img">
                    <span class="planet-label">Espíritu emprendedor</span>
                </div>

                <div class="planet-item pos-cercania" title="Cercanía y compromiso">
                    <img src="/img/planeta_cercania.png" alt="Cercanía" class="planet-img">
                    <span class="planet-label">Cercanía y compromiso</span>
                </div>

                <div class="planet-item pos-innovacion" title="Innovación">
                    <img src="/img/planeta_inovacion.png" alt="Innovación" class="planet-img">
                    <span class="planet-label">Innovación</span>
                </div>

                <div class="planet-item pos-orientacion" title="Orientación a resultados">
                    <img src="/img/planeta_oar.png" alt="Orientación a resultados" class="planet-img">
                    <span class="planet-label">Orientación a resultados</span>
                </div>

                <div class="planet-item pos-calidad" title="Calidad">
                    <img src="/img/planeta_calidad.png" alt="Calidad" class="planet-img">
                    <span class="planet-label">Calidad</span>
                </div>
            </div>

            <div class="about-card__footer-external">
                <a href="/" class="btn--primary" id="volverHome">
                    Volver al inicio
                </a>
            </div>
        </section>
    `;

    const boton = app.querySelector("#volverHome");
    boton.addEventListener("click", (event) => {
        event.preventDefault();
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
    });
}