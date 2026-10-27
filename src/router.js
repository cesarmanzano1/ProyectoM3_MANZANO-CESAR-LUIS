
//src/router.js

import { renderHome } from "./views/home.js";
import { renderNotFound } from "./views/notfound.js";
import { renderabout } from "./views/about.js";
import { renderChat } from "./views/chat.js";
import { rendermanagement } from "./views/management.js";


const routes = {
    "/": renderHome,
    "/home": renderHome,
    "/about": renderabout,
    "/chat": renderChat,
    "/management": rendermanagement


};

export function router() {
    const path = window.location.pathname;
    const render = routes[path] || renderNotFound;

    render();
}

export function navigateTo(path) {
    const url = new URL(path, window.location.origin);

    if (url.origin !== window.location.origin) return;

    window.history.pushState({}, "", url.pathname + url.search);
    router();
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.target === "_blank" || link.hasAttribute("download")) return;

  const url = new URL(link.href, window.location.origin);
  if (url.origin !== window.location.origin) return;

  event.preventDefault();
  if (url.pathname === "/chat" && !url.searchParams.has("character")) {
    const lastCharacter = sessionStorage.getItem("chatverso:lastCharacter") || "homero";
    url.searchParams.set("character", lastCharacter);
  }
  navigateTo(`${url.pathname}${url.search}${url.hash}`);
});

window.addEventListener("popstate", router);