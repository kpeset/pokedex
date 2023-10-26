const models = require("../models");

const browse = (req, res) => {
  models.pokemon
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.pokemon
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const searchByType = (req, res) => {
  const { type } = req.params;
  models.pokemon.findByType(type).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows);
    }
  });
};

const searchByName = (req, res) => {
  const { name } = req.params;
  models.pokemon.findByName(name).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows);
    }
  });
};

const add = (req, res) => {
  const pokemon = req.body;

  models.pokemon
    .insert(pokemon)
    .then(([result]) => {
      console.info(result);
      res.status(200).send("Le pokemon a bien été ajouté");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur de sauvegarde");
    });
};

const edit = (req, res) => {
  const { id } = req.params;
  const pokemon = req.body;

  console.error("test", pokemon);

  models.pokemon
    .update(pokemon, id)
    .then(([result]) => {
      console.info(result);
      res.status(200).send("Le pokemon a bien été modifié");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur lors de la modification");
    });
};

const destroy = (req, res) => {
  const { id } = req.params;

  models.pokemon.delete(id).then(([result]) => {
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send("Pokemon supprimé avec succès");
    }
  });
};

const sendJobData = (req, res) => {
  res.status(200).json({
    titre: "développeur",
    contrat: "CDI",
  });
};

module.exports = {
  browse,
  read,
  searchByType,
  searchByName,
  add,
  edit,
  destroy,
  sendJobData,
};
