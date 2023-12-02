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

**ATTENTION :** N'oubliez pas de configurer votre `.env` dans votre backend. Car **SMTP_HOST, SMTP_POST, SMTP_USER et SMTP_PASSWORD** sont à inscrire dans les variables d'environnement.


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

Dans notre controller, nous allons créer la fonction qui nous permet d'ajouter un utilisateur :

```js
const registerUser = (req, res) => {
  const message = {
    email: req.body.email,
    subject: "Bienvenue sur pokedex",
    text: "Bienvenue à toi dans la communauté pokedex !",
    html: "<h1>Bienvenue à toi dans la communauté pokedex !</h1><p>Fais comme chez toi.</p>",
  };

  models.newsletter
    .insert(message.email)
    .then(([result]) => {
      sendMail({ message });
      console.info(result);
      res.status(200).json({ message: "Email inscrit avec succès" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de l'enregistrement" });
    });
};
```

On crée un objet `message` contenant les détails de l'émail de bienvenue à envoyer à l'utilisateur :
- email: L'adresse e-mail de l'utilisateur, extraite du corps de la requête (`req.body.email`).
- subject: Le sujet de l'e-mail.
- text: Le corps du texte de l'e-mail.
- html: La version HTML du corps de l'e-mail.

Puis nous appelons la méthode `insert` du manager pour enregistrer l'émail dans la BDD :

```js
  insert(email) {
    return this.database.query(`INSERT INTO newsletter (email) VALUES (?)`, [
      email,
    ]);
  }
```

**RAPPEL :** N'oubliez pas d'importer la fonction précédemment crée pour envoyer l'émail :

```js
const { sendMail } = require("../services/sendEmail");
```

En cas de succès de la requête SQL, nous envoyons l'émail avec la fonction `sendMail` avec en paramètre l'objet `message`.

<br>
<br>

### Envoi d'émails à tous les utilisateurs

Pour envoyer un émails à tous les utilisateurs, nous bouclerons simplement sur la liste des utilisateurs de notre BDD :

```js
const sendNewsletter = (req, res) => {
  models.newsletter
    .findAll()
    .then(([subscribers]) => {
      subscribers.forEach((subscriber) => {
        const message = {
          email: subscriber.email,
          subject: req.body.subject,
          text: req.body.text,
          html: req.body.html,
        };
        sendMail({ message });
      });
      res.status(200).json({
        message: "email envoyé avec succès",
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
```

Dans un premier temps nous récupérons tous les utilisateurs via la fonction `findAll` puis lorsque nous avons tous les utilisateur nous allons utiliser la boucle `forEach`. Nous exécuteront la fonction Send e-mails à chaque subscriber.

