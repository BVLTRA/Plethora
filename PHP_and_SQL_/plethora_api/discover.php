<?php
require 'db.php';

// Check if a user ID was passed in the URL 
$userId = isset($_GET['userId']) ? $_GET['userId'] : null;

try {
    if ($userId) {
        $query = "
            SELECT e.id, e.title, e.content, e.created_at, u.username,
                   IF(l.user_id IS NOT NULL, true, false) AS is_liked_by_user
            FROM entries e 
            JOIN users u ON e.user_id = u.id 
            LEFT JOIN likes l ON e.id = l.entry_id AND l.user_id = ?
            WHERE e.status = 'published' 
            ORDER BY e.created_at DESC 
            LIMIT 100
        ";
        $stmt = $db->prepare($query);
        $stmt->execute([$userId]);
    } else {
        $query = "
            SELECT e.id, e.title, e.content, e.created_at, u.username, false AS is_liked_by_user
            FROM entries e 
            JOIN users u ON e.user_id = u.id 
            WHERE e.status = 'published' 
            ORDER BY e.created_at DESC 
            LIMIT 100
        ";
        $stmt = $db->query($query);
    }
    
    $entries = $stmt->fetchAll();
   
    foreach ($entries as &$entry) {
        $entry['is_liked_by_user'] = (bool)$entry['is_liked_by_user'];
    }
    
    http_response_code(200);
    echo json_encode($entries);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to retrieve entire diary."]);
}
?>