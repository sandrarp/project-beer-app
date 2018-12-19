const express = require("express");
const adminRouter = express.Router();
const Brewery = require('../models/Brewery');
const Beer = require('../models/Beer');
const _ = require("lodash");
const uploadCloud = require('../config/cloudinary');


adminRouter.get("/add/beer", (req, res, next) => {
  Brewery.find().sort({name: 1})
  .then(breweries => {
    Beer.find().sort({name: 1}).then(beers => {
      res.render('admin/beer/add', {breweries, beers});
    })
  })
})

adminRouter.post("/add/beer", uploadCloud.single('photo'), (req, res, next) => {
  const { name, brewery, vol, beertype, color, isSeasonal, isGlutenFree } = req.body; 
  const newBeer = new Beer({ name, brewery, vol, beertype, color, isSeasonal, isGlutenFree });
  if(req.file !== undefined) {
    const image = req.file.url;
    newBeer.image = image;
  }
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

adminRouter.post("/add/brewery", uploadCloud.single('photo'), (req, res, next) => {
  const { name, company, city, country, foundation_year } = req.body; 
  const newBrewery = new Brewery({ name, company, city, country, foundation_year });
  if(req.file !== undefined) {
    const image = req.file.url;
    newBrewery.image = image;
  }

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

adminRouter.post('beer/image/change/:id', uploadCloud.single('photo'), (req, res, next) => {
  console.log(req.params.id);
  Beer.findById(req.params.id)
  .then(beer => {
    if(req.file !== undefined) {
      const image = req.file.url;
      beer.image = image;
    }
    console.log(beer);
    res.render('/');
  }).catch(e => {
    console.log(`ERROR: ${e}`);
  })
})

adminRouter.post('brewery/image/change/:id', uploadCloud.single('photo'), (req, res, next) => {
  Beer.findById(req.params.id)
  .then((err, beer) => {
    console.log(beer);
    if(beer !== undefined) {
      console.log(`VAmos a cambaiarle la foto a ${beer.name}`);
      res.render('/');
    } else {
      Brewery.findById(req.params.id).then((err, brewery) => {
        console.log(`VAmos a cambaiarle la foto a ${brewery.name}`);
        res.render('/');
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.render('/');
  })
  
/*   const image = req.file.url;
  newBrewery.image = image; */
})


module.exports = adminRouter;