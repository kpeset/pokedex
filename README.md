# Express - Login avec JWT, Cookie-parser & Création d'un middleware de vérification du user connecté

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin de connecter nos utilisateurs côté backend. Nous aurons besoin de :

- [**JWT (Json Web Tokens)**](https://www.npmjs.com/package/jsonwebtoken)
- [**Cookie-parser**](https://www.npmjs.com/package/cookie-parser)

Donc n'oubliez pas d'installer ces deux packages NPM !

## Préparation

Le package **Cookie-parser** va nous permettre de lire notre cookie pour ensuite l'analyser avec JWT. Il faut donc spécifier à Express que nous allons l'utiliser globalement sur toute notre application.
Donc nous allons l'importer et l'utiliser dans app.js :

```
const cookieParser = require("cookie-parser");

app.use(cookieParser());
```

## Login

Maintenant nous devons étudier quelle sera la procédure de connexion lorsque le client enverra au backend les identifiants. Celle-ci se fera en deux étapes :

- Vérification si l'émail existe dans la BDD
- Vérification du password

Puisqu'il y a deux étapes, nous pouvons arriver à la conclusion que la vérification d'émail existant sera un middleware et que la vérification du password se fera dans le controller.

La première chose à faire est créer dans le UserManager la requête mysql qui nous permet de checker si l'émail existe :

```
  searchByEmail(email) {
    return this.database.query(`SELECT * FROM users WHERE email = ?`, [email]);
  }
```

Nous allons maintenant procéder à la création du middleware qui vérifie l'émail. Pour cela nous avons décidé de le créer directement dans le fichier `auth.js`. Notre middleware sera une fonction que l'on va appeler `checkEmailIfExist` :

```js
const checkEmailIfExist = (req, res, next) => {
  const { email } = req.body;

  models.user.searchByEmail(email).then(([user]) => {
    if (user.length !== 0) {
      req.user = user[0];
      console.info("req.user : ", req.user);
      next();
    } else {
      res.sendStatus(401);
    }
  });
};
```

Que vérifie cette fonction ? L'émail. Notre émail proviendra du body de la requête : 
```
  const { email } = req.body;
```

Puis ensuite nous utiliserons la fonction `searchByEmail` que nous avons précédemment crée dans le `UserManager`. Si la longueur de la réponse que l'on reçoit n'est pas inférieure à 0, alors nous enregistrons dans `req.user` les données reçues puis nous serons redirigés vers l'étape suivante grace au `next()`. Si il n'y a pas de résultats alors nous envoyons une erreur 401 sans message particulier.


