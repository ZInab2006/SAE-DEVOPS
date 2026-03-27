function getPreferredTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  updateThemeToggleLabel();
}

function updateThemeToggleLabel() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const theme = document.documentElement.dataset.theme || "dark";
  btn.textContent = theme === "light" ? "Thème : Clair" : "Thème : Sombre";
}

function initThemeToggle() {
  // Apply theme as early as possible (defer, but still before user interacts)
  document.documentElement.dataset.theme = getPreferredTheme();

  // Menu is injected dynamically; wait until #themeToggle exists.
  const tryWire = () => {
    const btn = document.getElementById("themeToggle");
    if (!btn) return false;
    updateThemeToggleLabel();
    btn.addEventListener("click", () => {
      const current = document.documentElement.dataset.theme || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
    return true;
  };

  if (tryWire()) return;

  const menuHost = document.getElementById("menu");
  if (!menuHost) return;

  const obs = new MutationObserver(() => {
    if (tryWire()) obs.disconnect();
  });
  obs.observe(menuHost, { childList: true, subtree: true });
}

document.addEventListener("DOMContentLoaded", initThemeToggle);

