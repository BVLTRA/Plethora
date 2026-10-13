import connectDB from './lib/db.js';
import { Entry, User } from './lib/models.js';

export default async function handler(req, res) {
  await connectDB();
  const { userId, entryId, content } = req.body;

  try {
    const user = await User.findById(userId);
    const newComment = { user_id: userId, username: user.username, content };
    
    await Entry.findByIdAndUpdate(entryId, { $push: { comments: newComment } });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to add response.' });
  }
}