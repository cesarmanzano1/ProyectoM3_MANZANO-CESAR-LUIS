// src/views/management.js

export function rendermanagement() {
    const app = document.querySelector("#app");

 app.innerHTML = `
<div class="about-container-wrapper">
    <section class="about-hero">
        <!-- Logo principal del proyecto -->
        <div class="about-brand-header">
            <img src="/img/chatverso-logo0.png" alt="ChatVerso Logo" class="about-brand-logo">
        </div>

        <!-- Presentación principal (narrativa y directa) -->
        <div class="about-bio">
            <span class="about-badge">Creador & Desarrollador Full Stack</span>
            <h1 class="about-name">César Luis Manzano</h1>
            <p class="about-description">
                ¡Hola! Soy <strong>César Luis Manzano</strong>, creador y desarrollador de <strong>ChatVerso</strong>. 
                Apasionado por la tecnología y la innovación digital, concebí ChatVerso como una plataforma interactiva, 
                fluida y escalable pensada para transformar la experiencia de comunicación inteligente. 
                Como Desarrollador Full Stack, me encargué del diseño integral, la arquitectura del sistema y la integración de soluciones de software de vanguardia.
            </p>
        </div>

        <!-- Sección de Stack Técnico con logos -->
        <div class="about-tech-section">
            <h2 class="about-tech-title">Tecnologías Principales</h2>
            <p class="about-tech-text">
                El ecosistema frontend de ChatVerso fue construido desde cero utilizando las tecnologías fundamentales de la web para garantizar un rendimiento óptimo y una experiencia visual de alto nivel:
            </p>
            
            <div class="tech-logos-container">
                <div class="tech-item">
                    <img src="/img/HTML.jpg" alt="HTML5 Logo" class="tech-logo">
                    <span>HTML5</span>
                </div>
                <div class="tech-item">
                    <img src="/img/CSS.png" alt="CSS3 Logo" class="tech-logo">
                    <span>CSS3</span>
                </div>
                <div class="tech-item">
                    <img src="/img/JS.png" alt="JavaScript Logo" class="tech-logo">
                    <span>JavaScript</span>
                </div>
            </div>
        </div>


        <!-- Botón inferior -->
        <div class="about-footer-action">
            <a href="/" class="btn--primary" id="volverHome">
                Volver al inicio
            </a>
        </div>
    </section>
</div>
`;

    const boton = app.querySelector("#volverHome");
    boton.addEventListener("click", (event) => {
        event.preventDefault();
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
    });
}