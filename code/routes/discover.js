const express = require("express");
const discoveryRouter = express.Router();
const Brewery = require('../models/Brewery');
const Beer = require('../models/Beer');

discoveryRouter.get("/", (req, res, next) => {
    res.render('discover');
})

discoveryRouter.get("/breweries", (req, res, next) => {
  Brewery.find().then(breweries => {
    res.render('discover/breweries/list', {breweries});
  })
})

discoveryRouter.get("/breweries/:id", (req, res, next) => {
  Brewery.findById(req.params.id)
  .then(brewery => {
    Beer.find({ brewery:req.params.id }).then(beers => {
      console.log(beers);
      res.render('discover/breweries', {
        brewery, 
        beers
      });
    })
  })
})

discoveryRouter.get("/beers", (req, res, next) => {
  Beer.find()
  .populate('brewery', 'id name city country')
  .then(beers => {
    res.render('discover/beers/list', {beers});
    console.log(beers);
  })
})

discoveryRouter.get("/beers/:id", (req, res, next) => {
  Beer.findById(req.params.id)
  .populate('brewery', 'name city country image')
  .then(beer => {
    res.render('discover/beers', {beer});
    console.log(beers);
  })
})

module.exports = discoveryRouter;