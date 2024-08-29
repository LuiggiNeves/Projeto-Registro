<?php

namespace App\controller\card;

require_once __DIR__ . '/../../../vendor/autoload.php';

use App\model\card\CommentModel;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $id_card = $input['id_card'] ?? null;
    $valor_comentario = $input['comment'] ?? '';
    $situacao = $input['situacao'] ?? 1; // Padrão para '1' se não for fornecido
    $id_operador = $input['id_operador'] ?? null;  // Obtém o ID do operador da requisição

    if ($id_card && !empty($valor_comentario) && $id_operador) {
        try {
            $commentModel = new CommentModel();
            $newCommentId = $commentModel->addComment($id_card, $valor_comentario, $situacao, $id_operador);
            echo json_encode(['success' => true, 'message' => "Comentário adicionado com sucesso!", 'id' => $newCommentId]);
        } catch (\Exception $e) {
            error_log('Erro ao adicionar comentário: ' . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'Erro ao adicionar comentário: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Dados do comentário incompletos.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de requisição inválido.']);
}
