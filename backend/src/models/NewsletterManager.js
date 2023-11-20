const AbstractManager = require("./AbstractManager");

class NewsletterManager extends AbstractManager {
  constructor() {
    super({ table: "newsletter" });
  }

  // C'EST ICI QU'ON VA METTRE TOUTES NOS METHODES DE REQUETES

  insert(email) {
    return this.database.query(`INSERT INTO newsletter (email) VALUES (?)`, [
      email,
    ]);
  }
}

module.exports = NewsletterManager;
