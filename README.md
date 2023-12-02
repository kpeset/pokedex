# Express - Messagerie

## Objectif de l'atelier

Dans cet atelier, nous allons créer la logique de code côté Backend afin de créer un système de messagerie entre utilisateurs.


## Analyse du code

### Création d'une table pour les messages

Afin de stocker les messages dans notre BDD nous allons avoir besoin de créer une nouvelle table :

```SQL
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT,
  receiver_id INT,
  content TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);
```

- id : Chaque message crée aura un id auto incrémenté
- sender_id : id de l'utilisateur qui envoie le message. Cet id est une clé étrangère faisant référence à l'id de la table users.
- receiver_id : id du destinataire. Cet id est une clé étrangère faisant référence à l'id de la table users.
- content : le contenu du message
- timestamp : la date et heure actuelle du message crée

<br>
<br>

### Logique de code

La question à se poser est : que fait un système de messagerie ?
Une messagerie nous permet :
- d'envoyer des messages entre utilisateurs
- lister les utilisateurs avec qui on a eu une conversation
- accéder à la conversation complète

Nous aurons donc besoin d'un controller et d'un manager. Pour la création de ces fichiers, je vous invite à revoir les branches précédentes.

La première chose à faire est de faire une requête qui permet à un utilisateur A, d'envoyer un message à un utilisateur B.

Nous allons dans notre manager créer une fonction `sendMessage` qui prend trois paramètres (sender_id, receiver_id et content) :

```js
  sendMessage(sender, receiver, content) {
    return this.database.query(
      `
            INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)
        `,
      [sender, receiver, content]
    );
  }
```

Cette insère un nouveau message dans la base de données, en utilisant les identifiants de l'expéditeur et du destinataire ainsi que le contenu du message. 
Elle sera ensuite exécuté par un controller :

```js
const sendMessageBetweenUsers = (req, res) => {
  const { sender, receiver, content } = req.body;

  models.message
    .sendMessage(sender, receiver, content)
    .then(([result]) => {
      console.info(result);
      res.status(200).json({
        message: "Message envoyé avec succès",
        sender,
        receiver,
        content,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};
```

Intéressons-nous maintenant à la requête pour lister les conversations qu'un user à pu avoir :

```js
  listConversations(userId) {
    return this.database.query(
      `
        SELECT
        other_user.id AS userId,
        other_user.email AS userEmail,
        MAX(messages.timestamp) AS lastMessageTime
        FROM
        messages
        INNER JOIN
        users AS other_user ON other_user.id = messages.sender_id OR other_user.id = messages.receiver_id
        WHERE
        (messages.sender_id = ? OR messages.receiver_id = ?)
        AND other_user.id != ?
        GROUP BY other_user.id
        ORDER BY lastMessageTime DESC;
    `,
      [userId, userId, userId]
    );
  }
```

La fonction prend un seul paramètre userId, qui représente l'identifiant de l'utilisateur dont on veut lister les conversations.

Il y a une jointure (INNER JOIN) entre la table messages et la table users.

La requête filtre les messages où l'utilisateur actuel (userId) est soit l'expéditeur soit le destinataire puis on exclut les enregistrements où other_user.id est égal à userId pour éviter de lister l'utilisateur lui-même.

Puis nous trions les résultats par date en ordre décroissant (DESC), montrant ainsi les conversations les plus récentes en premier.
