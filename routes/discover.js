const express = require("express");
const discoveryRouter = express.Router();
const Brewery = require('../models/Brewery');
const Beer = require('../models/Beer');
const RelUserBeer = require('../models/RelUserBeer');
const _ = require("lodash");

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
    Beer.find({ brewery:req.params.id }).sort({name: 1}).then(beers => {
      res.render('discover/breweries', {
        brewery, 
        beers
      });
    })
  })
})

discoveryRouter.get("/beers", (req, res, next) => {
  if(req.user !== undefined) {
    let user_id = req.user.id;
  }
  Beer.find()
  .populate('brewery', 'id name city country image')
  .populate('relation', 'rel_type')
  .then(beers => {
    const newBeers = beers.map(beer  => {
      return {
        beer,
        tested: () => {
          return beer.relation.find(rel => rel.rel_type === 'tested') !== undefined;
        },
        pendant: () => {
          return beer.relation.find(rel => rel.rel_type === 'pendant') !== undefined;
        },
        favourite: () => {
          return beer.relation.find(rel => rel.rel_type === 'favourite') !== undefined;
        }
      }
    })
    res.render('discover/beers/list', {beers:newBeers});
  });
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