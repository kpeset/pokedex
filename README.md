# Express : Pokedex

## Objectif de l'atelier

Nous utiliserons cet atelier "fil rouge" lors de nos groupe support. C'est sur cette applications que nous testerons les fonctionnalités Express que l'on va apprendre lors de notre projet 3.
Il s'agit d'un atelier fullstack avec d'un côté le backend et de l'autre le frontend, basé sur le template de la Wild.

## Utilisation

Chaque fois que nous allons coder une feature, nous allons créer une branche spécifique.
De cette façon, vous pourrez aller de branches en branches pour voir le code que l'on a crée et aussi l'analyser.
Je vous invite aussi à lire le Readme de chaque branche.

## Prérequis

Pour les utilisatrices de windows **UNIQUEMENT**, vous denez saisir ces commandes dans le terminal de votre VS CODE :

```
git config --global core.eol lf
git config --global core.autocrlf false
```

## Installation

Pour installer ce repo, il vous suffit de cloner ce repository sur votre ordinateur et de faire `npm install` afin d'installer les dépendances.

**ATTENTION :** Pour executer le server backend, vous devez créer et configurer le fichier `.env` dans votre dossier `backend/`. Vous pouvez vous référer à l'exemple situé dans `backend/.env.sample`.

### Commandes disponibles

- `migrate` : Execute la migration de la base de données
- `dev` : Démarre les deux servers (front et back)
- `dev-front` : Démarre uniquement le server react
- `dev-back` : Démarre uniquement le server backend
- `lint` : Exécute les outils de validation de code
- `fix` : Répare les erreurs de linter

## Les branches

Voici le détail de chacune des branches :

- **step_01** : [**Express - Création de l'API pokedex avec les routes GET**](https://github.com/kpeset/pokedex/tree/step_01)
- **step_02** : [**React - Affichage de la liste de tous les pokemon**](https://github.com/kpeset/pokedex/tree/step_02)
- **step_03** : [**React - Création d'une barre de recherche**](https://github.com/kpeset/pokedex/tree/step_03)
- **step_04** : [**Express - Création des routes POST, PUT, DELETE pour ajouter, modifier et supprimer un pokemon**](https://github.com/kpeset/pokedex/tree/step_04)
- **step_05** : [**React - Création du backoffice pour ajouter et supprimer un pokemon de la BDD côté Frontend**](https://github.com/kpeset/pokedex/tree/step_05)
- **step_06** : [**React - Ajout au backoffice d'une page pour modifier un pokemon de la BDD côté Frontend**](https://github.com/kpeset/pokedex/tree/step_06)
- **step_07** : [**Express - Introduction aux middlewares**](https://github.com/kpeset/pokedex/tree/step_07)
- **step_08** : [**Express - Register avec Argon2 et Joi**](https://github.com/kpeset/pokedex/tree/step_08)
- **step_09** : [**React - Formulaire de register**](https://github.com/kpeset/pokedex/tree/step_09)
- **step_10** : [**Express - Login avec JWT, Cookie-parser & Création d'un middleware de vérification du user connecté**](https://github.com/kpeset/pokedex/tree/step_10)
- **step_11** : [**React - Formulaire de connexion**](https://github.com/kpeset/pokedex/tree/step_11)
- **step_12** : [**Express - Les rôles : partie 1**](https://github.com/kpeset/pokedex/tree/step_12)
- **step_13** : [**Express / React - Uploader un fichier**](https://github.com/kpeset/pokedex/tree/step_13)
- **step_14** : [**React - Les rôles : partie 2 (useContext, Private Routes)**](https://github.com/kpeset/pokedex/tree/step_14)
- **step_15** : [**Express - Système de messagerie**](https://github.com/kpeset/pokedex/tree/step_15)
- **step_16** : [**React - Système de messagerie**](https://github.com/kpeset/pokedex/tree/step_16)
- **step_17** : [**Express / React - Newsletter et envoi d'émails**](https://github.com/kpeset/pokedex/tree/step_17)
