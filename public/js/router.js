/**
 * Liste des pages AUTORISÉES
 * 👉 évite qu'un utilisateur charge n'importe quel fichier (sécurité)
 */
const allowedPages = [
  "home",
  "team",
  "room1",
  "room2",
  "room3",
  "room4",
  "room5",
  "room6",
  "room7"
];

/**
 * Charge dynamiquement une page HTML dans #content
 */
function loadPage(page) {
  if (!allowedPages.includes(page)) {
    page = "home";
  }
  fetch(`pages/${page}.html`, { cache: "no-store" })
    .then(response => {
      if (!response.ok) {
        throw new Error("Page non trouvée");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("content").innerHTML = data;
    })
    .catch(() => {
      document.getElementById("content").innerHTML =
        "<h1>404 - Page non trouvée</h1>";
    });
}

function getPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("page") || "home";
}

document.addEventListener("DOMContentLoaded", () => {
  const page = getPageFromURL();
  loadPage(page);
});
