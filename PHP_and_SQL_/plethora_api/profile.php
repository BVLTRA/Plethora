<?php
require 'db.php';
$username = $_GET['username'];
$visitorId = isset($_GET['visitorId']) ? $_GET['visitorId'] : null;

$stmt = $db->prepare('SELECT id, username, quote, created_at, last_active FROM users WHERE username = ?');
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user) { http_response_code(404); echo json_encode(["error" => "Node not found."]); exit(); }
$targetId = $user['id'];

$stmtE = $db->prepare('SELECT e.id, e.title, e.content, e.created_at, IF(l.user_id IS NOT NULL, true, false) AS is_liked_by_user FROM entries e LEFT JOIN likes l ON e.id = l.entry_id AND l.user_id = ? WHERE e.user_id = ? AND e.status = "published" ORDER BY e.created_at DESC');
$stmtE->execute([$visitorId, $targetId]);
$entries = $stmtE->fetchAll();
foreach($entries as &$e) $e['is_liked_by_user'] = (bool)$e['is_liked_by_user'];

$stmtR = $db->prepare('SELECT c.id, c.entry_id, c.content, c.created_at, u.username AS op_username FROM comments c JOIN entries e ON c.entry_id = e.id JOIN users u ON e.user_id = u.id WHERE c.user_id = ? AND c.status = "published" ORDER BY c.created_at DESC');
$stmtR->execute([$targetId]);
$responses = $stmtR->fetchAll();

$stmtL = $db->prepare('SELECT e.id, e.title, e.content, l.created_at AS liked_at FROM likes l JOIN entries e ON l.entry_id = e.id WHERE l.user_id = ? ORDER BY l.created_at DESC');
$stmtL->execute([$targetId]);
$likes = $stmtL->fetchAll();

echo json_encode(["profile" => $user, "entries" => $entries, "responses" => $responses, "likes" => $likes]);
?>