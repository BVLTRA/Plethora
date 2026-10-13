const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Grid Connected'))
  .catch(err => console.error('Grid connection failed:', err));

// --- DATA SCHEMAS ---
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password_hash: String,
  quote: String,
  role: { type: String, default: 'user' },
  last_active: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

const EntrySchema = new mongoose.Schema({
  user_id: String,
  username: String,
  title: String,
  content: String,
  status: { type: String, default: 'published' },
  likes: [String], // Array of User IDs
  comments: [{
    user_id: String,
    username: String,
    content: String,
    status: { type: String, default: 'published' },
    created_at: { type: Date, default: Date.now }
  }],
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Entry = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);

// --- HELPER TO FORMAT MONGODB _id TO id ---
const formatEntry = (e, userId) => ({
  id: e._id.toString(),
  title: e.title,
  content: e.content,
  created_at: e.created_at,
  username: e.username,
  status: e.status,
  is_liked_by_user: userId ? e.likes.includes(userId) : false
});

// --- AUTH ENDPOINTS ---
app.post('/api/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ username: req.body.username, email: req.body.email, password_hash: hashedPassword });
    res.status(201).json({ message: 'Node created.', user: { id: user._id.toString(), username: user.username } });
  } catch (err) {
    res.status(400).json({ error: 'Username or email already exists.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    await User.findByIdAndUpdate(user._id, { last_active: new Date() });
    res.status(200).json({ user: { id: user._id.toString(), username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/google-auth', async (req, res) => {
  try {
    const googleRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${req.body.accessToken}` } });
    const profile = await googleRes.json();
    const user = await User.findOne({ email: profile.email });
    
    if (user) {
      await User.findByIdAndUpdate(user._id, { last_active: new Date() });
      return res.status(200).json({ isNewUser: false, user: { id: user._id.toString(), username: user.username, email: user.email } });
    }
    res.status(202).json({ isNewUser: true, googleData: { email: profile.email, name: profile.name } });
  } catch (err) {
    res.status(500).json({ error: 'Google Auth failed.' });
  }
});

app.post('/api/google-signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ username: req.body.username, email: req.body.email, password_hash: hashedPassword });
    res.status(201).json({ user: { id: user._id.toString(), username: user.username, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists.' });
  }
});

// --- CORE SYSTEM ENDPOINTS ---
app.get('/api/discover', async (req, res) => {
  try {
    const entries = await Entry.find({ status: 'published' }).sort({ created_at: -1 }).limit(100);
    res.status(200).json(entries.map(e => formatEntry(e, req.query.userId)));
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve grid.' });
  }
});

app.get('/api/entries/:id', async (req, res) => {
  try {
    const e = await Entry.findById(req.params.id);
    if (!e) return res.status(404).json({ error: 'Signal lost.' });
    
    const comments = e.comments.map(c => ({ id: c._id.toString(), content: c.content, created_at: c.created_at, username: c.username }));
    
    res.status(200).json({
      id: e._id.toString(), title: e.title, content: e.content, created_at: e.created_at, username: e.username,
      likes_count: e.likes.length, comments_count: e.comments.length, is_liked_by_user: req.query.visitorId ? e.likes.includes(req.query.visitorId) : false,
      comments: comments.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read signal.' });
  }
});

app.post('/api/entries', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const entry = await Entry.create({ user_id: user._id.toString(), username: user.username, title: req.body.title, content: req.body.content, status: req.body.status });
    await User.findByIdAndUpdate(user._id, { last_active: new Date() });
    res.status(201).json({ entryId: entry._id.toString() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload.' });
  }
});

// --- INTERACTIONS ---
app.post('/api/likes', async (req, res) => {
  try {
    await Entry.findByIdAndUpdate(req.body.entryId, { $addToSet: { likes: req.body.userId } });
    res.status(201).json({ message: 'Acknowledged.' });
  } catch (err) {
    res.status(500).json({ error: 'Interaction failed.' });
  }
});

app.delete('/api/likes', async (req, res) => {
  try {
    await Entry.findByIdAndUpdate(req.body.entryId, { $pull: { likes: req.body.userId } });
    res.status(200).json({ message: 'Severed.' });
  } catch (err) {
    res.status(500).json({ error: 'Interaction failed.' });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    await Entry.findByIdAndUpdate(req.body.entryId, { $push: { comments: { user_id: user._id.toString(), username: user.username, content: req.body.content } } });
    res.status(201).json({ message: 'Response broadcasted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to respond.' });
  }
});

// --- PROFILE & ACCOUNT AGGREGATION ---
app.get('/api/account/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const entries = await Entry.find({ user_id: req.params.id, status: 'published' }).sort({ created_at: -1 });
    const likes = await Entry.find({ likes: req.params.id }).sort({ created_at: -1 });
    const commented = await Entry.find({ "comments.user_id": req.params.id });
    
    let responses = [];
    commented.forEach(entry => {
      entry.comments.filter(c => c.user_id === req.params.id).forEach(c => {
        responses.push({ id: entry._id.toString(), op_username: entry.username, content: c.content, created_at: c.created_at });
      });
    });

    res.status(200).json({
      profile: { id: user._id.toString(), username: user.username, email: user.email, quote: user.quote, last_active: user.last_active },
      entries: entries.map(e => formatEntry(e, req.params.id)),
      likes: likes.map(e => ({ id: e._id.toString(), title: e.title, content: e.content })),
      responses: responses.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    });
  } catch (err) {
    res.status(500).json({ error: 'Aggregation failed.' });
  }
});

app.get('/api/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'Node not found.' });
    
    const entries = await Entry.find({ user_id: user._id.toString(), status: 'published' }).sort({ created_at: -1 });
    const likes = await Entry.find({ likes: user._id.toString() }).sort({ created_at: -1 });
    const commented = await Entry.find({ "comments.user_id": user._id.toString() });

    let responses = [];
    commented.forEach(entry => {
      entry.comments.filter(c => c.user_id === user._id.toString()).forEach(c => {
        responses.push({ id: entry._id.toString(), op_username: entry.username, content: c.content, created_at: c.created_at });
      });
    });

    res.status(200).json({
      profile: { id: user._id.toString(), username: user.username, quote: user.quote, last_active: user.last_active },
      entries: entries.map(e => formatEntry(e, req.query.visitorId)),
      likes: likes.map(e => ({ id: e._id.toString(), title: e.title, content: e.content })),
      responses: responses.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    });
  } catch (err) {
    res.status(500).json({ error: 'Aggregation failed.' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    let updates = { username: req.body.username, email: req.body.email, quote: req.body.quote };
    if (req.body.password) updates.password_hash = await bcrypt.hash(req.body.password, 10);
    await User.findByIdAndUpdate(req.params.id, updates);
    res.status(200).json({ message: 'Updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed.' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    if (req.body.keepEntries) {
      await Entry.updateMany({ user_id: req.params.id }, { username: 'Unknown_Node' });
    } else {
      await Entry.deleteMany({ user_id: req.params.id });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Node deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed.' });
  }
});

// Export the app for Vercel
module.exports = app;