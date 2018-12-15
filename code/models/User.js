const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  birth_date: String,
  image: {type: String, default: 'https://res.cloudinary.com/duaxyo2ks/image/upload/v1543655128/tumblr-lab-file/profile-default.png'},
  usertype: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
