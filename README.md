# Express / React - Uploader un fichier

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin d'uploader un fichier côté backend et frontend. Nous aurons côté backend besoin de :

- [**Multer**](https://www.npmjs.com/package/multer)
- [**Uuid**](https://www.npmjs.com/package/uuid)

Donc n'oubliez pas d'installer ces deux packages NPM  dans votre backend !
<br>
<br>
## Backend

Le but de cette nouvelle fonctionnalité sera d'uploader une image lors de la création d'un pokemon car jusqu'à maintenant nous mettions directement l'url d'une image présente sur le web.
Voici les étapes pour uploader un fichier :

- upload du fichier sur le serveur
- ajout du nom du fichier dans la base de données

Dans la mesure où nous avons ici deux étapes, on arrive à la conclusion que l'upload se fera via un middleware et que l'ajout du nom du fichier dans la BDD se fera dans un controller.
<br>
<br>
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

Ensuite nous avons crée la fonction `uploadFile` que nous exporterons afin de l'utiliser en tant que middleware sur notre route de création du pokemon (n'oubliez pas de l'importer) : 

```js
router.post("/pokemon", uploadMiddleware.uploadFile, pokemonControllers.add);
```
<br>
<br>

### Modification de la requête SQL et du controller

Nous allons légèrement modifier la fonction `add` du `pokemonController` car il faut dorénavant ajouter le chemin du fichier téléchargé à notre requête SQL. Nous allons juste ajouter un paramètre `picture` à notre fonction :

```js
const add = (req, res) => {
  const pokemon = req.body;
  const picture = req.file.filename;

  models.pokemon
    .insert(pokemon, picture)
    .then(([result]) => {
      console.info(result);
      res.status(200).send("Le pokemon a bien été ajouté");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur de sauvegarde");
    });
};
```

Ce paramètre `picture` fait référence à ce qu'il y a dans le `req.file` dans lequel nous récupérons le nom du fichier `filename`

Puis maintenant il ne nous reste plus qu'à mettre à jour notre requête SQL située dans la fonction `insert` de `PokemonManager.js` :

```js
  insert(pokemon, picture) {
    return this.database.query(
      `INSERT INTO pokemon (name, type, weight, image) VALUES (?, ?, ?, ?)`,
      [pokemon.name, pokemon.type, pokemon.weight, picture]
    );
  }
```


## Frontend

Les modifications du backoffice côté React est relativement simple.
Afin de transmettre un fichier au server depuis le client, nous devons utiliser `formData` :

```js
  const addPokemon = (event) => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("type", type);
    formData.append("weight", weight);
    formData.append("image", image);

    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/pokemon`, formData)
```

À chaque fois que nous voulons ajouter un champ à `formData` nous utilisons la méthode `append` qui prend deux paramètres : la propriété et sa valeur.
Nous enverrons ensuite dans le body de notre requête axios, notre formData.

Évidemment nous avons du créer un `input` de type `file` pour sélectionner un fichier sur notre ordinateur :

```jsx
  <input
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
        />
```

Nous enregistrons le fichier dans le state `image`.



