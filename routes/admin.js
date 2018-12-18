const express = require("express");
const adminRouter = express.Router();
const Brewery = require('../models/Brewery');
const Beer = require('../models/Beer');
const _ = require("lodash");
const uploadCloud = require('../config/cloudinary.js');


adminRouter.get("/add/beer", (req, res, next) => {
  Brewery.find().sort({name: 1})
  .then(breweries => {
    Beer.find().sort({name: 1}).then(beers => {
      res.render('admin/beer/add', {breweries, beers});
    })
  })
})

adminRouter.post("/add/beer", (req, res, next) => {
  const { name, brewery, vol, beertype, color, isSeasonal, isGlutenFree } = req.body; 
  const newBeer = new Beer({ name, brewery, vol, beertype, color, isSeasonal, isGlutenFree });

  newBeer.save()
  .then(() => {
    res.redirect("/admin/add/beer");
    console.log(`Nueva cerveza creada: ${newBeer.name}`);
  })
  .catch(err => {
    console.log(`Algo fue mal creando la cerveza`);
    res.render("admin/beer/add", { message: "Something went wrong" });
  })
})

adminRouter.get("/add/brewery", (req, res, next) => {
  Brewery.find().sort({name: 1})
  .then(breweries => {
    res.render('admin/brewery/add', {breweries});
  })
})

adminRouter.post("/add/brewery", (req, res, next) => {
  const { name, company, city, country, foundation_year } = req.body; 
  const image = req.file.url;
  const newBrewery = new Brewery({ name, company, city, country, foundation_year, image });

  newBrewery.save()
  .then(() => {
    res.redirect("/admin/add/brewery");
    console.log(`Nueva cerveza creada: ${newBrewery.name}`);
  })
  .catch(err => {
    console.log(`Algo fue mal creando la fábrica`);
    res.render("admin/brewery/add", { message: "Something went wrong" });
  })
})


module.exports = adminRouter;