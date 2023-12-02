# Express - Introduction aux Middlewares

## Objectif de l'atelier

Dans cet atelier, nous allons créer nos premiers middlewares. Ils seront peu utiles. Il s'agit d'une simple introduction sans intéragir avec une quelconque BDD.

## Explication du code

### Vérification basique email/password

Nous allons réunir tous nos middlewares dans un dossiers `middlewares`. C'est dans ce dossier que nous allons créer plusieurs fichiers (middleware d'authentification etc...).
Donc nous allons créer un premier middleware qui vérifie si un email et un password sont valides pour passer à l'étape suivante :

```js
const checkIfGoodUser = (req, res, next) => {
  const { email, password } = req.query;

  if (email === "admin@gmail.com" && password === "secret") {
    next();
  } else {
    res
      .status(403)
      .send(`Désolé ! Vous n'êtes pas autorisé à accéder à cette route...`);
  }
};
```

Ce middleware est une simple condition. Il vérifie si l'émail et le password qui sont dans le `req.query` sont les même qui sont dans la condition.
Si c'est bon, alors nous exécutons la suite de notre route via `next()` sinon on arrête tout en envoyant un `status(403)`. Voici un exemple de route :

```js
router.get("/pokemon", checkIfGoodUser, pokemonControllers.browse);
```

Si l'émail et le passwords sont incorrects alors la route n'atteindra jamais le controller pokemon.
