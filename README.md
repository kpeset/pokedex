# Express : Pokedex

## Objectif de l'atelier

Dans cet atelier, nous avons crée plusieurs routes GET en se connectant à notre base de données.
Voici nos différents objectifs :
- Afficher tous nos pokemons
- Afficher un pokemon précis selon son ID
- Afficher que les pokemons d'un certain type
- Afficher les pokemons dont le nom commence par une certaine lettre

## Explication du code

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



