<?php
require 'db.php';
$action = $_GET['action'];
$data = json_decode(file_get_contents("php://input"));

if ($action === 'auth') {
    $url = "https://www.googleapis.com/oauth2/v3/userinfo";
    $options = [ 'http' => [ 'header' => "Authorization: Bearer " . $data->accessToken ] ];
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    
    if (!$response) { http_response_code(401); echo json_encode(["error" => "Invalid Google token."]); exit(); }
    
    $profile = json_decode($response);
    $stmt = $db->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->execute([$profile->email]);
    $user = $stmt->fetch();
    
    if ($user) {
        $db->prepare('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?')->execute([$user['id']]);
        echo json_encode(["isNewUser" => false, 
        "user" => ["id" => $user['id'], 
        "username" => $user['username'], 
        "email" => $user['email'], 
        "role" => $user['role']]]);
    } else {
        http_response_code(202);
        echo json_encode(["isNewUser" => true, "googleData" => ["email" => $profile->email, "name" => $profile->name]]);
    }
} elseif ($action === 'signup') {
    $hashedPassword = password_hash($data->password, PASSWORD_BCRYPT);
    try {
        $stmt = $db->prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
        $stmt->execute([$data->username, $data->email, $hashedPassword]);
        $userId = $db->lastInsertId();
        $db->prepare('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?')->execute([$userId]);
        http_response_code(201);
        echo json_encode(["user" => ["id" => $userId, "username" => $data->username, "email" => $data->email]]);
    } catch (PDOException $e) {
        http_response_code(400); echo json_encode(["error" => "Username already exists."]);
    }
}
?>