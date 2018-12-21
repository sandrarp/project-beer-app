const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'birra-uploads',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 800, height: 800, crop: "limit" }],
  // transformation: [{ width: 374, height: 912, crop: "limit" }],
  filename: function (req, file, cb) {
    let imgName = undefined;
    cb(undefined, imgName);
  }
});

const uploadCloud = multer({ storage: storage })
module.exports = uploadCloud;