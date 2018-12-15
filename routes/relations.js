const express = require("express");
const relationsRouter = express.Router();
const User = require("../models/User");
const Beer = require("../models/Beer");

relationsRouter.get('/', (req, res, next) => {
  res.render('user/profile', { "message": req.flash("error") });
})

relationsRouter.get('/edit', (req, res, next) => {
  res.render('user/profile', { "message": req.flash("error") });
})

relationsRouter.get('/beers', (req, res, next) => {
  res.render('user/profile', { "message": req.flash("error") });
})

relationsRouter.get('/beers/add', (req, res, next) => {
  res.render('user/add-beer', { "message": req.flash("error") });
})


module.exports = relationsRouter;