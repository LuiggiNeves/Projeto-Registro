<?php

namespace App\controller\card;

require_once __DIR__ . '/../../../vendor/autoload.php';

use App\model\card\CommentModel;
use App\connection\DataBase;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_card = $_POST['id_card'] ?? null;
    $valor_comentario = $_POST['comment'] ?? '';
    $situacao = $_POST['situacao'] ?? 1;
    $id_operador = $_POST['id_operador'] ?? null;

    if (!$id_card || !$id_operador || empty($valor_comentario)) {
        echo json_encode(['success' => false, 'message' => 'Dados do comentário incompletos.']);
        exit;
    }

    $id_cliente = getClienteIdByCardId($id_card);

    if (!$id_cliente) {
        echo json_encode(['success' => false, 'message' => 'Cliente não encontrado.']);
        exit;
    }

    $nome_cliente = getClienteNomeById($id_cliente);

    if (!$nome_cliente) {
        echo json_encode(['success' => false, 'message' => 'Nome do cliente não encontrado.']);
        exit;
    }

    $dataAtual = date('Y-m-d');
    $uploadDir = __DIR__ . "/../../../app/uploads/$nome_cliente/$dataAtual/comentarios/";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $filePaths = [];

    if (!empty($_FILES['files']['name'][0])) {
        foreach ($_FILES['files']['tmp_name'] as $key => $tmp_name) {
            $fileName = basename($_FILES['files']['name'][$key]);
            $targetFilePath = $uploadDir . $fileName;

            if (move_uploaded_file($tmp_name, $targetFilePath)) {
                $filePaths[] = "app/uploads/$nome_cliente/$dataAtual/comentarios/" . $fileName;
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao salvar o arquivo.']);
                exit;
            }
        }
    }

    try {
        $commentModel = new CommentModel();
        $newCommentId = $commentModel->addComment($id_card, $valor_comentario, $situacao, $id_operador, $filePaths);
        echo json_encode(['success' => true, 'message' => "Comentário adicionado com sucesso!", 'id' => $newCommentId, 'filePaths' => $filePaths]);
    } catch (\Exception $e) {
        error_log('Erro ao adicionar comentário: ' . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Erro ao adicionar comentário: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de requisição inválido.']);
}

// Função para obter o ID do cliente com base no ID do cartão
function getClienteIdByCardId($id_card) {
    try {
        $db = DataBase::getConn();
        $sql = "SELECT id_cliente FROM card WHERE id = :id_card";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':id_card', $id_card, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchColumn();
    } catch (\Exception $e) {
        error_log('Erro ao obter ID do cliente: ' . $e->getMessage());
        return null;
    }
}

// Função para obter o nome do cliente com base no ID do cliente
function getClienteNomeById($id_cliente) {
    try {
        $db = DataBase::getConn();
        $sql = "SELECT nome FROM clientes WHERE id = :id_cliente";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':id_cliente', $id_cliente, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchColumn();
    } catch (\Exception $e) {
        error_log('Erro ao obter nome do cliente: ' . $e->getMessage());
        return null;
    }
}
