# React - Formulaire de connexion

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin de se connecter côté front. Nous aurons besoin de :

- Le hook useState pour la gestion des states du formulaire
- Axios pour faire la requête `post` vers le backend

## Explication du code

### Création du formulaire

Comme pour le register, nous allons créer le même genre de formulaire. Si vous avez besoin de plus de détails concernant la création d'un formulaire, je vous conseille de vous rendre sur [**React - Formulaire de register**](https://github.com/kpeset/pokedex/tree/step_09).

Nous avons crée notre formulaire de connexion :

```jsx
      <form className="register_form" onSubmit={sendCredentials}>
        <p>Email</p>
        <input type="text" onChange={handleChangeEmail} />
        <p>Password</p>
        <input type="text" onChange={handleChangePassword} />
        <input
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "1rem 0",
          }}
          type="submit"
          value="Se connecter"
        />
      </form>
```

Puis nous exécutons la fonction `sendCredentials` lorsque le formulaire est soumis :

```js
  const sendCredentials = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.info(response);
        setError(false);
        navigateToHomepage();
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };
```

Cas particulier ici. Nous avons dans notre méthode `post` trois paramètres :
- La route du backend
- Le body
- Un objet qui contient la propriété `withCredentials` qui est à `true`

La propriété `withCredentials` va nous permettre de transmettre les informations d'identification telles que les cookies au server.

Mais ce qui marche dans un sens ne marchera pas dans l'autre. Il faut aussi dire au backend de faire la même chose. Nous devons nous rendre dans `app.js` du backend et ajouter après `optionsSuccessStatus: 200,` la ligne suivante :

```js
    credentials: true,
```
