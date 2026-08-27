<?php
require 'db.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Profile ID missing."]);
    exit();
}

$userId = $_GET['id'];

try {
    // Fetch Profile
    $stmtUser = $db->prepare('SELECT username, email, quote, created_at, last_active FROM users WHERE id = ?');
    $stmtUser->execute([$userId]);
    $user = $stmtUser->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(["error" => "Profile not found."]);
        exit();
    }

    // Fetch Entries (Drafts & Published)
    $stmtEntries = $db->prepare(
        'SELECT e.id, e.title, e.content, e.status, e.created_at, 
                IF(l.user_id IS NOT NULL, true, false) AS is_liked_by_user
         FROM entries e 
         LEFT JOIN likes l ON e.id = l.entry_id AND l.user_id = ?
         WHERE e.user_id = ? 
         ORDER BY e.created_at DESC'
    );
    $stmtEntries->execute([$userId, $userId]);
    $entries = $stmtEntries->fetchAll();
    
    foreach ($entries as &$entry) {
        $entry['is_liked_by_user'] = (bool)$entry['is_liked_by_user'];
    }

    // Fetch Responses
    $stmtResponses = $db->prepare(
        'SELECT c.id, c.entry_id, c.content, c.created_at, u.username AS op_username 
         FROM comments c
         JOIN entries e ON c.entry_id = e.id
         JOIN users u ON e.user_id = u.id
         WHERE c.user_id = ? AND c.status = "published" 
         ORDER BY c.created_at DESC'
    );
    $stmtResponses->execute([$userId]);
    $responses = $stmtResponses->fetchAll();

    // Fetch Likes
    $stmtLikes = $db->prepare(
        'SELECT e.id, e.title, e.content, l.created_at AS liked_at 
         FROM likes l 
         JOIN entries e ON l.entry_id = e.id 
         WHERE l.user_id = ? 
         ORDER BY l.created_at DESC'
    );
    $stmtLikes->execute([$userId]);
    $likes = $stmtLikes->fetchAll();

    // Package data
    http_response_code(200);
    echo json_encode([
        "profile" => $user,
        "entries" => $entries,
        "responses" => $responses,
        "likes" => $likes
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to retrieve profile data."]);
}
?>