const express = require("express");
const profileRouter = express.Router();
const RelUserBeer = require("../models/RelUserBeer");
const Beer = require("../models/Beer");
const User = require("../models/User");
const _ = require("lodash");
const uploadCloud = require('../config/cloudinary');

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
  res.render('user/edit-profile', { "message": req.flash("error") });
})

profileRouter.post('/edit/image', uploadCloud.single('photo'), (req, res, next) => {
  User.findById(req.user.id)
  .then(user => {
    if(req.file !== undefined) {
      console.log(user);
      const image = req.file.url;
      console.log(user.image);
      user.image = image;
      console.log(user.image);
      user.save()
      .then(() => {
        res.redirect('/profile/edit');
      })
    } else {
      console.log(user);
      res.redirect('/profile/edit');
    }
  }).catch(e => {
    console.log(`ERROR: ${e}`);
    res.redirect('back');
  })
})

profileRouter.get('/beers', (req, res, next) => {
  RelUserBeer.find({ user_id:req.user.id })
  .populate('beer_id', 'id name image city country')
  .then(rels => {
    res.render('user/profile', {rels});
  })
})


module.exports = profileRouter;