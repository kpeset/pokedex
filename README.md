# React - Création du backoffice pour ajouter et supprimer un pokemon de la BDD côté Frontend

## Objectif de l'atelier

Dans cet atelier, nous allons faire une page côté React pour ajouter et supprimer un pokemon de notre BDD.

## Explication du code

### Préambule

Ici nous allons utiliser `axios` pour faire toutes nos requêtes.
Nous aurons aussi besoin d'utiliser les deux hooks de React : `useState` et `useEffect`

### Création du formulaire

La création du formulaire est plutôt simple :

```
      <form onSubmit={addPokemon}>
        <label htmlFor="name">Nom du pokemon</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="type">Type du pokemon</label>
        <input
          type="text"
          value={type}
          onChange={(event) => setType(event.target.value)}
        />
        <label htmlFor="weight">Poids du pokemon</label>
        <input
          type="text"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
        />
        <label htmlFor="image">Image du pokemon</label>
        <input
          type="text"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
        <input type="submit" value="Ajouter" />
      </form>
```

Nous avons ici quatre `input text`. A chaque changement que subissent les inputs, nous allons changer le state auquel l'input est lié :

```
onChange={(event) => setName(event.target.value)}
```

Ces changements seront stockés dans ces states :

```
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState("");
```

Et lorsque nous voulons soummettre ces données à notre back, nous allons utiliser `axios` :

```
  const addPokemon = () => {
    axios
      .post(`http://localhost:5000/pokemon`, {
        name,
        type,
        weight,
        image,
      })
      .then((response) => {
        console.info(response);
      });
    getPokemonList();
  };
```

Exécuter la fonction `getPokemonList()` à la fin de la requête pour ajouter un pokemon, permet de raffraichir la liste des pokemons :

```
  const getPokemonList = () => {
    axios.get(`http://localhost:5000/pokemon`).then((response) => {
      setPokemonList(response.data);
    });
  };
```

La liste des pokemons est affichée de la façon suivante dans le `return` :

```
<ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            <p>
              {pokemon.id} - {pokemon.name}
            </p>
            <button type="button" onClick={() => deletePokemon(pokemon.id)}>
              Supprimer
            </button>
          </li>
        ))}
</ul>
```

Nous utilisons la méthode de tableau `map` pour ajouter un `li` qui affichera le nom du pokemon ainsi que le bouton **supprimer**, autant de fois qu'il y a de pokemon dans le state `pokemonList`.
Puis nous exécuterons la fonction `deletePokemon` qui aura l'id du pokemon en paramètre, lorsque nous voudrons supprimer un pokemon :

```
  const deletePokemon = (id) => {
    axios.delete(`http://localhost:5000/pokemon/${id}`).then((response) => {
      console.info(response);
    });
    getPokemonList();
  };
```
