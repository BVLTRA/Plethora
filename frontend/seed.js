import mongoose from 'mongoose';

// Paste your actual MongoDB Atlas connection string here just for this script
const MONGODB_URI = "...";

// Hardcoded bcrypt hash for 'password123' to avoid installing extra dependencies
const defaultPassword = "$$2a$12$R9h/cIPz0gi.URNNX3cl2up.x25Q1P.x6K1h3gPz2y5q.O1x.7m"; 

// Using a simplified pre-hashed string for the dummy data to keep the script lightweight
const dummyHash = "$2a$12$R9h/cIPz0gi.URNNX3cl2up.x25Q1P.x6K1h3gPz2y5q.O1x.7m"; // 'password123'

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  quote: String,
  password_hash: String,
  role: String,
  last_active: { type: Date, default: Date.now }
});

const EntrySchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  username: String,
  title: String,
  content: String,
  status: { type: String, default: 'published' },
  likes: [mongoose.Schema.Types.ObjectId],
  comments: [{
    user_id: mongoose.Schema.Types.ObjectId,
    username: String,
    content: String,
    created_at: { type: Date, default: Date.now }
  }],
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Entry = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);

async function seedDatabase() {
  try {
    console.log("Connecting to the grid...");
    await mongoose.connect(MONGODB_URI);
    
    console.log("Wiping old collections...");
    await User.deleteMany({});
    await Entry.deleteMany({});

    console.log("Generating nodes...");
    const usersData = [
      { username: 'BVLTRA', email: 'admin@bvltra.com', quote: 'Architect of the grid.', role: 'admin' },
      { username: 'signal_noise', email: 'signal@test.com', quote: 'I just want my hands to forget the route.', role: 'user' },
      { username: 'neon_ghost', email: 'neon@test.com', quote: 'Living between the static.', role: 'user' },
      { username: 'cipher_key', email: 'cipher@test.com', quote: 'Decrypting reality.', role: 'user' },
      { username: 'blank_slate', email: 'blank@test.com', quote: 'Nothing to see here.', role: 'user' },
      { username: 'litchi', email: 'litchi@test.com', quote: 'Just observing.', role: 'user' },
      { username: 'echo_chamber', email: 'echo@test.com', quote: 'Is anyone listening?', role: 'user' },
      { username: 'null_pointer', email: 'null@test.com', quote: 'Defined but empty.', role: 'user' },
      { username: 'wireframe', email: 'wire@test.com', quote: 'Structuring the chaos.', role: 'user' },
      { username: 'quiet_routine', email: 'quiet@test.com', quote: 'Finding peace in the repetition.', role: 'user' },
      { username: 'midnight_coder', email: 'mid@test.com', quote: 'The screen is my sun.', role: 'user' },
      { username: 'heavy_metal', email: 'heavy@test.com', quote: 'Endurance is everything.', role: 'user' },
      { username: 'espresso_loop', email: 'coffee@test.com', quote: 'while(awake) { code(); }', role: 'user' },
      { username: 'dark_mode', email: 'dark@test.com', quote: 'Lights out.', role: 'user' },
      { username: 'syntax_error', email: 'syntax@test.com', quote: 'Missing a semicolon somewhere in my life.', role: 'user' },
      { username: 'stray_node', email: 'stray@test.com', quote: 'Disconnected from the main cluster.', role: 'user' },
      { username: 'open_window', email: 'open@test.com', quote: 'Letting the air in.', role: 'user' },
      { username: 'fragmented', email: 'frag@test.com', quote: 'Defragmentation required.', role: 'user' },
      { username: 'pixel_pusher', email: 'pixel@test.com', quote: 'Pushing vectors until they make sense.', role: 'user' },
      { username: 'iron_lung', email: 'iron@test.com', quote: 'Breathe in, breathe out.', role: 'user' }
    ];

    // Insert users and keep track of their new MongoDB ObjectIds
    const insertedUsers = [];
    for (const u of usersData) {
      const user = await User.create({ ...u, password_hash: dummyHash });
      insertedUsers.push(user);
    }
    console.log(`[OK] ${insertedUsers.length} nodes created.`);

    // Map old SQL IDs (1 to 20) to new MongoDB ObjectIds
    const uMap = (oldId) => insertedUsers[oldId - 1];

    console.log("Broadcasting signals...");
    const entriesData = [
      { oldUserId: 2, title: 'Muscle Memory', content: 'It’s been four months since the last text, but opening our chat is still pure muscle memory at this point.' },
      { oldUserId: 8, title: 'Refactoring', content: 'Sometimes rewriting the architecture is easier than figuring out why the old one broke. I wish I could do that with my memories.' },
      { oldUserId: 9, title: 'Design constraints', content: 'Staring at a blank canvas is terrifying. Setting strict boundaries actually forces me to be more creative.' },
      { oldUserId: 11, title: 'Physical Limits', content: 'Hit a new personal record today. The physical exhaustion completely quiets the mental noise. Highly recommend.' },
      { oldUserId: 13, title: 'Eye Strain', content: 'If your environment doesn\'t have a high contrast dark theme, I\'m not using it. My eyes can\'t take the bright white anymore.' },
      { oldUserId: 16, title: 'Sunday', content: 'Just potato wedges, a grilled cheese, and watching documentaries. Perfect Sunday.' },
      { oldUserId: 15, title: 'Overthinking', content: 'Caught in a loop of observing myself observing the world. It’s exhausting being this analytical all the time.' },
      { oldUserId: 7, title: 'Relay Handoffs', content: 'Building full-stack systems is 20% writing logic and 80% figuring out why the frontend and backend refuse to talk to each other.' },
      { oldUserId: 10, title: 'Quiet Hours', content: 'The world is so loud during the day. I only feel like I can breathe at 3 AM when the servers are quiet.' },
      { oldUserId: 14, title: 'Bureaucracy', content: 'The nightmare of infinite paperwork and red tape is the most realistic horror I\'ve ever experienced.' }
    ];

    const insertedEntries = [];
    for (const e of entriesData) {
      const author = uMap(e.oldUserId);
      const entry = await Entry.create({ user_id: author._id, username: author.username, title: e.title, content: e.content });
      insertedEntries.push(entry);
    }
    console.log(`[OK] ${insertedEntries.length} signals broadcasted.`);

    console.log("Weaving responses...");
    const commentsData = [
      { oldUserId: 3, oldEntryIndex: 0, content: 'I felt this entirely. You have to break the habit physically.' },
      { oldUserId: 4, oldEntryIndex: 0, content: 'Time helps. Give it a few more months.' },
      { oldUserId: 2, oldEntryIndex: 8, content: '3 AM is the only time things make sense.' },
      { oldUserId: 10, oldEntryIndex: 1, content: 'Burn it down and start over.' },
      { oldUserId: 12, oldEntryIndex: 2, content: 'Constraints breed creativity.' },
      { oldUserId: 11, oldEntryIndex: 3, content: 'Nothing beats the iron.' },
      { oldUserId: 14, oldEntryIndex: 4, content: 'Light mode is a crime.' },
      { oldUserId: 16, oldEntryIndex: 5, content: 'Sounds perfect.' }
    ];

    for (const c of commentsData) {
      const commenter = uMap(c.oldUserId);
      const targetEntry = insertedEntries[c.oldEntryIndex];
      await Entry.findByIdAndUpdate(targetEntry._id, {
        $push: { comments: { user_id: commenter._id, username: commenter.username, content: c.content } }
      });
    }
    console.log(`[OK] Responses woven into the network.`);

    console.log("Generating random acknowledgements...");
    for (let i = 0; i < 40; i++) {
      const randomUser = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
      const randomEntry = insertedEntries[Math.floor(Math.random() * insertedEntries.length)];
      await Entry.findByIdAndUpdate(randomEntry._id, { $addToSet: { likes: randomUser._id } });
    }
    console.log("[OK] Network completely seeded.");
    
    mongoose.disconnect();
    console.log("Disconnecting from grid. You are ready to present.");

  } catch (error) {
    console.error("Fatal Error:", error);
    mongoose.disconnect();
  }
}

seedDatabase();