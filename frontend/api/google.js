import connectDB from './lib/db';
import { User } from './lib/models';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const { email, username, password } = req.body;

    try {
      const existing = await User.findOne({ $or: [{ email }, { username }] });
      if (existing) {
        return res.status(400).json({ error: 'Username or email already taken.' });
      }

      const user = await User.create({
        email,
        username,
        password_hash: password // For production, hash via bcrypt before storing
      });

      return res.status(200).json({
        user: { id: user._id.toString(), username: user.username, email: user.email, role: user.role }
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}