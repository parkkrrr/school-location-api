import mysql from "mysql2/promise";
import "dotenv/config";

const { HOST, USER, PASSWORD, DATABASE } = process.env;

const pool = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(255),
        latitude FLOAT,
        longitude FLOAT
      )
    `;
    const [result] = await pool.execute(createTableQuery);
    console.log("Table checked/created.");
  } catch (err) {
    console.error("Error creating table:", err.message);
  }
})();

export default pool;
