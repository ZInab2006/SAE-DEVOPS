/**
 * Liste des pages AUTORISÉES
 * 👉 évite qu'un utilisateur charge n'importe quel fichier (sécurité)
 */
const allowedPages = [
  "home",
  "team",
  "room-example"
];

/**
 * Charge dynamiquement une page HTML dans #content
 */
function loadPage(page) {
  // Sécurité : vérification whitelist
  if (!allowedPages.includes(page)) {
    page = "home";
  }
  fetch(`pages/${page}.html`)
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

/**
 * Récupère le paramètre ?page=
 */
function getPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("page") || "home";
}

/**
 * Initialisation du router
 */
document.addEventListener("DOMContentLoaded", () => {
  const page = getPageFromURL();
  loadPage(page);
});