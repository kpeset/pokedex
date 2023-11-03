const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

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

        res.status(200).json({
          message: "Connexion réussie",
          role: req.user.role,
        });
      } else {
        res.sendStatus(401);
      }
    });
};

module.exports = { verifyPassword };
