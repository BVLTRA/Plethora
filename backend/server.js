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

    await db.query('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

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

// --- GOOGLE AUTH ENDPOINTS ---
// --- GOOGLE PART 1NEEE: ACCOUNT CREATION/LOGIN ---
app.post('/api/google-auth', async (req, res) => {
  const { accessToken } = req.body;

  try {
    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    if (!googleResponse.ok) return res.status(401).json({ error: 'Invalid Google token.' });

    const profile = await googleResponse.json();
    const googleEmail = profile.email;

    // Check if they exist
    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [googleEmail]);

    if (existingUsers.length > 0) {

      await db.query('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?', [existingUsers[0].id]);

      // EXISTING USER: Log in normally
      return res.status(200).json({
        isNewUser: false,
        message: 'Session initialized.',
        user: existingUsers[0]
      });
    } else {
      // NEW USER: Pause process and send data back to React
      return res.status(202).json({
        isNewUser: true,
        message: 'Additional details required.',
        googleData: { email: googleEmail, name: profile.name }
      });
    }
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// --- GOOGLE PART 2WOO: GOOGLE FINAL SIGNUP (IF CREATING) ---
app.post('/api/google-signup', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Insert new user (Real name is intentionally discarded)
    const [insertResult] = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, password]
    );

    await db.query('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?', [insertResult.insertId]);
    
    res.status(201).json({
      message: 'Account created successfully.',
      user: { id: insertResult.insertId, username, email }
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
       return res.status(400).json({ error: 'Username already exists.' });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// --- ACCOUNT AGGREGATION ENDPOINT ---
app.get('/api/account/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch user profile (leave the password)
    const [user] = await db.query(
    'SELECT username, email, quote, created_at, last_active FROM users WHERE id = ?', 
    [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({ error: 'Node not found.' });
    }

    // Fetch published entries
    const [entries] = await db.query(
      `SELECT e.id, e.title, e.content, e.created_at, 
              IF(l.user_id IS NOT NULL, true, false) AS is_liked_by_user
       FROM entries e 
       LEFT JOIN likes l ON e.id = l.entry_id AND l.user_id = ?
       WHERE e.user_id = ? AND e.status = "published" 
       ORDER BY e.created_at DESC`, 
      [userId, userId] 
    );

    // Fetch published responses (comments)
    const [responses] = await db.query(
      'SELECT id, entry_id, content, created_at FROM comments WHERE user_id = ? AND status = "published" ORDER BY created_at DESC', 
      [userId]
    );

    // Fetch entries they have liked by joining the likes table with the entries table
    const [likes] = await db.query(
      `SELECT e.id, e.title, e.content, l.created_at AS liked_at 
       FROM likes l 
       JOIN entries e ON l.entry_id = e.id 
       WHERE l.user_id = ? 
       ORDER BY l.created_at DESC`, 
      [userId]
    );

    // Combine and send
    res.status(200).json({
      profile: user[0],
      entries: entries,
      responses: responses,
      likes: likes
    });

  } catch (error) {
    console.error("Aggregation Error:", error);
    res.status(500).json({ error: 'Failed to retrieve node data.' });
  }
});

// --- UPDATE PROFILE ENDPOINT ---
app.put('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email, quote, password } = req.body;

  try {
    if (password) {
      // If they typed a new password, update everything
      await db.query(
        'UPDATE users SET username = ?, email = ?, quote = ?, password_hash = ? WHERE id = ?', 
        [username, email, quote, password, userId]
      );
    } else {
      // If password field is blank, leave their old password alone
      await db.query(
        'UPDATE users SET username = ?, email = ?, quote = ? WHERE id = ?', 
        [username, email, quote, userId]
      );
    }
    res.status(200).json({ message: 'Node updated.' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Username or email already taken.' });
    res.status(500).json({ error: 'Failed to update node.' });
  }
});

// --- DELETE/GHOST NODE ENDPOINT ---
app.delete('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { keepEntries } = req.body;

  try {
    if (keepEntries) {
      // GHOST NODE: Scramble the username with their ID to bypass UNIQUE constraints
      await db.query(
        `UPDATE users SET username = CONCAT('Unknown_', id), email = NULL, password_hash = NULL WHERE id = ?`, 
        [userId]
      );
    } else {
      // HARD DELETE: Erase their account. 
      // (deleting child records first to avoid SQL constraint errors)
      await db.query('DELETE FROM likes WHERE user_id = ?', [userId]);
      await db.query('DELETE FROM comments WHERE user_id = ?', [userId]);
      await db.query('DELETE FROM entries WHERE user_id = ?', [userId]);
      await db.query('DELETE FROM users WHERE id = ?', [userId]);
    }
    res.status(200).json({ message: 'Connection severed permanently.' });
  } catch (error) {
    console.error("Deletion Error:", error);
    res.status(500).json({ error: 'Failed to delete node.' });
  }
});

// --- PUBLIC PROFILE ENDPOINT ---
app.get('/api/profile/:username', async (req, res) => {
  const targetUsername = req.params.username;
  const visitorId = req.query.visitorId; // ID of person looking at profile

  try {
    // Find target user's node
    const [targetUser] = await db.query(
      // ---> ADD 'quote' TO THIS LIST <---
      'SELECT id, username, quote, created_at, last_active FROM users WHERE username = ?', 
      [targetUsername]
    );
    
    if (targetUser.length === 0) {
      return res.status(404).json({ error: 'Node not found.' });
    }

    const targetUserId = targetUser[0].id;

    // Fetch their entries, checking if VISITOR liked them
    const [entries] = await db.query(
      `SELECT e.id, e.title, e.content, e.created_at, 
              IF(l.user_id IS NOT NULL, true, false) AS is_liked_by_user
       FROM entries e 
       LEFT JOIN likes l ON e.id = l.entry_id AND l.user_id = ?
       WHERE e.user_id = ? AND e.status = "published" 
       ORDER BY e.created_at DESC`, 
      [visitorId, targetUserId]
    );

    // Fetch their published responses
    const [responses] = await db.query(
      'SELECT id, entry_id, content, created_at FROM comments WHERE user_id = ? AND status = "published" ORDER BY created_at DESC', 
      [targetUserId]
    );

    // Fetch entries they have acknowledged
    const [likes] = await db.query(
      `SELECT e.id, e.title, e.content, l.created_at AS liked_at 
       FROM likes l 
       JOIN entries e ON l.entry_id = e.id 
       WHERE l.user_id = ? 
       ORDER BY l.created_at DESC`, 
      [targetUserId]
    );

    res.status(200).json({
      profile: targetUser[0],
      entries: entries,
      responses: responses,
      likes: likes
    });

  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ error: 'Failed to retrieve node data.' });
  }
});

app.post('/api/entries', async (req, res) => {
  const { userId, title, content, status } = req.body; // status dictates 'draft' or 'published'

  try {
    // Log entry into the database
    const [result] = await db.query(
      'INSERT INTO entries (user_id, title, content, status) VALUES (?, ?, ?, ?)',
      [userId, title, content, status]
    );

    // CLOCK UPDATE
    await db.query('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?', [userId]);

    res.status(201).json({ message: 'Entry logged successfully.', entryId: result.insertId });
  } catch (error) {
    console.error("Entry Error:", error);
    res.status(500).json({ error: 'Failed to log entry.' });
  }
});

app.post('/api/comments', async (req, res) => {
  const { userId, entryId, content } = req.body;

  try {
    // Log response
    await db.query(
      'INSERT INTO comments (user_id, entry_id, content, status) VALUES (?, ?, ?, "published")',
      [userId, entryId, content]
    );

    // CLOCK UPDATE 
    await db.query('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?', [userId]);

    res.status(201).json({ message: 'Response broadcasted.' });
  } catch (error) {
    console.error("Comment Error:", error);
    res.status(500).json({ error: 'Failed to broadcast response.' });
  }
});

app.post('/api/likes', async (req, res) => {
  const { userId, entryId } = req.body;

  try {
    // Create link between user and entry
    await db.query(
      'INSERT INTO likes (user_id, entry_id) VALUES (?, ?)',
      [userId, entryId]
    );

    // CLOCK UPDATE
    await db.query('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?', [userId]);

    res.status(201).json({ message: 'Entry acknowledged.' });
  } catch (error) {
    // Prevent crashes if they try to like something twice
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Already acknowledged.' });
    }
    console.error("Like Error:", error);
    res.status(500).json({ error: 'Failed to acknowledge entry.' });
  }
});

