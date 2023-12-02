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

