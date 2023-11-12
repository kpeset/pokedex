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

Le controller aura pour tâche uniquement d'intéragir avec le model. Nous aurions pu mettre la logique de hashage mais il est important de continuer à structurer nos fichiers.
Toute la logique de hashage et de controle des données envoyées via Joi se feront dans un middleware. 
