<?php
require 'db.php';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $db->prepare('INSERT INTO comments (user_id, entry_id, content, status) VALUES (?, ?, ?, "published")')->execute([$data->userId, $data->entryId, $data->content]);
    $db->prepare('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?')->execute([$data->userId]);
    http_response_code(201);
    echo json_encode(["message" => "Response broadcasted."]);
} elseif ($method === 'GET') {
    $id = $_GET['id'];
    $visitorId = isset($_GET['visitorId']) ? $_GET['visitorId'] : null;
    
    $stmt = $db->prepare("SELECT c.id AS comment_id, c.content AS comment_content, c.created_at AS comment_created_at, cu.username AS comment_username, e.id AS entry_id, e.title, e.content AS entry_content, e.created_at AS entry_created_at, eu.username AS op_username, (SELECT COUNT(*) FROM likes WHERE entry_id = e.id) AS likes_count, (SELECT COUNT(*) FROM comments WHERE entry_id = e.id AND status = 'published') AS comments_count, IF(l.user_id IS NOT NULL, true, false) AS is_liked_by_user FROM comments c JOIN users cu ON c.user_id = cu.id JOIN entries e ON c.entry_id = e.id JOIN users eu ON e.user_id = eu.id LEFT JOIN likes l ON e.id = l.entry_id AND l.user_id = ? WHERE c.id = ? AND c.status = 'published'");
    $stmt->execute([$visitorId, $id]);
    $data = $stmt->fetch();
    
    if (!$data) { http_response_code(404); echo json_encode(["error" => "Signal lost."]); exit(); }
    $data['is_liked_by_user'] = (bool)$data['is_liked_by_user'];
    echo json_encode($data);
}
?>