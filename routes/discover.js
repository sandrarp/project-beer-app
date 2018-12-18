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
      console.log(beers);
      res.render('discover/breweries', {
        brewery, 
        beers
      });
    })
  })
})

discoveryRouter.get("/beers", (req, res, next) => {
  let user_id = req.user.id;
  Beer.find()
  .populate('brewery', 'id name city country image')
  .populate('relation')
  .then(beers => {
    beers.forEach(beer  => {
      console.log(beer.relation);
    }) 
    res.render('discover/beers/list', {beers});
  });

  //   return Promise.all(
  //   beers.forEach(beer => {
  //     let relations = [];
  //       RelUserBeer.find({ user_id, beer_id:beer._id}, 'rel_type')
  //       .then(rels => {
  //         console.log(`${beer.name} tiene ${rels.length} relaciones`);
  //         rels.forEach(rel => {
  //           relations.push(rel.rel_type);
  //         })
  //       })
  //       return {
  //         ...beer,
  //         rels: relations,
  //       }
  //     })
  //   )
  // })
  // .then(beers => {
  //     console.log(beers);
  // })
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