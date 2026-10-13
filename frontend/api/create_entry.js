import connectDB from './lib/db';
import { Entry, User } from './lib/models';

export default async function handler(req, res) {
  await connectDB();
  const { userId, entryId, title, content, status } = req.body;

  try {
    const user = await User.findById(userId);
    
    if (entryId) {
      await Entry.findByIdAndUpdate(entryId, { title, content, status });
    } else {
      await Entry.create({ user_id: userId, username: user.username, title, content, status });
    }
    
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Upload failed.' });
  }
}