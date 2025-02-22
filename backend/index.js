const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoute = require("./routes/auth");
const staff = require("./routes/staff");
const visitesadmin = require("./routes/visitesadmin");
const dailyscrum = require("./routes/dailyscrum");
const client = require("./routes/client");
const otpRoute = require("./routes/user");
const propertyDetails = require("./routes/propertyDetails");
const verifyToken = require("./middleware/verifyToken");

dotenv.config();

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
//app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use("/api/uploads", express.static("uploads"));

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/client", client);
app.use("/api/staff", staff);
app.use("/api/adminstaffvisites", visitesadmin);
app.use("/api/dailyscrum", dailyscrum);
app.use("/api/property", propertyDetails);
app.use("/api/otp", verifyToken, otpRoute);

app.use(express.json({ limit: '100mb' })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: '100mb', extended: true }));



// Static File Serving
const buildPath = path.join(__dirname, "../user/dist");

app.use(express.static(buildPath));

// Fallback Route for React (should be after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Test Routes
app.get("/check", (req, res) => res.send("Working fine"));
app.get("/check2", (req, res) => res.send("Hello world"));

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
