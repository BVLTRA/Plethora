<?php
require 'db.php';
$id = $_GET['id'];
$visitorId = isset($_GET['visitorId']) ? $_GET['visitorId'] : null;

// 1. Removed "AND e.status = 'published'" so the engine can actually see drafts
// 2. Added "e.status" and "e.user_id AS author_id" so we can run our security check
$stmt = $db->prepare("
    SELECT e.id, e.user_id AS author_id, e.title, e.content, e.status, e.created_at, u.username, 
    (SELECT COUNT(*) FROM likes WHERE entry_id = e.id) AS likes_count, 
    (SELECT COUNT(*) FROM comments WHERE entry_id = e.id AND status = 'published') AS comments_count, 
    IF(l.user_id IS NOT NULL, true, false) AS is_liked_by_user 
    FROM entries e 
    JOIN users u ON e.user_id = u.id 
    LEFT JOIN likes l ON e.id = l.entry_id AND l.user_id = ? 
    WHERE e.id = ?
");
$stmt->execute([$visitorId, $id]);
$entry = $stmt->fetch();

if (!$entry) { 
    http_response_code(404); 
    echo json_encode(["error" => "Signal lost."]); 
    exit(); 
}

// SECURITY CHECKPOINT: If it's a draft, ONLY the author gets to see it.
if ($entry['status'] === 'draft' && $entry['author_id'] != $visitorId) {
    http_response_code(404); 
    echo json_encode(["error" => "Signal lost."]); // We keep the error vague so snoopers don't know it exists
    exit();
}

$entry['is_liked_by_user'] = (bool)$entry['is_liked_by_user'];

// Fetch the responses (comments)
$stmtC = $db->prepare("
    SELECT c.id, c.content, c.created_at, u.username 
    FROM comments c 
    JOIN users u ON c.user_id = u.id 
    WHERE c.entry_id = ? AND c.status = 'published' 
    ORDER BY c.created_at ASC
");
$stmtC->execute([$id]);
$entry['comments'] = $stmtC->fetchAll();

echo json_encode($entry);
?>