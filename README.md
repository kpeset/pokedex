# React : Notre premiere requête API

## Objectif de l'atelier
Lors de cet atelier, nous avons organisé nos routes et avons fait notre première requête API.

## Explication du code
### Organisation de l'application

Voici comment sera organisée notre application pour le moment :

- main.jxs : Fichier parent de notre application, là où nous importons `BrowserRouter` et nos différents fichiers **CSS**
  - App.jsx : Structure de notre application. Affichera Navbar/Footer mais aussi le contenu de nos pages dynamiquement (**Content**)
  - Content.jsx : Composant dans lequel nous allons créer toutes nos routes



L'application contiendra pour le moment les dossiers suivants :

- **Components** : Ce dossier contiendra tous nos composants
- **Pages** : C'est ici que nous mettrons nos différentes pages
- **Styles** : Dossier pour stocker nos fichiers css

<br>
<br>

### Pokedex & Requête API

Bien que notre backend soit en local, la requête API n'est pas différentes celles que nous avons fait précédemment dans les autres ateliers et sur le projet 2. Regardons le code sur la page Pokedex :

```js
    useEffect(() => {
        axios
            .get(`http://localhost:8000/pokemons`)
            .then((response) => {
                setData(response.data);
            });
    }, [])
```

Ici, nous mettons notre requête API dans un `useEffect`au tableau de dépendance vide, afin d'exécuter une seule fois notre requête que nous stockerons dans un state `data`.

Il ne nous reste plus qu'à afficher notre composant `PokemonCard` qui recevra en props la réponse de la requête API. Nous bouclerons notre tableau d'objet `data` en utilisant la méthode **map** :

```js
<div className="pokemon_list">
  {data.map((pokemon) => <PokemonCard key={pokemon.id} details={pokemon} />)}
</div>
```


