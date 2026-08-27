<?php
require 'db.php';

echo "<div style='font-family: monospace; background: #0a0a0a; color: #7ea16b; padding: 2rem; border-radius: 8px;'>";
echo "<h2>Initializing Massive Grid Reset...</h2>";

try {
    // 1. WIPE THE SLATE CLEAN
    $db->exec('SET FOREIGN_KEY_CHECKS = 0');
    $db->exec('TRUNCATE TABLE likes');
    $db->exec('TRUNCATE TABLE comments');
    $db->exec('TRUNCATE TABLE entries');
    $db->exec('TRUNCATE TABLE users');
    $db->exec('SET FOREIGN_KEY_CHECKS = 1');
    echo "<p>[OK] All previous data wiped. Memory flushed.</p>";

    // 2. GENERATE USERS (Total: 20)
    $defaultPassword = password_hash('password123', PASSWORD_BCRYPT);
    
    // Admin (ID: 1)
    $stmt = $db->prepare("INSERT INTO users (username, email, quote, password_hash, role) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute(['BVLTRA', 'admin@bvltra.com', 'Architect of the grid.', $defaultPassword, 'admin']);
    
    $dummyUsers = [
        ['signal_noise', 'signal@test.com', 'I just want my hands to forget the route.'],
        ['neon_ghost', 'neon@test.com', 'Living between the static.'],
        ['cipher_key', 'cipher@test.com', 'Decrypting reality.'],
        ['blank_slate', 'blank@test.com', 'Nothing to see here.'],
        ['litchi', 'litchi@test.com', 'Just observing.'],
        ['echo_chamber', 'echo@test.com', 'Is anyone listening?'],
        ['null_pointer', 'null@test.com', 'Defined but empty.'],
        ['wireframe', 'wire@test.com', 'Structuring the chaos.'],
        ['quiet_routine', 'quiet@test.com', 'Finding peace in the repetition.'],
        ['midnight_coder', 'mid@test.com', 'The screen is my sun.'],
        ['heavy_metal', 'heavy@test.com', 'Endurance is everything.'],
        ['espresso_loop', 'coffee@test.com', 'while(awake) { code(); }'],
        ['dark_mode', 'dark@test.com', 'Lights out.'],
        ['syntax_error', 'syntax@test.com', 'Missing a semicolon somewhere in my life.'],
        ['stray_node', 'stray@test.com', 'Disconnected from the main cluster.'],
        ['open_window', 'open@test.com', 'Letting the air in.'],
        ['fragmented', 'frag@test.com', 'Defragmentation required.'],
        ['pixel_pusher', 'pixel@test.com', 'Pushing vectors until they make sense.'],
        ['iron_lung', 'iron@test.com', 'Breathe in, breathe out.']
    ];

    foreach ($dummyUsers as $u) {
        $stmt->execute([$u[0], $u[1], $u[2], $defaultPassword, 'user']);
    }
    echo "<p>[OK] Admin and 19 dummy nodes created. (Password for all: password123)</p>";

    // 3. GENERATE ENTRIES (Total: 30)
    $dummyEntries = [
        [2, 'Muscle Memory', 'It’s been four months since the last text, but opening our chat is still pure muscle memory at this point.'],
        [8, 'Refactoring', 'Sometimes rewriting the architecture is easier than figuring out why the old one broke. I wish I could do that with my memories.'],
        [9, 'Design constraints', 'Staring at a blank canvas is terrifying. Setting strict boundaries actually forces me to be more creative.'],
        [11, 'Physical Limits', 'Hit a new personal record today. The physical exhaustion completely quiets the mental noise. Highly recommend.'],
        [13, 'Eye Strain', 'If your environment doesn\'t have a high contrast dark theme, I\'m not using it. My eyes can\'t take the bright white anymore.'],
        [16, 'Sunday', 'Just potato wedges, a grilled cheese, and watching documentaries. Perfect Sunday.'],
        [15, 'Overthinking', 'Caught in a loop of observing myself observing the world. It’s exhausting being this analytical all the time.'],
        [7, 'Relay Handoffs', 'Building full-stack systems is 20% writing logic and 80% figuring out why the frontend and backend refuse to talk to each other.'],
        [10, 'Quiet Hours', 'The world is so loud during the day. I only feel like I can breathe at 3 AM when the servers are quiet.'],
        [14, 'Bureaucracy', 'The nightmare of infinite paperwork and red tape is the most realistic horror I\'ve ever experienced.'],
        [3, 'Procedural Comfort', 'Why is early 2000s television so comforting? It\'s just the same plot every episode and I love it.'],
        [18, 'Graph Databases', 'Mapping relationships in a graph database is strangely poetic. Everything is just nodes and edges. Just like us.'],
        [19, 'Audio Isolation', 'Put on some headphones, close your eyes, and just let the synth wash over you.'],
        [14, 'The Beta', 'Updated my OS to the developer beta. Half my tools are crashing. I have no one to blame but myself.'],
        [11, 'Retention', 'Started adjusting my supplement stack. Hoping the water retention isn\'t too crazy. Need that extra rep.'],
        [18, 'Lag', 'When your design file gets so heavy that clicking a layer takes a full second to register. Pain.'],
        [17, 'NoSQL', 'The flexibility of document stores is great until you realize you actually needed a strict schema all along.'],
        [12, 'Gridlock', 'Hackathons are just weaponized sleep deprivation.'],
        [1, 'System Initialization', 'The grid is officially online. Watching the data flow.'],
        [4, 'Untitled', 'Sometimes I write things out just to delete them. But I think I will leave this one here.'],
        [5, 'Perspective', 'We spend so much time looking at screens we forget there is sky above us.'],
        [6, 'Lost Data', 'I wonder where deleted files actually go. Do they just stop existing, or do they haunt the hard drive?'],
        [2, 'Static', 'Feeling very disconnected today. Like I am broadcasting on a frequency nobody is tuned into.'],
        [8, 'Wireframing', 'I spent three hours moving a single button four pixels to the left.'],
        [9, 'Routine', 'There is comfort in waking up and doing the exact same thing every day. It removes the friction of choice.'],
        [10, 'Caffeine Crash', 'That moment at 4 PM where the espresso wears off and gravity suddenly feels twice as strong.'],
        [13, 'Monospace', 'Switched my editor font again. Why am I like this?'],
        [15, 'Ghosts in the Machine', 'Sometimes code works and literally nobody knows why. We just don\'t touch it.'],
        [19, 'Heavy rain', 'The sound of rain hitting the roof while compiling is peak atmosphere.'],
        [20, 'Breathing', 'Take a second. Step away from the monitor. Just breathe.']
    ];

    $stmtEntry = $db->prepare("INSERT INTO entries (user_id, title, content, status) VALUES (?, ?, ?, 'published')");
    foreach ($dummyEntries as $e) {
        $stmtEntry->execute([$e[0], $e[1], $e[2]]);
    }
    echo "<p>[OK] 30 distinct signals broadcasted.</p>";

    // 4. GENERATE COMMENTS (Total: 35)
    $dummyComments = [
        [3, 1, 'I felt this entirely. You have to break the habit physically.'],
        [4, 1, 'Time helps. Give it a few more months.'],
        [2, 9, '3 AM is the only time things make sense.'],
        [5, 19, 'Glad to be here.'],
        [6, 22, 'They definitely haunt the drive. Ghost data.'],
        [10, 2, 'Burn it down and start over.'],
        [12, 3, 'Constraints breed creativity.'],
        [11, 4, 'Nothing beats the iron.'],
        [14, 5, 'Light mode is a crime.'],
        [16, 6, 'Sounds perfect.'],
        [17, 7, 'I call it the observer trap.'],
        [7, 8, 'CORS errors will be the end of me.'],
        [1, 10, 'Agreed.'],
        [3, 11, 'Comfort shows are cheaper than therapy.'],
        [18, 12, 'Cypher is such a beautiful query language though.'],
        [19, 13, 'Let it happen.'],
        [14, 14, 'Never install the beta on your daily driver!'],
        [11, 15, 'Hydrate.'],
        [18, 16, 'Time to clear the cache.'],
        [17, 17, 'Facts.'],
        [12, 18, 'But the pizza is free.'],
        [4, 20, 'Keep it.'],
        [5, 21, 'Look up.'],
        [2, 23, 'I hear you.'],
        [8, 24, 'And then you moved it back, right?'],
        [9, 25, 'Decision fatigue is real.'],
        [10, 26, 'Time for cup number four.'],
        [13, 27, 'JetBrains Mono or nothing.'],
        [15, 28, 'Load-bearing console.log().'],
        [19, 29, 'Best aesthetic.'],
        [20, 30, 'Needed this reminder.'],
        [8, 1, 'It fades eventually.'],
        [12, 8, 'Backend APIs are basically black magic.'],
        [1, 23, 'The grid is always listening.'],
        [11, 4, 'Get back in there tomorrow.']
    ];

    $stmtComment = $db->prepare("INSERT INTO comments (user_id, entry_id, content, status) VALUES (?, ?, ?, 'published')");
    foreach ($dummyComments as $c) {
        $stmtComment->execute([$c[0], $c[1], $c[2]]);
    }
    echo "<p>[OK] 35 responses woven into the network.</p>";

    // 5. GENERATE LIKES (Randomized Engagement)
    $stmtLike = $db->prepare("INSERT INTO likes (user_id, entry_id) VALUES (?, ?)");
    $likesCount = 0;
    
    // Every user will attempt to like 10 random posts
    for ($i = 1; $i <= 20; $i++) {
        for ($j = 0; $j < 10; $j++) {
            $randomPost = rand(1, 30);
            try {
                $stmtLike->execute([$i, $randomPost]);
                $likesCount++;
            } catch (Exception $e) {
                // Ignore duplicate ER_DUP_ENTRY errors silently
            }
        }
    }
    echo "<p>[OK] " . $likesCount . " acknowledgements mathematically distributed.</p>";

    echo "<h3 style='color: #91cc72; border-top: 1px solid #7ea16b; padding-top: 1rem; margin-top: 2rem;'>Grid successfully flooded. You are ready to present.</h3>";
    echo "<p style='color: #dc2626; font-weight: bold;'>CRITICAL: Delete seed.php from your folder before submitting so nobody accidentally wipes the database.</p>";
    echo "</div>";

} catch (PDOException $e) {
    echo "<h3 style='color: #dc2626;'>Fatal Error during sequence: " . $e->getMessage() . "</h3>";
    echo "</div>";
}
?>