const express = require("express");
const {
    getAllProductsHandler
} = require("../controllers/productController");
const router = express.Router();
router.get("/",getAllProductsHandler);


module.exports = router;
