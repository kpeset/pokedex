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

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
- Run command `npm install`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

### Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated

### Deployment

For deployment, you have to go to `secrets` → app `actions` on the github repo to insert via `New repository secret` :

- CAPROVER_BACK_APPNAME : name app on caprover
- CAPROVER_FRONT_APPNAME : name app on caprover
- CAPROVER_PASSWORD : password caprover
- CAPROVER_SERVER : link of domain
