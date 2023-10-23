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

module.exports = checkIfGoodUser;
