# SAE 4.B.01 DevOps - Blog Cybersécurité

Projet de SAE (BUT2 Informatique, parcours B DevOps) : réalisation d'un blog d'information sur la sécurité et le déploiement d'applications, incluant le suivi des laboratoires TryHackMe, puis déploiement sur Firebase Hosting.

## Objectifs du projet

- Présenter les connaissances acquises en sécurité et en déploiement.
- Documenter l'avancement sur TryHackMe (parcours Cyber Security 101 et Pre Security).
- Publier un site web responsive et accessible en ligne via Firebase Hosting.

## Périmètre fonctionnel

- Page d'accueil avec présentation de l'équipe.
- Navigation homogène entre toutes les pages (menu + footer).
- Une page par room/documentation (contexte, compréhension, vidéo, explication).
- Pages spéciales demandées par le sujet (Firebase, organisation, VPN/RDP, etc.).
- Site responsive (mobile, tablette, desktop).

## Stack technique

- HTML5
- CSS3
- JavaScript
- Firebase Hosting (plan Spark)

## Structure actuelle

```text
SAE-DevOps/
├── public/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── labs.js
├── firebase.json
├── .firebaserc
└── README.md
```

## Lancer le projet en local

Depuis la racine du projet :

```bash
cd /home/zinab/Documents/SAE-DevOps
npx serve public
```

Puis ouvrir l'URL locale affichée par `serve` dans le navigateur.

## Déploiement Firebase

### 1) Pré-requis

- Un compte Google/Firebase
- Node.js et npm installés

### 2) Installation CLI

```bash
npm install -g firebase-tools
firebase login
```

### 3) Configuration du projet

Mettre l'ID Firebase réel dans `.firebaserc` (remplacer `VOTRE_ID_PROJET_FIREBASE`).

```json
{
  "projects": {
    "default": "votre-id-projet-firebase"
  }
}
```

### 4) Déployer

```bash
cd /home/zinab/Documents/SAE-DevOps
firebase deploy
```

## Livrables SAE (rappel)

- Site fonctionnel, responsive, déployé sur Firebase.
- Pages de rooms avec :
  - contexte,
  - ce que nous avons compris (rédaction personnelle),
  - vidéo commentée de résolution,
  - courte conclusion.
- Pages spéciales complémentaires demandées par le sujet.
- Fichier `.txt` de rendu Moodle avec membres du groupe + lien du site.

## Bonnes pratiques d'équipe

- Avancer par tickets (une room = un ticket).
- Relire chaque page par un autre membre avant publication.
- Maintenir un format homogène sur toutes les pages.
- Vérifier régulièrement les liens et l'affichage responsive.

## Sources utiles

- Sujet SAE : `SAE4.B.01 DevOps.pdf`
- Documentation Firebase : [https://firebase.google.com/docs](https://firebase.google.com/docs)
- TryHackMe : [https://tryhackme.com/](https://tryhackme.com/)

## Auteurs

Projet réalisé dans le cadre de la SAE 4.B.01 - BUT2 Informatique (IUT de Calais).  

KIME Marwa
OUTMANI Zinab
HERBAUX Jules


