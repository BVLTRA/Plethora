import connectDB from './lib/db.js';
import { User, Entry } from './lib/models.js';

export default async function handler(req, res) {
  await connectDB();
  const { username, visitorId } = req.query;

  if (req.method === 'GET') {
    try {
      const profile = await User.findOne({ username });
      if (!profile) return res.status(404).json({ error: 'Node does not exist.' });

      const entries = await Entry.find({ user_id: profile._id, status: 'published' }).sort({ created_at: -1 });
      const likes = await Entry.find({ likes: profile._id });

      const commentedEntries = await Entry.find({ 'comments.user_id': profile._id });
      const responses = commentedEntries.flatMap((entry) =>
        entry.comments
          .filter((c) => c.user_id && c.user_id.toString() === profile._id.toString())
          .map((c) => ({
            id: entry._id.toString(),
            op_username: entry.username,
            content: c.content
          }))
      );

      return res.status(200).json({
        profile: {
          id: profile._id.toString(),
          username: profile.username,
          quote: profile.quote,
          last_active: profile.last_active
        },
        entries: entries.map((e) => ({
          id: e._id.toString(),
          title: e.title,
          content: e.content,
          is_liked_by_user: visitorId ? e.likes.some((uId) => uId.toString() === visitorId) : false
        })),
        likes: likes.map((l) => ({
          id: l._id.toString(),
          title: l.title,
          content: l.content
        })),
        responses
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}