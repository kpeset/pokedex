# Express / React - Newsletter et envoi d'émails

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin d'afficher de pouvoir s'inscrire à la newsletter. Nous verrons aussi comment un admin peut envoyer un messages à tous les inscrits.


Côté backend, nous aurons besoin de [**Nodemailer**](https://www.npmjs.com/package/nodemailer).


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






