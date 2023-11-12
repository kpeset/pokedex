const express = require("express");

const router = express.Router();

const pokemonControllers = require("./controllers/pokemonControllers");
const userControllers = require("./controllers/userControllers");

const authServices = require("./services/authServices");

const uploadMiddleware = require("./middlewares/upload");

const auth = require("./middlewares/auth");

router.get(
  "/admin_check",
  auth.checkIfIsAllowed,
  auth.checkIfAdmin,
  authServices.allowAccess
);

router.get("/user_check", auth.checkIfIsAllowed, authServices.allowAccess);

router.get("/pokemon", pokemonControllers.browse);
router.get("/pokemon/:id", pokemonControllers.read);
router.get("/pokemon/type/:type", pokemonControllers.searchByType);
router.get("/pokemon/name/:name", pokemonControllers.searchByName);

router.post(
  "/pokemon",
  uploadMiddleware.uploadFile,
  auth.checkIfIsAllowed,
  auth.checkIfAdmin,
  pokemonControllers.add
);
router.put(
  "/pokemon/:id",
  auth.checkIfIsAllowed,
  auth.checkIfAdmin,
  pokemonControllers.edit
);
router.delete(
  "/pokemon/:id",
  auth.checkIfIsAllowed,
  auth.checkIfAdmin,
  pokemonControllers.destroy
);

router.get(
  "/users",
  auth.checkIfIsAllowed,
  auth.checkIfAdmin,
  userControllers.getAllUsers
);

router.put("/users/:id", auth.hashPassword, userControllers.updateUser);

router.post(
  "/users",
  auth.validateUser,
  auth.hashPassword,
  userControllers.postUser
);

router.post("/login", auth.checkEmailIfExist, authServices.verifyPassword);

module.exports = router;
