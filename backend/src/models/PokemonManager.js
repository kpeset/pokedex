const AbstractManager = require("./AbstractManager");

class PokemonManager extends AbstractManager {
  constructor() {
    super({ table: "pokemon" });
  }

  findByType(type) {
    return this.database.query(`SELECT * FROM pokemon WHERE type = ?`, [type]);
  }

  findByName(name) {
    return this.database.query(`SELECT * FROM pokemon WHERE name LIKE ?`, [
      `${name}%`,
    ]);
  }
}

module.exports = PokemonManager;
