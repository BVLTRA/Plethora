import connectDB from './lib/db';
import { User } from './lib/models';

export default async function handler(req, res) {
  await connectDB();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password_hash !== password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    return res.status(200).json({
      user: { id: user._id.toString(), username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Database transmission failed.' });
  }
}