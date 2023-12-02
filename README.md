# Express / React - Newsletter et envoi d'émails

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code afin d'afficher les conversations entre les utilisateurs.
Je ne vais pas revenir sur des explications liées aux `Props`. En cas de problèmes, consultez la doc, les quêtes ou le support [**Harry Potter**](https://github.com/kpeset/hp-support-for-react/tree/step_01).
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

Et c'est sur `data`que nous allons boucler pour afficher le composant `<MessageCard />` autant de fois qu'il y a de conversations dans data :

```jsx
      {data.map((contact) => (
        <>
          <MessageCard contact={contact} />
          <Link
            key={contact.userId}
            to={`/messages/${userId}/${contact.userId}`}
          >
            Voir la conversation
          </Link>
        </>
      ))}
```

Le composant `Link` permet de rediriger l'utilisateur vers la route messages qui aura deux params : l'id de l'utilisateur, et l'id de la personne dont on a reçu la data.

<br>
<br>

### Échanges de messages

Nous allons ici avoir deux requêtes axios différentes. 
La première est celle qui permet d'afficher les messages échangés :

```js
  const getConversation = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/messages/sender/${sender}/receiver/${receiver}`
      )
      .then((response) => {
        setData(response.data.result);
      })
      .catch();
  };
```

Le sender et le receiver proviennent des params que l'on récupère :

```js
  const { sender, receiver } = useParams();
```

Maintenant, nous voulons exécuter `getConversation` toutes les 5 secondes afin de raffraichir la conversation :

```js
  useEffect(() => {
    const interval = setInterval(() => {
      getConversation();
    }, 5000);
    return () => clearInterval(interval);
  });
```

Puis nous bouclerons sur `data` afin de lister tous les messages échangés :

```jsx
      {data.map((message) => (
        <MessageContent message={message} />
      ))}
```

La seconde requête axios, sera exécutée lorsque le formulaire sera soumis :

```js
  const sendMessage = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/send-message`, {
        sender,
        receiver,
        content,
      })
      .then((response) => {
        console.info(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
```

Trois choses sont présentes dans le body de la requête :
- le sender
- le receiver
- le contenu

**ATTENTION : ** N'oubliez pas créer un middleware qui vérifie l'authenticité de l'utilisateur. Le code est présent sur cette branche.