// --- REMOVE ACKNOWLEDGEMENT (UN-LIKE) ---
app.delete('/api/likes', async (req, res) => {
  const { userId, entryId } = req.body;
  try {
    await db.query('DELETE FROM likes WHERE user_id = ? AND entry_id = ?', [userId, entryId]);
    res.status(200).json({ message: 'Signal severed.' });
  } catch (error) {
    console.error("Unlike Error:", error);
    res.status(500).json({ error: 'Failed to sever signal.' });
  }
});

// --- DISCOVER FEED ENDPOINT ---
app.get('/api/discover', async (req, res) => {
  const userId = req.query.userId; // Check if a specific user is asking for the feed

  try {
    let query;
    let params = [];

    if (userId) {
      // If a user is logged in, cross-reference the 'likes' table to see what they have acknowledged
      query = `
        SELECT e.id, e.title, e.content, e.created_at, u.username,
               IF(l.user_id IS NOT NULL, true, false) AS is_liked_by_user
        FROM entries e 
        JOIN users u ON e.user_id = u.id 
        LEFT JOIN likes l ON e.id = l.entry_id AND l.user_id = ?
        WHERE e.status = 'published' 
        ORDER BY e.created_at DESC 
        LIMIT 100
      `;
      params = [userId];
    } else {
      // If it's a guest, just pull the feed normally
      query = `
        SELECT e.id, e.title, e.content, e.created_at, u.username, false AS is_liked_by_user
        FROM entries e 
        JOIN users u ON e.user_id = u.id 
        WHERE e.status = 'published' 
        ORDER BY e.created_at DESC 
        LIMIT 100
      `;
    }

    const [entries] = await db.query(query, params);
    res.status(200).json(entries);
  } catch (error) {
    console.error("Discover Error:", error);
    res.status(500).json({ error: 'Failed to retrieve the global grid.' });
  }
});

// --- READ SINGLE STORY ENDPOINT ---
app.get('/api/entries/:id', async (req, res) => {
  const entryId = req.params.id;
  const visitorId = req.query.visitorId; 

  try {
    const [entries] = await db.query(
      `SELECT 
        e.id, e.title, e.content, e.created_at, u.username,
        (SELECT COUNT(*) FROM likes WHERE entry_id = e.id) AS likes_count,
        (SELECT COUNT(*) FROM comments WHERE entry_id = e.id AND status = 'published') AS comments_count,
        IF(l.user_id IS NOT NULL, true, false) AS is_liked_by_user
       FROM entries e
       JOIN users u ON e.user_id = u.id
       LEFT JOIN likes l ON e.id = l.entry_id AND l.user_id = ?
       WHERE e.id = ? AND e.status = 'published'`,
      [visitorId || null, entryId]
    );

    if (entries.length === 0) {
      return res.status(404).json({ error: 'Signal not found or lost to the void.' });
    }

    res.status(200).json(entries[0]);
  } catch (error) {
    console.error("Read Story Error:", error);
    res.status(500).json({ error: 'Failed to retrieve the signal.' });
  }
});

// Start up server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Plethora backend signal active on port ${PORT}`);
});