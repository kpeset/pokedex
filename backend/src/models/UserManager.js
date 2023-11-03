const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  // C'EST ICI QU'ON VA METTRE TOUTES NOS METHODES DE REQUETES

  insert(email, hashedPassword) {
    return this.database.query(
      `INSERT INTO users (email, hashedPassword) VALUES (?, ?)`,
      [email, hashedPassword]
    );
  }

  update(email, hashedPassword, id) {
    return this.database.query(
      `UPDATE users SET email = ?, hashedPassword = ? WHERE id = ?`,
      [email, hashedPassword, id]
    );
  }
}

module.exports = UserManager;
