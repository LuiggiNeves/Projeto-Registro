<?php

namespace App\controller\card;

require_once __DIR__ . '/../../../vendor/autoload.php';
use App\connection\DataBase;
use PDO;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'] ?? null;

    if ($id) {
        try {
            $db = DataBase::getConn();
            $query = "SELECT * FROM card WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $card = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($card) {
                echo json_encode(['success' => true, 'card' => $card]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Cartão não encontrado.']);
            }
        } catch (\Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Erro ao buscar cartão: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'ID do cartão não fornecido.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de requisição inválido.']);
}

?>
