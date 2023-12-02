# Express - Les rôles : partie 1

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin de créer des roles pour nos utilisateurs.


## Préparation

### Création d'une table admin et Controllers / Manager

Dans l'exemple que nous avons fait en live coding, nous avons décidé qu'il y ai deux rôles : admin et user.
Jusqu'à maintenant nous avions uniquement la table user. Nous avons donc ajouté la table admin à notre `database.sql` :

```SQL
CREATE TABLE admin (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO `admin` (`email`, `hashedPassword`)
VALUES
("admin@gmail.com", "$argon2id$v=19$m=65536,t=5,p=1$ikpFm/0Ded52TiFU08Y2uw$MkLfR6uw5vFZbB0vBOmbrUIWumck3tS0K8TWj9aDpWw");
```

Nous avons aussi crée un fichier `AdminManager.js` et nous allons aussi mettre nos controllers dans un fichier `adminControllers.js`. N'oubliez pas d'ajouter ce nouveau manager dans `index.js` (vérifiez le code de cette branche en cas de doute).
Le controller et manager seront pour le moment vides :


```js
// AdminManager.js

const AbstractManager = require("./AbstractManager");

class AdminManager extends AbstractManager {
  constructor() {
    super({ table: "admin" });
  }

  // C'EST ICI QU'ON VA METTRE TOUTES NOS METHODES DE REQUETES
}

module.exports = AdminManager;

// adminControllers.js

const models = require("../models");

const getAllAdmin = (req, res) => {
  models.admin
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = { getAllAdmin };

```



