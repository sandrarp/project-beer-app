const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: path.join(__dirname, '../.public.env') });

const mongoose = require("mongoose");
const Brewery = require("../models/Brewery");
const Beer = require("../models/Beer");
const breweries = require("../data/breweries.js");
const beers = require("../data/beers.js");

mongoose
.connect(`${process.env.DBURL}`, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

Brewery.deleteMany()
.then(() => {
  return Brewery.create(breweries).then(brs=> {
    console.log(`${brs.length} breweries created with the following id:`);
    console.log(brs.map(u => u._id));
    return Promise.all(
      brs.map( br => {
        if(beers[br.name] !== undefined) {
          const mapBeers = beers[br.name].map(beer => {
            return {
              ...beer,
              brewery: br.id
            }
          })
          return Beer.create(mapBeers).then( be => {
              console.log(`Beers created on ${br.name} -> ${be.map(beer =>  beer.name).join(',')}`);
            }
          )
        }
      })
    )
  })
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})