import connectDB from './lib/db.js';
import { User } from './lib/models.js';

export default async function handler(req, res) {
  await connectDB();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ error: 'Username or email already taken.' });

    await User.create({ username, email, password_hash: password });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Database transmission failed.' });
  }
}