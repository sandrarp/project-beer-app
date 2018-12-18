const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const brewerySchema = new Schema({
  name: {type: String, required: true},
  description: String,
  company: String,
  image: {type: String, default: 'https://res.cloudinary.com/duaxyo2ks/image/upload/c_scale,e_tint,w_800/v1545093184/breweries/cgrv56yhb64w3ygbb567.png'},
  foundation_year: Number,
  city: String,
  country: {type: String, required: true},
  website: String,
  verified: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Brewery = mongoose.model('Brewery', brewerySchema);
module.exports = Brewery;
