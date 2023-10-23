const openingHoursMiddleware = (req, res, next) => {
  const currentHour = new Date().getHours();
  const openingHour = 13;
  const closingHour = 17;

  if (currentHour >= openingHour && currentHour < closingHour) {
    next();
  } else {
    res.status(403).send("Désolé, le centre pokemon est fermé");
  }
};

module.exports = openingHoursMiddleware;
