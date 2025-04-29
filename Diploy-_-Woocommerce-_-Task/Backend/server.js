const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const AllproductRoutes  = require("./routes/AllproductRoutes");
const DeleteProductRoutes  = require("./routes/DeleteProductRoutes")
const path = require("path");

const bodyParser = require("body-parser");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '100mb' })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: '100mb', extended: true }));
const buildPath = path.join(__dirname, "../admin/dist");
app.use(express.static(buildPath));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/Allproducts", AllproductRoutes);
app.use("/api/deleteproducts", DeleteProductRoutes);
app.use("/uploads", express.static("uploads"));

// Database
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
