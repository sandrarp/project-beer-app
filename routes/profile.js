const express = require("express");
const profileRouter = express.Router();
const RelUserBeer = require("../models/RelUserBeer");
const Beer = require("../models/Beer");
const _ = require("lodash");

profileRouter.get('/', (req, res, next) => {
  if(req.user === null || req.user === undefined) {
    console.log(req.user);
    res.redirect('/');  
  }
  RelUserBeer.find({ user_id:req.user.id })
  .populate('beer_id', 'id name image city country')
  .then(rels => {
    let favs = _.filter(rels, {rel_type: 'favourite'});
    let pendants = _.filter(rels, {rel_type: 'pendant'});
    let testeds = _.filter(rels, {rel_type: 'tested'});
    console.log(favs);
    res.render('user/profile', {
      rels,
      favs, 
      pendants, 
      testeds
    });
  })
})

profileRouter.get('/edit', (req, res, next) => {
  res.render('user/profile', { "message": req.flash("error") });
})

profileRouter.get('/beers', (req, res, next) => {
  RelUserBeer.find({ user_id:req.user.id })
  .populate('beer_id', 'id name image city country')
  .then(rels => {
    res.render('user/profile', {rels});
  })
})


module.exports = profileRouter;