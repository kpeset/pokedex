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
