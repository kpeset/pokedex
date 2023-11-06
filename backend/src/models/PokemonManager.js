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

  insert(pokemon, picture) {
    return this.database.query(
      `INSERT INTO pokemon (name, type, weight, image) VALUES (?, ?, ?, ?)`,
      [pokemon.name, pokemon.type, pokemon.weight, picture]
    );
  }

  update(pokemon, id) {
    return this.database.query(
      `UPDATE pokemon SET name = ?, type = ?, weight = ?, image = ? WHERE id = ?`,
      [pokemon.name, pokemon.type, pokemon.weight, pokemon.image, id]
    );
  }
}

module.exports = PokemonManager;
