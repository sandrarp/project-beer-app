const express = require("express");
const profileRouter = express.Router();
const User = require("../models/User");

profileRouter.get('/', (req, res, next) => {
  res.render('user/profile', { "message": req.flash("error") });
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


module.exports = profileRouter;