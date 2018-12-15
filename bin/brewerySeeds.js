const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: path.join(__dirname, '../.public.env') });

const mongoose = require("mongoose");
const Brewery = require("../models/Brewery");

mongoose
.connect(`${process.env.DBURL}`, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let breweries = [
  {
    name: "Cervezas Alhambra",
    company: "Mahou-San Miguel",
    foundation_year: 1925,
    city: "Granada",
    country: "Spain",
    verified: 1
  },
  {
    name: "Estrella Damm",
    company: "S.A. Damm",
    foundation_year: 1876,
    city: "Barcelona",
    country: "Spain",
    verified: 1,
  },
  { 
    name: "Estrella Galicia",
    company: "Hijos de Rivera, S.A.",
    foundation_year: 1906,
    city: "A Coruña",
    country: "Spain",
    verified: 1,
  },
  {
    name: "Mahou",
    company: "Mahou San Miguel",
    foundation_year: 1890,
    city: "Madrid",
    country: "Spain",
    verified: 1,
  },
  {
    name: "La Virgen",
    company: "Cervezas La Virgen",
    foundation_year: 2011,
    city: "Madrid",
    country: "Spain",
    verified: 1,
  },
  {
    name: "Delirium Tremens",
    company: "Huyghe",
    foundation_year: 1989,
    city: "Melle",
    country: "Belgium",
    verified: 1,
  },
]

Brewery.deleteMany()
.then(() => {
  return Brewery.create(breweries)
})
.then(breweriesCreated => {
  console.log(`${breweriesCreated.length} breweries created with the following id:`);
  console.log(breweriesCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})