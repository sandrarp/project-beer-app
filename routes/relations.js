const express = require("express");
const relationsRouter = express.Router();
const User = require("../models/User");
const Beer = require("../models/Beer");
const RelUserBeer = require("../models/RelUserBeer");
const BeerDrunk = require("../models/BeerDrunk");

relationsRouter.get('/beers/add', (req, res, next) => {
  res.render('user/add-beer', { "message": req.flash("error") });
})

relationsRouter.get("/beers/rel/:id?", (req, res, next) => {
  let user_id = req.user.id;
  let beer_id = req.params.id;
  let rel_type = req.query.type;
  RelUserBeer.findOne({ user_id, beer_id, rel_type }, (err, rel) => {
    if (rel !== null) {
      console.log(`Ya existe esta relación, se borrará`);
      RelUserBeer.findOneAndDelete(rel._id, (err, next) => {
        console.log(`Relación eliminada`);
        res.redirect("/profile");
      })
      return;
    }

    const newRel = new RelUserBeer({
      user_id,
      beer_id,
      rel_type
    });

    newRel.save()
    .then(() => {
      console.log(`New relation created`);
      // res.render("/");
      res.redirect('back');
    })
    .catch(err => {
      res.render('user/add-beer', { "message": req.flash("error") });
    })
  });
})

module.exports = relationsRouter;

