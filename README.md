# Express / React - Uploader un fichier

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin d'uploader un fichier côté backend et frontend. Nous aurons côté backend besoin de :

- [**Multer**](https://www.npmjs.com/package/multer)
- [**Uuid**](https://www.npmjs.com/package/uuid)

Donc n'oubliez pas d'installer ces deux packages NPM  dans votre backend !

## Analyse du code

Le but de cette nouvelle fonctionnalité sera d'uploader une image lors de la création d'un pokemon car jusqu'à maintenant nous mettions directement l'url d'une image présente sur le web.
Voici les étapes pour uploader un fichier :

- upload du fichier sur le serveur
- ajout du nom du fichier dans la base de données

Dans la mesure où nous avons ici deux étapes, on arrive à la conclusion que l'upload se fera via un middleware et que l'ajout du nom du fichier dans la BDD se fera dans un controller.


### Création du middleware upload
Nous allons dans un premier temps créer le middleware pour uploader un fichier. Nous avons crée dans le dossier des middlewares un fichier `upload.js` :

```js
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename(req, file, cb) {
    const pictureName = uuidv4() + path.extname(file.originalname);
    cb(null, `pokemon-${pictureName}`);
  },
});

const uploadFile = (req, res, next) => {
  const upload = multer({ storage });

  return upload.single("image")(req, res, next);
};

module.exports = { uploadFile };
```

La fonction `storage` nous permet de configurer l'upload :

- La méthode  `diskStorage` de multer nous permet de personnaliser l'emplacement et le nom du fichier uploadé
- La destination est le répertoire dans lequel sera enregistré le fichier. **ATTENTION** : Pensez bien à créer le dossier car multer ne va pas le créer pour vous.
- Le filename est le nom du fichier. Ici nous générons un id unique avec **uuid** puis le concaténons avec `path.extname` afin de garder l'extension du fichier. Nous ajoutons aussi le préfix "pokemon-" au nom du fichier final.

Ensuite nous avons crée la fonction `uploadFile` que nous exporterons afin de l'utiliser en tant que middleware sur nos routes.










