const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  if(req.user !== null && req.user !== undefined) {
    console.log(req.user);
    res.redirect('/profile');  
  }
  res.render('index');
});

module.exports = router;
