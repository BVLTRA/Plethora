import connectDB from './lib/db.js';
import { Entry, User } from './lib/models.js';

export default async function handler(req, res) {
  await connectDB();
  const { entryId, requesterId } = req.body;

  try {
    const entry = await Entry.findById(entryId);
    const requester = await User.findById(requesterId);

    if (entry.user_id.toString() === requesterId || requester.role === 'admin') {
      await Entry.findByIdAndDelete(entryId);
      return res.status(200).json({ success: true });
    }
    return res.status(403).json({ error: 'Unauthorized.' });
  } catch (err) {
    return res.status(500).json({ error: 'Deletion failed.' });
  }
}