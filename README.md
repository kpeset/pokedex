# React - Création d'une barre de recherche fonctionnelle

## Objectif de l'atelier
Lors de cet atelier, nous avons vu comment créer une barre de recherche fonctionnelle qui va faire une requête API vers une route bien précise.
## Explication du code
### La search bar

La search bar est avant tout un formulaire. Ce formulaire contient un `input type text` et un `input type submit`. Notre `input type text` sera à l'écoute du moindre changement dans le champ de recherche avec l'utilisation de `onChange`. Lors de la soumission du formulaire (`onSubmit`), une fonction handleSubmit va s'executer :
```
<form className="search_bar" onSubmit={handleSubmit}>
  <input type="text" placeholder="Cherchez un pokémon..." onChange={handleSearch} />
  <input type="submit" value="Rechercher" />
</form>
```

Notre fonction `handleSearch` enregistrera chaque changement de valeur de notre `input type text` dans le state `useResearch` :

```
const handleSearch = (event) => {
  setUserResearch(event.target.value)
}
```

Puis nous lançons la fonction `handleSubmit` à la soumission du formulaire qui nous redigera vers le path `/search/ce_qu_on_lui_dit_de_rechercher_avec_le_staye_userReasearch` :

```
const handleSubmit = () => {
  navigate(`/search/${userResearch}`)
}
```
**NOTE :** Ici nous utilisons le hook useNavigate :

```
// importation du hook
import { useNavigate } from "react-router-dom"

// mettre le hook dans une variable
const navigate = useNavigate()

// utilisation de notre variable
navigate(`/search/${userResearch}`)
```

### Création de la route et de la page SearchResult

Dans notre composant `Content`, nous ajoutons la route suivante :

```
<Route path="/search/:userResearch" element={<SearchResult />} />
```

Cette route qui nous conduit vers la page `SearchResult` a le path `/search/` qui aura des params `:userResearch`.
Ce sont ces params que nous allons récupérer dans la page `SearchResult` de la façon suivante :

```
const { userResearch } = useParams()
```

**Rappel :** `{userResearch}` est le même que `:userResearch` qui se trouve dans nos routes. Et `:userResearch` sont les params envoyés depuis notre search bar à travers le state `userResearch`.

Maintenant nous faisons une requête API avec les params :

```
axios
.get(`http://localhost:8000/pokemons/name/${userResearch}`)
```

**Note :** Donc si dans nos params il y a **salameche** alors la requête api sera `http://localhost:8000/pokemons/name/salameche`

Une fois que nous avons le résultat de notre requête API, nous réutilisons notre composant `PokemonCard` avec pour valeur de props, le résultat de la requête API :

```
{data.map((result) => <PokemonCard key={result.id} details={result} />)}
```
