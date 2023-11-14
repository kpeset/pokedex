const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
  constructor() {
    super({ table: "messages" });
  }

  sendMessage(sender, receiver, content) {
    return this.database.query(
      `
            INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)
        `,
      [sender, receiver, content]
    );
  }

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

  listMessages(sender, receiver) {
    return this.database.query(
      `
        SELECT
        messages.*,
        sender.email AS sender_email,
        receiver.email AS receiver_email
        FROM
        messages
        JOIN
            users AS sender ON messages.sender_id = sender.id
        JOIN
            users AS receiver ON messages.receiver_id = receiver.id

        WHERE
        (messages.sender_id = ? AND messages.receiver_id = ?)
        OR (messages.sender_id = ? AND messages.receiver_id = ?)
        ORDER BY
         messages.timestamp ASC;
        `,
      [sender, receiver, receiver, sender]
    );
  }
}

module.exports = MessageManager;
