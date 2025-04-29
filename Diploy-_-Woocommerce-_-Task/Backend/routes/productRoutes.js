const express = require("express");
const {
  createProductHandler,
  getProductsHandler,
  deleteProductsHandler
} = require("../controllers/productController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createProductHandler);
router.get("/", authMiddleware, getProductsHandler);


module.exports = router;
