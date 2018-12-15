const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const relUserBeerSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref:'User'},
  beer_id: {type: Schema.Types.ObjectId, ref:'Beer'},
  rel_type: {type: String, num: ["Favourite", "Recomended", "Tested", "Pendant"], default: "Tested"},
  valoration: {type: Number},
  note: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const RelUserBeer = mongoose.model('RelUserBeer', relUserBeerSchema);
module.exports = RelUserBeer;
