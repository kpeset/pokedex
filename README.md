# React - Formulaire de register

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin de créer des utilisateurs côté front. Nous aurons besoin de :

- Le hook useState pour la gestion des states du formulaire
- Axios pour faire la requête `post` vers le backend

## Explication du code

### Création du formulaire

Afin de créer un formulaire, l'utilisateur doit remplir trois champs :
- email
- password
- vérification du password

Ensuite l'email et le password seront envoyés au backend. Nous devons donc les stocker quelque part pour les envoyer. Nous allons comme à notre habitude utiliser `useState` :

```
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState("");
```

Ensuite nous allons créer notre `form` avec dedans nos trois `inputs` :

```
<input type="email" onChange={handleChangeEmail} />
```

Ici nous avons l'exemple pour le champ email. Lorsque l'on change sa valeur, nous executons la fonction `handleChangeEmail` :

```
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
```

Cette fonction va changer le state de `email`, et remplacer l'état initial par la valeur de la cible qui subit l'évenement.

### Soumission du formulaire

Notre formulaire va exécuter la fonction `sendRegisterData` lorsque celui-ci sera soumis :

```
const sendRegisterData = (event) => {
    event.preventDefault();

    if (password === checkedPassword) {
      axios
        .post("http://localhost:5000/users", {
          email,
          password,
        })
        .then((response) => {
          setSucces(response.data.message);
          setError(false);
          console.info(response);
        })
```

Avant de faire la requête `axios`, nous vérifions que le state `password` est bien égale à `checkedPassword`. Ensuite nous faisons la requête `post` avec dans le corps de formulaire un `email` et un `password`.

### Gestion des erreurs

Afin d'a
