React - Création du backoffice pour ajouter et supprimer un pokemon de la BDD côté Frontend

## Objectif de l'atelier

Dans cet atelier, nous allons faire une page côté React pour modifier un pokemon de notre BDD.

## Explication du code

### Préambule

Ici nous allons utiliser `axios` pour faire toutes nos requêtes.
Nous aurons aussi besoin d'utiliser les deux hooks de React : `useState` et `useEffect`

### Création du formulaire

La création du formulaire se révèle être un peu plus complexe que le formulaire pour créer un pokemon. Il existe autant de façon de faire qu'il y a de codeurs et codeuses. Voici comment nous, nous avons procédés :

```
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


