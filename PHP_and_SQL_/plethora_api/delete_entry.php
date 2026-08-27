<?php
require 'db.php';
$data = json_decode(file_get_contents("php://input"));

// Verify clearance
$stmt = $db->prepare("SELECT user_id FROM entries WHERE id = ?");
$stmt->execute([$data->entryId]);
$entry = $stmt->fetch();

$stmtUser = $db->prepare("SELECT role FROM users WHERE id = ?");
$stmtUser->execute([$data->requesterId]);
$user = $stmtUser->fetch();

if ($user['role'] === 'admin' || $entry['user_id'] == $data->requesterId) {
    // Erase the things associated with the entry first
    $db->prepare("DELETE FROM likes WHERE entry_id = ?")->execute([$data->entryId]);
    $db->prepare("DELETE FROM comments WHERE entry_id = ?")->execute([$data->entryId]);
    // Erase the entry
    $db->prepare("DELETE FROM entries WHERE id = ?")->execute([$data->entryId]);
    
    http_response_code(200);
    echo json_encode(["message" => "Entry erased from the grid."]);
} else {
    http_response_code(403);
    echo json_encode(["error" => "Unauthorized. You lack clearance."]);
}
?>