# React - Système de messagerie

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin d'afficher les conversations entre les utilisateurs.
<br>
<br>
## Les étapes

### Analyser les besoins

Nous avons besoin de plusieurs choses afin d'avoir une messagerie fonctionnelle côté front :
- Une page `Messages` pour afficher toutes les conversations
- Un composant `MessageCard`, enfant de `Messages` pour afficher le nom de l'utilisateur avec lequel on a discuté
- Une page `MessageDetails` pour afficher une conversation entre deux utilisateurs
- Un composant `MessageContent`, enfant de `MessageDetails` qui affichera le texte du message et la personne qui l'a envoyé.

<br>
<br>

### Lister les conversations

Nous avons crée la page `Messages.jsx`. C'est sur cette page que nous ferons la requête axios pour récupérer tous les messages :

```js
  const getAllConversations = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/messages/${userId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
```

La requête à l'intérieur de la fonction `getAllConversations` aura besoin de l'id de l'utilisateur (`userId`). Ici nous avons utilisé le localstorage mais nous aurions pu aussi utiliser celui qui est présent dans le context.

Nous exécuterons cette requête à chaque fois qu'on arrive sur la page grace au `useEffect` :

```js
  useEffect(() => {
    getAllConversations();
  }, []);
```

Puis comme d'habitude, nous stockons la réponses dans un état.

```js
  const [data, setData] = useState([]);
```



