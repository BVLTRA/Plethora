<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->userId) || !isset($data->content) || !isset($data->status)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing parameters."]);
    exit();
}

// If no title is provided, default to an empty string
$title = isset($data->title) ? $data->title : '';

try {
    // Lock the database for a multi-step maneuver
    $db->beginTransaction();

    $stmt = $db->prepare('INSERT INTO entries (user_id, title, content, status) VALUES (?, ?, ?, ?)');
    $stmt->execute([$data->userId, $title, $data->content, $data->status]);
    $entryId = $db->lastInsertId();

    $updateStmt = $db->prepare('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?');
    $updateStmt->execute([$data->userId]);

    // Save all changes
    $db->commit();

    http_response_code(201);
    echo json_encode(["message" => "Entry logged successfully.", "entryId" => $entryId]);
} catch (PDOException $e) {
    $db->rollBack(); // If anything fails, abort everything
    http_response_code(500);
    echo json_encode(["error" => "Failed to log entry."]);
}
?>