# React - Les rôles : partie 2 (useContext, Private Routes)

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin d'améliorer l'expérience de l'utilisateur par rapport aux services qu'il peut utiliser selon son rôle après connexion.
<br>
<br>
## Rôles et context

### Enregistrer les informations de l'utilisateur après connexion

Lorsque nous nous connectons sur la page login, nous recevons en réponse dorénavant notre rôle. Nous pouvons l'enregistrer dans le localStorage : 

```js
      .then((response) => {
        console.info(response);
        localStorage.setItem("role", response.data.role);
        setError(false);
        navigateToHomepage();
      })
```

Une fois fait, nous pouvons exécuter la fonction `navigateToHomepage` qui nous permet d'être redirigé vers la page d'accueil :

```js
  const navigateToHomepage = () => {
    window.location.href = "/";
  };
```

**ATTENTION** : utiliser `window.location` nous fait sortir des principes de React car cela entraine le raffraichissement du DOM. Dans notre cas, nous avons besoin de raffraichir le DOM pour mettre à jour notre navbar. Néanmoins, il existe d'autres solutions qui nous permettent de mettre à jour notre navbar. Je vous invite à vous renseigner dessus.

<br>
<br>

### Création du context

Nous avons crée un fichier `Context.jsx` dans le dossiers `contexts` :

```js
import { createContext, useState } from "react";

const Context = createContext();

function Provider({ children }) {
  const [infoUser, setInfoUser] = useState({
    role: localStorage.getItem("role")
  });

  return (
    <Context.Provider value={{ infoUser, setInfoUser }}>
      {children}
    </Context.Provider>
  );
}

const ExportContext = {
  Context,
  Provider,
};

export default ExportContext;
```

Celui-ci nous permet de pouvoir accéder depuis n'importe où dans notre application au state `infoUser`. Il est important de savoir que l'on peut ajouter ce qu'on veut dans l'objet `infoUser`. Nous pouvons ajouter l'id, l'email etc...

Pensez bien à exporter votre context dans `Main.jsx` : 

```js
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ExportContext from "./contexts/Context";
import "./styles/app.css";
import "./styles/nav.css";
import "./styles/footer.css";
import "./styles/register.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ExportContext.Provider>
        <App />
      </ExportContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
```

<br>
<br>

### Mise à jour de la navbar

Nous avons ensuite mis à jour la navbar de la façon suivante :
- Si un utilisateur n'est pas connecté, il ne peut accéder qu'au login, register et à la liste des pokemon
- Si un admin est connecté, il peut accéder au backoffice et à la liste des pokemon
- Si un utilisateur est connecté, il peut accéder qu'à la liste des pokemon

Nous avons donc besoin de consommer notre context dans `Navbar.jsx`.


Nous devons d'abord exporter `useContext` puis notre context :

```js
import { useContext } from "react";
import ExportContext from "../contexts/Context";
```

Et pour utiliser ce que l'on souhaite, nous allons utiliser le destructuring sur notre context :

```js
  const { infoUser } = useContext(ExportContext.Context);
```

Ici nous utiliserons uniquement `infoUser` qui provient du context.

Maintenant nous pouvons utiliser ces informations pour ajouter des conditions à notre navbar en utilisant les ternaires :

```jsx
{infoUser.role === "admin" ? (
          <>
            <li>
              <Link to="/backoffice">Backoffice</Link>
            </li>

            <li>
              <Link to="/updatePokemon">UpdatePokemon</Link>
            </li>
          </>
        ) : (
          ""
        )}
```

Si `infoUser.role` est `admin` alors nous afficherons les liens du backoffice. Sinon nous afficherons une chaine de caractères vide.

<br>
<br>

## Rôles et Routes privées

Ce n'est pas parce qu'un utilisateur ne peut pas voir le lien **backoffice** qu'il ne peut pas y accéder si il entre à la main l'url **/backoffice** dans son URL.
C'est pour cela que nous devons maintenant créer des **route privées**.

Nous allons créer un composant `PrivateRoute` dans le dossier `services`. Il va nous aider à gérer la navigation et l'accès aux routes privées dans notre application : 

```js
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ isAllowed, children }) {
  if (!isAllowed) {
    return <Navigate to="/" />;
  }
  return children;
}
```







  
