const express = require("express");

const router = express.Router();

const pokemonControllers = require("./controllers/pokemonControllers");
const userControllers = require("./controllers/userControllers");

const openingHours = require("./middlewares/openingHours");

const authServices = require("./services/authServices");

const uploadMiddleware = require("./middlewares/upload");

const auth = require("./middlewares/auth");

router.get("/pokemon", auth.checkIfIsAllowed, pokemonControllers.browse);
router.get("/pokemon/:id", openingHours, pokemonControllers.read);
router.get("/pokemon/type/:type", pokemonControllers.searchByType);
router.get("/pokemon/name/:name", pokemonControllers.searchByName);

router.post("/pokemon", uploadMiddleware.uploadFile, pokemonControllers.add);
router.put("/pokemon/:id", pokemonControllers.edit);
router.delete("/pokemon/:id", pokemonControllers.destroy);

router.get("/users", userControllers.getAllUsers);
router.post(
  "/users",
  auth.validateUser,
  auth.hashPassword,
  userControllers.postUser
);
router.put("/users/:id", auth.hashPassword, userControllers.updateUser);

router.post("/login", auth.checkEmailIfExist, authServices.verifyPassword);

router.post(
  "/test",
  uploadMiddleware.uploadFile,
  pokemonControllers.checkUpload
);

module.exports = router;
