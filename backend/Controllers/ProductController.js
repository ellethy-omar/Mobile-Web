const Product = require('../models/Products');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Add await
        console.log(products);
        res.status(200).json({
            products
        });
    } catch (error) {
        console.error('Fetching products error:', error);
        res.status(500).json({ error: 'Server error during fetching products' });
    }
};

module.exports = {
    getAllProducts
}