const mysql = require("mysql2/promise"); // Use `mysql2/promise` for async/await

// Create a connection pool
const connection = mysql.createPool({
  host: "localhost",   // kunal khelkar


  // host: "prosperityshelters.ct84qiwqoblz.ap-south-1.rds.amazonaws.com", // prosperity shelter live db
  user: "root",
  // password: "admin",
  password: "Kunal@123",
  database: "homi_grow",
  // database: "prosperity_shelters",

});


// const connection = mysql.createPool({
//   host: "157.173.218.140",
//   user: "root",
//   port: 3306,
//   password: "Kunal@2902",
//   database: "bhumi",
// });

// Test the connection
async function testConnection() {
  try {
    const conn = await connection.getConnection();
    console.log("Connected to the database");
    conn.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Failed to connect to the database ==>", error);
  }
}

// Call the function to test the connection
testConnection();

module.exports = connection; // Export connection for use in other files
