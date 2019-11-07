const sql = require("./db.js");

const GookbabPlace = function(place) {
  this.id = place.id;
  this.name = place.name;
  this.lowprice = place.lowprice;
  this.highprice = place.highprice;
};

function printError(err, result) {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
}

GookbabPlace.create = (newPlace, result) => {
  sql.query("INSERT INTO place SET ?", newPlace, (err, res) => {
    printError(err, result);

    console.log("Created gookbab place: ", { id: res.insertId, ...newPlace });
    result(null, { id: res.insertId, ...newPlace });
  });
};

GookbabPlace.findById = (gookbabPlaceId, result) => {
  sql.query(`SELECT * FROM place where id = ${gookbabPlaceId}`, (err, res) => {
    printError(err, result);

    if (res.length) {
      console.log("found place: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

GookbabPlace.getAll = result => {
  sql.query("SELECT * FROM place", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("places: ", res);
    result(null, res);
  });
};

GookbabPlace.updateById = (id, place, result) => {
  sql.query(
    "UPDATE place SET name = ?, lowprice = ?, highprice = ? WHERE id = ?",
    [place.name, place.lowprice, place.highprice, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated place : ", { id: id, ...place });
      result(null, { id: id, ...place });
    }
  );
};

GookbabPlace.remove = (id, result) => {
  sql.query("DELETE FROM place WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted place with id: ", id);
    result(null, res);
  });
};

GookbabPlace.removeAll = result => {
  sql.query("DELETE FROM place", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} places`);
    result(null, res);
  });
};

module.exports = GookbabPlace;
