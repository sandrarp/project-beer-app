const express = require("express");
const profileRouter = express.Router();
const RelUserBeer = require("../models/RelUserBeer");
const Beer = require("../models/Beer");

profileRouter.get('/', (req, res, next) => {
  RelUserBeer.find({ user_id:req.user.id })
  .populate('beer_id', 'id name image city country')
  .then(rels => {
    res.render('user/profile', {rels});
  })
})

profileRouter.get('/edit', (req, res, next) => {
  res.render('user/profile', { "message": req.flash("error") });
})

profileRouter.get('/beers', (req, res, next) => {
  res.render('user/profile', { "message": req.flash("error") });
})

profileRouter.get('/beers/add', (req, res, next) => {
  res.render('user/add-beer', { "message": req.flash("error") });
})


profileRouter.get("/beers/rel", (req, res, next) => {
  RelUserBeer.find({ user_id:user.id })
  .then(rels => {
    res.status(200).json(rels);
  })
})

profileRouter.get("/beers/rel/:id?", (req, res, next) => {
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
      res.redirect("/profile");
    })
    .catch(err => {
      res.render('user/add-beer', { "message": req.flash("error") });
    })
  });
})


module.exports = profileRouter;