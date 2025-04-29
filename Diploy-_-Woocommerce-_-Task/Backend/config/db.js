const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function testConnection() {
  try {
    const conn = await connection.getConnection();
    console.log("Connected to the database");
    conn.release();
  } catch (error) {
    console.error("Failed to connect to the database ==>", error);
  }
}

testConnection();

module.exports = connection;
