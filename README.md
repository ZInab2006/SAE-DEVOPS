# SAE 4.B.01 DevOps — CyberNotes (blog cybersécurité)

Projet de SAE (BUT2 Informatique, parcours DevOps) : site statique documentant les parcours **TryHackMe** (Cyber Security 101, Pre Security, Cyber Security 101 partie III), des pages transverses (Firebase, VPN/RDP, LOTL, MITM) et les **fiches membres**, avec déploiement sur **Firebase Hosting**.

**Dépôt :** [github.com/ZInab2006/SAE-DEVOPS](https://github.com/ZInab2006/SAE-DEVOPS)  
**Site en ligne :** [saedevops-group2.web.app](https://saedevops-group2.web.app)

## Objectifs

- Présenter les acquis en sécurité et la démarche sur les rooms documentées.
- Offrir une navigation homogène (menu, thème clair/sombre, pied de page).
- Assurer un déploiement reproductible via Git et Firebase.

## Fonctionnalités principales

- **SPA légère** : `index.html` charge les fragments HTML dans `#content` selon `?page=` (liste blanche dans `public/js/router.js`).
- **Labo 1** (9 rooms Partie I) : offensive/defensive intro, Search Skills, Linux fundamentals, Windows fundamentals 1–3, Windows Command Line, Active Directory Basics.
- **Labo 2** : Pre Security (réseau, HTTP, DNS, etc.).
- **Labo 3** : réseau, crypto, exploitation, OWASP Top 10 2025 (thèmes ciblés), etc.
- **Ressources SAE** : Services Firebase, structure du site, VPN/RDP, LOTL, MITM.
- **Équipe** : cartes membres, organisation du groupe, remerciements, lien GitHub dans le footer.

## Stack technique

| Élément | Détail |
|--------|--------|
| Front | HTML5, CSS3, JavaScript (vanilla) |
| UI | Bootstrap 5.3 |
| Hébergement | Firebase Hosting (`saedevops-group2`) |
| Routage | Paramètre `?page=` + alias (ex. `zinab-room` → Search Skills) |

## Structure du dépôt

```text
SAEDEVOPS/
├── public/
│   ├── index.html          # Shell : menu, #content, footer
│   ├── home.html            # Accueil (chargé dans #content)
│   ├── css/styles.css
│   ├── js/
│   │   ├── router.js        # Pages autorisées + chargement des fragments
│   │   ├── include.js      # Injection menu / footer
│   │   ├── theme.js
│   │   └── animations.js
│   ├── partials/
│   │   ├── menu.html
│   │   └── footer.html     # Lien vers le dépôt GitHub
│   ├── pages/
│   │   ├── rooms.html
│   │   ├── team.html
│   │   ├── labo1/ … labo2/ … labo3/
│   │   ├── members/
│   │   ├── special/
│   │   ├── lotl.html, mitm.html
│   │   └── …
│   └── img/
├── firebase.json            # Hosting, rewrites SPA, Referrer-Policy (embeds YouTube)
├── .firebaserc
└── README.md
```

## Lancer en local

Depuis la racine du clone :

```bash
cd SAEDEVOPS
npx --yes serve public
```

Ouvrir l’URL indiquée (souvent `http://localhost:3000`). Servir impérativement le dossier **`public`** pour que les chemins `/css/`, `/img/`, etc. fonctionnent.

Alternative :

```bash
cd public && python -m http.server 8080
```

## Déploiement Firebase

**Prérequis :** compte Google, [Firebase CLI](https://firebase.google.com/docs/cli) ou `npx`.

Le projet par défaut est défini dans `.firebaserc` (`saedevops-group2`).

```bash
# Première fois : connexion
npx firebase-tools login

# Déployer uniquement le hosting
cd SAEDEVOPS
npx firebase-tools deploy --only hosting
```

Console : [console.firebase.google.com/project/saedevops-group2](https://console.firebase.google.com/project/saedevops-group2/overview)

## Livrables SAE (rappel)

- Site responsive, accessible en ligne.
- Pages de rooms : contexte, points clés, vidéo (embed), synthèse.
- Pages spéciales et organisation d’équipe documentée sur le site.
- Rendu Moodle : membres + **lien du site** (et lien GitHub si demandé).

## Équipe

Projet réalisé dans le cadre de la **SAE 4.B.01** — BUT2 Informatique (IUT).

| Membre |
|--------|
| OUTMANI Zinab |
| KIME Marwa |
| HERBAUX Jules |
| BAKRI Mohammed |

## Liens utiles

- [Documentation Firebase Hosting](https://firebase.google.com/docs/hosting)
- [TryHackMe](https://tryhackme.com/)
