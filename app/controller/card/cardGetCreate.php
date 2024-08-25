<?php

namespace App\controller;

require_once __DIR__ . '/../../../vendor/autoload.php'; // Ajuste o caminho conforme necessário
require '../../model/card/card-create.php';
require 'verificarOuCriarCliente.php'; // Inclui o novo arquivo

use App\model\card\CardModel;

use function App\controller\card\verificarOuCriarCliente;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['action']) && $_POST['action'] === 'create') {
        // Log de depuração para verificar os dados recebidos
        error_log(print_r($_POST, true));

        // Verifica se o ID do cliente foi fornecido ou precisa ser criado
        $id_cliente = $_POST['id_cliente'] ?? '';

        if (empty($id_cliente)) {
            // Se o ID do cliente não foi fornecido, tenta criar um novo cliente
            $nome_cliente = $_POST['cliente_nome'] ?? '';
            if (!empty($nome_cliente)) {
                try {
                    $id_cliente = verificarOuCriarCliente($nome_cliente); // Chama a função do novo arquivo
                } catch (\Exception $e) {
                    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
                    exit;
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Nome do cliente ausente e ID não fornecido.']);
                exit;
            }
        }

        // Captura os dados do formulário para criar o cartão
        $data = [
            'id_cliente' => $id_cliente,
            'id_operador' => 1, // Suponha que seja o operador logado (ajuste conforme necessário)
            'data_inicio' => $_POST['data_inicio'] ?? null,
            'data_prazo' => $_POST['data_prazo'] ?? null,
            'data_fim' => $_POST['data_fim'] ?? null,
            'comunicador_01' => $_POST['comunicador_01'] ?? '',
            'comunicador_02' => $_POST['comunicador_02'] ?? '',
            'situacao' => $_POST['situacao'] ?? '',
            'assunto' => $_POST['assunto'] ?? '',
            'descricao' => $_POST['descricao'] ?? '',
            'obs' => '',
            'situacao_card' => 1, // Supondo que '1' significa "Aberto"
            'sequencia' => $_POST['sequencia'] ?? '',
            'software' => $_POST['software'] ?? '',
            'id_motivo' => $_POST['id_motivo'] ?? ''
        ];

        try {
            $cardModel = new CardModel();
            $newCardId = $cardModel->createCard($data);
            echo json_encode(['success' => true, 'message' => "Cartão criado com sucesso! ID: $newCardId"]);
        } catch (\Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Erro ao criar o cartão: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Requisição inválida ou dados ausentes.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de requisição inválido.']);
}
?>
