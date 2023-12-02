# React - Ajout au backoffice d'une page pour modifier un pokemon de la BDD côté Frontend #

## Objectif de l'atelier

Dans cet atelier, nous allons faire une page côté React pour modifier un pokemon de notre BDD.

## Explication du code

### Préambule

Ici nous allons utiliser `axios` pour faire toutes nos requêtes.
Nous aurons aussi besoin d'utiliser les deux hooks de React : `useState` et `useEffect`

### Création du formulaire

La création du formulaire se révèle être un peu plus complexe que le formulaire pour créer un pokemon. Il existe autant de façon de faire qu'il y a de codeurs et codeuses. Voici comment nous, nous avons procédés :

```jsx
     <div className="update_pokemon_panel">
      <h1>Update Pokemon</h1>
      <select
        onChange={(event) => setSelectedValue(event.target.value)}
        value={selectedValue}
      >
        <option value="">Sélectionne un pokemon</option>
        {pokemonList.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.id}>
            {pokemon.id} - {pokemon.name}
          </option>
        ))}
      </select>
      <div>
        {selectedPokemon && (
          <form onSubmit={() => updatePokemon(selectedPokemon.id)}>
            <input
              type="text"
              placeholder={selectedPokemon.name}
              value={selectedPokemon.name}
              onChange={(event) =>
                setSelectedPokemon({
                  ...selectedPokemon,
                  name: event.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder={selectedPokemon.type}
              value={selectedPokemon.type}
              onChange={(event) =>
                setSelectedPokemon({
                  ...selectedPokemon,
                  type: event.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder={selectedPokemon.weight}
              value={selectedPokemon.weight}
              onChange={(event) =>
                setSelectedPokemon({
                  ...selectedPokemon,
                  weight: event.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder={selectedPokemon.image}
              value={selectedPokemon.image}
              onChange={(event) =>
                setSelectedPokemon({
                  ...selectedPokemon,
                  image: event.target.value,
                })
              }
            />
            <input type="submit" value="Enregistrer" />
          </form>
        )}
      </div>
    </div>
```

La première partie de ce formulaire est une balise `select` qui contient autant d'`options` qu'il existe de pokemon. Rappelez-vous du checkpoint 2 lorsque nous avons utilisé la méthode `map` de la même façon !

Quand nous choisissons une options, alors le `select` va subir un changement. Et c'est à ce moment là que nous stockons la valeur de l'option (qui est l'id du pokemon `<option key={pokemon.id} value={pokemon.id}>`) dans le state `selectedValue`. La `value` finale de notre `select` sera alors `selectedValue` :

```
      <select
        onChange={(event) => setSelectedValue(event.target.value)}
        value={selectedValue}
      >
```

Nous allons ensuite récupérer les datas du pokemon sélectionné :

```
const getOnePokemon = (id) => {
    axios.get(`http://localhost:5000/pokemon/${id}`).then((response) => {
      setSelectedPokemon({
        id: response.data.id || null,
        name: response.data.name || "",
        type: response.data.type || "",
        weight: response.data.weight || "",
        image: response.data.image || "",
      });
    });
  };
```

Les deux valeurs possibles lorsque nous allons stocker la data reçue dans `selectedPokemon` seront la data ou alors une string vide ou null afin d'éviter les bugs au montage du composant.

Puis nous utilisons ces données pour remplir les différents `input text` du formulaire. Exemple :

```
  <input
              type="text"
              placeholder={selectedPokemon.weight}
              value={selectedPokemon.weight}
              onChange={(event) =>
                setSelectedPokemon({
                  ...selectedPokemon,
                  weight: event.target.value,
                })
              }
            />
```

**RAPPEL :** Cette syntaxe nous permet de mettre à jour dynamiquement notre objet sans écraser les autres propriété de l'objet :

```
setSelectedPokemon({
                  ...selectedPokemon,
                  weight: event.target.value,
                })
```

## Envoyer les changements à la BDD 

Maintenant que nos states contiennent les nouvelles informations de notre pokemon, nous pouvons utiliser `axios` :

```
  const updatePokemon = (id) => {
    axios
      .put(`http://localhost:5000/pokemon/${id}`, {
        name: selectedPokemon.name,
        type: selectedPokemon.type,
        weight: selectedPokemon.weight,
        image: selectedPokemon.image,
      })
      .then((response) => {
        console.info(response);
      });
  };
```

La fonction `axios.put` prend deux paramètres : le lien et ce qu'il y aura dans le `req.body`.

## Rappel sur les useEffect

Nous avons utilisé sur cette page trois fois le useEffect :

```
  useEffect(() => {
    getPokemonList();
  }, []);

  useEffect(() => {
    getOnePokemon(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    console.info(selectedPokemon);
  }, [selectedPokemon]);
```

Le premier sert à récupérer tous les pokemons de la bdd lorsque nous montons le composant.
Le second permet d'avoir les informations d'un pokemon selon son id. Il s'execute lorsque la valeur de `selectedValue` change.
Le troisième fait juste un `console.info` de `selectedPokemon` lorsque la valeur de celui-ci change !
