/**
 * Charge un fichier HTML externe et l'injecte dans un élément
 * @param {string} id - id de l'élément cible
 * @param {string} file - chemin du fichier HTML
 */
function loadHTML(id, file) {
  fetch(file, { cache: "no-store" })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur chargement ${file}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => {
      console.error(error);
    });
}

/**
 * Chargement des partials (menu + footer)
 * DOMContentLoaded garantit que le HTML est prêt
 */
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("menu", "partials/menu.html");
  loadHTML("footer", "partials/footer.html");
});