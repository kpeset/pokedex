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


