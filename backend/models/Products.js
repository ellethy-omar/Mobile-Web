const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
require('dotenv').config()

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  decription: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now }
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;