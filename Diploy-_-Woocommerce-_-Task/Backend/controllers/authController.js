const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createUser, findUserByEmail } = require("../models/User");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(name, email, hashedPassword);

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log("email password", email, password);
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // console.log("useruser ", user);
    const isMatch = await bcrypt.compare(password, user.password);
    const isMatch2 = password == user.password;
    // console.log("  !isMatch || !isMatch2 ", !isMatch, !isMatch2);
    if (!isMatch && !isMatch2)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // console.log("chcek", user.id);
    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
