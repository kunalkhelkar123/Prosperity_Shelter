const jwt = require("jsonwebtoken");  // You need to install jsonwebtoken

const verifyToken = (req, res, next) => {
  // Get token from the Authorization header
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract the token part from "Bearer <token>"


  // Check if the token exists
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  // If the token exists, we validate it (usually using a secret or public key)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {



      console.log("token ==> ", token)
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    // If token is valid, save the decoded user data and proceed to the next middleware
    req.user = decoded;  // You can use decoded info for further processing
    next();
  });
};

module.exports = verifyToken;
