const argon2 = require("argon2");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const models = require("../models");

const checkIfGoodUser = (req, res, next) => {
  const { email, password } = req.query;

  if (email === "admin@gmail.com" && password === "secret") {
    next();
  } else {
    res
      .status(403)
      .send(`Désolé ! Vous n'êtes pas autorisé à accéder à cette route...`);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

const checkEmailIfExist = (req, res, next) => {
  const { email } = req.body;

  models.user.searchByEmail(email).then(([user]) => {
    if (user.length !== 0) {
      // eslint-disable-next-line prefer-destructuring
      req.user = {
        email: user[0].email,
        role: "user",
        hashedPassword: user[0].hashedPassword,
        id: user[0].id,
      };
      next();
    } else {
      models.admin.searchByEmail(email).then(([admin]) => {
        if (admin.length !== 0) {
          // eslint-disable-next-line prefer-destructuring
          req.user = admin[0];

          req.user = {
            email: admin[0].email,
            role: "admin",
            hashedPassword: admin[0].hashedPassword,
          };

          next();
        } else {
          res.sendStatus(401);
        }
      });
    }
  });
};

const checkIfIsAllowed = (req, res, next) => {
  try {
    const { authToken } = req.cookies;

    if (!authToken) {
      return res.status(401).send("Désolé, mais c'est ciao !");
    }

    const payload = jwt.verify(authToken, process.env.JWT_SECRET);

    req.user = payload;

    return next();
  } catch {
    return res.sendStatus(401);
  }
};

const checkIfAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(500).send("Tu n'es pas admin");
  } else {
    next();
  }
};

const checkIfGoodId = (req, res, next) => {
  const { userId } = req.params;

  if (req.user.id !== parseInt(userId, 10)) {
    res.status(401).send("Accès interdit");
  } else {
    next();
  }
};

module.exports = {
  checkIfGoodUser,
  hashPassword,
  validateUser,
  checkEmailIfExist,
  checkIfIsAllowed,
  checkIfAdmin,
  checkIfGoodId,
};
