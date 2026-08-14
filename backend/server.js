require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

// Create the MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to use async/await promises instead of callbacks
const db = pool.promise();

// Test route to verify connection works
app.get('/api/status', async (req, res) => {
  try {
    // Pinging database to make sure it's alive
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Backend and Database are connected.', db_status: rows[0].solution });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection failed.' });
  }
});

// Start up server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Plethora backend signal active on port ${PORT}`);
});