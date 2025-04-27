const {
    getAllProducts
} = require('../Controllers/ProductController.js');

const router = require('express').Router();

router.get("/getAllProducts", getAllProducts);

module.exports = router;