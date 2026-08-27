<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(["error" => "Credentials missing."]);
    exit();
}

try {
    $stmt = $db->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->execute([$data->email]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(401);
        echo json_encode(["error" => "Node not found. Check your email."]);
        exit();
    }

    // Compare input against stored hash
    if (password_verify($data->password, $user['password_hash'])) {
        
        // Update timestamp
        $updateStmt = $db->prepare('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?');
        $updateStmt->execute([$user['id']]);

        http_response_code(200);
        echo json_encode([
            "message" => "Session initialized.",
            "user" => [
                "id" => $user['id'],
                "username" => $user['username'],
                "email" => $user['email'],
                "role" => $user['role']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid credentials. Access denied."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Internal server error."]);
}
?>