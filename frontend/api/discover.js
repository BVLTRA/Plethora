import connectDB from './lib/db';
import { Entry } from './lib/models';

export default async function handler(req, res) {
  await connectDB();
  const { userId } = req.query;

  try {
    const entries = await Entry.find({ status: 'published' }).sort({ created_at: -1 });
    
    const feed = entries.map(e => ({
      id: e._id.toString(),
      username: e.username,
      title: e.title,
      content: e.content,
      is_liked_by_user: userId ? e.likes.some(id => id.toString() === userId) : false
    }));

    return res.status(200).json(feed);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to sync with grid.' });
  }
}