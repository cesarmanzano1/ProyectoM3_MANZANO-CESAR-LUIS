// src/views/about.js 

export function renderabout() {
    const app = document.querySelector("#app");

    app.innerHTML = `
        <section class="about-card">
            <!-- Encabezado con título -->
            <h1 class="about-card__title">¿Qué es ChatVerso?</h1>

            <!-- Grid de 2 columnas -->
            <div class="about-card__grid">
                
                <!-- Columna Izquierda: Visión y Stack -->
                <div class="about-card__col">
                    <div class="about-card__section">
                        <h2>Visión del Multiverso</h2>
                        <p>
                            Crear un espacio donde los límites de la conversación se expanden. 
                            Usamos IA avanzada para simular las personalidades más icónicas 
                            de la cultura pop, permitiéndote tener diálogos interactivos y divertidos. 
                            ChatVerso es donde el humor y la tecnología se encuentran.
                        </p>
                    </div>

                    
                </div>

                <!-- Columna Derecha: Tarjeta de Creador y Redes -->
                <div class="about-card__col">
                    <h2>El Equipo detrás</h2>
                    
                    <div class="creator-card">
                        <div class="creator-card__header">
                            <div class="creator-card__avatar">
                                👨‍💻
                            </div>
                            <div class="creator-card__info">
                                <h3>Estudiante de Ingeniería</h3>
                                <span>Desarrollador Full Stack / Creador</span>
                            </div>
                        </div>
                        <p class="creator-card__bio">
                            Apasionado por el desarrollo web y la inteligencia artificial, 
                            dedicado a construir experiencias únicas y entretenidas.
                        </p>
                    </div>

                    
                </div>

            </div>

            <!-- Botón inferior -->
            <div class="about-card__footer">
                <a href="/" class="btn--primary" id="volverHome">
                    Volver al inicio;
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