<?php
require 'db.php';

// Extract req.body
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->email) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing parameters."]);
    exit();
}

// Scramble password
$hashedPassword = password_hash($data->password, PASSWORD_BCRYPT);

try {
    $stmt = $db->prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
    $stmt->execute([$data->username, $data->email, $hashedPassword]);
    
    $userId = $db->lastInsertId();
    
    http_response_code(201);
    echo json_encode(["message" => "Node created successfully.", "userId" => $userId]);
} catch (PDOException $e) {
    // 23000 is the SQLSTATE code for an ER_DUP_ENTRY violation
    if ($e->getCode() == 23000) { 
        http_response_code(400);
        echo json_encode(["error" => "Username or email already exists in the grid."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Internal server error."]);
    }
}
?>