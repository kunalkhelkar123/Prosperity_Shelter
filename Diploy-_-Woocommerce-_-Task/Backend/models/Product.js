const connection = require("../config/db");

const createProduct = async (
  userId,
  name,
  description,
  price,
  imageUrl,
  status
) => {
  const db = connection;
  const [result] = await db.execute(
    `INSERT INTO products (user_id, name, description, price, image_url, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, name, description, price, imageUrl, status]
  );
  return result.insertId;
};

const getProductsByUser = async (userId) => {
  const db = connection;
  const [rows] = await db.execute("SELECT * FROM products WHERE user_id = ?", [
    userId,
  ]);
  return rows;
};

const getAllProductsByUser = async () => {
  const db = connection;
  const [rows] = await db.execute("SELECT * FROM products");
  return rows;
};

const updateProductStatus = async (productId, status, wooProductId) => {
  const db = connection;
  await db.execute(
    "UPDATE products SET status = ?, woo_product_id = ? WHERE id = ?",
    [status, wooProductId, productId]
  );
};
const deleteProductsByUser = async (id) => {
  const db = connection;
  console.log("id.", id.id);
  await db.execute("DELETE FROM products WHERE id = ?", [id.id]);
};

module.exports = {
  createProduct,
  getProductsByUser,
  updateProductStatus,
  getAllProductsByUser,
  deleteProductsByUser,
};
