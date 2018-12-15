const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const beerSchema = new Schema({
  name: String,
  description: String,
  image: {type: String, default: 'https://res.cloudinary.com/duaxyo2ks/image/upload/v1544729477/beers/beer.jpg'},
  brewery: {type: Schema.Types.ObjectId, ref:'Brewery'},
  vol: String,
  kcal: String,
  ingredients: Array,
  beertype: String, // Rubia, Tostada, Roja, Negra
  fermentation: String, // Lager, IPA, Pale Ale, Triple Fermentación (FERMENTACIÓN)
  taste: String, // dulce, amarga, afrutada, citrica
  maridaje: Array, // si o no?
  isGlutenFree: {type: Boolean, default: false},
  isSeasonal: {type: Boolean, default: false}, // es de temporada? Significa que las pueden retirar
  verified: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;
