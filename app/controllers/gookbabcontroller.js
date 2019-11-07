const GookbabPlace = require("../models/gookbabplace");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content is empty right now. Fill in please "
    });
  }

  const place = new GookbabPlace({
    name: req.body.name,
    lowprice: req.body.lowprice,
    highprice: req.body.highprice
  });

  GookbabPlace.create(place, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the GookbabPlace."
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  GookbabPlace.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving GookbabPlace"
      });
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  GookbabPlace.findById(req.params.gookbabPlaceId, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found GookbabPlace with id ${req.params.gookbabPlaceId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving GookbabPlace with id " + req.params.gookbabPlaceId
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  GookbabPlace.updateById(
    req.params.gookbabPlaceId,
    new GookbabPlace(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found GookbabPlace with id ${req.params.gookbabPlaceId}.`
          });
        } else {
          res.status(500).send({
            message:
              "Error updating GookbabPlace with id " + req.params.gookbabPlaceId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  GookbabPlace.remove(req.params.gookbabPlaceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found GookbabPlace with id ${req.params.gookbabPlaceId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete GookbabPlace with id " + req.params.gookbabPlaceId
        });
      }
    } else res.send({ message: `GookbabPlace was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  GookbabPlace.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all GookbabPlace"
      });
    } else {
      res.send({
        message: `All GookbabPlace were deleted successfully`
      });
    }
  });
};
