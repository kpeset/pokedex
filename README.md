# Express : Pokedex

## Objectif de l'atelier

Dans cet atelier, nous avons crée plusieurs routes GET en se connectant à notre base de données.
Voici nos différents objectifs :
- Afficher tous nos pokemons
- Afficher un pokemon précis selon son ID
- Afficher que les pokemons d'un certain type
- Afficher les pokemons dont le nom commence par une certaine lettre

## Explication du code

### Préambule

Si vous voulez plus de détails concernant le code, je vous invite à regarder la vidéo concernant la présentation du template côté backend.

### Controller et model

Le controller permet la gestion des requêtes HTTP. Il agit comme une interface entre les routes et les models.
Concrètement, il reçoit une requête, interroge le model qui lui renvoie une réponse.

Le model est responsable de l'interaction avec la base de données. C'est ici que nous écrirons la logique de nos requêtes SQL.

### Création du controller pour lister tous les pokemon

Pour lister tous nos pokemon, nous avons crée le code suivant :

```
const browse = (req, res) => {
  models.pokemon
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
```

- `browse` est le nom que nous donnons à notre fonction
- `models.pokemon` signifie que nous allons utiliser le model **pokemon**
- `.findAll` est la fonction que nous allons executer. Elle se trouve dans notre model.

**Attention :** Lorsque nous disons qu'il va chercher la fonction `findAll`, il va d'abord chercher dans le model `AbstractManager.js`. Ce model contient des règles communes à toutes les tables (lister tous les pokemon, chercher par id...).

C'est pour cette raison, que nous avons pas besoin d'éditer `PokemonManager.js` pour lister tous nos pokemon, puisque cette fonctionnalité est déjà présente dans le `AbstractManager` :

```
findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }
```

### Création du controller et du model pour lister tous les pokemon d'un certain type

Voyons maintenant un exemple dont nous devrons aussi coder le model. Nous allons lister les pokemon selon le type. Commençons par la création de notre **controller** :

```
const searchByType = (req, res) => {
  const { type } = req.params;
  models.pokemon.findByType(type).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows);
    }
  });
};
```

- `searchByType` est le nom de notre fonction que nous avons crée
- `const { type } = req.params` permet de dire qu'on va utiliser des params qui s'appellent **type**
- `models.pokemon.findByType(type)` nous allons utiliser la méthode findByType que nous allons créer dans notre model et cette méthode aura en paramètre nos params `type`.

Maintenant nous pouvons créer notre model dans `PokemonManager.js` :

```
  findByType(type) {
    return this.database.query(`SELECT * FROM pokemon WHERE type = ?`, [type]);
  }
```

Ici, il s'agit d'une simple requête SQL. 

**ATTENTION :** N'oubliez pas de préciser qu'il s'agit de la table `pokemon` :

```
    super({ table: "pokemon" });
```

### Création des routes

Maintenant que notre controller et notre model sont prêts, nous allons pouvoir créer nos routes dans le fichier `router.js`:

```
const pokemonControllers = require("./controllers/pokemonControllers");

router.get("/pokemon", pokemonControllers.browse);
router.get("/pokemon/type/:type", pokemonControllers.searchByType);
```

Nous commençons par importer nos controllers. Puis dans nos routes, nous dirons d'utiliser telle ou telle méthode qui se trouve dans le controller.
