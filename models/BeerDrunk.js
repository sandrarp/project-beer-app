const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BeerDrunkSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref:'User'},
  beer_id: {type: Schema.Types.ObjectId, ref:'Beer'},
  place_id: {type: Schema.Types.ObjectId, ref:'Place'},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const BeerDrunk = mongoose.model('BeerDrunk', BeerDrunkSchema);
module.exports = BeerDrunk;
