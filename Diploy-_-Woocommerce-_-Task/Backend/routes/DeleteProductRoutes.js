const express = require("express");
const {
    deleteProductsHandler
} = require("../controllers/productController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/",authMiddleware, deleteProductsHandler);


module.exports = router;
