<?php
require 'db.php';
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"));

if ($method === 'POST') {
    try {
        $db->prepare('INSERT INTO likes (user_id, entry_id) VALUES (?, ?)')->execute([$data->userId, $data->entryId]);
        $db->prepare('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?')->execute([$data->userId]);
        http_response_code(201);
        echo json_encode(["message" => "Acknowledged."]);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            http_response_code(400); echo json_encode(["error" => "Already acknowledged."]);
        } else {
            http_response_code(500); echo json_encode(["error" => "Failed."]);
        }
    }
} elseif ($method === 'DELETE') {
    $db->prepare('DELETE FROM likes WHERE user_id = ? AND entry_id = ?')->execute([$data->userId, $data->entryId]);
    echo json_encode(["message" => "Severed."]);
}
?>