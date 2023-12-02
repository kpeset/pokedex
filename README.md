# Express / React - Newsletter et envoi d'émails

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin d'afficher de pouvoir s'inscrire à la newsletter. Nous verrons aussi comment un admin peut envoyer un messages à tous les inscrits.


Côté backend, nous aurons besoin de [**Nodemailer**](https://www.npmjs.com/package/nodemailer). 

Pour cet atelier nous avons utilisé **ZohoMail**. À vous de vous adapter si vous voulez utiliser **Gmail** ou autre.


Je ne vais pas détailler ici la création de fichiers pour le controller et le manager. Je ne vais décrire que le code utilisé.
<br>
<br>
## Les étapes

### Création de la table Newsletter

Nous allons dans un premier temps ajouter à `database.sql` la création de la table `newsletter` :

```SQL
CREATE TABLE newsletter (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL
)
```

Ensuite, vous devrez créer les fichiers pour le controller et le manager correspondant à cette nouvelle table. Regardez le code pour plus de précisions.

<br>
<br>

### Analyser les besoins

Pour faire cet atelier, nous aurons besoin de trois fonctions différentes :
- L'ajout d'utilisateurs à la BDD
- Récupération des utilisateurs
- Envoi d'émails

### Envoi d'émails

Concentrons-nous d'abord sur l'envoi d'émails. C'est une fonction que nous pourrons utiliser encore et encore car seul le message à envoyer sera différent à chaque fois.
Nous allons d'abord créer un fichier de configuration `mailer.js` pour **nodemailer** dans le dossier `services` : 

```js
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

module.exports = transporter;
```

**ATTENTION : ** N'oubliez pas de configurer votre `.env` dans votre backend. Car **SMTP_HOST, SMTP_POST, SMTP_USER et SMTP_PASSWORD** sont à inscrire dans les variables d'environnement.






