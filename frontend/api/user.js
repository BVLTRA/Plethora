import connectDB from './lib/db.js';
import { User, Entry } from './lib/models.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // Update profile
  if (req.method === 'PUT') {
    const { username, email, quote, password } = req.body;
    try {
      const updates = { username, email, quote, last_active: new Date() };
      if (password) updates.password_hash = password;

      await User.findByIdAndUpdate(id, updates);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Delete profile (Admin or self-termination)
  if (req.method === 'DELETE') {
    const { keepEntries } = req.body;
    try {
      if (keepEntries) {
        // Detach entries into anonymous ghost entries
        await Entry.updateMany({ user_id: id }, { username: 'ghost_node' });
      } else {
        // Hard delete all entries
        await Entry.deleteMany({ user_id: id });
      }

      await User.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}