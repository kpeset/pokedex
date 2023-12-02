# Express / React - Newsletter et envoi d'émails

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin d'afficher de pouvoir s'inscrire à la newsletter. Nous verrons aussi comment un admin peut envoyer un messages à tous les inscrits.
Le frontend ayant la même logique que les ateliers précédents, nous analyserons uniquement le code côté backend.

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

Pour faire cet atelier, nous aurons besoin de deux fonctions différentes :
- L'ajout d'utilisateurs à la BDD
- Envoi d'émails

<br>
<br>

 
### Envoi d'émails

Concentrons-nous maintenant sur l'envoi d'émails. C'est une fonction que nous pourrons utiliser encore et encore car seul le message à envoyer sera différent à chaque fois.
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


Puis nous allons créer un fichier `sendEmail.js` dans le dossier `services`. C'est dans ce fichier que nous allons y écrire notre logique d'envoi d'émails :

```js
const mailer = require("./mailer");

const sendMail = ({ message }) => {
  mailer.sendMail(
    {
      from: "kpeset@zohomail.eu",
      to: message.email,
      subject: message.subject,
      text: message.text,
      html: message.html,
    },
    (err, info) => {
      if (err) console.error(err);
      else console.info(info);
    }
  );
};

module.exports = { sendMail };
```


Dans cette fonction, nous utilisons la méthode `sendMail` et nodemailer.
Notre fonction prend en paramètre `message` qui est un objet dans lequel nous aurons le destinataire, le sujet du mail, le text, et le contenu au format HTML.
Nous pourrons maintenant utiliser cette fonction depuis n'importe où, même lorsqu'un utilisateur s'inscrira à la newsletter.

<br>
<br>

### Inscription des utilisateurs
