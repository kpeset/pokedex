CREATE TABLE `pokedex`.`pokemon` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `weight` FLOAT NOT NULL,
  `image` TEXT NOT NULL,
  PRIMARY KEY (`id`));

-- INSERT INTO `pokemon` (`name`, `type`, `weight`, `image`)
-- VALUES
-- ("Pikachu", "Electrique", 6, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"),
-- ("Bulbizarre", "Plante", 6.9, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"),
-- ("Salameche", "Feu", 8.5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"),
-- ("Carapuce", "Eau", 9, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png"),
-- ("Rondoudou", "Normal", 5.5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png"),
-- ("Miaouss", "Normal", 4.2, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/052.png"),
-- ("Psykokwak", "Eau", 19.6, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png"),
-- ("Machoc", "Combat", 19.5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/066.png"),
-- ("Racaillou", "Roche", 20, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png"),
-- ("Ramoloss", "Eau", 36, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/079.png"),
-- ("Fantominus", "Spectre", 0.1, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/092.png"),
-- ("Onix", "Roche", 210, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/095.png"),
-- ("Voltorbe", "Electrique", 10.4, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/100.png"),
-- ("Osselait", "Sol", 6.5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/104.png"),
-- ("Kicklee", "Combat", 49.8, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/106.png"),
-- ("Tygnon", "Combat", 50.2, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/107.png"),
-- ("Excelangue", "Normal", 65.5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/108.png"),
-- ("Smogo", "Poison", 1, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/109.png"),
-- ("Rhinocorne", "Sol", 115, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/111.png"),
-- ("Leveinard", "Normal", 34.6, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/113.png"),
-- ("Saquedeneu", "Plante", 35, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/114.png"),
-- ("Kangourex", "Normal", 80, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/115.png"),
-- ("Hypotrempe", "Eau", 8, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/116.png"),
-- ("Poissirene", "Eau", 15, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/118.png"),
-- ("Stari", "Eau", 34.5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/120.png"),
-- ("Tauros", "Normal", 88.4, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/128.png"),
-- ("Leviator", "Eau", 235, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/130.png"),
-- ("Lokhlass", "Eau", 220, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/131.png"),
-- ("Evoli", "Normal", 6.5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png"),
-- ("Ronflex", "Normal", 460, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png"),
-- ("Dracolosse", "Dragon", 210, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png"),
-- ("Mewtwo", "Psy", 122, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png"),
-- ("Feunard", "Feu", 19.9, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/038.png");

CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO `users` (`email`, `hashedPassword`)
VALUES
("kevin@gmail.com", "$argon2id$v=19$m=65536,t=5,p=1$4OfSPAVkqfqUdLKEdK66Qw$rcfxXDNIU6UdBsabM7t2IZbe4hQe4xBvOh8Wh5pK+qg");

CREATE TABLE admin (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO `admin` (`email`, `hashedPassword`)
VALUES
("admin@gmail.com", "$argon2id$v=19$m=65536,t=5,p=1$ikpFm/0Ded52TiFU08Y2uw$MkLfR6uw5vFZbB0vBOmbrUIWumck3tS0K8TWj9aDpWw");
