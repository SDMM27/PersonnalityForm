# Quel personnage es-tu ?

Cette application de quiz de personnalité permet aux utilisateurs de découvrir quel personnage leur correspond en fonction de leurs réponses à différents quiz.

## Table des matières

- [Installation](#installation)
- [Usage](#usage)
- [Structure du projet](#structure-du-projet)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Installation

### Prérequis

- Node.js (https://nodejs.org)
- Git (https://git-scm.com)

### Étapes

1. Clonez le repository :

   ```bash
   git clone https://github.com/votre-utilisateur/mon-repo.git
   cd mon-repo

2. Installez les dépendances pour le backend :
    ```bash
    cd backend
    npm install

## Usage

### Démarrage du serveur backend

1. Démarrez le serveur :
   ```bash
   cd backend
   node server.js

Le serveur sera démarré sur http://localhost:3000.


### Démarrage du frontend
1. Ouvrez le fichier frontend/index.html dans votre navigateur pour commencer à utiliser l'application.


## Structure du projet

project-root/
│
├── backend/
│   ├── node_modules/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── sportif.html
│   ├── youtubeur.html
│   ├── chanteur.html
│   ├── manga.html
│   ├── films.html
│   ├── foot.html
│   ├── styles.css
│   └── scripts.js
│
├── .gitignore
└── README.md


### Backend
- server.js : Le serveur Express.js qui gère les requêtes pour les quiz et les résultats.

### Frontend

- index.html : La page d'accueil de l'application.
- sportif.html, youtubeur.html, etc. : Les pages individuelles pour chaque type de quiz.
- styles.css : Les styles pour l'application.
- scripts.js : Le script JavaScript pour gérer les interactions utilisateur.
