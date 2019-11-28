const knex = require("./db.js");

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
  knex("place")
    .insert(newPlace)
    .then(res => {
      console.log("Created gookbab place: ", { id: res.insertID, ...newPlace });
      result(null, { id: res.insertID, ...newPlace });
    })
    .catch(err => {
      printError(err, result);
    });
};

GookbabPlace.findById = (gookbabPlaceId, result) => {
  knex
    .from("place")
    .where({ id: gookbabPlaceId })
    .then(res => {
      if (res.length) {
        console.log("found place: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    })
    .catch(err => {
      printError(err, Result);
    });
};

GookbabPlace.getAll = result => {
  knex
    .from("place")
    .select()
    .then(res => {
      console.log("places: ", res);
      result(null, res);
    })
    .catch(err => {
      console.log("error: ", err);
      result(null, err);
      return;
    });
};

GookbabPlace.updateById = (id, place, result) => {
  knex("place")
    .where("id", id)
    .update({
      name: place.name,
      lowprice: place.lowprice,
      highprice: place.highprice
    })
    .then(res => {
      if (res.affectedRows == 0) {
        result({ kind: "not found" }, null);
        return;
      }
      console.log("updated place: ", { id: id, ...place });
      result(null, { id: id, ...place });
    })
    .catch(err => {
      console.log("error: ", err);
      result(null, err);
      return;
    });
};

GookbabPlace.remove = (id, result) => {
  knex("place")
    .where("id", id)
    .del()
    .then(res => {
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted place with id: ", id);
      result(null, res);
    })
    .catch(err => {
      console.log("error: ", err);
      result(null, err);
      return;
    });
};

GookbabPlace.removeAll = result => {
  knex("place")
    .del()
    .then(res => {
      console.log(`deleted ${res.affectedRows} places`);
      result(null, res);
    })
    .catch(err => {
      console.log("error: ", err);
      result(null, err);
      return;
    });
};

module.exports = GookbabPlace;
