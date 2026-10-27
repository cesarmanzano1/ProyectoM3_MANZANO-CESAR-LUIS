// src/views/notfound.js 
export function renderNotFound() {
    const app = document.querySelector("#app");

    app.innerHTML = `
        <section class="view view--notfound">
            <h1 class="view__title">404 - Página no encontrada</h1>

            <p class="view__subtitle">
                Lo sentimos, la página que estás buscando no existe.
            </p>

            <a class="btn--primary" href="/" id="backHome">
                Volver al inicio
            </a>
        </section>
    `;

    // Evita que el enlace recargue toda la página.
    const backHome = app.querySelector("#backHome");

    backHome.addEventListener("click", (event) => {
        event.preventDefault();
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
    });
}