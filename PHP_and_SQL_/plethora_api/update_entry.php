<?php
require 'db.php';
$data = json_decode(file_get_contents("php://input"));

$stmtUser = $db->prepare("SELECT role FROM users WHERE id = ?");
$stmtUser->execute([$data->userId]);
$user = $stmtUser->fetch();

// Only the author (or an admin) can overwrite a file
$stmtEntry = $db->prepare("SELECT user_id FROM entries WHERE id = ?");
$stmtEntry->execute([$data->entryId]);
$entry = $stmtEntry->fetch();

if ($user['role'] === 'admin' || $entry['user_id'] == $data->userId) {
    $stmt = $db->prepare('UPDATE entries SET title = ?, content = ?, status = ? WHERE id = ?');
    $stmt->execute([$data->title, $data->content, $data->status, $data->entryId]);
    
    $db->prepare('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?')->execute([$data->userId]);

    echo json_encode(["message" => "Draft overwritten."]);
} else {
    http_response_code(403); echo json_encode(["error" => "Unauthorized."]);
}
?>