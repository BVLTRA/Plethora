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

// --- USER SIGNUP ENDPOINT ---
app.post('/api/signup', async (req, res) => {
  // Collect react data
  const { username, email, password } = req.body;

  try {
    // Write to database. 
    // Question marks are a security feature to prevent SQL Injection attacks. (research more about this)
    // HEYYYY POOKIEEEE: Dont forget to hash password using library [ pref 'bcrypt'] before publishing!
    const [result] = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, password]
    );

    // Send success signal back to React
    res.status(201).json({ 
      message: 'User created successfully.', 
      userId: result.insertId 
    });

  } catch (error) {
    console.error("Database Error:", error);
    
    // Handle duplicates
    if (error.code === 'ER_DUP_ENTRY') {
       return res.status(400).json({ error: 'Username or email already exists in the grid.' });
    }
    
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// --- USER LOGIN ENDPOINT ---
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find email
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    // If email does not exist
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Node not found. Check your email.' });
    }

    const user = rows[0];

    // NOTE: For now, I'm storing them raw... dont forget to hash.
    if (user.password_hash !== password) {
      return res.status(401).json({ error: 'Invalid credentials. Access denied.' });
    }

    // Success: Return userdata to frontend
    res.status(200).json({
      message: 'Session initialized.',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// --- GOOGLE AUTH ENDPOINT ---
app.post('/api/google-auth', async (req, res) => {
  const { accessToken } = req.body;

  try {
    // Query Google directly to verify the token and get the user's profile
    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    if (!googleResponse.ok) {
      return res.status(401).json({ error: 'Invalid Google token.' });
    }

    const profile = await googleResponse.json();
    const googleEmail = profile.email;
    const googleName = profile.name.replace(/\s+/g, '_').toLowerCase(); // Formats e.g. "John Doe" to "john_doe"

    // Check if this email already exists in database
    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [googleEmail]);

    let user;

    if (existingUsers.length > 0) {
      // PROCESS: LOG IN
      // User exists. Log user in.
      user = existingUsers[0];
    } else {
      // PROCESS: SIGN UP
      // User doesn't exist. Insert new row without password.
      const [insertResult] = await db.query(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, NULL)',
        [googleName, googleEmail]
      );
      
      // Construct user object from new insert
      user = {
        id: insertResult.insertId,
        username: googleName,
        email: googleEmail
      };
    }

    // Give session back to React
    res.status(200).json({
      message: 'Google authentication successful.',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ error: 'Internal server error during Google Auth.' });
  }
});

// Start up server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Plethora backend signal active on port ${PORT}`);
});