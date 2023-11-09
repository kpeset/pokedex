# Express : Pokedex

## Objectif de l'atelier

Dans cet atelier, nous allon continuer notre CRUD, en faisant des fonctions capables de créer, éditer et supprimer un pokemon.

## Explication du code

### Préambule

### Création des requêtes mySQL

Pour créer de la data en mSQL, nous devons utiliser `INSERT INTO` sur notre table `pokemon` de la façon suivante :
```
INSERT INTO pokemon (name, type, weight, image) VALUES ("Pikachu", "electrique", 12, "lien de l'image")
```

Mais ça c'est la façon manuelle de le faire. Nous voulons exécuter cette commande de façon dynamique sur notre back. Nous allons donc mettre notre logique dans un model.
Quel modèle s'occupe de nos requêtes concernant les pokemon ? Réponse : `pokemonManager`. Nous allons nous concentrer sur comment créer un pokemon. La logique pour update/supprimer un pokemon est sensiblement la même.

```
  insert(pokemon) {
    return this.database.query(
      `INSERT INTO pokemon (name, type, weight, image) VALUES (?, ?, ?, ?)`,
      [pokemon.name, pokemon.type, pokemon.weight, pokemon.image]
    );
  }
```

Ici nous avons crée une fonction `insert` qui prend en paramêtre `pokemon`. Ce `pokemon` sont les informations que l'on va avoir dans notre body et qu'on a crée dans notre controller :

```
const pokemon = req.body;
```

Revenons à notre fonction `insert` :

```
  insert(pokemon) {
    return this.database.query(
      `INSERT INTO pokemon (name, type, weight, image) VALUES (?, ?, ?, ?)`,
      [pokemon.name, pokemon.type, pokemon.weight, pokemon.image]
    );
  }
```

Notre `pokemon` est un objet qui pour être crée a besoin d'un nom, type, poids et image. Nous allons insérer des `VALUES` de façon dynamiques :

```
 VALUES (?, ?, ?, ?)
```

Les `?` seront remplacés dans l'ordre par les éléments qui sont dans le tableau qui suit la requête :

```
 [pokemon.name, pokemon.type, pokemon.weight, pokemon.image]
```

### Création du controller pour créer un pokemon
Pour créer un pokemon, nous avons crée la fonction suivante dans notre controller :

```
const add = (req, res) => {
  const pokemon = req.body;

  models.pokemon
    .insert(pokemon)
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

- `models.pokemon` signifie que nous allons utiliser le model **pokemon**
- `.insert` est la fonction que nous acons crée précédement dans notre `pokemonManager`. Fonction qui prend en paramètre `pokemon`, informations que nous allons récupérer depuis le `req.body`.

### Création des routes

Maintenant que notre controller et notre model sont prêts, nous allons pouvoir créer nos routes dans le fichier `router.js`:

```
router.post("/pokemon", pokemonControllers.add);
```

Nous commençons par importer nos controllers. Puis dans nos routes, nous dirons d'utiliser telle ou telle méthode qui se trouve dans le controller.
