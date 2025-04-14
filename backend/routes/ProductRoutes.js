const {
    getProductsForUser
} = require('../Controllers/ProductController.js');

const router = require('express').Router();

router.get("/products", getProductsForUser);

module.exports = router;