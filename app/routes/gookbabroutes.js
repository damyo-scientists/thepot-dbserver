module.exports = app => {
  const gookbabPlace = require("../controllers/gookbabcontroller");

  app.post("/gookbabPlace", gookbabPlace.create);

  app.get("/gookbabPlace", gookbabPlace.findAll);

  app.get("/gookbabPlace/:gookbabPlaceId", gookbabPlace.findOne);

  app.put("/gookbabPlace/:gookbabPlaceId", gookbabPlace.update);

  app.delete("/gookbabPlace/:gookbabPlaceId", gookbabPlace.delete);

  app.delete("/gookbabPlace", gookbabPlace.deleteAll);
};
