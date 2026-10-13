import connectDB from './lib/db.js';
import { Entry } from './lib/models.js';

export default async function handler(req, res) {
  await connectDB();
  const { id, visitorId } = req.query;

  try {
    const story = await Entry.findById(id);
    if (!story) return res.status(404).json({ error: 'Signal not found.' });

    return res.status(200).json({
      id: story._id.toString(),
      author_id: story.user_id.toString(),
      username: story.username,
      title: story.title,
      content: story.content,
      created_at: story.created_at,
      likes_count: story.likes.length,
      comments_count: story.comments.length,
      is_liked_by_user: visitorId ? story.likes.some(uid => uid.toString() === visitorId) : false,
      comments: story.comments.sort((a, b) => b.created_at - a.created_at).map(c => ({
        id: c._id.toString(),
        username: c.username,
        content: c.content,
        created_at: c.created_at
      }))
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read signal.' });
  }
}