const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db")
//// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    // Validate request body

    try {

      const checkemail = `
    SELECT * FROM users_master WHERE email=?
  `;
      const [userResult] = await db.query(checkemail, [email]);

      if (userResult.length > 0) {
        console.log("user already present with same mail id")
        return res.status(201).json({ message: "user already present with same mail id ." });

      }

    }
    catch (error) {


    }

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }


    const sqlCreateUser = `
    INSERT INTO users_master (name, phone, email, password,role,isActive,ORG) 
    VALUES (?, ?, ?, ?,?,?,?)
  `;

    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log("hashedPassword  ==> ", hashedPassword);
    const [userResult] = await db.query(sqlCreateUser, [name, phone, email, hashedPassword, "admin", "true", password]);
    // console.log("Inserted user ID ==> ", userResult.insertId);
    const userid = userResult.insertId;
    // console.log("userid ==> ", userid);
    // console.log("userResult ==> ", userResult);
    // Respond with success
    res.status(201).json({ success: true, message: "User registered successfully", user: userid });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

router.post("/createuser", async (req, res) => {
  try {

    const { name, phone, email, password, role, subrole } = req.body;
    // console.log("subrole", subrole)
    // Validate request body
    if (!name || !phone || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const sqlCreateUser = `
    INSERT INTO users_master (name, phone, email, password,role,subrole) 
    VALUES (?, ?, ?, ?,?,?)
  `;

    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log("hashedPassword  ==> ", hashedPassword);
    const [userResult] = await db.query(sqlCreateUser, [name, phone, email, hashedPassword, role, subrole]);
    // console.log("Inserted user ID ==> ", userResult.insertId);
    const userid = userResult.insertId;
    // console.log("userid ==> ", userid);
    // console.log("userResult ==> ", userResult);
    // Respond with success
    res.status(201).json({ success: true, message: "User registered successfully", user: userid });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log("hello")
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const sqlCheckUser = 'SELECT * FROM users_master WHERE email = ? AND isActive = "True"';
    const [rows] = await db.query(sqlCheckUser, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = rows[0];
    // Use bcrypt.compare to compare the hashed password with the entered password
    const isPasswordCorrect = await bcrypt.compare(password, user.password); // Notice 'user.password'

    if (isPasswordCorrect) {
      const accessToken = jwt.sign(
        {
          id: user.userid,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "6hr" }
      );

      const data = {
        id: user.userid,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.isActive,
        role: user.role,
        subrole: user.subrole
      }
      return res.status(200).json({ ...user, accessToken, admin: data });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/stafflogin", async (req, res) => {
  try {
    console.log("Inside staff login route");

    const { email, password } = req.body;
    console.log("email, password", email, password)
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // SQL Query to check if user exists
    const sqlCheckUser = "SELECT * FROM staff_master WHERE email = ?";
    const [rows] = await db.query(sqlCheckUser, [email]);

    // Check if user exists
    if (rows.length === 0) {
      return res.status(401).json({ message: "User not found. Invalid credentials." });
    }

    const user = rows[0];

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Check if account is active
    if (user.isActive === "false") {
      return res.status(403).json({
        message: "Your account is deactivated. Please contact the admin.",
      });
    }


    const accessToken = jwt.sign(
      {
        id: user.staffid,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "6hr" }
    );


    const data = {
      id: user.staffid,
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.isActive,
      role: "staff"
    }

    // Successful login
    return res.status(200).json({
      user: data,
      message: "Successfully logged in.",
      accessToken: accessToken, // Placeholder token
    });

  } catch (error) {
    console.error("Error in staff login route:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/get-all', async (req, res) => {

  // console.log("inside get all")
  const sqlQuery = 'SELECT * FROM users_master';

  const [results] = await db.execute(sqlQuery); // Using execute for safer queries
  // console.log("results", results)
  res.json({ success: true, profiles: results });


});

router.put('/change-password', async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  // console.log("id, oldPassword,newPassword", id, oldPassword, newPassword)

  if (!id || !oldPassword) {
    return res.status(400).json({ message: "id and oldPassword are required" });
  }
  const sqlCheckUser = 'SELECT * FROM users_master WHERE userid = ? AND isActive = "True"';
  const [rows] = await db.query(sqlCheckUser, [id]);

  if (rows.length === 0) {
    return res.status(401).json({ message: "Invalid id and  old password" });
  }
  const user = rows[0];
  // Use bcrypt.compare to compare the hashed password with the entered password
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password); // Notice 'user.password'

  const sqlUpdateUser = 'UPDATE users_master SET password = ? WHERE userid = ?';


  if (isPasswordCorrect) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [rows] = await db.query(sqlUpdateUser, [hashedPassword, id]);
    // console.log("rows", rows)

    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }




});

router.put('/updateuser', async (req, res) => {
  const { myProfile, } = req.body;
  // console.log("newProfile", myProfile)

  const { userid, name, phone, email } = myProfile
  // console.log("userid, name, phone, email", userid, name, phone, email)

  if (!userid || !email) {
    return res.status(400).json({ message: "id and email are required" });
  }
  const sqlUpdateUser = 'UPDATE users_master SET name = ? , phone=?, email=? WHERE userid = ?';
  const [rows] = await db.query(sqlUpdateUser, [name, phone, email, userid]);
  // console.log("rows", rows)

  return res.status(200).json({ success: true, results: rows.insertId });





});



router.get('/download-log', (req, res) => {
  // Check if log file exists

  const LOG_FILE_PATH="logs/my_node_app.log"
  if (fs.existsSync(LOG_FILE_PATH)) {
    res.download(LOG_FILE_PATH, 'my_node_app.log', err => {
      if (err) {
        console.error('Error sending log file:', err)
        res.status(500).send('Failed to download log file')
      }
    })
  } else {
    res.status(404).send('Log file not found')
  }
})

module.exports = router;
