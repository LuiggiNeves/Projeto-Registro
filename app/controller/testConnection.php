<?php

require_once __DIR__ . '../../../vendor/autoload.php';
use App\connection\DataBase;

header('Content-Type: application/json');

try {
    $db = DataBase::getConn();
    // Tenta uma consulta simples
    $stmt = $db->query("SELECT 1");

    if ($stmt !== false) {
        echo json_encode(['success' => true, 'message' => 'Conexão bem-sucedida!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Conexão falhou!']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
}
?>
