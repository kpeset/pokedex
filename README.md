# Express - Register avec Argon2 et Joi

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin de créer des utilisateurs. Nous allons utiliser deux packages :

- Joi : Va permettre de vérifier que les différents champs correspondent au shéma que l'on va établir (un champ pour un email, un numéro de téléphone, etc...)
- Argon2 : Argon2 va permettre de hasher le password afin qu'il n'apparaisse pas en clair dans la BDD.


## Explication du code

### Création de la requête SQL

Afin de créer un utilisateur, nous devons exécuter une requête SQL qui permettra d'ajouter un utilisateur à la table users. Pour cela nous allons entrer ce code dans notre model UserManager.js :

```
  insert(email, hashedPassword) {
    return this.database.query(
      `INSERT INTO users (email, hashedPassword) VALUES (?, ?)`,
      [email, hashedPassword]
    );
  }
```

Ici nous avons crée la fonction `insert` qui prend en deux paramètres : email et hashedPassword.

### Création du controller

Nous allons créer la méthode `postUser` dans notre controller. N'oubliez pas de dire que `email` et `hashedPassword` vont provenir du `req.body` :

```
const postUser = (req, res) => {
  const { email, hashedPassword } = req.body;

  models.user
    .insert(email, hashedPassword)
    .then(([result]) => {
      console.info(result);
      res
        .status(200)
        .json({ Message: "Utilisateur crée avec succès", Email: email });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        Source: "controller",
        Erreur: "Erreur lors de l'enregistrement de l'utilisateur",
        Raison: err.sqlMessage,
      });
    });
};
```

Comme vous pouvez le remarquer, nous n'avons pas hashé le password.
Le controller aura pour tâche uniquement d'intéragir avec le model. Nous aurions pu mettre la logique de hashage mais il est important de continuer à structurer nos fichiers.
Toute la logique de hashage et de controle des données envoyées via Joi se feront dans un middleware. 

### Création du middleware de vérification des champs

Le premier middleware que nous allons créer consistera à vérifier avec Joi que `email` est bien un email et que `password` est bien une chaine de caractère qui contient au minimum 8 caractères :

```
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
```

Nous avons d'abord créer `userSchema` qui va exécuter la fonction Joi.object qui est un objet dans lequel nous allons mettre les différentes propriétés que nous voudrons vérifier.

Ensuite nous allons créer une fonction `validateUser` qui agira en tant que middleware (reconnaissable car il contient `next` dans les paramètres) :

```
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};
```

Nous allons utiliser la méthode `validate` sur notre `userSchema` et prendra en paramètre ce qu'il y a dans notre `req.body`.
Si les champs sont sorrects, nous pourrons passer au middleware suivant. Ce middleware s'occupera de hasher le password.

### Création du middleware de hashage de password

Pour hasher notre password, nous allons créer un middleware `hashPassword` et utiliser argon2

La première étape est de paramétrer l'algorithme de hashage. Pour cela nous allons mettre des options dans un objet `hashingOptions`. J'insiste sur le fait que cet algorithme est celui qui provient de la documentation. Je n'ai absolument rien inventé :

```
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};
```

Puis ensuite nous pouvons créer notre middleware `hashPassword` :

```
const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      console.info("Mot de passe du body :", req.body.password);
      console.info("Résultat de hashedPassword : ", hashedPassword);
      req.body.hashedPassword = hashedPassword;
      console.info(
        "Resultat de mon req.body.hashedPassword :",
        req.body.hashedPassword
      );
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
```

Nous allons utiliser la méthode `hash` d'argon2. Cette méthode prend deux paramètres. Ce qu'il y a dans le `req.body.password` et les options de hashage.
Si la réponse est positive, alors nous mettons ce nouveau password `hashedPassword` dans `req.body.hashedPassword` puis nous ferons un `next` qui nous dirigera vers la méthode `postUser` de notre controller.

