# Express - Les rôles : partie 1

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin de créer des roles pour nos utilisateurs.


## Analyse du code

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


### Modification de la requête searchByMail

Lorsque nous nous connectons, nous vérifier d'abord si l'émail est présent dans la base de données.
Jusqu'à maintenant nous avions uniquement des users, mais maintenant nous avons aussi des admins. Nous n'allons pas créer une requête pour chaque table. Nous allons donc déplacer la méthode `searchByEmail` qui est dans user vers notre `AbstractManager.js` :


```js
  searchByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }
```


Nous allons maintenant modifier notre fonction `checkEmailIfExist` située dans `auth.js` :

```js
const checkEmailIfExist = (req, res, next) => {
  const { email } = req.body;

  models.user.searchByEmail(email).then(([user]) => {
    if (user.length !== 0) {
      // eslint-disable-next-line prefer-destructuring
      req.user = {
        email: user[0].email,
        role: "user",
        hashedPassword: user[0].hashedPassword,
      };
      console.info("req.user : ", req.user);
      next();
    } else {
      models.admin.searchByEmail(email).then(([admin]) => {
        if (admin.length !== 0) {
          // eslint-disable-next-line prefer-destructuring
          req.user = admin[0];

          req.user = {
            email: admin[0].email,
            role: "admin",
            hashedPassword: admin[0].hashedPassword,
          };

          console.info(req.user);
          next();
        } else {
          res.sendStatus(401);
        }
      });
    }
  });
};
```

Ici nous avons maintenant deux vérifications dans chacune des tables admin et user. Si l'émail existe dans la table admin alors nous ajouterons dans `req.user` le role admin et nous ferons de même pour user.


### Modification du controller

Comme dit précédemment, nous avons maintenant deux types d'utilisateurs. Auparavant nous faisions la vérification de password dans le controller des users. Mais nous avons maintenant admin qui existe.
Nous allons mettre cette fonctionnalité `verifyPassword` dans un fichier commun au deux tables. Pendant le live co nous avons crée un fichier `authServices.js` dans le dossiers `services`, mais nous aurions très bien pu créer un fichier `authControllers` pour gérer toute la partie authentification.

Pratiquement rien ne va changer au code :

```js
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: req.user.id,
          email: req.user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.cookie("authToken", token);

        res.status(200).json({
          message: "Connexion réussie",
          role: req.user.role,
        });
      } else {
        res.sendStatus(401);
      }
    });
};

module.exports = { verifyPassword };
```

La seule différence est dans la réponse que l'on envoie si on est connecté. Nous avons ajouté le role au json que l'on envoie au client.
