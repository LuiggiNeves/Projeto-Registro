<?php

namespace App\controller\card;

require_once __DIR__ . '/../../../vendor/autoload.php';

use App\model\card\CommentModel;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_card = $_GET['id_card'] ?? null;

    if ($id_card) {
        try {
            $commentModel = new CommentModel();
            $comments = $commentModel->getCommentsByCardId($id_card);
            echo json_encode(['success' => true, 'comments' => $comments]);
        } catch (\Exception $e) {
            error_log('Erro ao buscar comentários: ' . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'Erro ao buscar comentários: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'ID do cartão não fornecido.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de requisição inválido.']);
}
