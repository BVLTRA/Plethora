import connectDB from './lib/db.js';
import { User, Entry } from './lib/models.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const profile = await User.findById(id);
      if (!profile) return res.status(404).json({ error: 'Node not found.' });

      // Authored entries
      const entries = await Entry.find({ user_id: id }).sort({ created_at: -1 });

      // Liked entries
      const likes = await Entry.find({ likes: id });

      // Entries where the user left a response
      const commentedEntries = await Entry.find({ 'comments.user_id': id });
      const responses = commentedEntries.flatMap((entry) =>
        entry.comments
          .filter((c) => c.user_id && c.user_id.toString() === id)
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
          email: profile.email,
          quote: profile.quote,
          last_active: profile.last_active
        },
        entries: entries.map((e) => ({
          id: e._id.toString(),
          title: e.title,
          content: e.content,
          status: e.status,
          is_liked_by_user: e.likes.some((uId) => uId.toString() === id)
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