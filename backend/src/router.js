const express = require("express");

const router = express.Router();

const pokemonControllers = require("./controllers/pokemonControllers");

router.get("/pokemon", pokemonControllers.browse);
router.get("/pokemon/:id", pokemonControllers.read);
router.get("/pokemon/type/:type", pokemonControllers.searchByType);
router.get("/pokemon/name/:name", pokemonControllers.searchByName);

module.exports = router;
