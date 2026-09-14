import mongoose from 'mongoose';
import { type } from 'node:os';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, default: null },
    role: { type: String, default: 'user' },
    quote: { type: String, default: '' },
    last_active: { type: Date, default: Date.now }
});

const EntrySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    title: { type: String, default: 'Untitled' },
    content: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            username: { type: String, required: true },
            content: { type: String, required: true },
            created_at: { type: Date, default: Date.now }
        }
    ],
    created_at: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Entry = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);