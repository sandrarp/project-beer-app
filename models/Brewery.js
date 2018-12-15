const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const brewerySchema = new Schema({
  name: {type: String, required: true},
  description: String,
  company: String,
  image: {type: String, default: 'https://res.cloudinary.com/duaxyo2ks/image/upload/v1543655128/tumblr-lab-file/profile-default.png'},
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
