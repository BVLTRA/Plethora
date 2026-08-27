<?php
require 'db.php';
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;
$data = json_decode(file_get_contents("php://input"));

if (!$id) { http_response_code(400); exit(); }

if ($method === 'PUT') {
    if (!empty($data->password)) {
        $hashed = password_hash($data->password, PASSWORD_BCRYPT);
        $stmt = $db->prepare('UPDATE users SET username = ?, email = ?, quote = ?, password_hash = ? WHERE id = ?');
        $stmt->execute([$data->username, $data->email, $data->quote, $hashed, $id]);
    } else {
        $stmt = $db->prepare('UPDATE users SET username = ?, email = ?, quote = ? WHERE id = ?');
        $stmt->execute([$data->username, $data->email, $data->quote, $id]);
    }
    echo json_encode(["message" => "Account updated."]);
} elseif ($method === 'DELETE') {
    if ($data->keepEntries) {
        $stmt = $db->prepare("UPDATE users SET username = CONCAT('Unknown_', id), email = NULL, password_hash = NULL WHERE id = ?");
        $stmt->execute([$id]);
    } else {
        $db->prepare('DELETE FROM likes WHERE user_id = ?')->execute([$id]);
        $db->prepare('DELETE FROM comments WHERE user_id = ?')->execute([$id]);
        $db->prepare('DELETE FROM entries WHERE user_id = ?')->execute([$id]);
        $db->prepare('DELETE FROM users WHERE id = ?')->execute([$id]);
    }
    echo json_encode(["message" => "Connection severed."]);
}
?>