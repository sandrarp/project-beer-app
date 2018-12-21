const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const beerSchema = new Schema({
  name: String,
  description: String,
  image: {type: String, default: 'http://res.cloudinary.com/duaxyo2ks/image/upload/v1545411400/birra-uploads/urbktmwh9eiv0ir00q9f.jpg'},
  brewery: {type: Schema.Types.ObjectId, ref:'Brewery'},
  vol: String,
  kcal: String,
  ingredients: Array,
  beertype: {type: String}, // 
  fermentation: String, // Lager, IPA, Pale Ale, Triple Fermentación (FERMENTACIÓN)
  color: String,
  taste: String, // dulce, amarga, afrutada, citrica
  maridaje: Array, // si o no?
  isGlutenFree: {type: Boolean, default: false},
  EBU: Number,
  isSeasonal: {type: Boolean, default: false}, // es de temporada? Significa que las pueden retirar
  verified: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

beerSchema.virtual('relation', {
  ref: 'RelUserBeer', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'beer_id', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  options: { limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

const Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;
