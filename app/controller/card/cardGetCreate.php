<?php

namespace App\controller;

require_once __DIR__ . '/../../../vendor/autoload.php'; // Ajuste o caminho conforme necessário
require '../../model/card/card-create.php';
require 'verificarOuCriarCliente.php'; // Inclui o novo arquivo

use App\model\card\CardModel;

use function App\controller\card\verificarOuCriarCliente;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['action']) && $_POST['action'] === 'create') {
        error_log(print_r($_POST, true));

        // Verifica se o ID do cliente foi fornecido ou precisa ser criado
        $id_cliente = $_POST['id_cliente'] ?? '';

        if (empty($id_cliente)) {
            $nome_cliente = $_POST['cliente_nome'] ?? '';
            if (!empty($nome_cliente)) {
                try {
                    $id_cliente = verificarOuCriarCliente($nome_cliente);
                } catch (\Exception $e) {
                    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
                    exit;
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Nome do cliente ausente e ID não fornecido.']);
                exit;
            }
        }

        // Diretório para upload de imagens
        $uploadDirectory = __DIR__ . '/../../../app/uploads/';

        // Verifica se o diretório de upload existe, se não existir, cria-o
        if (!is_dir($uploadDirectory)) {
            mkdir($uploadDirectory, 0777, true);
        }

        // Variável para armazenar o caminho da imagem
        $dir_img = '';

        // Processo de upload de imagens
        if (!empty($_FILES['imagens']['name'][0])) {
            foreach ($_FILES['imagens']['tmp_name'] as $key => $tmp_name) {
                $fileName = basename($_FILES['imagens']['name'][$key]);
                $targetFilePath = $uploadDirectory . $fileName;

                // Validação do tipo de arquivo
                $fileType = mime_content_type($tmp_name);
                if (strpos($fileType, 'image/') === false) {
                    echo json_encode(['success' => false, 'message' => 'Um ou mais arquivos não são imagens válidas.']);
                    exit;
                }

                if (move_uploaded_file($tmp_name, $targetFilePath)) {
                    $dir_img .= 'uploads/' . $fileName . ';'; // Adiciona o caminho da imagem a variável, separando por ponto e vírgula se houver múltiplas imagens
                } else {
                    echo json_encode(['success' => false, 'message' => 'Erro ao salvar a imagem: ' . $fileName]);
                    exit;
                }
            }
            $dir_img = rtrim($dir_img, ';'); // Remove o ponto e vírgula extra do final da string
        }

        // Captura os dados do formulário para criar o cartão, incluindo o caminho da imagem
        $data = [
            'id_cliente' => $id_cliente,
            'id_operador' => 1,
            'data_inicio' => $_POST['data_inicio'] ?? null,
            'data_prazo' => $_POST['data_prazo'] ?? null,
            'data_fim' => $_POST['data_fim'] ?? null,
            'comunicador_01' => $_POST['comunicador_01'] ?? '',
            'comunicador_02' => $_POST['comunicador_02'] ?? '',
            'situacao' => $_POST['situacao'] ?? '',
            'assunto' => $_POST['assunto'] ?? '',
            'descricao' => $_POST['descricao'] ?? '',
            'obs' => '',
            'situacao_card' => 1,
            'sequencia' => $_POST['sequencia'] ?? '',
            'software' => $_POST['software'] ?? '',
            'id_motivo' => $_POST['id_motivo'] ?? '',
            'dir_img' => $dir_img  // Inclui o caminho das imagens no array de dados
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
