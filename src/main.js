//src/main.js
import { router } from "./router.js";

router();

function initMobileMenu() {
    const toggleBtn = document.querySelector("#menuToggle");
    const navContent = document.querySelector("#navContent");

    if (toggleBtn && navContent) {
        toggleBtn.addEventListener("click", () => {
            const isOpen = navContent.classList.toggle("mainNav__content--active");
            toggleBtn.classList.toggle("mainNav__toggle--active", isOpen);
            toggleBtn.setAttribute("aria-expanded", String(isOpen));
        });

        // Cerrar el menú al hacer clic en cualquier enlace
        navContent.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navContent.classList.remove("mainNav__content--active");
                toggleBtn.classList.remove("mainNav__toggle--active");
                toggleBtn.setAttribute("aria-expanded", "false");
            });
        });
    }
}

// Ejecutar inmediatamente
initMobileMenu();