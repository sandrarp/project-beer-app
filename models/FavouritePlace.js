const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const favPlaceSchema = new Schema({
  user_id: ObjectId,
  place_id: ObjectId,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const FavPlace = mongoose.model('FavPlace', favPlaceSchema);
module.exports = FavPlace;
