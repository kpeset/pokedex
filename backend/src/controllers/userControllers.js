const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

const getAllUsers = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postUser = (req, res) => {
  const { email, hashedPassword } = req.body;

  models.user
    .insert(email, hashedPassword)
    .then(([result]) => {
      console.info(result);
      res.status(200).json({ message: "Utilisateur crée avec succès", email });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  console.info("ID qui est dans mes params :", id);
  const { email, hashedPassword } = req.body;
  console.info("Email :", email);
  console.info("hashedPassword :", hashedPassword);

  models.user.update(email, hashedPassword, id).then(([result]) => {
    console.info(result);
    res
      .status(200)
      .json({
        Message: "L'utilisateur a été modifié avec succès",
      })
      .catch((err) => {
        console.info(err);
        res.status(500).json({
          Message: "Erreur lors de la modification",
        });
      });
  });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: req.user.id,
          email: req.user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.cookie("authToken", token);

        res.status(200).send("Connexion réussie");
      } else {
        res.sendStatus(401);
      }
    });
};

module.exports = { getAllUsers, postUser, updateUser, verifyPassword };
