import connectDB from './lib/db';
import { Entry } from './lib/models';

export default async function handler(req, res) {
  await connectDB();
  const { userId, entryId } = req.body;

  try {
    if (req.method === 'POST') {
      await Entry.findByIdAndUpdate(entryId, { $addToSet: { likes: userId } });
    } else if (req.method === 'DELETE') {
      await Entry.findByIdAndUpdate(entryId, { $pull: { likes: userId } });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Interaction failed.' });
  }
}