const Product = require('../models/Products');
const User = require("../Models/User");

const getProductsForUser = async (req, res) => {
    try {
        const products = Product.find();    
        res.status(201).json({
            products
        })  
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during fetching prodcuts' });
    }
};

module.exports = {
    getProductsForUser
}