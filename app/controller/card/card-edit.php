<?php

namespace App\controller;

require_once __DIR__ . '/../../../vendor/autoload.php'; // Ajuste o caminho conforme necessário
require '../../model/card/CardModel.php'; // Inclui o modelo

use App\model\card\CardModel;

use function App\controller\card\verificarOuCriarCliente;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Log de depuração para ver todo o conteúdo da requisição
    error_log('Dados recebidos no POST: ' . print_r($_POST, true));
    error_log('Arquivos recebidos no FILES: ' . print_r($_FILES, true));

    if (isset($_POST['action']) && $_POST['action'] === 'edit') {
        // Verifica se o ID do cartão foi fornecido
        $id_card = $_POST['id_card'] ?? '';

        if (empty($id_card)) {
            error_log('Erro: ID do cartão não fornecido.');
            echo json_encode(['success' => false, 'message' => 'ID do cartão não fornecido.']);
            exit;
        }

        // Verifica se o ID do cliente foi fornecido ou precisa ser criado
        $id_cliente = $_POST['id_cliente'] ?? '';

        if (empty($id_cliente)) {
            $nome_cliente = $_POST['cliente_nome'] ?? '';
            if (!empty($nome_cliente)) {
                try {
                    $id_cliente = verificarOuCriarCliente($nome_cliente);
                } catch (\Exception $e) {
                    error_log('Erro ao verificar ou criar cliente: ' . $e->getMessage());
                    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
                    exit;
                }
            } else {
                error_log('Erro: Nome do cliente ausente e ID não fornecido.');
                echo json_encode(['success' => false, 'message' => 'Nome do cliente ausente e ID não fornecido.']);
                exit;
            }
        } else {
            $nome_cliente = $_POST['cliente_nome'] ?? ''; // Obtém o nome do cliente para usar na criação do diretório
        }

        // Cria um nome de diretório único usando o nome do cliente e a data atual
        $directoryName = $nome_cliente . '-' . date('Y-m-d');
        $uploadDirectory = __DIR__ . '/../../../app/uploads/' . $directoryName . '/';

        // Verifica se o diretório de upload existe, se não existir, cria-o
        if (!is_dir($uploadDirectory)) {
            mkdir($uploadDirectory, 0777, true);
        }

        // Variável para armazenar o caminho do arquivo
        $dir_files = '';

        // Processo de upload de arquivos
        if (!empty($_FILES['imagens']['name'][0])) {
            foreach ($_FILES['imagens']['tmp_name'] as $key => $tmp_name) {
                $fileName = basename($_FILES['imagens']['name'][$key]);
                $targetFilePath = $uploadDirectory . $fileName;

                if (move_uploaded_file($tmp_name, $targetFilePath)) {
                    $dir_files .= 'uploads/' . $directoryName . '/' . $fileName . ';';
                } else {
                    error_log('Erro ao mover o arquivo: ' . $fileName);
                    echo json_encode(['success' => false, 'message' => 'Erro ao salvar o arquivo: ' . $fileName]);
                    exit;
                }
            }
            $dir_files = rtrim($dir_files, ';');
        }

        // Captura os dados do formulário para editar o cartão
        $data = [
            'id_card' => $id_card,
            'id_cliente' => $id_cliente,
            'data_inicio' => $_POST['data_inicio'] ?? null,
            'data_prazo' => $_POST['data_prazo'] ?? null,
            'data_fim' => $_POST['data_fim'] ?? null,
            'comunicador_01' => $_POST['comunicador_01'] ?? '',
            'comunicador_02' => $_POST['comunicador_02'] ?? '',
            'situacao' => $_POST['situacao'] ?? '',
            'assunto' => $_POST['assunto'] ?? '',
            'descricao' => $_POST['descricao'] ?? '',
            'obs' => $_POST['obs'] ?? '',
            'situacao_card' => $_POST['situacao_card'] ?? 1,
            'sequencia' => $_POST['sequencia'] ?? '',
            'software' => $_POST['software'] ?? '',
            'id_motivo' => $_POST['id_motivo'] ?? '',
            'dir_img' => $dir_files
        ];

        try {
            $cardModel = new CardModel();
            $cardModel->updateCard($data);
            echo json_encode(['success' => true, 'message' => "Cartão editado com sucesso!"]);
        } catch (\Exception $e) {
            error_log('Erro ao editar cartão: ' . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'Erro ao editar o cartão: ' . $e->getMessage()]);
        }
    } else {
        error_log('Requisição inválida ou dados ausentes.');
        echo json_encode(['success' => false, 'message' => 'Requisição inválida ou dados ausentes.']);
    }
} else {
    error_log('Método de requisição inválido.');
    echo json_encode(['success' => false, 'message' => 'Método de requisição inválido.']);
}
