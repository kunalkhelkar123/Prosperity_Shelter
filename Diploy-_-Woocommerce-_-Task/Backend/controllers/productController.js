const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  createProduct,
  getProductsByUser,
  updateProductStatus,
  getAllProductsByUser,
  deleteProductsByUser,
} = require("../models/Product");
const { createWooProduct } = require("../utils/wooService");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("image");

const createProductHandler = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('❌ Image upload error:', err);
      return res.status(500).json({ message: "Image upload failed: " + err.message });
    }

    const { name, description, price } = req.body;
    const userId = req.user.userId; // user from auth middleware
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      // 1. Create product locally first
      const productId = await createProduct(
        userId,
        name,
        description,
        price,
        imageUrl,
        "Created Locally"
      );

      // 2. Sync with WooCommerce
      const wooProduct = await createWooProduct({ name, description, price, imageUrl });

      if (wooProduct && wooProduct.id) {
        await updateProductStatus(productId, "Synced", wooProduct.id);
      } else {
        await updateProductStatus(productId, "Sync Failed", null);
      }

      res.status(201).json({ message: "Product created and sync attempt complete." });
    } catch (error) {
      console.error('❌ Product creation error:', error);
      res.status(500).json({ message: error.message || "Server Error" });
    }
  });
};


const getProductsHandler = async (req, res) => {
  const userId = req.user.userId;
  try {
    const products = await getProductsByUser(userId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProductsHandler = async (req, res) => {
  try {
    const products = await getAllProductsByUser();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProductsHandler = async (req, res) => {
  try {
    const products = await deleteProductsByUser(req.body);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProductHandler,
  getProductsHandler,
  getAllProductsHandler,
  deleteProductsHandler,
};
