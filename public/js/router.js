/**
 * Liste des pages AUTORISÉES
 * Évite qu'un utilisateur charge n'importe quel fichier (sécurité).
 */
const allowedPages = [
  "home",
  "team",
  "rooms",
  "room-example",
  "special/firebase-services",
  "special/site-structure",
  "special/vpn-rdp",
  "lotl",
  "mitm",
  "members/member-1",
  "members/member-2",
  "members/member-3",
  "members/member-4",
  "labo1/offensive-security-intro",
  "labo1/defensive-security-intro",
  "labo1/search-skills",
  "labo1/linux-fundamentals-part-1",
  "labo1/windows-fundamentals-1",
  "labo1/windows-fundamentals-2",
  "labo1/windows-fundamentals-3",

  // Labo 2 — Pre Security (Partie II)
  "labo2/careers-in-cyber",
  "labo2/what-is-networking",
  "labo2/dns-in-detail",
  "labo2/http-in-detail",
  "labo2/how-websites-work",
  "labo2/putting-it-all-together",

  // Labo 3 — Cyber Security 101 (Partie III)
  "labo3/networking-concepts",
  "labo3/cryptography-basics",
  "labo3/moniker-link-cve-2024-21413",
  "labo3/metasploit-introduction",
  "labo3/blue",
  "labo3/web-application-basics",
  "labo3/owasp-top-10-2025-iaaa-failures",
  "labo3/owasp-top-10-2025-application-design-flaws",
  "labo3/owasp-top-10-2025-insecure-data-handling",
  "labo3/common-attacks"
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