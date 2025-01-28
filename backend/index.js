const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const staff = require("./routes/staff");
const visitesadmin = require("./routes/visitesadmin");
const dailyscrum = require("./routes/dailyscrum")
const client = require("./routes/client")
// const client2 = require("../user/dist")

const otpRoute = require("./routes/user");
const propertyDetails = require("./routes/propertyDetails");
const verifyToken = require("./middleware/verifyToken")
const path =require("path")
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const _dirname=path.dirname("");
const buildpath=path.join(_dirname,"../user/build");
app.use(express.static(buildpath));
// ----- Mongoose connection ------


// const _dirname=path.dirname("");
// const buildpath=path.join(_dirname,"../user/build");
// app.use(express.static(buildpath));


// mongoose
//   .connect(
//     `mongodb+srv://kunalkhelkar2000:ch6YFrttRUfOgyKP@cluster01.ftbc18n.mongodb.net/`
//   )
//   .then(() => {
//     console.log("MongoDB connected Successfully");
//   })
//   .catch((err) => {
//     console.log("Error", err);
//   });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// Serve uploaded images statically
app.use("/api/uploads", express.static("uploads"));
// app.use("/api/uploads", propertyDetails);

app.use("/api/auth", authRoute);
app.use("/api/client", client);
app.use("/api/staff", staff);
app.use("/api/adminstaffvisites", visitesadmin);
app.use("/api/dailyscrum", dailyscrum);
app.use("/api/property", propertyDetails);
app.use("/api/otp", verifyToken, otpRoute);
app.get("/check", async (req, res) => {
  res.send("Working fine");
});

app.get("/check2", async (req, res) => {
  res.send("Hello world");
});
app.listen(4000, () => {
  console.log("Server is Running on:4000");
});
